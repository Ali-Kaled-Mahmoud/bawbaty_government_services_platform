"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

// تعريف الواجهة لتطابق نموذج Complaint ومحول ComplaintSerializer
interface ComplaintItem {
  id: number;
  subject: string;
  description: string;
  status: "pending" | "in_progress" | "resolved";
  ai_classification?: string | null;
  created_at: string;
  citizen_name?: string;
}

export default function ComplaintsPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // جلب سجل شكاوى المستخدم الجاري من خادم Render
  const fetchComplaints = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/complaints/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("تعذر جلب سجل الشكاوى، يرجى التأكد من تسجيل الدخول.");
      }

      const data: ComplaintItem[] = await res.json();
      setComplaints(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComplaints();
  }, [fetchComplaints]);

  // إرسال شكوى جديدة إلى backend على Render
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!subject.trim() || !description.trim()) {
      setError("يرجى ملء كافة الحقول المطلوبة.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/complaints/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          description,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "حدث خطأ أثناء إرسال الشكوى.");
      }

      const createdComplaint: ComplaintItem = await res.json();
      
      // إضافتها أعلى القائمة وتحديث الواجهة
      setComplaints((prev) => [createdComplaint, ...prev]);
      setSubject("");
      setDescription("");
      setSuccess("تم إرسال الشكوى بنجاح وستتم مراجعتها قريباً.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // شارة عرض حالة الشكوى
  const renderStatusBadge = (status: ComplaintItem["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-md">
            قيد الانتظار
          </span>
        );
      case "in_progress":
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-md">
            قيد المعالجة
          </span>
        );
      case "resolved":
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-md">
            تم الحل
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 dir-rtl">
      {/* الترويسة الرئيسية */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
          بوابة خدمة المواطنين
        </span>
        <h1 className="text-xl font-bold text-slate-900 mt-2">تقديم شكوى أو اقتراح</h1>
        <p className="text-xs text-slate-500 mt-1">
          يمكنك إرسال الشكاوى والملاحظات الخاصة بالخدمات الحكومية ومتابعة حالة معالجتها بشكل مباشر.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* نموذج تقديم الشكوى */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
            إرسال شكوى جديدة
          </h2>

          {error && (
            <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                عنوان الشكوى <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="مثال: تأخير في معالجة طلب تجديد رخصة"
                maxLength={255}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تفاصيل الشكوى <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="قم بشرح كافة التفاصيل المتعلقة بالشكوى هنا..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الشكوى"}
            </button>
          </form>
        </div>

        {/* سجل الشكاوى المقدمة */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm min-h-125 flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
            سجل الشكاوى الخاصة بي
          </h2>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
              جاري تحميل الشكاوى...
            </div>
          ) : complaints.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
              لا توجد لديك أي شكاوى مقدمة حالياً.
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-130 pr-1">
              {complaints.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xs font-bold text-slate-800">
                      {item.subject}
                    </h3>
                    {renderStatusBadge(item.status)}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3 whitespace-pre-line">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200/50 pt-2">
                    <span>
                      تاريخ الإرسال:{" "}
                      {new Date(item.created_at).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>

                    {item.ai_classification && (
                      <span className="bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-mono">
                        تصنيف الذكاء الاصطناعي: {item.ai_classification}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}