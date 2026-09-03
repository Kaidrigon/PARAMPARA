import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "parampara")

if not MONGODB_URL:
    raise RuntimeError("MONGODB_URL is not set in the .env file")

client = MongoClient(MONGODB_URL)

db = client[DATABASE_NAME]


def get_database():
    """Return the PARAMPARA MongoDB database."""
    return db


def test_database_connection():
    """Test whether MongoDB Atlas is reachable."""
    try:
        client.admin.command("ping")
        return True
    except PyMongoError:
        return False