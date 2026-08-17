import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Provide minimal browser-globals so framer-motion and similar libs
// can import without throwing in a Node.js SSR context.
if (typeof window === "undefined") {
  const noop = () => {};
  const noopClass = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  global.window = {
    addEventListener: noop,
    removeEventListener: noop,
    scrollY: 0,
    pageYOffset: 0,
    innerWidth: 1280,
    innerHeight: 768,
    matchMedia: () => ({
      matches: false,
      addListener: noop,
      removeListener: noop,
      addEventListener: noop,
      removeEventListener: noop,
    }),
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: clearTimeout,
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    ResizeObserver: noopClass,
    IntersectionObserver: noopClass,
    MutationObserver: noopClass,
  };

  global.document = {
    documentElement: {
      style: {},
      lang: "ar",
      dir: "rtl",
      classList: { add: noop, remove: noop, contains: () => false },
    },
    body: {
      style: {},
      classList: { add: noop, remove: noop, contains: () => false },
    },
    createElement: () => ({ style: {}, setAttribute: noop }),
    getElementById: () => null,
    addEventListener: noop,
    removeEventListener: noop,
    head: { appendChild: noop },
    createElementNS: () => ({ setAttribute: noop, appendChild: noop }),
  };

  try {
    Object.defineProperty(global, "navigator", {
      value: { userAgent: "Node.js SSR" },
      writable: true,
      configurable: true,
    });
  } catch (_) {}
  global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
  global.cancelAnimationFrame = clearTimeout;

  // Wouter reads location.pathname via useSyncExternalStore during SSR.
  // Provide a mutable stub that is updated per-route before each render.
  global.location = {
    pathname: "/",
    search: "",
    hash: "",
    href: "https://waberagency.com/",
    origin: "https://waberagency.com",
  };
}

// Import the SSR bundle built by vite.ssr.config.ts
const serverBundle = resolve(__dirname, "dist/server/entry-server.js");
const { render } = await import(serverBundle);

const BASE_URL = "https://waberagency.com";

// ---------------------------------------------------------------------------
// Static route definitions — add new routes here to include them in sitemap
// and prerender.
// ---------------------------------------------------------------------------
const STATIC_ROUTES = [
  {
    url: "/",
    outFile: "index.html",
    title: "وبر الإبداعية | Waber Creative Agency – Riyadh, Saudi Arabia",
    description: "وبر الإبداعية — أفضل وكالة تسويق وهوية بصرية في الرياض، المملكة العربية السعودية. نقدم: هوية بصرية، تسويق رقمي، إنتاج مرئي، تصميم مواقع، وإدارة السوشيال ميديا.",
    ogTitle: "وبر الإبداعية | Waber Creative Agency – الرياض",
    ogDescription: "نصنع علامات تجارية تُلهم من قلب الرياض — هوية بصرية، تسويق رقمي، إنتاج مرئي. Creative agency in Riyadh, KSA.",
  },
  {
    url: "/services",
    outFile: "services/index.html",
    title: "خدماتنا | Services – وبر الإبداعية Waber Creative Agency",
    description: "خدمات وبر الإبداعية: هوية بصرية، تسويق رقمي، إدارة السوشيال ميديا، إنتاج مرئي، تصميم مواقع وتطبيقات، وتنظيم فعاليات — مصممة خصيصاً للسوق السعودي.",
    ogTitle: "خدماتنا | Waber Agency Services – الرياض",
    ogDescription: "ست خدمات إبداعية متكاملة للسوق السعودي: هوية بصرية، تسويق رقمي، إنتاج مرئي والمزيد.",
  },
  {
    url: "/about",
    outFile: "about/index.html",
    title: "من نحن | About – وبر الإبداعية Waber Creative Agency",
    description: "وبر الإبداعية — وكالة إبداعية من الرياض. نساعد الشركات على بناء هوية قوية وحضور رقمي واضح. 15 سنة خبرة، 2500+ مشروع، 1000+ عميل سعيد.",
    ogTitle: "من نحن | About Waber Agency – الرياض",
    ogDescription: "وبر الإبداعية: وكالة إبداعية من الرياض، شغوفون بما نصنع، جادّون في النتائج.",
  },
  {
    url: "/contact",
    outFile: "contact/index.html",
    title: "تواصل معنا | Contact – وبر الإبداعية Waber Creative Agency",
    description: "تواصل مع وبر الإبداعية في الرياض. البريد الإلكتروني: Info@waberagency.com — واتس آب: 00966511830757. سنرد عليك خلال 24 ساعة.",
    ogTitle: "تواصل معنا | Contact Waber Agency – الرياض",
    ogDescription: "تواصل مع وبر الإبداعية في الرياض. سنرد عليك خلال 24 ساعة.",
  },
  {
    url: "/portfolio",
    outFile: "portfolio/index.html",
    title: "أعمالنا | Portfolio – وبر الإبداعية Waber Creative Agency",
    description: "استعرض أعمال وبر الإبداعية: موطن، مواسم، كادن، كامبلي، أرز العائلة، جوتن. هوية بصرية، إنتاج مرئي، وتسويق رقمي للسوق السعودي.",
    ogTitle: "أعمالنا | Waber Agency Portfolio – الرياض",
    ogDescription: "أعمال وبر الإبداعية: هوية بصرية، إنتاج مرئي وتسويق رقمي لكبرى العلامات السعودية.",
  },
];

// ---------------------------------------------------------------------------
// Read the built index.html template once
// ---------------------------------------------------------------------------
const indexPath = resolve(__dirname, "dist/public/index.html");
const template = readFileSync(indexPath, "utf-8");

// ---------------------------------------------------------------------------
// Helper: inject SSR content + per-route meta into the template
// ---------------------------------------------------------------------------
function buildHtml(route, appHtml) {
  const canonical = `${BASE_URL}${route.url}`;

  return template
    // SSR content
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    // Title
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    // Description
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${route.description}"`
    )
    // Canonical
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${canonical}"`
    )
    // OG title
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${route.ogTitle}"`
    )
    // OG description
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${route.ogDescription}"`
    )
    // OG URL
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonical}"`
    )
    // Twitter title
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${route.ogTitle}"`
    )
    // Twitter description
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${route.ogDescription}"`
    );
}

// ---------------------------------------------------------------------------
// Render each route and write its HTML file
// ---------------------------------------------------------------------------
for (const route of STATIC_ROUTES) {
  // Update the location stub so wouter reads the correct pathname during SSR.
  if (global.location) {
    global.location.pathname = route.url;
    global.location.href = `https://waberagency.com${route.url}`;
  }

  const appHtml = render(route.url);
  const html = buildHtml(route, appHtml);

  const outPath = resolve(__dirname, "dist/public", route.outFile);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf-8");
  console.log(`Prerendered: ${route.url} → dist/public/${route.outFile}`);
}

console.log(`\nPrerender complete: ${STATIC_ROUTES.length} static pages generated.`);
