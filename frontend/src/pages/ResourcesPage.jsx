import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { RESOURCES } from "@/data/site";

export default function ResourcesPage() {
  return (
    <div data-testid="resources-page">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Resource Center</div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance max-w-4xl">
            Practitioner research, threat advisories & regulatory analysis.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl">
            Field-tested insights from our cyber, GRC and AI teams — written for the practitioners who own
            security, compliance and resilience programs.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map(r => (
              <article key={r.slug}
                       className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-md hover:border-[#1E2C9A]/40 transition"
                       data-testid={`resource-${r.slug}`}>
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={r.image} alt={r.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#EA580C] font-semibold mb-3">
                    <Tag className="h-3 w-3" />{r.type}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 leading-snug">{r.title}</h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{r.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                    <span>{r.author} · {r.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.readTime}</span>
                  </div>
                  <a href="#" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#1E2C9A] group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
