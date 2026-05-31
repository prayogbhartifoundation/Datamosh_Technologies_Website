import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight, CheckCircle2, FileText, Target, Wrench, Award, HelpCircle, ShieldCheck, BookOpen, Cog } from "lucide-react";
import { SERVICE_CATEGORIES, COMPLIANCE_FRAMEWORKS } from "@/data/site";
import { SERVICE_CONTENT } from "@/data/service-content";

export default function ServiceDetailPage() {
  const { categorySlug, serviceSlug } = useParams();
  const cat = SERVICE_CATEGORIES.find(c => c.slug === categorySlug);
  const svc = cat?.services.find(s => s.slug === serviceSlug);
  if (!cat || !svc) return <Navigate to="/" replace />;
  const Icon = svc.icon;

  const custom = SERVICE_CONTENT[`${categorySlug}/${serviceSlug}`];

  // ---------- Custom content path ----------
  if (custom) {
    return <CustomServiceDetail cat={cat} svc={svc} Icon={Icon} content={custom} />;
  }

  // ---------- Generic enterprise template ----------

  // Generic enterprise content blocks — same shape across all services
  const overview = `${svc.name} from Datamosh is a senior-led, audit-ready engagement designed to surface risk that automated scanners miss. We combine threat-informed methodology, hands-on practitioner expertise and clear executive reporting — so security, compliance and engineering teams move in lockstep.`;

  const scope = [
    "External and internal exposure mapping",
    "Authenticated and unauthenticated testing where applicable",
    "Mapped controls across applicable regulatory frameworks",
    "Severity-rated findings with reproducible evidence",
    "Executive readout and engineering deep-dive sessions",
  ];

  const methodology = [
    { n: "01", t: "Discovery & threat modelling", d: "Workshops, asset & data-flow mapping, regulatory scoping." },
    { n: "02", t: "Test plan & rules of engagement", d: "Documented test plan, RACI, escalation paths and approvals." },
    { n: "03", t: "Execution", d: "Hands-on assessment by senior practitioners — fully evidenced." },
    { n: "04", t: "Reporting & remediation support", d: "Findings, remediation roadmap, retest and audit-ready evidence." },
  ];

  const tools = ["Burp Suite Pro", "Nuclei", "Nmap", "Metasploit", "Cobalt Strike", "Wireshark", "Semgrep", "Trivy", "CloudSploit", "Wazuh"];

  const deliverables = [
    "Executive summary with risk heatmap",
    "Technical findings report (CVSS + business impact)",
    "Remediation roadmap with prioritisation",
    "Evidence pack for auditors / regulators",
    "Retest report after remediation",
  ];

  const benefits = [
    "Reduce material risk before adversaries find it",
    "Audit-ready evidence mapped to ISO / SOC 2 / DPDP / RBI",
    "Board-grade narrative for security & compliance posture",
    "Concrete engineering remediation guidance — not generic checklists",
  ];

  const faqs = [
    { q: "How long does a typical engagement take?", a: "Most engagements run 3–6 weeks end-to-end, including planning, execution, reporting and remediation re-testing. Larger estates may extend with parallel workstreams." },
    { q: "Will testing impact production systems?", a: "We define rules of engagement with your team, isolate destructive techniques to staging, and coordinate sensitive operations within agreed maintenance windows." },
    { q: "Do you provide retesting?", a: "Yes. Re-validation of remediated findings is included as standard so your final report reflects the closed state." },
    { q: "Is the team certified?", a: "Engagements are led by practitioners certified in OSCP, OSCE, CISSP, CISA, CIPP/E, ISO 27001 LA — among others." },
  ];

  return (
    <div data-testid="service-detail-page">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-[#1E2C9A]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/services/${cat.slug}`} className="hover:text-[#1E2C9A]">{cat.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">{svc.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#1E2C9A]/20 bg-[#1E2C9A]/5 text-[#1E2C9A] text-xs font-medium rounded-sm">
                <Icon className="h-3.5 w-3.5" /> {cat.name}
              </div>
              <h1 className="mt-5 font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance">
                {svc.name}
              </h1>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-3xl">{overview}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#1E2C9A] text-white px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#0F1758] transition" data-testid="detail-cta-consult">
                  Schedule consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={`/services/${cat.slug}`} className="inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3 text-sm font-medium rounded-sm hover:border-[#1E2C9A] hover:text-[#1E2C9A] transition">
                  Back to {cat.name}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-slate-200 rounded-sm p-6 bg-slate-50">
                <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-3">Engagement</div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex justify-between"><span className="text-slate-500">Typical duration</span><span className="font-semibold">3–6 weeks</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Delivery</span><span className="font-semibold">Senior-led, on-site / remote</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Outputs</span><span className="font-semibold">Reports + evidence pack</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Retest</span><span className="font-semibold">Included</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <Block icon={Target} title="Scope">
            <ul className="space-y-3">
              {scope.map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#EA580C] mt-0.5 shrink-0" />{s}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Wrench} title="Tools & technologies">
            <div className="flex flex-wrap gap-2">
              {tools.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 border border-slate-200 text-slate-700 rounded-sm">{t}</span>
              ))}
            </div>
          </Block>

          <Block icon={FileText} title="Deliverables">
            <ul className="space-y-3">
              {deliverables.map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#EA580C] mt-0.5 shrink-0" />{s}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={Award} title="Compliance mapping">
            <div className="flex flex-wrap gap-2">
              {COMPLIANCE_FRAMEWORKS.slice(0, 10).map(c => (
                <span key={c} className="text-xs px-3 py-1.5 border border-[#1E2C9A]/15 bg-[#1E2C9A]/5 text-[#1E2C9A] rounded-sm">{c}</span>
              ))}
            </div>
          </Block>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Methodology</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">A structured, evidenced approach</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {methodology.map(p => (
              <div key={p.n} className="bg-white border border-slate-200 rounded-sm p-6">
                <div className="font-display text-[#EA580C] text-sm font-bold tracking-widest">{p.n}</div>
                <div className="mt-2 font-display font-semibold text-slate-900">{p.t}</div>
                <div className="text-sm text-slate-600 mt-2 leading-relaxed">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Business benefits</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">Outcomes your CISO, auditor and CFO will all sign off on.</h2>
          </div>
          <div className="space-y-4">
            {benefits.map(b => (
              <div key={b} className="flex items-start gap-3 border border-slate-200 p-5 rounded-sm hover:border-[#1E2C9A]/40 transition">
                <CheckCircle2 className="h-5 w-5 text-[#1E2C9A] mt-0.5 shrink-0" />
                <div className="text-slate-800">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3 flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">Common questions</h2>
          <div className="mt-10 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group border border-slate-200 bg-white rounded-sm p-5">
                <summary className="cursor-pointer font-display font-semibold text-slate-900 flex justify-between items-center">
                  {f.q}<ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1E2C9A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-balance max-w-2xl">
            Ready to engage on {svc.name}?
          </h3>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white px-6 py-3.5 font-medium rounded-sm transition">
            Schedule consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Block({ icon: Icon, title, children }) {
  return (
    <div className="border border-slate-200 rounded-sm p-7 bg-white hover:shadow-sm transition">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-display font-semibold text-slate-900 text-lg">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

// ============================================================
// CustomServiceDetail — rich, hand-crafted content (e.g. DPDP)
// ============================================================
function CustomServiceDetail({ cat, svc, Icon, content }) {
  const pillarIcons = [BookOpen, ShieldCheck, FileText];
  return (
    <div data-testid="service-detail-page">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-[#1E2C9A]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/services/${cat.slug}`} className="hover:text-[#1E2C9A]">{cat.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">{svc.name}</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#1E2C9A]/20 bg-[#1E2C9A]/5 text-[#1E2C9A] text-xs font-medium rounded-sm">
                <Icon className="h-3.5 w-3.5" /> {cat.name}
              </div>
              <h1 className="mt-5 font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance">
                {svc.name}
              </h1>
              <p className="mt-6 text-lg text-slate-700 leading-relaxed">{content.intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#1E2C9A] text-white px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#0F1758] transition" data-testid="dpdp-cta-consult">
                  Speak with a DPDP advisor <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to={`/services/${cat.slug}`} className="inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3 text-sm font-medium rounded-sm hover:border-[#1E2C9A] hover:text-[#1E2C9A] transition">
                  Back to {cat.name}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-slate-200 rounded-sm p-6 bg-slate-50">
                <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-3">Programme highlights</div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex justify-between"><span className="text-slate-500">Approach</span><span className="font-semibold">Advisory + Automation</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Coverage</span><span className="font-semibold">End-to-end</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Tooling</span><span className="font-semibold">Consent, DPIA, GRC</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Operating model</span><span className="font-semibold">DPO-as-a-Service</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 lg:py-24 bg-white" data-testid="dpdp-pillars">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">How we deliver</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 max-w-3xl">
            Three integrated practices — engineered for DPDP Act readiness.
          </h2>

          <div className="mt-12 grid lg:grid-cols-3 gap-5">
            {content.pillars.map((p, i) => {
              const PI = pillarIcons[i % pillarIcons.length];
              return (
                <div key={p.title}
                     className="border border-slate-200 rounded-sm p-7 bg-white hover:shadow-md hover:border-[#1E2C9A]/40 transition flex flex-col">
                  <div className="h-11 w-11 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm">
                    <PI className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-slate-900 text-xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.blurb}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-[#EA580C] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automation tools */}
      <section className="py-16 lg:py-24 bg-slate-50" data-testid="dpdp-automation">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-3 flex items-center gap-2">
                <Cog className="h-3.5 w-3.5" /> {content.automation.title}
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                {content.automation.subtitle}
              </h2>
            </div>
            <p className="lg:col-span-5 text-slate-600 leading-relaxed">
              Purpose-built automation removes the operational drag from privacy compliance — turning policy into
              evidenced, auditable practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.automation.tools.map(tool => (
              <div key={tool.name} className="bg-white border border-slate-200 rounded-sm p-6 hover:border-[#1E2C9A]/40 transition">
                <div className="font-display font-semibold text-slate-900">{tool.name}</div>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance + CTA */}
      <section className="bg-[#1E2C9A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-balance">
              Engineer DPDP Act compliance into the fabric of your business — not the margins.
            </h3>
            <p className="mt-3 text-slate-200/80 max-w-2xl">
              A senior privacy practitioner will walk you through a tailored readiness plan within one business day.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white px-6 py-3.5 font-medium rounded-sm transition">
              Schedule consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
