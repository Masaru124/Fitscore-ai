from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

# ponytail: Compact user model with biometrics for limb length normalization
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    
    # Biometrics
    height_cm = Column(Float, default=175.0)
    weight_kg = Column(Float, default=75.0)
    experience_level = Column(String, default="Intermediate")
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    sessions = relationship("WorkoutSession", back_populates="user", cascade="all, delete-orphan")
