// Datamosh Technologies — services & site data
import {
  ShieldCheck, Lock, Cloud, Network, Smartphone, Code2, Database, Cpu,
  Workflow, Building2, Layers, Activity, FileSearch, ServerCog, KeyRound,
  Globe2, Gauge, BookOpen, Briefcase, GraduationCap, Leaf, Lightbulb,
  Factory, ScanLine, Brain, Boxes, GitBranch, Mail, MapPin, Phone,
  Banknote, Stethoscope, Landmark, Radio, Hammer, Zap, ShoppingBag,
  School, Rocket, CloudCog, BedDouble, Building, Bug, Eye, Users
} from "lucide-react";

export const COMPANY = {
  name: "Datamosh Technologies LLP",
  short: "Datamosh",
  tagline: "Securing Digital Enterprises Through Cybersecurity, AI & Compliance Excellence",
  subtagline: "Enterprise-grade cybersecurity, regulatory compliance, AI-driven innovation, and digital transformation for modern organizations.",
  logo: "https://customer-assets.emergentagent.com/job_nexus-enterprise-ai-1/artifacts/gzwykhvx_DataMosh%20Logo1.png",
  logoOnDark: "https://customer-assets.emergentagent.com/job_nexus-enterprise-ai-1/artifacts/gzwykhvx_DataMosh%20Logo1.png",
  logoMark: "https://customer-assets.emergentagent.com/job_nexus-enterprise-ai-1/artifacts/n4m9x8tg_blue%20only%20logo.png",
  email: "contact@datamosh.tech",
  phone: "+91 80 4567 8900",
  hq: "Bengaluru, India",
  founded: "2018",
};

