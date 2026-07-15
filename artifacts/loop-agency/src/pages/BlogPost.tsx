import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { getBlogPost, getLatestPosts } from "@/data/blog";
import NotFound from "@/pages/not-found";

const MONTHS_AR: Record<string, string> = {
  "01": "يناير", "02": "فبراير", "03": "مارس", "04": "أبريل",
  "05": "مايو", "06": "يونيو", "07": "يوليو", "08": "أغسطس",
  "09": "سبتمبر", "10": "أكتوبر", "11": "نوفمبر", "12": "ديسمبر",
};

function formatDateAr(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${parseInt(day)} ${MONTHS_AR[month]} ${year}`;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug);
  const related = getLatestPosts(3).filter((p) => p.slug !== params.slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.slug]);

  if (!post) return <NotFound />;

  const shareUrl = `https://www.waberagency.com/blog/${post.slug}`;
  const shareText = `${post.title.ar} — وكالة وبار الإبداعية`;

  return (
    <div dir="rtl" className="bg-background text-foreground min-h-screen">
      {/* Nav */}
      <header className="fixed top-0 w-full z-50 bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img src="/wabar-logo.png" alt="Wabar Agency" className="h-12 w-auto" />
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            data-testid="blogpost-back-blog"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>المدونة</span>
          </Link>
        </div>
      </header>

      {/* Article Header */}
      <section
        className="pt-40 pb-20 border-b border-border relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${post.accentColor}18, transparent)` }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: `radial-gradient(circle at 20% 50%, ${post.accentColor}, transparent 60%)` }}
        />
        <div className="container mx-auto px-6 md:px-12 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-foreground/40 mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent transition-colors">المدونة</Link>
            <span>/</span>
            <span className="text-foreground/60 line-clamp-1">{post.title.ar}</span>
          </nav>

          {/* Category */}
          <span
            className="en text-xs font-bold tracking-widest px-3 py-1 rounded-full text-white inline-block mb-6"
            style={{ backgroundColor: post.accentColor }}
          >
            {post.category.en.toUpperCase()}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black mb-6 text-foreground leading-tight max-w-4xl"
          >
            {post.title.ar}
          </motion.h1>

          <p className="text-xl text-foreground/60 max-w-2xl leading-relaxed mb-8">
            {post.excerpt.ar}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/40">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDateAr(post.publishedAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} دقائق قراءة
            </span>
            <span className="flex items-center gap-2">
              <img src="/wabar-logo.png" alt="Wabar Agency" className="h-5 w-auto opacity-60" />
              وكالة وبار
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div
                className="prose-blog text-foreground/80 leading-loose"
                dangerouslySetInnerHTML={{ __html: post.contentAr }}
              />

              {/* English Version */}
              <div className="mt-16 pt-12 border-t border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-border" />
                  <span className="en text-sm font-bold text-foreground/40 tracking-widest">ENGLISH VERSION</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div
                  className="prose-blog-en text-foreground/70 leading-loose"
                  dir="ltr"
                  dangerouslySetInnerHTML={{ __html: post.contentEn }}
                />
              </div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm font-bold text-foreground/40 mb-4">شارك المقال:</p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-[#20b858] transition-colors"
                    data-testid="share-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    واتس آب
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-foreground/80 transition-colors"
                    data-testid="share-twitter"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="en">X / Twitter</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#0077B5] text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-[#005885] transition-colors"
                    data-testid="share-linkedin"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="en">LinkedIn</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
              {/* CTA Card */}
              <div className="bg-secondary rounded-3xl p-8 border border-border">
                <h3 className="text-2xl font-display font-black text-foreground mb-4">
                  هل تحتاج خدمات تسويقية في الرياض؟
                </h3>
                <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                  فريق وبار مستعد لمساعدتك في بناء علامة تجارية تُلهم.
                </p>
                <a
                  href="https://wa.me/966511830757?text=مرحباً%20وبار%20أجنسي،%20قرأت%20مدونتكم%20وأود%20الاستفسار%20عن%20خدماتكم"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl px-6 py-4 font-bold transition-all hover:scale-[1.02]"
                  data-testid="sidebar-cta"
                >
                  ابدأ مشروعك الآن
                </a>
                <div className="mt-4 text-center text-sm text-foreground/40">
                  أو تواصل عبر{" "}
                  <a href="mailto:Info@waberagency.com" className="text-accent hover:underline">
                    Info@waberagency.com
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {related.length > 0 && (
                <div className="bg-secondary rounded-3xl p-8 border border-border">
                  <h3 className="text-lg font-display font-black text-foreground mb-6">مقالات ذات صلة</h3>
                  <div className="space-y-5">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group block"
                        data-testid={`related-${r.slug}`}
                      >
                        <span
                          className="en text-xs font-bold tracking-widest px-2 py-0.5 rounded-full text-white inline-block mb-2"
                          style={{ backgroundColor: r.accentColor }}
                        >
                          {r.category.en}
                        </span>
                        <p className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                          {r.title.ar}
                        </p>
                        <p className="text-xs text-foreground/40 mt-1">{r.readTime} دقائق</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Services list */}
              <div className="bg-secondary rounded-3xl p-8 border border-border">
                <h3 className="text-lg font-display font-black text-foreground mb-4">خدماتنا</h3>
                <ul className="space-y-2 text-sm text-foreground/60">
                  {["الهوية البصرية","التسويق الرقمي","إدارة السوشيال ميديا","الإنتاج المرئي","تصميم المواقع","تنظيم الفعاليات"].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="py-8 bg-secondary border-t border-border">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/wabar-logo.png" alt="Wabar Agency" className="h-10 w-auto" />
          <p className="en text-sm text-foreground/40">© {new Date().getFullYear()} Wabar Agency. All rights reserved.</p>
          <Link href="/" className="en text-sm text-accent hover:underline">waberagency.com</Link>
        </div>
      </footer>
    </div>
  );
}
