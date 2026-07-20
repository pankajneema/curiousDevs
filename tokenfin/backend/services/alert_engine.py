"""
Alert Engine — evaluates alert rules and fires notifications.
Called by the scheduler worker every minute.
"""
from datetime import datetime, timezone, timedelta
from ..core.database import get_supabase
from ..core.logging import log
from .notification import dispatch
import asyncio

def _period_start_for_alert(rule: dict) -> str:
    now = datetime.now(timezone.utc)
    return (now - timedelta(hours=24)).isoformat()  # Default: last 24h

async def evaluate_rules() -> int:
    """Evaluate all active alert rules. Returns number of alerts fired."""
    sb   = get_supabase()
    fired = 0

    rules = sb.table("alert_rules").select("*").eq("is_active", True).execute().data or []

    for rule in rules:
        try:
            triggered = False
            title     = ""
            body      = ""

            if rule["trigger_type"] == "threshold" and rule.get("threshold"):
                # Check if spend in last 24h exceeded threshold
                since  = _period_start_for_alert(rule)
                q      = sb.table("usage_events").select("cost_usd").eq("org_id", rule["org_id"]).gte("created_at", since)
                if rule.get("project_id"):
                    q = q.eq("project_id", rule["project_id"])
                events = q.execute().data or []
                spent  = sum(float(e["cost_usd"]) for e in events)

                if spent >= float(rule["threshold"]):
                    triggered = True
                    title = f"Spend threshold reached: ${spent:.2f}"
                    body  = f"Your 24h spend of **${spent:.2f}** has exceeded the **${rule['threshold']:.2f}** threshold set in rule \"{rule['name']}\"."

            elif rule["trigger_type"] == "limit_breach":
                # Fired by limit_engine directly — skip here
                pass

            elif rule["trigger_type"] == "anomaly":
                # Simple anomaly: today's spend > 2× avg of last 7 days
                now   = datetime.now(timezone.utc)
                today = now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
                week_ago = (now - timedelta(days=7)).isoformat()

                today_events = sb.table("usage_events").select("cost_usd").eq("org_id", rule["org_id"]).gte("created_at", today).execute().data or []
                week_events  = sb.table("usage_events").select("cost_usd").eq("org_id", rule["org_id"]).gte("created_at", week_ago).execute().data or []

                today_spend = sum(float(e["cost_usd"]) for e in today_events)
                avg_daily   = sum(float(e["cost_usd"]) for e in week_events) / 7

                if avg_daily > 0 and today_spend > avg_daily * 2:
                    triggered = True
                    title = f"Spending anomaly detected"
                    body  = f"Today's spend **${today_spend:.2f}** is **{today_spend/avg_daily:.1f}×** your 7-day average of **${avg_daily:.2f}/day**."

            if triggered:
                # Store notification in DB
                sb.table("notifications").insert({
                    "org_id": rule["org_id"],
                    "type":   f"alert_{rule['trigger_type']}",
                    "title":  title,
                    "body":   body,
                }).execute()

                # Dispatch to configured channels
                channels = rule.get("channels", {})
                await dispatch(
                    title=title, body=body, channels=channels,
                    to_email=None,  # TODO: fetch org owner email
                    webhook_url=channels.get("webhook"),
                )
                fired += 1
                log.info("alert_fired", rule_id=rule["id"], title=title)

        except Exception as e:
            log.error("alert_eval_failed", rule_id=rule["id"], error=str(e))

    return fired
