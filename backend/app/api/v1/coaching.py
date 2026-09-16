from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.api.v1.auth import get_current_user
from app.models.user import User

# ponytail: Rule-based + heuristic athletic coaching synthesis with zero expensive LLM tokens
router = APIRouter(prefix="/coaching", tags=["coaching"])

@router.post("/feedback")
async def generate_coaching_feedback(
    data: Dict[str, Any],
    current_user: User = Depends(get_current_user)
):
    exercise = data.get("exercise", "Barbell Back Squat")
    avg_score = data.get("avg_score", 85)
    flaws = data.get("flaws", [])

    feedback: List[str] = []

    if avg_score >= 90:
        feedback.append("Elite neuromuscular coordination. Your joint stability is near competition caliber.")
    elif avg_score >= 80:
        feedback.append("Solid kinetic chain execution. Focus on maintaining a consistent 2.5-second eccentric tempo.")
    else:
        feedback.append("Form breakdown detected under volume load. Consider reducing resistance to solidify motor patterns.")

    if any("valgus" in f.lower() for f in flaws):
        feedback.append("Bilateral knee collapse: Queue 'screw your feet into the floor' to recruit your gluteus medius.")

    if any("spine" in f.lower() or "lumbar" in f.lower() for f in flaws):
        feedback.append("Lumbar flexion: Brace your abdominal wall prior to initiation and keep your sternum proud.")

    return {
        "athlete": current_user.full_name or "Athlete",
        "exercise": exercise,
        "recommendations": feedback
    }
