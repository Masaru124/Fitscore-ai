from pydantic_settings import BaseSettings
from typing import Optional

# ponytail: Lean Settings loaded from environment or sensible defaults
class Settings(BaseSettings):
    PROJECT_NAME: str = "FitScore AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Database: defaults to zero-config local SQLite, or PostgreSQL via env var
    DATABASE_URL: str = "sqlite+aiosqlite:///./fitscore.db"

    # JWT Security
    SECRET_KEY: str = "fitscore_ai_super_secret_jwt_key_2026_biomechanics"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # AI & MediaPipe
    CONFIDENCE_THRESHOLD: float = 0.5
    POSE_SAMPLE_RATE_HZ: int = 30

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
