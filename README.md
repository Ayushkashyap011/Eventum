# Eventum - Premium Event Management Platform

Eventum is a modern, full-stack event management website designed for organizing royal weddings, corporate conferences, live concerts, and celebratory occasions across Odisha.

---

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/), [Swiper](https://swiperjs.com/), [React Icons](https://react-icons.github.io/react-icons/)
- **Backend**: [Python](https://www.python.org/) (3.11+), [FastAPI](https://fastapi.tiangolo.com/), [Motor](https://motor.readthedocs.io/) (Asynchronous MongoDB driver), [Pydantic v2](https://docs.pydantic.dev/), [Uvicorn](https://www.uvicorn.org/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt password hashing

---

## 📁 Project Structure

```
Eventum/
├── backend/                  # Python FastAPI Backend
│   ├── app/
│   │   ├── models/           # Pydantic schemas & response models
│   │   ├── routers/          # FastAPI routers (auth, bookings, admin)
│   │   ├── utils/            # JWT authentication & bcrypt hashing
│   │   ├── config.py         # Application settings
│   │   ├── database.py       # Asynchronous MongoDB connection
│   │   ├── dependencies.py   # Auth & Admin role-based dependencies
│   │   └── main.py           # FastAPI app instance, CORS & lifecycle
│   ├── .env                  # Backend environment variables
│   ├── requirements.txt      # Python dependencies
│   ├── run.py                # Server startup script
│   └── test_api.py           # End-to-end API test suite
│
├── frontend/                 # Modern React + Tailwind CSS UI
│   ├── src/
│   │   ├── api/api.js        # Centralized API service
│   │   ├── assets/           # Images, logos, and gallery media
│   │   ├── components/       # Modern Navbar, Hero, About, Services, Feedback, Footer
│   │   ├── pages/            # Home, Booking, MyBookings, Profile, Admin, Login, Gallery
│   │   └── index.css         # Global Tailwind CSS imports
│   ├── .env                  # Frontend environment variables (VITE_API_URL)
│   └── package.json
│
└── backend_node/             # Preserved backup of original Node.js backend
```

---

## ⚡ Quick Start

### 1. Run the FastAPI Backend

```bash
cd backend

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Run the backend server
python run.py
```
> The API will be available at: **`http://localhost:5000`**  
> Interactive API Docs (Swagger UI): **`http://localhost:5000/docs`**

### 2. Run the React Frontend

```bash
cd frontend

# Install dependencies (if needed)
npm install

# Start the Vite development server
npm run dev
```
> The frontend will be available at: **`http://localhost:5173`**

---

## 🔑 Key Features

1. **Modern Glassmorphic UI**: Clean dark theme with responsive navigation, mobile drawer, and interactive event cards.
2. **Event Booking System**: Intuitive plan selector (Standard, Premium, Royal VIP), date picker, budget estimator, and instant submission.
3. **User Dashboard ("My Bookings")**: Track status (Pending, Confirmed, Cancelled) and booking details in real-time.
4. **Admin Console**: Analytics overview (Total Users, Total Bookings, Pipeline Revenue), status update controls, and client directory.
5. **Robust Security**: Bcrypt password hashing, JWT authorization, and admin role enforcement.
