from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timezone
from bson import ObjectId
from app.models.schemas import UserSignUp, UserLogin, UserProfileUpdate, AuthResponse, UserOut
from app.database import get_database, serialize_doc
from app.utils.auth import hash_password, verify_password, create_access_token
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/signup", response_model=AuthResponse)
async def signup(payload: UserSignUp):
    db = get_database()
    
    # Check if user already exists
    existing = await db["users"].find_one({"email": payload.email.lower().strip()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    hashed_pwd = hash_password(payload.password)
    now = datetime.now(timezone.utc)
    
    new_user = {
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "password": hashed_pwd,
        "phone": payload.phone.strip(),
        "isAdmin": False,
        "createdAt": now,
        "updatedAt": now,
    }
    
    res = await db["users"].insert_one(new_user)
    user_id = str(res.inserted_id)
    
    token = create_access_token({"id": user_id, "isAdmin": False})
    
    return {
        "token": token,
        "name": new_user["name"],
        "phone": new_user["phone"],
        "email": new_user["email"],
        "isAdmin": False
    }

@router.post("/login", response_model=AuthResponse)
async def login(payload: UserLogin):
    db = get_database()
    
    user = await db["users"].find_one({"email": payload.email.lower().strip()})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
        
    if not verify_password(payload.password, user.get("password", "")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid credentials"
        )
        
    user_id = str(user["_id"])
    is_admin = bool(user.get("isAdmin", False))
    
    token = create_access_token({"id": user_id, "isAdmin": is_admin})
    
    return {
        "token": token,
        "name": user.get("name", "User"),
        "phone": user.get("phone", ""),
        "email": user.get("email", payload.email),
        "isAdmin": is_admin
    }

@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    return current_user

@router.put("/update")
async def update_profile(
    payload: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user.get("id") or current_user.get("_id")
    
    update_data = {"updatedAt": datetime.now(timezone.utc)}
    if payload.name is not None:
        update_data["name"] = payload.name.strip()
    if payload.phone is not None:
        update_data["phone"] = payload.phone.strip()
        
    await db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )
    
    updated_user = await db["users"].find_one({"_id": ObjectId(user_id)})
    return {
        "name": updated_user.get("name", ""),
        "phone": updated_user.get("phone", "")
    }
