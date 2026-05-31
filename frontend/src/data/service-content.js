// Per-service rich content overrides. Keyed by `${categorySlug}/${serviceSlug}`.
// If a service is listed here, ServiceDetailPage renders this custom payload
// instead of the generic template.

export const SERVICE_CONTENT = {
  "compliance-grc/dpdp-act": {
    intro:
      "Our compliance program offerings are strategically designed to empower organizations in achieving full compliance with the Digital Personal Data Protection (DPDP) Act. By seamlessly integrating expert-led advisory services with robust, automation-driven tools, we provide a comprehensive, end-to-end framework for managing data privacy. From governance and risk assessments to real-time consent management and ongoing compliance monitoring, our solutions ensure that privacy is not just a policy but a sustainable, operational practice across the organization.",
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
};
