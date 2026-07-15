import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Link } from "wouter";
import { blogPosts } from "@/data/blog";

const MONTHS_AR: Record<string, string> = {
  "01": "يناير", "02": "فبراير", "03": "مارس", "04": "أبريل",
  "05": "مايو", "06": "يونيو", "07": "يوليو", "08": "أغسطس",
  "09": "سبتمبر", "10": "أكتوبر", "11": "نوفمبر", "12": "ديسمبر",
};

function formatDateAr(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${parseInt(day)} ${MONTHS_AR[month]} ${year}`;
}

export default function Blog() {
  return (
    <div dir="rtl" className="bg-background text-foreground min-h-screen">
      {/* Header / Nav */}
      <header className="fixed top-0 w-full z-50 bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center group" data-testid="blog-link-home">
            <img src="/wabar-logo.png" alt="Waber Agency" className="h-12 w-auto" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            data-testid="blog-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>الرئيسية</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 bg-secondary border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="en text-sm text-accent tracking-widest block mb-4">INSIGHTS & ARTICLES</span>
            <h1 className="text-5xl md:text-8xl font-display font-black mb-6 text-foreground leading-tight">
              المدونة
            </h1>
            <p className="text-xl text-foreground/60 max-w-xl font-light leading-relaxed">
              مقالات في التسويق، الهوية البصرية، والإنتاج المرئي — من قلب السوق السعودي.
            </p>
            <p className="en text-sm text-foreground/40 mt-2">
              Marketing insights, brand strategy & digital growth — Riyadh, Saudi Arabia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                data-testid={`blog-card-${post.slug}`}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  {/* Card Color Block */}
                  <div
                    className="h-48 rounded-3xl mb-6 flex items-end p-6 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${post.accentColor}33, ${post.accentColor}99)` }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ background: `radial-gradient(circle at 30% 70%, ${post.accentColor}, transparent 70%)` }}
                    />
                    <span
                      className="en text-xs font-bold tracking-widest px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: post.accentColor }}
                    >
                      {post.category.en.toUpperCase()}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-foreground/40 mb-3">
                    <span>{formatDateAr(post.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} دقائق قراءة</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-display font-black text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
                    {post.title.ar}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt.ar}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs text-foreground/40 bg-secondary rounded-full px-3 py-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <div className="flex items-center gap-2 mt-5 text-accent font-bold text-sm group-hover:-translate-x-1 transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                    <span>اقرأ المقال</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-foreground">
            هل أنت مستعد لتنمية علامتك التجارية؟
          </h2>
          <p className="text-foreground/60 text-lg mb-10 max-w-lg mx-auto">
            تحدث مع فريق وبر الإبداعية اليوم وابدأ مشروعك التسويقي في الرياض.
          </p>
          <a
            href="https://wa.me/966511830757?text=مرحباً%20وبر%20الإبداعية،%20قرأت%20مدونتكم%20وأود%20الاستفسار%20عن%20خدماتكم"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-12 py-5 text-xl font-bold transition-all hover:scale-105"
            data-testid="blog-cta-whatsapp"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            تواصل معنا الآن
          </a>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/wabar-logo.png" alt="Waber Agency" className="h-10 w-auto" />
          <p className="en text-sm text-foreground/40">© {new Date().getFullYear()} Waber Agency. All rights reserved.</p>
          <Link href="/" className="en text-sm text-accent hover:underline">waberagency.com</Link>
        </div>
      </footer>
    </div>
  );
}
