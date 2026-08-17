/**
 * PageLayout — shared nav + footer + contact modal used by all static pages.
 * Import this in each page and wrap content with it.
 */
import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft, CheckCircle2, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// ---------------------------------------------------------------------------
// Contact modal context
// ---------------------------------------------------------------------------
const ContactCtx = createContext<{ open: () => void }>({ open: () => {} });
export const useContact = () => useContext(ContactCtx);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const navLinks = [
  { ar: "أعمالنا",    en: "Work",     href: "/portfolio" },
  { ar: "من نحن",     en: "About",    href: "/about" },
  { ar: "خدماتنا",   en: "Services", href: "/services" },
  { ar: "المدونة",   en: "Blog",     href: "/blog" },
];

// ---------------------------------------------------------------------------
// Contact modal (standalone form, not tied to Home state)
// ---------------------------------------------------------------------------
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "", _honey: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData({ name: "", phone: "", service: "", message: "", _honey: "" });
      setFormErrors({});
      setFormStatus("idle");
    }, 300);
  };

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-border overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-display font-black text-foreground">تواصل معنا</h3>
                <p className="text-sm text-foreground/50 mt-1">سنرد عليك خلال 24 ساعة</p>
              </div>
              <button onClick={handleClose} className="text-foreground/40 hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {formStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-display font-black text-foreground mb-2">وصلت رسالتك!</h4>
                <p className="text-foreground/60 mb-8">سيتواصل معك فريقنا قريباً.</p>
                <a
                  href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-2xl px-6 py-4 transition-all font-bold"
                >
                  <WhatsAppIcon />
                  تواصل عبر واتس آب
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input type="text" name="website" value={formData._honey} onChange={(e) => setFormData((p) => ({ ...p, _honey: e.target.value }))} aria-hidden="true" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} />
                <div className="mb-4">
                  <label className="block text-sm font-bold text-foreground/70 mb-1.5">الاسم <span className="text-accent">*</span></label>
                  <input type="text" placeholder="اسمك الكريم" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all ${formErrors.name ? "border-red-500" : "border-border"}`} disabled={formStatus === "submitting"} />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-foreground/70 mb-1.5">رقم الهاتف <span className="text-accent">*</span></label>
                  <input type="tel" placeholder="05XXXXXXXX" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all en ${formErrors.phone ? "border-red-500" : "border-border"}`} disabled={formStatus === "submitting"} dir="ltr" />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-foreground/70 mb-1.5">الخدمة المطلوبة <span className="text-accent">*</span></label>
                  <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))} className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer ${formErrors.service ? "border-red-500" : "border-border"} ${!formData.service ? "text-foreground/30" : ""}`} disabled={formStatus === "submitting"}>
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
                <div className="mb-6">
                  <label className="block text-sm font-bold text-foreground/70 mb-1.5">رسالتك <span className="text-foreground/30 font-normal">(اختياري)</span></label>
                  <textarea rows={3} placeholder="أخبرنا عن مشروعك أو استفسارك..." value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none" disabled={formStatus === "submitting"} />
                </div>
                {formStatus === "error" && <p className="text-red-500 text-sm mb-4 text-center">حدث خطأ، يرجى المحاولة مجدداً أو التواصل عبر واتس آب.</p>}
                <Button type="submit" disabled={formStatus === "submitting"} className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-base font-bold gap-3 mb-4">
                  {formStatus === "submitting" ? <><Loader2 className="w-5 h-5 animate-spin" /> جارٍ الإرسال...</> : <><Send className="w-5 h-5" /> إرسال الاستفسار</>}
                </Button>
                <a href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl px-6 py-3.5 transition-all font-bold text-sm">
                  <WhatsAppIcon />
                  أو تواصل عبر واتس آب مباشرة
                </a>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// PageLayout
// ---------------------------------------------------------------------------
export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ContactCtx.Provider value={{ open: () => setContactOpen(true) }}>
      <div dir="rtl" className="bg-background text-foreground min-h-screen overflow-x-hidden">
        {/* Nav */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 bg-primary text-primary-foreground ${isScrolled ? "py-3 shadow-lg" : "py-4"}`}>
          <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <img src="/wabar-logo.png" alt="Waber Agency Logo" className="h-12 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105" />
            </Link>
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.ar} href={link.href} className="text-sm font-bold tracking-wide text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {link.ar}
                </Link>
              ))}
            </nav>
            <div className="hidden md:block">
              <Button onClick={() => setContactOpen(true)} className="rounded-full bg-background text-foreground hover:bg-background/90 font-bold px-8 py-6">
                تواصل معنا
              </Button>
            </div>
            <button className="md:hidden text-primary-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-background pt-28 px-6 pb-12 flex flex-col justify-between md:hidden">
              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div key={link.ar} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <Link href={link.href} className="text-4xl font-display font-black" onClick={() => setMobileMenuOpen(false)}>
                      {link.ar}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Button className="rounded-full bg-accent text-accent-foreground w-full font-bold text-lg py-8" onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}>
                تواصل معنا
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="pt-24 pb-12 bg-secondary border-t border-border">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12">
              <div>
                <span className="en text-sm text-accent tracking-widest block mb-4">GET IN TOUCH</span>
                <h2 className="text-5xl md:text-7xl font-display font-black mb-10 text-foreground">هيا<br/>نبدأ معاً</h2>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 text-xl font-bold group" onClick={() => setContactOpen(true)}>
                    ابدأ مشروعك
                    <ArrowLeft className="mr-3 w-6 h-6 transition-transform group-hover:-translate-x-1" />
                  </Button>
                  <a href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white hover:bg-[#20b858] transition-colors h-16 px-10 text-lg font-bold">
                    <WhatsAppIcon />
                    تواصل عبر واتس آب
                  </a>
                </div>
              </div>
              <div className="text-right space-y-4 text-foreground/60 text-xl font-light">
                <p>الرياض، المملكة العربية السعودية</p>
                <a href="mailto:Info@waberagency.com" className="block hover:text-accent transition-colors en">Info@waberagency.com</a>
                <a href="https://wa.me/966511830757" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors en">+966 51 183 0757</a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border/50 gap-6">
              <img src="/wabar-logo.png" alt="Waber Agency" className="h-16 w-auto" />
              <p className="en text-sm text-foreground/40">© {new Date().getFullYear()} Waber Agency. All rights reserved.</p>
              <div className="flex gap-8 en text-sm text-foreground/60 uppercase tracking-widest">
                <a href="https://www.instagram.com/waberagency/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/in/waber-agency-407a31420/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                <a href="https://x.com/Waberagency" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">X / Twitter</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp */}
        <a href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-full shadow-2xl px-6 h-16 transition-all duration-300 hover:scale-105">
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span className="text-base">راسلنا الآن</span>
        </a>

        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ContactCtx.Provider>
  );
}
