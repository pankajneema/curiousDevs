from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..models.schemas import LimitCheckResult
from ..services.limit_engine import check_limits, is_blocked, is_throttled

router = APIRouter(prefix="/limits", tags=["limits"])

@router.get("/check", response_model=list[LimitCheckResult])
async def check(
    org_id:     str            = Query(...),
    project_id: Optional[str]  = Query(None),
):
    return check_limits(org_id, project_id)

@router.get("/blocked")
async def blocked(org_id: str = Query(...), project_id: Optional[str] = Query(None)):
    return {"blocked": is_blocked(org_id, project_id)}

@router.get("/throttled")
async def throttled(org_id: str = Query(...), project_id: Optional[str] = Query(None)):
    return {"throttled": is_throttled(org_id, project_id)}
