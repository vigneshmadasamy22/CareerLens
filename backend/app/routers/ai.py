from typing import Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Resume, User
from app.schemas import (
    AISummaryRequest, AIBulletRequest, AISkillRequest,
    AITruthCheckRequest, AIRecruiterPerspectiveRequest
)
from app.auth import get_current_user
from app.ai_assistant import (
    generate_professional_summary, improve_bullet_point,
    recommend_skills_for_role, analyze_truth_and_claims,
    analyze_project_quality, simulate_recruiter_perspectives
)

router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.post("/generate-summary")
def ai_summary(req: AISummaryRequest):
    summary = generate_professional_summary(
        role=req.role,
        experience_level=req.experience_level,
        skills=req.skills,
        projects=req.projects
    )
    return {"summary": summary}

@router.post("/improve-bullet")
def ai_bullet(req: AIBulletRequest):
    improved = improve_bullet_point(req.raw_bullet, req.action_type)
    return {"improved_bullet": improved}

@router.post("/recommend-skills")
def ai_skills(req: AISkillRequest):
    recommended = recommend_skills_for_role(req.role, req.current_skills)
    return {"recommended_skills": recommended}

@router.post("/truth-checker")
def ai_truth_checker(req: AITruthCheckRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    text = req.resume_text or ""
    if not text and req.resume_id:
        resume = db.query(Resume).filter(Resume.id == req.resume_id, Resume.user_id == current_user.id).first()
        if resume:
            text = " ".join([s.content_json for s in resume.sections])
    if not text:
        text = "Engineered enterprise platform using revolutionary architecture with unmatched speed."
    return analyze_truth_and_claims(text)

@router.post("/project-analyzer")
def ai_project_analyzer(req: Dict[str, Any]):
    project_text = req.get("project_description", "EventHub event management platform with Next.js and FastAPI.")
    return analyze_project_quality(project_text)

@router.post("/recruiter-perspective")
def ai_recruiter_perspective(req: AIRecruiterPerspectiveRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    text = ""
    if req.resume_id:
        resume = db.query(Resume).filter(Resume.id == req.resume_id, Resume.user_id == current_user.id).first()
        if resume:
            text = " ".join([s.content_json for s in resume.sections])
    if not text:
        text = "Vignesh Madasamy Full Stack Developer Python React Next.js FastAPI PostgreSQL Docker"
    return simulate_recruiter_perspectives(text, req.job_title)
