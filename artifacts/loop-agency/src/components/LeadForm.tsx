/**
 * LeadForm: qualifying lead form used on the Brand Inspection page and the
 * pricing pages. Posts to /api/lead (netlify/functions/lead.mjs), which stores
 * the submission in Netlify Forms under the "lead" form.
 */
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent, whatsappLink } from "@/lib/track";

type Props = {
  /** where the lead came from, e.g. "fahs", "asaar-huwiya" */
  source: string;
  /** default service for this page */
  service: string;
  submitLabel?: string;
  /** hide the budget question (the inspection has a fixed price) */
  hideBudget?: boolean;
};

const SECTORS = [
  "مطاعم وكافيهات",
  "عقار وتطوير",
  "تجارة إلكترونية ومتاجر",
  "عيادات وصحة وجمال",
  "تعليم وتدريب",
  "شركة ناشئة / تقنية",
  "خدمات للشركات",
  "غير ذلك",
];

const BUDGETS = [
  "أقل من 5,000 ريال",
  "5,000 إلى 15,000 ريال",
  "15,000 إلى 40,000 ريال",
  "أكثر من 40,000 ريال",
  "ما حددت بعد",
];

const SA_PHONE = /^(?:\+?966|00966|0)?5\d{8}$/;

type Errors = Partial<Record<"name" | "phone" | "business" | "sector", string>>;

const inputCls =
  "w-full bg-background border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all";

export default function LeadForm({ source, service, submitLabel = "أرسل الطلب", hideBudget }: Props) {
  const [data, setData] = useState({
    name: "",
    phone: "",
    business: "",
    link: "",
    sector: "",
    budget: "",
    message: "",
    _honey: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setData((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!data.name.trim()) errs.name = "اكتب اسمك";
    const phone = data.phone.replace(/[\s-]/g, "");
    if (!SA_PHONE.test(phone)) errs.phone = "اكتب رقم جوال سعودي صحيح يبدأ بـ 05";
    if (!data.business.trim()) errs.business = "اكتب اسم النشاط";
    if (!data.sector) errs.sector = "اختر القطاع";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone, service, source }),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("success");
      trackEvent("generate_lead", { lead_source: source, service });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const waText = `هلا وبر، أنا ${data.name} من ${data.business}. عبّيت طلب "${service}" في الموقع وحاب أكمل معكم.`;
    return (
      <div className="text-center py-10 px-4">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-display font-black text-foreground mb-2">وصل طلبك</h3>
        <p className="text-foreground/65 mb-8 leading-relaxed">
          بنتواصل معك على الواتساب خلال يوم عمل. ولو مستعجل، اضغط الزر وكمّل معنا الحين.
        </p>
        <a
          href={whatsappLink(waText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { lead_source: `${source}-after-form` })}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-2xl px-6 py-4 transition-all font-bold"
        >
          كمّل على الواتساب
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4">
      <input
        type="text"
        name="website"
        value={data._honey}
        onChange={set("_honey")}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", clip: "rect(0 0 0 0)", pointerEvents: "none" }}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="الاسم" required error={errors.name}>
          <input className={`${inputCls} ${errors.name ? "border-red-500" : "border-border"}`} placeholder="اسمك" value={data.name} onChange={set("name")} disabled={status === "submitting"} />
        </Field>
        <Field label="رقم الجوال" required error={errors.phone}>
          <input type="tel" dir="ltr" className={`${inputCls} en ${errors.phone ? "border-red-500" : "border-border"}`} placeholder="05XXXXXXXX" value={data.phone} onChange={set("phone")} disabled={status === "submitting"} />
        </Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="اسم النشاط" required error={errors.business}>
          <input className={`${inputCls} ${errors.business ? "border-red-500" : "border-border"}`} placeholder="مثلاً: كافيه ريحان" value={data.business} onChange={set("business")} disabled={status === "submitting"} />
        </Field>
        <Field label="حساب الإنستقرام أو الموقع">
          <input dir="ltr" className={`${inputCls} en border-border`} placeholder="@yourbrand" value={data.link} onChange={set("link")} disabled={status === "submitting"} />
        </Field>
      </div>
      <div className={`grid gap-4 ${hideBudget ? "" : "md:grid-cols-2"}`}>
        <Field label="القطاع" required error={errors.sector}>
          <select className={`${inputCls} appearance-none cursor-pointer ${errors.sector ? "border-red-500" : "border-border"} ${!data.sector ? "text-foreground/40" : ""}`} value={data.sector} onChange={set("sector")} disabled={status === "submitting"}>
            <option value="" disabled>اختر القطاع</option>
            {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        {!hideBudget && (
          <Field label="الميزانية التقريبية">
            <select className={`${inputCls} appearance-none cursor-pointer border-border ${!data.budget ? "text-foreground/40" : ""}`} value={data.budget} onChange={set("budget")} disabled={status === "submitting"}>
              <option value="" disabled>اختر الميزانية</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        )}
      </div>
      <Field label="وش تحتاج بالضبط؟ (اختياري)">
        <textarea rows={3} className={`${inputCls} border-border resize-none`} placeholder="قول لنا باختصار وين تحس المشكلة" value={data.message} onChange={set("message")} disabled={status === "submitting"} />
      </Field>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center">صار خطأ في الإرسال. جرّب مرة ثانية أو راسلنا على الواتساب.</p>
      )}
      <Button type="submit" disabled={status === "submitting"} className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-base font-bold gap-3">
        {status === "submitting" ? <><Loader2 className="w-5 h-5 animate-spin" /> جاري الإرسال...</> : <><Send className="w-5 h-5" /> {submitLabel}</>}
      </Button>
      <p className="text-xs text-foreground/40 text-center">نستخدم رقمك للتواصل معك بخصوص طلبك فقط.</p>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-foreground/70 mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {error && <span className="block text-red-500 text-xs mt-1">{error}</span>}
    </label>
  );
}
