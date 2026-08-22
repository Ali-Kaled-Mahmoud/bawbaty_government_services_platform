const Metrics = () => {
  return (
    <div>
      {/* 2. الإحصائيات والأرقام (Key Metrics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center border-l border-slate-100 last:border-0 pl-4">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">
              +150
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              خـدمة إلكترونية
            </div>
          </div>
          <div className="text-center border-l border-slate-100 last:border-0 pl-4">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">
              +2M
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              مستخدم نشط
            </div>
          </div>
          <div className="text-center border-l border-slate-100 last:border-0 pl-4">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">
              99.9%
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              جاهزية واستقرار
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">
              24/7
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              دعم فني متواصل
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Metrics;
