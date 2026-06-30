import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, Menu, X, Play, Globe, Camera, PenTool, LayoutGrid, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { ar: "أعمالنا", en: "Work", href: "#work" },
  { ar: "خدماتنا", en: "Services", href: "#services" },
  { ar: "عن لوب", en: "Agency", href: "#agency" },
  { ar: "تواصل", en: "Contact", href: "#contact" },
];

const services = [
  {
    ar: "الهوية البصرية والاستراتيجية",
    en: "Brand Identity & Strategy",
    desc_ar: "نبني هويات بصرية راسخة وأنظمة بصرية تُعرّف قادة الصناعة وتميّزهم.",
    desc_en: "Foundational narratives and visual systems that define industry leaders.",
    icon: <LayoutGrid className="w-6 h-6" />,
  },
  {
    ar: "التسويق الرقمي والتواصل الاجتماعي",
    en: "Digital Marketing & Social Media",
    desc_ar: "حملات تسويقية مدفوعة بالبيانات، تستحوذ على الانتباه وتحوّل الجمهور بمقياس واسع.",
    desc_en: "Data-driven campaigns that capture attention and convert audiences at scale.",
    icon: <Megaphone className="w-6 h-6" />,
  },
  {
    ar: "تصميم المواقع والتطبيقات",
    en: "Web & App Design",
    desc_ar: "تجارب رقمية غامرة مصممة للأداء العالي والتفوق الجمالي.",
    desc_en: "Immersive digital experiences engineered for performance and aesthetic dominance.",
    icon: <PenTool className="w-6 h-6" />,
  },
  {
    ar: "الإنتاج الإبداعي",
    en: "Creative Production",
    desc_ar: "تصوير سينمائي وإنتاج فيديو يرفع المستوى البصري لعلامتك التجارية.",
    desc_en: "Cinematic photography and video production that elevates your visual standard.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    ar: "إنتاج المحتوى",
    en: "Content Creation",
    desc_ar: "محتوى أصيل يروي قصة علامتك ويبني علاقة حقيقية مع جمهورك.",
    desc_en: "Authentic content that tells your story and builds genuine audience connections.",
    icon: <Globe className="w-6 h-6" />,
  },
];

const projects = [
  {
    ar: "أورا ريزيدنس",
    en: "Aura Residence",
    cat_ar: "الهوية البصرية والاستراتيجية",
    cat_en: "Brand Identity & Strategy",
    img: "/work-brand.png",
    aspect: "aspect-[4/3]",
  },
  {
    ar: "منصة فولت",
    en: "Vault Platform",
    cat_ar: "تصميم المواقع والتطبيقات",
    cat_en: "Web & App Design",
    img: "/work-digital.png",
    aspect: "aspect-[3/4]",
  },
  {
    ar: "نوفا ستوديوز",
    en: "Nova Studios",
    cat_ar: "التسويق الرقمي",
    cat_en: "Digital Marketing",
    img: "/work-campaign.png",
    aspect: "aspect-square",
  },
];

