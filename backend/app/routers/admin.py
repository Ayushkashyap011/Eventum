from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime, timezone
from app.models.schemas import BookingStatusUpdate
from app.database import get_database, serialize_doc, serialize_docs
from app.dependencies import get_current_admin_user

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.get("/dashboard-stats")
async def get_dashboard_stats(admin_user: dict = Depends(get_current_admin_user)):
    db = get_database()
    
    total_users = await db["users"].count_documents({})
    total_bookings = await db["bookings"].count_documents({})
    
    # Calculate total revenue from budget field
    revenue_pipeline = [
        {
            "$group": {
                "_id": None,
                "total": {
                    "$sum": {
                        "$cond": [
                            {"$isNumber": "$budget"},
                            "$budget",
                            {"$toDouble": {"$ifNull": ["$budget", 0]}}
                        ]
                    }
                }
            }
        }
    ]
    try:
        rev_cursor = db["bookings"].aggregate(revenue_pipeline)
        rev_result = await rev_cursor.to_list(length=1)
        total_revenue = rev_result[0]["total"] if rev_result else 0
    except Exception:
        total_revenue = 0
        
    # Latest 5 bookings with populated user
    latest_cursor = db["bookings"].find().sort("createdAt", -1).limit(5)
    latest_bookings_raw = await latest_cursor.to_list(length=5)
    latest_bookings = []
    for b in latest_bookings_raw:
        user_id = b.get("user")
        if user_id:
            try:
                user_obj = await db["users"].find_one(
                    {"_id": ObjectId(user_id) if isinstance(user_id, str) else user_id},
                    {"name": 1, "email": 1}
                )
                if user_obj:
                    b["user"] = serialize_doc(user_obj)
            except Exception:
                pass
        latest_bookings.append(serialize_doc(b))
        
    # Recent 5 users
    recent_users_cursor = db["users"].find(
        {},
        {"name": 1, "email": 1, "phone": 1, "createdAt": 1, "isAdmin": 1}
    ).sort("createdAt", -1).limit(5)
    recent_users_raw = await recent_users_cursor.to_list(length=5)
    recent_users = serialize_docs(recent_users_raw)
    
    admin_name = admin_user.get("name", "Admin")
    admin_email = admin_user.get("email", "")
    
    return {
        "success": True,
        "admin": {
            "name": admin_name,
            "email": admin_email
        },
        "adminName": admin_name,
        "stats": {
            "totalUsers": total_users,
            "totalBookings": total_bookings,
            "totalRevenue": total_revenue
        },
        "recentActivity": {
            "bookings": latest_bookings,
            "users": recent_users
        }
    }

@router.get("/total-users")
async def get_total_users(admin_user: dict = Depends(get_current_admin_user)):
    db = get_database()
    count = await db["users"].count_documents({})
    return {"success": True, "totalUsers": count}

@router.get("/total-bookings")
async def get_total_bookings(admin_user: dict = Depends(get_current_admin_user)):
    db = get_database()
    count = await db["bookings"].count_documents({})
    return {"success": True, "totalBookings": count}

@router.get("/all-users")
async def get_all_users(admin_user: dict = Depends(get_current_admin_user)):
    db = get_database()
    cursor = db["users"].find(
        {},
        {"password": 0}
    ).sort("createdAt", -1)
    users = await cursor.to_list(length=1000)
    return {"success": True, "users": serialize_docs(users)}

@router.get("/all-bookings")
async def get_all_admin_bookings(admin_user: dict = Depends(get_current_admin_user)):
    db = get_database()
    cursor = db["bookings"].find().sort("createdAt", -1)
    raw_bookings = await cursor.to_list(length=1000)
    
    bookings = []
    for b in raw_bookings:
        user_id = b.get("user")
        if user_id:
            try:
                user_obj = await db["users"].find_one(
                    {"_id": ObjectId(user_id) if isinstance(user_id, str) else user_id},
                    {"name": 1, "email": 1, "phone": 1}
                )
                if user_obj:
                    b["user"] = serialize_doc(user_obj)
            except Exception:
                pass
        bookings.append(serialize_doc(b))
        
    return {"success": True, "bookings": bookings}

@router.put("/update-booking/{booking_id}")
async def admin_update_booking_status(
    booking_id: str,
    payload: BookingStatusUpdate,
    admin_user: dict = Depends(get_current_admin_user)
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
        
    user_id = res.get("user")
    if user_id:
        try:
            user_obj = await db["users"].find_one(
                {"_id": ObjectId(user_id) if isinstance(user_id, str) else user_id},
                {"name": 1, "email": 1, "phone": 1}
            )
            if user_obj:
                res["user"] = serialize_doc(user_obj)
        except Exception:
            pass
            
    return {
        "success": True,
        "message": "Booking updated successfully",
        "data": serialize_doc(res)
    }
