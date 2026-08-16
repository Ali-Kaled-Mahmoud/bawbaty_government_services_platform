'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  // حالة طريقة الدخول: كلمة المرور أو رمز التحقق المباشر OTP
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  
  // حقول نموذج كلمة المرور
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // حقول نموذج OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // حالات المعالجة والأخطاء
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // التعامل مع إرسال رمز OTP
  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nationalId || nationalId.length < 10) {
      setError('يرجى إدخال رقم وطني صحيح مكون من 10 أرقام على الأقل');
      return;
    }
    if (!phoneNumber || phoneNumber.length < 9) {
      setError('يرجى إدخال رقم هاتف محمول صحيح');
      return;
    }

    setIsLoading(true);
    try {
      // محاكاة طلب الـ API لإرسال رمز OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
    } catch {
      setError('تعذر إرسال رمز التحقق، يرجى المحاولة لاحقاً');
    } finally {
      setIsLoading(false);
    }
  };

  // التعامل مع تسجيل الدخول الرئيسي
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (loginMethod === 'password') {
        if (!nationalId || !password) {
          throw new Error('جميع الحقول مطلوبة');
        }
        // إرسال طلب تسجيل الدخول بالكلمة السرية إلى خادم Django
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } else {
        if (!otpCode || otpCode.length < 4) {
          throw new Error('يرجى إدخال رمز التحقق المكون من 4 أرقام');
        }
        // إرسال طلب التحقق من رمز OTP
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      // التوجيه للوحة التحكم أو الصفحة الرئيسية بعد النجاح
      router.push('/requests');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول، يرجى التأكد من البيانات');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 dir-rtl">
      {/* الترويسة الرئيسية والترويس الحكومية */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 mb-4">
          {/* شعار حكومي مبسط */}
          <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M12 3v6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          المنصة الحكومية الموحدة
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          بوابة الوصول الموحد للخدمات الرقمية الوطنية
        </p>
      </div>

      {/* بطاقة نموذج تسجيل الدخول */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-100 sm:px-10">
          
          {/* تبويب اختيار طريقة الدخول */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => { setLoginMethod('password'); setError(null); }}
              className={`flex-1 text-center py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                loginMethod === 'password'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              كلمة المرور
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod('otp'); setError(null); }}
              className={`flex-1 text-center py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                loginMethod === 'otp'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              رمز التحقق السريع (OTP)
            </button>
          </div>

          {/* تنبيه الأخطاء */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700 text-sm">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* النموذج الأول: الدخول بواسطة الرقم الوطني وكلمة المرور */}
          {loginMethod === 'password' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  الرقم الوطني / الهوية
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="أدخل الرقم الوطني المكون من 10 أرقام"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 w-4 h-4"
                  />
                  <span className="mr-2">تذكر هذا الجهاز</span>
                </label>
                <Link href="/forgot-password" className="text-emerald-700 hover:underline font-medium">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all disabled:opacity-60 flex justify-center items-center gap-2"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                تسجيل الدخول
              </button>
            </form>
          )}

          {/* النموذج الثاني: الدخول المباشر برمز التحقق OTP */}
          {loginMethod === 'otp' && (
            <div className="space-y-5">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      الرقم الوطني
                    </label>
                    <input
                      type="text"
                      required
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="أدخل الرقم الوطني"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      رقم الهاتف المحمول المسجل
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all disabled:opacity-60 flex justify-center items-center gap-2"
                  >
                    {isLoading && (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    إرسال رمز التحقق (SMS)
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-xs">
                    تم إرسال رمز التحقق إلى الرقم <span className="font-semibold dir-ltr inline-block">{phoneNumber}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5 text-center">
                      أدخل رمز التحقق المراد
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="• • • •"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-center text-xl font-bold tracking-widest text-slate-800 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 transition-all disabled:opacity-60 flex justify-center items-center gap-2"
                  >
                    {isLoading && (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    تأكيد الدخول
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
                  >
                    تغيير رقم الهاتف أو إعادة الإرسال
                  </button>
                </form>
              )}
            </div>
          )}

          {/* رابط إنشاء حساب جديد */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs sm:text-sm text-slate-600">
              ليس لديك حساب في المنصة؟{' '}
              <Link href="/signup" className="text-emerald-700 font-semibold hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}