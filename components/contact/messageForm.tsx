"use client";

import { useState, FormEvent } from "react";

const MessageForm = () => {
  // بيانات نموذج التواصل
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("inquiry");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // حالات المعالجة والتغذية الراجعة
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // إرسال الطلب
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !nationalId || !phoneNumber || !message.trim()) {
      setError("يرجى تعبئة كافة الحقول الأساسية المطلوب إدخالها");
      return;
    }

    if (nationalId.length < 10) {
      setError("الرقم الوطني يجب أن يتكون من 10 أرقام على الأقل");
      return;
    }

    setIsLoading(true);

    try {
      // محاكاة إرسال الطلب إلى خادم API
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccess(true);
      // إعادة ضبط الحقول
      setFullName("");
      setNationalId("");
      setPhoneNumber("");
      setEmail("");
      setCategory("inquiry");
      setSubject("");
      setMessage("");
    } catch {
      setError(
        "تعذر إرسال الرسالة حالياً، يرجى المحاولة لاحقاً أو الاتصال بالرقم الموحد",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* نموذج إرسال التذكرة أو الاستفسار (الثلثان) */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              إرسال تذكرة دعم أو استفسار
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              قم بتعبئة نموذج التواصل وسيقوم فريق المختصين بالرد عليك وإفادتك في
              أقرب وقت.
            </p>
          </div>

          {/* تنبيه النجاح */}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm">
              <svg
                className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h5 className="font-bold">تم إرسال رسالتك بنجاح!</h5>
                <p className="text-xs text-emerald-700 mt-0.5">
                  تم إنشاء تذكرة رقم{" "}
                  <span className="font-semibold dir-ltr inline-block">
                    #TK-89421
                  </span>{" "}
                  وسيتواصل معك الفريق عبر الهاتف أو البريد الإلكتروني.
                </p>
              </div>
            </div>
          )}

          {/* تنبيه الخطأ */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
              <svg
                className="w-5 h-5 shrink-0 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
                  onChange={(e) =>
                    setNationalId(e.target.value.replace(/\D/g, ""))
                  }
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
                  البريد الإلكتروني{" "}
                  <span className="text-slate-400 font-normal">(اختياري)</span>
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
                <option value="technical">
                  مشكلة تقنية في الحساب أو التسجيل
                </option>
                <option value="complaint">تقديم شكوى أو ملاحظة</option>
                <option value="suggestion">اقتراح تطويري للمنصة</option>
              </select>
            </div>

            {/* عنوان الموضوع */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5">
                عنوان الموضوع{" "}
                <span className="text-slate-400 font-normal">(اختياري)</span>
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
    </>
  );
};

export default MessageForm;
