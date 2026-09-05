"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

// تعريف أنواع البيانات
interface ServiceDetail {
  id?: number | string;
  name?: string;
  title?: string;
  department?:
    | {
        name?: string;
        branch_name?: string;
      }
    | string;
}

interface RequestItem {
  tracking_id: string;
  service: ServiceDetail | string;
  service_name?: string;
  department_name?: string;
  status:
    | "submitted"
    | "auditing"
    | "matching"
    | "closed"
    | "rejected"
    | string;
  payment_status?: boolean;
  created_at?: string;
}

export default function TrackPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // جلب الطلبات عند تحميل المكون من خادم Render
  useEffect(() => {
    const fetchUserRequests = async () => {
      const token =
        localStorage.getItem("access_token") || localStorage.getItem("token");

      // التحقق من تسجيل الدخول
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/requests/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setIsAuthenticated(false);
          return;
        }

        if (!response.ok) {
          throw new Error("تعذر جلب قائمة الطلبات من الخادم");
        }

        const data = await response.json();
        setRequests(data);
      } catch (err) {
        console.error("خطأ في جلب الطلبات:", err);
        setError(
          "حدث خطأ أثناء تحميل بيانات الطلبات. يرجى التأكد من الاتصال بالشبكة.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserRequests();
  }, []);

  // دالة تحويل رمز الحالة إلى نص عربي مخصص
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            تم تقديم الطلب
          </span>
        );
      case "auditing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            قيد التدقيق الإداري
          </span>
        );
      case "matching":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            جاهز للاستلام والمطابقة
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            مكتمل ومغلق
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            مرفوض
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            قيد المعالجة
          </span>
        );
    }
  };

  // دالة حساب ترتيب الخطوة بناءً على الحالة
  const getStepIndex = (status: string) => {
    switch (status) {
      case "submitted":
        return 1;
      case "auditing":
        return 2;
      case "matching":
        return 3;
      case "closed":
        return 4;
      default:
        return 1;
    }
  };

  /* 1. حالة غير مسجل الدخول */
  if (!isAuthenticated) {
    return (
      <section
        id="track-section"
        className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 text-center dir-rtl"
      >
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600 mb-4 border border-amber-200">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          يتطلب تسجيل الدخول
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
          يرجى تسجيل الدخول إلى حسابك لتتمكن من متابعة معاملاتك وطلباتك الحكومية
          المقدمة.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <span>تسجيل الدخول</span>
        </Link>
      </section>
    );
  }

  /* 2. حالة التحميل Skeleton Loading */
  if (loading) {
    return (
      <section
        id="track-section"
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4 dir-rtl"
      >
        <div className="h-6 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="border border-slate-200 rounded-xl p-5 space-y-4 animate-pulse">
          <div className="h-5 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="grid grid-cols-4 gap-3 my-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* 3. حالة وجود خطأ */
  if (error) {
    return (
      <section
        id="track-section"
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 dir-rtl"
      >
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-xs text-red-700 font-semibold mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="track-section"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 dir-rtl"
    >
      {/* الهيدر والعنوان */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-50 rounded-lg text-teal-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-text w-6 h-6"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" x2="8" y1="13" y2="13"></line>
            <line x1="16" x2="8" y1="17" y2="17"></line>
            <line x1="10" x2="8" y1="9" y2="9"></line>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            تتبع المعاملات الحالية
          </h3>
          <p className="text-xs text-slate-500">
            حالة ملفاتك الإدارية والتحديثات المباشرة الخاصة بك
          </p>
        </div>
      </div>

      {/* 4. حالة عدم وجود أي طلبات */}
      {requests.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-slate-700 mb-1">
            لا توجد طلبات مسجلة باسمك
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            يمكنك تقديم طلب جديد من خلال قائمة الخدمات المتاحة.
          </p>
          <Link
            href="/services"
            className="inline-block px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            تصفح الخدمات
          </Link>
        </div>
      ) : (
        /* قائمة الطلبات الخاصة بالمستخدم */
        <div className="space-y-6">
          {requests.map((item) => {
            const currentStep = getStepIndex(item.status);
            const serviceName =
              typeof item.service === "object"
                ? item.service?.name || item.service?.title
                : item.service_name || item.service || "طلب خدمة حكومية";

            return (
              <div
                key={item.tracking_id}
                className="border border-slate-200 rounded-xl p-5 hover:border-teal-300 transition bg-slate-50/50"
              >
                {/* رأس الطلب */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md mb-2 inline-block font-mono">
                      رقم التتبع: #
                      {String(item.tracking_id).slice(0, 13).toUpperCase()}
                    </span>
                    <h4 className="text-base font-bold text-slate-800">
                      {serviceName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                {/* شريط المراحل الاربع */}
                {item.status !== "rejected" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center my-6">
                    {/* المرحلة 1 */}
                    <div
                      className={`p-3 rounded-lg border text-xs font-bold ${
                        currentStep >= 1
                          ? "bg-white border-teal-200 text-teal-800"
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center mx-auto mb-1 ${
                          currentStep >= 1
                            ? "bg-teal-600 text-white"
                            : "bg-slate-300 text-slate-600"
                        }`}
                      >
                        1
                      </div>
                      <p>تقديم الطلب</p>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {currentStep > 1
                          ? "مكتمل"
                          : currentStep === 1
                            ? "المحطة الحالية"
                            : "معلق"}
                      </span>
                    </div>

                    {/* المرحلة 2 */}
                    <div
                      className={`p-3 rounded-lg border text-xs font-bold ${
                        currentStep >= 2
                          ? currentStep === 2
                            ? "bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-400/30"
                            : "bg-white border-teal-200 text-teal-800"
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center mx-auto mb-1 ${
                          currentStep >= 2
                            ? currentStep === 2
                              ? "bg-amber-500 text-white"
                              : "bg-teal-600 text-white"
                            : "bg-slate-300 text-slate-600"
                        }`}
                      >
                        2
                      </div>
                      <p>التدقيق الإداري</p>
                      <span className="text-[10px] font-normal">
                        {currentStep > 2
                          ? "مكتمل"
                          : currentStep === 2
                            ? "قيد المعالجة"
                            : "معلق"}
                      </span>
                    </div>

                    {/* المرحلة 3 */}
                    <div
                      className={`p-3 rounded-lg border text-xs font-bold ${
                        currentStep >= 3
                          ? currentStep === 3
                            ? "bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-400/30"
                            : "bg-white border-teal-200 text-teal-800"
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center mx-auto mb-1 ${
                          currentStep >= 3
                            ? currentStep === 3
                              ? "bg-amber-500 text-white"
                              : "bg-teal-600 text-white"
                            : "bg-slate-300 text-slate-600"
                        }`}
                      >
                        3
                      </div>
                      <p>المطابقة والاستلام</p>
                      <span className="text-[10px] font-normal">
                        {currentStep > 3
                          ? "مكتمل"
                          : currentStep === 3
                            ? "جاهز للمطابقة"
                            : "معلق"}
                      </span>
                    </div>

                    {/* المرحلة 4 */}
                    <div
                      className={`p-3 rounded-lg border text-xs font-bold ${
                        currentStep === 4
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-400/30"
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center mx-auto mb-1 ${
                          currentStep === 4
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-300 text-slate-600"
                        }`}
                      >
                        4
                      </div>
                      <p>إغلاق المعاملة</p>
                      <span className="text-[10px] font-normal">
                        {currentStep === 4 ? "تمت بنجاح" : "بانتظار الإتمام"}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* إشعار الرفض */
                  <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-l-xl my-4 text-xs text-red-900">
                    <p className="font-bold mb-1">تم رفض الطلب:</p>
                    نأسف، لم تستوفِ المعاملة بعض الشروط المطلوبة. يرجى التواصل
                    مع الدائرة المعنية لمعرفة السبب وتصحيح المرفقات.
                  </div>
                )}

                {/* صندوق التنبيه المخصص للمطابقة */}
                {item.status === "matching" && (
                  <div className="bg-amber-50/80 border-r-4 border-amber-500 p-4 rounded-l-xl flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-alert-circle w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <div className="text-xs text-amber-900 leading-relaxed">
                      <p className="font-bold text-amber-950 mb-0.5">
                        إشعار هام لإنهاء المعاملة:
                      </p>
                      يرجى الحضور إلى الدائرة الحكومية مصطحباً أصول الوثائق
                      (هوية شخصية + صور شخصية) لتسديد الرسوم نقدياً والتوقيع
                      الحي. لن يتم تحويل الطلب إلى &quot;مكتمل&quot; إلا بعد
                      المطابقة المادية.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}