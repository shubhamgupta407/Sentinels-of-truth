import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_tables

load_dotenv()

app = FastAPI(
    title="Sentinels of Truth API",
    description="Backend API for the Multi-Agent Fact Verification & Knowledge Base System",
    version="0.1.0"
)

# make sure tables exist before anything hits the db
create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  # open for now, can restrict later in prod
)

# importing here to avoid circular import issues
from app.routes import verification, audit

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Sentinels of Truth API",
        "status": "healthy"
    }

app.include_router(verification.router, prefix="/api/v1")
app.include_router(audit.router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected" if os.getenv("DATABASE_URL") else "not_configured",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
