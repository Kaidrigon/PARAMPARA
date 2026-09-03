from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import test_database_connection
from app.routes.trace import router as trace_router


app = FastAPI(
    title="PARAMPARA API",
    description="Indian Knowledge Systems through sources, context and transmission.",
    version="0.1.0",
)


# -----------------------------------------
# CORS
# -----------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------
# ROUTES
# -----------------------------------------

app.include_router(trace_router)


# -----------------------------------------
# ROOT
# -----------------------------------------

@app.get("/")
def root():
    return {
        "name": "PARAMPARA API",
        "status": "online",
    }


# -----------------------------------------
# HEALTH
# -----------------------------------------

@app.get("/health")
def health():
    return {
        "api": "ok",
        "database": test_database_connection(),
    }