import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X, Play, Globe, Camera, PenTool, LayoutGrid, Megaphone, CheckCircle2, Plus, Clock, BookOpen, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getLatestPosts } from "@/data/blog";

const navLinks = [
  { ar: "أعمالنا", en: "Work", href: "#work" },
  { ar: "من نحن", en: "About", href: "#about" },
  { ar: "خدماتنا", en: "Services", href: "#services" },
  { ar: "عملاؤنا", en: "Clients", href: "#clients" },
  { ar: "المدونة", en: "Blog", href: "/blog" },
];

const faqItems = [
  {
    q: "ما الخدمات التي تقدمها وبر الإبداعية؟",
    a: "نقدم ستة خدمات رئيسية: الهوية البصرية، التسويق الرقمي، إدارة السوشيال ميديا، الإنتاج المرئي، تصميم المواقع والتطبيقات، وتنظيم الفعاليات — كل ذلك مصمم خصيصاً للسوق السعودي.",
  },
  {
    q: "كيف أبدأ مشروعاً مع وبر الإبداعية؟",
    a: "تواصل معنا عبر واتس آب أو البريد الإلكتروني وسيتواصل معك فريقنا خلال 24 ساعة لمناقشة مشروعك وتحديد أفضل الحلول التسويقية المناسبة لأهدافك وميزانيتك.",
  },
  {
    q: "هل تعمل وبر الإبداعية مع الشركات الصغيرة والمتوسطة؟",
    a: "نعم، نعمل مع الشركات بجميع أحجامها — من رواد الأعمال والشركات الناشئة في الرياض إلى المؤسسات الكبرى. نصمم حلولاً تسويقية تناسب ميزانيتك وطموحاتك.",
  },
  {
    q: "ما الفرق بين وكالة التسويق ووكالة الإعلان؟",
    a: "وكالة الإعلان تركز على شراء مساحات إعلانية وإنتاج مواد ترويجية. وبر الإبداعية كوكالة تسويق شاملة تتبنى استراتيجية متكاملة تشمل الهوية البصرية والمحتوى والحملات الرقمية والبيانات — كل شيء تحت سقف واحد.",
  },
  {
    q: "هل تقدم وبر الإبداعية تقارير أداء شهرية؟",
    a: "نعم، نُقدم تقارير شهرية مفصّلة تشمل جميع مؤشرات الأداء الرئيسية (KPIs) لكل خدمة، مع توصيات واضحة لتحسين النتائج وزيادة العائد على الاستثمار.",
  },
  {
    q: "ما المنطقة الجغرافية التي تخدمها وبر الإبداعية؟",
    a: "مقرّنا الرياض، ونخدم العملاء في جميع مناطق المملكة العربية السعودية — الرياض، جدة، الدمام، المدينة المنورة — فضلاً عن إمكانية العمل مع عملاء خليجيين ودوليين.",
  },
];

const heroTags = [
  "إبداع يصنع الأثر",
  "قصص تُروى بإتقان",
  "هوية تدوم",
  "نتائج تُقاس وتُرى",
];

const portfolioProjects = [
  { title: "حملة اليوم الوطني السعودي", client: "هيئة الترفيه", year: "2025", tags: ["إبداعي", "إنتاج"], img: "/work-campaign.png" },
  { title: "إطلاق هوية بصرية لعلامة ناشئة", client: "شركة تقنية سعودية", year: "2025", tags: ["الهوية البصرية"], img: "/work-brand.png" },
  { title: "حملة تسويق رقمي لمنتج استهلاكي", client: "قطاع التجزئة", year: "2024", tags: ["التسويق الرقمي"], img: "/work-digital.png" },
  { title: "تغطية فعالية كبرى", client: "جهة حكومية", year: "2024", tags: ["تنظيم الفعاليات", "إنتاج مرئي"], img: "/work-event.png" },
];

const tickerItems = [
  { ar: "الهوية البصرية", en: "Brand Identity" },
  { ar: "التسويق الرقمي", en: "Digital Marketing" },
  { ar: "الإنتاج السينمائي", en: "Cinematic Production" },
  { ar: "تصميم المواقع", en: "Web Design" },
  { ar: "إدارة التواصل", en: "Social Media" },
];

