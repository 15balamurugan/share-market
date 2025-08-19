from fastapi import APIRouter
from . auth import router as auth_router
from . stock import router as stock_router
from . trade import router as trade_router

api_router = APIRouter()

api_router.include_router(stock_router)
api_router.include_router(auth_router)
api_router.include_router(trade_router)
