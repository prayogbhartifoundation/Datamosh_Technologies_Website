import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/site";
import SEO, { serviceSchema, breadcrumbSchema } from "@/components/SEO";

export default function ServiceCategoryPage() {
  const { categorySlug } = useParams();
  const cat = SERVICE_CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return <Navigate to="/" replace />;
  const Icon = cat.icon;

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
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/cybersecurity" },
            { name: cat.name, path: `/services/${cat.slug}` },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="bg-[#0F1758] text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Services</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-orange-300">{cat.name}</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="h-14 w-14 flex items-center justify-center bg-white/8 border border-white/15 rounded-sm">
              <Icon className="h-6 w-6 text-orange-300" />
            </div>
            <div>
              <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-balance">
                {cat.name}
              </h1>
              <p className="mt-4 text-slate-300 text-lg max-w-3xl leading-relaxed">
                {cat.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 lg:py-24 bg-white">
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
    </div>
  );
}
