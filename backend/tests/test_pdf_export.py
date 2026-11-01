import json
import fitz
from app.database import SessionLocal
from app.models import Resume
from app.exporter import export_resume_to_pdf

db = SessionLocal()
resume = db.query(Resume).filter(Resume.id == 1).first()
resume_dict = {
    'title': resume.title,
    'template_id': resume.template_id,
    'accent_color': resume.accent_color,
    'target_role': resume.target_role,
    'sections': [
        {'section_type': s.section_type, 'title': s.title, 'content_json': s.content_json}
        for s in resume.sections if s.is_visible
    ]
}
export_resume_to_pdf(resume_dict, 'exports/test_vignesh.pdf')
doc = fitz.open('exports/test_vignesh.pdf')
print('=== EXPORTED PDF TEXT ===')
for page in doc:
    print(page.get_text())
