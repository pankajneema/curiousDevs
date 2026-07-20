from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Any
from datetime import datetime
from enum import Enum

# ── Enums ─────────────────────────────────────────────────────
class Plan(str, Enum):
    free       = "free"
    pro        = "pro"
    team       = "team"
    enterprise = "enterprise"

class Role(str, Enum):
    owner     = "owner"
    admin     = "admin"
    developer = "developer"
    viewer    = "viewer"

class LimitScope(str, Enum):
    org     = "org"
    project = "project"
    team    = "team"
    member  = "member"

class LimitPeriod(str, Enum):
    daily   = "daily"
    weekly  = "weekly"
    monthly = "monthly"

class BudgetStatus(str, Enum):
    pending  = "pending"
    approved = "approved"
    denied   = "denied"

class TriggerType(str, Enum):
    threshold    = "threshold"
    anomaly      = "anomaly"
    limit_breach = "limit_breach"

class LimitStatus(str, Enum):
    ok        = "ok"
    warning   = "warning"
    throttled = "throttled"
    blocked   = "blocked"

# ── Usage / Ingest ────────────────────────────────────────────
class UsageEventIn(BaseModel):
    api_key:           str = Field(..., pattern=r'^tf_')
    model:             str
    prompt_tokens:     int = Field(ge=0)
    completion_tokens: int = Field(ge=0)
    latency_ms:        Optional[int] = None
    tags:              dict[str, str] = {}
    metadata:          dict[str, Any] = {}

class UsageEventOut(BaseModel):
    ok:           bool
    cost_usd:     float
    total_tokens: int
    event_id:     str

# ── Limit check ───────────────────────────────────────────────
class LimitCheckResult(BaseModel):
    scope:      LimitScope
    budget_usd: float
    spent_usd:  float
    pct_used:   int
    status:     LimitStatus

# ── Notifications ─────────────────────────────────────────────
class NotificationPayload(BaseModel):
    org_id:    str
    title:     str
    body:      str
    channels:  dict[str, Any] = {}
    to_email:  Optional[str]  = None
    user_id:   Optional[str]  = None

# ── Analytics ─────────────────────────────────────────────────
class AnalyticsSummary(BaseModel):
    total_cost:     float
    total_tokens:   int
    total_requests: int
    days:           int

class ModelBreakdown(BaseModel):
    model:    str
    cost:     float
    tokens:   int
    requests: int

class DayStats(BaseModel):
    date:   str
    cost:   float
    tokens: int

class AnalyticsResponse(BaseModel):
    summary:  AnalyticsSummary
    by_model: list[ModelBreakdown]
    by_day:   list[DayStats]

# ── Budget request ────────────────────────────────────────────
class BudgetRequestIn(BaseModel):
    org_id:       str
    project_id:   Optional[str] = None
    requested_by: str
    amount_usd:   float = Field(gt=0)
    reason:       str   = Field(min_length=10)

class BudgetReviewIn(BaseModel):
    id:          str
    status:      BudgetStatus
    reviewed_by: str

# ── Health ───────────────────────────────────────────────────
class HealthResponse(BaseModel):
    status:  str = "ok"
    version: str = "0.1.0"
    ts:      datetime = Field(default_factory=datetime.utcnow)
