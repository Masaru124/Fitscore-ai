from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.models.session import WorkoutSession

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary")
async def get_analytics_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(
            func.count(WorkoutSession.id).label("total_sessions"),
            func.sum(WorkoutSession.total_reps).label("total_reps"),
            func.avg(WorkoutSession.overall_fitscore).label("avg_score"),
            func.sum(WorkoutSession.injury_risk_count).label("total_risks"),
        ).where(WorkoutSession.user_id == current_user.id)
    )
    row = result.one()
    
    return {
        "total_sessions": row.total_sessions or 0,
        "total_reps": row.total_reps or 0,
        "avg_fitscore": round(float(row.avg_score or 0.0), 1),
        "total_risks_detected": row.total_risks or 0,
        "streak_days": 5,
    }
