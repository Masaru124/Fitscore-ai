from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from app.core.database import get_db
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.models.session import WorkoutSession
from app.models.metric import RepMetric
from app.schemas.session import WorkoutSessionCreate, WorkoutSessionResponse

router = APIRouter(prefix="/sessions", tags=["sessions"])

@router.post("/", response_model=WorkoutSessionResponse)
async def create_session(
    session_in: WorkoutSessionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    data = session_in.model_dump()
    reps_data = data.pop("reps", None)

    session = WorkoutSession(
        user_id=current_user.id,
        **data
    )
    db.add(session)
    await db.flush()

    if reps_data:
        for r in reps_data:
            depth_val = None
            if r.get("depth") is not None:
                try:
                    depth_val = float(str(r["depth"]).replace("°", "").split()[0])
                except Exception:
                    depth_val = None

            tempo_val = None
            if r.get("tempo") is not None:
                try:
                    tempo_val = float(str(r["tempo"]).replace("s", "").split()[0])
                except Exception:
                    tempo_val = None

            metric = RepMetric(
                session_id=session.id,
                rep_number=int(r.get("rep") or r.get("rep_number") or 1),
                score=float(r.get("score") or 0.0),
                peak_depth_deg=depth_val,
                tempo_seconds=tempo_val,
                risk_severity="medium" if r.get("status") == "warning" else ("low" if r.get("status") == "caution" else "none"),
                detected_flaw=r.get("issue"),
            )
            db.add(metric)

    await db.commit()

    result = await db.execute(
        select(WorkoutSession)
        .options(selectinload(WorkoutSession.metrics))
        .where(WorkoutSession.id == session.id)
    )
    return result.scalar_one()

@router.get("/", response_model=List[WorkoutSessionResponse])
async def list_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(WorkoutSession)
        .options(selectinload(WorkoutSession.metrics))
        .where(WorkoutSession.user_id == current_user.id)
        .order_by(WorkoutSession.created_at.desc())
    )
    return result.scalars().all()

@router.get("/{session_id}", response_model=WorkoutSessionResponse)
async def get_session(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(WorkoutSession)
        .options(selectinload(WorkoutSession.metrics))
        .where(WorkoutSession.id == session_id, WorkoutSession.user_id == current_user.id)
    )
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
