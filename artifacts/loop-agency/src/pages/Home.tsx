import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Menu, X, Play, Globe, Camera, PenTool, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Expertise", href: "#expertise" },
  { name: "Agency", href: "#agency" },
  { name: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Brand Identity & Strategy",
    desc: "We forge foundational narratives and visual systems that define industry leaders.",
    icon: <LayoutGrid className="w-6 h-6" />,
  },
  {
    title: "Digital Marketing & Social Media",
    desc: "Data-driven campaigns that capture attention and convert audiences at scale.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Web & App Design",
    desc: "Immersive digital experiences engineered for performance and aesthetic dominance.",
    icon: <PenTool className="w-6 h-6" />,
  },
  {
    title: "Creative Production",
    desc: "Cinematic photography and video production that elevates your visual standard.",
    icon: <Camera className="w-6 h-6" />,
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="noise-overlay" />

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-border/50 py-4" : "bg-transparent py-6"
        }`}
        data-testid="navbar"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="relative z-50 flex items-center gap-3 group" data-testid="link-home">
            <div className="bg-[#f7f5eb] p-1.5 rounded-sm overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/loop-logo.jpeg" 
                alt="Loop Agency Logo" 
                className="h-6 w-auto mix-blend-multiply"
              />
            </div>
            <span className="font-display font-bold tracking-widest uppercase text-sm hidden sm:block">Loop Creative</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors uppercase text-muted-foreground hover:text-foreground"
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-widest font-bold text-xs px-8 py-6">
              Start a project
            </Button>
          </div>

          <button
            className="md:hidden relative z-50 text-foreground"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-32 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-display font-bold uppercase tracking-tighter"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <Button className="rounded-none bg-primary text-primary-foreground w-full uppercase tracking-widest font-bold text-sm py-8">
              Start a project
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-background/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <img 
            src="/hero-bg.png" 
            alt="Abstract fluid dark waves" 
            className="w-full h-full object-cover object-center opacity-60 mix-blend-luminosity"
          />
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 pt-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-display font-black leading-[0.85] tracking-tighter uppercase mb-6">
                Defy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-muted-foreground">The Ordinary</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light mb-12"
            >
              We are a Saudi-based creative powerhouse engineering digital experiences, brand identities, and cinematic productions that demand attention.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6"
            >
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-sm tracking-widest uppercase font-bold group">
                View Our Work
                <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <button className="flex items-center gap-4 text-sm tracking-widest uppercase font-bold hover:text-primary transition-colors group">
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                Showreel
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-muted-foreground"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          <span className="rotate-90 origin-left translate-y-6">Scroll</span>
        </motion.div>
      </section>

      {/* Manifesto Section */}
      <section id="agency" className="py-32 md:py-48 relative" data-testid="section-manifesto">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground block mb-4">01 / The Agency</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter">
                Built for <br />the bold
              </h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="text-2xl md:text-4xl leading-snug font-light text-foreground/90">
                  We don't do subtle. In a saturated market, blending in is a failure of imagination. Loop exists to elevate Saudi brands to global standards through unapologetic strategy, visceral design, and cinematic execution.
                </p>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-display font-black text-primary mb-2">10+</h3>
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</span>
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-display font-black text-primary mb-2">50+</h3>
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Brands Elevated</span>
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-display font-black text-primary mb-2">12</h3>
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">Industry Awards</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-32 bg-background border-t border-border" data-testid="section-work">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground block mb-4">02 / Selected Work</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">Case Studies</h2>
            </div>
            <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 px-8 text-sm tracking-widest uppercase font-bold hidden md:inline-flex">
              View All Work
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-16">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-6 relative bg-muted aspect-[4/3] md:aspect-[16/9]">
                <img 
                  src="/work-brand.png" 
                  alt="Aura Luxury Brand Identity" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors">Aura Residence</h3>
                  <p className="text-muted-foreground font-light">Brand Identity & Strategy</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group cursor-pointer md:mt-24"
            >
              <div className="overflow-hidden mb-6 relative bg-muted aspect-[4/3] md:aspect-[3/4]">
                <img 
                  src="/work-digital.png" 
                  alt="Fintech App UI Design" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors">Vault Platform</h3>
                  <p className="text-muted-foreground font-light">Web & App Design</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer md:-mt-24"
            >
              <div className="overflow-hidden mb-6 relative bg-muted aspect-[4/3] md:aspect-square">
                <img 
                  src="/work-campaign.png" 
                  alt="Fashion Campaign Visuals" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors">Nova Studios</h3>
                  <p className="text-muted-foreground font-light">Digital Marketing & Social</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 md:hidden">
            <Button className="w-full rounded-none bg-primary text-primary-foreground h-14 uppercase tracking-widest font-bold">
              View All Work
            </Button>
          </div>
        </div>
      </section>

      {/* Expertise / Services */}
      <section id="expertise" className="py-24 bg-card" data-testid="section-services">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground block mb-4">03 / Expertise</span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">Capabilities</h2>
            </div>
            <p className="text-muted-foreground max-w-md text-lg font-light">
              Comprehensive creative solutions engineered to dominate the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-card p-10 md:p-16 group hover:bg-accent transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-none border border-border flex items-center justify-center mb-8 text-primary group-hover:border-primary transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-light mb-8">
                  {service.desc}
                </p>
                <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
                  Explore <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Production (Image Break) */}
      <section className="py-32 relative min-h-[80vh] flex items-center" data-testid="section-production">
        <div className="absolute inset-0 z-0">
          <img 
            src="/services-production.png" 
            alt="Professional cinematic production" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter mb-6 leading-none">
              Cinematic <br />Production
            </h2>
            <p className="text-xl text-muted-foreground font-light mb-10">
              We shoot on industry-leading cinema cameras to deliver visual fidelity that separates premium brands from the noise.
            </p>
            <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-8 text-sm tracking-widest uppercase font-bold">
              View Production Reel
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-32 bg-background border-t border-border" data-testid="section-approach">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="/approach-bg.png" 
                alt="Abstract minimal architecture" 
                className="w-full aspect-[4/5] object-cover grayscale brightness-75 contrast-125"
              />
            </motion.div>
            
            <div>
              <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground block mb-4">03 / Approach</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-8">
                Precision meets <br />provocation
              </h2>
              
              <div className="space-y-12">
                {[
                  { num: "01", title: "Discovery & Audit", desc: "We tear down your current positioning to find the raw truth of your brand." },
                  { num: "02", title: "Strategic Vision", desc: "Architecting a unique position in the market that competitors cannot replicate." },
                  { num: "03", title: "Flawless Execution", desc: "Bringing the vision to life across digital, physical, and experiential touchpoints." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-xl font-mono text-muted-foreground group-hover:text-primary transition-colors">{step.num}</span>
                    <div>
                      <h4 className="text-2xl font-display font-bold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 bg-background border-t border-border overflow-hidden" data-testid="section-clients">
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground block mb-4">04 / Partners</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter">Trusted By Visionaries</h2>
        </div>
        
        {/* Infinite Marquee */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="py-8 animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {["Aura", "Vault", "Nova", "Oasis", "Lumina", "Zenith", "Apex", "Horizon"].map((client, i) => (
              <span key={i} className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest mx-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground stroke-foreground" style={{ WebkitTextStroke: "1px hsl(var(--muted-foreground))" }}>
                {client}
              </span>
            ))}
          </div>
          
          <div className="absolute top-0 py-8 animate-marquee2 whitespace-nowrap flex items-center gap-16 md:gap-24 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {["Aura", "Vault", "Nova", "Oasis", "Lumina", "Zenith", "Apex", "Horizon"].map((client, i) => (
              <span key={`clone-${i}`} className="text-4xl md:text-6xl font-display font-black uppercase tracking-widest mx-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground stroke-foreground" style={{ WebkitTextStroke: "1px hsl(var(--muted-foreground))" }}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer id="contact" className="pt-32 pb-12 bg-card relative overflow-hidden" data-testid="section-footer">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mb-32">
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-black uppercase tracking-tighter leading-none mb-10">
              Ready to <br />dominate?
            </h2>
            <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-sm tracking-widest uppercase font-bold group">
              Start the conversation
              <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-border">
            <div className="col-span-1 md:col-span-2">
              <div className="bg-[#f7f5eb] p-1.5 rounded-sm inline-block mb-6">
                <img 
                  src="/loop-logo.jpeg" 
                  alt="Loop Agency Logo" 
                  className="h-8 w-auto mix-blend-multiply"
                />
              </div>
              <p className="text-muted-foreground max-w-sm font-light">
                A premium creative agency based in Riyadh, Saudi Arabia. Engineering brands that lead.
              </p>
            </div>
            
            <div>
              <h5 className="font-display font-bold uppercase tracking-widest text-sm mb-6 text-foreground">Connect</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">hello@loopcreative.sa</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">+966 50 123 4567</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">Riyadh, Saudi Arabia</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-display font-bold uppercase tracking-widest text-sm mb-6 text-foreground">Social</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">Instagram</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">Twitter / X</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">LinkedIn</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-light">Behance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-24 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground font-mono tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Loop Creative Agency</p>
            <p className="mt-4 md:mt-0">All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}