const TrackPage = () => {
  return (
    <section
      id="track-section"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-50 rounded-lg text-teal-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-text w-6 h-6"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <line x1="10" x2="8" y1="9" y2="9"></line>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            تتبع المعاملات الحالية
          </h3>
          <p className="text-xs text-slate-500">
            حالة ملفاتك الإدارية والتحديثات المباشرة
          </p>
        </div>
      </div>
      <div className="border border-slate-200 rounded-xl p-5 hover:border-teal-300 transition bg-slate-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md mb-2 inline-block">
              رقم التتبع: #REQ-2026-8941
            </span>
            <h4 className="text-base font-bold text-slate-800">
              طلب تجديد جواز السفر الإلكتروني
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              مديرية الشؤون المدنية - الفرع الرئيسي
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              جاهز للاستلام والمطابقة
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center my-6">
          <div className="p-3 bg-white rounded-lg border border-teal-200 text-teal-800">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center mx-auto mb-1">
              1
            </div>
            <p className="text-xs font-bold">تقديم الطلب</p>
            <span className="text-[10px] text-slate-400">مكتمل</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-teal-200 text-teal-800">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center mx-auto mb-1">
              2
            </div>
            <p className="text-xs font-bold">التدقيق الإداري</p>
            <span className="text-[10px] text-slate-400">مكتمل</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 text-amber-900 ring-2 ring-amber-400/30">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center mx-auto mb-1 font-bold">
              3
            </div>
            <p className="text-xs font-bold">المطابقة والاستلام</p>
            <span className="text-[10px] text-amber-700 font-semibold">
              المحطة الحالية
            </span>
          </div>
          <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-slate-400">
            <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-600 text-xs flex items-center justify-center mx-auto mb-1">
              4
            </div>
            <p className="text-xs font-bold">إغلاق المعاملة</p>
            <span className="text-[10px]">بانتظار الحضور</span>
          </div>
        </div>
        <div className="bg-amber-50/80 border-r-4 border-amber-500 p-4 rounded-l-xl flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-alert-circle w-5 h-5 text-amber-600 shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <div className="text-xs text-amber-900 leading-relaxed">
            <p className="font-bold text-amber-950 mb-0.5">
              إشعار هام لإنهاء المعاملة:
            </p>
            يرجى الحضور إلى الدائرة الحكومية مصطحباً أصول الوثائق (هوية شخصية +
            صور شخصية) لتسديد الرسوم نقدياً والتوقيع الحي. لن يتم تحويل الطلب
            إلى &quot;مكتمل&quot; إلا بعد المطابقة المادية.
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackPage;
