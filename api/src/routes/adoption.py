from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from ..db.db_config import get_database
from .auth import get_current_user

router = APIRouter(prefix="/api/adoption-requests", tags=["Adoption Requests"])

@router.get("/user")
async def get_user_adoption_requests(current_user=Depends(get_current_user)):
    """Get current user's adoption requests"""
    db = get_database()

    # Filter by adopter_user_id and sort by created_at desc
    requests = list(
        db.adoption_requests.find(
            {"adopter_user_id": current_user["id"]}
        ).sort("created_at", -1)
    )

    # Format response
    formatted_requests = []
    for req in requests:
        formatted_requests.append({
            "id": str(req["_id"]),
            "pet_name": req.get("pet_name", ""),
            "message": req.get("message", ""),
            "status": req.get("status", "Pending"),
            "created_at": req.get("created_at").isoformat() if req.get("created_at") else None
        })

    return {
        "requests": formatted_requests,
        "total": len(formatted_requests)
    }

@router.delete("/user/{request_id}")
async def cancel_adoption_request(
    request_id: str,
    current_user=Depends(get_current_user)
):
    """Cancel a pending adoption request (Adopter only)"""
    db = get_database()

    try:
        request_object_id = ObjectId(request_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request ID")

    # Find the adoption request
    adoption_request = db.adoption_requests.find_one({"_id": request_object_id})
    if not adoption_request:
        raise HTTPException(status_code=404, detail="Adoption request not found")

    # Verify the request belongs to the current user
    if adoption_request.get("adopter_user_id") != current_user["id"]:
        raise HTTPException(status_code=403, detail="You can only cancel your own requests")

    # Only allow cancelling pending requests
    if adoption_request.get("status") != "Pending":
        raise HTTPException(
            status_code=400,
            detail="You can only cancel pending requests"
        )

    # Delete the request
    result = db.adoption_requests.delete_one({"_id": request_object_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=500, detail="Failed to cancel request")

    return {
        "message": "Adoption request cancelled successfully",
        "id": request_id
    }