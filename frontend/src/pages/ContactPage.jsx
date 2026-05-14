import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { COMPANY, OFFICES, SERVICE_CATEGORIES } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, payload);
      toast.success("Message received. A senior consultant will reach out within one business day.");
      e.target.reset();
    } catch (err) {
      toast.error("Submission failed. Please verify your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Contact</div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance max-w-4xl">
            Speak with a senior practitioner.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Share what's on your roadmap — a senior consultant will get back to you within one business day,
            with a no-obligation engagement plan.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="bg-white border border-slate-200 rounded-sm p-8 space-y-5" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name *" name="name" required />
                <Field label="Work email *" type="email" name="email" required />
                <Field label="Company" name="company" />
                <Field label="Phone" name="phone" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Service interest</label>
                <select name="service_interest"
                        className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A] bg-white"
                        data-testid="service-interest-select">
                  <option value="">— Select a practice —</option>
                  {SERVICE_CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">How can we help? *</label>
                <textarea required name="message" rows={5}
                          className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
              </div>
              <button type="submit" disabled={submitting}
                      className="inline-flex items-center gap-2 bg-[#1E2C9A] hover:bg-[#0F1758] text-white px-6 py-3 text-sm font-medium rounded-sm transition disabled:opacity-60"
                      data-testid="contact-submit">
                {submitting ? "Sending..." : "Send message"} <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-slate-500">
                By submitting, you agree to be contacted by Datamosh regarding your inquiry. We will never share your details.
              </p>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-sm p-6">
              <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-3">Direct channels</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#1E2C9A]" />{COMPANY.email}</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#1E2C9A]" />{COMPANY.phone}</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#1E2C9A]" />{COMPANY.hq}</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-6">
              <div className="text-xs uppercase tracking-widest text-[#EA580C] mb-3">Offices</div>
              <ul className="space-y-4">
                {OFFICES.map(o => (
                  <li key={o.city} className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#1E2C9A] mt-0.5" />
                    <div>
                      <div className="font-display font-semibold text-slate-900 text-sm">{o.city} <span className="text-xs text-slate-500 font-normal">— {o.country}</span></div>
                      <div className="text-xs text-slate-500 mt-0.5">{o.address}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0F172A] text-white rounded-sm p-6">
              <div className="text-xs uppercase tracking-widest text-orange-400 mb-2">Responsible Disclosure</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Found a security issue on our infrastructure? Email <span className="text-orange-300">security@datamosh.tech</span> with reproduction steps. We acknowledge within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      <input name={name} type={type} required={required}
             className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
    </div>
  );
}
