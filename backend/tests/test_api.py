from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["platform"] == "CareerLens API"

def test_dashboard_summary():
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["user_name"] == "Vignesh Madasamy"
    assert data["best_ats_score"] >= 80

def test_templates():
    response = client.get("/api/templates")
    assert response.status_code == 200
    templates = response.json()
    assert len(templates) == 20

def test_jobs():
    response = client.get("/api/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 5

def test_roadmap():
    response = client.get("/api/roadmap")
    assert response.status_code == 200
    assert response.json()["progress_percentage"] == 68

def test_mock_interview():
    response = client.get("/api/interviews/questions?category=Technical")
    assert response.status_code == 200
    questions = response.json()
    assert len(questions) > 0
