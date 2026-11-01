import os
import json
from app.database import SessionLocal
from app.models import User, Resume, Analysis, JobApplication, CareerRoadmap
from app.ats_engine import analyze_resume_ats
from app.ai_assistant import generate_professional_summary, improve_bullet_point, analyze_truth_and_claims
from app.exporter import export_resume_to_pdf, export_resume_to_docx

def test_database_entities():
    db = SessionLocal()
    user = db.query(User).filter(User.email == "vignesh@example.com").first()
    assert user is not None, "User should be seeded"
    assert user.full_name == "Vignesh Madasamy"

    resume = db.query(Resume).filter(Resume.user_id == user.id).first()
    assert resume is not None, "Primary resume should be present"
    assert len(resume.sections) >= 5, "Resume should have all standard sections"

    analysis = db.query(Analysis).filter(Analysis.user_id == user.id).first()
    assert analysis is not None
    assert analysis.overall_score == 87, "Best ATS score should match 87"

    jobs = db.query(JobApplication).filter(JobApplication.user_id == user.id).all()
    assert len(jobs) >= 5, "Job tracker should have seeded applications"

    roadmap = db.query(CareerRoadmap).filter(CareerRoadmap.user_id == user.id).first()
    assert roadmap is not None
    assert roadmap.progress_percentage == 68

    db.close()
    print("Database entities verified successfully!")

def test_ats_scoring_engine():
    resume_text = "Vignesh Madasamy Software Engineer Python React Next.js FastAPI PostgreSQL Docker Git REST APIs"
    res = analyze_resume_ats(
        resume_text=resume_text,
        job_title="Software Engineer",
        company="TCS",
        experience_level="Fresher (0-1 year)",
        job_description="Looking for Software Engineer with Python, React, Next.js, FastAPI, Docker, and PostgreSQL."
    )
    assert res["overall_score"] >= 80, f"Expected ATS score >= 80, got {res['overall_score']}"
    assert len(res["matched_keywords"]) >= 5, "Should match core tech keywords"
    assert len(res["suggestions"]) == 4, "Should provide 4 structured suggestions matching UI"
    print("ATS engine verified successfully! Score:", res["overall_score"])

def test_ai_assistants():
    summary = generate_professional_summary("Software Engineer", "Fresher", ["Next.js", "FastAPI", "PostgreSQL"])
    assert "Computer Science" in summary or "Software" in summary
    
    bullet = improve_bullet_point("built event platform with nextjs")
    assert "Architected" in bullet or "engineered" in bullet

    truth = analyze_truth_and_claims("Built revolutionary platform with unmatched speeds")
    assert truth["credibility_score"] > 0
    assert len(truth["findings"]) >= 1
    print("AI assistants verified successfully!")

def test_pdf_and_docx_exporters():
    test_resume = {
        "title": "Test_Resume",
        "accent_color": "#7c3aed",
        "target_role": "Software Engineer",
        "sections": [
            {
                "section_type": "personal",
                "title": "Personal Info",
                "content_json": json.dumps({
                    "full_name": "Vignesh Madasamy",
                    "title": "Software Engineer",
                    "email": "vignesh@example.com",
                    "phone": "+91 98765 43210",
                    "location": "Tamil Nadu, India"
                })
            },
            {
                "section_type": "summary",
                "title": "Professional Summary",
                "content_json": json.dumps({"text": "Full stack engineer proficient in modern web applications."})
            },
            {
                "section_type": "skills",
                "title": "Skills",
                "content_json": json.dumps({"skills": ["Python", "React", "FastAPI", "PostgreSQL"]})
            }
        ]
    }

    os.makedirs("./exports", exist_ok=True)
    pdf_out = "./exports/test_output.pdf"
    docx_out = "./exports/test_output.docx"

    export_resume_to_pdf(test_resume, pdf_out)
    assert os.path.exists(pdf_out) and os.path.getsize(pdf_out) > 1000

    export_resume_to_docx(test_resume, docx_out)
    assert os.path.exists(docx_out) and os.path.getsize(docx_out) > 1000
    print("PDF and DOCX exporters verified successfully!")

def test_interview_bank():
    from app.ai_assistant import INTERVIEW_BANK, generate_interview_questions
    total_q = sum(len(q_list) for q_list in INTERVIEW_BANK.values())
    assert total_q >= 30, f"Expected >= 30 questions, got {total_q}"
    assert len(generate_interview_questions("Software Engineer", "Technical")) >= 10
    assert len(generate_interview_questions("Software Engineer", "HR")) >= 8
    print(f"Interview bank verified successfully! Total questions available: {total_q}")

if __name__ == "__main__":
    test_database_entities()
    test_ats_scoring_engine()
    test_ai_assistants()
    test_interview_bank()
    test_pdf_and_docx_exporters()
    print("ALL CORE INTEGRATION TESTS PASSED 100%!")
