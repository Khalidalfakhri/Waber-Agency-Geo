import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X, Play, Globe, Camera, PenTool, LayoutGrid, Megaphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { ar: "من نحن", en: "About", href: "#about" },
  { ar: "خدماتنا", en: "Services", href: "#services" },
  { ar: "عملاؤنا", en: "Clients", href: "#clients" },
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

const clients = ["أرامكو", "stc", "الراجحي", "نيوم", "البنك الأهلي", "موبايلي", "أكوا باور", "صندوق الاستثمارات"];

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
          <a href="#" className="flex items-center group" data-testid="link-home">
            <img
              src="/wabar-logo.png"
              alt="Wabar Agency Logo"
              className="h-16 md:h-20 w-auto transition-transform duration-500 group-hover:scale-105"
            />
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
              تواصل معنا
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
              تواصل معنا
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="section-hero">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="absolute inset-0 bg-background/70 bg-gradient-to-t from-background via-background/40 to-background/70 z-10" />
          <img src="/hero-riyadh.png" alt="Riyadh Skyline" className="w-full h-full object-cover" />
        </motion.div>

        <div className="container relative z-20 mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col justify-center min-h-screen">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full flex justify-end mb-8">
            <span className="en text-xs uppercase tracking-widest text-foreground/50 border border-foreground/20 px-3 py-1 rounded-full">
              SAUDI CREATIVE AGENCY
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl lg:text-[140px] font-display font-black leading-[1.1] mb-6 text-foreground"
              data-testid="hero-headline"
            >
              نصنع علامات
              <br />
              <span className="text-accent">تُلهم</span>
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
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-lg font-bold group"
              >
                <ArrowLeft className="ml-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                تواصل معنا
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

      {/* 4. About */}
      <section id="about" className="py-32 bg-background border-b border-border" data-testid="section-about">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="en text-sm text-accent tracking-widest block mb-4">01 / من نحن - ABOUT US</span>
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
                  className="bg-card p-8 border-t-2 border-accent"
                >
                  <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
                  <p className="text-foreground/70 leading-relaxed">أن نكون الخيار الأول لكل علامة تجارية تسعى إلى النمو والتأثير.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-card p-8 border-t-2 border-accent"
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
                className="relative aspect-square lg:aspect-[4/5] overflow-hidden"
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

      {/* 6. Services Grid */}
      <section id="services" className="py-32 bg-secondary" data-testid="section-services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20">
            <span className="en text-sm text-accent tracking-widest block mb-4">02 / SERVICES</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-foreground">خدماتنا</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-10 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 border border-transparent hover:border-accent/30"
              >
                <div className="text-accent mb-8 bg-background inline-flex p-4 rounded-xl">{service.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-2 text-foreground">{service.ar}</h3>
                <p className="en text-xs text-foreground/40 mb-6 uppercase tracking-wider">{service.en}</p>
                <p className="text-foreground/70 leading-relaxed text-base">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Clients Marquee */}
      <section id="clients" className="py-24 bg-background overflow-hidden flex items-center border-b border-border flex-col" data-testid="section-clients">
        <span className="en text-sm text-accent tracking-widest block mb-12">03 / OUR CLIENTS</span>
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

      {/* 9. Contact CTA / Footer */}
      <footer id="contact" className="pt-32 pb-12 bg-secondary" data-testid="section-footer">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
            <div>
              <span className="en text-sm text-accent tracking-widest block mb-4">04 / GET IN TOUCH</span>
              <h2 className="text-5xl md:text-8xl font-display font-black mb-12 text-foreground">هيا<br/>نبدأ معاً</h2>
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-12 text-xl font-bold group">
                ابدأ مشروعك
                <ArrowLeft className="mr-3 w-6 h-6 transition-transform group-hover:-translate-x-1" />
              </Button>
            </div>
            <div className="en text-right space-y-6 text-foreground/60 text-xl font-light">
              <p className="hover:text-accent transition-colors cursor-pointer">Riyadh, Saudi Arabia</p>
              <p className="hover:text-accent transition-colors cursor-pointer">hello@wabar.sa</p>
              <p className="hover:text-accent transition-colors cursor-pointer">+966 50 123 4567</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border/50 gap-6">
            <img src="/wabar-logo.png" alt="Wabar Agency" className="h-16 w-auto" />
            <p className="en text-sm text-foreground/40">
              © {new Date().getFullYear()} Wabar Agency. All rights reserved.
            </p>
            <div className="flex gap-8 en text-sm text-foreground/60 uppercase tracking-widest">
              <a href="#" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors">Behance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
