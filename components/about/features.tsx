import React from "react";

const Features = () => {
  return (
    <div>
      {/* 4. مميزات المنصة (Core Features) */}
      <section className="bg-slate-100/70 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              لماذا منصة &quot;بوابتي&quot;؟
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              تم بناء المنصة بأحدث التقنيات البرمجية لتضمن لك الوصول المباشر
              والسلس للخدمات دون الحاجة للتنقل بين المواقع المتباينة.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">
                هوية رقمية موحدة
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                حساب واحد يمنحك الوصول لجميع الوزارات والجهات الحكومية بدون
                الحاجة لإنشاء حسابات متعددة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">
                متابعة لحظية للطلبات
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                لوحة تحكم تفاعلية تتيح لك متابعة حالة جميع معاملاتك وتلقي
                الإشعارات الفورية عن أي تحديث.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">
                دفع إلكتروني آمن
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                بوابة تسديد موحدة تدعم مختلف وسائل الدفع الإلكتروني مع إصدار
                فواتير وسندات معتمدة فوراً.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">
                حماية وتشفير البيانات
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تطبيق أعلى معايير التشفير والأمان السيبراني للحفاظ على خصوصية
                وسلامة معلوماتك الشخصية.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
