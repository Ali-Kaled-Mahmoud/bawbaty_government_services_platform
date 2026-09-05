"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // التحقق من التوكين لمعرفة ما إذا كان المستخدم مسجلاً لدخوله
  useEffect(() => {
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {/* 1. قسم الترويسة الرئيسية (Hero Banner) مع الحفاظ على الهوية البصرية */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-linear-to-r from-teal-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl">
            {/* وسم الشبكات الخفيفة */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-teal-700/80 text-teal-100 rounded-full text-xs font-semibold mb-4 border border-teal-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              منظومة موحدة ومهيأة للشبكات الخفيفة (2G/3G)
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 leading-tight text-white">
              مرحباً بك في بوابتك الحكومية السورية
            </h1>

            <p className="text-teal-100 text-sm sm:text-base mb-8 leading-relaxed">
              انجز معاملاتك، حجز مواعيدك، وتتبع ملفاتك بكل سهولة وبسرعة عالية حتى في أوقات ضعف الاتصال، مع خدمة التوثيق والاستلام المباشر في المراكز الميدانية.
            </p>

            {/* الأزرار الرئيسية */}
            <div className="flex flex-wrap items-center gap-3">
              {!isLoggedIn && (
                <Link
                  href="/signup"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar-plus"
                  >
                    <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <line x1="19" x2="19" y1="16" y2="22" />
                    <line x1="16" x2="22" y1="19" y2="19" />
                  </svg>
                  إنشاء حساب جديد
                </Link>
              )}

              <Link
                href="/services"
                className="bg-teal-950/60 hover:bg-teal-950 text-teal-100 border border-teal-700/60 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              >
                تصفح جميع الخدمات
              </Link>
            </div>
          </div>

          {/* أيقونة الدخل الجمالية خلف النص (Shield Icon) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-check absolute -left-10 -bottom-10 w-64 h-64 sm:w-80 sm:h-80 text-teal-700/25 pointer-events-none"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Hero;