import json
import datetime
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models import User, Resume, ResumeSection, Analysis, JobApplication, CareerRoadmap, UserActivity
from app.auth import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if demo user exists
    user = db.query(User).filter(User.email == "vignesh@example.com").first()
    if not user:
        user = User(
            email="vignesh@example.com",
            hashed_password=get_password_hash("password123"),
            full_name="Vignesh Madasamy",
            phone="+91 89031 76646",
            location="Karur, Tamil Nadu, India",
            bio="CSE Student | Amrita Vishwa Vidyapeetham | Software & AI Enthusiast",
            avatar_url="/avatars/vignesh.png",
            role="user"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # 1. Seed Vignesh's primary resume matching screenshot & real uploaded resume
        resume = Resume(
            user_id=user.id,
            title="Vignesh_Developer_Resume",
            template_id="professional-elite",
            font_family="Playfair",
            font_size="A",
            accent_color="#7c3aed", # Purple
            spacing="compact",
            margin="normal",
            target_role="Software Engineer",
            is_primary=True,
            version_number=1,
            raw_text="Vignesh Madasamy CSE Student Amrita Vishwa Vidyapeetham Nagercoil Software Engineer Python Java C HTML CSS JavaScript EventHub Online Quiz Management Student Performance Prediction NPTEL"
        )
        db.add(resume)
        db.commit()
        db.refresh(resume)

        # Resume sections
        sections = [
            ("personal", "Personal Info", json.dumps({
                "full_name": "Vignesh Madasamy",
                "title": "Computer Science & Engineering Undergraduate",
                "email": "vigneshmadasamy22@gmail.com",
                "phone": "+91 89031 76646",
                "location": "Karur, Tamil Nadu, India",
                "linkedin": "linkedin.com/in/vignesh-madasamy45",
                "github": "github.com/vignesh-madasamy"
            }), 0),
            ("summary", "Professional Summary", json.dumps({
                "text": "Computer Science and Engineering undergraduate with hands-on experience building web applications and a strong foundation in DBMS, Python, Java and object-oriented programming. Interested in software engineering and artificial intelligence, with a practical approach to learning and turning concepts into working projects."
            }), 1),
            ("skills", "Technical Skills", json.dumps({
                "skills": ["Python", "Java", "C", "Data Structures & Algorithms", "OOP", "DBMS", "SQL", "HTML", "CSS", "JavaScript", "Git", "GitHub"]
            }), 2),
            ("education", "Education", json.dumps({
                "items": [
                    {
                        "degree": "B.Tech – Computer Science and Engineering",
                        "institution": "Amrita Vishwa Vidyapeetham, Nagercoil",
                        "year": "Expected 2029",
                        "score": "CGPA: 8.8 / 10"
                    }
                ]
            }), 3),
            ("experience", "Internship & Training", json.dumps({
                "items": [
                    {
                        "company": "Internshala Trainings",
                        "role": "Machine Learning with AI — Internship / Online Training",
                        "duration": "Apr 2026 – May 2026",
                        "bullets": [
                            "Completed an 8-week online training covering Python programming, data analytics and machine learning fundamentals.",
                            "Worked with supervised learning concepts including regression and classification, along with unsupervised learning and clustering.",
                            "Explored AI tools and practices used across the machine-learning lifecycle; scored 90% in the final assessment."
                        ]
                    }
                ]
            }), 4),
            ("projects", "Projects", json.dumps({
                "items": [
                    {
                        "title": "EventHub – Event Management Website",
                        "role": "Full Stack Developer",
                        "tech": "HTML, CSS, JavaScript",
                        "duration": "2026",
                        "bullets": [
                            "Developed a website for discovering and organizing events.",
                            "Created pages for event details and booking with interactive forms."
                        ]
                    },
                    {
                        "title": "Online Quiz Management System",
                        "role": "Java Developer",
                        "tech": "Java, OOP, SQL",
                        "duration": "2026",
                        "bullets": [
                            "Developed a quiz application with login, timed questions, and score tracking.",
                            "Implemented automatic question progression and result calculation."
                        ]
                    },
                    {
                        "title": "Student Performance Prediction System",
                        "role": "Python Developer",
                        "tech": "Python, Machine Learning",
                        "duration": "2026",
                        "bullets": [
                            "Developed a Python project to analyze student marks and predict academic performance.",
                            "Used basic Python programming to process student data and display results."
                        ]
                    }
                ]
            }), 5),
            ("certifications", "Certifications", json.dumps({
                "items": [
                    {"name": "NPTEL – Programming in Java (Elite + Gold, 90%)", "issuer": "NPTEL", "year": "2026"},
                    {"name": "NPTEL – Fundamentals of Object-Oriented Programming", "issuer": "NPTEL", "year": "2026"},
                    {"name": "NPTEL – Database Management System (DBMS), 68%", "issuer": "IIT Kharagpur", "year": "2026"}
                ]
            }), 6),
            ("achievements", "Achievements", json.dumps({
                "items": [
                    {"title": "NPTEL Elite + Gold Certification (90% score)", "desc": "Top percentile in Java Programming"}
                ]
            }), 7),
            ("languages", "Languages", json.dumps({
                "items": ["English (Professional)", "Tamil (Native)", "Hindi (Basic)"]
            }), 8)
        ]

        for s_type, s_title, s_json, s_order in sections:
            db.add(ResumeSection(
                resume_id=resume.id,
                section_type=s_type,
                title=s_title,
                content_json=s_json,
                order_index=s_order,
                is_visible=True
            ))

        # 2. Seed ATS Analysis Report matching screenshot (Score 87/100, Software Engineer at TCS • Nov 1, 2026)
        matched_kws = [
            {"name": "Python", "category": "Programming Language", "importance": "High"},
            {"name": "React", "category": "Frontend Framework", "importance": "High"},
            {"name": "Next.js", "category": "Full Stack Framework", "importance": "High"},
            {"name": "FastAPI", "category": "Backend Framework", "importance": "High"},
            {"name": "PostgreSQL", "category": "Database", "importance": "High"},
            {"name": "Git", "category": "Version Control", "importance": "High"},
            {"name": "Docker", "category": "DevOps", "importance": "Medium"},
            {"name": "REST API", "category": "Architecture", "importance": "High"},
            {"name": "SQL", "category": "Database Querying", "importance": "High"},
            {"name": "JavaScript", "category": "Programming Language", "importance": "High"},
            {"name": "TypeScript", "category": "Programming Language", "importance": "High"},
            {"name": "Problem Solving", "category": "Soft Skill", "importance": "Medium"},
            {"name": "Collaboration", "category": "Soft Skill", "importance": "Medium"},
            {"name": "Data Structures", "category": "Core CS", "importance": "High"}
        ]
        missing_kws = [
            {"name": "Kubernetes", "category": "Cloud Orchestration", "importance": "Medium", "placement_advice": "Mention basic familiarity under tools or container orchestration."},
            {"name": "CI/CD Pipelines", "category": "DevOps", "importance": "High", "placement_advice": "Add GitHub Actions CI/CD to your EventHub project bullets."},
            {"name": "Redis Caching", "category": "Cache / Store", "importance": "Medium", "placement_advice": "Describe caching session data in EventHub project."},
            {"name": "AWS Lambda", "category": "Cloud Computing", "importance": "Medium", "placement_advice": "List under Cloud Tools if you have practiced serverless functions."},
            {"name": "Unit Testing (pytest)", "category": "Quality Assurance", "importance": "High", "placement_advice": "Highlight test coverage in your backend development."},
            {"name": "System Design", "category": "Architecture", "importance": "Medium", "placement_advice": "Note your database indexing and API design choices."}
        ]
        partial_kws = [
            {"name": "Microservices", "category": "Architecture", "importance": "Medium", "placement_advice": "Clarify decoupled service communication in your projects."},
            {"name": "Agile / Scrum", "category": "Methodology", "importance": "Low", "placement_advice": "Mention sprint planning and git branching workflows."},
            {"name": "Cloud Deployment", "category": "Cloud", "importance": "Medium", "placement_advice": "State whether your project is hosted on Render, Vercel, or AWS."},
            {"name": "API Documentation", "category": "API", "importance": "Low", "placement_advice": "Mention OpenAPI/Swagger interactive documentation generation in FastAPI."}
        ]
        suggestions = [
            {
                "id": "sug-1",
                "title": "Improve Professional Summary",
                "priority": "High Priority",
                "description": "Make it more role-specific and include key skills from the job description.",
                "action_type": "summary",
                "suggested_text": "Results-driven Software Engineer with hands-on experience building scalable web applications with Next.js, FastAPI, and PostgreSQL. Proven ability to architect secure REST APIs, optimize relational schemas, and deploy containerized services.",
                "target_section": "summary"
            },
            {
                "id": "sug-2",
                "title": "Add Relevant Keywords",
                "priority": "High Priority",
                "description": "Include relevant terms like Docker, CI/CD and APIs in a natural way.",
                "action_type": "keyword",
                "suggested_text": "Skills: Docker, CI/CD, Redis, Unit Testing (pytest), RESTful APIs",
                "target_section": "skills"
            },
            {
                "id": "sug-3",
                "title": "Enhance Project Description",
                "priority": "Medium Priority",
                "description": "Add your contribution, technologies and the impact.",
                "action_type": "project",
                "suggested_text": "Architected full-stack event platform using Next.js and FastAPI; implemented JWT authentication and Redis caching, boosting concurrent request throughput by 40%.",
                "target_section": "projects"
            },
            {
                "id": "sug-4",
                "title": "Fix Grammar & Readability",
                "priority": "Low Priority",
                "description": "Correct minor grammar issues and improve sentence flow.",
                "action_type": "grammar",
                "suggested_text": "Engineered automated data ingestion pipeline reducing batch execution time from 4 hours to 45 minutes.",
                "target_section": "experience"
            }
        ]

        analysis = Analysis(
            user_id=user.id,
            resume_id=resume.id,
            job_title="Software Engineer",
            company="TCS",
            experience_level="Fresher (0-1 year)",
            job_description="Seeking a talented Software Engineer proficient in Python, React, Next.js, FastAPI, PostgreSQL, and Docker. Experience with REST APIs, Git, and automated testing.",
            resume_filename="My_Resume.pdf",
            overall_score=87,
            skills_score=90,
            experience_score=82,
            project_score=88,
            keyword_score=86,
            readability_score=92,
            matched_keywords_json=json.dumps(matched_kws),
            missing_keywords_json=json.dumps(missing_kws),
            partial_keywords_json=json.dumps(partial_kws),
            suggestions_json=json.dumps(suggestions),
            weak_sections_json=json.dumps(["Keyword Coverage", "Quantifiable Metrics"]),
            strong_sections_json=json.dumps(["Skills Match", "Project Relevance", "Resume Readability"])
        )
        db.add(analysis)

        # 3. Seed Job Applications matching screenshot (12 Total: 5 In Progress, 3 Interview, 2 Selected, 2 Rejected)
        job_apps = [
            ("TCS", "Software Engineer", "Interview", "Oct 21, 2026", "Nov 5, 2026"),
            ("Infosys", "Full Stack Developer", "Assessment", "Oct 18, 2026", "-"),
            ("Zoho", "Software Engineer", "Applied", "Oct 10, 2026", "-"),
            ("Wipro", "Backend Developer", "Interview", "Oct 12, 2026", "Nov 12, 2026"),
            ("Cognizant", "Java / Python Developer", "Selected", "Sep 28, 2026", "Completed"),
            ("Amazon", "SDE-1", "Rejected", "Aug 15, 2026", "-"),
            ("Google", "Associate Software Engineer", "Rejected", "Jul 10, 2026", "-"),
            ("Freshworks", "Frontend Engineer", "Selected", "Oct 01, 2026", "Offer Received"),
            ("Accenture", "Associate Software Engineer", "Interview", "Oct 25, 2026", "Nov 8, 2026"),
            ("HCLTech", "Graduate Engineer Trainee", "Applied", "Oct 28, 2026", "-"),
            ("Tech Mahindra", "Software Engineer", "Interested", "Oct 30, 2026", "-"),
            ("Capgemini", "Full Stack Engineer", "Applied", "Oct 29, 2026", "-")
        ]

        for comp, role, status, app_date, int_date in job_apps:
            db.add(JobApplication(
                user_id=user.id,
                company=comp,
                role=role,
                status=status,
                applied_date=app_date,
                interview_date=int_date,
                location="Chennai / Bangalore / Remote",
                resume_id=resume.id
            ))

        # 4. Seed Career Roadmap matching screenshot (68% Progress)
        phases = [
            {
                "id": 1,
                "title": "Phase 1: Strengthen Fundamentals (2 Weeks)",
                "duration": "2 Weeks",
                "status": "Completed",
                "items": [
                    "Revise DSA and problem solving",
                    "Improve core CS concepts (OS, DBMS, CN)"
                ]
            },
            {
                "id": 2,
                "title": "Phase 2: Build Relevant Skills (4 Weeks)",
                "duration": "4 Weeks",
                "status": "In Progress",
                "items": [
                    "Learn Next.js and FastAPI",
                    "Build 2 real-world projects"
                ]
            },
            {
                "id": 3,
                "title": "Phase 3: Get Job Ready (2 Weeks)",
                "duration": "2 Weeks",
                "status": "Upcoming",
                "items": [
                    "Practice mock interviews",
                    "Optimize your resume and apply for jobs"
                ]
            }
        ]
        db.add(CareerRoadmap(
            user_id=user.id,
            target_role="Software Engineer",
            duration="3 Months",
            current_level="Intermediate",
            progress_percentage=68,
            phases_json=json.dumps(phases)
        ))

        # 5. Seed Activities matching screenshot
        activities = [
            ("resume_analyzed", "Resume analyzed", "Analysis for Software Engineer at TCS", "87%", "2h ago"),
            ("resume_updated", "Resume updated", "Saved changes to Vignesh_Developer_Resume", "", "5h ago"),
            ("interview_completed", "Mock interview completed", "Completed Technical & System Design practice", "9/10", "1d ago"),
            ("job_added", "Job application added", "Applied for Software Engineer at TCS", "", "2d ago")
        ]
        for act_type, title, desc, badge, time_ago in activities:
            db.add(UserActivity(
                user_id=user.id,
                activity_type=act_type,
                title=title,
                description=desc,
                badge_score=badge,
                time_ago=time_ago
            ))

        db.commit()
    else:
        # Refresh existing user's primary resume with candidate's real sections
        user.phone = "+91 89031 76646"
        resume = db.query(Resume).filter(Resume.user_id == user.id, Resume.is_primary == True).first()
        if resume:
            resume.template_id = "professional-elite"
            db.query(ResumeSection).filter(ResumeSection.resume_id == resume.id).delete()
            sections = [
                ("personal", "Personal Info", json.dumps({
                    "full_name": "Vignesh Madasamy",
                    "title": "Computer Science & Engineering Undergraduate",
                    "email": "vigneshmadasamy22@gmail.com",
                    "phone": "+91 89031 76646",
                    "location": "Karur, Tamil Nadu, India",
                    "linkedin": "linkedin.com/in/vignesh-madasamy45",
                    "github": "github.com/vignesh-madasamy"
                }), 0),
                ("summary", "Professional Summary", json.dumps({
                    "text": "Computer Science and Engineering undergraduate with hands-on experience building web applications and a strong foundation in DBMS, Python, Java and object-oriented programming. Interested in software engineering and artificial intelligence, with a practical approach to learning and turning concepts into working projects."
                }), 1),
                ("skills", "Technical Skills", json.dumps({
                    "skills": ["Python", "Java", "C", "Data Structures & Algorithms", "OOP", "DBMS", "SQL", "HTML", "CSS", "JavaScript", "Git", "GitHub"]
                }), 2),
                ("education", "Education", json.dumps({
                    "items": [
                        {
                            "degree": "B.Tech – Computer Science and Engineering",
                            "institution": "Amrita Vishwa Vidyapeetham, Nagercoil",
                            "year": "Expected 2029",
                            "score": "CGPA: 8.8 / 10"
                        }
                    ]
                }), 3),
                ("experience", "Internship & Training", json.dumps({
                    "items": [
                        {
                            "company": "Internshala Trainings",
                            "role": "Machine Learning with AI — Internship / Online Training",
                            "duration": "Apr 2026 – May 2026",
                            "bullets": [
                                "Completed an 8-week online training covering Python programming, data analytics and machine learning fundamentals.",
                                "Worked with supervised learning concepts including regression and classification, along with unsupervised learning and clustering.",
                                "Explored AI tools and practices used across the machine-learning lifecycle; scored 90% in the final assessment."
                            ]
                        }
                    ]
                }), 4),
                ("projects", "Projects", json.dumps({
                    "items": [
                        {
                            "title": "EventHub – Event Management Website",
                            "role": "Full Stack Developer",
                            "tech": "HTML, CSS, JavaScript",
                            "duration": "2026",
                            "bullets": [
                                "Developed a website for discovering and organizing events.",
                                "Created pages for event details and booking with interactive forms."
                            ]
                        },
                        {
                            "title": "Online Quiz Management System",
                            "role": "Java Developer",
                            "tech": "Java, OOP, SQL",
                            "duration": "2026",
                            "bullets": [
                                "Developed a quiz application with login, timed questions, and score tracking.",
                                "Implemented automatic question progression and result calculation."
                            ]
                        },
                        {
                            "title": "Student Performance Prediction System",
                            "role": "Python Developer",
                            "tech": "Python, Machine Learning",
                            "duration": "2026",
                            "bullets": [
                                "Developed a Python project to analyze student marks and predict academic performance.",
                                "Used basic Python programming to process student data and display results."
                            ]
                        }
                    ]
                }), 5),
                ("certifications", "Certifications", json.dumps({
                    "items": [
                        {"name": "NPTEL – Programming in Java (Elite + Gold, 90%)", "issuer": "NPTEL", "year": "2026"},
                        {"name": "NPTEL – Fundamentals of Object-Oriented Programming", "issuer": "NPTEL", "year": "2026"},
                        {"name": "NPTEL – Database Management System (DBMS), 68%", "issuer": "IIT Kharagpur", "year": "2026"}
                    ]
                }), 6),
                ("achievements", "Achievements", json.dumps({
                    "items": [
                        {"title": "NPTEL Elite + Gold Certification (90% score)", "desc": "Top percentile in Java Programming"}
                    ]
                }), 7),
                ("languages", "Languages", json.dumps({
                    "items": ["English (Professional)", "Tamil (Native)", "Hindi (Basic)"]
                }), 8)
            ]
            for s_type, s_title, s_json, s_order in sections:
                db.add(ResumeSection(
                    resume_id=resume.id,
                    section_type=s_type,
                    title=s_title,
                    content_json=s_json,
                    order_index=s_order,
                    is_visible=True
                ))
            db.commit()

    db.close()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully!")
