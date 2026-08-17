import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageLayout, { useContact } from "@/components/PageLayout";

const PAGE_META = {
  title: "من نحن | About – وبر الإبداعية Waber Creative Agency",
  description: "وبر الإبداعية — وكالة إبداعية من الرياض. نساعد الشركات على بناء هوية قوية وحضور رقمي واضح. 15 سنة خبرة، 2500+ مشروع، 1000+ عميل سعيد.",
  canonical: "https://waberagency.com/about",
};

const stats = [
  { num: "2,500+", ar: "مشروع منجز", en: "Projects" },
  { num: "1,000+", ar: "عميل سعيد", en: "Clients" },
  { num: "15", ar: "سنة خبرة", en: "Years" },
  { num: "40+", ar: "جائزة", en: "Awards" },
];

function AboutContent() {
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
          <span className="en text-sm text-accent tracking-widest block mb-6">ABOUT US / من نحن</span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.2] mb-8"
          >
            من نحن
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl text-primary-foreground/70 max-w-2xl font-light leading-relaxed"
          >
            وكالة إبداعية من الرياض، نبني علامات تجارية تتحدث عن نفسها.
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="en text-sm text-accent tracking-widest block mb-4">02 / من نحن - ABOUT US</span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-display font-bold leading-[1.3] mb-8 text-foreground/90"
              >
                شغوفون بما نصنع، جادّون في النتائج
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-12 max-w-2xl font-light"
              >
                وبر وكالة إبداعية من الرياض. نساعد الشركات على بناء هوية قوية وحضور رقمي واضح. نعمل بشفافية، ونُحقق نتائج ملموسة.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-card p-8 border-t-2 border-accent rounded-2xl"
                >
                  <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
                  <p className="text-foreground/70 leading-relaxed">أن نكون الخيار الأول لكل علامة تجارية تسعى إلى النمو والتأثير.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-card p-8 border-t-2 border-accent rounded-2xl"
                >
                  <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
                  <p className="text-foreground/70 leading-relaxed">تقديم عمل يُحدث فارقاً، بفهم عميق لاحتياجات عملائنا.</p>
                </motion.div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <img src="/about-diriyah.png" alt="Diriyah Architecture" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/85 z-10" />
          <img src="/desert-dunes.png" alt="Desert Dunes" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-20 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-10 gap-y-14 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center px-1"
              >
                <h3 dir="ltr" className="en text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground relative inline-block whitespace-nowrap tabular-nums">
                  {stat.num}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/40" />
                </h3>
                <p className="text-xl md:text-2xl font-bold text-foreground/90 mb-2">{stat.ar}</p>
                <p className="en text-sm text-foreground/50 uppercase tracking-widest">{stat.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-foreground">مستعد للبدء؟</h2>
          <p className="text-lg text-foreground/60 mb-10 max-w-xl mx-auto">تواصل معنا اليوم ونبدأ معاً رحلة بناء علامتك التجارية.</p>
          <Button onClick={openContact} className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 text-xl font-bold">
            تواصل معنا
          </Button>
        </div>
      </section>
    </>
  );
}

export default function About() {
  return (
    <PageLayout>
      <AboutContent />
    </PageLayout>
  );
}
