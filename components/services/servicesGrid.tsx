"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

type Service = {
  id: string | number;
  ministry?: string;
  badge?: string;
  title: string;
  description: string;
  duration?: string;
  fee?: string;
  [key: string]: unknown;
};

interface ServicesGridProps {
  filteredServices?: Service[];
  loading?: boolean;
  error?: string | null;
  onResetFilters?: () => void;
}

const ServicesGrid = ({
  filteredServices = [],
  loading = false,
  error = null,
  onResetFilters,
}: ServicesGridProps) => {
  const router = useRouter();

  // حالات التحكم بالنافذة المنبثقة والطلب
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");

  // إغلاق النافذة المنبثقة
  const handleCloseModal = () => {
    setSelectedService(null);
    setSubmitError(null);
    setNotes("");
  };

  // إرسال طلب الخدمة إلى الباك إند
  const handleConfirmRequest = async () => {
    if (!selectedService) return;

    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");

    if (!token) {
      alert("يرجى تسجيل الدخول أولاً للتمكن من تقديم طلب الخدمة.");
      router.push("/login");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await fetch(`${API_BASE_URL}/requests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service: selectedService.id,
          notes: notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || errorData.error || "حدث خطأ أثناء إرسال الطلب",
        );
      }

      handleCloseModal();
      // التوجيه إلى صفحة تأكيد الطلب
      router.push("/track");
    } catch (err: unknown) {
      console.error("خطأ أثناء إرسال الطلب:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "فشل إرسال الطلب، يرجى المحاولة لاحقاً.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* حالة التحميل Skeleton Loading */
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl p-6 border border-slate-200/70 animate-pulse h-64 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded-xl w-full mt-4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* حالة خطأ في الاتصال */
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
          <p className="text-red-700 font-semibold text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* عدد النتائج */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs sm:text-sm text-slate-500">
            تم العثور على{" "}
            <span className="font-bold text-slate-800">
              {filteredServices.length}
            </span>{" "}
            خدمة
          </p>
        </div>

        {/* الكروت */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      {service.ministry}
                    </span>
                    {service.badge && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500 mb-5">
                    <div>
                      <span className="block text-slate-400 text-[10px]">
                        مدة التنفيذ:
                      </span>
                      <span className="font-medium text-slate-700">
                        {service.duration}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">
                        الرسوم:
                      </span>
                      <span className="font-medium text-slate-700">
                        {service.fee}
                      </span>
                    </div>
                  </div>

                  {/* زر الفتح للنشرة المنبثقة */}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>ابدأ الخدمة</span>
                    <svg
                      className="w-4 h-4 rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* حالة عدم وجود نتائج */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              لم يتم العثور على أية خدمات
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              جرب البحث بمصطلحات أخرى أو اختر تصنيفاً مختلفاً من القائمة.
            </p>
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                إعادة ضبط الفلاتر
              </button>
            )}
          </div>
        )}
      </section>

      {/* ---------------- النافذة المنبثقة (Modal) ---------------- */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in dir-rtl">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative space-y-5 transform transition-all">
            {/* زر الإغلاق */}
            <button
              onClick={handleCloseModal}
              className="absolute left-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* عنوان النافذة ووسام الجهة */}
            <div>
              {selectedService.ministry && (
                <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full mb-2">
                  {selectedService.ministry}
                </span>
              )}
              <h2 className="text-xl font-bold text-slate-900 pl-6">
                {selectedService.title}
              </h2>
            </div>

            {/* تفاصيل الخدمة */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-400 mb-1">
                  وصف الخدمة
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-h-36 overflow-y-auto pl-1">
                  {selectedService.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">الرسوم</span>
                  <span className="font-bold text-slate-800">
                    {selectedService.fee || "مجاني"}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">
                    مدة التنفيذ
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedService.duration || "فوري"}
                  </span>
                </div>
              </div>

              {/* حقل إدخال الملاحظات */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ملاحظات إضافية على الطلب (اختياري)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أدخل أي ملاحظات ترغب في توضيحها للجهة المختصة..."
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                />
              </div>

              {/* رسالة الخطأ إن وجدت */}
              {submitError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  {submitError}
                </div>
              )}
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleConfirmRequest}
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>جاري تقديم الطلب...</span>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>تأكيد وطلب الخدمة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesGrid;