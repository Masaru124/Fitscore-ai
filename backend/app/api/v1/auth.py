from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, Token

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

async def get_current_user(
    request: Request,
    token: Optional[str] = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    # 1. Check header token or cookie
    raw_token = token or request.cookies.get("fitscore_token")
    if raw_token and raw_token != "demo_jwt_token_fitscore_ai":
        payload = decode_access_token(raw_token)
        if payload and payload.get("sub"):
            try:
                user_id = int(payload.get("sub"))
                result = await db.execute(select(User).where(User.id == user_id))
                user = result.scalar_one_or_none()
                if user:
                    return user
            except Exception:
                pass

    # 2. Fallback to existing user in database (athlete or primary user)
    result = await db.execute(select(User).order_by(User.id.asc()))
    user = result.scalars().first()
    if user:
        return user

    # 3. Create default athlete user if DB is completely empty
    default_user = User(
        email="athlete@fitscore.ai",
        hashed_password=get_password_hash("demo1234"),
        full_name="Alex Mercer",
    )
    db.add(default_user)
    await db.commit()
    await db.refresh(default_user)
    return default_user

@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_in.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer"}
