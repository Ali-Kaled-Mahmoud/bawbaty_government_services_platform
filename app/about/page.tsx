import Link from 'next/link';

export const metadata = {
  title: 'عن منصة بوابتي | المنصة الحكومية الموحدة',
  description: 'تعرّف على منصة بوابتي، الرؤية الوطنية للتحول الرقمي وتجميع كافة الخدمات الحكومية في مكان واحد بأعلى معايير الأمان والكفاءة.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl">
      
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
            منصة <span className="text-emerald-400">بوابتي</span> للخدمات الحكومية الموحدة
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            بوابتك الرقمية الشاملة للوصول إلى كافة المعاملات والخدمات الحكومية بسهولة وأمان من مكان واحد، وفق رؤية استراتيجية تسعى لتبسيط حياة المواطنين والمقيمين.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
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

      {/* 2. الإحصائيات والأرقام (Key Metrics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center border-l border-slate-100 last:border-0 pl-4">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">+150</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">خـدمة إلكترونية</div>
          </div>
          <div className="text-center border-l border-slate-100 last:border-0 pl-4">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">+2M</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">مستخدم نشط</div>
          </div>
          <div className="text-center border-l border-slate-100 last:border-0 pl-4">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">99.9%</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">جاهزية واستقرار</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-700">24/7</div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">دعم فني متواصل</div>
          </div>
        </div>
      </section>

      {/* 3. الرؤية والرسالة والقيم (Vision & Mission) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">توجهاتنا الاستراتيجية</h2>
          <p className="mt-2 text-sm text-slate-600">نعمل وفق استراتيجية واضحة تضع المستفيد في قمة أولوياتها</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* الرؤية */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">رؤيتنا</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              أن نكون النموذج الرائد إقليمياً في تقديم الخدمات الحكومية الموحدة الذكية، والمحرك الأساسي للتحول الرقمي الشامل.
            </p>
          </div>

          {/* الرسالة */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">رسالتنا</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              تقديم خدمات حكومية ميسرة، سريعة وآمنة عبر تجربة مستخدم موحدة تقضي على البيروقراطية وتوفر الوقت والجهد على الجميع.
            </p>
          </div>

          {/* القيم */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">قيمنا الأساسية</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              الشفافية العالية، السرية والأمان، الابتكار المستمر، والتركيز الكامل على رضا المستفيد وخدمته بأعلى معايير الجودة.
            </p>
          </div>
        </div>
      </section>

      {/* 4. مميزات المنصة (Core Features) */}
      <section className="bg-slate-100/70 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">لماذا منصة &quot;بوابتي&quot;؟</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              تم بناء المنصة بأحدث التقنيات البرمجية لتضمن لك الوصول المباشر والسلس للخدمات دون الحاجة للتنقل بين المواقع المتباينة.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">هوية رقمية موحدة</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                حساب واحد يمنحك الوصول لجميع الوزارات والجهات الحكومية بدون الحاجة لإنشاء حسابات متعددة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">متابعة لحظية للطلبات</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                لوحة تحكم تفاعلية تتيح لك متابعة حالة جميع معاملاتك وتلقي الإشعارات الفورية عن أي تحديث.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">دفع إلكتروني آمن</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                بوابة تسديد موحدة تدعم مختلف وسائل الدفع الإلكتروني مع إصدار فواتير وسندات معتمدة فوراً.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">حماية وتشفير البيانات</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تطبيق أعلى معايير التشفير والأمان السيبراني للحفاظ على خصوصية وسلامة معلوماتك الشخصية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. الدعوة للعمل (Call to Action) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/30 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold">جاهز للبدء وإنجاز معاملتك الآن؟</h3>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base leading-relaxed">
              قم بإنشاء حسابك في أقل من دقيقتين وقم بإجراء معاملاتك الحكومية بكل سرعة وسهولة من مكانك.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm transition-all shadow-md"
              >
                إنشاء حساب جديد
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white border border-emerald-700 font-semibold text-sm transition-all"
              >
                تواصل مع الدعم الفني
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}