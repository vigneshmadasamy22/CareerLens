import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import SessionLocal
from app.models import Resume
from app.exporter import export_resume_to_pdf
import fitz

def main():
    improved_resume_dict = {
        "title": "Improved_Vignesh_Resume",
        "template_id": "professional-elite",
        "accent_color": "#7c3aed",
        "target_role": "Software Engineer",
        "sections": [
            {
                "section_type": "personal",
                "title": "Personal Info",
                "content_json": '{"full_name": "Vignesh Madasamy", "title": "Software Engineer Undergraduate", "email": "vigneshmadasamy22@gmail.com", "phone": "+91 89031 76646", "location": "Karur, Tamil Nadu, India", "linkedin": "linkedin.com/in/vignesh-madasamy45", "github": "github.com/vignesh-madasamy"}'
            },
            {
                "section_type": "summary",
                "title": "Professional Summary",
                "content_json": '{"text": "Computer Science and Engineering undergraduate proficient in full-stack development with Next.js, Python, FastAPI, and PostgreSQL. Experienced in architecting performant web applications, building scalable REST APIs, and delivering data-driven software solutions."}'
            },
            {
                "section_type": "skills",
                "title": "Technical Skills",
                "content_json": '{"skills": ["Python", "Java", "C", "Data Structures & Algorithms", "OOP", "DBMS", "SQL", "HTML", "CSS", "JavaScript", "Git", "GitHub", "Docker", "CI/CD", "Redis", "REST APIs", "PostgreSQL", "FastAPI"]}'
            },
            {
                "section_type": "education",
                "title": "Education",
                "content_json": '{"items": [{"degree": "B.Tech – Computer Science and Engineering", "institution": "Amrita Vishwa Vidyapeetham, Nagercoil", "year": "Expected 2029", "score": "CGPA: 8.8 / 10"}]}'
            },
            {
                "section_type": "experience",
                "title": "Internship & Training",
                "content_json": '{"items": [{"company": "Internshala Trainings", "role": "Machine Learning with AI — Internship / Online Training", "duration": "Apr 2026 – May 2026", "bullets": ["Completed an 8-week online training covering Python programming, data analytics and machine learning fundamentals.", "Worked with supervised learning concepts including regression and classification, along with unsupervised learning and clustering.", "Explored AI tools and practices used across the machine-learning lifecycle; scored 90% in the final assessment."]}]}'
            },
            {
                "section_type": "projects",
                "title": "Projects",
                "content_json": '{"items": [{"title": "EventHub – Event Management Website", "role": "Full Stack Developer", "tech": "HTML, CSS, JavaScript, REST APIs, PostgreSQL", "duration": "2026", "bullets": ["Architected responsive event management platform using HTML, CSS, JavaScript and RESTful APIs; handled user registrations and event scheduling with 99.9% uptime.", "Optimized PostgreSQL database schemas and integrated secure token-based authentication, reducing transaction response latency by 40%."]}, {"title": "Online Quiz Management System", "role": "Java Developer", "tech": "Java, OOP, SQL", "duration": "2026", "bullets": ["Developed a quiz application with login, timed questions, and score tracking.", "Implemented automatic question progression and result calculation."]}, {"title": "Student Performance Prediction System", "role": "Python Developer", "tech": "Python, Machine Learning", "duration": "2026", "bullets": ["Engineered automated machine learning data pipeline with Python and scikit-learn to analyze academic features, improving predictive model accuracy to 91%.", "Visualized performance distributions using interactive charts and delivered predictive risk reports for student cohorts."]}]}'
            },
            {
                "section_type": "certifications",
                "title": "Certifications",
                "content_json": '{"items": [{"name": "NPTEL – Programming in Java (Elite + Gold, 90%)", "issuer": "NPTEL", "year": "2026"}, {"name": "NPTEL – Fundamentals of Object-Oriented Programming", "issuer": "NPTEL", "year": "2026"}, {"name": "NPTEL – Database Management System (DBMS), 68%", "issuer": "IIT Kharagpur", "year": "2026"}]}'
            },
            {
                "section_type": "achievements",
                "title": "Achievements",
                "content_json": '{"items": [{"title": "NPTEL Elite + Gold Certification (90% score)", "desc": "Top percentile in Java Programming"}]}'
            },
            {
                "section_type": "languages",
                "title": "Languages",
                "content_json": '{"languages": ["English (Professional)", "Tamil (Native)", "Hindi (Basic)"]}'
            }
        ]
    }

    out_path = os.path.join(os.path.dirname(__file__), "..", "exports", "test_improved_single_page.pdf")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    export_resume_to_pdf(improved_resume_dict, out_path, "A4")
    
    doc = fitz.open(out_path)
    print("=" * 40)
    print("IMPROVED RESUME PAGE COUNT:", len(doc))
    print("=" * 40)
    for i, page in enumerate(doc):
        print(f"--- PAGE {i} ---")
        print(page.get_text())

if __name__ == "__main__":
    main()
