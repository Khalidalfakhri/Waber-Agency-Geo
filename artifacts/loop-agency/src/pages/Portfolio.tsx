import { useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout, { useContact } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

const PAGE_META = {
  title: "أعمالنا | Portfolio – وبر الإبداعية Waber Creative Agency",
  description: "استعرض أعمال وبر الإبداعية: موطن، مواسم، كادن، كامبلي، أرز العائلة، جوتن. هوية بصرية، إنتاج مرئي، وتسويق رقمي للسوق السعودي.",
  canonical: "https://waberagency.com/portfolio",
};

const portfolioProjects = [
  { title: "حملة اليوم الوطني السعودي", client: "هيئة الترفيه", year: "2025", tags: ["إبداعي", "إنتاج"], img: "/work-campaign.png" },
  { title: "إطلاق هوية بصرية لعلامة ناشئة", client: "شركة تقنية سعودية", year: "2025", tags: ["الهوية البصرية"], img: "/work-brand.png" },
  { title: "حملة تسويق رقمي لمنتج استهلاكي", client: "قطاع التجزئة", year: "2024", tags: ["التسويق الرقمي"], img: "/work-digital.png" },
  { title: "تغطية فعالية كبرى", client: "جهة حكومية", year: "2024", tags: ["تنظيم الفعاليات", "إنتاج مرئي"], img: "/work-event.png" },
];

function PortfolioContent() {
  const { open: openContact } = useContact();

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
          <span className="en text-sm text-accent tracking-widest block mb-6">OUR WORK / أعمالنا</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.2] mb-8"
          >
            أعمالنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl text-primary-foreground/70 max-w-2xl font-light leading-relaxed"
          >
            أفكار نطلقها إلى العالم على هيئة قصص تستحق أن تُروى.
          </motion.p>
        </div>
      </section>

      {/* Featured: Mawten */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-12 space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden bg-[#0c0005] border border-white/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0">
                <img src="/clients/mawten-5.jpg" alt="موطن الحرم - مكة المكرمة" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0c0005] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0005] via-transparent to-transparent lg:bg-none" />
              </div>
              <div className="flex flex-col p-8 lg:p-12">
                <div className="mb-8">
                  <span className="en text-xs text-[#c0392b]/80 uppercase tracking-widest border border-[#c0392b]/30 rounded-full px-3 py-1 mb-3 inline-block">2024 – 2025</span>
                  <div className="flex items-center gap-3 mt-3">
                    <img src="/clients/mawten-logo.png" alt="موطن" className="h-10 w-auto rounded-lg" style={{ background: "#1a0008", padding: "4px 8px" }} />
                    <div>
                      <p className="text-foreground/50 text-xs">العميل</p>
                      <p className="font-bold text-foreground">موطن للتطوير العقاري</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-foreground mb-3 leading-snug">هوية بصرية ومحتوى سوشيال ميديا<br/>لشركة عقارية سعودية</h3>
                <p className="text-foreground/60 leading-relaxed mb-6 text-sm">أطلقنا لموطن حملة محتوى شاملة تشمل تصميم المنشورات، والهوية البصرية، وإبراز مشاريعهم السكنية والتجارية في مكة المكرمة والرياض.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["هوية بصرية", "سوشيال ميديا", "تسويق رقمي", "إنتاج مرئي"].map((tag) => (
                    <span key={tag} className="text-xs text-[#c0392b] border border-[#c0392b]/40 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {["/clients/mawten-6.jpg", "/clients/mawten-3.jpg", "/clients/mawten-4.png", "/clients/mawten-8.jpg", "/clients/mawten-1.jpg", "/clients/mawten-2.jpg"].map((src, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img src={src} alt="موطن" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mawasem */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden bg-[#0d1f15] border border-white/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              <div className="flex flex-col p-8 lg:p-12 order-2 lg:order-1">
                <div className="mb-8">
                  <span className="en text-xs text-[#c8a84b]/80 uppercase tracking-widest border border-[#c8a84b]/30 rounded-full px-3 py-1 mb-3 inline-block">2025</span>
                  <div className="flex items-center gap-3 mt-3">
                    <img src="/clients/mawasem-logo-green.jpg" alt="مواسم" className="h-10 w-auto rounded-lg" style={{ background: "#ebe6d3", padding: "4px 10px" }} />
                    <div>
                      <p className="text-[#ebe6d3]/50 text-xs">العميل</p>
                      <p className="font-bold text-[#ebe6d3]">مواسم للهدايا</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-[#ebe6d3] mb-3 leading-snug">هوية بصرية وبراند جايدلاين<br/>لعلامة هدايا سعودية فاخرة</h3>
                <p className="text-[#ebe6d3]/60 leading-relaxed mb-6 text-sm">صممنا لمواسم هوية بصرية متكاملة تمزج بين الموروث الثقافي والحداثة — شعار مستوحى من الهندسة الأرابيسكية، لوحة ألوان تعكس الأناقة والدفء.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["هوية بصرية", "براند جايدلاين", "تصميم شعار", "نظام بصري"].map((tag) => (
                    <span key={tag} className="text-xs text-[#c8a84b] border border-[#c8a84b]/40 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {["/clients/mawasem-logo-green.jpg", "/clients/mawasem-logo-beige.jpg", "/clients/mawasem-logo-v-green.jpg"].map((src, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img src={src} alt="مواسم" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 order-1 lg:order-2">
                <img src="/clients/mawasem-logo-beige.jpg" alt="مواسم" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f15] via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Kaden */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden bg-[#071a19] border border-white/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0">
                <img src="/clients/kaden-1.png" alt="كادن" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#071a19] via-transparent to-transparent" />
              </div>
              <div className="flex flex-col p-8 lg:p-12">
                <div className="mb-8">
                  <span className="en text-xs text-[#2eccc4]/80 uppercase tracking-widest border border-[#2eccc4]/30 rounded-full px-3 py-1 mb-3 inline-block">2025</span>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-10 px-4 rounded-lg flex items-center justify-center bg-[#2eccc4]/10 border border-[#2eccc4]/20">
                      <span className="en text-[#2eccc4] font-black tracking-widest text-lg">KADEN</span>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">العميل</p>
                      <p className="font-bold text-white">كادن للتطوير العقاري</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 leading-snug">هوية بصرية لمطوّر عقاري<br/>يصنع مدناً داخل المدن</h3>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">طوّرنا لكادن منظومة بصرية تعكس طموحها في تشكيل مستقبل التطوير العقاري بالمملكة — هوية راسخة تجمع بين الحداثة والقيم السعودية.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["هوية بصرية", "براند جايدلاين", "تصميم شعار", "محتوى إبداعي"].map((tag) => (
                    <span key={tag} className="text-xs text-[#2eccc4] border border-[#2eccc4]/40 rounded-full px-3 py-1">{tag}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {["/clients/kaden-2.png", "/clients/kaden-3.png", "/clients/kaden-4.png"].map((src, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white/5">
                      <img src={src} alt="كادن" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Jotun — full-width */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden relative min-h-[600px]"
          >
            <video src="/clients/jotun-video.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            <div className="relative z-10 h-full min-h-[600px] flex flex-col justify-end p-8 lg:p-14">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-[2px] bg-[#c8a84b]" />
                <span className="text-[#c8a84b] text-sm font-semibold tracking-widest">٤٠ عاماً في المملكة — ١٩٨٥ ← ٢٠٢٥</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-black text-white mb-4 leading-tight">فيديو الذكرى السنوية الأربعين<br/><span className="text-[#1D7C4F]">لجوتن السعودية</span></h3>
              <div className="flex flex-wrap gap-2">
                {["إنتاج فيديو", "سينما موشن", "هوية الحدث", "محتوى احتفالي"].map((tag) => (
                  <span key={tag} className="text-xs text-[#1D7C4F] border border-[#1D7C4F]/60 rounded-full px-3 py-1 bg-black/20">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden bg-card cursor-pointer rounded-3xl"
              >
                <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="en text-xs text-foreground/70 uppercase tracking-widest border border-foreground/30 rounded-full px-3 py-1 bg-background/40 backdrop-blur-sm">{project.year}</span>
                    <span className="text-sm text-foreground/70">{project.client}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-accent border border-accent/40 rounded-full px-3 py-1">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground">هل أنت مستعد لمشروعك القادم؟</h2>
          <p className="text-lg text-foreground/60 mb-10 max-w-xl mx-auto">تواصل معنا وسنبني لك قصة تستحق أن تُروى.</p>
          <Button onClick={openContact} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 text-xl font-bold">
            ابدأ مشروعك
          </Button>
        </div>
      </section>
    </>
  );
}

export default function Portfolio() {
  return (
    <PageLayout>
      <PortfolioContent />
    </PageLayout>
  );
}
