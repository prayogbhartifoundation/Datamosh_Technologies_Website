"""Backend API tests for Datamosh Technologies."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://nexus-enterprise-ai-1.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- health & root ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "operational"
        assert "Datamosh" in data.get("service", "")

    def test_health(self, client):
        r = client.get(f"{API}/health")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "timestamp" in data


# ---------- contact ----------
class TestContact:
    def test_contact_create_valid(self, client):
        payload = {
            "name": "TEST_John Doe",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "company": "Acme",
            "phone": "+91-9999999999",
            "service_interest": "Cybersecurity",
            "message": "Need a security audit for our SaaS platform.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert "id" in data and len(data["id"]) > 0
        assert "created_at" in data

    def test_contact_invalid_email(self, client):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "Hello there",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_contact_missing_required(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.com"})
        assert r.status_code == 422

    def test_contact_list(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- newsletter ----------
class TestNewsletter:
    def test_subscribe_and_idempotent(self, client):
        email = f"test_news_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200, r1.text
        first = r1.json()
        assert first["email"] == email
        first_id = first["id"]

        # Duplicate must return existing record, no error
        r2 = client.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 200
        second = r2.json()
        assert second["id"] == first_id

    def test_newsletter_invalid_email(self, client):
        r = client.post(f"{API}/newsletter", json={"email": "bad"})
        assert r.status_code == 422


# ---------- careers ----------
class TestCareers:
    def test_list_jobs(self, client):
        r = client.get(f"{API}/careers/jobs")
        assert r.status_code == 200
        jobs = r.json()
        assert isinstance(jobs, list)
        assert len(jobs) == 6
        for j in jobs:
            for k in ["id", "title", "department", "location", "type", "experience", "description"]:
                assert k in j

    def test_filter_department(self, client):
        r = client.get(f"{API}/careers/jobs", params={"department": "Cybersecurity"})
        assert r.status_code == 200
        jobs = r.json()
        assert len(jobs) >= 1
        assert all(j["department"].lower() == "cybersecurity" for j in jobs)

    def test_filter_all(self, client):
        r = client.get(f"{API}/careers/jobs", params={"department": "all"})
        assert r.status_code == 200
        assert len(r.json()) == 6

    def test_get_specific_job(self, client):
        r = client.get(f"{API}/careers/jobs/sec-001")
        assert r.status_code == 200
        assert r.json()["id"] == "sec-001"

    def test_get_unknown_job_404(self, client):
        r = client.get(f"{API}/careers/jobs/does-not-exist")
        assert r.status_code == 404

    def test_apply(self, client):
        payload = {
            "name": "TEST_Applicant",
            "email": f"test_app_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+91-9000000000",
            "role": "Senior Penetration Tester",
            "experience_years": "5",
            "linkedin": "https://linkedin.com/in/test",
            "cover_letter": "I am very interested in this opportunity.",
        }
        r = client.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["role"] == payload["role"]
        assert "id" in data

    def test_apply_invalid_email(self, client):
        r = client.post(f"{API}/careers/apply", json={
            "name": "TEST_x", "email": "bad", "role": "Any",
        })
        assert r.status_code == 422
