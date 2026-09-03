from pydantic import BaseModel, Field


class TraceRequest(BaseModel):
    claim: str = Field(..., min_length=3, max_length=500)


class TraceResponse(BaseModel):
    found: bool
    claim: str
    source: dict | None = None
    context: dict | None = None
    interpretation: list[dict] = []
    tradition: list[dict] = []