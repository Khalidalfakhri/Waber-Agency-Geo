import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { pricingPages } from "@/data/pricing";
import { INSPECTION, PRICE_YEAR, fmt } from "@/data/offers";
import { setPageMeta } from "@/lib/track";

export const HUB_META = {
  title: `أسعار خدمات التسويق والهوية البصرية في الرياض ${PRICE_YEAR} | وبر الإبداعية`,
  description: `أسعار واضحة لخدمات وبر الإبداعية في الرياض: الهوية البصرية، إدارة السوشيال ميديا، تصميم المواقع، والفحص الدوري للعلامة. مع أسعار السوق للمقارنة.`,
  canonical: "https://wabermarketing.com/asaar",
};

function HubContent() {
  useEffect(() => setPageMeta(HUB_META), []);
  return (
    <>
      <section className="pt-28 pb-16 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <span className="en text-sm text-accent tracking-widest block mb-5">PRICING / الأسعار</span>
          <h1 className="text-4xl md:text-6xl font-display font-black leading-[1.25] text-foreground mb-6">أسعارنا على الطاولة</h1>
          <p className="text-xl text-foreground/70 max-w-2xl leading-relaxed">
            أغلب الوكالات تخبي أسعارها. إحنا نفضل تعرف من البداية وين تقف ميزانيتك، وتقارن بأسعار السوق قبل ما تكلم أحد.
          </p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl grid md:grid-cols-2 gap-5">
          <Link href={INSPECTION.slug} className="group rounded-3xl border border-accent bg-accent/5 p-8 flex flex-col">
            <p className="text-accent font-bold text-sm mb-2">نقطة البداية</p>
            <h2 className="text-2xl font-display font-black text-foreground mb-3">{INSPECTION.name}</h2>
            <p className="text-foreground/65 mb-6 flex-1">تقرير ودرجة وأهم 3 إصلاحات لعلامتك خلال {INSPECTION.days} أيام، والمبلغ ينخصم من مشروعك.</p>
            <p className="text-foreground"><span className="en text-3xl font-black">{fmt(INSPECTION.price)}</span> ريال</p>
            <span className="mt-4 inline-flex items-center gap-2 text-accent font-bold">التفاصيل <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /></span>
          </Link>
          {pricingPages.map((p) => (
            <Link key={p.slug} href={p.slug} className="group rounded-3xl border border-border bg-card p-8 flex flex-col hover:border-accent transition-colors">
              <h2 className="text-2xl font-display font-black text-foreground mb-3">أسعار {p.service}</h2>
              <p className="text-foreground/65 mb-6 flex-1">{p.packages.map((x) => x.name).join("، ")}، مع جدول أسعار السوق ووش يحدد السعر.</p>
              <p className="text-foreground"><span className="text-sm text-foreground/50">يبدأ من </span><span className="en text-3xl font-black">{fmt(p.minPrice)}</span> ريال{p.packages[0].unit ? ` ${p.packages[0].unit}` : ""}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-accent font-bold">شوف الأسعار <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <p className="text-center text-sm text-foreground/40 mt-10">كل الأسعار قبل ضريبة القيمة المضافة 15%.</p>
      </section>
    </>
  );
}

export default function PricingHub() {
  return (
    <PageLayout>
      <HubContent />
    </PageLayout>
  );
}
