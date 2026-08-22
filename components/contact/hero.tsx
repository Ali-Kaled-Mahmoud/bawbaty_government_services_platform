const Hero = () => {
  return (
    <div>
      {/* 1. قسم الترويسة الرئيسية */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[16px_16px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4">
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
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            مركز خدمة المستفيدين والدعم الفني
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            نحن هنا لخدمتك دائماً
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            يسعدنا استقبال استفساراتك، مقترحاتك، أو البلاغات الفنية لضمان تقديم
            أفضل تجربة إلكترونية حكومية.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
