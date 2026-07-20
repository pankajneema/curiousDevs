"""
Notification dispatcher — email, Slack, Telegram, webhook.
Integrated with customer-configured channels per alert rule.
"""
import httpx, asyncio
import aiosmtplib
from email.message import EmailMessage
from typing import Optional
from ..core.config import get_settings
from ..core.logging import log

settings = get_settings()

# ── Email ─────────────────────────────────────────────────────
async def send_email(to: str, subject: str, body_html: str, body_text: str = "") -> bool:
    try:
        msg = EmailMessage()
        msg["From"]    = settings.smtp_email
        msg["To"]      = to
        msg["Subject"] = subject
        msg.set_content(body_text or body_html)
        msg.add_alternative(body_html, subtype="html")

        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_server,
            port=settings.smtp_port,
            username=settings.smtp_email,
            password=settings.smtp_password,
            start_tls=True,
        )
        log.info("email_sent", to=to, subject=subject)
        return True
    except Exception as e:
        log.error("email_failed", to=to, error=str(e))
        return False

def _alert_email_html(title: str, body: str, app_url: str) -> str:
    return f"""
<!DOCTYPE html><html><body style="font-family:Inter,sans-serif;background:#F9F8F5;padding:32px">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #E8E6E0">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px">
    <div style="width:32px;height:32px;background:#E8533A;border-radius:8px;display:flex;align-items:center;justify-content:center">
      <span style="color:white;font-size:16px">⚡</span>
    </div>
    <span style="font-weight:600;font-size:15px;color:#1A1A2E">TokenFin</span>
  </div>
  <h2 style="margin:0 0 8px;font-size:18px;color:#1A1A2E">{title}</h2>
  <p style="margin:0 0 24px;color:#6B6B8A;font-size:14px;line-height:1.6">{body}</p>
  <a href="{app_url}/dashboard" style="display:inline-block;background:#E8533A;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500">
    View Dashboard →
  </a>
  <p style="margin:24px 0 0;font-size:12px;color:#9898B0">
    You're receiving this because you set up an alert rule in TokenFin.
    <a href="{app_url}/dashboard/alerts" style="color:#E8533A">Manage alerts</a>
  </p>
</div></body></html>"""

# ── Slack ─────────────────────────────────────────────────────
async def send_slack(webhook_url: str, title: str, body: str, color: str = "#E8533A") -> bool:
    if not webhook_url:
        return False
    payload = {
        "attachments": [{
            "color": color,
            "blocks": [
                {"type": "section", "text": {"type": "mrkdwn", "text": f"*{title}*\n{body}"}},
                {"type": "context", "elements": [{"type": "mrkdwn", "text": "TokenFin · <https://app.tokenfin.io/dashboard|View Dashboard>"}]},
            ],
        }]
    }
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            res = await client.post(webhook_url, json=payload)
            ok = res.status_code == 200
            log.info("slack_sent", ok=ok)
            return ok
    except Exception as e:
        log.error("slack_failed", error=str(e))
        return False

# ── Telegram ──────────────────────────────────────────────────
async def send_telegram(chat_id: str, title: str, body: str) -> bool:
    token = settings.telegram_bot_token
    if not token or not chat_id:
        return False
    text = f"⚡ *{title}*\n\n{body}\n\n[View Dashboard](https://app.tokenfin.io/dashboard)"
    try:
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        async with httpx.AsyncClient(timeout=5) as client:
            res = await client.post(url, json={"chat_id": chat_id, "text": text, "parse_mode": "Markdown"})
            ok = res.json().get("ok", False)
            log.info("telegram_sent", ok=ok)
            return ok
    except Exception as e:
        log.error("telegram_failed", error=str(e))
        return False

# ── Webhook ───────────────────────────────────────────────────
async def send_webhook(url: str, payload: dict) -> bool:
    if not url:
        return False
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            res = await client.post(url, json=payload, headers={"Content-Type": "application/json", "X-TokenFin-Event": "alert"})
            ok = res.status_code < 300
            log.info("webhook_sent", url=url, ok=ok)
            return ok
    except Exception as e:
        log.error("webhook_failed", url=url, error=str(e))
        return False

# ── Dispatch all channels ─────────────────────────────────────
async def dispatch(
    title:        str,
    body:         str,
    channels:     dict,
    to_email:     Optional[str] = None,
    slack_webhook: Optional[str] = None,
    telegram_chat_id: Optional[str] = None,
    webhook_url:  Optional[str] = None,
    color:        str = "#E8533A",
) -> dict[str, bool]:
    tasks = []
    labels = []

    if channels.get("email") and to_email:
        html = _alert_email_html(title, body, settings.app_url)
        tasks.append(send_email(to_email, f"TokenFin Alert: {title}", html))
        labels.append("email")

    if channels.get("slack") and slack_webhook:
        tasks.append(send_slack(slack_webhook, title, body, color))
        labels.append("slack")

    if channels.get("telegram") and telegram_chat_id:
        tasks.append(send_telegram(telegram_chat_id, title, body))
        labels.append("telegram")

    if channels.get("webhook") and webhook_url:
        tasks.append(send_webhook(webhook_url, {"title": title, "body": body, "ts": asyncio.get_event_loop().time()}))
        labels.append("webhook")

    results = await asyncio.gather(*tasks, return_exceptions=True)
    return {labels[i]: bool(r) for i, r in enumerate(results)}
