import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Loader2, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const PAGE_META = {
  title: "تواصل معنا | Contact – وبر الإبداعية Waber Creative Agency",
  description: "تواصل مع وبر الإبداعية في الرياض. البريد الإلكتروني: Info@waberagency.com — واتس آب: 00966511830757. سنرد عليك خلال 24 ساعة.",
  canonical: "https://waberagency.com/contact",
};

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "", _honey: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; service?: string } = {};
    if (!formData.name.trim()) errors.name = "الاسم مطلوب";
    if (!formData.phone.trim()) errors.phone = "رقم الهاتف مطلوب";
    if (!formData.service) errors.service = "يرجى اختيار الخدمة";
    if (Object.keys(errors).length) { setFormErrors(errors); return; }
    setFormErrors({});
    setFormStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("server error");
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-3xl font-display font-black text-foreground mb-3">وصلت رسالتك!</h3>
        <p className="text-foreground/60 mb-10 text-lg">سيتواصل معك فريقنا خلال 24 ساعة.</p>
        <a
          href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-2xl px-8 py-5 transition-all font-bold text-lg"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          تواصل عبر واتس آب
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <input type="text" name="website" value={formData._honey} onChange={(e) => setFormData((p) => ({ ...p, _honey: e.target.value }))} aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} />

      <div>
        <label className="block text-sm font-bold text-foreground/70 mb-1.5">الاسم <span className="text-accent">*</span></label>
        <input type="text" placeholder="اسمك الكريم" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className={`w-full bg-background border rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-base ${formErrors.name ? "border-red-500" : "border-border"}`} disabled={formStatus === "submitting"} />
        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-foreground/70 mb-1.5">رقم الهاتف <span className="text-accent">*</span></label>
        <input type="tel" placeholder="05XXXXXXXX" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={`w-full bg-background border rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all en text-base ${formErrors.phone ? "border-red-500" : "border-border"}`} disabled={formStatus === "submitting"} dir="ltr" />
        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-foreground/70 mb-1.5">الخدمة المطلوبة <span className="text-accent">*</span></label>
        <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))} className={`w-full bg-background border rounded-xl px-4 py-4 text-foreground outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer text-base ${formErrors.service ? "border-red-500" : "border-border"} ${!formData.service ? "text-foreground/30" : ""}`} disabled={formStatus === "submitting"}>
          <option value="" disabled>اختر الخدمة</option>
          <option value="هوية بصرية">هوية بصرية</option>
          <option value="تسويق رقمي">تسويق رقمي</option>
          <option value="إنتاج مرئي">إنتاج مرئي</option>
          <option value="تصميم مواقع">تصميم مواقع</option>
          <option value="سوشيال ميديا">سوشيال ميديا</option>
          <option value="أخرى">أخرى</option>
        </select>
        {formErrors.service && <p className="text-red-500 text-xs mt-1">{formErrors.service}</p>}
      </div>

      <div>
        <label className="block text-sm font-bold text-foreground/70 mb-1.5">رسالتك <span className="text-foreground/30 font-normal">(اختياري)</span></label>
        <textarea rows={4} placeholder="أخبرنا عن مشروعك أو استفسارك..." value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="w-full bg-background border border-border rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none text-base" disabled={formStatus === "submitting"} />
      </div>

      {formStatus === "error" && <p className="text-red-500 text-sm text-center">حدث خطأ، يرجى المحاولة مجدداً أو التواصل عبر واتس آب.</p>}

      <Button type="submit" disabled={formStatus === "submitting"} className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-base font-bold gap-3">
        {formStatus === "submitting" ? <><Loader2 className="w-5 h-5 animate-spin" /> جارٍ الإرسال...</> : <><Send className="w-5 h-5" /> إرسال الاستفسار</>}
      </Button>

      <a href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl px-6 py-4 transition-all font-bold text-sm">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        أو تواصل عبر واتس آب مباشرة
      </a>
    </form>
  );
}

function ContactContent() {
  useEffect(() => {
    document.title = PAGE_META.title;
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement("link") as HTMLLinkElement; canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = PAGE_META.canonical;
    let metaDesc = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (metaDesc) metaDesc.content = PAGE_META.description;
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12">
          <span className="en text-sm text-accent tracking-widest block mb-6">CONTACT / تواصل معنا</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.2] mb-8"
          >
            تواصل معنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl text-primary-foreground/70 max-w-2xl font-light leading-relaxed"
          >
            سنرد عليك خلال 24 ساعة. يمكنك أيضاً التواصل المباشر عبر واتس آب.
          </motion.p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-10">معلومات التواصل</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">الموقع</p>
                    <p className="text-foreground/60 leading-relaxed">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">البريد الإلكتروني</p>
                    <a href="mailto:Info@waberagency.com" className="text-foreground/60 hover:text-accent transition-colors en">Info@waberagency.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">الهاتف / واتس آب</p>
                    <a href="https://wa.me/966511830757" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors en">+966 51 183 0757</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-border">
                <p className="font-bold text-foreground mb-4">تابعنا</p>
                <div className="flex gap-6 en text-sm text-foreground/60 uppercase tracking-widest">
                  <a href="https://www.instagram.com/waberagency/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
                  <a href="https://www.linkedin.com/in/waber-agency-407a31420/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                  <a href="https://x.com/Waberagency" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">X / Twitter</a>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-display font-black text-foreground mb-2">أرسل استفساراً</h2>
              <p className="text-sm text-foreground/50 mb-8">سنرد عليك خلال 24 ساعة</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Contact() {
  return (
    <PageLayout>
      <ContactContent />
    </PageLayout>
  );
}
