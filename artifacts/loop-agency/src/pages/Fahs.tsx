import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ClipboardCheck, FileText, PhoneCall, Receipt, Check, X, Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import LeadForm from "@/components/LeadForm";
import { INSPECTION, fmt } from "@/data/offers";
import { setPageMeta, trackEvent, whatsappLink } from "@/lib/track";

export const FAHS_META = {
  title: "الفحص الدوري للعلامة التجارية | فحص هوية ونشاط رقمي في 5 أيام – وبر الإبداعية",
  description: `نفحص علامتك التجارية على 10 نقاط: الشعار، الهوية، الإنستقرام، الموقع، الواتساب، المنافسين وظهورك في قوقل والذكاء الاصطناعي. تقرير ودرجة وأهم 3 إصلاحات بـ ${fmt(INSPECTION.price)} ريال تنخصم من مشروعك.`,
  canonical: `https://wabermarketing.com${INSPECTION.slug}`,
};

export const CHECKPOINTS = [
  { t: "الشعار في الأحجام الصغيرة", d: "هل يُقرأ كأيقونة سناب وصورة واتساب وفافيكون، ولا يضيع؟" },
  { t: "ثبات الألوان والخطوط", d: "هل علامتك نفسها في الإنستقرام والمنيو واللوحة والموقع؟" },
  { t: "العربي والإنجليزي", d: "هل الاسم والشعار ماشيين صح باللغتين، ولا كل واحد في وادي؟" },
  { t: "أول 9 منشورات", d: "أول ما يفتح العميل حسابك، هل يفهم مين أنت ووش تقدم؟" },
  { t: "الموقع على الجوال", d: "أول 5 ثواني: هل يعرف وش تبيع وكيف يطلب؟" },
  { t: "تجربة الواتساب", d: "كم ياخذ الرد، وهل أول رسالة تقربه من الشراء ولا تبعده؟" },
  { t: "وضوح الرسالة", d: "هل تقدر تقول وش يميزك في جملة وحدة يفهمها أي أحد؟" },
  { t: "مقارنة بالمنافسين", d: "نحطك جنب 3 منافسين مباشرين ونشوف وين تكسب ووين تخسر." },
  { t: "قوقل وخرائط قوقل", d: "لما أحد يبحث عن نشاطك في الرياض، هل يلقاك؟ وكيف يشوفك؟" },
  { t: "إجابات الذكاء الاصطناعي", d: "لما أحد يسأل ChatGPT أو Gemini عن أفضل خيار في مجالك، هل تنذكر؟" },
];

export const FAHS_FAQ = [
  {
    q: "كم سعر الفحص الدوري للعلامة؟",
    a: `السعر ${fmt(INSPECTION.price)} ريال (قبل الضريبة)، وإذا قررت تشتغل معنا على أي إصلاح خلال ${INSPECTION.creditDays} يوم ينخصم المبلغ كامل من قيمة المشروع.`,
  },
  {
    q: "كم ياخذ وقت؟",
    a: `${INSPECTION.days} أيام عمل من استلام الدفع والمعلومات الأساسية، وبعدها مكالمة 30 دقيقة نشرح فيها التقرير ونجاوب على أسئلتك.`,
  },
  {
    q: "وش اللي يوصلني بالضبط؟",
    a: "تقرير صفحة وحدة فيه درجة لكل نقطة من النقاط العشر، ودرجة عامة (أ، ب، ج)، وأهم 3 إصلاحات مرتبة حسب الأثر على المبيعات، وعرض سعر واضح لو حبيت ننفذها معك.",
  },
  {
    q: "هل لازم أشتغل معكم بعد الفحص؟",
    a: "أبداً. التقرير لك، وتقدر تنفذ الإصلاحات بنفسك أو مع أي فريق ثاني. أغلب الإصلاحات واضحة لدرجة إن فريقك يقدر يبدأ فيها نفس الأسبوع.",
  },
  {
    q: "هل الفحص مناسب للمشاريع الجديدة؟",
    a: "إذا عندك نشاط شغّال وحساب أو موقع، الفحص يفيدك. أما إذا لسه ما أطلقت، الأنسب تبدأ مباشرة بالهوية البصرية لأنه ما فيه شي ينفحص.",
  },
  {
    q: "وش تحتاجون مني؟",
    a: "اسم النشاط، رابط الإنستقرام أو الموقع، وأسماء 3 منافسين تشوفهم الأقرب لك. وإذا عندك ملف الهوية الحالي يكون أفضل، بس مو شرط.",
  },
];

