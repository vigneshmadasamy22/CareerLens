from typing import List, Optional, Any, Dict
from pydantic import BaseModel

# Auth & User schemas
class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    phone: str
    location: str
    bio: str
    avatar_url: str
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Resume schemas
class ResumeSectionBase(BaseModel):
    section_type: str
    title: str
    content_json: str
    order_index: int = 0
    is_visible: bool = True

class ResumeSectionResponse(ResumeSectionBase):
    id: int
    resume_id: int

    class Config:
        from_attributes = True

class ResumeBase(BaseModel):
    title: str = "My Resume"
    template_id: str = "developer-x"
    font_family: str = "Inter"
    font_size: str = "A"
    accent_color: str = "#7c3aed"
    spacing: str = "compact"
    margin: str = "normal"
    target_role: str = "Software Engineer"
    is_primary: bool = False
    sections: Optional[List[ResumeSectionBase]] = None

class ResumeCreate(ResumeBase):
    pass

class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    template_id: Optional[str] = None
    font_family: Optional[str] = None
    font_size: Optional[str] = None
    accent_color: Optional[str] = None
    spacing: Optional[str] = None
    margin: Optional[str] = None
    target_role: Optional[str] = None
    is_primary: Optional[bool] = None
    sections: Optional[List[ResumeSectionBase]] = None

class ResumeResponse(ResumeBase):
    id: int
    user_id: int
    version_number: int
    created_at: Any
    updated_at: Any
    sections: List[ResumeSectionResponse] = []

    class Config:
        from_attributes = True

# Resume Template schema
class ResumeTemplateResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    preview_image: str
    is_ats_friendly: bool
    layout_type: str
    tags: List[str] = []

# ATS Analysis schemas
class AnalysisRequest(BaseModel):
    resume_id: Optional[int] = None
    job_title: str
    company: Optional[str] = ""
    experience_level: str = "Fresher (0-1 year)"
    job_description: str

class KeywordItem(BaseModel):
    name: str
    category: str # 'Technical', 'Framework', 'Database', 'Tool', 'Soft Skill'
    importance: str = "High" # 'High', 'Medium', 'Low'
    reason: Optional[str] = ""
    placement_advice: Optional[str] = ""

class SuggestionItem(BaseModel):
    id: str
    title: str
    priority: str # 'High Priority', 'Medium Priority', 'Low Priority'
    description: str
    action_type: str # 'summary', 'keyword', 'project', 'grammar'
    suggested_text: Optional[str] = None
    target_section: Optional[str] = None

class AnalysisResponse(BaseModel):
    id: int
    user_id: int
    resume_id: Optional[int] = None
    job_title: str
    company: str
    experience_level: str
    job_description: str
    resume_filename: str
    overall_score: int
    skills_score: int
    experience_score: int
    project_score: int
    keyword_score: int
    readability_score: int
    matched_keywords: List[KeywordItem] = []
    missing_keywords: List[KeywordItem] = []
    partial_keywords: List[KeywordItem] = []
    suggestions: List[SuggestionItem] = []
    weak_sections: List[str] = []
    strong_sections: List[str] = []
    resume_data: Optional[Dict[str, Any]] = None
    created_at: Any

    class Config:
        from_attributes = True

# Job Application schemas
class JobApplicationBase(BaseModel):
    company: str
    role: str
    job_description: Optional[str] = ""
    status: str = "Applied" # 'Interested', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'
    applied_date: Optional[str] = ""
    interview_date: Optional[str] = ""
    location: Optional[str] = "Remote"
    salary_range: Optional[str] = ""
    notes: Optional[str] = ""
    feedback: Optional[str] = ""
    resume_id: Optional[int] = None

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    job_description: Optional[str] = None
    status: Optional[str] = None
    applied_date: Optional[str] = None
    interview_date: Optional[str] = None
    location: Optional[str] = None
    salary_range: Optional[str] = None
    notes: Optional[str] = None
    feedback: Optional[str] = None
    resume_id: Optional[int] = None

class JobApplicationResponse(JobApplicationBase):
    id: int
    user_id: int
    created_at: Any
    updated_at: Any

    class Config:
        from_attributes = True

# Interview Prep schemas
class InterviewQuestionItem(BaseModel):
    id: int
    question: str
    category: str # 'Technical', 'HR', 'Project', 'Mixed'
    difficulty: str # 'Easy', 'Medium', 'Hard'
    sample_answer: Optional[str] = None
    tips: Optional[str] = None

class AnswerSubmission(BaseModel):
    question_id: int
    question: str
    answer: str
    category: str = "Technical"

class AnswerFeedback(BaseModel):
    score: int # out of 10
    strengths: List[str]
    improvements: List[str]
    model_answer: str

# Career Roadmap schemas
class RoadmapPhase(BaseModel):
    id: int
    title: str
    duration: str
    status: str # 'Completed', 'In Progress', 'Upcoming'
    items: List[str]

class RoadmapResponse(BaseModel):
    id: int
    target_role: str
    duration: str
    current_level: str
    progress_percentage: int
    phases: List[RoadmapPhase]

# AI Assistant Request/Response
class AISummaryRequest(BaseModel):
    role: str
    experience_level: str = "Fresher"
    skills: List[str] = []
    projects: List[str] = []

class AIBulletRequest(BaseModel):
    role: str
    raw_bullet: str
    action_type: str = "impact" # 'impact', 'concise', 'technical'

class AISkillRequest(BaseModel):
    role: str
    current_skills: List[str] = []

class AITruthCheckRequest(BaseModel):
    resume_id: Optional[int] = None
    resume_text: Optional[str] = None

class AIRecruiterPerspectiveRequest(BaseModel):
    resume_id: Optional[int] = None
    job_title: str
    job_description: Optional[str] = None
