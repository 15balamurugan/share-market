from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.templating import Jinja2Templates
from app.api.auth import get_current_user
from app.database.collections import tata_collection, wipro_collection
from datetime import datetime
from app.schemas.user import UserInDB

router = APIRouter()

templates = Jinja2Templates(directory="templates")

@router.get("/tata_motors")
async def dashboard(request: Request):
    return templates.TemplateResponse("/tata_motors.html", {"request": request, "title": "TATA MOTORS"})

@router.get("/wipro")
async def dashboard(request: Request):
    return templates.TemplateResponse("wipro.html", {"request": request, "title": "wipro"})
         
@router.get("/api/tata_motors/price_movement")         # Dynamic {stock_symbol(id) price movement }
async def get_price_movement():
    try:
        cursor = tata_collection.find().sort("DATE", 1) 
        processed_data = {
            "dates": [],
            "opens": [],
            "highs": [],
            "lows": [],
            "closes": [],
            "volumes": []
        }
       
        async for doc in cursor:
            try:
                date_str = (doc.get("DATE") or doc.get("DATE ", "")).strip()
                if not date_str:
                    continue
               
                date = datetime.strptime(date_str, "%d-%b-%Y")
                processed_data["dates"].append(date.strftime("%d-%b-%Y"))  
               
                processed_data["opens"].append(float(doc.get("OPEN PRICE") or doc.get("OPEN PRICE ", 0)))
                processed_data["highs"].append(float(doc.get("HIGH PRICE") or doc.get("HIGH PRICE ", 0)))
                processed_data["lows"].append(float(doc.get("LOW PRICE") or doc.get("LOW PRICE ", 0)))
                processed_data["closes"].append(float(doc.get("CLOSE PRICE") or doc.get("CLOSE PRICE ", 0)))
               
                vol_str = (doc.get("Volume") or doc.get("Volume ", "0")).replace(",", "")
                processed_data["volumes"].append(int(vol_str))
               
            except Exception as e:
                print(f"Skipping document due to error: {str(e)}")
                continue
       
        if not processed_data["dates"]:
            raise HTTPException(status_code=404, detail="No valid data found")
       
        return processed_data
   
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@router.get("/api/wipro/price_movement")
async def get_price_movement():
    try:
        cursor = wipro_collection.find().sort("DATE", 1)  
        processed_data = {
            "dates": [],
            "opens": [],
            "highs": [],
            "lows": [],
            "closes": [],
            "volumes": []
        }
       
        async for doc in cursor:
            try:
                date_str = (doc.get("DATE") or doc.get("DATE ", "")).strip()
                if not date_str:
                    continue
               
                date = datetime.strptime(date_str, "%d-%b-%Y")
                processed_data["dates"].append(date.strftime("%d-%b-%Y"))  
               
                processed_data["opens"].append(float(doc.get("OPEN PRICE") or doc.get("OPEN PRICE ", 0)))
                processed_data["highs"].append(float(doc.get("HIGH PRICE") or doc.get("HIGH PRICE ", 0)))
                processed_data["lows"].append(float(doc.get("LOW PRICE") or doc.get("LOW PRICE ", 0)))
                processed_data["closes"].append(float(doc.get("CLOSE PRICE") or doc.get("CLOSE PRICE ", 0)))
               
                vol_str = (doc.get("Volume") or doc.get("Volume ", "0")).replace(",", "")
                processed_data["volumes"].append(int(vol_str))
               
            except Exception as e:
                print(f"Skipping document due to error: {str(e)}")
                continue
       
        if not processed_data["dates"]:
            raise HTTPException(status_code=404, detail="No valid data found")
       
        return processed_data
   
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

