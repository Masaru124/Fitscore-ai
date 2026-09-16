from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# ponytail: Schemas for WorkoutSession request/response
class WorkoutSessionBase(BaseModel):
    exercise_name: str
    total_reps: int = 0
    duration_seconds: int = 0
    overall_fitscore: float = 0.0
    rom_score: float = 0.0
    tempo_score: float = 0.0
    symmetry_score: float = 0.0
    stability_score: float = 0.0
    injury_risk_count: int = 0
    ai_coaching_notes: Optional[str] = None

class WorkoutSessionCreate(WorkoutSessionBase):
    pass

class WorkoutSessionResponse(WorkoutSessionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
