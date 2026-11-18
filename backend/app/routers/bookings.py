from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timezone
from bson import ObjectId
from app.models.schemas import BookingCreate, BookingStatusUpdate, BookingResponse, BookingListResponse
from app.database import get_database, serialize_doc, serialize_docs
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

async def populate_booking_user(db, booking: dict) -> dict:
    user_id = booking.get("user")
    if user_id:
        try:
            user_obj_id = ObjectId(user_id) if isinstance(user_id, str) else user_id
            user = await db["users"].find_one(
                {"_id": user_obj_id},
                {"password": 0}
            )
            if user:
                booking["user"] = serialize_doc(user)
        except Exception:
            pass
    return serialize_doc(booking)

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_booking(
    payload: BookingCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user.get("id") or current_user.get("_id")
    
    now = datetime.now(timezone.utc)
    booking_doc = {
        "user": ObjectId(user_id),
        "eventDate": payload.eventDate,
        "eventPlan": payload.eventPlan,
        "eventDetails": payload.eventDetails,
        "budget": payload.budget,
        "status": "Pending",
        "createdAt": now,
        "updatedAt": now
    }
    
    result = await db["bookings"].insert_one(booking_doc)
    booking_doc["_id"] = result.inserted_id
    booking_doc["id"] = str(result.inserted_id)
    
    return {
        "success": True,
        "message": "Booking successful",
        "data": serialize_doc(booking_doc)
    }

@router.get("/my")
async def get_my_bookings(current_user: dict = Depends(get_current_user)):
    db = get_database()
    user_id = current_user.get("id") or current_user.get("_id")
    
    cursor = db["bookings"].find({"user": ObjectId(user_id)}).sort("createdAt", -1)
    bookings = await cursor.to_list(length=500)
    
    return {
        "success": True,
        "count": len(bookings),
        "data": serialize_docs(bookings)
    }

@router.get("/all-bookings")
async def get_all_bookings(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = db["bookings"].find().sort("createdAt", -1)
    raw_bookings = await cursor.to_list(length=1000)
    
    populated = []
    for b in raw_bookings:
        populated.append(await populate_booking_user(db, b))
        
    return {
        "success": True,
        "count": len(populated),
        "data": populated
    }

@router.put("/update-booking/{booking_id}")
async def update_booking_status(
    booking_id: str,
    payload: BookingStatusUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    try:
        obj_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid booking ID format"
        )
        
    res = await db["bookings"].find_one_and_update(
        {"_id": obj_id},
        {"$set": {"status": payload.status, "updatedAt": datetime.now(timezone.utc)}},
        return_document=True
    )
    
    if not res:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
        
    populated = await populate_booking_user(db, res)
    return {
        "success": True,
        "message": "Booking updated successfully",
        "data": populated
    }
