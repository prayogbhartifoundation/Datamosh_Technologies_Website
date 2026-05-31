from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_API_KEY = os.environ.get('ADMIN_API_KEY', '')

app = FastAPI(title="Datamosh Technologies API")
api_router = APIRouter(prefix="/api")


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def require_admin(x_admin_key: Optional[str] = Header(default=None)):
    """Simple admin API-key guard for read-only listing endpoints."""
    if not ADMIN_API_KEY:
        raise HTTPException(status_code=503, detail="Admin key not configured")
    if x_admin_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


# ============ MODELS ============
class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    message: str = Field(min_length=5, max_length=4000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=utcnow_iso)


class NewsletterCreate(BaseModel):
    email: EmailStr


class Newsletter(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: str = Field(default_factory=utcnow_iso)


class CareerApplicationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = None
    role: str
    experience_years: Optional[str] = None
    linkedin: Optional[str] = None
    cover_letter: Optional[str] = None


class CareerApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    role: str
    experience_years: Optional[str] = None
    linkedin: Optional[str] = None
    cover_letter: Optional[str] = None
    created_at: str = Field(default_factory=utcnow_iso)


class Job(BaseModel):
    id: str
    title: str
    department: str
    location: str
    type: str
    experience: str
    description: str


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    preferred_date: str  # ISO date string (YYYY-MM-DD)
    preferred_slot: str  # e.g. "10:00 IST", "14:30 IST"
    topic: Optional[str] = None
    notes: Optional[str] = None


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    preferred_date: str
    preferred_slot: str
    topic: Optional[str] = None
    notes: Optional[str] = None
    status: str = "requested"
    created_at: str = Field(default_factory=utcnow_iso)


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = None
    resource_slug: str
    source: str = "resource_gate"


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    resource_slug: str
    source: str
    created_at: str = Field(default_factory=utcnow_iso)


class ResourceCreate(BaseModel):
    slug: str = Field(min_length=2, max_length=120)
    type: str
    title: str
    excerpt: str
    body: Optional[str] = None
    author: str
    date: str
    read_time: str = Field(alias="readTime", default="8 min read")
    tag: str
    image: str
    gated: bool = False


class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    type: str
    title: str
    excerpt: str
    body: Optional[str] = None
    author: str
    date: str
    read_time: str = Field(alias="readTime", default="8 min read")
    tag: str
    image: str
    gated: bool = False
    created_at: str = Field(default_factory=utcnow_iso)


# ============ STATIC DATA ============
JOBS: List[Job] = [
    Job(id="sec-001", title="Senior Penetration Tester", department="Cybersecurity",
        location="Bengaluru, India", type="Full-time", experience="5-8 yrs",
        description="Lead red team engagements, web/API/mobile penetration testing, and adversary simulations for enterprise clients."),
    Job(id="grc-002", title="GRC Consultant — ISO 27001 / SOC 2", department="Compliance & GRC",
        location="Mumbai, India", type="Full-time", experience="3-6 yrs",
        description="Drive ISMS implementations, audit readiness, and regulatory compliance programs for BFSI and SaaS clients."),
    Job(id="ai-003", title="AI Security Engineer", department="Deep Tech & AI",
        location="Remote — India", type="Full-time", experience="4-7 yrs",
        description="Build adversarial ML pipelines, perform AI red-teaming, and design responsible AI governance frameworks."),
    Job(id="dfir-004", title="DFIR Analyst", department="Cybersecurity",
        location="Hyderabad, India", type="Full-time", experience="2-5 yrs",
        description="Lead incident response engagements, malware triage, and digital forensics across enterprise environments."),
    Job(id="cld-005", title="Cloud Security Architect", department="Digital Transformation",
        location="Bengaluru, India", type="Full-time", experience="6-10 yrs",
        description="Architect Zero Trust and DevSecOps reference architectures across AWS, Azure, and GCP for regulated industries."),
    Job(id="intern-006", title="Cybersecurity Research Intern", department="Innovation Lab",
        location="Pune, India", type="Internship — 6 months", experience="Final year / fresh graduate",
        description="Contribute to threat intel research, advisory publications, and offensive security tooling."),
]

SEED_RESOURCES = [
    {
        "slug": "zero-trust-bfsi-2025",
        "type": "Whitepaper",
        "title": "Operationalizing Zero Trust in Indian BFSI",
        "excerpt": "A practitioner's playbook for rolling out Zero Trust across digital banking, payments and core-banking estates.",
        "body": "Zero Trust has moved from buzzword to board-level mandate. This whitepaper walks BFSI security leaders through a phased rollout — identity foundation, micro-segmentation, continuous verification, telemetry — with reference architectures aligned to RBI IS Audit and DPDP Act 2023 expectations.",
        "author": "Datamosh Research",
        "date": "Nov 2025",
        "readTime": "12 min read",
        "tag": "Zero Trust",
        "image": "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/a72618bb39c2ff33e34c3756f7c209378ee744634862a784ad5c60907e42344b.png",
        "gated": True,
    },
    {
        "slug": "ai-security-governance",
        "type": "Research Paper",
        "title": "AI Security & ISO 42001 — Building Governable AI Systems",
        "excerpt": "Mapping ISO 42001 controls to real engineering practices for organisations shipping production AI.",
        "body": "ISO 42001 sets the bar for AI management systems. This paper translates each control to concrete engineering practices: model risk assessment, adversarial testing, dataset lineage, human-in-the-loop guardrails and ongoing assurance — with case studies from financial services and healthcare.",
        "author": "Dr. K. Sundaram",
        "date": "Oct 2025",
        "readTime": "18 min read",
        "tag": "AI Governance",
        "image": "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/138b39e1137e1c06fef4341210bd85c8d71be43127cda01c60874a7abc85b98a.png",
        "gated": True,
    },
    {
        "slug": "dpdp-readiness",
        "type": "Case Study",
        "title": "DPDP Act 2023 — How a Healthcare Network Reached Readiness in 60 Days",
        "excerpt": "Inside the data-mapping, DPIA and consent architecture programme delivered to a 40-hospital network.",
        "body": "When the DPDP Act passed, our client — a multi-state hospital network — needed compliance in eight weeks. This case study details the discovery workshops, automated data inventory, DPIA execution, consent re-architecture and DPO-as-a-Service handover that took them from gap to audit-ready in 60 days.",
        "author": "Datamosh GRC",
        "date": "Sep 2025",
        "readTime": "9 min read",
        "tag": "DPDP",
        "image": "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/4e2c4425986f1f022be0b0e5bbd15aa57105e28617ec7b722d1bcccff1c5ab3e.png",
        "gated": False,
    },
]


@app.on_event("startup")
async def seed_resources_if_empty():
    count = await db.resources.count_documents({})
    if count == 0:
        for r in SEED_RESOURCES:
            obj = Resource(**r)
            await db.resources.insert_one(obj.model_dump(by_alias=False))


# ============ ROUTES ============
@api_router.get("/")
async def root():
    return {"service": "Datamosh Technologies API", "status": "operational"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "timestamp": utcnow_iso()}


# ----- Contact -----
@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts(limit: int = 100, _: bool = Depends(require_admin)):
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# ----- Newsletter -----
@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        return Newsletter(**existing)
    obj = Newsletter(email=payload.email)
    await db.newsletter.insert_one(obj.model_dump())
    return obj


# ----- Careers -----
@api_router.post("/careers/apply", response_model=CareerApplication)
async def apply_career(payload: CareerApplicationCreate):
    obj = CareerApplication(**payload.model_dump())
    await db.applications.insert_one(obj.model_dump())
    return obj


@api_router.get("/careers/jobs", response_model=List[Job])
async def list_jobs(department: Optional[str] = None):
    if department and department.lower() != "all":
        return [j for j in JOBS if j.department.lower() == department.lower()]
    return JOBS


@api_router.get("/careers/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    job = next((j for j in JOBS if j.id == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


# ----- Bookings -----
@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    obj = Booking(**payload.model_dump())
    await db.bookings.insert_one(obj.model_dump())
    return obj


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings(limit: int = 100, _: bool = Depends(require_admin)):
    docs = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# ----- Leads (resource gating) -----
@api_router.post("/leads", response_model=Lead)
async def capture_lead(payload: LeadCreate):
    obj = Lead(**payload.model_dump())
    await db.leads.insert_one(obj.model_dump())
    return obj


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100, _: bool = Depends(require_admin)):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# ----- Resources (blog / CMS) -----
@api_router.get("/resources", response_model=List[Resource])
async def list_resources(limit: int = 50):
    docs = await db.resources.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


@api_router.get("/resources/{slug}", response_model=Resource)
async def get_resource(slug: str):
    doc = await db.resources.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Resource not found")
    return doc


@api_router.post("/resources", response_model=Resource)
async def create_resource(payload: ResourceCreate, _: bool = Depends(require_admin)):
    existing = await db.resources.find_one({"slug": payload.slug}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=409, detail="Resource with this slug already exists")
    obj = Resource(**payload.model_dump(by_alias=False))
    await db.resources.insert_one(obj.model_dump(by_alias=False))
    return obj


@api_router.delete("/resources/{slug}")
async def delete_resource(slug: str, _: bool = Depends(require_admin)):
    res = await db.resources.delete_one({"slug": slug})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"deleted": True, "slug": slug}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
