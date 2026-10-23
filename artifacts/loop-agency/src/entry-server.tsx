import { renderToString } from "react-dom/server";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Fahs, { FAHS_META, FAHS_FAQ } from "./pages/Fahs";
import PricingHub, { HUB_META } from "./pages/PricingHub";
import PricingPage from "./pages/PricingPage";
import { pricingPages, pricingBySlug } from "./data/pricing";
import { INSPECTION } from "./data/offers";

const SITE = "https://wabermarketing.com";

export function render(url: string = "/"): string {
  if (url === INSPECTION.slug) return renderToString(<Fahs />);
  if (url === "/asaar") return renderToString(<PricingHub />);
  const pricing = pricingBySlug(url);
  if (pricing) return renderToString(<PricingPage page={pricing} />);

  switch (url) {
    case "/services":
      return renderToString(<Services />);
    case "/about":
      return renderToString(<About />);
    case "/contact":
      return renderToString(<Contact />);
    case "/portfolio":
      return renderToString(<Portfolio />);
    default:
      return renderToString(<Home />);
  }
}

// ---------------------------------------------------------------------------
// Lead-page routes for prerender.mjs: meta + page-specific JSON-LD.
// Keeping this next to the data means a price change updates the schema too.
// ---------------------------------------------------------------------------
const provider = { "@type": "ProfessionalService", name: "وبر الإبداعية | Waber Creative Agency", url: SITE, areaServed: "SA" };

const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const crumbs = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${path}` })),
});

export type ExtraRoute = {
  url: string;
  outFile: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  jsonLd: object[];
};

export const extraRoutes: ExtraRoute[] = [
  {
    url: INSPECTION.slug,
    outFile: `${INSPECTION.slug.slice(1)}/index.html`,
    title: FAHS_META.title,
    description: FAHS_META.description,
    ogTitle: "الفحص الدوري للعلامة | وبر الإبداعية",
    ogDescription: FAHS_META.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: INSPECTION.name,
        serviceType: "Brand audit",
        description: FAHS_META.description,
        provider,
        offers: { "@type": "Offer", price: INSPECTION.price, priceCurrency: "SAR", url: FAHS_META.canonical },
      },
      faqLd(FAHS_FAQ),
      crumbs([["الرئيسية", "/"], [INSPECTION.name, INSPECTION.slug]]),
    ],
  },
  {
    url: "/asaar",
    outFile: "asaar/index.html",
    title: HUB_META.title,
    description: HUB_META.description,
    ogTitle: "أسعار وبر الإبداعية | الرياض",
    ogDescription: HUB_META.description,
    jsonLd: [crumbs([["الرئيسية", "/"], ["الأسعار", "/asaar"]])],
  },
  ...pricingPages.map((p) => ({
    url: p.slug,
    outFile: `${p.slug.slice(1)}/index.html`,
    title: p.title,
    description: p.description,
    ogTitle: p.h1,
    ogDescription: p.description,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: p.service,
        description: p.quickAnswer,
        provider,
        areaServed: { "@type": "City", name: "Riyadh" },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "SAR",
          lowPrice: p.minPrice,
          highPrice: p.maxPrice,
          offerCount: p.packages.length,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `باقات ${p.service}`,
          itemListElement: p.packages.map((k) => ({
            "@type": "Offer",
            name: k.name,
            price: k.from,
            priceCurrency: "SAR",
            description: k.items.join("، "),
          })),
        },
      },
      faqLd(p.faq),
      crumbs([["الرئيسية", "/"], ["الأسعار", "/asaar"], [p.service, p.slug]]),
    ],
  })),
];
