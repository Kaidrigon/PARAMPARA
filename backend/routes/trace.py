from fastapi import APIRouter

from app.database import get_database
from app.models import TraceRequest, TraceResponse


router = APIRouter(
    prefix="/api/trace",
    tags=["Trace"],
)


@router.post("", response_model=TraceResponse)
def trace_claim(request: TraceRequest):
    db = get_database()

    claim_text = request.claim.strip()

    claim = db.claims.find_one(
        {
            "$or": [
                {"claim": claim_text},
                {"aliases": claim_text},
            ]
        }
    )

    if not claim:
        return TraceResponse(
            found=False,
            claim=claim_text,
        )

    source = None
    context = None
    interpretations = []
    traditions = []

    if claim.get("source_id"):
        source = db.sources.find_one(
            {"source_id": claim["source_id"]},
            {"_id": 0},
        )

    if claim.get("context_id"):
        context = db.contexts.find_one(
            {"context_id": claim["context_id"]},
            {"_id": 0},
        )

    interpretation_ids = claim.get("interpretation_ids", [])

    if interpretation_ids:
        interpretations = list(
            db.interpretations.find(
                {
                    "interpretation_id": {
                        "$in": interpretation_ids
                    }
                },
                {"_id": 0},
            )
        )

    tradition_ids = claim.get("tradition_ids", [])

    if tradition_ids:
        traditions = list(
            db.traditions.find(
                {
                    "tradition_id": {
                        "$in": tradition_ids
                    }
                },
                {"_id": 0},
            )
        )

    return TraceResponse(
        found=True,
        claim=claim_text,
        source=source,
        context=context,
        interpretation=interpretations,
        tradition=traditions,
    )