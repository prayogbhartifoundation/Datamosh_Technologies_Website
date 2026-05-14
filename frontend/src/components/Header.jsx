import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { COMPANY, SERVICE_CATEGORIES } from "@/data/site";

const NAV = [
  { label: "Services", mega: true },
  { label: "Industries", to: "/industries" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200"
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img
              src={COMPANY.logo}
              alt={COMPANY.name}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#1E2C9A] transition"
                data-testid="nav-services-trigger"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
            </div>

            {NAV.filter(n => !n.mega).map(n => (
              <NavLink
                key={n.label}
                to={n.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition ${
                    isActive ? "text-[#1E2C9A]" : "text-slate-700 hover:text-[#1E2C9A]"
                  }`
                }
                data-testid={`nav-${n.label.toLowerCase()}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1E2C9A] text-white px-4 py-2.5 text-sm font-medium rounded-sm hover:bg-[#0F1758] transition"
              data-testid="header-cta-consult"
            >
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setMobileOpen(v => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white" data-testid="mobile-menu">
          <div className="px-6 py-4 space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-2 mb-2">
              Services
            </div>
            {SERVICE_CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                to={`/services/${cat.slug}`}
                className="block px-2 py-2 text-sm text-slate-700 hover:text-[#1E2C9A]"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-slate-200 my-3" />
            {NAV.filter(n => !n.mega).map(n => (
              <Link
                key={n.label}
                to={n.to}
                className="block px-2 py-2 text-sm font-medium text-slate-700 hover:text-[#1E2C9A]"
                onClick={() => setMobileOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); navigate("/contact"); }}
              className="mt-3 w-full bg-[#1E2C9A] text-white px-4 py-3 text-sm font-medium rounded-sm"
              data-testid="mobile-cta-consult"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaMenu({ onClose }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
      data-testid="mega-menu"
    >
      <div className="w-[min(1100px,92vw)] bg-white border border-slate-200 shadow-2xl rounded-sm">
        <div className="grid grid-cols-12">
          {/* Left column intro */}
          <div className="col-span-4 bg-[#0F1758] text-white p-8">
            <div className="text-xs uppercase tracking-widest text-orange-300 mb-3">
              Our Capabilities
            </div>
            <h3 className="font-display text-2xl font-bold leading-tight mb-3">
              Eight specialised practices.
              <br />One integrated security partner.
            </h3>
            <p className="text-sm text-slate-200/80 leading-relaxed mb-6">
              Datamosh combines offensive security, compliance, AI engineering and
              modernization expertise — delivered by a single accountable team.
            </p>
            <Link
              to="/services/cybersecurity"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-300 hover:text-white transition"
              data-testid="megamenu-explore-all"
            >
              Explore all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right grid of categories */}
          <div className="col-span-8 p-6 grid grid-cols-2 gap-2">
            {SERVICE_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={`/services/${cat.slug}`}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-sm hover:bg-slate-50 transition"
                  data-testid={`megamenu-category-${cat.slug}`}
                >
                  <div className="mt-0.5 h-9 w-9 flex items-center justify-center bg-[#1E2C9A]/8 text-[#1E2C9A] rounded-sm border border-[#1E2C9A]/15 group-hover:bg-[#1E2C9A] group-hover:text-white transition">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-[#1E2C9A]">
                      {cat.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {cat.short}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
