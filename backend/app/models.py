import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False, default="")
    phone = Column(String(64), default="")
    location = Column(String(255), default="")
    bio = Column(Text, default="")
    avatar_url = Column(String(512), default="")
    role = Column(String(64), default="user") # 'user', 'admin'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    analyses = relationship("Analysis", back_populates="user", cascade="all, delete-orphan")
    job_applications = relationship("JobApplication", back_populates="user", cascade="all, delete-orphan")
    interviews = relationship("InterviewSession", back_populates="user", cascade="all, delete-orphan")
    roadmaps = relationship("CareerRoadmap", back_populates="user", cascade="all, delete-orphan")
    activities = relationship("UserActivity", back_populates="user", cascade="all, delete-orphan")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String(255), default="My Resume")
    template_id = Column(String(64), default="developer-x") # matching screenshot: 'developer-x', 'professional-elite', etc.
    font_family = Column(String(64), default="Inter")
    font_size = Column(String(16), default="A") # 'A-', 'A', 'A+'
    accent_color = Column(String(32), default="#7c3aed") # purple accent default
    spacing = Column(String(16), default="compact") # 'compact', 'normal', 'spacious'
    margin = Column(String(16), default="normal")
    target_role = Column(String(255), default="Software Engineer")
    is_primary = Column(Boolean, default=False)
    version_number = Column(Integer, default=1)
    raw_text = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="resumes")
    sections = relationship("ResumeSection", back_populates="resume", cascade="all, delete-orphan", order_by="ResumeSection.order_index")
    analyses = relationship("Analysis", back_populates="resume")


class ResumeSection(Base):
    __tablename__ = "resume_sections"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False, index=True)
    section_type = Column(String(64), nullable=False) # 'personal', 'summary', 'education', 'skills', 'projects', 'experience', 'internships', 'certifications', 'achievements', 'languages'
    title = Column(String(128), default="")
    content_json = Column(Text, default="{}") # serialized JSON of section content
    order_index = Column(Integer, default=0)
    is_visible = Column(Boolean, default=True)

    resume = relationship("Resume", back_populates="sections")


class ResumeTemplate(Base):
    __tablename__ = "resume_templates"

    id = Column(String(64), primary_key=True) # slug: 'developer-x', 'professional-elite', etc.
    name = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False) # 'Professional', 'Modern', 'Minimal', 'Creative', 'Developer', 'Fresher'
    description = Column(Text, default="")
    preview_image = Column(String(512), default="")
    is_ats_friendly = Column(Boolean, default=True)
    layout_type = Column(String(32), default="single-column") # 'single-column', 'two-column', 'sidebar'
    tags_json = Column(Text, default="[]")


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=True, index=True)
    job_title = Column(String(255), nullable=False)
    company = Column(String(255), default="")
    experience_level = Column(String(64), default="Fresher (0-1 year)")
    job_description = Column(Text, default="")
    resume_filename = Column(String(255), default="")
    
    # ATS match metrics
    overall_score = Column(Integer, default=87)
    skills_score = Column(Integer, default=90)
    experience_score = Column(Integer, default=82)
    project_score = Column(Integer, default=88)
    keyword_score = Column(Integer, default=86)
    readability_score = Column(Integer, default=92)

    # Detailed keyword findings
    matched_keywords_json = Column(Text, default="[]")
    missing_keywords_json = Column(Text, default="[]")
    partial_keywords_json = Column(Text, default="[]")

    # Actionable improvement recommendations
    suggestions_json = Column(Text, default="[]")
    weak_sections_json = Column(Text, default="[]")
    strong_sections_json = Column(Text, default="[]")

    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="analyses")
    resume = relationship("Resume", back_populates="analyses")


class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=True)
    company = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    job_description = Column(Text, default="")
    status = Column(String(64), default="Applied") # 'Interested', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'
    applied_date = Column(String(64), default="")
    interview_date = Column(String(64), default="")
    location = Column(String(128), default="Remote")
    salary_range = Column(String(128), default="")
    notes = Column(Text, default="")
    feedback = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="job_applications")


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    target_role = Column(String(255), default="Software Engineer")
    category = Column(String(64), default="Technical") # 'Technical', 'HR', 'Project', 'Mixed'
    questions_json = Column(Text, default="[]")
    answers_json = Column(Text, default="[]")
    feedback_json = Column(Text, default="[]")
    overall_score = Column(Integer, default=85)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="interviews")


class CareerRoadmap(Base):
    __tablename__ = "career_roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    target_role = Column(String(255), default="Software Engineer")
    duration = Column(String(64), default="3 Months")
    current_level = Column(String(64), default="Intermediate")
    progress_percentage = Column(Integer, default=68)
    phases_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="roadmaps")


class UserActivity(Base):
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    activity_type = Column(String(64), nullable=False) # 'resume_created', 'resume_updated', 'resume_analyzed', 'interview_completed', 'job_added'
    title = Column(String(255), nullable=False)
    description = Column(String(255), default="")
    badge_score = Column(String(32), default="")
    time_ago = Column(String(64), default="Just now")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="activities")
