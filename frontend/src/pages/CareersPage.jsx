import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API}/careers/jobs`).then(r => setJobs(r.data)).catch(() => setJobs([]));
  }, []);

  const departments = useMemo(() => {
    const s = new Set(jobs.map(j => j.department));
    return ["All", ...Array.from(s)];
  }, [jobs]);

  const filtered = filter === "All" ? jobs : jobs.filter(j => j.department === filter);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    setSubmitting(true);
    try {
      await axios.post(`${API}/careers/apply`, payload);
      toast.success("Application submitted. Our team will reach out within 5 business days.");
      e.target.reset();
      setSelected(null);
    } catch (err) {
      toast.error("Failed to submit. Please verify your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="careers-page">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Careers</div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance max-w-4xl">
            Engineer the security of regulated digital enterprises.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            Senior-led delivery, real ownership, and clients who treat security as a board-level priority.
            We're hiring practitioners across cyber, GRC, AI and cloud.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {departments.map(d => (
              <button key={d}
                      onClick={() => setFilter(d)}
                      className={`px-4 py-2 text-sm rounded-sm border transition ${
                        filter === d
                          ? "bg-[#1E2C9A] text-white border-[#1E2C9A]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-[#1E2C9A]"
                      }`}
                      data-testid={`filter-${d.replace(/\s+/g, '-').toLowerCase()}`}>
                {d}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            {filtered.map(j => (
              <div key={j.id}
                   className="bg-white border border-slate-200 rounded-sm p-6 hover:border-[#1E2C9A] hover:shadow-sm transition flex flex-col lg:flex-row gap-6 lg:items-center"
                   data-testid={`job-${j.id}`}>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-[11px] px-2 py-1 bg-[#1E2C9A]/8 text-[#1E2C9A] rounded-sm">{j.department}</span>
                    <span className="text-[11px] px-2 py-1 bg-orange-50 text-orange-700 rounded-sm">{j.type}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-slate-900">{j.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{j.description}</p>
                  <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{j.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{j.experience}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(j)}
                        className="inline-flex items-center gap-2 bg-[#1E2C9A] hover:bg-[#0F1758] text-white px-5 py-2.5 text-sm rounded-sm transition shrink-0"
                        data-testid={`apply-${j.id}`}>
                  Apply now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-500">No open roles in this department right now.</div>
            )}
          </div>
        </div>
      </section>

      {/* Apply modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-sm max-w-xl w-full p-8 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()} data-testid="apply-modal">
            <div className="flex items-center gap-3 mb-1">
              <Briefcase className="h-5 w-5 text-[#1E2C9A]" />
              <div className="text-xs uppercase tracking-widest text-[#1E2C9A]">Apply for</div>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">{selected.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{selected.department} · {selected.location}</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <input type="hidden" name="role" value={selected.id} />
              <Input name="name" label="Full name" required testId="apply-name" />
              <Input name="email" type="email" label="Email" required testId="apply-email" />
              <Input name="phone" label="Phone" testId="apply-phone" />
              <Input name="experience_years" label="Years of experience" testId="apply-experience" />
              <Input name="linkedin" label="LinkedIn URL" testId="apply-linkedin" />
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Cover letter</label>
                <textarea name="cover_letter" rows={4}
                          data-testid="apply-cover-letter"
                          className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setSelected(null)}
                        className="px-5 py-2.5 text-sm border border-slate-300 rounded-sm hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={submitting}
                        className="bg-[#1E2C9A] hover:bg-[#0F1758] text-white px-5 py-2.5 text-sm rounded-sm disabled:opacity-60"
                        data-testid="submit-application">
                  {submitting ? "Submitting..." : "Submit application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ name, label, type = "text", required, testId }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}{required && " *"}</label>
      <input name={name} type={type} required={required}
             data-testid={testId || `apply-${name}`}
             className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
    </div>
  );
}
