import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Globe2, Award, Users, Lightbulb } from "lucide-react";
import { COMPANY } from "@/data/site";

export default function AboutPage() {
  return (
    <div data-testid="about-page">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">About us</div>
            <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance">
              A senior-led consulting firm built for the security demands of modern enterprises.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              {COMPANY.name} was founded in {COMPANY.founded} by a small group of practitioners who had
              spent careers inside Fortune-500 security and compliance teams. We built Datamosh to deliver
              the kind of engagements we always wished we could buy — practitioner-led, audit-grade and
              free of consulting theatre.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] overflow-hidden rounded-sm border border-slate-200">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtZWV0aW5nfGVufDB8fHx8MTc3ODc2OTE1OXww&ixlib=rb-4.1.0&q=85"
                   alt="Datamosh enterprise consulting" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-sm p-8">
            <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-2">Vision</div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              To be the security and compliance partner regulated enterprises rely on through every
              digital transformation cycle.
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-sm p-8">
            <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-2">Mission</div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Engineer measurable, audit-ready security outcomes — delivered by senior practitioners and
              evidenced against the frameworks our clients are accountable to.
            </h3>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Why work with us</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-balance max-w-3xl">
            Four reasons our clients renew, expand and refer.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: Users, t: "Senior, certified delivery", d: "Engagements led by practitioners with OSCP, CISSP, CIPP and ISO LA credentials." },
              { i: Award, t: "Audit-grade evidence", d: "Every output mapped to ISO, SOC 2, RBI, NIST and DPDP controls." },
              { i: Globe2, t: "Multi-jurisdiction expertise", d: "India, EU and APAC regulatory experience across BFSI, healthcare and SaaS." },
              { i: Lightbulb, t: "Engineering depth", d: "We don't stop at findings — we engineer remediation alongside your teams." },
            ].map(c => {
              const Icon = c.i;
              return (
                <div key={c.t} className="border border-slate-200 rounded-sm p-6">
                  <div className="h-10 w-10 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 font-display font-semibold text-slate-900">{c.t}</div>
                  <div className="mt-2 text-sm text-slate-600 leading-relaxed">{c.d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-orange-400 mb-3">Global presence</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-balance">
              India-headquartered. Serving regulated enterprises across APAC, EMEA and North America.
            </h2>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {["Bengaluru — HQ", "Mumbai", "Singapore"].map(c => (
              <div key={c} className="border border-white/10 p-6 rounded-sm bg-white/[0.02]">
                <div className="font-display font-semibold">{c}</div>
                <div className="text-xs text-slate-400 mt-2">Delivery & client success</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
