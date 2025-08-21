from fastapi import APIRouter
from . auth import router as auth_router
from . markets import router as markets_router
api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(markets_router)