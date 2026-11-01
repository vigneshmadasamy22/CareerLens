import json
from typing import Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CareerRoadmap, User
from app.schemas import RoadmapResponse
from app.auth import get_current_user

router = APIRouter(prefix="/api/roadmap", tags=["roadmap"])

@router.get("", response_model=RoadmapResponse)
def get_roadmap(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    roadmap = db.query(CareerRoadmap).filter(CareerRoadmap.user_id == current_user.id).first()
    if not roadmap:
        # Create default personalized roadmap matching screenshot
        phases = [
            {
                "id": 1,
                "title": "Phase 1: Strengthen Fundamentals (2 Weeks)",
                "duration": "2 Weeks",
                "status": "Completed",
                "items": [
                    "Revise Data Structures & Algorithms (Trees, Graphs, DP)",
                    "Deepen Core CS Concepts (OS, Networks, DBMS)"
                ]
            },
            {
                "id": 2,
                "title": "Phase 2: Build Relevant Skills (4 Weeks)",
                "duration": "4 Weeks",
                "status": "In Progress",
                "items": [
                    "Master Next.js App Router, SSR, and API Optimization",
                    "Build asynchronous APIs with FastAPI & SQLAlchemy",
                    "Design relational schemas in PostgreSQL"
                ]
            },
            {
                "id": 3,
                "title": "Phase 3: Build Real-World Project (2 Weeks)",
                "duration": "2 Weeks",
                "status": "Upcoming",
                "items": [
                    "Build 2 production-ready full-stack projects",
                    "Integrate Docker containerization and CI/CD pipelines"
                ]
            },
            {
                "id": 4,
                "title": "Phase 4: Get Job Ready (2 Weeks)",
                "duration": "2 Weeks",
                "status": "Upcoming",
                "items": [
                    "Practice AI mock interviews (HR & Technical)",
                    "Optimize resume ATS match for target roles and apply"
                ]
            }
        ]
        roadmap = CareerRoadmap(
            user_id=current_user.id,
            target_role="Software Engineer",
            duration="3 Months",
            current_level="Intermediate",
            progress_percentage=68,
            phases_json=json.dumps(phases)
        )
        db.add(roadmap)
        db.commit()
        db.refresh(roadmap)

    return {
        "id": roadmap.id,
        "target_role": roadmap.target_role,
        "duration": roadmap.duration,
        "current_level": roadmap.current_level,
        "progress_percentage": roadmap.progress_percentage,
        "phases": json.loads(roadmap.phases_json)
    }
