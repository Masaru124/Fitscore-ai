from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ponytail: Minimal Pydantic v2 schemas for User auth and profile
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    height_cm: Optional[float] = 175.0
    weight_kg: Optional[float] = 75.0
    experience_level: Optional[str] = "Intermediate"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    experience_level: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
