"""
Analytics service — aggregated cost/token breakdown for the dashboard.
"""
from datetime import datetime, timezone, timedelta
from ..core.database import get_supabase
from ..models.schemas import AnalyticsResponse, AnalyticsSummary, ModelBreakdown, DayStats

def get_analytics(org_id: str, days: int = 30, project_id: str | None = None) -> AnalyticsResponse:
    sb    = get_supabase()
    since = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()

    q = sb.table("usage_events") \
          .select("model,total_tokens,cost_usd,created_at") \
          .eq("org_id", org_id) \
          .gte("created_at", since)

    if project_id:
        q = q.eq("project_id", project_id)

    events = q.execute().data or []

    by_model: dict[str, dict] = {}
    by_day:   dict[str, dict] = {}

    for e in events:
        m = e["model"]
        if m not in by_model:
            by_model[m] = {"tokens": 0, "cost": 0.0, "requests": 0}
        by_model[m]["tokens"]   += e["total_tokens"]
        by_model[m]["cost"]     += float(e["cost_usd"])
        by_model[m]["requests"] += 1

        day = e["created_at"][:10]
        if day not in by_day:
            by_day[day] = {"cost": 0.0, "tokens": 0}
        by_day[day]["cost"]   += float(e["cost_usd"])
        by_day[day]["tokens"] += e["total_tokens"]

    total_cost    = sum(float(e["cost_usd"]) for e in events)
    total_tokens  = sum(e["total_tokens"] for e in events)
    total_requests = len(events)

    return AnalyticsResponse(
        summary=AnalyticsSummary(
            total_cost=round(total_cost, 6),
            total_tokens=total_tokens,
            total_requests=total_requests,
            days=days,
        ),
        by_model=sorted(
            [ModelBreakdown(model=m, **v) for m, v in by_model.items()],
            key=lambda x: x.cost, reverse=True,
        ),
        by_day=sorted(
            [DayStats(date=d, **v) for d, v in by_day.items()],
            key=lambda x: x.date,
        ),
    )
