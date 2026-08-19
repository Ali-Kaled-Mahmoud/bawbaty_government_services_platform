import React from "react";

const Hero = () => {
  return (
    <div>
      {/* ترويسة الصفحة والهوية البصرية */}
      <div className="bg-linear-to-r from-teal-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-teal-700/80 text-teal-100 rounded-full text-xs font-semibold mb-3 border border-teal-600">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            خدمة حجز المواعيد الميدانية المباشرة
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white">
            حجز موعد جديد
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            اختر الدائرة والوقت المناسب لتفادي الازدحام، واستكمل إجراءات
            المطابقة واستلام المخرجات الورقية وسداد الرسوم الميدانية في المركز
            الموحد.
          </p>
        </div>

        {/* أيقونة تقويم خلفية تتبع الهوية البصرية */}
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
          className="lucide lucide-calendar absolute -left-6 -bottom-6 w-48 h-48 text-teal-700/30 pointer-events-none"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
