from fastapi import FastAPI, APIRouter, HTTPException
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

app = FastAPI(title="Datamosh Technologies API")
api_router = APIRouter(prefix="/api")


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


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


# ============ ROUTES ============
@api_router.get("/")
async def root():
    return {"service": "Datamosh Technologies API", "status": "operational"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "timestamp": utcnow_iso()}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts(limit: int = 100):
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        return Newsletter(**existing)
    obj = Newsletter(email=payload.email)
    await db.newsletter.insert_one(obj.model_dump())
    return obj


@api_router.post("/careers/apply", response_model=CareerApplication)
async def apply_career(payload: CareerApplicationCreate):
    if not any(j.id == payload.role or j.title == payload.role for j in JOBS):
        # Allow open application even if role doesn't match
        pass
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
