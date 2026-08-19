import Link from "next/link";

type Service = {
  id: string | number;
  ministry: string;
  badge?: string;
  title: string;
  description: string;
  duration: string;
  fee: string;
};

const ServicesGrid = ({
  filteredServices,
  onResetFilters,
}: {
  filteredServices: Service[];
  onResetFilters?: () => void;
}) => {
  return (
    <div>
      {/* 3. شبكة عرض الخدمات (Services Grid) */}
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
                  {/* الجهة والوسم */}
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

                  {/* عنوان الخدمة */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* الوصف */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* التفاصيل الإضافية والزر */}
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

                  <Link
                    href={`/services/${service.id}`}
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
                  </Link>
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
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ServicesGrid;
