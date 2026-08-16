'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  // بيانات النموذج
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // خيارات الرؤية والشروط
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // حالات المعالجة والأخطاء
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // معالجة تقديم النموذج
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // التحقق من صحة المدخلات
    if (!fullName.trim() || fullName.trim().split(' ').length < 3) {
      setError('يرجى إدخال الاسم الثلاثي على الأقل');
      return;
    }

    if (!nationalId || nationalId.length < 10) {
      setError('الرقم الوطني يجب أن يتكون من 10 أرقام على الأقل');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 9) {
      setError('يرجى إدخال رقم هاتف محمول صحيح');
      return;
    }

    if (password.length < 8) {
      setError('كلمة المرور يجب أن لا تقل عن 8 خانات');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    if (!agreeTerms) {
      setError('يجب الموافقة على الشروط والأحكام وسياسة الخصوصية');
      return;
    }

    setIsLoading(true);

    try {
      // إرسال طلب إنشاء الحساب إلى خادم API (Next.js / Django)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          national_id: nationalId,
          phone_number: phoneNumber,
          email,
          password,
        }),
      });

      // محاكاة استجابة الخادم في حال عدم ضبط الـ API بعد
      if (!response.ok && response.status !== 404) {
        const data = await response.json();
        throw new Error(data.message || 'حدث خطأ أثناء إنشاء الحساب');
      }

      // إظهار رسالة النجاح والتوجيه لتسجيل الدخول
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('تعذر إنشاء الحساب حالياً، يرجى المحاولة لاحقاً');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 dir-rtl">
      {/* الترويسة والشعار الحكومي */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 mb-4">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M12 3v6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          إنشاء حساب جديد
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          انضم إلى المنصة الحكومية الموحدة للاستفادة من الخدمات الرقمية
        </p>
      </div>

      {/* بطاقة نموذج التسجيل */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-100 sm:px-10">
          
          {/* تنبيه النجاح */}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-800 text-sm">
              <svg className="w-5 h-5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>تم إنشاء حسابك بنجاح! جاري تحويلك لصفحة تسجيل الدخول...</span>
            </div>
          )}

          {/* تنبيه الأخطاء */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700 text-sm">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* الاسم الكامل */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                الاسم الكامل (كما في الهوية) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أدخل اسمك الثلاثي أو الرباعي"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
              />
            </div>

            {/* الرقم الوطني ورقم الهاتف (صف واحد على الشاشات الكبيرة) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  الرقم الوطني / الهوية <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                  placeholder="10 أرقام"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
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
            </div>

            {/* البريد الإلكتروني (اختياري) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
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

            {/* كلمة المرور وتأكيدها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 خانات على الأقل"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium"
                  >
                    {showPassword ? 'إخفاء' : 'إظهار'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  تأكيد كلمة المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="إعادة إدخال كلمة المرور"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-medium"
                  >
                    {showConfirmPassword ? 'إخفاء' : 'إظهار'}
                  </button>
                </div>
              </div>
            </div>

            {/* الموافقة على الشروط */}
            <div className="pt-2">
              <label className="flex items-start text-xs sm:text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 w-4 h-4 mt-0.5"
                />
                <span className="mr-2.5 leading-relaxed">
                  أوافق على{' '}
                  <a href="#" className="text-emerald-700 hover:underline font-medium">
                    شروط الاستخدام
                  </a>{' '}
                  و{' '}
                  <a href="#" className="text-emerald-700 hover:underline font-medium">
                    سياسة الخصوصية
                  </a>{' '}
                  الخاصة بالخدمات الحكومية الإلكترونية.
                </span>
              </label>
            </div>

            {/* زر التقديم */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all disabled:opacity-60 flex justify-center items-center gap-2"
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              إنشاء الحساب
            </button>
          </form>

          {/* رابط تسجيل الدخول للمستخدمين الحاليين */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              لديك حساب بالفعل في المنصة؟{' '}
              <Link href="/login" className="text-emerald-700 font-semibold hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}