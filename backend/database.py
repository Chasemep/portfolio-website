import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio")

# Render uses 'postgres://' but SQLAlchemy requires 'postgresql+asyncpg://' for asyncpg
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://") and not DATABASE_URL.startswith("postgresql+asyncpg://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Safely print the host to verify what URL is actually being loaded
parsed_host = DATABASE_URL.split("@")[-1].split(":")[0] if "@" in DATABASE_URL else "unknown"
print(f"DEBUG: Attempting to connect to database host: {parsed_host}")

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def init_db():
    async with engine.begin() as conn:
        # Tables should be defined with Alembic or SQLAlchemy metadata.
        # For simplicity, we rely on init.sql for table creation for now.
        pass

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
