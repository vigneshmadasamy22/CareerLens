import os
import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Resume, ResumeSection, User
from app.schemas import ResumeCreate, ResumeUpdate, ResumeResponse
from app.auth import get_current_user
from app.exporter import export_resume_to_pdf, export_resume_to_docx

router = APIRouter(prefix="/api/resumes", tags=["resumes"])

@router.get("", response_model=List[ResumeResponse])
def get_user_resumes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.updated_at.desc()).all()

@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume(resume_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@router.post("", response_model=ResumeResponse)
def create_resume(resume_in: ResumeCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = Resume(
        user_id=current_user.id,
        title=resume_in.title,
        template_id=resume_in.template_id,
        font_family=resume_in.font_family,
        font_size=resume_in.font_size,
        accent_color=resume_in.accent_color,
        spacing=resume_in.spacing,
        margin=resume_in.margin,
        target_role=resume_in.target_role,
        is_primary=resume_in.is_primary
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    if resume_in.sections:
        for idx, sec in enumerate(resume_in.sections):
            section_model = ResumeSection(
                resume_id=resume.id,
                section_type=sec.section_type,
                title=sec.title,
                content_json=sec.content_json,
                order_index=sec.order_index if sec.order_index is not None else idx,
                is_visible=sec.is_visible
            )
            db.add(section_model)
    else:
        # Create standard default sections matching screenshot
        default_sections = [
            ("personal", "Personal Info", json.dumps({"full_name": current_user.full_name or "Vignesh Madasamy", "title": "Computer Science Engineering Student", "email": current_user.email, "phone": "+91 98765 43210", "location": "Karur, Tamil Nadu, India", "linkedin": "linkedin.com/in/vignesh", "github": "github.com/vignesh"})),
            ("summary", "Professional Summary", json.dumps({"text": "Computer Science student with a strong foundation in software development, problem-solving and web technologies. Passionate about building real-world applications and learning new tools."})),
            ("skills", "Skills", json.dumps({"skills": ["Python", "Java", "C++", "React", "Next.js", "FastAPI", "PostgreSQL", "Git", "Docker"]})),
            ("projects", "Projects", json.dumps({"items": [{"title": "EventHub – Event Management System", "role": "Full Stack Developer", "tech_stack": "Next.js, FastAPI, PostgreSQL", "duration": "2026", "bullets": ["Engineered responsive event management platform handling registrations and ticketing.", "Implemented secure JWT authentication and optimized PostgreSQL database queries."]}]})),
            ("education", "Education", json.dumps({"items": [{"degree": "B.Tech in Computer Science & Engineering", "institution": "Amrita Vishwa Vidyapeetham", "year": "2023 - 2027", "score": "CGPA: 8.8 / 10"}]})),
            ("certifications", "Certifications", json.dumps({"items": ["AWS Certified Cloud Practitioner", "PostgreSQL Database Administration"]}))
        ]
        for idx, (sec_type, title, content_json) in enumerate(default_sections):
            db.add(ResumeSection(
                resume_id=resume.id,
                section_type=sec_type,
                title=title,
                content_json=content_json,
                order_index=idx,
                is_visible=True
            ))

    db.commit()
    db.refresh(resume)
    return resume

@router.put("/{resume_id}", response_model=ResumeResponse)
def update_resume(resume_id: int, resume_in: ResumeUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    if resume_in.title is not None:
        resume.title = resume_in.title
    if resume_in.template_id is not None:
        resume.template_id = resume_in.template_id
    if resume_in.font_family is not None:
        resume.font_family = resume_in.font_family
    if resume_in.font_size is not None:
        resume.font_size = resume_in.font_size
    if resume_in.accent_color is not None:
        resume.accent_color = resume_in.accent_color
    if resume_in.spacing is not None:
        resume.spacing = resume_in.spacing
    if resume_in.margin is not None:
        resume.margin = resume_in.margin
    if resume_in.target_role is not None:
        resume.target_role = resume_in.target_role
    if resume_in.is_primary is not None:
        resume.is_primary = resume_in.is_primary

    if resume_in.sections is not None:
        # replace sections
        db.query(ResumeSection).filter(ResumeSection.resume_id == resume.id).delete()
        for idx, sec in enumerate(resume_in.sections):
            db.add(ResumeSection(
                resume_id=resume.id,
                section_type=sec.section_type,
                title=sec.title,
                content_json=sec.content_json,
                order_index=sec.order_index if sec.order_index is not None else idx,
                is_visible=sec.is_visible
            ))

    db.commit()
    db.refresh(resume)
    return resume

@router.delete("/{resume_id}")
def delete_resume(resume_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    db.delete(resume)
    db.commit()
    return {"message": "Resume deleted successfully"}

@router.get("/{resume_id}/export/pdf")
def export_pdf(resume_id: int, page_size: str = Query("A4"), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    exports_dir = os.path.join(os.path.dirname(__file__), "..", "..", "exports")
    os.makedirs(exports_dir, exist_ok=True)
    pdf_path = os.path.join(exports_dir, f"resume_{resume.id}.pdf")

    resume_dict = {
        "title": resume.title,
        "template_id": resume.template_id or "professional-elite",
        "accent_color": resume.accent_color,
        "target_role": resume.target_role,
        "sections": [
            {"section_type": s.section_type, "title": s.title, "content_json": s.content_json}
            for s in resume.sections if s.is_visible
        ]
    }

    export_resume_to_pdf(resume_dict, pdf_path, page_size)
    filename = f"{resume.title.replace(' ', '_')}.pdf"
    return FileResponse(pdf_path, media_type="application/pdf", filename=filename)

@router.post("/export-custom-pdf")
def export_custom_pdf(payload: dict, current_user: User = Depends(get_current_user)):
    """Export custom or live-edited resume data directly to template-accurate PDF."""
    exports_dir = os.path.join(os.path.dirname(__file__), "..", "..", "exports")
    os.makedirs(exports_dir, exist_ok=True)
    pdf_path = os.path.join(exports_dir, f"custom_resume_{current_user.id}.pdf")
    
    export_resume_to_pdf(payload, pdf_path, payload.get("page_size", "A4"))
    filename = f"{payload.get('title', 'My_Resume').replace(' ', '_')}.pdf"
    return FileResponse(pdf_path, media_type="application/pdf", filename=filename)

@router.get("/{resume_id}/export/docx")
def export_docx(resume_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    exports_dir = os.path.join(os.path.dirname(__file__), "..", "..", "exports")
    os.makedirs(exports_dir, exist_ok=True)
    docx_path = os.path.join(exports_dir, f"resume_{resume.id}.docx")

    resume_dict = {
        "title": resume.title,
        "target_role": resume.target_role,
        "sections": [
            {"section_type": s.section_type, "title": s.title, "content_json": s.content_json}
            for s in resume.sections if s.is_visible
        ]
    }

    export_resume_to_docx(resume_dict, docx_path)
    filename = f"{resume.title.replace(' ', '_')}.docx"
    return FileResponse(docx_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename=filename)
