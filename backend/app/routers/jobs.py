import datetime
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import JobApplication, User, UserActivity
from app.schemas import JobApplicationCreate, JobApplicationUpdate, JobApplicationResponse
from app.auth import get_current_user

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.get("", response_model=List[JobApplicationResponse])
def get_jobs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(JobApplication).filter(JobApplication.user_id == current_user.id).order_by(JobApplication.id.asc()).all()

@router.get("/stats")
def get_job_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    all_jobs = db.query(JobApplication).filter(JobApplication.user_id == current_user.id).all()
    total = len(all_jobs)
    in_progress = sum(1 for j in all_jobs if j.status in ["Interested", "Applied", "Assessment"])
    interview = sum(1 for j in all_jobs if j.status == "Interview")
    selected = sum(1 for j in all_jobs if j.status == "Selected")
    rejected = sum(1 for j in all_jobs if j.status == "Rejected")

    return {
        "total": total,
        "in_progress": in_progress,
        "interview": interview,
        "selected": selected,
        "rejected": rejected
    }

@router.post("", response_model=JobApplicationResponse)
def create_job(job_in: JobApplicationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    job = JobApplication(
        user_id=current_user.id,
        company=job_in.company,
        role=job_in.role,
        job_description=job_in.job_description or "",
        status=job_in.status or "Applied",
        applied_date=job_in.applied_date or datetime.datetime.now().strftime("%b %d, %Y"),
        interview_date=job_in.interview_date or "-",
        location=job_in.location or "Remote",
        salary_range=job_in.salary_range or "",
        notes=job_in.notes or "",
        feedback=job_in.feedback or "",
        resume_id=job_in.resume_id
    )
    db.add(job)
    db.add(UserActivity(
        user_id=current_user.id,
        activity_type="job_added",
        title="Job application added",
        description=f"Applied for {job_in.role} at {job_in.company}",
        time_ago="Just now"
    ))
    db.commit()
    db.refresh(job)
    return job

@router.put("/{job_id}", response_model=JobApplicationResponse)
def update_job(job_id: int, job_in: JobApplicationUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    job = db.query(JobApplication).filter(JobApplication.id == job_id, JobApplication.user_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job application not found")

    for field, val in job_in.model_dump(exclude_unset=True).items():
        setattr(job, field, val)

    db.commit()
    db.refresh(job)
    return job

@router.delete("/{job_id}")
def delete_job(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    job = db.query(JobApplication).filter(JobApplication.id == job_id, JobApplication.user_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job application not found")
    db.delete(job)
    db.commit()
    return {"message": "Job application deleted successfully"}
