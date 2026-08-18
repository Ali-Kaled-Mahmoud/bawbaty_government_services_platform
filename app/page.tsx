"use client";

// import { useState } from "react";
// import Link from "next/link";
import Hero from "@/components/Home/hero";
import Advantages from "@/components/Home/advantages";
import PopularServices from "@/components/Home/popularServices";
import HowItWorks from "@/components/Home/howItWorks";

export default function Home() {
  // const [trackingNumber, setTrackingNumber] = useState("");

  // const handleQuickTrack = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (trackingNumber.trim()) {
  //     window.location.href = `/requests?id=${encodeURIComponent(trackingNumber.trim())}`;
  //   }
  // };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl space-y-12 pb-16">
      <Hero />
      <Advantages />
      <PopularServices />
      <HowItWorks />
    </div>
  );
}
