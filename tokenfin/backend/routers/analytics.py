from fastapi import APIRouter, Query
from typing import Optional
from ..models.schemas import AnalyticsResponse
from ..services.analytics import get_analytics

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("", response_model=AnalyticsResponse)
async def analytics(
    org_id:     str           = Query(...),
    days:       int           = Query(30, ge=1, le=365),
    project_id: Optional[str] = Query(None),
):
    return get_analytics(org_id, days, project_id)
