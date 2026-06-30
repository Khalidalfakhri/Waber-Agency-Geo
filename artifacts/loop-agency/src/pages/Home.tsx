import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X, Play, Globe, Camera, PenTool, LayoutGrid, Megaphone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { ar: "أعمالنا", en: "Work", href: "#work" },
  { ar: "خدماتنا", en: "Services", href: "#services" },
  { ar: "عن لوب", en: "Agency", href: "#agency" },
  { ar: "تواصل", en: "Contact", href: "#contact" },
];

const tickerItems = [
  { ar: "الهوية البصرية", en: "Brand Identity" },
  { ar: "التسويق الرقمي", en: "Digital Marketing" },
  { ar: "إنتاج سينمائي", en: "Cinematic Production" },
  { ar: "تصميم المواقع", en: "Web Design" },
];

const services = [
  {
    ar: "الهوية البصرية",
    en: "Brand Identity",
    desc: "نبني هويات بصرية راسخة وأنظمة بصرية تُعرّف قادة الصناعة وتميّزهم.",
    icon: <LayoutGrid className="w-6 h-6" />,
  },
  {
    ar: "التسويق الرقمي",
    en: "Digital Marketing",
    desc: "حملات تسويقية مدفوعة بالبيانات، تستحوذ على الانتباه وتحوّل الجمهور بمقياس واسع.",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    ar: "تصميم المواقع",
    en: "Web & App Design",
    desc: "تجارب رقمية غامرة مصممة للأداء العالي والتفوق الجمالي.",
    icon: <PenTool className="w-6 h-6" />,
  },
  {
    ar: "الإنتاج السينمائي",
    en: "Creative Production",
    desc: "تصوير سينمائي وإنتاج فيديو يرفع المستوى البصري لعلامتك التجارية.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    ar: "إنتاج المحتوى",
    en: "Content Creation",
    desc: "محتوى أصيل يروي قصة علامتك ويبني علاقة حقيقية مع جمهورك.",
    icon: <Globe className="w-6 h-6" />,
  },
];

const projects = [
  {
    ar: "أورا ريزيدنس",
    en: "Brand Identity & Strategy",
    img: "/work-brand.png",
    aspect: "aspect-[4/3]",
  },
  {
    ar: "منصة فولت",
    en: "Web & App Design",
    img: "/work-digital.png",
    aspect: "aspect-[3/4]",
  },
  {
    ar: "نوفا ستوديوز",
    en: "Digital Marketing",
    img: "/work-campaign.png",
    aspect: "aspect-square",
  },
  {
    ar: "أبيكس للتطوير",
    en: "Interior & Architecture",
    img: "/work-4.png",
    aspect: "aspect-[4/3]",
  },
];

const steps = [
  {
    num: "01",
    ar: "الاكتشاف والتحليل",
    en: "Discovery & Audit",
    desc: "نفكك وضعك الراهن للوصول إلى الحقيقة الجوهرية لعلامتك التجارية لضمان تأثير حقيقي.",
  },
  {
    num: "02",
    ar: "الرؤية الاستراتيجية",
    en: "Strategic Vision",
    desc: "نهندس مكانة فريدة في السوق لا يمكن لأي منافس تكرارها بناءً على رؤية واضحة.",
  },
  {
    num: "03",
    ar: "التنفيذ المتقن",
    en: "Flawless Execution",
    desc: "نُجسّد الرؤية عبر نقاط الاتصال الرقمية والمادية والتجريبية كافة بدقة متناهية.",
  },
];

