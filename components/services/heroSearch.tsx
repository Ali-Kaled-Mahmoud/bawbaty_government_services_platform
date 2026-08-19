
const HeroSearch = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      {/* 1. قسم الترويسة الرئيسية والبحث (Hero & Search) */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[16px_16px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4">
            دليل الخدمات الحكومية الرقمية
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            دليل الخدمات الإلكترونية
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ابحث وانجز جميع معاملاتك وإجراءاتك الحكومية فورياً وبسهولة تامة من
            مكان واحد.
          </p>

          {/* شريط البحث المباشر */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن خدمة، جهة حكومية، أو كلمة مفتاحية..."
                className="w-full py-4 pr-12 pl-12 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
              {/* أيقونة البحث */}
              <svg
                className="w-6 h-6 text-slate-400 absolute right-4 pointer-events-none"
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

              {/* زر مسح النص */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-4 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-lg transition-colors"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSearch;
