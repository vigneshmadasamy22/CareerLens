import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InterviewSession, User, UserActivity
from app.schemas import InterviewQuestionItem, AnswerSubmission, AnswerFeedback
from app.auth import get_current_user
from app.ai_assistant import generate_interview_questions, evaluate_interview_answer

router = APIRouter(prefix="/api/interviews", tags=["interviews"])

@router.get("/questions", response_model=List[InterviewQuestionItem])
def get_questions(
    role: str = Query("Software Engineer"),
    category: str = Query("Technical")
):
    return generate_interview_questions(role, category)

@router.post("/evaluate", response_model=AnswerFeedback)
def evaluate_answer(
    submission: AnswerSubmission,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    feedback = evaluate_interview_answer(
        question=submission.question,
        user_answer=submission.answer,
        category=submission.category
    )

    # Log user activity
    db.add(UserActivity(
        user_id=current_user.id,
        activity_type="interview_completed",
        title="Mock interview completed",
        description=f"Completed {submission.category} practice question",
        badge_score=f"{feedback['score']}/10",
        time_ago="Just now"
    ))
    db.commit()

    return feedback
