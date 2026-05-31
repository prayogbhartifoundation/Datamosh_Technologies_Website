import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import {
  COMPANY, SERVICE_CATEGORIES, INDUSTRIES, COMPLIANCE_FRAMEWORKS,
  PARTNERS, STATS, TESTIMONIALS
} from "@/data/site";
import StatCounter from "@/components/StatCounter";
import SEO from "@/components/SEO";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.06 } }),
};

export default function Home() {
  return (
    <div data-testid="home-page">
      <SEO
        title="Cybersecurity, Compliance & Deep Tech Consulting"
        description="Datamosh Technologies LLP delivers enterprise-grade cybersecurity, regulatory compliance, AI governance and digital transformation for regulated organisations."
        path="/"
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <img
            src="https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/a72618bb39c2ff33e34c3756f7c209378ee744634862a784ad5c60907e42344b.png"
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-32">
          <motion.div initial="hidden" animate="show" variants={fade}
                      className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#1E2C9A]/20 bg-[#1E2C9A]/5 text-[#1E2C9A] text-xs font-medium rounded-sm">
            <ShieldCheck className="h-3.5 w-3.5" /> Enterprise-grade security & compliance
          </motion.div>

          <motion.h1 initial="hidden" animate="show" custom={1} variants={fade}
                     className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] text-balance text-slate-900">
            Securing digital enterprises through{" "}
            <span className="text-[#1E2C9A]">cybersecurity</span>, <span className="text-[#1E2C9A]">AI</span> &{" "}
            <span className="text-[#1E2C9A]">compliance</span> excellence.
          </motion.h1>

          <motion.p initial="hidden" animate="show" custom={2} variants={fade}
                    className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            {COMPANY.subtagline}
          </motion.p>

          <motion.div initial="hidden" animate="show" custom={3} variants={fade}
                      className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-[#1E2C9A] text-white px-6 py-3.5 text-sm font-medium rounded-sm hover:bg-[#0F1758] transition shadow-sm"
                  data-testid="hero-cta-consult">
              Schedule Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services/cybersecurity"
                  className="inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3.5 text-sm font-medium rounded-sm hover:border-[#1E2C9A] hover:text-[#1E2C9A] transition"
                  data-testid="hero-cta-services">
              Explore Services
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="show" custom={4} variants={fade}
                      className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              "CERT-In Empanelled methodology",
              "ISO 27001 certified delivery",
              "SOC 2 Type II practitioners",
              "GDPR & DPDP specialists",
            ].map(t => (
              <div key={t} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#EA580C] shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-8" data-testid="partners-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-xs uppercase tracking-widest text-slate-500 mb-5">
            Trusted technology partners
          </div>
          <div className="overflow-hidden">
            <div className="marquee-track flex gap-14 whitespace-nowrap will-change-transform">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <span key={i} className="text-slate-500 font-display font-semibold text-lg tracking-tight">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 lg:py-24 bg-white" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="p-8 border border-slate-200 rounded-sm bg-white hover:border-[#1E2C9A]/40 hover:shadow-sm transition">
                <div className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#1E2C9A] tabular">
                  <StatCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-sm text-slate-600 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28 bg-slate-50" data-testid="services-overview">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">What we do</div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Eight specialised practices. One accountable security partner.
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              From offensive security and regulatory compliance to applied AI and infrastructure modernization —
              delivered by senior consultants who've operated inside Fortune-500 security teams.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.slug}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}>
                  <Link to={`/services/${cat.slug}`}
                        className="group block h-full bg-white border border-slate-200 rounded-sm p-6 hover:border-[#1E2C9A] hover:shadow-md transition"
                        data-testid={`service-card-${cat.slug}`}>
                    <div className="h-10 w-10 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm group-hover:bg-[#1E2C9A] group-hover:text-white transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 mt-5 text-lg">{cat.name}</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{cat.short}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#1E2C9A] group-hover:gap-2 transition-all">
                      Explore practice <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US — split with dashboard image */}
      <section className="py-20 lg:py-28 bg-white" data-testid="why-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Why Datamosh</div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Built for regulated industries. Operated like an extension of your team.
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              We don't subcontract critical engagements. Every red team, audit and architecture review
              is led by senior practitioners with hands-on enterprise experience.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { t: "Practitioner-led delivery", d: "Engagements led by OSCP, OSCE, CISSP, CISA and CIPP-certified consultants." },
                { t: "Audit-ready evidence by default", d: "Every deliverable is mapped to ISO, SOC 2, PCI DSS, DPDP, RBI or NIST controls." },
                { t: "Threat-informed methodology", d: "Aligned with MITRE ATT&CK, OWASP, PTES and DBIR-grade adversary intelligence." },
                { t: "Continuous, not point-in-time", d: "Optional managed services keep findings closed long after the report ships." },
              ].map(item => (
                <div key={item.t} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex items-center justify-center bg-[#1E2C9A] text-white rounded-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-slate-900">{item.t}</div>
                    <div className="text-sm text-slate-600 mt-1 leading-relaxed">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] border border-slate-200 rounded-sm overflow-hidden bg-slate-50 shadow-sm">
              <img
                src="https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/330f6d561ccbb898bbbf2d04c817f8f787d3df06949e8637b0dc1e8fc341a5bc.png"
                alt="Datamosh enterprise security dashboard preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-white border border-slate-200 rounded-sm p-4 shadow-md w-64">
              <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-1">Live posture</div>
              <div className="font-display font-bold text-slate-900 text-2xl tabular">94 / 100</div>
              <div className="text-xs text-slate-500 mt-1">Composite security score — last audit</div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-20 lg:py-28 bg-[#0F172A] text-white" data-testid="industries-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-widest text-orange-400 mb-3">Industries served</div>
              <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-balance">
                Regulated industries trust Datamosh with their most critical workloads.
              </h2>
            </div>
            <div className="lg:col-span-5 text-slate-300">
              From BFSI and healthcare to smart cities and manufacturing — purpose-built playbooks
              for each industry's regulatory and threat reality.
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => {
              const Icon = ind.icon;
              return (
                <Link key={ind.slug} to="/industries"
                      className="group border border-white/10 hover:border-orange-400 p-5 rounded-sm transition bg-white/[0.02] hover:bg-white/[0.05]"
                      data-testid={`industry-${ind.slug}`}>
                  <Icon className="h-5 w-5 text-orange-400" />
                  <div className="mt-4 font-display font-semibold">{ind.name}</div>
                  <div className="text-xs text-slate-400 mt-2 leading-relaxed">{ind.blurb}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE FRAMEWORKS */}
      <section className="py-20 lg:py-24 bg-white" data-testid="compliance-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Compliance frameworks</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Mapped to the standards your auditors, regulators and board care about.
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              From ISO 27001 to RBI IS Audit and the DPDP Act 2023 — our deliverables are control-mapped
              to the frameworks your business operates under.
            </p>
            <Link to="/services/compliance-grc"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1E2C9A] hover:gap-3 transition-all"
                  data-testid="compliance-cta">
              See full GRC practice <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              {COMPLIANCE_FRAMEWORKS.map(f => (
                <span key={f}
                      className="px-4 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-sm hover:border-[#1E2C9A] hover:text-[#1E2C9A] transition">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-slate-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Client trust</div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance max-w-3xl">
            What security and compliance leaders say about working with us.
          </h2>

          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm p-8 hover:shadow-md transition">
                <Sparkles className="h-5 w-5 text-[#EA580C]" />
                <blockquote className="mt-5 text-lg text-slate-800 leading-relaxed font-display font-medium">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.image} alt={t.author} className="h-11 w-11 rounded-full object-cover grayscale" />
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E2C9A] text-white" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-balance">
              Ready to operationalise security, compliance and AI — without the consulting theatre?
            </h2>
            <p className="mt-4 text-slate-200/80 text-lg max-w-2xl">
              Tell us what's on your roadmap. We'll come back within one business day with a senior practitioner
              and a no-obligation engagement plan.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white px-7 py-4 font-medium rounded-sm transition"
                  data-testid="bottom-cta-consult">
              Schedule consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
