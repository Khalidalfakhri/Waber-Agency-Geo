// Lead capture for the Brand Inspection page and the pricing pages.
// Submissions are forwarded to Netlify Forms ("lead"), which stores them in the
// Netlify dashboard and sends email notifications (set them up under
// Site configuration > Forms > Form notifications).
export default async (req) => {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let data;
  try { data = await req.json(); } catch { return json({ error: "Invalid request" }, 400); }

  const clean = (v, max = 500) => String(v ?? "").trim().slice(0, max);
  const { _honey } = data || {};
  if (_honey) return json({ success: true }); // bot: silently accept

  const name = clean(data.name, 120);
  const phone = clean(data.phone, 20).replace(/[\s-]/g, "");
  const business = clean(data.business, 160);
  const sector = clean(data.sector, 80);

  if (!name || !business || !sector || !/^(?:\+?966|00966|0)?5\d{8}$/.test(phone)) {
    return json({ error: "الاسم والجوال واسم النشاط والقطاع مطلوبة" }, 400);
  }

  const body = new URLSearchParams({
    "form-name": "lead",
    name,
    phone,
    business,
    link: clean(data.link, 200),
    sector,
    budget: clean(data.budget, 80),
    service: clean(data.service, 120),
    source: clean(data.source, 60),
    message: clean(data.message, 2000),
  });

  const origin = new URL(req.url).origin;
  const res = await fetch(`${origin}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    console.error("Netlify Forms lead submission failed", res.status);
    return json({ error: "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى" }, 500);
  }
  return json({ success: true });
};

export const config = { path: "/api/lead" };
