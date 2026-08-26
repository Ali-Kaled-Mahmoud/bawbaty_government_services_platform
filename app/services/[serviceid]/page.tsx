'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceConfirmationPage({ params }: PageProps) {
  // فك التغليف عن params لدعم إصدارات Next.js الحديثة
  const resolvedParams = use(params);
  const requestId = resolvedParams.id;

  const [copied, setCopied] = useState(false);

  // نسخ رقم التتبع للحافظة
  const handleCopy = () => {
    navigator.clipboard.writeText(requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* فتات الخبز (Breadcrumbs) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 print:hidden">
          <Link href="/" className="hover:text-teal-800 transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-teal-800 transition-colors">الخدمات</Link>
          <span>/</span>
          <span className="font-semibold text-slate-700">تأكيد إرسال الطلب</span>
        </div>

        {/* 1. بطاقة رقم التتبع المرجعي (Tracking Code Box) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-500 block">رقم المعاملة المرجعي (Tracking ID)</span>
              <span className="text-xl sm:text-2xl font-mono font-extrabold text-teal-900 tracking-wider">
                {requestId}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all print:hidden"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-700">تم النسخ!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>نسخ الرقم المرجعي</span>
                </>
              )}
            </button>
          </div>

          {/* جدول تفاصيل الطلب السريع */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block mb-1">حالة الطلب الحالية</span>
              <span className="font-bold text-amber-700 inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                قيد التدقيق والمطابقة
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block mb-1">تاريخ ووقت التقديم</span>
              <span className="font-semibold text-slate-800 dir-ltr text-right block">
                {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* 2. الخطوات التالية المطلوبة من المواطن (Next Steps Guidance) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-r-4 border-teal-800 pr-2">
            الخطوات التالية لتكملة المعاملة
          </h3>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-0.5">حجز موعد للمراجعة الميدانية</h4>
                <p className="leading-relaxed">
                  يتطلب استكمال المعاملة مطابقة الوثائق الأصلية وسداد الرسوم الميدانية في أقرب مركز حكومي.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-0.5">إحضار المستندات الثبوتية</h4>
                <p className="leading-relaxed">
                  يرجى اصطحاب البطاقة الشخصية الأصلية والأوراق المرفقة مع إشعار التتبع هذا عند الزيارة.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. أزرار التحكم والإجراءات (Action Buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/appointments?req=${requestId}`}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
             تأكيد إرسال الطلب
            </Link>

          </div>

          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-teal-800 transition-colors py-2"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>

      </div>
    </div>
  );
}