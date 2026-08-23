import CallToAction from "@/components/about/callToAction";
import Features from "@/components/about/features";
import Hero from "@/components/about/hero";
import Metrics from "@/components/about/metrics";
import Vision from "@/components/about/vision";

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
