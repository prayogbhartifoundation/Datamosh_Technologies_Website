import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Clock, Tag, Lock } from "lucide-react";
import SEO from "@/components/SEO";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ResourcesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/resources`)
      .then(r => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="resources-page">
      <SEO
        title="Resource Center"
        description="Whitepapers, research, threat advisories and case studies from Datamosh's cybersecurity, GRC and AI teams."
        path="/resources"
      />

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
          {loading && <div className="text-slate-500 text-sm">Loading resources…</div>}
          {!loading && items.length === 0 && (
            <div className="text-slate-500 text-sm">No resources published yet.</div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(r => (
              <Link
                key={r.slug}
                to={`/resources/${r.slug}`}
                className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-md hover:border-[#1E2C9A]/40 transition flex flex-col"
                data-testid={`resource-${r.slug}`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img src={r.image} alt={r.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  {r.gated && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-[#EA580C] text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm">
                      <Lock className="h-3 w-3" /> Gated
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#EA580C] font-semibold mb-3">
                    <Tag className="h-3 w-3" />{r.type}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 leading-snug">{r.title}</h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">{r.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                    <span>{r.author} · {r.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.read_time || r.readTime}</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#1E2C9A] group-hover:gap-2 transition-all">
                    {r.gated ? "Unlock & read" : "Read now"} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
