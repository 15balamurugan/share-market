from datetime import datetime
import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from bson import ObjectId


class UserCreate(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: str
    mobile_no: Optional[str] = None
    password: str


class UserInDB(BaseModel):
    id: str = Field(..., alias="_id")
    username: str
    firstname: str
    lastname: str
    email: str
    mobile_no: Optional[str] = None
    hashed_password: str
    created_at: datetime

    @field_validator("mobile_no")
    def validate_mobile(cls, v):
        if v is None:
            return v
        pattern = re.compile(r"^\+?[0-9]{10,15}$")  # e.g. +919876543210
        if not pattern.match(v):
            raise ValueError("Invalid mobile number format")
        return v   # FIXED ✅

    @field_validator("id", mode="before")
    def convert_objectid(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        return v

    class Config:
        populate_by_name = True   # newer Pydantic v2 (instead of validate_by_name)


class Token(BaseModel):
    access_token: str
    token_type: str
