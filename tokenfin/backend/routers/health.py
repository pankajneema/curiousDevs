from fastapi import APIRouter
from ..models.schemas import HealthResponse

router = APIRouter(tags=["health"])

@router.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse()

@router.get("/")
async def root():
    return {"service": "TokenFin Backend", "version": "0.1.0", "docs": "/docs"}