// 8 service categories, with full nested service lists
export const SERVICE_CATEGORIES = [
  {
    slug: "cybersecurity",
    name: "VAPT & Cybersecurity",
    icon: ShieldCheck,
    short: "Offensive & defensive security testing for modern enterprises.",
    description:
      "End-to-end penetration testing, red teaming, secure code review, DFIR, and managed security operations engineered for regulated industries.",
    services: [
      { slug: "web-app-security-testing", name: "Web Application Security Testing", icon: Globe2 },
      { slug: "mobile-app-security-testing", name: "Mobile Application Security Testing", icon: Smartphone },
      { slug: "api-security-testing", name: "API Security Testing", icon: Code2 },
      { slug: "network-penetration-testing", name: "Network Penetration Testing", icon: Network },
      { slug: "cloud-penetration-testing", name: "Cloud Penetration Testing", icon: Cloud },
      { slug: "wireless-security-assessment", name: "Wireless Security Assessment", icon: Radio },
      { slug: "iot-security-testing", name: "IoT Security Testing", icon: ScanLine },
      { slug: "ot-scada-security", name: "OT / SCADA Security", icon: Factory },
      { slug: "ai-pentesting", name: "AI Pentesting", icon: Brain },
      { slug: "secure-code-review", name: "Secure Code Review", icon: FileSearch },
      { slug: "threat-modeling", name: "Threat Modeling", icon: Layers },
      { slug: "red-teaming", name: "Red Teaming", icon: Bug },
      { slug: "siem-soc-services", name: "SIEM & SOC Services", icon: Activity },
      { slug: "dfir", name: "Digital Forensics & Incident Response", icon: Eye },
      { slug: "zero-trust-security", name: "Zero Trust Security", icon: Lock },
      { slug: "iam", name: "Identity & Access Management", icon: KeyRound },
      { slug: "vulnerability-management", name: "Vulnerability Management", icon: ServerCog },
      { slug: "devsecops-security", name: "DevSecOps Security", icon: GitBranch },
      { slug: "container-kubernetes-security", name: "Container & Kubernetes Security", icon: Boxes },
    ],
  },
  {
    slug: "compliance-grc",
    name: "Compliance & GRC",
    icon: FileSearch,
    short: "Audit-ready compliance programs across global & Indian regulations.",
    description:
      "ISMS implementation, audit readiness, regulatory advisory, and continuous compliance for BFSI, healthcare, SaaS, and critical infrastructure.",
    services: [
      { slug: "iso-27001", name: "ISO 27001 Compliance", icon: ShieldCheck },
      { slug: "iso-27701", name: "ISO 27701 Certification", icon: ShieldCheck },
      { slug: "iso-27017", name: "ISO 27017 Certification", icon: ShieldCheck },
      { slug: "iso-27018", name: "ISO 27018 Certification", icon: ShieldCheck },
      { slug: "soc-2", name: "SOC 2 Compliance", icon: FileSearch },
      { slug: "gdpr", name: "GDPR Compliance", icon: Globe2 },
      { slug: "hipaa", name: "HIPAA Compliance", icon: Stethoscope },
      { slug: "pci-dss", name: "PCI DSS Compliance", icon: Banknote },
      { slug: "iso-42001", name: "ISO 42001 AI Management", icon: Brain },
      { slug: "nist-csf", name: "NIST CSF 2.0", icon: Layers },
      { slug: "dpdp-act", name: "DPDP Act 2023", icon: FileSearch, hasCustomContent: true },
      { slug: "cert-in-audit", name: "CERT-In Audit", icon: ShieldCheck },
      { slug: "rbi-is-audit", name: "RBI IS Audit", icon: Landmark },
      { slug: "irdai-compliance", name: "IRDAI Compliance Audit", icon: Landmark },
      { slug: "sebi-compliance", name: "SEBI Compliance Audit", icon: Landmark },
      { slug: "vendor-risk", name: "Vendor Risk Assessment", icon: Users },
      { slug: "policy-development", name: "Policy Development", icon: BookOpen },
      { slug: "risk-framework", name: "Risk Management Framework", icon: Gauge },
    ],
  },
  {
    slug: "deep-tech-ai",
    name: "Deep Tech & AI",
    icon: Brain,
    short: "Applied AI, ML platforms, and responsible AI engineering.",
    description:
      "From generative AI solutions and ML platforms to AI governance, blockchain, and quantum-safe research — engineered with security-first principles.",
    services: [
      { slug: "ai-solutions", name: "Artificial Intelligence Solutions", icon: Brain },
      { slug: "ml-platforms", name: "Machine Learning Platforms", icon: Cpu },
      { slug: "ai-governance", name: "AI Governance & Responsible AI", icon: ShieldCheck },
      { slug: "fraud-detection", name: "Fraud Detection Systems", icon: Eye },
      { slug: "predictive-analytics", name: "Predictive Analytics", icon: Activity },
      { slug: "generative-ai", name: "Generative AI Solutions", icon: Lightbulb },
      { slug: "ai-risk-assessment", name: "AI Security & Risk Assessment", icon: Bug },
      { slug: "blockchain-solutions", name: "Blockchain Solutions", icon: Layers },
      { slug: "quantum-security", name: "Quantum Security Research", icon: Cpu },
      { slug: "data-analytics-bi", name: "Data Analytics & BI", icon: Database },
      { slug: "saas-engineering", name: "SaaS Product Engineering", icon: Code2 },
      { slug: "cloud-native", name: "Cloud Native Development", icon: CloudCog },
    ],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    icon: Workflow,
    short: "Enterprise architecture, cloud migration, DevSecOps & managed services.",
    description:
      "Modernize infrastructure, automate operations, and embed security across the SDLC — guided by enterprise architects and certified cloud consultants.",
    services: [
      { slug: "enterprise-architecture", name: "Enterprise Architecture", icon: Building2 },
      { slug: "cloud-migration", name: "Cloud Migration", icon: Cloud },
      { slug: "devops-devsecops", name: "DevOps & DevSecOps", icon: GitBranch },
      { slug: "infrastructure-modernization", name: "Infrastructure Modernization", icon: ServerCog },
      { slug: "managed-security-services", name: "Managed Security Services", icon: ShieldCheck },
      { slug: "it-consulting", name: "IT Consulting", icon: Briefcase },
      { slug: "dt-strategy", name: "Digital Transformation Strategy", icon: Workflow },
      { slug: "enterprise-mobility", name: "Enterprise Mobility", icon: Smartphone },
      { slug: "process-automation", name: "Business Process Automation", icon: Workflow },
    ],
  },
  {
    slug: "iot-ot-critical",
    name: "IoT / OT & Critical Infrastructure",
    icon: Factory,
    short: "Security for connected devices, OT networks and national critical infra.",
    description:
      "Specialized assessments for SCADA, ICS, smart cities and connected ecosystems — aligned with IEC 62443 and NIST guidelines.",
    services: [
      { slug: "iot-security", name: "IoT Security", icon: ScanLine },
      { slug: "smart-infra-monitoring", name: "Smart Infrastructure Monitoring", icon: Activity },
      { slug: "industrial-security", name: "Industrial Security Assessment", icon: Factory },
      { slug: "scada-security-review", name: "SCADA Security Review", icon: Hammer },
      { slug: "critical-infra-protection", name: "Critical Infrastructure Protection", icon: ShieldCheck },
      { slug: "ot-soc-monitoring", name: "OT SOC Monitoring", icon: Eye },
      { slug: "connected-device-risk", name: "Connected Device Risk Assessment", icon: ScanLine },
    ],
  },
  {
    slug: "green-energy-esg",
    name: "Green Energy & ESG",
    icon: Leaf,
    short: "ESG reporting, sustainability compliance & green energy platforms.",
    description:
      "Sustainability-driven technology consulting — ESG reporting, carbon analytics, and renewable energy platform engineering.",
    services: [
      { slug: "esg-reporting", name: "ESG Reporting Solutions", icon: BookOpen },
      { slug: "sustainability-compliance", name: "Sustainability Compliance", icon: Leaf },
      { slug: "green-energy-consulting", name: "Green Energy Consulting", icon: Zap },
      { slug: "smart-energy-platforms", name: "Smart Energy Platforms", icon: Activity },
      { slug: "renewable-tech", name: "Renewable Energy Technology", icon: Leaf },
      { slug: "carbon-analytics", name: "Carbon Monitoring Analytics", icon: Gauge },
      { slug: "environmental-compliance", name: "Environmental Compliance", icon: FileSearch },
    ],
  },
  {
    slug: "startup-innovation",
    name: "Startup & Innovation",
    icon: Rocket,
    short: "Incubation, R&D collaboration and DPIIT-aligned advisory.",
    description:
      "Bootstrapping deep-tech startups with infrastructure, mentorship, compliance and go-to-market expertise — aligned with DPIIT and Startup India programs.",
    services: [
      { slug: "startup-incubation", name: "Startup Incubation", icon: Rocket },
      { slug: "tech-accelerator", name: "Technology Accelerator", icon: Lightbulb },
      { slug: "innovation-labs", name: "Innovation Labs", icon: Cpu },
      { slug: "rd-collaboration", name: "R&D Collaboration", icon: Briefcase },
      { slug: "gov-innovation", name: "Government Innovation Programs", icon: Landmark },
      { slug: "startup-advisory", name: "Startup Advisory", icon: Users },
      { slug: "dpiit-consulting", name: "DPIIT & Startup India Consulting", icon: Building2 },
    ],
  },
  {
    slug: "training-certification",
    name: "Training & Certification",
    icon: GraduationCap,
    short: "Cyber, cloud, AI & ISO training delivered by practising consultants.",
    description:
      "Hands-on, instructor-led programs for security teams, developers and leadership — including ISO 27001 LA, SOC analyst tracks, and cloud security workshops.",
    services: [
      { slug: "cybersecurity-training", name: "Cybersecurity Training", icon: ShieldCheck },
      { slug: "ai-data-training", name: "AI & Data Science Training", icon: Brain },
      { slug: "cloud-security-workshops", name: "Cloud Security Workshops", icon: Cloud },
      { slug: "iso-27001-la", name: "ISO 27001 Lead Auditor Training", icon: BookOpen },
      { slug: "soc-analyst-program", name: "SOC Analyst Program", icon: Activity },
      { slug: "skill-development", name: "Skill Development Programs", icon: GraduationCap },
      { slug: "corporate-training", name: "Corporate Training", icon: Briefcase },
    ],
  },
];

