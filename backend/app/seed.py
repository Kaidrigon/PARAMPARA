from app.database import get_database


def seed_database():
    db = get_database()

    sources = [
        {
            "source_id": "gita-2-47",
            "title": "Bhagavad Gita, Chapter 2, Verse 47",
            "work": "Bhagavad Gita",
            "chapter": 2,
            "verse": 47,
            "language": "Sanskrit",
            "source_type": "primary_text",
            "text": (
                "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\n"
                "मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।"
            ),
            "repository": "Gita Supersite",
            "institution": "IIT Kanpur",
            "url": "https://www.gitasupersite.iitk.ac.in/dv/bhagavadgita/2.47",
            "provenance": {
                "accessed_date": "2026-09-03",
                "status": "verified"
            }
        }
    ]

    contexts = [
        {
            "context_id": "context-gita-2-47",
            "source_id": "gita-2-47",
            "context_type": "textual_context",
            "description": (
                "Verse 2.47 occurs within Krishna's discussion "
                "with Arjuna concerning action, its fruits, "
                "and the proper orientation toward action."
            ),
            "related_verses": [
                "2.46",
                "2.47",
                "2.48",
                "2.49"
            ],
            "notes": [
                "Verse 2.48 continues the discussion through "
                "equanimity and action without attachment.",
                "Verse 2.49 contrasts result-oriented action "
                "with buddhi-yoga."
            ],
            "source_references": [
                "gita-2-47"
            ]
        }
    ]

    interpretations = [
        {
            "interpretation_id": "interp-shankara-gita-2-47",
            "source_id": "gita-2-47",
            "tradition": "Advaita Vedanta",
            "thinker": "Adi Shankaracharya",
            "period": "8th century CE",
            "summary": (
                "Shankara interprets the verse in relation to "
                "action, its fruits, attachment, and avoidance "
                "of attachment to inaction."
            ),
            "evidence_type": "commentary",
            "source_url": "https://www.gitasupersite.iitk.ac.in/",
            "status": "documented_interpretation"
        },
        {
            "interpretation_id": "interp-ramanuja-gita-2-47",
            "source_id": "gita-2-47",
            "tradition": "Vishishtadvaita Vedanta",
            "thinker": "Ramanuja",
            "period": "11th-12th century CE",
            "summary": (
                "Ramanuja interprets the verse in relation to "
                "prescribed action, its fruits, liberation, "
                "and detachment from the fruits of action."
            ),
            "evidence_type": "commentary",
            "source_url": "https://www.gitasupersite.iitk.ac.in/",
            "status": "documented_interpretation"
        }
    ]

    traditions = [
        {
            "tradition_id": "tradition-advaita-vedanta",
            "name": "Advaita Vedanta",
            "tradition_type": "philosophical_tradition",
            "associated_interpreters": [
                "Adi Shankaracharya"
            ],
            "description": (
                "A Vedanta philosophical tradition associated "
                "with non-dual interpretations of self, "
                "ultimate reality, knowledge and liberation."
            ),
            "source_references": [
                "interp-shankara-gita-2-47"
            ]
        },
        {
            "tradition_id": "tradition-vishishtadvaita",
            "name": "Vishishtadvaita Vedanta",
            "tradition_type": "philosophical_tradition",
            "associated_interpreters": [
                "Ramanuja"
            ],
            "description": (
                "A Vedanta philosophical tradition associated "
                "with Ramanuja."
            ),
            "source_references": [
                "interp-ramanuja-gita-2-47"
            ]
        }
    ]

    claims = [
        {
            "claim_id": "claim-gita-work-no-results",
            "claim": (
                "The Gita says you should work but not care "
                "about the results."
            ),
            "aliases": [
                "The Gita says work without worrying about results.",
                "Krishna says focus on action, not results."
            ],
            "source_id": "gita-2-47",
            "context_id": "context-gita-2-47",
            "interpretation_ids": [
                "interp-shankara-gita-2-47",
                "interp-ramanuja-gita-2-47"
            ],
            "tradition_ids": [
                "tradition-advaita-vedanta",
                "tradition-vishishtadvaita"
            ],
            "evidence_type": "modern_claim",
            "status": "verified_with_context"
        }
    ]

    collections = [
        ("sources", sources, "source_id"),
        ("contexts", contexts, "context_id"),
        ("interpretations", interpretations, "interpretation_id"),
        ("traditions", traditions, "tradition_id"),
        ("claims", claims, "claim_id")
    ]

    for collection_name, documents, id_field in collections:
        collection = db[collection_name]

        for document in documents:
            collection.update_one(
                {id_field: document[id_field]},
                {"$set": document},
                upsert=True
            )

    db.sources.create_index("source_id", unique=True)
    db.contexts.create_index("context_id", unique=True)
    db.interpretations.create_index(
        "interpretation_id",
        unique=True
    )
    db.traditions.create_index(
        "tradition_id",
        unique=True
    )
    db.claims.create_index(
        "claim_id",
        unique=True
    )

    print("PARAMPARA database seeded successfully.")


if __name__ == "__main__":
    seed_database()