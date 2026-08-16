import React from "react";

const AppointmentsPage = () => {
  return (
    <section
      id="quick-book"
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
            className="lucide lucide-calendar w-6 h-6"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">حجز موعد جديد</h3>
          <p className="text-xs text-slate-500">
            اختر الدائرة والوقت المناسب لتفادي الازدحام
          </p>
        </div>
      </div>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            الدائرة الحكومية
          </label>
          <select
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">اختر الدائرة...</option>
            <option value="1">الشؤون المدنية </option>
            <option value="2">مديرية الهجرة والجوازات</option>
            <option value="3">السجل العقاري والتوثيق</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            نوع الخدمة
          </label>
          <select
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">اختر الخدمة...</option>
            <option value="1">إصدار / تجديد وثيقة</option>
            <option value="2">مطابقة الأوراق وتصديق المعاملات</option>
            <option value="3">استلام المخرجات الورقية</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            تاريخ الزيارة
          </label>
          <input
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            type="date"
          />
        </div>
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-4 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm"
          >
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
              className="lucide lucide-check-circle2 w-4 h-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>{" "}
            تأكيد الحجز الفوري
          </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentsPage;