export const INDUSTRIES = [
  { slug: "bfsi", name: "Banking & Financial Services", icon: Banknote, blurb: "RBI IS Audit, PCI DSS, fraud analytics & SOC modernization." },
  { slug: "healthcare", name: "Healthcare", icon: Stethoscope, blurb: "HIPAA, DPDP, medical device security & clinical data privacy." },
  { slug: "government", name: "Government & Public Sector", icon: Landmark, blurb: "CERT-In audit, critical infra protection & e-gov security." },
  { slug: "telecom", name: "Telecom", icon: Radio, blurb: "5G core security, OSS/BSS hardening & subscriber data privacy." },
  { slug: "manufacturing", name: "Manufacturing", icon: Hammer, blurb: "OT/SCADA security, IEC 62443 & connected factory programs." },
  { slug: "energy", name: "Energy & Utilities", icon: Zap, blurb: "Grid security, SCADA assessments & green-energy platforms." },
  { slug: "retail", name: "Retail & E-Commerce", icon: ShoppingBag, blurb: "PCI DSS, fraud detection & secure omni-channel platforms." },
  { slug: "education", name: "Education", icon: School, blurb: "EdTech security, learner data privacy & compliance training." },
  { slug: "saas", name: "SaaS Companies", icon: CloudCog, blurb: "SOC 2, ISO 27001, DevSecOps & cloud-native security." },
  { slug: "startups", name: "Startups", icon: Rocket, blurb: "Security-by-design, compliance roadmap & investor-grade audits." },
  { slug: "hospitality", name: "Hospitality", icon: BedDouble, blurb: "PCI DSS, guest data privacy & connected property security." },
  { slug: "smart-cities", name: "Smart Cities", icon: Building, blurb: "Urban OT security, IoT governance & resilient public services." },
];

