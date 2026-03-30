from fastapi import APIRouter, HTTPException
from typing import List
from ..db.db_config import get_database
from ..db.models import FAQCreate, FAQResponse

router = APIRouter(prefix="/api/faqs", tags=["FAQs"])

@router.get("", response_model=List[FAQResponse])
async def get_faqs():
    """Get all FAQs"""
    db = get_database()

    faqs = list(db.faqs.find())

    # Format response
    formatted_faqs = []
    for faq in faqs:
        formatted_faqs.append(FAQResponse(
            id=str(faq["_id"]),
            question=faq["question"],
            answer=faq["answer"]
        ))

    return formatted_faqs

@router.post("", response_model=FAQResponse)
async def create_faq(faq: FAQCreate):
    """Create a new FAQ (admin use)"""
    db = get_database()

    faq_doc = {
        "question": faq.question,
        "answer": faq.answer
    }

    result = db.faqs.insert_one(faq_doc)

    return FAQResponse(
        id=str(result.inserted_id),
        question=faq.question,
        answer=faq.answer
    )