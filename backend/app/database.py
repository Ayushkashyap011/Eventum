import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime
from app.config import settings

logger = logging.getLogger("eventum.database")

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_instance = Database()

async def connect_to_mongo():
    try:
        db_instance.client = AsyncIOMotorClient(settings.MONGO_URI)
        # Attempt to get default database from URI, or fall back to DB_NAME
        try:
            default_db = db_instance.client.get_default_database()
            db_instance.db = default_db if default_db is not None else db_instance.client[settings.DB_NAME]
        except Exception:
            db_instance.db = db_instance.client[settings.DB_NAME]
            
        logger.info(f"Connected to MongoDB: database={db_instance.db.name}")
        print(f"MongoDB Connected Successfully to database '{db_instance.db.name}'")
    except Exception as e:
        logger.error(f"MongoDB Connection Failed: {e}")
        print(f"MongoDB Connection Failed: {e}")
        raise e

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        logger.info("MongoDB Connection Closed")
        print("MongoDB Connection Closed")

def get_database() -> AsyncIOMotorDatabase:
    return db_instance.db

def serialize_doc(doc: dict) -> dict:
    """Recursively serialize MongoDB document for JSON responses."""
    if not doc:
        return doc
    
    serialized = {}
    for key, val in doc.items():
        if isinstance(val, ObjectId):
            serialized[key] = str(val)
        elif isinstance(val, datetime):
            serialized[key] = val.isoformat()
        elif isinstance(val, dict):
            serialized[key] = serialize_doc(val)
        elif isinstance(val, list):
            serialized[key] = [
                serialize_doc(item) if isinstance(item, dict)
                else str(item) if isinstance(item, ObjectId)
                else item.isoformat() if isinstance(item, datetime)
                else item
                for item in val
            ]
        else:
            serialized[key] = val
            
    if "_id" in serialized and "id" not in serialized:
        serialized["id"] = str(serialized["_id"])
        
    return serialized

def serialize_docs(docs: list) -> list:
    return [serialize_doc(d) for d in docs]
