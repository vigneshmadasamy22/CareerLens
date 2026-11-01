from typing import List, Optional
from fastapi import APIRouter, Query
from app.schemas import ResumeTemplateResponse

router = APIRouter(prefix="/api/templates", tags=["templates"])

TEMPLATES_DATA = [
    # 1. PROFESSIONAL (4)
    {
        "id": "professional-elite",
        "name": "Professional Elite",
        "category": "Professional",
        "description": "Executive single-column layout with colored section underline bars, serif headings, and structured corporate hierarchy.",
        "preview_image": "/templates/professional-elite.png",
        "is_ats_friendly": True,
        "layout_type": "executive-classic",
        "tags": ["ATS Friendly", "Corporate", "Leadership", "Fortune 500"]
    },
    {
        "id": "corporate-clean",
        "name": "Corporate Clean",
        "category": "Professional",
        "description": "Universally recognized classic resume format preferred by traditional enterprise HR and Fortune 100 ATS systems.",
        "preview_image": "/templates/corporate-clean.png",
        "is_ats_friendly": True,
        "layout_type": "corporate-traditional",
        "tags": ["ATS Friendly", "Enterprise", "Finance", "Consulting"]
    },
    {
        "id": "executive-crest",
        "name": "Executive Crest",
        "category": "Professional",
        "description": "Distinguished centered header with ornamental border accents, formal typography, and leadership focus.",
        "preview_image": "/templates/executive-crest.png",
        "is_ats_friendly": True,
        "layout_type": "centered-formal",
        "tags": ["ATS Friendly", "Senior", "Managerial", "Director"]
    },
    {
        "id": "classic-ivy",
        "name": "Classic Ivy",
        "category": "Professional",
        "description": "Traditional academic & executive standard with justified sections, roman numerals, and crisp hierarchy.",
        "preview_image": "/templates/classic-ivy.png",
        "is_ats_friendly": True,
        "layout_type": "executive-classic",
        "tags": ["ATS Friendly", "Ivy League", "Traditional", "Management"]
    },

    # 2. MODERN (4)
    {
        "id": "modern-pro",
        "name": "Modern Pro",
        "category": "Modern",
        "description": "Two-column split layout with a prominent left sidebar for contact & skills, and spacious right canvas for achievements.",
        "preview_image": "/templates/modern-pro.png",
        "is_ats_friendly": True,
        "layout_type": "two-column-sidebar",
        "tags": ["ATS Friendly", "Two Column", "SaaS", "Product"]
    },
    {
        "id": "neo-tech",
        "name": "Neo Tech",
        "category": "Modern",
        "description": "High-contrast geometric card layout with left-bordered project sections and modular skill matrix boxes.",
        "preview_image": "/templates/neo-tech.png",
        "is_ats_friendly": True,
        "layout_type": "card-modular",
        "tags": ["ATS Friendly", "Startups", "Cloud", "DevOps"]
    },
    {
        "id": "metro-flow",
        "name": "Metro Flow",
        "category": "Modern",
        "description": "Clean horizontal progress blocks with modern sans-serif typography, ideal for high-growth tech startups.",
        "preview_image": "/templates/metro-flow.png",
        "is_ats_friendly": True,
        "layout_type": "two-column-sidebar",
        "tags": ["ATS Friendly", "Tech Startup", "Modern", "Grid"]
    },
    {
        "id": "aurora-bold",
        "name": "Aurora Bold",
        "category": "Modern",
        "description": "Vibrant gradient headers with clean data pills and modular achievement highlights.",
        "preview_image": "/templates/aurora-bold.png",
        "is_ats_friendly": True,
        "layout_type": "card-modular",
        "tags": ["ATS Friendly", "Bold", "Product Design", "Agile"]
    },

    # 3. MINIMAL (3)
    {
        "id": "minimal-clean",
        "name": "Minimal Clean",
        "category": "Minimal",
        "description": "Pure typography and generous whitespace inspired by Swiss graphic design, optimal for high-speed algorithmic parsing.",
        "preview_image": "/templates/minimal-clean.png",
        "is_ats_friendly": True,
        "layout_type": "minimal-swiss",
        "tags": ["ATS Friendly", "Minimalist", "Whitespace", "Simple"]
    },
    {
        "id": "pure-mono",
        "name": "Pure Mono",
        "category": "Minimal",
        "description": "Zero distractions, hyper-legible line spacing and clear section divisions for 100% ATS score consistency.",
        "preview_image": "/templates/pure-mono.png",
        "is_ats_friendly": True,
        "layout_type": "minimal-swiss",
        "tags": ["ATS Friendly", "High Contrast", "Clean", "Lightweight"]
    },
    {
        "id": "swiss-grid",
        "name": "Swiss Grid",
        "category": "Minimal",
        "description": "Precision typographic grid layout with understated divider rules and structured data columns.",
        "preview_image": "/templates/swiss-grid.png",
        "is_ats_friendly": True,
        "layout_type": "minimal-swiss",
        "tags": ["ATS Friendly", "International", "Architectural", "Refined"]
    },

    # 4. CREATIVE (3)
    {
        "id": "creative-folio",
        "name": "Creative Folio",
        "category": "Creative",
        "description": "Bold banner header with vibrant accent chips, timeline milestone dots, and styled project cards.",
        "preview_image": "/templates/creative-folio.png",
        "is_ats_friendly": True,
        "layout_type": "creative-timeline",
        "tags": ["ATS Friendly", "Creative", "Portfolio", "Design-Tech"]
    },
    {
        "id": "studio-impact",
        "name": "Studio Impact",
        "category": "Creative",
        "description": "Dynamic left accent border with colored role badges and standout technical milestone capsules.",
        "preview_image": "/templates/studio-impact.png",
        "is_ats_friendly": True,
        "layout_type": "creative-timeline",
        "tags": ["ATS Friendly", "Studio", "UX/UI", "Media"]
    },
    {
        "id": "canvas-story",
        "name": "Canvas Story",
        "category": "Creative",
        "description": "Narrative-driven career journey format showcasing major project launches and key impacts.",
        "preview_image": "/templates/canvas-story.png",
        "is_ats_friendly": True,
        "layout_type": "creative-timeline",
        "tags": ["ATS Friendly", "Storytelling", "Innovator", "Full-Stack"]
    },

    # 5. DEVELOPER / TECHNICAL (3)
    {
        "id": "developer-x",
        "name": "Developer X",
        "category": "Developer",
        "description": "Tech-first layout with monospace accents, terminal style badges, and prominent GitHub/project architecture highlights.",
        "preview_image": "/templates/developer-x.png",
        "is_ats_friendly": True,
        "layout_type": "tech-modern",
        "tags": ["ATS Friendly", "Full Stack", "Backend", "Terminal Style"]
    },
    {
        "id": "dev-terminal",
        "name": "Dev Terminal",
        "category": "Developer",
        "description": "Developer console aesthetic featuring CLI command headings, code badges, and system-level contribution logs.",
        "preview_image": "/templates/dev-terminal.png",
        "is_ats_friendly": True,
        "layout_type": "terminal-monospace",
        "tags": ["ATS Friendly", "Monospace", "Systems", "Open Source"]
    },
    {
        "id": "kernel-stack",
        "name": "Kernel Stack",
        "category": "Developer",
        "description": "Engineered for DevOps and Cloud Architects, emphasizing CI/CD pipelines, Docker, Kubernetes, and API design.",
        "preview_image": "/templates/kernel-stack.png",
        "is_ats_friendly": True,
        "layout_type": "tech-modern",
        "tags": ["ATS Friendly", "Cloud", "DevOps", "Infrastructure"]
    },

    # 6. FRESHER / STUDENT (3)
    {
        "id": "fresher-clean",
        "name": "Fresher Clean",
        "category": "Fresher",
        "description": "Campus placement optimized format placing Education, CGPA, coursework, and academic hackathons before work history.",
        "preview_image": "/templates/fresher-clean.png",
        "is_ats_friendly": True,
        "layout_type": "campus-academic",
        "tags": ["ATS Friendly", "Freshers", "Campus Placement", "College"]
    },
    {
        "id": "campus-prime",
        "name": "Campus Prime",
        "category": "Fresher",
        "description": "Tailored for university graduates highlighting coursework, engineering internships, and NPTEL certifications.",
        "preview_image": "/templates/campus-prime.png",
        "is_ats_friendly": True,
        "layout_type": "campus-academic",
        "tags": ["ATS Friendly", "Undergraduate", "Internships", "TCS/Infosys"]
    },
    {
        "id": "scholar-edge",
        "name": "Scholar Edge",
        "category": "Fresher",
        "description": "Academic excellence layout prioritizing thesis, project implementations, GPA, and competitive coding rank.",
        "preview_image": "/templates/scholar-edge.png",
        "is_ats_friendly": True,
        "layout_type": "campus-academic",
        "tags": ["ATS Friendly", "Research", "Academic", "Competitive Coding"]
    }
]

@router.get("", response_model=List[ResumeTemplateResponse])
def get_templates(category: Optional[str] = Query(None)):
    if category and category.lower() != "all":
        return [t for t in TEMPLATES_DATA if t["category"].lower() == category.lower()]
    return TEMPLATES_DATA

@router.get("/{template_id}", response_model=ResumeTemplateResponse)
def get_template(template_id: str):
    for t in TEMPLATES_DATA:
        if t["id"] == template_id:
            return t
    return TEMPLATES_DATA[0]
