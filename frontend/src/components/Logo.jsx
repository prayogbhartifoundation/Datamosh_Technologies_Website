/**
 * Datamosh inline-SVG logo — uses currentColor so it renders cleanly on
 * any background (no white box, no PNG bleed).
 *
 * Variants:
 *  - mark only:   <Logo variant="mark" />
 *  - wordmark:    <Logo variant="full" />   (header → "DATAMOSH TECHNOLOGIES")
 */
export default function Logo({ variant = "full", className = "" }) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Datamosh"
        className={className}
      >
        <Mark />
      </svg>
    );
  }
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Datamosh Technologies">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 shrink-0">
        <Mark />
      </svg>
      <span className="font-display font-extrabold tracking-tight text-[15px] leading-tight">
        DATAMOSH
        <br />
        <span className="text-[11px] font-semibold tracking-[0.18em] opacity-80">
          TECHNOLOGIES
        </span>
      </span>
    </div>
  );
}

function Mark() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer ring */}
      <circle cx="100" cy="100" r="88" strokeWidth="12" />
      {/* Stylised MW: left hook → peak → valley → peak → right hook */}
      <path
        d="M 52 132 L 52 78 L 78 128 L 100 72 L 122 128 L 148 78 L 148 132"
        strokeWidth="14"
      />
    </g>
  );
}
