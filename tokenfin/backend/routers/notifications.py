from fastapi import APIRouter, HTTPException
from ..models.schemas import NotificationPayload
from ..services.notification import dispatch

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.post("/send")
async def send_notification(payload: NotificationPayload):
    results = await dispatch(
        title=payload.title,
        body=payload.body,
        channels=payload.channels,
        to_email=payload.to_email,
    )
    return {"ok": True, "results": results}
