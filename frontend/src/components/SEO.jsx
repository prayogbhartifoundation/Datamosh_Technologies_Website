import { Helmet } from "react-helmet-async";

const SITE = {
  name: "Datamosh Technologies LLP",
  url: "https://datamosh.tech",
  description:
    "Datamosh Technologies LLP — enterprise cybersecurity, regulatory compliance, AI governance and deep-tech consulting for regulated organisations.",
  ogImage:
    "https://static.prod-images.emergentagent.com/jobs/f919da10-345c-41ef-bb25-f20086af48f9/images/a72618bb39c2ff33e34c3756f7c209378ee744634862a784ad5c60907e42344b.png",
};

/**
 * Per-page SEO + JSON-LD schema.
 *
 * Props:
 *  - title:        page title (auto-suffixed with brand)
 *  - description:  meta description
 *  - path:         current pathname (for canonical/og:url)
 *  - schema:       JSON-LD object or array (optional)
 */
export default function SEO({ title, description, path = "/", schema, image }) {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — Cybersecurity, Compliance & Deep Tech Consulting`;
  const desc = description || SITE.description;
  const url = `${SITE.url}${path}`;
  const og = image || SITE.ogImage;
  const ldArray = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  // Always include an Organization node
  const orgNode = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE.name,
    "url": SITE.url,
    "logo": og,
    "sameAs": ["https://www.linkedin.com/company/datamosh-technologies"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-80-4567-8900",
      "contactType": "customer service",
      "email": "contact@datamosh.tech",
      "areaServed": "Global",
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={og} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(orgNode)}</script>
      {ldArray.map((node, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(node)}</script>
      ))}
    </Helmet>
  );
}

// ---------- schema helpers ----------
export const serviceSchema = ({ name, description, category, url }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "serviceType": category,
  "provider": {
    "@type": "Organization",
    "name": SITE.name,
    "url": SITE.url,
  },
  "url": `${SITE.url}${url}`,
  "areaServed": "Global",
});

export const faqSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
});

export const articleSchema = ({ title, description, author, date, image, url }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "image": image,
  "author": { "@type": "Person", "name": author },
  "publisher": {
    "@type": "Organization",
    "name": SITE.name,
    "logo": { "@type": "ImageObject", "url": SITE.ogImage },
  },
  "datePublished": date,
  "url": `${SITE.url}${url}`,
});

export const breadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((it, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": it.name,
    "item": `${SITE.url}${it.path}`,
  })),
});
