import Link from "next/link";
import React from "react";

const PopularServices = () => {
  return (
    <div>
      {/* 3. الأكثر استخداماً (Popular Services Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              أبرز الخدمات الإلكترونية
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              الخدمات الأكثر طلباً من قبل المواطنين والمقيمين
            </p>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition-colors"
          >
            عرض الكل
            <svg
              className="w-3.5 h-3.5 rotate-180"
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
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* خدمة 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between hover:border-teal-600 transition-all">
            <div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                الأحوال المدنية
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-3 mb-1">
                تجديد بطاقة الهوية الوطنية
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                تعبئة النموذج الرقمي، رفع الصورة الشخصية، وحجز موعد للتحقق
                النهائي.
              </p>
            </div>
            <Link
              href="/services/renew-id"
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1"
            >
              تقديم الطلب الآن ←
            </Link>
          </div>

          {/* خدمة 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between hover:border-teal-600 transition-all">
            <div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                المرور والنقل
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-3 mb-1">
                إصدار / تجديد رخصة القيادة
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                تقديم طلب التجديد وحجز موعد الفحص الطبي الميداني في المركز
                الموحد.
              </p>
            </div>
            <Link
              href="/services/issue-license"
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1"
            >
              تقديم الطلب الآن ←
            </Link>
          </div>

          {/* خدمة 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col justify-between hover:border-teal-600 transition-all">
            <div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                التوثيق والعقود
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-3 mb-1">
                توثيق العقود السكنية والتجارية
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                تسجيل بيانات العقد إلكترونياً واستكمال إجراءات المطابقة في
                الصندوق.
              </p>
            </div>
            <Link
              href="/services/lease-contract"
              className="mt-5 text-xs font-semibold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1"
            >
              تقديم الطلب الآن ←
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularServices;
