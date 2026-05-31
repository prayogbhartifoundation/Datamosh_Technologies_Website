// Per-service rich content overrides. Keyed by `${categorySlug}/${serviceSlug}`.
// If a service is listed here, ServiceDetailPage renders this custom payload
// instead of the generic template.

export const SERVICE_CONTENT = {
  "compliance-grc/dpdp-act": {
    intro:
      "Our compliance program offerings are strategically designed to empower organizations in achieving full compliance with the Digital Personal Data Protection (DPDP) Act. By seamlessly integrating expert-led advisory services with robust, automation-driven tools, we provide a comprehensive, end-to-end framework for managing data privacy. From governance and risk assessments to real-time consent management and ongoing compliance monitoring, our solutions ensure that privacy is not just a policy but a sustainable, operational practice across the organization.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    pillars: [
      {
        title: "Advisory and Consulting",
        blurb:
          "Strategic counsel from privacy practitioners to set the foundation of your DPDPA program.",
        items: [
          "DPDPA Gap Assessment",
          "Privacy Management Governance Structure",
          "Personal Data Discovery Drive",
          "DPDPA Readiness and Gap Assessment",
          "Gap Assessment Report and Recommendations",
          "Data Inventory",
        ],
      },
      {
        title: "Privacy Framework Implementation",
        blurb:
          "Translate the law into an operational, auditable privacy framework across your enterprise.",
        items: [
          "Personal Data Policy Framework",
          "Mapping of Processing Activities",
          "Data Principal Consent Management",
          "Data Principal Rights Management",
          "Data Protection Impact Assessment",
          "Third-Party Compliance",
          "Information Security Assessment",
          "Privacy Impact Assessment",
          "Data Breach Management",
          "Stakeholder Awareness Trainings",
          "Comprehensive DPDPA Audit",
        ],
      },
      {
        title: "DPO as a Service",
        blurb:
          "An accountable, externally-managed Data Protection Officer function — without the hiring overhead.",
        items: [
          "Policy Updates and Enhancements",
          "Act as Primary Point of Contact",
          "Data Protection Impact Assessments",
          "Record Keeping & Compliance Monitoring",
          "Incident Management",
          "Consent Management / Data Principal Rights Management Assistance",
        ],
      },
    ],
    automation: {
      title: "DPDPA Automation Tools Implementation",
      subtitle: "Audit and periodic monitoring — operationalised through purpose-built tooling.",
      tools: [
        {
          name: "Data Principal Consent Management",
          desc: "Manage user consent for specific purposes before data is processed.",
        },
        {
          name: "Data Principal Grievance Redressal",
          desc: "Facilitate user complaints and ensure timely redressal of issues.",
        },
        {
          name: "Data Protection Impact Assessment",
          desc: "Assess privacy risks before initiating any data processing activity.",
        },
        {
          name: "Data Protection Awareness Program",
          desc: "Educate employees and stakeholders on data protection laws and responsibilities.",
        },
        {
          name: "Data Protection Third-Party Assessment",
          desc: "Evaluate third-party vendors for data privacy compliance and accountability.",
        },
        {
          name: "Cookie Consent Management",
          desc: "Ensure users are informed, in control, and empowered to manage their cookie preferences.",
        },
      ],
    },
  },

  "financial-advisory/ifrs-ind-as-advisory": {
    intro:
      "Our Financial Accounting Advisory Services (FAAS) deliver Big-4-grade technical accounting expertise — without the Big-4 overhead. From IFRS and Ind AS implementation to IPO readiness, M&A accounting and CFO-office transformation, we partner with finance leaders to translate complex standards into auditable, board-ready outcomes. Engagements are led by qualified Chartered Accountants and CPAs with deep transactional and audit experience across listed entities, PE-backed businesses, banks and fast-growth technology companies.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    pillars: [
      {
        title: "Technical Accounting Advisory",
        blurb:
          "Standards-driven advisory on the accounting treatments that most often trip up CFOs, controllers and audit committees.",
        items: [
          "IFRS / Ind AS / US GAAP Convergence",
          "Revenue Recognition (IFRS 15 / ASC 606)",
          "Lease Accounting (IFRS 16 / ASC 842)",
          "Financial Instruments (IFRS 9 / ECL Models)",
          "Business Combinations & Purchase Price Allocation",
          "Impairment & Goodwill Testing",
          "Share-Based Payment Accounting (IFRS 2)",
          "Foreign Currency, Hyperinflation & Hedge Accounting",
          "Restatement & Prior-Period Adjustments",
        ],
      },
      {
        title: "IPO Readiness & Capital Markets",
        blurb:
          "End-to-end accounting and reporting preparation for entities approaching public markets or strategic exits.",
        items: [
          "DRHP / Prospectus Financial Statement Preparation",
          "Restated Financials & Pro-Forma Adjustments",
          "Group Reorganisations & Carve-Out Financials",
          "Audit Committee & Board Reporting Setup",
          "SEBI / SEC / LR Disclosure Compliance",
          "Comfort Letter & Working Group Support",
          "Listed-Entity Quarterly Reporting Operating Model",
        ],
      },
      {
        title: "Finance Transformation & CFO Advisory",
        blurb:
          "Modernise the office of the CFO — close, controls, consolidation and analytics — engineered for scale and audit.",
        items: [
          "Record-to-Report & Close Optimisation",
          "Consolidation & Group Reporting Re-design",
          "SOX / ICFR Design, Documentation & Testing",
          "Internal Controls Remediation",
          "ERP / EPM Implementation Support (Oracle, SAP, Workday, OneStream)",
          "Outsourced Controllership & Statutory Accounting",
          "Treasury, Cash Management & FX Policy",
          "ESG Reporting (BRSR Core, IFRS S1 & S2)",
          "Statutory Audit Readiness & Audit Support",
        ],
      },
    ],
    automation: {
      title: "FAAS Automation & Analytics",
      subtitle: "Continuous, evidenced finance — where standards meet operating discipline.",
      tools: [
        {
          name: "Close Calendar & Workflow Automation",
          desc: "Codified close checklists, reviewer signoffs and audit-ready traceability for every period-end.",
        },
        {
          name: "Account Reconciliation Platform",
          desc: "Automated reconciliations across GL, sub-ledgers and bank statements — with exception-based review.",
        },
        {
          name: "Lease Accounting Engine",
          desc: "IFRS 16 / ASC 842 compliant lease database with RoU / liability schedules and modification workflows.",
        },
        {
          name: "Revenue Recognition Automation",
          desc: "Contract-driven revenue allocation under IFRS 15 / ASC 606 with deferred revenue and SSP libraries.",
        },
        {
          name: "ICFR / SOX Workflow",
          desc: "Control library, walkthroughs, test evidence and deficiency tracking — mapped to COSO 2013.",
        },
        {
          name: "ESG Reporting Workbench",
          desc: "BRSR Core, GRI and IFRS S1 / S2 data capture with assurance-ready audit trails.",
        },
      ],
    },
  },
};
