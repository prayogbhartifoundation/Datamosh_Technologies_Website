import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/data/site";
import SEO from "@/components/SEO";

export default function IndustriesPage() {
  return (
    <div data-testid="industries-page">
      <SEO
        title="Industries"
        description="Purpose-built cybersecurity and compliance programmes for BFSI, healthcare, government, telecom, manufacturing, retail and 6 more regulated sectors."
        path="/industries"
      />
      <section className="bg-[#0F1758] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-xs uppercase tracking-widest text-orange-300 mb-3">Industries</div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-balance max-w-4xl">
            Purpose-built security & compliance programs for regulated industries.
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-3xl leading-relaxed">
            Each industry has its own regulatory reality, threat surface and operational constraints.
            Datamosh delivers playbooks tuned to yours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map(ind => {
            const Icon = ind.icon;
            return (
              <div key={ind.slug}
                   className="group border border-slate-200 rounded-sm p-7 hover:border-[#1E2C9A] hover:shadow-md transition"
                   data-testid={`industry-card-${ind.slug}`}>
                <div className="h-11 w-11 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm group-hover:bg-[#1E2C9A] group-hover:text-white transition">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-xl text-slate-900">{ind.name}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{ind.blurb}</p>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#1E2C9A] group-hover:gap-2 transition-all">
                  Discuss your environment <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
