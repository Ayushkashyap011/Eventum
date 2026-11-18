"""
Eventum FastAPI Backend Test Script
Run with: python test_api.py
"""

from fastapi.testclient import TestClient
from app.main import app
import time

def run_tests():
    print("Testing Eventum FastAPI Backend...")
    with TestClient(app) as client:
        # 1. Health check
        res = client.get("/")
        print("1. Health check:", res.status_code, res.json())
        assert res.status_code == 200

        # 2. Test Signup
        test_email = f"test_{int(time.time())}@eventum.com"
        signup_data = {
            "name": "Integration Tester",
            "email": test_email,
            "password": "Password123!",
            "phone": "9430777099"
        }
        res = client.post("/api/auth/signup", json=signup_data)
        print("2. Signup response:", res.status_code, res.json().get("email"))
        assert res.status_code == 200
        token = res.json()["token"]

        # 3. Test Login
        login_data = {
            "email": test_email,
            "password": "Password123!"
        }
        res = client.post("/api/auth/login", json=login_data)
        print("3. Login response:", res.status_code, res.json().get("name"))
        assert res.status_code == 200

        # 4. Test Profile
        headers = {"Authorization": f"Bearer {token}"}
        res = client.get("/api/auth/profile", headers=headers)
        print("4. Profile response:", res.status_code, res.json().get("name"))
        assert res.status_code == 200

        # 5. Test Create Booking
        booking_data = {
            "eventDate": "2026-12-25",
            "eventPlan": "Royal VIP Luxe",
            "eventDetails": "Test Grand Gala event in Bhubaneswar with 300 guests.",
            "budget": 150000
        }
        res = client.post("/api/bookings", json=booking_data, headers=headers)
        print("5. Create Booking response:", res.status_code, res.json().get("message"))
        assert res.status_code == 201

        # 6. Test Get My Bookings
        res = client.get("/api/bookings/my", headers=headers)
        print("6. My Bookings response:", res.status_code, "Count:", res.json().get("count"))
        assert res.status_code == 200

        print("\nAll End-to-End FastAPI Tests Passed Successfully!")

if __name__ == "__main__":
    run_tests()
