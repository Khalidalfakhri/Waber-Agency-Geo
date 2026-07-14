import { readFileSync, writeFileSync } from "fs";
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
}

// Import the SSR bundle built by vite.ssr.config.ts
const serverBundle = resolve(__dirname, "dist/server/entry-server.js");
const { render } = await import(serverBundle);

// Render the homepage to HTML
const appHtml = render();

// Inject into the client-built index.html
const indexPath = resolve(__dirname, "dist/public/index.html");
const template = readFileSync(indexPath, "utf-8");
const output = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

writeFileSync(indexPath, output, "utf-8");
console.log("Prerender complete: homepage content injected into dist/public/index.html");
