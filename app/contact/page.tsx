'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  // بيانات نموذج التواصل
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // حالات المعالجة والتغذية الراجعة
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // إرسال الطلب
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !nationalId || !phoneNumber || !message.trim()) {
      setError('يرجى تعبئة كافة الحقول الأساسية المطلوب إدخالها');
      return;
    }

    if (nationalId.length < 10) {
      setError('الرقم الوطني يجب أن يتكون من 10 أرقام على الأقل');
      return;
    }

    setIsLoading(true);

    try {
      // محاكاة إرسال الطلب إلى خادم API
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccess(true);
      // إعادة ضبط الحقول
      setFullName('');
      setNationalId('');
      setPhoneNumber('');
      setEmail('');
      setCategory('inquiry');
      setSubject('');
      setMessage('');
    } catch {
      setError('تعذر إرسال الرسالة حالياً، يرجى المحاولة لاحقاً أو الاتصال بالرقم الموحد');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl pb-16">
      
      {/* 1. قسم الترويسة الرئيسية */}
      <section className="bg-slate-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[16px_16px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            مركز خدمة المستفيدين والدعم الفني
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            نحن هنا لخدمتك دائماً
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            يسعدنا استقبال استفساراتك، مقترحاتك، أو البلاغات الفنية لضمان تقديم أفضل تجربة إلكترونية حكومية.
          </p>
        </div>
      </section>

      {/* 2. المحتوى الرئيسي: معلومات الاتصال + النموذج */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* بطاقات قنوات الاتصال والخدمات السريعة (الثلث الأول) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* الرقم الموحد */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">المركز الموحد للاتصال</h3>
                  <p className="text-xl font-bold text-slate-900 dir-ltr text-right mt-0.5">19999</p>
                  <p className="text-xs text-emerald-700 mt-0.5 font-medium">متاح على مدار 24 ساعة</p>
                </div>
              </div>
            </div>

            {/* البريد الإلكتروني وساعات العمل */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">البريد الإلكتروني للدعم</h4>
                  <p className="text-xs text-slate-600 mt-1 dir-ltr text-right">support@bawabati.gov.sa</p>
                  <p className="text-xs text-slate-400 mt-0.5">يتم الرد خلال 24 ساعة عمل</p>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">أوقات العمل الميداني</h4>
                  <p className="text-xs text-slate-600 mt-1">الأحد - الخميس: 8:00 ص - 4:00 م</p>
                  <p className="text-xs text-slate-400 mt-0.5">المراكز الحكومية المباشرة</p>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">المقر الرئيسي</h4>
                  <p className="text-xs text-slate-600 mt-1">حي الوزارات، المجمع الحكومي الرقمي</p>
                </div>
              </div>

            </div>

            {/* بطاقة الأسئلة الشائعة */}
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-700/30 rounded-full blur-xl pointer-events-none" />
              <h4 className="font-bold text-base">تبحث عن إجابة سريعة؟</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                راجع قاعدة المعرفة والأسئلة الشائعة للحصول على إجابات فورية لأبرز الاستفسارات.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white transition-colors pt-1"
              >
                <span>الانتقال للأسئلة الشائعة</span>
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

          </div>

          {/* نموذج إرسال التذكرة أو الاستفسار (الثلثان) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900">إرسال تذكرة دعم أو استفسار</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  قم بتعبئة نموذج التواصل وسيقوم فريق المختصين بالرد عليك وإفادتك في أقرب وقت.
                </p>
              </div>

              {/* تنبيه النجاح */}
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm">
                  <svg className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h5 className="font-bold">تم إرسال رسالتك بنجاح!</h5>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      تم إنشاء تذكرة رقم <span className="font-semibold dir-ltr inline-block">#TK-89421</span> وسيتواصل معك الفريق عبر الهاتف أو البريد الإلكتروني.
                    </p>
                  </div>
                </div>
              )}

              {/* تنبيه الخطأ */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
                  <svg className="w-5 h-5 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* الاسم ورقم الهوية */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="أدخل اسمك الثلاثي"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                      الرقم الوطني / الهوية <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                      placeholder="أدخل الرقم الوطني"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* الهاتف والبريد */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                      رقم الهاتف المحمول <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all text-left dir-ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                      البريد الإلكتروني <span className="text-slate-400 font-normal">(اختياري)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all text-left dir-ltr"
                    />
                  </div>
                </div>

                {/* نوع الرسالة/التصنيف */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    نوع الطلب / الاستفسار <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all bg-white"
                  >
                    <option value="inquiry">استفسار عام عن خدمة</option>
                    <option value="technical">مشكلة تقنية في الحساب أو التسجيل</option>
                    <option value="complaint">تقديم شكوى أو ملاحظة</option>
                    <option value="suggestion">اقتراح تطويري للمنصة</option>
                  </select>
                </div>

                {/* عنوان الموضوع */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    عنوان الموضوع <span className="text-slate-400 font-normal">(اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="ملخص قصير لنص الرسالة"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
                  />
                </div>

                {/* نص الرسالة */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                    تفاصيل الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب تفاصيل استفسارك أو المشكلة التي تواجهك بشكل واضح..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all resize-none"
                  />
                </div>

                {/* زر التقديم */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all disabled:opacity-60 flex justify-center items-center gap-2"
                >
                  {isLoading && (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  إرسال الرسالة
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}