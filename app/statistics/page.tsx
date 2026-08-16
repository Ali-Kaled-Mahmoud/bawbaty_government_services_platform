import React from "react";

const StatisticsPage = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            الوظيفة الرقابية القيادية
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">
            لوحة متابعة مؤشرات الأداء (KPIs)
          </h2>
          <p className="text-xs text-slate-500">
            رصد زمن الإنجاز وتحديد ثغرات الأداء (Bottlenecks) في الأقسام
          </p>
        </div>
        <button className="bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-900 transition flex items-center gap-2">
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
            className="lucide lucide-download w-4 h-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </svg>{" "}
          تصدير تقرير الأداء
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            متوسط زمن الإنجاز
          </p>
          <h3 className="text-2xl font-black text-teal-800">18 دقيقة</h3>
          <span className="text-[10px] text-emerald-600 font-bold">
            ↓ 12% تحسن عن الشهر السابق
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            المعاملات المنجزة اليوم
          </p>
          <h3 className="text-2xl font-black text-slate-800">1,420</h3>
          <span className="text-[10px] text-slate-400">توزعت على 8 فروع</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            نسبة الالتزام بالمواعيد
          </p>
          <h3 className="text-2xl font-black text-amber-600">94.2%</h3>
          <span className="text-[10px] text-amber-700 font-bold">
            تفادي التجمع والازدحام بنجاح
          </span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            سجلات التدقيق (Audit)
          </p>
          <h3 className="text-2xl font-black text-slate-800">8,902</h3>
          <span className="text-[10px] text-teal-600 font-bold">
            محفوطة وغير قابلة للتعديل
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
