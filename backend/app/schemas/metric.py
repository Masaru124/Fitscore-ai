from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

# ponytail: Schemas for Rep Metric and Real-Time WebSocket Telemetry
class RepMetricBase(BaseModel):
    rep_number: int
    score: float = 0.0
    peak_depth_deg: Optional[float] = None
    tempo_seconds: Optional[float] = None
    symmetry_balance_pct: float = 100.0
    risk_severity: str = "none"
    detected_flaw: Optional[str] = None
    landmarks_summary: Optional[Dict[str, Any]] = None

class RepMetricCreate(RepMetricBase):
    session_id: int

class RepMetricResponse(RepMetricBase):
    id: int
    session_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# WebSocket Telemetry frame packet from client
class PoseFramePacket(BaseModel):
    exercise: str
    landmarks: Dict[str, Dict[str, float]] # { "left_knee": {"x": 0.5, "y": 0.8, "z": -0.1}, ... }
    timestamp: float