const services = [
  { ar: "الهوية البصرية", en: "Brand Identity", desc: "نصمم لك هوية بصرية واضحة وثابتة تميزك عن المنافسين وتبقى في ذهن عميلك.", icon: <LayoutGrid className="w-6 h-6" /> },
  { ar: "التسويق الرقمي", en: "Digital Marketing", desc: "حملات تسويقية مدروسة تُوصل رسالتك إلى الجمهور المناسب، في الوقت المناسب.", icon: <Megaphone className="w-6 h-6" /> },
  { ar: "إدارة التواصل الاجتماعي", en: "Social Media Management", desc: "ندير قنواتك بمحتوى يجذب التفاعل ويبني ولاءً حقيقياً لعلامتك التجارية.", icon: <Globe className="w-6 h-6" /> },
  { ar: "الإنتاج المرئي", en: "Video Production", desc: "نصور محتوى يلفت الأنظار ويحكي قصة علامتك بصدق واحتراف.", icon: <Camera className="w-6 h-6" /> },
  { ar: "تصميم المواقع والتطبيقات", en: "Web & App Design", desc: "نصمم مواقع وتطبيقات سهلة الاستخدام وجميلة المظهر تخدم أهدافك.", icon: <PenTool className="w-6 h-6" /> },
  { ar: "تنظيم الفعاليات", en: "Events", desc: "ننظم فعاليات لا تُنسى تترك أثراً حقيقياً في ذهن كل حاضر.", icon: <CheckCircle2 className="w-6 h-6" /> },
];