const SAMPLE = [
  { k: "الشعار في الأحجام الصغيرة", g: "ج" },
  { k: "ثبات الألوان والخطوط", g: "ب" },
  { k: "أول 9 منشورات", g: "ج" },
  { k: "تجربة الواتساب", g: "أ" },
  { k: "قوقل وخرائط قوقل", g: "ب" },
];

const gradeCls = (g: string) =>
  g === "أ" ? "bg-accent/20 text-accent" : g === "ب" ? "bg-primary/15 text-primary" : "bg-red-500/15 text-red-400";

function scrollToBook() {
  trackEvent("pricing_cta_click", { package: "fahs-hero" });
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
}

function FahsContent() {
  useEffect(() => setPageMeta(FAHS_META), []);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div>
            <span className="en text-sm text-accent tracking-widest block mb-6">BRAND INSPECTION / الفحص الدوري للعلامة</span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-display font-black leading-[1.25] mb-8 text-foreground"
            >
              سيارتك لها فحص دوري.
              <br />
              <span className="text-accent">علامتك التجارية</span> متى آخر مرة انفحصت؟
            </motion.h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed mb-10">
              في {INSPECTION.days} أيام عمل نفحص علامتك على 10 نقاط، ونعطيك درجة واضحة وأهم 3 إصلاحات تأثر على مبيعاتك. وإذا اشتغلنا معاً، المبلغ ينخصم كامل من مشروعك.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToBook}
                className="inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-10 text-lg font-bold transition-colors group"
              >
                احجز فحصك
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <div className="text-foreground/70">
                <span className="en text-3xl font-black text-foreground">{fmt(INSPECTION.price)}</span>{" "}
                <span className="text-sm">ريال، تنخصم من مشروعك</span>
              </div>
            </div>
          </div>

          {/* Sample report card */}
          <div className="bg-card border border-border rounded-3xl p-7 shadow-2xl" aria-label="مثال توضيحي لتقرير الفحص">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-foreground/40 mb-1">مثال توضيحي</p>
                <p className="font-display font-black text-xl text-foreground">تقرير فحص: كافيه ريحان</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex flex-col items-center justify-center">
                <span className="text-[10px] text-foreground/50">الدرجة</span>
                <span className="text-3xl font-black text-primary leading-none">ب</span>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {SAMPLE.map((r) => (
                <li key={r.k} className="flex items-center justify-between py-3">
                  <span className="text-foreground/75 text-sm">{r.k}</span>
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-black ${gradeCls(r.g)}`}>{r.g}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-background/60 p-4">
              <p className="text-xs font-bold text-accent mb-2">أهم إصلاح</p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                الشعار يختفي في صورة الواتساب وأيقونة سناب. نسخة مبسطة للأحجام الصغيرة بتخلي العميل يعرفك من أول نظرة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 checkpoints */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <span dir="ltr" className="en text-sm text-accent tracking-widest block mb-4 text-right">10 CHECKPOINTS</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-4">وش نفحص بالضبط؟</h2>
          <p className="text-foreground/60 text-lg mb-14 max-w-2xl">عشر نقاط، كل وحدة فيها سؤال واحد واضح، وكلها تأثر على قرار العميل إنه يشتري منك.</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CHECKPOINTS.map((c, i) => (
              <li key={c.t} className="bg-card border border-border rounded-2xl p-5">
                <span className="en text-sm text-accent font-bold block mb-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-bold text-foreground mb-2 leading-snug">{c.t}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get + how it works */}
      <section className="py-24 bg-secondary border-y border-border">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-10">وش يوصلك</h2>
            <ul className="space-y-6">
              {[
                { i: <FileText className="w-6 h-6" />, t: "تقرير صفحة وحدة", d: "درجة لكل نقطة ودرجة عامة، بدون حشو ولا مصطلحات." },
                { i: <ClipboardCheck className="w-6 h-6" />, t: "أهم 3 إصلاحات", d: "مرتبة حسب أثرها على المبيعات، مع مثال لكل إصلاح." },
                { i: <PhoneCall className="w-6 h-6" />, t: "مكالمة 30 دقيقة", d: "نمشي معك على التقرير ونجاوب على كل أسئلتك." },
                { i: <Receipt className="w-6 h-6" />, t: "عرض سعر للإصلاحات", d: `واضح ومفصل، والمبلغ ينخصم لو بدأت خلال ${INSPECTION.creditDays} يوم.` },
              ].map((x) => (
                <li key={x.t} className="flex gap-4">
                  <span className="w-12 h-12 shrink-0 rounded-xl bg-accent/15 text-accent flex items-center justify-center">{x.i}</span>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{x.t}</h3>
                    <p className="text-foreground/60">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-10">كيف يمشي الفحص</h2>
            <ol className="space-y-6">
              {[
                "تعبي النموذج تحت (دقيقة وحدة).",
                "نتواصل معك على الواتساب ونرسل رابط الدفع.",
                `خلال ${INSPECTION.days} أيام عمل يوصلك التقرير.`,
                "مكالمة 30 دقيقة، وبعدها القرار لك.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4 items-start">
                  <span className="en w-10 h-10 shrink-0 rounded-full border border-accent text-accent flex items-center justify-center font-bold">{i + 1}</span>
                  <p className="text-foreground/80 text-lg pt-1.5">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Fit */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-accent/40 bg-accent/5 p-8">
            <h2 className="text-2xl font-display font-black text-foreground mb-6">الفحص لك إذا</h2>
            <ul className="space-y-4">
              {[
                "نشاطك شغّال لكن الإقبال أقل من اللي تستاهله",
                "تحس إن حسابك ما يعكس مستوى خدمتك",
                "تفكر تعيد الهوية وما تدري من وين تبدأ",
                "تبي رأي محايد قبل ما تصرف على إعلانات",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-foreground/80"><Check className="w-5 h-5 text-accent shrink-0 mt-1" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-display font-black text-foreground mb-6">مو لك إذا</h2>
            <ul className="space-y-4">
              {[
                "لسه ما أطلقت النشاط (ابدأ بالهوية مباشرة)",
                "تبي تصاميم جاهزة اليوم، مو تشخيص",
                "ما عندك أي حساب أو موقع نقدر نفحصه",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-foreground/65"><X className="w-5 h-5 text-foreground/40 shrink-0 mt-1" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ: answers stay in the HTML so search engines and AI crawlers can read them */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-12">أسئلة متكررة</h2>
          <div className="border-t border-border">
            {FAHS_FAQ.map((f) => (
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

      {/* Booking form */}
      <section id="book" className="py-24 bg-background scroll-mt-24">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.3fr] gap-14 items-start">
          <div>
            <span className="en text-sm text-accent tracking-widest block mb-4">BOOK YOUR INSPECTION</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 leading-tight">احجز فحص علامتك</h2>
            <p className="text-foreground/65 text-lg leading-relaxed mb-8">
              نستقبل عدد محدود من الفحوصات كل شهر عشان نعطي كل علامة حقها. عبّي النموذج ونتواصل معك خلال يوم عمل.
            </p>
            <div className="rounded-2xl bg-card border border-border p-6 mb-6">
              <p className="text-foreground/60 text-sm mb-1">السعر</p>
              <p className="text-foreground"><span className="en text-4xl font-black">{fmt(INSPECTION.price)}</span> ريال <span className="text-sm text-foreground/50">قبل الضريبة</span></p>
              <p className="text-accent text-sm mt-2">ينخصم كامل من أي مشروع خلال {INSPECTION.creditDays} يوم</p>
            </div>
            <a
              href={whatsappLink("هلا وبر، عندي سؤال عن الفحص الدوري للعلامة")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { lead_source: "fahs" })}
              className="text-[#25D366] font-bold hover:underline"
            >
              عندك سؤال قبل؟ اسألنا على الواتساب
            </a>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
            <LeadForm source="fahs" service={INSPECTION.name} submitLabel="احجز الفحص" hideBudget />
          </div>
        </div>
      </section>
    </>
  );
}

export default function Fahs() {
  return (
    <PageLayout>
      <FahsContent />
    </PageLayout>
  );
}
