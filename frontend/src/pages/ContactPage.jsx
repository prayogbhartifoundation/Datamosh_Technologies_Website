import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { COMPANY, OFFICES, SERVICE_CATEGORIES } from "@/data/site";
import SEO from "@/components/SEO";
import BookingWidget from "@/components/BookingWidget";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState("booking"); // 'booking' | 'message'

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, payload);
      toast.success("Message received. A senior consultant will reach out within one business day.");
      e.target.reset();
    } catch {
      toast.error("Submission failed. Please verify your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <SEO
        title="Contact"
        description="Speak with a senior Datamosh practitioner — book a 30-minute consultation or send a message. Response within one business day."
        path="/contact"
      />

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-xs uppercase tracking-widest text-[#1E2C9A] mb-3">Contact</div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 text-balance max-w-4xl">
            Speak with a senior practitioner.
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Book a 30-minute consultation directly, or send a message — a senior consultant will respond within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            {/* Tabs */}
            <div className="inline-flex border border-slate-200 rounded-sm bg-white mb-6" role="tablist">
              <button onClick={() => setTab("booking")}
                      role="tab"
                      className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition ${
                        tab === "booking" ? "bg-[#1E2C9A] text-white" : "text-slate-700 hover:text-[#1E2C9A]"
                      }`}
                      data-testid="tab-booking">
                <Calendar className="h-4 w-4" /> Book a slot
              </button>
              <button onClick={() => setTab("message")}
                      role="tab"
                      className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition ${
                        tab === "message" ? "bg-[#1E2C9A] text-white" : "text-slate-700 hover:text-[#1E2C9A]"
                      }`}
                      data-testid="tab-message">
                <MessageSquare className="h-4 w-4" /> Send a message
              </button>
            </div>

            {tab === "booking" && <BookingWidget />}

            {tab === "message" && (
              <form onSubmit={submit} className="bg-white border border-slate-200 rounded-sm p-8 space-y-5" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name *" name="name" required testId="contact-name" />
                  <Field label="Work email *" type="email" name="email" required testId="contact-email" />
                  <Field label="Company" name="company" testId="contact-company" />
                  <Field label="Phone" name="phone" testId="contact-phone" />
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
                            data-testid="contact-message"
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
            )}
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
                Found a security issue on our infrastructure? Email <span className="text-orange-300">security@datamosh.tech</span> from
                your corporate email and we'll acknowledge within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required, testId }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      <input name={name} type={type} required={required}
             data-testid={testId || `contact-${name}`}
             className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
    </div>
  );
}
