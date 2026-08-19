import React, { useState } from "react";

const Form = ({
  setIsSubmitted,
  setBookingReference,
  visitDate,
  setVisitDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  fullName,
  setFullName,
}: {
  setIsSubmitted: (submitted: boolean) => void;
  setBookingReference: (reference: string) => void;
  visitDate: string;
  setVisitDate: (date: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
}) => {
  const [department, setDepartment] = useState("");
  const [service, setService] = useState("");
  const [nationalId, setNationalId] = useState("");

  // المواعيد المتاحة تلقائياً عند اختيار التاريخ

  const timeSlots = [
    "09:00 ص",
    "10:00 ص",
    "11:00 ص",
    "12:00 م",
    "01:00 م",
    "02:00 م",
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!department || !service || !visitDate || !selectedTimeSlot) return;

    // توليد رقم مرجعي عشوائي للموعد
    const randomRef = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingReference(randomRef);
    setIsSubmitted(true);
  };

  return (
    <div>
      <section
        id="quick-book"
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-teal-50 rounded-xl text-teal-700">
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
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              بيانات نموذج الحجز
            </h3>
            <p className="text-xs text-slate-500">
              قم بتعبئة التفاصيل التالية لتحديد موعد زيارة المركز الخدمي
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* قسم اختيار الدائرة والخدمة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                الدائرة الحكومية <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
              >
                <option value="">اختر الدائرة...</option>
                <option value="1">الشؤون المدنية</option>
                <option value="2">مديرية الهجرة والجوازات</option>
                <option value="3">السجل العقاري والتوثيق</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                نوع الخدمة <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
              >
                <option value="">اختر الخدمة...</option>
                <option value="1">إصدار / تجديد وثيقة</option>
                <option value="2">مطابقة الأوراق وتصديق المعاملات</option>
                <option value="3">استلام المخرجات الورقية</option>
              </select>
            </div>
          </div>

          {/* قسم بيانات المراجع الشخصية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                الرقم الوطني / رقم الهوية{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="10XXXXXXXX"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono dir-ltr text-right focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                اسم المراجع الثلاثي
              </label>
              <input
                type="text"
                placeholder="أدخل الاسم كما هو في الهوية"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* قسم اختيار تاريخ ووقت الزيارة */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  تاريخ الزيارة <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
                  type="date"
                />
              </div>
            </div>

            {/* اختيار الفترة الزمنية (Time Slot Chips) */}
            {visitDate && (
              <div className="pt-2 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  اختر الوقت المتاح: <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                          isSelected
                            ? "bg-teal-800 border-teal-800 text-white shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* زر التأكيد ورسائل الإرشاد */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-amber-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              يرجى الحضور قبل الموعد بـ 15 دقيقة مصحوباً بالوثائق الأصلية.
            </p>

            <button
              type="submit"
              disabled={
                !department || !service || !visitDate || !selectedTimeSlot
              }
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3 px-8 rounded-xl shadow transition flex items-center justify-center gap-2 text-xs sm:text-sm"
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
                className="lucide lucide-check-circle2 w-4 h-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              تأكيد الحجز الفوري
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
