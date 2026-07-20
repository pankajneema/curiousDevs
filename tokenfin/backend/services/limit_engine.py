"""
Limit Engine — checks if a project/org is over budget.
Implements graduated limits: warn → throttle → block.
Called by ingest BEFORE processing to gate requests.
"""
from datetime import datetime, timezone
from typing import Optional
from ..core.database import get_supabase
from ..core.logging import log
from ..models.schemas import LimitCheckResult, LimitScope, LimitStatus

def _period_start(period: str) -> str:
    now = datetime.now(timezone.utc)
    if period == "daily":
        return now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    if period == "weekly":
        start = now - __import__('datetime').timedelta(days=now.weekday())
        return start.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    # monthly
    return now.replace(day=1, hour=0, minute=0, second=0, microsecond=0).isoformat()

def check_limits(org_id: str, project_id: Optional[str] = None) -> list[LimitCheckResult]:
    sb = get_supabase()

    query = sb.table("limits").select("*").eq("org_id", org_id).eq("is_active", True)
    if project_id:
        query = query.or_(f"project_id.eq.{project_id},project_id.is.null")

    limits = query.execute().data or []
    results: list[LimitCheckResult] = []

    for lim in limits:
        since = _period_start(lim["period"])

        spent_query = sb.table("usage_events").select("cost_usd").eq("org_id", org_id).gte("created_at", since)
        if lim.get("project_id"):
            spent_query = spent_query.eq("project_id", lim["project_id"])
        if lim.get("team_id"):
            # join members → filter by team
            pass

        events = spent_query.execute().data or []
        spent  = sum(float(e["cost_usd"]) for e in events)
        budget = float(lim["budget_usd"])
        pct    = min(int(round((spent / budget) * 100)), 100) if budget else 0

        if pct >= lim["block_at"]:
            status = LimitStatus.blocked
        elif pct >= lim["throttle_at"]:
            status = LimitStatus.throttled
        elif pct >= lim["warn_at"]:
            status = LimitStatus.warning
        else:
            status = LimitStatus.ok

        results.append(LimitCheckResult(
            scope=LimitScope(lim["scope"]),
            budget_usd=budget,
            spent_usd=round(spent, 6),
            pct_used=pct,
            status=status,
        ))
        log.debug("limit_checked", scope=lim["scope"], pct=pct, status=status)

    return results

def is_blocked(org_id: str, project_id: Optional[str] = None) -> bool:
    results = check_limits(org_id, project_id)
    return any(r.status == LimitStatus.blocked for r in results)

def is_throttled(org_id: str, project_id: Optional[str] = None) -> bool:
    results = check_limits(org_id, project_id)
    return any(r.status in (LimitStatus.throttled, LimitStatus.blocked) for r in results)
