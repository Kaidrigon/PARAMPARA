from fastapi import FastAPI

app = FastAPI(
    title="PARAMPARA API",
    description="Source-grounded archive of Indian Knowledge Systems",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {
        "name": "PARAMPARA API",
        "status": "running",
        "version": "0.1.0",
    }


@app.get("/api/health")
async def health():
    return {
        "status": "healthy"
    }