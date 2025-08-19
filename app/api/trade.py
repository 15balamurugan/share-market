from fastapi import APIRouter, Depends, Form, HTTPException, Request, status
from datetime import datetime
from bson import ObjectId
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from database.collections import brokers_collection
from schemas.broker import BrokerAccountCreate, BrokerAccountInDB
from api.auth import get_current_user
from schemas.user import UserInDB

router = APIRouter()

templates = Jinja2Templates(directory="templates")
 
@router.get("/broker_create", response_class=HTMLResponse)
async def trade_create_page(request: Request):
    return templates.TemplateResponse("broker_create.html", {"request": request})

@router.post("/broker_create", response_model=dict)
async def create_trade_account(
    broker_name: str = Form(...),
    api_key: str = Form(...),
    api_secret: str = Form(...),
    current_user=Depends(get_current_user)  # cookie-based login
):
    broker_doc = {
        "user_id": str(current_user.id),   # link with logged-in user
        "broker_name": broker_name,
        "api_key": api_key,
        "api_secret": api_secret,
        "created_at": datetime.utcnow()
    }

    result = await brokers_collection.insert_one(broker_doc)

    return {
        "msg": "Broker account created successfully",
        "id": str(result.inserted_id)
    }

@router.get("/broker/accounts", response_model=list[BrokerAccountInDB])
async def list_trade_accounts(current_user: UserInDB = Depends(get_current_user)):
    """
    Get all trading accounts for the logged-in user.
    """
    accounts = await brokers_collection.find(
        {"user_id": str(current_user.id)}
    ).to_list(100)

    return [BrokerAccountInDB(**acc) for acc in accounts]