const clients = ["أورا", "فولت", "نوفا", "واحة", "لومينا", "زينيث", "أبيكس", "هورايزن"];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div dir="rtl" className="bg-background text-foreground min-h-screen overflow-x-hidden">
      
      {/* 1. Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled ? "bg-background/90 backdrop-blur-xl border-border py-4" : "bg-transparent py-6"
        }`}
        data-testid="navbar"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" data-testid="link-home">
            <div className="bg-[#f0ede4] rounded-full px-4 py-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img src="/loop-logo.jpeg" alt="Loop Agency Logo" className="h-6 w-auto mix-blend-multiply" />
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.ar}
                href={link.href}
                className="text-sm font-bold tracking-wide text-foreground/70 hover:text-foreground transition-colors"
                data-testid={`link-${link.en.toLowerCase()}`}
              >
                {link.ar}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              data-testid="button-start-project"
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-bold px-8 py-6"
            >
              ابدأ مشروعك
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-28 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  key={link.ar}
                  href={link.href}
                  className="text-4xl font-display font-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.ar}
                </motion.a>
              ))}
            </nav>
            <Button className="rounded-none bg-primary text-primary-foreground w-full font-bold text-lg py-8">
              ابدأ مشروعك
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="section-hero">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-background/60 bg-gradient-to-b from-transparent to-background z-10" />
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
        </motion.div>

        <div className="container relative z-20 mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col justify-center min-h-screen">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full flex justify-end mb-8">
            <span className="en text-xs uppercase tracking-widest text-foreground/50 border border-foreground/20 px-3 py-1 rounded-full">
              CREATIVE AGENCY — KSA
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl lg:text-[130px] font-display font-black leading-[1.1] mb-6 text-foreground"
              data-testid="hero-headline"
            >
              صانعو
              <br />
              المستحيل
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl text-foreground/80 max-w-2xl font-light mb-3 leading-relaxed"
            >
              وكالة إبداعية سعودية نحول الرؤى إلى تجارب لا تُنسى
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="en text-sm text-foreground/50 mb-12 max-w-xl"
            >
              A Saudi creative agency transforming visions into unforgettable experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <Button
                data-testid="button-view-work"
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-lg font-bold group"
              >
                <ArrowLeft className="ml-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                استعرض أعمالنا
              </Button>
              <button data-testid="button-showreel" className="flex items-center gap-4 text-base font-bold hover:text-accent transition-colors group">
                <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Play className="w-5 h-5 mr-1" fill="currentColor" />
                </div>
                <span>شاهد الشوريل</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-8 flex flex-col items-center gap-2 text-xs text-foreground/50 en tracking-widest"
          >
            <div className="w-px h-16 bg-gradient-to-b from-foreground/40 to-transparent" />
            <span style={{ writingMode: "vertical-rl" }}>SCROLL</span>
          </motion.div>
        </div>
      </section>

      {/* 3. Ticker Bar */}
      <div className="w-full bg-secondary border-y border-border py-4 overflow-hidden relative flex items-center">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              {tickerItems.map((item, j) => (
                <div key={j} className="flex items-center">
                  <span className="text-foreground/80 font-bold text-lg px-6">{item.ar}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mx-2" />
                  <span className="en text-foreground/50 text-sm px-6 uppercase tracking-wider">{item.en}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mx-2" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Manifesto / Agency */}
      <section id="agency" className="py-32 bg-background border-b border-border" data-testid="section-agency">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="en text-sm text-accent tracking-widest block mb-4">01 / عن الوكالة</span>
            </div>
            <div className="lg:col-span-8">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-display font-bold leading-relaxed mb-16 text-foreground/90"
              >
                لا نؤمن بالاندماج في الضجيج. لوب وُجدت لترفع العلامات التجارية السعودية إلى معايير عالمية عبر استراتيجية لا تهادن، وتصميم يستفز الحواس.
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-border/50">
                {[
                  { num: "10+", ar: "سنوات خبرة" },
                  { num: "50+", ar: "علامة تجارية" },
                  { num: "12", ar: "جائزة دولية" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="en text-5xl font-bold mb-2 text-foreground">{stat.num}</h3>
                    <p className="text-foreground/60 text-lg">{stat.ar}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Selected Work */}
      <section id="work" className="py-32 bg-background border-b border-border" data-testid="section-work">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="en text-sm text-accent tracking-widest block mb-4">02 / Selected Work</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-foreground">أعمالنا</h2>
            </div>
            <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground hover:text-background h-14 px-8 text-lg hidden md:inline-flex group">
              عرض الكل
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`group cursor-pointer ${idx % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className={`overflow-hidden mb-6 relative bg-card ${project.aspect}`}>
                  <img src={project.img} alt={project.ar} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-display font-bold mb-2">{project.ar}</h3>
                    <p className="en text-sm text-foreground/50">{project.en}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowUpRight className="w-5 h-5 -rotate-90" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Services Grid */}
      <section id="services" className="py-32 bg-secondary" data-testid="section-services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
            <span className="en text-sm text-accent tracking-widest block mb-4">03 / Services</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-foreground">الخدمات</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-10 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 border border-transparent hover:border-foreground/10"
              >
                <div className="text-accent mb-8">{service.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-2 text-foreground">{service.ar}</h3>
                <p className="en text-xs text-foreground/40 mb-6 uppercase tracking-wider">{service.en}</p>
                <p className="text-foreground/70 leading-relaxed text-base">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Production Feature */}
      <section className="relative py-40 flex items-center overflow-hidden" data-testid="section-production">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <img src="/production.png" alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="container relative z-20 mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            <span className="en text-sm text-accent tracking-widest block mb-6">CINEMATIC PRODUCTION</span>
            <h2 className="text-5xl md:text-8xl font-display font-black mb-8">إنتاج يرتقي بالمعايير</h2>
            <p className="en text-lg text-foreground/70 mb-12 max-w-xl">
              Industry-leading cinema cameras delivering visual fidelity that separates premium brands from the noise.
            </p>
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-12 text-lg font-bold">
              شاهد الأعمال السينمائية
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 8. Approach */}
      <section className="py-32 bg-background border-y border-border" data-testid="section-approach">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="en text-sm text-accent tracking-widest block mb-4">04 / Approach</span>
              <h2 className="text-5xl md:text-7xl font-display font-black mb-16">منهجيتنا</h2>
              
              <div className="flex flex-col gap-12">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-6 border-b border-border/50 pb-8 last:border-0"
                  >
                    <span className="en text-2xl font-light text-foreground/30 mt-1">{step.num}</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{step.ar}</h3>
                      <p className="en text-xs text-accent mb-4 tracking-wider uppercase">{step.en}</p>
                      <p className="text-foreground/70 leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative h-[600px] hidden lg:block"
            >
              <img src="/approach-bg.png" alt="" className="w-full h-full object-cover grayscale opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Clients Marquee */}
      <section className="py-24 bg-background overflow-hidden flex items-center border-b border-border">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {clients.map((client, j) => (
                <span key={j} className="text-6xl md:text-8xl font-display font-black text-transparent" style={{ WebkitTextStroke: "1px rgba(240, 237, 228, 0.2)" }}>
                  {client}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Footer / CTA */}
      <footer id="contact" className="pt-32 pb-12 bg-secondary" data-testid="section-footer">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
            <div>
              <h2 className="text-6xl md:text-9xl font-display font-black mb-8 text-foreground">مستعد<br/>للتميز؟</h2>
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-12 text-lg font-bold group">
                تواصل معنا
                <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Button>
            </div>
            <div className="en text-right space-y-4 text-foreground/60 text-lg">
              <p>Riyadh, Saudi Arabia</p>
              <p>hello@loopagency.sa</p>
              <p>+966 50 000 0000</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 gap-6">
            <div className="bg-[#f0ede4] rounded-full px-4 py-2">
              <img src="/loop-logo.jpeg" alt="Loop" className="h-5 w-auto mix-blend-multiply" />
            </div>
            <p className="en text-sm text-foreground/40">
              © {new Date().getFullYear()} Loop Creative Agency. All rights reserved.
            </p>
            <div className="flex gap-6 en text-sm text-foreground/60">
              <a href="#" className="hover:text-foreground">Instagram</a>
              <a href="#" className="hover:text-foreground">LinkedIn</a>
              <a href="#" className="hover:text-foreground">Behance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}