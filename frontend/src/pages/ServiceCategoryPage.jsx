import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight, CheckCircle2, HelpCircle } from "lucide-react";
import { SERVICE_CATEGORIES, CATEGORY_IMAGES } from "@/data/site";
import SEO, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEO";

export default function ServiceCategoryPage() {
  const { categorySlug } = useParams();
  const cat = SERVICE_CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return <Navigate to="/" replace />;
  const Icon = cat.icon;

  const faqs = [
    {
      q: `What does Datamosh's ${cat.name} practice cover?`,
      a: `Our ${cat.name} practice covers ${cat.services.slice(0, 5).map(s => s.name).join(", ")} and ${cat.services.length - 5}+ more specialised services. ${cat.description}`,
    },
    {
      q: "Who leads engagements?",
      a: "Every engagement is led by a senior practitioner with the relevant industry-recognised certifications (OSCP, CISSP, CIPP/E, ISO 27001 LA, CISA). No offshore handoffs.",
    },
    {
      q: "What is the typical engagement duration?",
      a: "Most engagements run 3–6 weeks end-to-end, including planning, execution, reporting and remediation re-testing. Larger estates extend with parallel workstreams.",
    },
    {
      q: "Which regulations and frameworks do you map deliverables to?",
      a: "ISO 27001, ISO 27701, SOC 2, PCI DSS, GDPR, DPDP Act 2023, HIPAA, RBI IS Audit, SEBI, IRDAI, NIST CSF 2.0 and CERT-In — among others, based on your operating jurisdiction.",
    },
  ];

  return (
    <div data-testid="service-category-page">
      <SEO
        title={cat.name}
        description={cat.description}
        path={`/services/${cat.slug}`}
        schema={[
          serviceSchema({
            name: cat.name,
            description: cat.description,
            category: cat.name,
            url: `/services/${cat.slug}`,
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/cybersecurity" },
            { name: cat.name, path: `/services/${cat.slug}` },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative bg-[#0F1758] text-white overflow-hidden">
        <div className="absolute inset-0">
          {CATEGORY_IMAGES[cat.slug] && (
            <img src={CATEGORY_IMAGES[cat.slug]} alt="" className="w-full h-full object-cover opacity-25" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1758] via-[#0F1758]/85 to-[#0F1758]/40" />
          <div className="absolute inset-0 dot-grid opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Services</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-orange-300">{cat.name}</span>
          </div>
          <div className="flex items-start gap-5 max-w-4xl">
            <div className="h-14 w-14 flex items-center justify-center bg-white/8 border border-white/15 rounded-sm shrink-0">
              <Icon className="h-6 w-6 text-orange-300" />
            </div>
            <div>
              <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-balance">
                {cat.name}
              </h1>
              <p className="mt-5 text-slate-200/90 text-lg max-w-3xl leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white px-6 py-3 text-sm font-medium rounded-sm transition" data-testid="category-hero-cta">
                  Schedule consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#services" className="inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3 text-sm font-medium rounded-sm hover:bg-white/5 transition">
                  Explore services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Service portfolio</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Explore our {cat.name.toLowerCase()} services
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.services.map(s => {
              const SI = s.icon;
              return (
                <Link key={s.slug}
                      to={`/services/${cat.slug}/${s.slug}`}
                      className="group block border border-slate-200 rounded-sm p-6 bg-white hover:border-[#1E2C9A] hover:shadow-md transition"
                      data-testid={`service-item-${s.slug}`}>
                  <div className="h-10 w-10 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm group-hover:bg-[#1E2C9A] group-hover:text-white transition">
                    <SI className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display font-semibold text-slate-900">{s.name}</div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#1E2C9A] group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement model */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Engagement model</div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                A structured methodology — calibrated to your environment.
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Every engagement is led by a senior practitioner and follows a documented, repeatable
                methodology. No surprises, no offshore handoffs.
              </p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                { n: "01", t: "Discovery & scoping", d: "Stakeholder workshops, asset inventory, regulatory mapping." },
                { n: "02", t: "Threat-informed planning", d: "Adversary modelling, test plan, RACI and rules of engagement." },
                { n: "03", t: "Execution", d: "Hands-on testing, audits or implementation — fully documented." },
                { n: "04", t: "Reporting & remediation", d: "Risk-rated findings, remediation roadmap and re-test cycle." },
              ].map(p => (
                <div key={p.n} className="bg-white border border-slate-200 rounded-sm p-6">
                  <div className="font-display text-[#EA580C] text-sm font-bold tracking-widest">{p.n}</div>
                  <div className="mt-2 font-display font-semibold text-slate-900">{p.t}</div>
                  <div className="text-sm text-slate-600 mt-2 leading-relaxed">{p.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E2C9A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-balance max-w-2xl">
              Speak with a {cat.name} practitioner about your environment.
            </h3>
            <p className="text-slate-200/80 mt-2">Senior consultant assigned within one business day.</p>
          </div>
          <Link to="/contact"
                className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white px-6 py-3.5 font-medium rounded-sm transition"
                data-testid="category-cta-consult">
            Schedule a call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-slate-50" data-testid="category-faq">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3 flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Common questions about {cat.name}
          </h2>
          <div className="mt-8 space-y-3">
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
    </div>
  );
}
