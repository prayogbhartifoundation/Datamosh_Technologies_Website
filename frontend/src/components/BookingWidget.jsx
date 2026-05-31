import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SLOTS = [
  "10:00 IST", "11:30 IST", "14:00 IST", "15:30 IST", "17:00 IST", "18:30 IST",
];

function nextBusinessDays(count = 7) {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + 1); // start tomorrow
  while (out.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      out.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function fmtDate(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
function fmtLabel(d) {
  return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

export default function BookingWidget() {
  const days = useMemo(() => nextBusinessDays(7), []);
  const [date, setDate] = useState(fmtDate(days[0]));
  const [slot, setSlot] = useState(SLOTS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = Object.fromEntries(fd.entries());
    payload.preferred_date = date;
    payload.preferred_slot = slot;
    setSubmitting(true);
    try {
      const r = await axios.post(`${API}/bookings`, payload);
      setConfirmed(r.data);
      toast.success("Booking requested. We'll send a calendar invite within one business hour.");
      e.target.reset();
    } catch {
      toast.error("Could not place booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="border border-slate-200 rounded-sm p-8 bg-white" data-testid="booking-confirmed">
        <div className="h-10 w-10 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] border border-[#1E2C9A]/15 rounded-sm">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold text-slate-900">Booking requested</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Thanks, {confirmed.name.split(" ")[0]}. We've logged your preferred slot of <strong>{confirmed.preferred_slot}</strong> on <strong>{confirmed.preferred_date}</strong>.
          A senior practitioner will email a calendar invite to <strong>{confirmed.email}</strong> within one business hour.
        </p>
        <button onClick={() => setConfirmed(null)}
                className="mt-5 text-xs font-medium text-[#1E2C9A] hover:underline">
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-sm p-8 bg-white" data-testid="booking-widget">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#EA580C] mb-3">
        <Calendar className="h-3.5 w-3.5" /> Book a 30-min consultation
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 text-balance">
        Speak with a senior practitioner — pick a slot below.
      </h3>
      <p className="text-sm text-slate-600 mt-2">No sales pitch. Direct technical conversation.</p>

      {/* Day picker */}
      <div className="mt-6">
        <div className="text-xs font-medium text-slate-600 mb-2">Select a day</div>
        <div className="flex flex-wrap gap-2">
          {days.map(d => {
            const v = fmtDate(d);
            const active = v === date;
            return (
              <button key={v}
                      type="button"
                      onClick={() => setDate(v)}
                      className={`px-3 py-2 text-xs rounded-sm border transition ${
                        active
                          ? "bg-[#1E2C9A] text-white border-[#1E2C9A]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-[#1E2C9A]"
                      }`}
                      data-testid={`booking-date-${v}`}>
                {fmtLabel(d)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot picker */}
      <div className="mt-5">
        <div className="text-xs font-medium text-slate-600 mb-2 flex items-center gap-1">
          <Clock className="h-3 w-3" /> Select a time
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {SLOTS.map(s => {
            const active = s === slot;
            return (
              <button key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`px-2 py-2 text-xs rounded-sm border transition ${
                        active
                          ? "bg-[#EA580C] text-white border-[#EA580C]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-[#EA580C]"
                      }`}
                      data-testid={`booking-slot-${s}`}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lead form */}
      <form onSubmit={submit} className="mt-7 grid sm:grid-cols-2 gap-4" data-testid="booking-form">
        <Field name="name" label="Full name" required />
        <Field name="email" type="email" label="Work email" required />
        <Field name="company" label="Company" />
        <Field name="phone" label="Phone (optional)" />
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Topic</label>
          <select name="topic" data-testid="booking-topic"
                  className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A] bg-white">
            <option value="">— What would you like to discuss? —</option>
            {SERVICE_CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Notes (optional)</label>
          <textarea name="notes" rows={3} data-testid="booking-notes"
                    className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
        </div>
        <div className="sm:col-span-2 flex justify-end">
          <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#1E2C9A] hover:bg-[#0F1758] text-white px-6 py-3 text-sm font-medium rounded-sm transition disabled:opacity-60"
                  data-testid="booking-submit">
            {submitting ? "Booking…" : "Request slot"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ name, label, type = "text", required }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      <input name={name} type={type} required={required}
             data-testid={`booking-${name}`}
             className="w-full border border-slate-300 px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-[#1E2C9A]" />
    </div>
  );
}
