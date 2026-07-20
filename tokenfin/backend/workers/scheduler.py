"""
APScheduler background workers.
Runs alongside FastAPI in the same process (lightweight tasks).
For heavy jobs, move to Celery.
"""
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from ..services.alert_engine import evaluate_rules
from ..core.logging import log
import asyncio

scheduler = AsyncIOScheduler()

async def _run_alert_engine():
    try:
        fired = await evaluate_rules()
        if fired:
            log.info("scheduler_alerts_fired", count=fired)
    except Exception as e:
        log.error("scheduler_alert_error", error=str(e))

async def _refresh_model_prices():
    """Placeholder — fetch latest prices from provider APIs."""
    log.debug("model_prices_refresh_tick")

def start_scheduler():
    scheduler.add_job(_run_alert_engine,      IntervalTrigger(minutes=1),  id="alert_engine",    replace_existing=True)
    scheduler.add_job(_refresh_model_prices,  IntervalTrigger(hours=6),    id="price_refresh",   replace_existing=True)
    scheduler.start()
    log.info("scheduler_started")

def stop_scheduler():
    scheduler.shutdown(wait=False)
    log.info("scheduler_stopped")
