// Replaces the Replit Express /api/contact route.
// Submissions are forwarded to Netlify Forms ("contact"), which stores them
// in the Netlify dashboard and sends email notifications.
export default async (req) => {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let data;
  try { data = await req.json(); } catch { return json({ error: "Invalid request" }, 400); }

  const { name, phone, service, message, _honey } = data || {};
  if (_honey) return json({ success: true }); // bot: silently accept
  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    return json({ error: "الاسم والهاتف والخدمة مطلوبة" }, 400);
  }

  const body = new URLSearchParams({
    "form-name": "contact",
    name: name.trim(),
    phone: phone.trim(),
    service: service.trim(),
    message: (message || "").trim(),
  });

  const origin = new URL(req.url).origin;
  const res = await fetch(`${origin}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    console.error("Netlify Forms submission failed", res.status);
    return json({ error: "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى" }, 500);
  }
  return json({ success: true });
};

export const config = { path: "/api/contact" };
