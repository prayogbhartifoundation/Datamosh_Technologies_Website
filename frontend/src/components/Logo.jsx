import { COMPANY } from "@/data/site";

/**
 * Datamosh logo — renders the brand PNG with CSS blend modes so it sits
 * transparently on any background.
 *
 * Variants:
 *  - "light" → use on white / pale backgrounds  (multiply removes white bg)
 *  - "dark"  → use on dark navy / charcoal      (invert + screen flips colour)
 *  - "mark"  → small SVG-only ring mark (currentColor)
 */
export default function Logo({ variant = "light", className = "h-12 w-auto" }) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Datamosh"
        className={className}
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="100" cy="100" r="88" strokeWidth="12" />
          <path
            d="M 52 132 L 52 78 L 78 128 L 100 72 L 122 128 L 148 78 L 148 132"
            strokeWidth="14"
          />
        </g>
      </svg>
    );
  }

  const style =
    variant === "dark"
      ? { filter: "invert(1) brightness(2) contrast(1.05)", mixBlendMode: "screen" }
      : { mixBlendMode: "multiply" };

  return (
    <img
      src={COMPANY.logo}
      alt="Datamosh Technologies LLP"
      className={className}
      style={style}
      decoding="async"
      loading="eager"
    />
  );
}

