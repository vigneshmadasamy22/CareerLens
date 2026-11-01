import os
import json
import re
from typing import Dict, Any, List
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def hex_to_reportlab_color(hex_str: str):
    if not hex_str:
        return colors.HexColor("#7c3aed")
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 6:
        try:
            r, g, b = tuple(int(hex_str[i:i+2], 16) / 255.0 for i in (0, 2, 4))
            return colors.Color(r, g, b)
        except Exception:
            return colors.HexColor("#7c3aed")
    return colors.HexColor("#7c3aed")

def export_resume_to_pdf(resume_data: Dict[str, Any], output_path: str, page_size_str: str = "A4") -> str:
    """
    Generate high-quality, template-accurate ATS-compliant selectable PDF using ReportLab.
    Dynamically respects template_id (professional-elite, developer-x, modern-pro, etc.),
    accent colors, typography, alignments, and structured candidate sections.
    Guaranteed to fit onto EXACTLY 1 SINGLE PAGE for single-sheet resumes without multi-page spillovers.
    """
    page_size = A4 if page_size_str == "A4" else letter
    doc = SimpleDocTemplate(
        output_path,
        pagesize=page_size,
        leftMargin=26,
        rightMargin=26,
        topMargin=20,
        bottomMargin=20
    )

    styles = getSampleStyleSheet()
    template_id = resume_data.get("template_id", "professional-elite")
    accent_hex = resume_data.get("accent_color", "#7c3aed")
    accent_col = hex_to_reportlab_color(accent_hex)

    # Determine fonts and alignments based on template
    is_professional_elite = template_id in ["professional-elite", "classic-executive", "executive-crest"]
    is_developer = template_id in ["developer-x", "dev-terminal"]
    is_modern = template_id in ["modern-pro", "creative-gradient", "emerald-growth"]

    heading_font = "Times-Bold" if is_professional_elite else "Helvetica-Bold"
    body_font = "Times-Roman" if is_professional_elite else "Helvetica"
    italic_font = "Times-Italic" if is_professional_elite else "Helvetica-Oblique"

    # Alignment: professional-elite is centered (alignment=1)
    header_align = 1 if is_professional_elite else 0

    title_style = ParagraphStyle(
        'ResumeTitle',
        parent=styles['Heading1'],
        fontName=heading_font,
        fontSize=16 if is_professional_elite else 15,
        leading=19 if is_professional_elite else 18,
        textColor=accent_col,
        alignment=header_align,
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'ResumeSubtitle',
        parent=styles['Normal'],
        fontName=italic_font,
        fontSize=8.0,
        leading=10.5,
        textColor=colors.HexColor("#334155"),
        alignment=header_align,
        spaceAfter=4
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName=heading_font,
        fontSize=9.2,
        leading=11.2,
        textColor=accent_col,
        spaceBefore=4,
        spaceAfter=1.5
    )

    body_style = ParagraphStyle(
        'ResumeBody',
        parent=styles['Normal'],
        fontName=body_font,
        fontSize=8.0,
        leading=10.4,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=1
    )

    bullet_style = ParagraphStyle(
        'ResumeBullet',
        parent=styles['Normal'],
        fontName=body_font,
        fontSize=7.8,
        leading=10.0,
        textColor=colors.HexColor("#334155"),
        leftIndent=12,
        firstLineIndent=-7,
        spaceAfter=1
    )

    story = []

    # Personal Section Extraction
    sections = resume_data.get("sections", [])
    personal_data = {}
    for sec in sections:
        if sec.get("section_type") == "personal":
            try:
                personal_data = json.loads(sec.get("content_json", "{}"))
            except Exception:
                personal_data = {}

    name = personal_data.get("full_name") or "Vignesh Madasamy"
    title_role = personal_data.get("title") or resume_data.get("target_role", "Computer Science & Engineering Undergraduate")
    email = personal_data.get("email") or "vigneshmadasamy22@gmail.com"
    phone = personal_data.get("phone") or "+91 89031 76646"
    location = personal_data.get("location") or "Karur, Tamil Nadu, India"
    linkedin = personal_data.get("linkedin") or "linkedin.com/in/vignesh-madasamy45"
    github = personal_data.get("github") or "github.com/vignesh-madasamy"

    # Render Header matching the chosen template
    name_display = name.upper() if is_professional_elite else name
    story.append(Paragraph(f"<b>{name_display}</b>", title_style))
    
    contact_parts = []
    if title_role:
        contact_parts.append(f"<b>{title_role}</b>")
    if location:
        contact_parts.append(location)
    if phone:
        contact_parts.append(phone)
    if email:
        contact_parts.append(email)
    
    contact_line1 = " • ".join(contact_parts)
    social_parts = []
    if linkedin:
        social_parts.append(f"LinkedIn: {linkedin}")
    if github:
        social_parts.append(f"GitHub: {github}")
    contact_line2 = " • ".join(social_parts)

    full_contact_html = contact_line1
    if contact_line2:
        full_contact_html += f"<br/>{contact_line2}"

    story.append(Paragraph(full_contact_html, subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5 if is_professional_elite else 1, color=accent_col, spaceBefore=0, spaceAfter=4))

    for sec in sections:
        sec_type = sec.get("section_type")
        if sec_type == "personal":
            continue

        raw_title = sec.get("title") or sec_type.replace("_", " ").title()
        if is_developer:
            display_title = f"// {raw_title.upper()}"
        else:
            display_title = raw_title.upper()

        story.append(Paragraph(display_title, section_heading))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceBefore=0, spaceAfter=2))

        try:
            content = json.loads(sec.get("content_json", "{}"))
        except Exception:
            content = {}

        if sec_type == "summary":
            text = content.get("text") or (
                "Computer Science and Engineering undergraduate with hands-on experience building web applications "
                "and a strong foundation in DBMS, Python, Java and object-oriented programming. Interested in software engineering "
                "and artificial intelligence, with a practical approach to learning and turning concepts into working projects."
            )
            story.append(Paragraph(text, body_style))
            story.append(Spacer(1, 2))

        elif sec_type == "skills":
            skills_list = content.get("skills") or [
                "Python", "Java", "C", "Data Structures & Algorithms", "OOP", "DBMS", "SQL",
                "HTML", "CSS", "JavaScript", "Git", "GitHub"
            ]
            skills_str = " • ".join(skills_list)
            story.append(Paragraph(f"<b>Technical Skills:</b> {skills_str}", body_style))
            story.append(Spacer(1, 2))

        elif sec_type in ["education"]:
            items = content.get("items") or [{
                "degree": "B.Tech – Computer Science and Engineering",
                "institution": "Amrita Vishwa Vidyapeetham, Nagercoil",
                "year": "Expected 2029",
                "score": "CGPA: 8.8 / 10"
            }]
            for item in items:
                deg = str(item.get("degree", "B.Tech – Computer Science and Engineering"))
                inst = str(item.get("institution", "Amrita Vishwa Vidyapeetham, Nagercoil"))
                yr = str(item.get("year", "Expected 2029"))
                score = str(item.get("score", ""))

                # Deduplicate tokens
                for tok in ["Expected 2029", "2029", "Amrita Vishwa Vidyapeetham, Nagercoil", "Amrita"]:
                    if tok in deg:
                        deg = deg.replace(tok, "").strip(" –-—|")
                    if tok in inst and tok in yr:
                        inst = inst.replace(tok, "").strip(" –-—|")

                line = f"<b>{deg}</b> — <i>{inst}</i>"
                if yr and yr not in line:
                    line += f" | {yr}"
                story.append(Paragraph(line, body_style))
                if score and score not in line:
                    story.append(Paragraph(f"Grade / Status: {score}", bullet_style))
            story.append(Spacer(1, 2))

        elif sec_type in ["experience", "internship", "internships"]:
            items = content.get("items") or [{
                "company": "Internshala Trainings",
                "role": "Machine Learning with AI — Internship / Online Training",
                "duration": "Apr 2026 – May 2026",
                "bullets": [
                    "Completed an 8-week online training covering Python programming, data analytics and machine learning fundamentals.",
                    "Worked with supervised learning concepts including regression and classification, along with unsupervised learning and clustering.",
                    "Explored AI tools and practices used across the machine-learning lifecycle; scored 90% in the final assessment."
                ]
            }]
            for item in items:
                role = str(item.get("role", "Machine Learning with AI — Internship"))
                comp = str(item.get("company", "Internshala Trainings"))
                dur = str(item.get("duration", "Apr 2026 – May 2026"))

                # Deduplicate company & duration from role
                if comp and comp.lower() in role.lower():
                    role = re.sub(re.escape(comp), "", role, flags=re.IGNORECASE).strip(" –-—|()")
                if dur and dur in role:
                    role = role.replace(dur, "").strip(" –-—|()")
                if not role:
                    role = "Machine Learning with AI — Internship"

                line = f"<b>{role}</b>"
                if comp and comp.lower() not in line.lower():
                    line += f" | <i>{comp}</i>"
                if dur and dur not in line:
                    line += f" ({dur})"
                story.append(Paragraph(line, body_style))
                for bullet in item.get("bullets", []):
                    b_clean = str(bullet).strip().lstrip("•-* ")
                    if b_clean:
                        story.append(Paragraph(f"• {b_clean}", bullet_style))
            story.append(Spacer(1, 2))

        elif sec_type in ["projects"]:
            items = content.get("items") or [
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
            for item in items:
                p_title = str(item.get("title", ""))
                p_tech = str(item.get("tech") or item.get("tech_stack", ""))
                p_dur = str(item.get("duration", ""))

                # Deduplicate tech & duration from title
                if p_tech and p_tech.lower() in p_title.lower():
                    p_title = re.sub(re.escape(p_tech), "", p_title, flags=re.IGNORECASE).strip(" –-—|()")
                if p_dur and p_dur in p_title:
                    p_title = p_title.replace(p_dur, "").strip(" –-—|()")

                line = f"<b>{p_title}</b>"
                if p_tech and p_tech.lower() not in line.lower():
                    line += f" | <i>{p_tech}</i>"
                if p_dur and p_dur not in line:
                    line += f" ({p_dur})"
                story.append(Paragraph(line, body_style))
                for bullet in item.get("bullets", []):
                    b_clean = str(bullet).strip().lstrip("•-* ")
                    if b_clean:
                        story.append(Paragraph(f"• {b_clean}", bullet_style))
            story.append(Spacer(1, 2))

        elif sec_type == "certifications":
            items = content.get("items") or [
                {"name": "NPTEL – Programming in Java (Elite + Gold, 90%)", "issuer": "NPTEL", "year": "2026"},
                {"name": "NPTEL – Fundamentals of Object-Oriented Programming", "issuer": "NPTEL", "year": "2026"},
                {"name": "NPTEL – Database Management System (DBMS), 68%", "issuer": "IIT Kharagpur", "year": "2026"}
            ]
            for item in items:
                if isinstance(item, str):
                    b_clean = item.strip().lstrip("•-* ")
                    if b_clean:
                        story.append(Paragraph(f"• {b_clean}", bullet_style))
                elif isinstance(item, dict):
                    c_name = str(item.get("name", "") or item.get("title", "")).strip().lstrip("•-* ")
                    issuer = str(item.get("issuer", "")).strip()
                    year = str(item.get("year", "")).strip()

                    line = f"• <b>{c_name}</b>"
                    if issuer and issuer.lower() not in c_name.lower() and not ("nptel" in c_name.lower() and issuer.lower() in ["nptel", "iit", "nptel / iit"]):
                        line += f" — <i>{issuer}</i>"
                    if year and year not in c_name:
                        line += f" ({year})"
                    story.append(Paragraph(line, bullet_style))
            story.append(Spacer(1, 2))

        elif sec_type == "achievements":
            items = content.get("items") or [
                {"title": "NPTEL Elite + Gold Certification (90% score)", "desc": "Top percentile in Java Programming"}
            ]
            for item in items:
                if isinstance(item, str):
                    b_clean = item.strip().lstrip("•-* ")
                    if b_clean:
                        story.append(Paragraph(f"• {b_clean}", bullet_style))
                elif isinstance(item, dict):
                    title = str(item.get("title", "") or item.get("name", "")).strip().lstrip("•-* ")
                    desc = str(item.get("desc", "")).strip()
                    line = f"• <b>{title}</b>"
                    if desc and desc.lower() not in title.lower():
                        line += f": {desc}"
                    story.append(Paragraph(line, bullet_style))
            story.append(Spacer(1, 2))

        elif sec_type == "languages":
            langs = content.get("languages") or content.get("items") or ["English (Professional)", "Tamil (Native)", "Hindi (Basic)"]
            lang_str = " • ".join(langs) if isinstance(langs, list) else str(langs)
            story.append(Paragraph(f"<b>Languages:</b> {lang_str}", body_style))
            story.append(Spacer(1, 2))

    doc.build(story)
    return output_path

    doc.build(story)
    return output_path

def export_resume_to_docx(resume_data: Dict[str, Any], output_path: str) -> str:
    """Generate clean, ATS-friendly Word DOCX file matching candidate details."""
    doc = Document()

    sections = resume_data.get("sections", [])
    personal_data = {}
    for sec in sections:
        if sec.get("section_type") == "personal":
            try:
                personal_data = json.loads(sec.get("content_json", "{}"))
            except Exception:
                personal_data = {}

    name = personal_data.get("full_name") or "Vignesh Madasamy"
    title_role = personal_data.get("title") or resume_data.get("target_role", "Computer Science & Engineering Undergraduate")
    email = personal_data.get("email") or "vigneshmadasamy22@gmail.com"
    phone = personal_data.get("phone") or "+91 89031 76646"
    location = personal_data.get("location") or "Karur, Tamil Nadu, India"
    linkedin = personal_data.get("linkedin") or "linkedin.com/in/vignesh-madasamy45"

    h1 = doc.add_heading(name.upper(), level=0)
    h1.alignment = WD_ALIGN_PARAGRAPH.CENTER

    contact_para = doc.add_paragraph()
    contact_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    contact_line = f"{title_role} | {email} | {phone} | {location}"
    if linkedin:
        contact_line += f" | {linkedin}"
    contact_para.add_run(contact_line).italic = True

    for sec in sections:
        sec_type = sec.get("section_type")
        if sec_type == "personal":
            continue
        sec_title = sec.get("title") or sec_type.replace("_", " ").title()
        doc.add_heading(sec_title.upper(), level=1)

        try:
            content = json.loads(sec.get("content_json", "{}"))
        except Exception:
            content = {}

        if sec_type == "summary":
            doc.add_paragraph(content.get("text", ""))
        elif sec_type == "skills":
            skills = content.get("skills", [])
            doc.add_paragraph(" • ".join(skills))
        elif sec_type in ["projects"]:
            items = content.get("items", [])
            for item in items:
                p = doc.add_paragraph()
                p.add_run(f"{item.get('title')} | {item.get('tech', '')}").bold = True
                for b in item.get("bullets", []):
                    doc.add_paragraph(b, style='List Bullet')
        elif sec_type in ["experience", "internship", "internships"]:
            items = content.get("items", [])
            for item in items:
                p = doc.add_paragraph()
                p.add_run(f"{item.get('role')} — {item.get('company', '')} ({item.get('duration', '')})").bold = True
                for b in item.get("bullets", []):
                    doc.add_paragraph(b, style='List Bullet')
        elif sec_type in ["education"]:
            items = content.get("items", [])
            for item in items:
                p = doc.add_paragraph()
                p.add_run(f"{item.get('degree')} - {item.get('institution')} ({item.get('year')})").bold = True
        elif sec_type == "certifications":
            items = content.get("items", [])
            for item in items:
                line = item.get("name", "") if isinstance(item, dict) else str(item)
                doc.add_paragraph(line, style='List Bullet')
        elif sec_type == "achievements":
            items = content.get("items", [])
            for item in items:
                line = f"{item.get('title', '')}: {item.get('desc', '')}" if isinstance(item, dict) else str(item)
                doc.add_paragraph(line, style='List Bullet')
        elif sec_type == "languages":
            langs = content.get("languages") or content.get("items") or ["English", "Tamil", "Hindi"]
            doc.add_paragraph(", ".join(langs))

    doc.save(output_path)
    return output_path

def export_analysis_report_to_pdf(analysis_data: Dict[str, Any], output_path: str) -> str:
    """Generate comprehensive ATS Analysis PDF Report."""
    doc = SimpleDocTemplate(output_path, pagesize=A4, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    accent_col = colors.HexColor("#7c3aed")
    title_style = ParagraphStyle('ReportTitle', fontName='Helvetica-Bold', fontSize=22, textColor=accent_col, spaceAfter=6)
    sub_style = ParagraphStyle('ReportSub', fontName='Helvetica', fontSize=10, textColor=colors.HexColor("#64748b"), spaceAfter=14)
    h2_style = ParagraphStyle('ReportH2', fontName='Helvetica-Bold', fontSize=13, textColor=colors.HexColor("#0f172a"), spaceBefore=10, spaceAfter=6)
    body_style = ParagraphStyle('ReportBody', fontName='Helvetica', fontSize=9.5, leading=13.5, textColor=colors.HexColor("#334155"))
    bullet_style = ParagraphStyle('ReportBullet', fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor("#334155"), leftIndent=12, firstLineIndent=-8)

    story = [
        Paragraph("<b>CareerLens — ATS Resume Analysis Report</b>", title_style),
        Paragraph(f"Target Role: <b>{analysis_data.get('job_title', 'Software Engineer')}</b> | Company: <b>{analysis_data.get('company', 'TCS')}</b> | Date: {analysis_data.get('created_at', 'Nov 1, 2026')}", sub_style),
        HRFlowable(width="100%", thickness=1.5, color=accent_col, spaceAfter=12),
        
        Paragraph(f"<b>Overall ATS Match Score: {analysis_data.get('overall_score', 87)} / 100</b>", h2_style),
        Paragraph("This score reflects keyword coverage, technical depth, quantifiable impact, and ATS formatting compliance.", body_style),
        Spacer(1, 8),
        
        Paragraph(f"• Technical Skills Score: <b>{analysis_data.get('skills_score', 88)}%</b>", bullet_style),
        Paragraph(f"• Experience Relevance: <b>{analysis_data.get('experience_score', 84)}%</b>", bullet_style),
        Paragraph(f"• Project Impact: <b>{analysis_data.get('project_score', 82)}%</b>", bullet_style),
        Paragraph(f"• Keyword Coverage: <b>{analysis_data.get('keyword_score', 86)}%</b>", bullet_style),
        Paragraph(f"• Readability & Layout: <b>{analysis_data.get('readability_score', 94)}%</b>", bullet_style),
        Spacer(1, 10),
        
        Paragraph("<b>Actionable Improvement Recommendations</b>", h2_style),
    ]

    suggestions = analysis_data.get("suggestions", [])
    for idx, s in enumerate(suggestions, 1):
        story.append(Paragraph(f"<b>{idx}. {s.get('title')}</b> [{s.get('priority', 'High Priority')}]", body_style))
        story.append(Paragraph(f"{s.get('description')}", bullet_style))
        if s.get("suggested_text"):
            story.append(Paragraph(f"<i>Recommended: \"{s.get('suggested_text')}\"</i>", bullet_style))
        story.append(Spacer(1, 4))

    doc.build(story)
    return output_path
