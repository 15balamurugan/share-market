from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class BrokerAccount(BaseModel):
    user_id: str                # FK → User._id
    broker_name: str
    api_key: str
    api_secret: str


class BrokerAccountInDB(BaseModel):
    id: str = Field(..., alias="_id")
    user_id: str
    broker_name: str
    api_key: str
    api_secret: str
    created_at: datetime

    # Convert ObjectId → str
    @classmethod
    def __get_validators__(cls):
        yield cls.validate_objectid

    @staticmethod
    def validate_objectid(v):
        if isinstance(v, ObjectId):
            return str(v)
        return v

    class Config:
        populate_by_name = True
