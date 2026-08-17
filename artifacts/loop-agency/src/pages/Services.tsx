import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Camera, PenTool, LayoutGrid, Megaphone, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout, { useContact } from "@/components/PageLayout";

const PAGE_META = {
  title: "خدماتنا | Services – وبر الإبداعية Waber Creative Agency",
  description: "خدمات وبر الإبداعية: هوية بصرية، تسويق رقمي، إدارة السوشيال ميديا، إنتاج مرئي، تصميم مواقع وتطبيقات، وتنظيم فعاليات — مصممة خصيصاً للسوق السعودي.",
  canonical: "https://waberagency.com/services",
};

const services = [
  { ar: "الهوية البصرية", en: "Brand Identity", desc: "نصمم لك هوية بصرية واضحة وثابتة تميزك عن المنافسين وتبقى في ذهن عميلك.", icon: <LayoutGrid className="w-6 h-6" /> },
  { ar: "التسويق الرقمي", en: "Digital Marketing", desc: "حملات تسويقية مدروسة تُوصل رسالتك إلى الجمهور المناسب، في الوقت المناسب.", icon: <Megaphone className="w-6 h-6" /> },
  { ar: "إدارة التواصل الاجتماعي", en: "Social Media Management", desc: "ندير قنواتك بمحتوى يجذب التفاعل ويبني ولاءً حقيقياً لعلامتك التجارية.", icon: <Globe className="w-6 h-6" /> },
  { ar: "الإنتاج المرئي", en: "Video Production", desc: "نصور محتوى يلفت الأنظار ويحكي قصة علامتك بصدق واحتراف.", icon: <Camera className="w-6 h-6" /> },
  { ar: "تصميم المواقع والتطبيقات", en: "Web & App Design", desc: "نصمم مواقع وتطبيقات سهلة الاستخدام وجميلة المظهر تخدم أهدافك.", icon: <PenTool className="w-6 h-6" /> },
  { ar: "تنظيم الفعاليات", en: "Events", desc: "ننظم فعاليات لا تُنسى تترك أثراً حقيقياً في ذهن كل حاضر.", icon: <CheckCircle2 className="w-6 h-6" /> },
];

const faqItems = [
  { q: "ما الخدمات التي تقدمها وبر الإبداعية؟", a: "نقدم ستة خدمات رئيسية: الهوية البصرية، التسويق الرقمي، إدارة السوشيال ميديا، الإنتاج المرئي، تصميم المواقع والتطبيقات، وتنظيم الفعاليات — كل ذلك مصمم خصيصاً للسوق السعودي." },
  { q: "كيف أبدأ مشروعاً مع وبر الإبداعية؟", a: "تواصل معنا عبر واتس آب أو البريد الإلكتروني وسيتواصل معك فريقنا خلال 24 ساعة لمناقشة مشروعك وتحديد أفضل الحلول التسويقية المناسبة لأهدافك وميزانيتك." },
  { q: "هل تعمل وبر الإبداعية مع الشركات الصغيرة والمتوسطة؟", a: "نعم، نعمل مع الشركات بجميع أحجامها — من رواد الأعمال والشركات الناشئة في الرياض إلى المؤسسات الكبرى. نصمم حلولاً تسويقية تناسب ميزانيتك وطموحاتك." },
  { q: "هل تقدم وبر الإبداعية تقارير أداء شهرية؟", a: "نعم، نُقدم تقارير شهرية مفصّلة تشمل جميع مؤشرات الأداء الرئيسية (KPIs) لكل خدمة، مع توصيات واضحة لتحسين النتائج وزيادة العائد على الاستثمار." },
];

function ServicesContent() {
  const { open: openContact } = useContact();
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
          <span className="en text-sm text-accent tracking-widest block mb-6">SERVICES / خدماتنا</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.2] mb-8"
          >
            خدماتنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl text-primary-foreground/70 max-w-2xl font-light leading-relaxed"
          >
            ست خدمات متكاملة، مصممة خصيصاً للسوق السعودي.
          </motion.p>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="border-t border-border">
            {services.map((service, idx) => {
              const isActive = activeService === idx;
              return (
                <div key={idx} className="border-b border-border">
                  <button
                    onClick={() => setActiveService(isActive ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-6 py-8 text-right group"
                  >
                    <span className="en text-sm text-foreground/40 tabular-nums w-12 shrink-0">{String(idx + 1).padStart(3, "0")}</span>
                    <div className="flex-1 flex items-center gap-4">
                      <span className="text-accent">{service.icon}</span>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                        {service.ar}
                      </h2>
                    </div>
                    <Plus className={`w-6 h-6 shrink-0 text-foreground/60 transition-transform duration-300 ${isActive ? "rotate-45 text-accent" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pr-16 max-w-2xl">
                          <p className="en text-xs text-foreground/40 mb-3 uppercase tracking-wider">{service.en}</p>
                          <p className="text-foreground/70 leading-relaxed text-lg">{service.desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="en text-sm text-accent tracking-widest block mb-4">FAQ</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-foreground">الأسئلة الشائعة</h2>
          </div>
          <div className="border-t border-border max-w-4xl">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-border">
                  <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-6 py-7 text-right group">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors flex-1">{item.q}</h3>
                    <Plus className={`w-5 h-5 shrink-0 text-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="pb-8 text-foreground/65 leading-relaxed text-base max-w-2xl">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-16">
            <Button onClick={openContact} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 text-xl font-bold">
              ابدأ مشروعك الآن
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Services() {
  return (
    <PageLayout>
      <ServicesContent />
    </PageLayout>
  );
}