const steps = [
  {
    num: "٠١",
    ar: "الاكتشاف والتحليل",
    en: "Discovery & Audit",
    desc_ar: "نفكك وضعك الراهن للوصول إلى الحقيقة الجوهرية لعلامتك التجارية.",
    desc_en: "We deconstruct your current positioning to uncover the core truth of your brand.",
  },
  {
    num: "٠٢",
    ar: "الرؤية الاستراتيجية",
    en: "Strategic Vision",
    desc_ar: "نهندس مكانة فريدة في السوق لا يمكن لأي منافس تكرارها.",
    desc_en: "Architecting a unique market position that competitors cannot replicate.",
  },
  {
    num: "٠٣",
    ar: "التنفيذ المتقن",
    en: "Flawless Execution",
    desc_ar: "نُجسّد الرؤية عبر نقاط الاتصال الرقمية والمادية والتجريبية كافة.",
    desc_en: "Bringing the vision to life across digital, physical, and experiential touchpoints.",
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
    <div dir="rtl" className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-border py-4"
            : "bg-transparent py-6"
        }`}
        data-testid="navbar"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo — right side in RTL */}
          <a href="#" className="flex items-center gap-3 group" data-testid="link-home">
            <div className="overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img
                src="/loop-logo.jpeg"
                alt="Loop Agency Logo"
                className="h-9 w-auto"
              />
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.ar}
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-${link.en.toLowerCase()}`}
              >
                {link.ar}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              data-testid="button-start-project"
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/85 uppercase tracking-widest font-bold text-xs px-8 py-6 en-label"
            >
              ابدأ مشروعك
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
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
            <Button className="rounded-none bg-primary text-primary-foreground w-full font-bold text-sm py-8">
              ابدأ مشروعك
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        data-testid="section-hero"
      >
        {/* Background texture — subtle warm gradient */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-[#f0ede0] via-background to-[#e8e3cc] opacity-80" />
          {/* Decorative large circle echo of the logo's pill shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vw] rounded-full border border-foreground/8 opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[40vw] rounded-full border border-foreground/5 opacity-30" />
          <div className="absolute top-[20%] right-[10%] w-48 h-48 rounded-full border border-foreground/10 opacity-50" />
          <div className="absolute bottom-[15%] left-[8%] w-24 h-24 rounded-full border border-foreground/10 opacity-50" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 pt-28 pb-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="en-label text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-6">
                Creative Agency — Saudi Arabia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black leading-[0.9] mb-6 text-foreground"
              data-testid="hero-headline"
            >
              تجاوز
              <br />
              <span className="text-foreground/25">المألوف</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light mb-3 leading-relaxed"
            >
              وكالة إبداعية سعودية متكاملة، نصنع هويات بصرية وتجارب رقمية وإنتاجاً سينمائياً يستحيل تجاهله.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="en-label text-sm text-muted-foreground/60 mb-12"
            >
              A Saudi creative powerhouse — brand identities, digital experiences, cinematic production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <Button
                data-testid="button-view-work"
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/85 h-14 px-10 text-base font-bold group"
              >
                <ArrowLeft className="ml-3 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                استعرض أعمالنا
              </Button>
              <button
                data-testid="button-showreel"
                className="flex items-center gap-4 text-sm font-bold hover:text-foreground/60 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:border-foreground transition-colors">
                  <Play className="w-4 h-4 mr-0.5" fill="currentColor" />
                </div>
                <span>شاهد الشوريل</span>
              </button>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-24 pt-10 border-t border-border grid grid-cols-3 md:grid-cols-3 gap-8 max-w-2xl"
          >
            {[
              { num: "+١٠", ar: "سنوات خبرة", en: "Years Experience" },
              { num: "+٥٠", ar: "علامة تجارية", en: "Brands Elevated" },
              { num: "١٢", ar: "جائزة دولية", en: "Awards" },
            ].map((stat, i) => (
              <div key={i} data-testid={`stat-${i}`}>
                <h3 className="text-3xl md:text-4xl font-display font-black mb-1">{stat.num}</h3>
                <p className="text-sm text-foreground/70 mb-0.5">{stat.ar}</p>
                <p className="en-label text-xs text-muted-foreground/50">{stat.en}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-8 flex flex-col items-center gap-2 text-xs text-muted-foreground en-label tracking-widest"
        >
          <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
          <span style={{ writingMode: "vertical-rl" }}>SCROLL</span>
        </motion.div>
      </section>

      {/* Manifesto / Agency Section */}
      <section id="agency" className="py-28 md:py-40 border-t border-border" data-testid="section-agency">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <span className="en-label text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-4">01 / The Agency</span>
              <h2 className="text-3xl md:text-5xl font-display font-black leading-tight">
                صُنعنا
                <br />
                للجريئين
              </h2>
              <p className="en-label text-sm text-muted-foreground mt-3">Built for the bold.</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-2xl md:text-3xl leading-snug font-light text-foreground/85 mb-12">
                  لا نؤمن بالاندماج في الضجيج. في سوق مشبع، التشابه فشل في الخيال. لوب وُجدت لترفع العلامات التجارية السعودية إلى معايير عالمية عبر استراتيجية لا تهادن، وتصميم يستفز الحواس، وتنفيذ سينمائي لا مثيل له.
                </p>
                <p className="en-label text-base text-muted-foreground font-light border-r-2 border-border pr-6">
                  We don't do subtle. Blending in is a failure of imagination. Loop elevates Saudi brands to global standards through uncompromising strategy, visceral design, and cinematic execution.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-28 border-t border-border" data-testid="section-work">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="en-label text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-4">02 / Selected Work</span>
              <h2 className="text-4xl md:text-6xl font-display font-black leading-none">دراسات الحالة</h2>
              <p className="en-label text-sm text-muted-foreground mt-2">Case Studies</p>
            </div>
            <Button
              data-testid="button-all-work"
              variant="outline"
              className="rounded-none border-foreground text-foreground hover:bg-primary hover:text-primary-foreground h-12 px-8 text-sm font-bold hidden md:inline-flex"
            >
              عرض كل الأعمال
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`group cursor-pointer ${idx === 1 ? "md:mt-20" : ""}`}
                data-testid={`card-project-${idx}`}
              >
                <div className={`overflow-hidden mb-5 relative bg-muted ${project.aspect}`}>
                  <img
                    src={project.img}
                    alt={project.ar}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 group-hover:opacity-60 transition-opacity">
                      {project.ar}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm">{project.cat_ar}</p>
                    <p className="en-label text-xs text-muted-foreground/50 mt-0.5">{project.cat_en}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center rotate-45 group-hover:rotate-0 group-hover:border-foreground transition-all duration-300 mt-1">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Button className="w-full rounded-none bg-primary text-primary-foreground h-14 font-bold">
              عرض كل الأعمال
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 border-t border-border bg-card" data-testid="section-services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="en-label text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-4">03 / Services</span>
              <h2 className="text-4xl md:text-6xl font-display font-black leading-none">قدراتنا</h2>
              <p className="en-label text-sm text-muted-foreground mt-2">Capabilities</p>
            </div>
            <p className="text-muted-foreground max-w-xs text-base font-light leading-relaxed">
              حلول إبداعية شاملة مصممة للتفوق في المشهد الرقمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                className="bg-card p-10 group hover:bg-accent transition-colors duration-400"
                data-testid={`card-service-${idx}`}
              >
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-8 text-foreground group-hover:border-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-1">{service.ar}</h3>
                <p className="en-label text-xs text-muted-foreground/60 mb-4">{service.en}</p>
                <p className="text-muted-foreground leading-relaxed text-base font-light mb-6">
                  {service.desc_ar}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-xs font-bold tracking-widest text-foreground/50 hover:text-foreground transition-colors en-label"
                >
                  <ChevronLeft className="ml-1 w-4 h-4" /> Explore
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed Production Break */}
      <section className="py-32 relative min-h-[70vh] flex items-center border-t border-border overflow-hidden" data-testid="section-production">
        {/* Warm geometric background */}
        <div className="absolute inset-0 z-0 bg-[#ede9d8]">
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, #d4c99a 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c9c09a 0%, transparent 50%)"
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, hsl(45 25% 75% / 0.15) 79px, hsl(45 25% 75% / 0.15) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, hsl(45 25% 75% / 0.15) 79px, hsl(45 25% 75% / 0.15) 80px)"
            }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="en-label text-xs uppercase tracking-[0.25em] text-foreground/50 block mb-8">Cinematic Production</span>
            <h2 className="text-5xl md:text-7xl font-display font-black leading-none mb-6">
              الإنتاج
              <br />
              السينمائي
            </h2>
            <p className="text-xl text-foreground/70 font-light mb-4 max-w-md leading-relaxed">
              نصوّر بكاميرات السينما الاحترافية لنقدم دقة بصرية تُميّز العلامات المتميزة عن الضجيج.
            </p>
            <p className="en-label text-sm text-foreground/45 mb-10">
              We shoot on industry-leading cinema cameras to deliver visual fidelity that separates premium brands from the noise.
            </p>
            <Button
              data-testid="button-production-reel"
              variant="outline"
              className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background h-14 px-8 text-sm font-bold"
            >
              شاهد شريل الإنتاج
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-28 border-t border-border" data-testid="section-approach">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="en-label text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-4">04 / Approach</span>
              <h2 className="text-4xl md:text-5xl font-display font-black leading-tight mb-3">
                الدقة تلتقي
                <br />
                بالجرأة
              </h2>
              <p className="en-label text-sm text-muted-foreground mb-12">Precision meets provocation.</p>

              <div className="space-y-12">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className="flex gap-8 group"
                    data-testid={`step-${i}`}
                  >
                    <span className="text-2xl font-display font-black text-foreground/15 group-hover:text-foreground/40 transition-colors pt-1 shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-xl md:text-2xl font-display font-bold mb-1">{step.ar}</h4>
                      <p className="en-label text-xs text-muted-foreground mb-3">{step.en}</p>
                      <p className="text-muted-foreground font-light leading-relaxed">{step.desc_ar}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative visual panel — logo-inspired shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="w-full aspect-square bg-[#ede9d8] relative overflow-hidden">
                {/* Large pill shape echoing the logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[30%] rounded-full border-4 border-foreground/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[40%] rounded-full border border-foreground/10" />
                {/* Circle (the O in logo) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[20%] w-[22%] aspect-square rounded-full border-4 border-foreground/20" />
                <div className="absolute bottom-10 left-10 text-xs en-label text-foreground/30 tracking-widest uppercase">
                  Loop Creative Agency
                </div>
                <div className="absolute top-10 right-10 text-xs en-label text-foreground/30 tracking-widest uppercase">
                  Est. 2015
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <section className="py-20 border-t border-border overflow-hidden" data-testid="section-clients">
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <span className="en-label text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-3">05 / Partners</span>
          <h2 className="text-3xl md:text-4xl font-display font-black">يثق بنا أصحاب الرؤية</h2>
          <p className="en-label text-sm text-muted-foreground mt-2">Trusted by visionaries.</p>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />

          <div className="py-6 animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24">
            {[...clients, ...clients].map((client, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-display font-black text-foreground/10 hover:text-foreground/40 transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="pt-28 pb-12 border-t border-border bg-card" data-testid="section-footer">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mb-28">
            <span className="en-label text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-6">06 / Contact</span>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-black leading-none mb-4">
              مستعد
              <br />
              للتميّز؟
            </h2>
            <p className="en-label text-sm text-muted-foreground mb-10">Ready to stand out?</p>
            <Button
              data-testid="button-start-conversation"
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/85 h-14 px-10 text-base font-bold group"
            >
              <ArrowLeft className="ml-3 w-4 h-4 transition-transform group-hover:-translate-x-1" />
              ابدأ المحادثة
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-border">
            <div className="col-span-1 md:col-span-2">
              <div className="inline-block mb-6">
                <img
                  src="/loop-logo.jpeg"
                  alt="Loop Agency Logo"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-muted-foreground max-w-sm font-light leading-relaxed">
                وكالة إبداعية متميزة مقرها الرياض، المملكة العربية السعودية — نهندس علامات تقود السوق.
              </p>
              <p className="en-label text-xs text-muted-foreground/50 mt-2">
                A premium creative agency based in Riyadh, KSA.
              </p>
            </div>

            <div>
              <h5 className="font-display font-bold text-sm mb-6 text-foreground">تواصل معنا</h5>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@loopcreative.sa" className="text-muted-foreground hover:text-foreground transition-colors font-light text-sm en-label" data-testid="link-email">
                    hello@loopcreative.sa
                  </a>
                </li>
                <li>
                  <a href="tel:+966501234567" className="text-muted-foreground hover:text-foreground transition-colors font-light text-sm en-label" data-testid="link-phone">
                    +966 50 123 4567
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground font-light text-sm">الرياض، المملكة العربية السعودية</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-display font-bold text-sm mb-6 text-foreground">تابعنا</h5>
              <ul className="space-y-4">
                {["Instagram", "Twitter / X", "LinkedIn", "Behance"].map((s) => (
                  <li key={s}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light text-sm en-label" data-testid={`link-${s.toLowerCase().replace(/\s|\//g, "-")}`}>
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground en-label tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Loop Creative Agency</p>
            <p className="mt-4 md:mt-0">All Rights Reserved — جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
