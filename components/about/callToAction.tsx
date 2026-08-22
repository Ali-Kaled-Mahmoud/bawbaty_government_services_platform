import Link from "next/link";

const CallToAction = () => {
  return (
    <div>
      {/* 5. الدعوة للعمل (Call to Action) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/30 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold">
              جاهز للبدء وإنجاز معاملتك الآن؟
            </h3>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base leading-relaxed">
              قم بإنشاء حسابك في أقل من دقيقتين وقم بإجراء معاملاتك الحكومية بكل
              سرعة وسهولة من مكانك.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-3.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm transition-all shadow-md"
              >
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
