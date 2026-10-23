import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, AlertTriangle, Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import LeadForm from "@/components/LeadForm";
import { pricingPages, type PricingPageData } from "@/data/pricing";
import { INSPECTION, fmt } from "@/data/offers";
import { setPageMeta, trackEvent, whatsappLink } from "@/lib/track";

function scrollToQuote(pkg: string) {
  trackEvent("pricing_cta_click", { package: pkg });
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
}

function PricingContent({ page }: { page: PricingPageData }) {
  useEffect(
    () => setPageMeta({ title: page.title, description: page.description, canonical: `https://wabermarketing.com${page.slug}` }),
    [page],
  );
  const others = pricingPages.filter((p) => p.key !== page.key);

  return (
    <>
      {/* Hero + quick answer */}
      <section className="pt-28 pb-20 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <nav className="text-sm text-foreground/40 mb-6" aria-label="breadcrumb">
            <Link href="/" className="hover:text-accent">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link href="/asaar" className="hover:text-accent">الأسعار</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground/60">{page.service}</span>
          </nav>
          <span className="en text-sm text-accent tracking-widest block mb-5">{page.eyebrow}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.3] text-foreground mb-10">{page.h1}</h1>
          <div className="rounded-3xl border border-accent/40 bg-accent/5 p-6 md:p-8">
            <p className="text-sm font-bold text-accent mb-3">الجواب المختصر</p>
            <p className="text-lg md:text-xl text-foreground/85 leading-loose">{page.quickAnswer}</p>
            <p className="text-sm text-foreground/50 mt-4">
              باقات {page.service} من وبر تبدأ من <span className="en font-bold text-foreground">{fmt(page.minPrice)}</span> ريال قبل الضريبة.
            </p>
          </div>
        </div>
      </section>

      {/* Market table */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-display font-black text-foreground mb-3">أسعار السوق في السعودية حسب نوع المزود</h2>
          <p className="text-foreground/55 mb-10">تقديرات مبنية على الأسعار المنشورة لوكالات سعودية ومنصات العمل الحر في {new Date().getFullYear()}، قبل الضريبة.</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-right min-w-[560px]">
              <thead className="bg-card">
                <tr>
                  <th className="p-4 font-bold text-foreground/80">نوع المزود</th>
                  <th className="p-4 font-bold text-foreground/80">السعر التقريبي</th>
                  <th className="p-4 font-bold text-foreground/80">وش يوصلك غالباً</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {page.marketTiers.map((t) => (
                  <tr key={t.who}>
                    <td className="p-4 font-bold text-foreground">{t.who}</td>
                    <td className="p-4 text-accent font-bold whitespace-nowrap">{t.range}</td>
                    <td className="p-4 text-foreground/65">{t.gets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Factors */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-display font-black text-foreground mb-10">وش اللي يحدد السعر؟</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {page.factors.map((f, i) => (
              <div key={f.t} className="bg-card border border-border rounded-2xl p-6">
                <span className="en text-accent text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{f.t}</h3>
                <p className="text-foreground/65 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wabar packages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto mb-12">
            <span className="en text-sm text-accent tracking-widest block mb-4">WABER PACKAGES</span>
            <h2 className="text-2xl md:text-4xl font-display font-black text-foreground mb-3">باقات {page.service} من وبر</h2>
            <p className="text-foreground/55">أسعار تبدأ من، قبل الضريبة. السعر النهائي يوصلك مكتوب بعد ما نفهم احتياجك.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {page.packages.map((p) => (
              <div key={p.name} className={`rounded-3xl p-7 flex flex-col border ${p.featured ? "border-accent bg-accent/5" : "border-border bg-card"}`}>
                {p.featured && <span className="self-start text-xs font-bold bg-accent text-accent-foreground rounded-full px-3 py-1 mb-4">الأكثر طلباً</span>}
                <h3 className="text-2xl font-display font-black text-foreground">{p.name}</h3>
                <p className="text-foreground/55 text-sm mt-1 mb-5">{p.for}</p>
                <p className="mb-6 text-foreground">
                  <span className="text-sm text-foreground/50">يبدأ من </span>
                  <span className="en text-4xl font-black">{fmt(p.from)}</span>
                  <span className="text-sm text-foreground/60"> ريال{p.unit ? ` ${p.unit}` : ""}</span>
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3 text-foreground/80"><Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />{it}</li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToQuote(`${page.key}-${p.name}`)}
                  className={`h-14 rounded-xl font-bold transition-colors ${p.featured ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-background border border-border text-foreground hover:border-accent"}`}
                >
                  اطلب عرض سعر
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="py-20 bg-secondary border-y border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-display font-black text-foreground mb-10">علامات تخليك تتردد قبل ما توقع</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {page.redFlags.map((r) => (
              <li key={r} className="flex gap-3 bg-card border border-border rounded-2xl p-5 text-foreground/80">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />{r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inspection cross-sell */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10 flex flex-col md:flex-row gap-8 md:items-center justify-between">
            <div>
              <p className="text-accent font-bold text-sm mb-2">ما تدري وش تحتاج بالضبط؟</p>
              <h2 className="text-2xl md:text-3xl font-display font-black text-foreground mb-2">ابدأ بالفحص الدوري للعلامة</h2>
              <p className="text-foreground/60">10 نقاط، تقرير ودرجة وأهم 3 إصلاحات خلال {INSPECTION.days} أيام، بـ {fmt(INSPECTION.price)} ريال تنخصم من مشروعك.</p>
            </div>
            <Link href={INSPECTION.slug} className="inline-flex items-center gap-2 shrink-0 rounded-full bg-primary text-primary-foreground h-14 px-8 font-bold hover:bg-primary/90 transition-colors">
              شوف التفاصيل <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-display font-black text-foreground mb-10">أسئلة متكررة عن أسعار {page.service}</h2>
          <div className="border-t border-border">
            {page.faq.map((f) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors">{f.q}</h3>
                  <Plus className="w-5 h-5 shrink-0 text-foreground/50 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pb-7 text-foreground/65 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="py-20 bg-background scroll-mt-24">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start max-w-6xl">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-5 leading-tight">خذ عرض سعر مكتوب خلال يوم عمل</h2>
            <p className="text-foreground/65 text-lg leading-relaxed mb-8">قول لنا عن نشاطك وميزانيتك التقريبية، ونرجع لك بعرض واضح بدون مفاجآت.</p>
            <a
              href={whatsappLink(`هلا وبر، أبي أعرف سعر ${page.service}`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { lead_source: `asaar-${page.key}` })}
              className="text-[#25D366] font-bold hover:underline"
            >
              تفضل الواتساب؟ راسلنا مباشرة
            </a>
            <div className="mt-10">
              <p className="text-sm text-foreground/40 mb-3">أسعار خدمات ثانية</p>
              <ul className="space-y-2">
                {others.map((o) => (
                  <li key={o.slug}><Link href={o.slug} className="text-foreground/75 hover:text-accent">أسعار {o.service}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
            <LeadForm source={`asaar-${page.key}`} service={page.service} submitLabel="اطلب عرض السعر" />
          </div>
        </div>
      </section>
    </>
  );
}

export default function PricingPage({ page }: { page: PricingPageData }) {
  return (
    <PageLayout>
      <PricingContent page={page} />
    </PageLayout>
  );
}
