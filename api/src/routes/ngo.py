from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from bson import ObjectId

from ..db.db_config import get_database
from ..db.models import AdoptionRequestStatusUpdate
from .auth import get_current_user

router = APIRouter(prefix="/api/ngo", tags=["NGO"])

@router.get("/dashboard")
async def get_ngo_dashboard(current_user = Depends(get_current_user)):
    """Get NGO dashboard data (requires NGO user)"""
    # Verify user is an NGO
    if current_user["user_type"] != "NGO":
        raise HTTPException(status_code=403, detail="Access denied. NGO users only.")
    
    db = get_database()
    
    pets = list(db.pets.find({"ngo_user_id": current_user["id"]}))
    pets_count = len(pets)
    active_pets = len([pet for pet in pets if pet.get("is_adopted") is not True])

    adoption_requests = list(
        db.adoption_requests.find({"ngo_user_id": current_user["id"]}).sort("created_at", -1)
    )

    pending_requests = 0
    approved_requests = 0

    for request in adoption_requests:
        request["_id"] = str(request["_id"])
        request["requestDate"] = request.get("created_at", datetime.utcnow()).isoformat()
        if request.get("status") == "Pending":
            pending_requests += 1
        if request.get("status") == "Approved":
            approved_requests += 1

    pet_status_map = {}
    for request in adoption_requests:
        pet_id = request.get("pet_id")
        if not pet_id:
            continue

        status = request.get("status")
        if status == "Approved":
            pet_status_map[pet_id] = "Adopted"
        elif status == "Pending" and pet_status_map.get(pet_id) != "Adopted":
            pet_status_map[pet_id] = "Pending"

    for pet in pets:
        pet_id = str(pet["_id"])
        pet["_id"] = pet_id
        if pet.get("is_adopted") is True:
            pet["status"] = "Adopted"
        else:
            pet["status"] = pet_status_map.get(pet_id, "Available")

    return {
        "user": current_user,
        "stats": {
            "total_pets": pets_count,
            "active_pets": active_pets,
            "adoption_requests": len(adoption_requests),
            "approved_adoptions": approved_requests,
            "pending_requests": pending_requests,
        },
        "pets": pets,
        "adoption_requests": adoption_requests,
        "message": "Welcome to your NGO dashboard!"
    }


@router.patch("/adoption-requests/{request_id}/status")
async def update_adoption_request_status(
    request_id: str,
    payload: AdoptionRequestStatusUpdate,
    current_user=Depends(get_current_user)
):
    """Approve or reject an adoption request (NGO only)."""
    if current_user["user_type"] != "NGO":
        raise HTTPException(status_code=403, detail="Access denied. NGO users only.")

    db = get_database()

    try:
        request_object_id = ObjectId(request_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request ID")

    adoption_request = db.adoption_requests.find_one({"_id": request_object_id})
    if not adoption_request:
        raise HTTPException(status_code=404, detail="Adoption request not found")

    if adoption_request.get("ngo_user_id") != current_user["id"]:
        raise HTTPException(status_code=403, detail="You can only manage requests for your own pets")

    pet_id = adoption_request.get("pet_id")
    try:
        pet_object_id = ObjectId(pet_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid pet ID in request")

    pet = db.pets.find_one({"_id": pet_object_id})
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found for this request")

    if payload.status == "Approved" and pet.get("is_adopted") is True and str(pet.get("adopted_request_id")) != request_id:
        raise HTTPException(status_code=409, detail="This pet is already adopted")

    db.adoption_requests.update_one(
        {"_id": request_object_id},
        {
            "$set": {
                "status": payload.status,
                "updated_at": datetime.utcnow()
            }
        }
    )

    if payload.status == "Approved":
        db.pets.update_one(
            {"_id": pet_object_id},
            {
                "$set": {
                    "is_adopted": True,
                    "adopted_at": datetime.utcnow(),
                    "adopted_request_id": request_id
                }
            }
        )

        db.adoption_requests.update_many(
            {
                "pet_id": adoption_request.get("pet_id"),
                "_id": {"$ne": request_object_id},
                "status": "Pending"
            },
            {
                "$set": {
                    "status": "Rejected",
                    "updated_at": datetime.utcnow()
                }
            }
        )

    return {
        "id": request_id,
        "status": payload.status,
        "message": f"Adoption request {payload.status.lower()} successfully"
    }