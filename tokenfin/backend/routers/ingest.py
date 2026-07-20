from fastapi import APIRouter, HTTPException, Request
from ..models.schemas import UsageEventIn, UsageEventOut
from ..services.ingest import process_event
from ..services.limit_engine import is_blocked

router = APIRouter(prefix="/ingest", tags=["ingest"])

@router.post("", response_model=UsageEventOut, status_code=201)
async def ingest_event(event: UsageEventIn, request: Request):
    try:
        return process_event(event)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal error")

@router.get("/health")
async def health():
    return {"status": "ok"}
