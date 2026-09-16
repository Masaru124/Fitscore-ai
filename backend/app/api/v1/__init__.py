from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.sessions import router as sessions_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.coaching import router as coaching_router
from app.api.v1.websocket import router as ws_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(sessions_router)
api_router.include_router(analytics_router)
api_router.include_router(coaching_router)
api_router.include_router(ws_router)
