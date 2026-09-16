from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

# ponytail: RepMetric stores granular rep-by-rep telemetry without bloated tables
class RepMetric(Base):
    __tablename__ = "rep_metrics"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("workout_sessions.id"), nullable=False)
    
    rep_number = Column(Integer, nullable=False)
    score = Column(Float, default=0.0)
    
    peak_depth_deg = Column(Float, nullable=True)
    tempo_seconds = Column(Float, nullable=True)
    symmetry_balance_pct = Column(Float, default=100.0)
    
    risk_severity = Column(String, default="none")  # none, low, medium, high
    detected_flaw = Column(String, nullable=True)
    
    landmarks_summary = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    session = relationship("WorkoutSession", back_populates="metrics")
