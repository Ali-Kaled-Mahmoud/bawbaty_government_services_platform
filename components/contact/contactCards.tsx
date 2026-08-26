import Link from "next/link";

const ContactCards = () => {
  return (
    <>
      {/* بطاقات قنوات الاتصال والخدمات السريعة (الثلث الأول) */}
      <div className="lg:col-span-1 space-y-6">
        {/* الرقم الموحد */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                المركز الموحد للاتصال
              </h3>
              <p className="text-xl font-bold text-slate-900 dir-ltr text-right mt-0.5">
                19999
              </p>
              <p className="text-xs text-emerald-700 mt-0.5 font-medium">
                متاح على مدار 24 ساعة
              </p>
            </div>
          </div>
        </div>

        {/* البريد الإلكتروني وساعات العمل */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                البريد الإلكتروني للدعم
              </h4>
              <p className="text-xs text-slate-600 mt-1 dir-ltr text-right">
                support@bawabati.gov.sa
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                يتم الرد خلال 24 ساعة عمل
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                أوقات العمل الميداني
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                الأحد - الخميس: 8:00 ص - 4:00 م
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                المراكز الحكومية المباشرة
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                المقر الرئيسي
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                حي الوزارات، المجمع الحكومي الرقمي
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ContactCards;
