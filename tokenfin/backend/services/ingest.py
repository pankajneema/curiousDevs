"""
Ingest service — validates API key, calculates cost, writes to Supabase.
This is the Python equivalent of the Next.js /api/ingest route,
but runs as the authoritative processor (Next.js route is the fast edge receiver).
"""
import hashlib
from datetime import datetime, timezone
from typing import Optional
from ..core.database import get_supabase
from ..core.logging import log
from ..models.schemas import UsageEventIn, UsageEventOut, LimitStatus

def _hash_key(raw: str) -> str:
    return hashlib.sha256(raw.encode()).hexdigest()

def resolve_api_key(raw_key: str) -> Optional[dict]:
    sb = get_supabase()
    key_hash = _hash_key(raw_key)
    prefix   = raw_key[:20]
    res = sb.table("api_keys") \
            .select("id,project_id,org_id,is_active") \
            .eq("key_hash", key_hash) \
            .eq("key_prefix", prefix) \
            .single() \
            .execute()
    return res.data if res.data else None

def get_model_price(model: str) -> Optional[dict]:
    sb = get_supabase()
    res = sb.table("model_prices") \
            .select("input_per_1m,output_per_1m") \
            .eq("model", model) \
            .single() \
            .execute()
    return res.data if res.data else None

def calc_cost(prompt_tokens: int, completion_tokens: int, prices: Optional[dict]) -> float:
    if not prices:
        return 0.0
    return (
        (prompt_tokens    / 1_000_000) * float(prices["input_per_1m"]) +
        (completion_tokens / 1_000_000) * float(prices["output_per_1m"])
    )

def process_event(event: UsageEventIn) -> UsageEventOut:
    sb = get_supabase()

    key = resolve_api_key(event.api_key)
    if not key or not key.get("is_active"):
        raise ValueError("Invalid or inactive API key")

    prices      = get_model_price(event.model)
    cost_usd    = calc_cost(event.prompt_tokens, event.completion_tokens, prices)
    total_tokens = event.prompt_tokens + event.completion_tokens

    res = sb.table("usage_events").insert({
        "api_key_id":        key["id"],
        "project_id":        key["project_id"],
        "org_id":            key["org_id"],
        "model":             event.model,
        "prompt_tokens":     event.prompt_tokens,
        "completion_tokens": event.completion_tokens,
        "total_tokens":      total_tokens,
        "cost_usd":          cost_usd,
        "latency_ms":        event.latency_ms,
        "tags":              event.tags,
        "metadata":          event.metadata,
    }).execute()

    event_id = res.data[0]["id"] if res.data else "unknown"

    # Fire-and-forget aggregate
    bucket = datetime.now(timezone.utc).replace(second=0, microsecond=0).isoformat()
    try:
        sb.rpc("upsert_usage_agg", {
            "p_bucket":     bucket,
            "p_project_id": key["project_id"],
            "p_org_id":     key["org_id"],
            "p_model":      event.model,
            "p_tokens":     total_tokens,
            "p_cost":       cost_usd,
            "p_requests":   1,
        }).execute()
    except Exception as e:
        log.warning("agg_upsert_failed", error=str(e))

    log.info("event_ingested", model=event.model, cost_usd=cost_usd, tokens=total_tokens)
    return UsageEventOut(ok=True, cost_usd=cost_usd, total_tokens=total_tokens, event_id=event_id)
