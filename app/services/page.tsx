'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// قائمة التصنيفات
const CATEGORIES = [
  { id: 'all', name: 'جميع الخدمات' },
  { id: 'identity', name: 'الأحوال المدنية والهوية' },
  { id: 'traffic', name: 'المرور والنقل' },
  { id: 'health', name: 'الصحة والأسرة' },
  { id: 'business', name: 'الأعمال والاستثمار' },
  { id: 'housing', name: 'العقارات والإسكان' },
];

// قائمة الخدمات الإلكترونية
const SERVICES_DATA = [
  {
    id: 'renew-id',
    title: 'تجديد بطاقة الهوية الوطنية',
    description: 'تجديد الهوية الوطنية للمواطنين إلكترونياً مع توصيل الوثيقة للموقع المسجل.',
    category: 'identity',
    ministry: 'وزارة الداخلية',
    duration: '3 - 5 أيام عمل',
    fee: 'مجانية',
    badge: 'الأكثر استخداماً',
  },
  {
    id: 'issue-license',
    title: 'إصدار/تجديد رخصة القيادة',
    description: 'خدمة تجديد رخص القيادة الخاصة بالمركبات وسداد الفحوصات الطبية إلكترونياً.',
    category: 'traffic',
    ministry: 'الإدارة العامة للمرور',
    duration: 'فوري',
    fee: '100 ر.س / سنة',
    badge: 'خدمة فورية',
  },
  {
    id: 'birth-certificate',
    title: 'إصدار شهادة الميلاد الرقمية',
    description: 'تسجيل المولود الجديد واستخراج وثيقة الميلاد وتوثيقها رسمياً عبر المنصة.',
    category: 'health',
    ministry: 'وزارة الصحة',
    duration: 'فوري',
    fee: 'مجانية',
    badge: '',
  },
  {
    id: 'commercial-register',
    title: 'إصدار السجل التجاري',
    description: 'تأسيس وبدء النشاط التجاري واستخراج السجل التجاري الإلكتروني للشركات والمؤسسات.',
    category: 'business',
    ministry: 'وزارة التجارة',
    duration: '10 دقائق',
    fee: '200 ر.س',
    badge: 'للأعمال',
  },
  {
    id: 'lease-contract',
    title: 'توثيق عقود الإيجار الموحدة',
    description: 'توثيق وتصديق العقود السكنية والتجارية إلكترونياً لضمان حقوق المؤجر والمستأجر.',
    category: 'housing',
    ministry: 'وزارة الإسكان',
    duration: 'فوري',
    fee: '125 ر.س',
    badge: '',
  },
  {
    id: 'passport-renew',
    title: 'تجديد جواز السفر الإلكتروني',
    description: 'طلب تجديد جواز السفر للمواطنين والتابعين مع خيار التوصيل للمنزل.',
    category: 'identity',
    ministry: 'المديرية العامة للجوازات',
    duration: '2 - 4 أيام عمل',
    fee: '300 ر.س / 5 سنوات',
    badge: '',
  },
  {
    id: 'vehicle-transfer',
    title: 'نقل ملكية المركبات',
    description: 'مبايعة ونقل ملكية المركبات بين الأفراد فورياً بعد استيفاء الشروط.',
    category: 'traffic',
    ministry: 'الإدارة العامة للمرور',
    duration: 'فوري',
    fee: '230 ر.س',
    badge: 'جديد',
  },
  {
    id: 'health-insurance',
    title: 'الاستعلام عن التأمين الصحي',
    description: 'التحقق من حالة وصلاحية ربط التأمين الصحي بالهوية الوطنية أو الإقامة.',
    category: 'health',
    ministry: 'مجلس الضمان الصحي',
    duration: 'فوري',
    fee: 'مجانية',
    badge: '',
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // تصفية الخدمات بحسب التصنيف وكلمة البحث
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.ministry.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl pb-20">
      
      {/* 1. قسم الترويسة الرئيسية والبحث (Hero & Search) */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4">
            دليل الخدمات الحكومية الرقمية
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            دليل الخدمات الإلكترونية
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ابحث وانجز جميع معاملاتك وإجراءاتك الحكومية فورياً وبسهولة تامة من مكان واحد.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              {/* زر مسح النص */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-lg transition-colors"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. شريط تصنيفات الخدمات (Category Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. شبكة عرض الخدمات (Services Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* عدد النتائج */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs sm:text-sm text-slate-500">
            تم العثور على <span className="font-bold text-slate-800">{filteredServices.length}</span> خدمة
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
                      <span className="block text-slate-400 text-[10px]">مدة التنفيذ:</span>
                      <span className="font-medium text-slate-700">{service.duration}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">الرسوم:</span>
                      <span className="font-medium text-slate-700">{service.fee}</span>
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>ابدأ الخدمة</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">لم يتم العثور على أية خدمات</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              جرب البحث بمصطلحات أخرى أو اختر تصنيفاً مختلفاً من القائمة.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </section>

      {/* 4. بنر تقديم المساعدة */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">لم تجد الخدمة التي تبحث عنها؟</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              تواصل مع الدعم الفني لمساعدتك أو الاستفسار عن متطلبات أي معاملة.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all"
          >
            التواصل مع الدعم
          </Link>
        </div>
      </section>

    </div>
  );
}