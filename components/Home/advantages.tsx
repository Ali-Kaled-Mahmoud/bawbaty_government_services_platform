import React from "react";

const Advantages = () => {
  return (
    <div>
      {/* 2. مميزات المنصة (Core Platform Advantages) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900">مميزات المنصة</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            أكثر ما يميز منصة بوابتي عن باقي المنصات الآخرى
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">
              سرعة استجابة فائقة
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              تصميم خفيف ومحسن خصيصاً ليراعي أصحاب السرعات المنخفضة (2G/3G) مع
              التحميل المباشر للبيانات.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">
              حجز مواعيد مسبقة
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              اختر الوقت والفرع المناسب لزيارتك وتفادَ طوابير الانتظار في
              المراكز الحكومية الخدمية.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1.5">
              تسديد وتوثيق ميداني
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              تسليم الوثائق المطلوبة واستكمال الدفع النقدي في المركز الميداني
              بكل سلاسة وأمان.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advantages;
