# Datamosh Technologies LLP — Corporate Website PRD

## Original problem statement
Premium, enterprise-grade corporate website for Datamosh Technologies LLP — a cybersecurity, compliance, AI and deep-tech consulting firm. Quality bar: Palo Alto Networks, CrowdStrike, Deloitte, KPMG, Accenture, IBM Security. Palette: white + dark navy (#1E2C9A) + charcoal + orange accent (#EA580C). Typography: Manrope (display) + Inter (body). 8 service categories spanning ~100 services, 12 industries, resources, careers, contact.

## Architecture
- Frontend: React 19 + React Router + TailwindCSS + Framer Motion + Sonner toasts + lucide-react icons
- Backend: FastAPI on /api prefix, Motor (async MongoDB)
- DB collections: `contacts`, `newsletter`, `applications`
- Static data (services, industries, frameworks, testimonials, resources) lives in `/app/frontend/src/data/site.js`

## User personas
1. CISO / Security director at regulated enterprise (BFSI, healthcare, SaaS) — evaluating consulting partner
2. Compliance lead / DPO — needs ISO / SOC 2 / DPDP / RBI audit support
3. CTO / engineering leader — evaluating AI, cloud or DevSecOps engagement
4. Job seeker — security/GRC/AI practitioner
5. Investor / partner — assessing company credibility

## Core requirements (static)
- Marketing site with mega-menu navigation (8 categories)
- Service category + service detail page templates
- Industries page (12 verticals)
- Resources/blog listing
- About, Careers (with job listings + apply modal), Contact
- Newsletter signup
- Light theme, enterprise look, modern animations, accessible

## Implemented (Dec 2025)
- ✅ Backend endpoints: GET /api/, /api/health, POST /api/contact, GET /api/contact, POST /api/newsletter (idempotent), GET /api/careers/jobs (+ department filter), GET /api/careers/jobs/{id}, POST /api/careers/apply
- ✅ Pydantic v2 models with proper Mongo `_id` exclusion
- ✅ Header with sticky glassmorphism + hover mega-menu (8 categories) + mobile drawer
- ✅ Homepage: hero, partners marquee, animated stats (IntersectionObserver counter), services 8-card grid, why-us with dashboard image, industries section (dark), compliance frameworks chips, testimonials, CTA, footer with newsletter
- ✅ Service category page (dynamic, 8 categories) with breadcrumbs, services grid, engagement model
- ✅ Service detail page (dynamic ~100 services) with overview, scope, tools, deliverables, compliance mapping, 4-step methodology, benefits, FAQ
- ✅ Industries (12 cards), About, Resources (3 articles), Careers (6 jobs + filter + apply modal), Contact (form + offices + responsible disclosure)
- ✅ All forms persist to MongoDB; success/error toasts via Sonner
- ✅ data-testid on all interactive elements + form fields
- ✅ Testing agent passed 15/15 backend + all frontend flows

## Backlog (P1 / P2)
- P1: Live blog/CMS for resources (currently static)
- P1: WhatsApp / Calendly booking integration on Contact page
- P1: Localization (i18n) scaffolding
- P2: Admin dashboard for viewing submitted leads
- P2: Newsletter email delivery via Resend/SendGrid
- P2: SEO schema markup (Service, FAQ, Article)
- P2: Dark-mode toggle
- P2: Detailed leadership team / case study deep-dive pages

## Next tasks
- Address auth on GET /api/contact before any production push
- Add SEO meta tags per page (react-helmet-async)
- Consider returning 201 on POST creates if strictly REST-conformant API is needed

## Iteration 2 — Implemented (Dec 2025)
- ✅ **Admin auth** via `x-admin-key` header (env: `ADMIN_API_KEY`). Protects `GET /api/contact`, `GET /api/bookings`, `GET /api/leads`, `POST /api/resources`, `DELETE /api/resources/{slug}`. Public POSTs remain open.
- ✅ **SEO + JSON-LD schema** per page via `react-helmet-async` + `<SEO />` component. Emits Organization on every page; Service + FAQPage + BreadcrumbList on category pages; Service + FAQPage + BreadcrumbList on service detail; Article + BreadcrumbList on resource detail. OpenGraph + Twitter card meta included.
- ✅ **Blog / CMS backend** — `GET /api/resources`, `GET /api/resources/{slug}`, `POST /api/resources` (admin), `DELETE /api/resources/{slug}` (admin). Startup hook idempotently seeds 3 articles. Frontend Resources page fetches from API.
- ✅ **Booking widget** on Contact page — tabbed UI (Booking default / Send a message). Day picker (next 7 business days) + 6 IST slots + lead form. `POST /api/bookings` persists to MongoDB; confirmation panel rendered on success.
- ✅ **Resource lead-capture gating** — premium articles render `<LeadGate />` until a name/email/company is submitted via `POST /api/leads`. Unlock stored in `localStorage` under `datamosh.unlocked.resources`.
- ✅ **Test coverage**: 38/38 backend pytest tests passing (`test_datamosh_api.py` + `test_iteration2.py`). All frontend flows verified.

## Backlog (after iteration 2)
- P1: Server-side gating enforcement (currently soft-gate via localStorage)
- P1: Rate-limit / dedupe POST /api/leads and /api/bookings to prevent spam
- P2: Switch POST creates to return 201 (REST consistency)
- P2: Admin dashboard UI for viewing leads / bookings / contacts
- P2: Email delivery integration (Resend or SendGrid) for booking confirmations + lead receipts