const clients = ["أرامكو", "stc", "الراجحي", "نيوم", "البنك الأهلي", "موبايلي", "أكوا باور", "صندوق الاستثمارات", "موطن", "مواسم", "كادن", "كامبلي", "أرز العائلة", "جوتن"];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "", _honey: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleContactClose = () => {
    setContactOpen(false);
    setTimeout(() => {
      setFormData({ name: "", phone: "", service: "", message: "", _honey: "" });
      setFormErrors({});
      setFormStatus("idle");
    }, 300);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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
  const latestPosts = getLatestPosts(3);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTag((prev) => (prev + 1) % heroTags.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div dir="rtl" className="bg-background text-foreground min-h-screen overflow-x-hidden">
      
      {/* 1. Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 bg-primary text-primary-foreground ${
          isScrolled ? "py-3 shadow-lg" : "py-4"
        }`}
        data-testid="navbar"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center group" data-testid="link-home">
            <img
              src="/wabar-logo.png"
              alt="Waber Agency Logo"
              className="h-12 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.ar}
                href={link.href}
                className="text-sm font-bold tracking-wide text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                data-testid={`link-${link.en.toLowerCase()}`}
              >
                {link.ar}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              data-testid="button-start-project"
              onClick={() => setContactOpen(true)}
              className="rounded-full bg-background text-foreground hover:bg-background/90 font-bold px-8 py-6"
            >
              تواصل معنا
            </Button>
          </div>

          <button
            className="md:hidden text-primary-foreground"
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
                  data-testid={`link-mobile-${link.en.toLowerCase()}`}
                >
                  {link.ar}
                </motion.a>
              ))}
            </nav>
            <Button className="rounded-full bg-accent text-accent-foreground w-full font-bold text-lg py-8" data-testid="button-contact-mobile" onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}>
              تواصل معنا
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="section-hero">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-background/70 bg-gradient-to-t from-background via-background/40 to-background/70 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/hero-riyadh.png"
          >
            <source src="/api/storage/public-objects/agency/showreel.mp4" type="video/mp4" />
            <img src="/hero-riyadh.png" alt="Riyadh Skyline" className="w-full h-full object-cover" />
          </video>
        </motion.div>

        <div className="container relative z-20 mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col justify-center min-h-screen">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full flex justify-end mb-8">
            <div className="border border-foreground/20 px-4 py-2 rounded-full overflow-hidden h-9 flex items-center" data-testid="hero-rotating-tag">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTag}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs md:text-sm font-bold text-foreground/70 whitespace-nowrap"
                >
                  {heroTags[activeTag]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[1.4] mb-8 text-foreground"
              data-testid="hero-headline"
            >
              نغوص في عُمقِ الفكرة،
              <br />
              ونصنع علاماتٍ تجاريةً <span className="text-accent">تُلهم</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-3xl text-foreground/80 max-w-2xl font-light mb-3 leading-relaxed"
            >
              من الرياض — نبني علامات تجارية تتحدث عن نفسها.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="en text-sm text-foreground/50 mb-12 max-w-xl"
            >
              From Riyadh — we build brands that speak for themselves.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <Button
                data-testid="button-contact-hero"
                onClick={() => setContactOpen(true)}
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-10 text-lg font-bold group"
              >
                <ArrowLeft className="ml-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                تواصل معنا
              </Button>
              <button
                data-testid="button-showreel"
                onClick={() => setShowreelOpen(true)}
                className="flex items-center gap-4 text-base font-bold hover:text-accent transition-colors group"
              >
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
      <div className="w-full bg-secondary border-y border-border py-6 overflow-hidden relative flex items-center">
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              {tickerItems.map((item, j) => (
                <div key={j} className="flex items-center">
                  <span className="text-foreground/80 font-bold text-xl px-8">{item.ar}</span>
                  <span className="w-2 h-2 rounded-full bg-accent mx-2" />
                  <span className="en text-foreground/50 text-sm px-8 uppercase tracking-widest">{item.en}</span>
                  <span className="w-2 h-2 rounded-full bg-accent mx-2" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Portfolio / Work */}
      <section id="work" className="py-32 bg-background border-b border-border" data-testid="section-work">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 max-w-3xl">
            <span className="en text-sm text-accent tracking-widest block mb-4">01 / أعمالنا - OUR WORK</span>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-foreground">
              صنعنا الأثر
            </h2>
            <p className="text-xl text-foreground/80 leading-relaxed font-light mb-2">
              أفكار نطلقها إلى العالم على هيئة قصص تستحق أن تُروى.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed font-light">
              نشارككم هنا بعضاً من أعمالنا التي صُممت بإبداع، ونُفّذت باحترافية، وتركت أثراً حقيقياً لدى عملائنا.
            </p>
          </div>

          {/* ── Featured Client: Mawten ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 rounded-3xl overflow-hidden bg-[#0c0005] border border-white/5"
            data-testid="portfolio-card-mawten"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              {/* Left: hero image */}
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0">
                <img
                  src="/clients/mawten-5.jpg"
                  alt="موطن الحرم - مكة المكرمة"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0c0005] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0005] via-transparent to-transparent lg:bg-none" />
              </div>

              {/* Right: content + design grid */}
              <div className="flex flex-col p-8 lg:p-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="en text-xs text-[#c0392b]/80 uppercase tracking-widest border border-[#c0392b]/30 rounded-full px-3 py-1 mb-3 inline-block">
                      2024 – 2025
                    </span>
                    <div className="flex items-center gap-3 mt-3">
                      <img
                        src="/clients/mawten-logo.png"
                        alt="موطن"
                        className="h-10 w-auto rounded-lg"
                        style={{ background: "#1a0008", padding: "4px 8px" }}
                      />
                      <div>
                        <p className="text-foreground/50 text-xs">العميل</p>
                        <p className="font-bold text-foreground">موطن للتطوير العقاري</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-foreground mb-3 leading-snug">
                  هوية بصرية ومحتوى سوشيال ميديا<br/>لشركة عقارية سعودية
                </h3>
                <p className="text-foreground/60 leading-relaxed mb-6 text-sm">
                  أطلقنا لموطن حملة محتوى شاملة تشمل تصميم المنشورات، والهوية البصرية، وإبراز مشاريعهم السكنية والتجارية في مكة المكرمة والرياض — بصياغة بصرية تعكس مكانة العلامة واحترافيتها.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["هوية بصرية", "سوشيال ميديا", "تسويق رقمي", "إنتاج مرئي"].map((tag) => (
                    <span key={tag} className="text-xs text-[#c0392b] border border-[#c0392b]/40 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Design samples grid */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {[
                    { src: "/clients/mawten-6.jpg", alt: "مكة المكرمة - قدسية المكان" },
                    { src: "/clients/mawten-3.jpg", alt: "التطوير يبدأ من رؤية" },
                    { src: "/clients/mawten-4.png", alt: "موقع يرتقي بقيمة الاستثمار" },
                    { src: "/clients/mawten-8.jpg", alt: "خدمات إدارة الممتلكات" },
                    { src: "/clients/mawten-1.jpg", alt: "هيلتون جاردن إن" },
                    { src: "/clients/mawten-2.jpg", alt: "بنية تحتية بمعايير عالية" },
                  ].map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Featured Client: Mawasem ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 rounded-3xl overflow-hidden bg-[#0d1f15] border border-white/5"
            data-testid="portfolio-card-mawasem"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              {/* Left: content + design grid */}
              <div className="flex flex-col p-8 lg:p-12 order-2 lg:order-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="en text-xs text-[#c8a84b]/80 uppercase tracking-widest border border-[#c8a84b]/30 rounded-full px-3 py-1 mb-3 inline-block">
                      2025
                    </span>
                    <div className="flex items-center gap-3 mt-3">
                      <img
                        src="/clients/mawasem-logo-green.jpg"
                        alt="مواسم"
                        className="h-10 w-auto rounded-lg"
                        style={{ background: "#ebe6d3", padding: "4px 10px" }}
                      />
                      <div>
                        <p className="text-[#ebe6d3]/50 text-xs">العميل</p>
                        <p className="font-bold text-[#ebe6d3]">مواسم للهدايا</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-[#ebe6d3] mb-3 leading-snug">
                  هوية بصرية وبراند جايدلاين<br/>لعلامة هدايا سعودية فاخرة
                </h3>
                <p className="text-[#ebe6d3]/60 leading-relaxed mb-6 text-sm">
                  صممنا لمواسم هوية بصرية متكاملة تمزج بين الموروث الثقافي والحداثة — شعار مستوحى من الهندسة الأرابيسكية، لوحة ألوان تعكس الأناقة والدفء، وبراند جايدلاين شامل يضمن تماسك العلامة عبر كل نقطة تواصل مع العميل.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["هوية بصرية", "براند جايدلاين", "تصميم شعار", "نظام بصري"].map((tag) => (
                    <span key={tag} className="text-xs text-[#c8a84b] border border-[#c8a84b]/40 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Logo variations grid */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {[
                    { src: "/clients/mawasem-logo-green.jpg", alt: "شعار مواسم - أخضر على بيج" },
                    { src: "/clients/mawasem-logo-beige.jpg", alt: "شعار مواسم - بيج على أخضر" },
                    { src: "/clients/mawasem-logo-v-green.jpg", alt: "شعار مواسم عمودي - أخضر" },
                  ].map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: hero — logo on green bg */}
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 order-1 lg:order-2">
                <img
                  src="/clients/mawasem-logo-beige.jpg"
                  alt="مواسم - هوية بصرية"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f15] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f15] via-transparent to-transparent lg:bg-none" />
              </div>
            </div>
          </motion.div>

          {/* ── Featured Client: Kaden ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 rounded-3xl overflow-hidden bg-[#071a19] border border-white/5"
            data-testid="portfolio-card-kaden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              {/* Left: hero image */}
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 order-1">
                <img
                  src="/clients/kaden-1.png"
                  alt="كادن للتطوير العقاري - هوية بصرية"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#071a19] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a19] via-transparent to-transparent lg:bg-none" />
              </div>

              {/* Right: content + image grid */}
              <div className="flex flex-col p-8 lg:p-12 order-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="en text-xs text-[#2eccc4]/80 uppercase tracking-widest border border-[#2eccc4]/30 rounded-full px-3 py-1 mb-3 inline-block">
                      2025
                    </span>
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
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 leading-snug">
                  هوية بصرية لمطوّر عقاري<br/>يصنع مدناً داخل المدن
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">
                  طوّرنا لكادن منظومة بصرية تعكس طموحها في تشكيل مستقبل التطوير العقاري بالمملكة — هوية راسخة تجمع بين الحداثة والقيم السعودية، تتماشى مع رؤية 2030 وتُعبّر عن مفهوم "مدن داخل المدن".
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["هوية بصرية", "براند جايدلاين", "تصميم شعار", "محتوى إبداعي"].map((tag) => (
                    <span key={tag} className="text-xs text-[#2eccc4] border border-[#2eccc4]/40 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Image grid */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {[
                    { src: "/clients/kaden-2.png", alt: "كادن - خطوتك نحو أحلام مستدامة" },
                    { src: "/clients/kaden-3.png", alt: "كادن - نمكّن الأحلام" },
                    { src: "/clients/kaden-4.png", alt: "كادن - مشروع 4" },
                  ].map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white/5">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Featured Client: Cambly ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 rounded-3xl overflow-hidden bg-[#12100a] border border-white/5"
            data-testid="portfolio-card-cambly"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              {/* Left: video */}
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 order-1">
                <video
                  src="/clients/cambly-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#12100a] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100a] via-transparent to-transparent lg:bg-none" />
              </div>

              {/* Right: content */}
              <div className="flex flex-col p-8 lg:p-12 order-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="en text-xs text-[#FFCA00]/80 uppercase tracking-widest border border-[#FFCA00]/30 rounded-full px-3 py-1 mb-3 inline-block">
                      2025
                    </span>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="h-10 px-4 rounded-lg flex items-center justify-center bg-[#FFCA00]/10 border border-[#FFCA00]/20">
                        <span className="en text-[#FFCA00] font-black tracking-wide text-lg">cambly</span>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">العميل</p>
                        <p className="font-bold text-white">كامبلي</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 leading-snug">
                  محتوى فيديو إبداعي<br/>لمنصة تعلّم الإنجليزية الحقيقية
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">
                  أنتجنا لكامبلي إعلاناً إبداعياً يخاطب الجمهور السعودي بلغته — فكرة ذكية تُبرز الفرق بين حفظ القواعد والتحدث الحقيقي مع أهل اللغة، في أي وقت وأي مكان، على مدار الساعة.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["إنتاج فيديو", "محتوى سوشيال", "إعلانات رقمية", "كتابة إبداعية"].map((tag) => (
                    <span key={tag} className="text-xs text-[#FFCA00] border border-[#FFCA00]/40 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quote from the video */}
                <div className="mt-auto border-r-2 border-[#FFCA00] pr-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    "تعرف الفرق؟ — كامبلي يفهمك ويفهّمك"
                  </p>
                  <p className="text-white/40 text-xs mt-1">— الفكرة الإبداعية للإعلان</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Featured Client: AlAila Rice ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-6 rounded-3xl overflow-hidden bg-[#05111f] border border-white/5"
            data-testid="portfolio-card-alaila"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
              {/* Left: content */}
              <div className="flex flex-col p-8 lg:p-12 order-2 lg:order-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="en text-xs text-[#3b9ddd]/80 uppercase tracking-widest border border-[#3b9ddd]/30 rounded-full px-3 py-1 mb-3 inline-block">
                      2025
                    </span>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="h-10 px-4 rounded-lg flex items-center justify-center bg-[#3b9ddd]/10 border border-[#3b9ddd]/20">
                        <span className="text-[#3b9ddd] font-black text-base">أرز العائلة</span>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs">العميل</p>
                        <p className="font-bold text-white">AlAila Rice</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 leading-snug">
                  فيديو إعلاني للأرز المدعّم<br/>بكل جمعة ومع كل وجبة
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 text-sm">
                  أنتجنا لأرز العائلة فيديو إعلانياً يُبرز قيمة الأرز المدعّم بفيتامينات ومعادن أساسية — محتوى يخاطب المرأة السعودية ويُعزّز قيمة الاختيار الصحي لعائلتها في كل وجبة.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["إنتاج فيديو", "محتوى سوشيال", "تصوير المنتج", "إعلانات رقمية"].map((tag) => (
                    <span key={tag} className="text-xs text-[#3b9ddd] border border-[#3b9ddd]/40 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto border-r-2 border-[#3b9ddd] pr-4">
                  <p className="text-white/80 text-sm leading-relaxed">
                    "بكل جمعة ومع كل وجبة — العائلة أولاً"
                  </p>
                  <p className="text-white/40 text-xs mt-1">— شعار العلامة</p>
                </div>
              </div>

              {/* Right: video */}
              <div className="relative overflow-hidden min-h-[320px] lg:min-h-0 order-1 lg:order-2">
                <video
                  src="/clients/alaila-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#05111f] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05111f] via-transparent to-transparent lg:bg-none" />
              </div>
            </div>
          </motion.div>

          {/* ── Featured Client: Jotun — Cinematic full-width ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 rounded-3xl overflow-hidden relative min-h-[600px]"
            data-testid="portfolio-card-jotun"
          >
            {/* Full-bleed video background */}
            <video
              src="/api/storage/public-objects/agency/showreel.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Large decorative "40" */}
            <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none select-none">
              <span className="en text-[180px] md:text-[220px] font-black leading-none text-white/5 tracking-tighter">40</span>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 h-full min-h-[600px] flex flex-col justify-between p-8 lg:p-14">
              {/* Top: client badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-11 px-5 rounded-xl flex items-center justify-center bg-[#1D7C4F]/20 border border-[#1D7C4F]/50 backdrop-blur-sm">
                    <span className="en text-white font-black tracking-widest text-xl">JOTUN</span>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">العميل</p>
                    <p className="font-bold text-white text-sm">جوتن السعودية</p>
                  </div>
                </div>
                <span className="en text-xs text-[#1D7C4F] uppercase tracking-widest border border-[#1D7C4F]/50 rounded-full px-4 py-1.5 backdrop-blur-sm bg-black/20">
                  2025
                </span>
              </div>

              {/* Bottom: title + tags + milestone */}
              <div>
                {/* Milestone badge */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-[2px] bg-[#c8a84b]" />
                  <span className="text-[#c8a84b] text-sm font-semibold tracking-widest">٤٠ عاماً في المملكة — ١٩٨٥ ← ٢٠٢٥</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-display font-black text-white mb-4 leading-tight">
                  فيديو الذكرى السنوية الأربعين<br/>
                  <span className="text-[#1D7C4F]">لجوتن السعودية</span>
                </h3>

                <p className="text-white/70 leading-relaxed mb-6 text-sm max-w-xl">
                  أنتجنا لجوتن فيديو احتفالي يوثّق أربعة عقود من حماية وتجميل أبرز المعالم السعودية — من البنية التحتية للمملكة إلى مشاريع رؤية 2030، رحلة بصرية استثنائية تعكس حجم الأثر.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["إنتاج فيديو", "سينما موشن", "هوية الحدث", "محتوى احتفالي"].map((tag) => (
                    <span key={tag} className="text-xs text-[#1D7C4F] border border-[#1D7C4F]/60 rounded-full px-3 py-1 backdrop-blur-sm bg-black/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Regular portfolio grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden bg-card cursor-pointer rounded-3xl"
                data-testid={`portfolio-card-${idx}`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="en text-xs text-foreground/70 uppercase tracking-widest border border-foreground/30 rounded-full px-3 py-1 bg-background/40 backdrop-blur-sm">
                      {project.year}
                    </span>
                    <span className="text-sm text-foreground/70">{project.client}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-accent border border-accent/40 rounded-full px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About */}
      <section id="about" className="py-32 bg-background border-b border-border" data-testid="section-about">
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

      {/* 5. Achievements (Stats Band) */}
      <section className="relative py-32 border-b border-border overflow-hidden" data-testid="section-stats">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/85 z-10" />
          <img src="/desert-dunes.png" alt="Desert Dunes" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-20 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-10 gap-y-14 text-center">
            {[
              { num: "2,500+", ar: "مشروع منجز", en: "Projects" },
              { num: "1,000+", ar: "عميل سعيد", en: "Clients" },
              { num: "15", ar: "سنة خبرة", en: "Years" },
              { num: "40+", ar: "جائزة", en: "Awards" },
            ].map((stat, idx) => (
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

      {/* 6. Services Accordion */}
      <section id="services" className="py-32 bg-secondary" data-testid="section-services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
            <span className="en text-sm text-accent tracking-widest block mb-4">03 / SERVICES</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-foreground">خدماتنا</h2>
          </div>

          <div className="border-t border-border">
            {services.map((service, idx) => {
              const isActive = activeService === idx;
              return (
                <div key={idx} className="border-b border-border">
                  <button
                    onClick={() => setActiveService(isActive ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-6 py-8 text-right group"
                    data-testid={`service-toggle-${idx}`}
                  >
                    <span className="en text-sm text-foreground/40 tabular-nums w-12 shrink-0">{String(idx + 1).padStart(3, "0")}</span>
                    <div className="flex-1 flex items-center gap-4">
                      <span className="text-accent">{service.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                        {service.ar}
                      </h3>
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

      {/* 7. Clients Marquee */}
      <section id="clients" className="py-24 bg-background overflow-hidden flex items-center border-b border-border flex-col" data-testid="section-clients">
        <span className="en text-sm text-accent tracking-widest block mb-4">04 / OUR CLIENTS</span>
        <h2 className="text-4xl md:text-6xl font-display font-black mb-4 text-foreground">شركاء النجاح</h2>
        <p className="text-lg text-foreground/70 font-light mb-12 px-6 text-center max-w-xl">
          مع كل عميل، نضيف قصة جديدة إلى سجل أعمالنا.
        </p>
        <div className="flex w-max animate-ticker whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {clients.map((client, j) => (
                <span key={j} className="text-6xl md:text-8xl font-display font-black text-transparent hover:text-foreground transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: "1px rgba(240, 237, 228, 0.2)" }}>
                  {client}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-32 bg-background border-b border-border" data-testid="section-faq">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
            <span className="en text-sm text-accent tracking-widest block mb-4">05 / FAQ</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-foreground">الأسئلة<br/>الشائعة</h2>
          </div>
          <div className="border-t border-border max-w-4xl">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-border">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 py-7 text-right group"
                    data-testid={`faq-toggle-${idx}`}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors flex-1">
                      {item.q}
                    </h3>
                    <Plus className={`w-5 h-5 shrink-0 text-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-foreground/65 leading-relaxed text-base max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-32 bg-secondary" data-testid="section-blog">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="en text-sm text-accent tracking-widest block mb-4">06 / INSIGHTS</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-foreground">المدونة</h2>
            </div>
            <a
              href="/blog"
              className="group flex items-center gap-3 text-accent font-bold text-lg hover:gap-4 transition-all"
              data-testid="link-all-posts"
            >
              <span>جميع المقالات</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                data-testid={`home-blog-card-${idx}`}
              >
                <a href={`/blog/${post.slug}`} className="block group">
                  <div
                    className="h-44 rounded-3xl mb-5 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${post.accentColor}33, ${post.accentColor}88)` }}
                  >
                    <span
                      className="absolute bottom-4 right-4 en text-xs font-bold tracking-widest px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: post.accentColor }}
                    >
                      {post.category.en.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/40 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} دقائق
                    </span>
                    <BookOpen className="w-3 h-3" />
                    <span>{post.tags[0]}</span>
                  </div>
                  <h3 className="text-lg font-display font-black text-foreground group-hover:text-accent transition-colors leading-snug mb-3">
                    {post.title.ar}
                  </h3>
                  <p className="text-sm text-foreground/55 leading-relaxed line-clamp-2">{post.excerpt.ar}</p>
                  <div className="flex items-center gap-2 mt-4 text-accent text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>اقرأ المقال</span>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact CTA / Footer */}
      <footer id="contact" className="pt-32 pb-12 bg-secondary" data-testid="section-footer">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
            <div>
              <span className="en text-sm text-accent tracking-widest block mb-4">05 / GET IN TOUCH</span>
              <h2 className="text-5xl md:text-8xl font-display font-black mb-12 text-foreground">هيا<br/>نبدأ معاً</h2>
              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 text-xl font-bold group" data-testid="button-start-project-footer" onClick={() => setContactOpen(true)}>
                  ابدأ مشروعك
                  <ArrowLeft className="mr-3 w-6 h-6 transition-transform group-hover:-translate-x-1" />
                </Button>
                <a
                  href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white hover:bg-[#20b858] transition-colors h-16 px-10 text-lg font-bold"
                  data-testid="link-whatsapp"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  تواصل عبر واتس آب
                </a>
              </div>
            </div>
            <div className="text-right space-y-6 text-foreground/60 text-xl font-light">
              <p data-testid="text-location">الرياض، المملكة العربية السعودية</p>
              <a href="mailto:Info@waberagency.com" className="block hover:text-accent transition-colors en" data-testid="link-email">Info@waberagency.com</a>
              <a href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors en" data-testid="link-phone">+966 51 183 0757</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border/50 gap-6">
            <img src="/wabar-logo.png" alt="Waber Agency" className="h-16 w-auto" />
            <p className="en text-sm text-foreground/40">
              © {new Date().getFullYear()} Waber Agency. All rights reserved.
            </p>
            <div className="flex gap-8 en text-sm text-foreground/60 uppercase tracking-widest">
              <a href="https://www.instagram.com/waberagency/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" data-testid="link-instagram">Instagram</a>
              <a href="https://www.linkedin.com/in/waber-agency-407a31420/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" data-testid="link-linkedin">LinkedIn</a>
              <a href="https://x.com/Waberagency" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" data-testid="link-x">X / Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-whatsapp-float"
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-full shadow-2xl px-6 h-16 transition-all duration-300 hover:scale-105 group"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="text-base">راسلنا الآن</span>
      </a>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6"
            onClick={handleContactClose}
            data-testid="contact-modal"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-border overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-display font-black text-foreground">تواصل معنا</h3>
                  <p className="text-sm text-foreground/50 mt-1">سنرد عليك خلال 24 ساعة</p>
                </div>
                <button onClick={handleContactClose} className="text-foreground/40 hover:text-foreground transition-colors" data-testid="button-close-contact">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Success State */}
              {formStatus === "success" ? (
                <div className="text-center py-8" data-testid="contact-success">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-display font-black text-foreground mb-2">وصلت رسالتك!</h4>
                  <p className="text-foreground/60 mb-8">سيتواصل معك فريقنا قريباً. يمكنك أيضاً التواصل المباشر عبر واتس آب.</p>
                  <a
                    href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-2xl px-6 py-4 transition-all font-bold"
                    data-testid="contact-success-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    تواصل عبر واتس آب
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate data-testid="contact-form">
                  {/* Honeypot — hidden from humans, bots fill it and get silently rejected */}
                  <input
                    type="text"
                    name="website"
                    value={formData._honey}
                    onChange={(e) => setFormData((p) => ({ ...p, _honey: e.target.value }))}
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                  />
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-foreground/70 mb-1.5" htmlFor="contact-name">
                      الاسم <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="اسمك الكريم"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all ${formErrors.name ? "border-red-500" : "border-border"}`}
                      data-testid="input-name"
                      disabled={formStatus === "submitting"}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-foreground/70 mb-1.5" htmlFor="contact-phone">
                      رقم الهاتف <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="05XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all en ${formErrors.phone ? "border-red-500" : "border-border"}`}
                      data-testid="input-phone"
                      disabled={formStatus === "submitting"}
                      dir="ltr"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  {/* Service */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-foreground/70 mb-1.5" htmlFor="contact-service">
                      الخدمة المطلوبة <span className="text-accent">*</span>
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer ${formErrors.service ? "border-red-500" : "border-border"} ${!formData.service ? "text-foreground/30" : ""}`}
                      data-testid="select-service"
                      disabled={formStatus === "submitting"}
                    >
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

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-foreground/70 mb-1.5" htmlFor="contact-message">
                      رسالتك <span className="text-foreground/30 font-normal">(اختياري)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="أخبرنا عن مشروعك أو استفسارك..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                      data-testid="textarea-message"
                      disabled={formStatus === "submitting"}
                    />
                  </div>

                  {/* Error state */}
                  {formStatus === "error" && (
                    <p className="text-red-500 text-sm mb-4 text-center">حدث خطأ، يرجى المحاولة مجدداً أو التواصل عبر واتس آب.</p>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-base font-bold gap-3 mb-4"
                    data-testid="button-submit-contact"
                  >
                    {formStatus === "submitting" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> جارٍ الإرسال...</>
                    ) : (
                      <><Send className="w-5 h-5" /> إرسال الاستفسار</>
                    )}
                  </Button>

                  {/* WhatsApp secondary */}
                  <a
                    href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20أود%20الاستفسار%20عن%20خدماتكم"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-modal-whatsapp"
                    className="flex items-center justify-center gap-3 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl px-6 py-3.5 transition-all font-bold text-sm"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    أو تواصل عبر واتس آب مباشرة
                  </a>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Showreel Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            onClick={() => setShowreelOpen(false)}
            data-testid="showreel-modal"
          >
            <button
              className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setShowreelOpen(false)}
              data-testid="button-close-showreel"
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/api/storage/public-objects/agency/showreel.mp4"
                controls
                autoPlay
                className="w-full rounded-2xl shadow-2xl"
                data-testid="showreel-video"
              />
              <p className="text-center text-white/50 text-sm mt-4 en">KSA 40 Years Anniversary · Waber Agency</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
