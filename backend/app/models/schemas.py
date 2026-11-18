from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Any, List, Dict
from datetime import datetime

# --- Auth Schemas ---

class UserSignUp(BaseModel):
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=3)
    password: str = Field(..., min_length=4)
    phone: str = Field(..., min_length=5)

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None

class AuthResponse(BaseModel):
    token: str
    name: str
    phone: str
    email: str
    isAdmin: bool = False

class UserOut(BaseModel):
    id: Optional[str] = None
    _id: Optional[str] = None
    name: str
    email: str
    phone: Optional[str] = None
    isAdmin: bool = False
    createdAt: Optional[Any] = None
    updatedAt: Optional[Any] = None

# --- Booking Schemas ---

class BookingCreate(BaseModel):
    eventDate: str
    eventPlan: str
    eventDetails: str
    budget: float

class BookingStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(Pending|Done|Cancelled)$")

class BookingResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[Any] = None

class BookingListResponse(BaseModel):
    success: bool
    count: int
    data: List[Any]

# --- Admin Schemas ---

class AdminStats(BaseModel):
    totalUsers: int
    totalBookings: int
    totalRevenue: float

class AdminDashboardResponse(BaseModel):
    success: bool
    admin: Dict[str, Any]
    adminName: Optional[str] = None
    stats: AdminStats
    recentActivity: Dict[str, Any]
