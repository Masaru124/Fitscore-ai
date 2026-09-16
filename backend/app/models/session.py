from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

# ponytail: Compact WorkoutSession recording aggregate scores, exercise protocol, and duration
class WorkoutSession(Base):
    __tablename__ = "workout_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    exercise_name = Column(String, nullable=False)
    total_reps = Column(Integer, default=0)
    duration_seconds = Column(Integer, default=0)
    
    # 4-Pillar Biomechanics Scores (0 - 100)
    overall_fitscore = Column(Float, default=0.0)
    rom_score = Column(Float, default=0.0)
    tempo_score = Column(Float, default=0.0)
    symmetry_score = Column(Float, default=0.0)
    stability_score = Column(Float, default=0.0)
    
    # Injury Risk Flags Count
    injury_risk_count = Column(Integer, default=0)
    ai_coaching_notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="sessions")
    metrics = relationship("RepMetric", back_populates="session", cascade="all, delete-orphan")
