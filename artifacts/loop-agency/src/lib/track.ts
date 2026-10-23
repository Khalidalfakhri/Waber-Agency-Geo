/**
 * Push a GTM dataLayer event. Safe during SSR and before GTM loads.
 * Events used by the lead pages:
 *   generate_lead      a form was submitted successfully (lead_source, service)
 *   whatsapp_click     a WhatsApp button was clicked (lead_source)
 *   pricing_cta_click  a package CTA was clicked on a pricing page (package)
 */
export function trackEvent(event: string, extra?: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: object[]; gtag?: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer ?? [];
    // for GTM triggers
    w.dataLayer.push({ event, ...extra });
    // straight to GA4 (G-HVC4SH5G64), so events count even without a GTM tag
    if (typeof w.gtag === "function") w.gtag("event", event, extra ?? {});
  } catch {
    // analytics must never break the page
  }
}

export const WHATSAPP_NUMBER = "966511830757";

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Set title, description and canonical on client-side navigation. */
export function setPageMeta(meta: { title: string; description: string; canonical: string }) {
  if (typeof document === "undefined" || !document.querySelector) return;
  document.title = meta.title;
  let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link") as HTMLLinkElement;
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = meta.canonical;
  const desc = document.querySelector<HTMLMetaElement>("meta[name='description']");
  if (desc) desc.content = meta.description;
}
