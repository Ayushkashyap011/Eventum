import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PORT: int = int(os.getenv("PORT", 5000))
    HOST: str = os.getenv("HOST", "0.0.0.0")
    MONGO_URI: str = os.getenv(
        "MONGO_URI",
        "mongodb+srv://cse22bcsi05_db_user:h2Tl1irOAkfCVwzc@eventum.qpvmiej.mongodb.net/"
    )
    DB_NAME: str = os.getenv("DB_NAME", "test")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your_secret_key")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10080)) # 7 days
    
    ALLOWED_ORIGINS: List[str] = [
        origin.strip()
        for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,https://eventum4u.netlify.app"
        ).split(",")
        if origin.strip()
    ]

settings = Settings()
