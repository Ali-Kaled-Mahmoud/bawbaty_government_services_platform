import CallToAction from "@/components/about/callToAction";
import Features from "@/components/about/features";
import Hero from "@/components/about/hero";
import Metrics from "@/components/about/metrics";
import Vision from "@/components/about/vision";

export const metadata = {
  title: "عن منصة بوابتي | المنصة الحكومية الموحدة",
  description:
    "تعرّف على منصة بوابتي، الرؤية الوطنية للتحول الرقمي وتجميع كافة الخدمات الحكومية في مكان واحد بأعلى معايير الأمان والكفاءة.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl">
      <Hero />
      <Metrics />
      <Vision />
      <Features />
      <CallToAction />
    </div>
  );
}
