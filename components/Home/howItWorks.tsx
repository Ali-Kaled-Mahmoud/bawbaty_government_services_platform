import React from "react";

const HowItWorks = () => {
  return (
    <div>
      {/* 5. كيف تعمل المنصة (How It Works) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-teal-900">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold">
              خطوات إنجاز معاملتك
            </h3>
            <p className="text-xs sm:text-sm text-teal-300 mt-1">
              نموذج الواجهة الرقمية والتنفيذ الميداني الميسر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
                1
              </div>
              <h5 className="font-bold text-sm mb-1">تقديم الطلب أونلاين</h5>
              <p className="text-xs text-teal-200/80 leading-relaxed">
                قم بتعبئة بياناتك الأساسية واختيار الخدمة والحصول على رقم تتبع
                مخصص.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-teal-800 border border-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h5 className="font-bold text-sm mb-1">حجز موعد المركز</h5>
              <p className="text-xs text-teal-200/80 leading-relaxed">
                حدّد المركز الحكومي القريب والوقت المفضل للزيارة لمطابقة
                الأوراق.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-teal-800 border border-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h5 className="font-bold text-sm mb-1">المطابقة والتسلم</h5>
              <p className="text-xs text-teal-200/80 leading-relaxed">
                قم بزيارة الموظف الميداني لتسليم الوثائق والدفع النقدي واستلام
                مستندك.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
