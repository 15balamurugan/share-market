from fastapi import APIRouter, HTTPException, Query
from app.database.collections import markets_collection
from datetime import datetime


router = APIRouter()

def normalize_doc(doc: dict) -> dict:
    """Normalize MongoDB document keys (strip + lowercase)."""
    return {k.strip().lower(): v for k, v in doc.items()}


@router.get("/api/{symbol}/price_movement")
async def get_price_movement(symbol: str):
    try:
        cursor = markets_collection.find({"symbol": symbol.upper()}).sort("date", 1)

        processed_data = {"dates": [], "opens": [], "highs": [], "lows": [], "closes": [], "volumes": []}

        async for raw_doc in cursor:
            try:
                doc = normalize_doc(raw_doc)  # normalize all keys

                date_str = doc.get("date")
                if not date_str:
                    continue

                date = datetime.strptime(date_str.strip(), "%d-%b-%Y")
                processed_data["dates"].append(date.strftime("%d-%b-%Y"))

                processed_data["opens"].append(float(doc.get("open price", doc.get("open", 0))))
                processed_data["highs"].append(float(doc.get("high price", doc.get("high", 0))))
                processed_data["lows"].append(float(doc.get("low price", doc.get("low", 0))))
                processed_data["closes"].append(float(doc.get("close price", doc.get("close", 0))))

                vol_str = str(doc.get("volume", "0")).replace(",", "")
                processed_data["volumes"].append(int(vol_str))

            except Exception as e:
                print(f"Skipping doc due to error: {e}")
                continue

        if not processed_data["dates"]:
            raise HTTPException(status_code=404, detail=f"No valid data found for {symbol}")

        return processed_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
