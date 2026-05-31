import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { COMPANY, SERVICE_CATEGORIES, COMPLIANCE_FRAMEWORKS } from "@/data/site";
import Logo from "@/components/Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("You're subscribed. Welcome to the Datamosh briefing.");
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300" data-testid="site-footer">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange-400 mb-3">
              Datamosh Briefing
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance">
              Quarterly threat intelligence & regulatory updates — direct to your inbox.
            </h3>
            <p className="text-slate-400 mt-3 max-w-xl">
              Practitioner-grade research from our cyber, GRC and AI teams. No marketing fluff.
            </p>
          </div>
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-3" data-testid="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="work-email@yourcompany.com"
              className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-slate-500 rounded-sm focus:outline-none focus:border-orange-400"
              data-testid="newsletter-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[#EA580C] text-white px-5 py-3 text-sm font-medium rounded-sm hover:bg-[#c2410c] transition disabled:opacity-60"
              data-testid="newsletter-submit"
            >
              {loading ? "Submitting..." : "Subscribe"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-4">
          <Logo variant="dark" className="h-14 w-auto" />
          <p className="text-slate-400 mt-6 text-sm leading-relaxed max-w-xs">
            {COMPANY.name}. A cybersecurity, compliance and deep-tech consulting firm
            building resilient digital enterprises.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-400" />{COMPANY.hq}</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-400" />{COMPANY.email}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-400" />{COMPANY.phone}</div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-white font-semibold mb-4 font-display">Services</div>
          <ul className="space-y-2 text-sm">
            {SERVICE_CATEGORIES.slice(0, 6).map(c => (
              <li key={c.slug}>
                <Link to={`/services/${c.slug}`} className="hover:text-white transition" data-testid={`footer-service-${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="text-white font-semibold mb-4 font-display">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-white font-semibold mb-4 font-display">Compliance</div>
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE_FRAMEWORKS.slice(0, 10).map(f => (
              <span key={f} className="text-[11px] px-2 py-1 border border-white/15 rounded-sm text-slate-300">
                {f}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className="h-9 w-9 flex items-center justify-center border border-white/15 rounded-sm hover:bg-white/5"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="X" className="h-9 w-9 flex items-center justify-center border border-white/15 rounded-sm hover:bg-white/5"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-orange-400" />
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Trust Center</a>
            <a href="#" className="hover:text-white">Responsible Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
