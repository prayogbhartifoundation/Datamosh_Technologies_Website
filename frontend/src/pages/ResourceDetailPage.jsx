import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, ChevronRight, Clock, Tag, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import SEO, { articleSchema, breadcrumbSchema } from "@/components/SEO";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STORAGE_KEY = "datamosh.unlocked.resources";

function getUnlocked() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function markUnlocked(slug) {
  const list = getUnlocked();
  if (!list.includes(slug)) {
    list.push(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

export default function ResourceDetailPage() {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/resources/${slug}`)
      .then(r => {
        setResource(r.data);
        const isGated = r.data.gated;
        setUnlocked(!isGated || getUnlocked().includes(slug));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const submitLead = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, {
        ...payload,
        resource_slug: slug,
        source: "resource_gate",
      });
      markUnlocked(slug);
      setUnlocked(true);
      toast.success("Thanks — full resource unlocked. The PDF will also be emailed to you.");
    } catch {
      toast.error("Could not unlock right now. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (notFound) return <Navigate to="/resources" replace />;
  if (loading || !resource) {
    return <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-slate-500">Loading…</div>;
  }

  return (
    <div data-testid="resource-detail-page">
      <SEO
        title={resource.title}
        description={resource.excerpt}
        path={`/resources/${resource.slug}`}
        image={resource.image}
        schema={[
          articleSchema({
            title: resource.title,
            description: resource.excerpt,
            author: resource.author,
            date: resource.date,
            image: resource.image,
            url: `/resources/${resource.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: resource.title, path: `/resources/${resource.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-[#1E2C9A]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/resources" className="hover:text-[#1E2C9A]">Resources</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">{resource.type}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#EA580C] font-semibold mb-4">
            <Tag className="h-3 w-3" />{resource.type}
            {resource.gated && (
              <span className="ml-2 inline-flex items-center gap-1 bg-[#EA580C]/10 text-[#EA580C] px-2 py-0.5 rounded-sm">
                <Lock className="h-3 w-3" /> Gated
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 text-balance">
            {resource.title}
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">{resource.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-slate-500">
            <span>{resource.author}</span>
            <span>{resource.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{resource.read_time || resource.readTime}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-12">
          <div className="aspect-[16/8] overflow-hidden rounded-sm border border-slate-200 bg-slate-50">
            <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Body OR Gate */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {unlocked ? (
            <article className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-800 leading-relaxed">
                {resource.body || resource.excerpt}
              </p>
              <div className="mt-10 border border-slate-200 rounded-sm p-6 bg-slate-50">
                <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-2">Want the full PDF?</div>
                <p className="text-sm text-slate-700">
                  Email <a href="mailto:research@datamosh.tech" className="text-[#1E2C9A] underline">research@datamosh.tech</a> from
                  your corporate email and we'll send the signed PDF version along with the appendix datasets.
                </p>
              </div>
            </article>
          ) : (
            <LeadGate
              resource={resource}
              onSubmit={submitLead}
              submitting={submitting}
            />
          )}
        </div>
      </section>

      <section className="bg-[#0F172A] text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14 flex flex-col lg:flex-row items-center justify-between gap-4">
          <h3 className="font-display text-xl lg:text-2xl font-bold tracking-tight text-balance">
            Want a tailored briefing on this topic for your team?
          </h3>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white px-6 py-3 font-medium rounded-sm transition">
            Speak with us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function LeadGate({ resource, onSubmit, submitting }) {
  return (
    <div className="border border-slate-200 rounded-sm p-8 lg:p-10 bg-slate-50" data-testid="lead-gate">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#EA580C] mb-3">
        <Lock className="h-3.5 w-3.5" /> Premium research
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 text-balance">
        Unlock the full {resource.type.toLowerCase()} — free.
      </h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        Tell us where to send it. We respect your inbox — no marketing automation drips, just the document
        and an optional quarterly briefing from our research team.
      </p>

      <form onSubmit={onSubmit} className="mt-7 grid sm:grid-cols-2 gap-4">
        <Field label="Full name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <div className="sm:col-span-2">
          <Field label="Company" name="company" />
        </div>
        <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-[#1E2C9A] mt-0.5 shrink-0" />
            We never share or sell your details. DPDP & GDPR compliant.
          </div>
          <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#1E2C9A] hover:bg-[#0F1758] text-white px-6 py-3 text-sm font-medium rounded-sm transition disabled:opacity-60"
                  data-testid="lead-submit">
            {submitting ? "Unlocking…" : "Unlock & read"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-xs text-slate-600">
        {["Audit-grade analysis", "Reference architectures", "Practitioner playbooks"].map(b => (
          <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#EA580C]" />{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}{required && " *"}</label>
      <input name={name} type={type} required={required}
             data-testid={`lead-${name}`}
             className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A] bg-white" />
    </div>
  );
}
