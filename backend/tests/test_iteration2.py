"""Backend API tests for Datamosh iteration 2:
- Bookings (POST public, GET admin)
- Leads (POST public, GET admin)
- Resources CRUD with admin auth + seeded data
- Admin-key gating on /api/contact, /api/bookings, /api/leads
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_KEY = "dmosh_admin_2026_secure_key_change_me"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "x-admin-key": ADMIN_KEY})
    return s


# ---------- Bookings ----------
class TestBookings:
    def test_create_booking_public(self, client):
        payload = {
            "name": "TEST_Booker",
            "email": f"test_book_{uuid.uuid4().hex[:8]}@example.com",
            "company": "Acme Corp",
            "phone": "+91-9999999999",
            "preferred_date": "2026-02-15",
            "preferred_slot": "14:00 IST",
            "topic": "Zero Trust",
            "notes": "Looking for a phased BFSI rollout discussion",
        }
        r = client.post(f"{API}/bookings", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["preferred_date"] == payload["preferred_date"]
        assert data["preferred_slot"] == payload["preferred_slot"]
        assert data["status"] == "requested"
        assert "id" in data and len(data["id"]) > 0

    def test_create_booking_invalid_email(self, client):
        r = client.post(f"{API}/bookings", json={
            "name": "TEST_x", "email": "bad",
            "preferred_date": "2026-02-15", "preferred_slot": "10:00 IST",
        })
        assert r.status_code == 422

    def test_list_bookings_requires_admin(self, client):
        r = client.get(f"{API}/bookings")
        assert r.status_code == 401

    def test_list_bookings_with_admin(self, admin_client):
        r = admin_client.get(f"{API}/bookings")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # At least the booking we just made should exist
        assert len(data) >= 1


# ---------- Leads ----------
class TestLeads:
    def test_create_lead_public(self, client):
        payload = {
            "name": "TEST_Lead",
            "email": f"test_lead_{uuid.uuid4().hex[:8]}@example.com",
            "company": "BigBank",
            "resource_slug": "zero-trust-bfsi-2025",
            "source": "resource_gate",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["resource_slug"] == payload["resource_slug"]
        assert data["source"] == "resource_gate"
        assert "id" in data

    def test_create_lead_invalid_email(self, client):
        r = client.post(f"{API}/leads", json={
            "name": "TEST_x", "email": "bad", "resource_slug": "x",
        })
        assert r.status_code == 422

    def test_list_leads_requires_admin(self, client):
        r = client.get(f"{API}/leads")
        assert r.status_code == 401

    def test_list_leads_with_admin(self, admin_client):
        r = admin_client.get(f"{API}/leads")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Admin gate on /contact ----------
class TestContactAdmin:
    def test_list_contact_requires_admin(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 401

    def test_list_contact_with_admin(self, admin_client):
        r = admin_client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ---------- Resources (blog/CMS) ----------
class TestResources:
    def test_list_resources_seeded(self, client):
        r = client.get(f"{API}/resources")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        slugs = [i["slug"] for i in items]
        for required in ["zero-trust-bfsi-2025", "ai-security-governance", "dpdp-readiness"]:
            assert required in slugs, f"Seeded resource missing: {required}"
        gating = {i["slug"]: i["gated"] for i in items}
        assert gating["dpdp-readiness"] is False
        assert gating["zero-trust-bfsi-2025"] is True
        assert gating["ai-security-governance"] is True

    def test_get_resource_by_slug(self, client):
        r = client.get(f"{API}/resources/dpdp-readiness")
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == "dpdp-readiness"
        assert data["gated"] is False
        assert "body" in data and data["body"]

    def test_get_unknown_resource_404(self, client):
        r = client.get(f"{API}/resources/does-not-exist-xyz")
        assert r.status_code == 404

    def test_create_resource_requires_admin(self, client):
        r = client.post(f"{API}/resources", json={
            "slug": f"test-{uuid.uuid4().hex[:6]}", "type": "Whitepaper",
            "title": "T", "excerpt": "x", "author": "A",
            "date": "Jan 2026", "tag": "T", "image": "https://x/y.png",
        })
        assert r.status_code == 401

    def test_create_resource_with_admin(self, admin_client):
        slug = f"test-{uuid.uuid4().hex[:8]}"
        payload = {
            "slug": slug, "type": "Whitepaper",
            "title": "TEST_New Resource",
            "excerpt": "Excerpt body",
            "body": "Long body",
            "author": "TEST_Author",
            "date": "Jan 2026",
            "readTime": "5 min read",
            "tag": "Test",
            "image": "https://x/y.png",
            "gated": False,
        }
        r = admin_client.post(f"{API}/resources", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["slug"] == slug
        assert data["title"] == "TEST_New Resource"

        # GET verifies persistence
        g = admin_client.get(f"{API}/resources/{slug}")
        assert g.status_code == 200
        assert g.json()["slug"] == slug

        # Duplicate -> 409
        dup = admin_client.post(f"{API}/resources", json=payload)
        assert dup.status_code == 409

        # Cleanup: delete
        d = admin_client.delete(f"{API}/resources/{slug}")
        assert d.status_code == 200

    def test_delete_resource_requires_admin(self, client):
        r = client.delete(f"{API}/resources/zero-trust-bfsi-2025")
        assert r.status_code == 401

    def test_delete_unknown_resource_404(self, admin_client):
        r = admin_client.delete(f"{API}/resources/never-existed-xyz")
        assert r.status_code == 404


# ---------- Regression: previous public endpoints still work ----------
class TestRegression:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json()["status"] == "operational"

    def test_health(self, client):
        r = client.get(f"{API}/health")
        assert r.status_code == 200

    def test_contact_post_public(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_Reg", "email": f"reg_{uuid.uuid4().hex[:6]}@example.com",
            "message": "Regression test message.",
        })
        assert r.status_code == 200

    def test_newsletter_idempotent(self, client):
        email = f"news_{uuid.uuid4().hex[:6]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email})
        r2 = client.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200 and r2.status_code == 200
        assert r1.json()["id"] == r2.json()["id"]

    def test_jobs(self, client):
        r = client.get(f"{API}/careers/jobs")
        assert r.status_code == 200
        assert len(r.json()) == 6

    def test_careers_apply(self, client):
        r = client.post(f"{API}/careers/apply", json={
            "name": "TEST_App", "email": f"app_{uuid.uuid4().hex[:6]}@example.com",
            "role": "Senior Penetration Tester",
        })
        assert r.status_code == 200
