import Link from "next/link";

const Hero = () => {
  return (
    <div>
      {/* 1.قسم الترويسة الرئيسية (Hero Section) */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        {/* خلفية جمالية ممتدة */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[16px_16px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            منصة التحول الرقمي الوطني
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            منصة <span className="text-emerald-400">بوابتي</span> للخدمات
            الحكومية الموحدة
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            بوابتك الرقمية الشاملة للوصول إلى كافة المعاملات والخدمات الحكومية
            بسهولة وأمان من مكان واحد، وفق رؤية استراتيجية تسعى لتبسيط حياة
            المواطنين والمقيمين.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20"
            >
              انضم إلى المنصة
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
            >
              استكشف الخدمات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