export const COMPLIANCE_FRAMEWORKS = [
  "ISO 27001", "ISO 27701", "ISO 27017", "ISO 27018", "ISO 42001",
  "SOC 2", "PCI DSS", "GDPR", "HIPAA", "NIST CSF 2.0",
  "DPDP Act 2023", "CERT-In", "RBI IS Audit", "SEBI", "IRDAI"
];

export const PARTNERS = [
  "AWS", "Microsoft Azure", "Google Cloud", "Palo Alto Networks",
  "CrowdStrike", "Splunk", "Wiz", "Tenable", "HashiCorp", "Cloudflare"
];

export const STATS = [
  { value: 500, suffix: "+", label: "Enterprise engagements delivered" },
  { value: 120, suffix: "+", label: "Compliance certifications guided" },
  { value: 40, suffix: "+", label: "Industry verticals served" },
  { value: 99.9, suffix: "%", label: "Client retention across regulated sectors" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Datamosh's red team uncovered exposure paths our existing vendor missed for two years. Their report was the most actionable we've ever received.",
    author: "Aanya Krishnan",
    role: "CISO, Tier-1 Private Bank",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc3ODc2OTE1OXww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "From SOC 2 Type II readiness to continuous monitoring, the team operated as an extension of our security org. Audit-clean in 90 days.",
    author: "Rohan Mehta",
    role: "VP Engineering, Global SaaS Platform",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc3ODc2OTE1OXww&ixlib=rb-4.1.0&q=85",
  },
];

export const RESOURCES = [
  {
    slug: "zero-trust-bfsi-2025",
    type: "Whitepaper",
    title: "Operationalizing Zero Trust in Indian BFSI",
    excerpt: "A practitioner's playbook for rolling out Zero Trust across digital banking, payments and core-banking estates.",
    author: "Datamosh Research",
    date: "Nov 2025",
    readTime: "12 min read",
    tag: "Zero Trust",
    image: "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/a72618bb39c2ff33e34c3756f7c209378ee744634862a784ad5c60907e42344b.png",
  },
  {
    slug: "ai-security-governance",
    type: "Research Paper",
    title: "AI Security & ISO 42001 — Building Governable AI Systems",
    excerpt: "Mapping ISO 42001 controls to real engineering practices for organisations shipping production AI.",
    author: "Dr. K. Sundaram",
    date: "Oct 2025",
    readTime: "18 min read",
    tag: "AI Governance",
    image: "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/138b39e1137e1c06fef4341210bd85c8d71be43127cda01c60874a7abc85b98a.png",
  },
  {
    slug: "dpdp-readiness",
    type: "Case Study",
    title: "DPDP Act 2023 — How a Healthcare Network Reached Readiness in 60 Days",
    excerpt: "Inside the data-mapping, DPIA and consent architecture programme delivered to a 40-hospital network.",
    author: "Datamosh GRC",
    date: "Sep 2025",
    readTime: "9 min read",
    tag: "DPDP",
    image: "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/4e2c4425986f1f022be0b0e5bbd15aa57105e28617ec7b722d1bcccff1c5ab3e.png",
  },
];

export const OFFICES = [
  { city: "Bengaluru", address: "Prestige Atlanta, 80 Feet Road, Koramangala", country: "India — HQ" },
  { city: "Mumbai", address: "BKC, Bandra East", country: "India" },
  { city: "Singapore", address: "Marina Bay Financial Centre", country: "APAC" },
];
