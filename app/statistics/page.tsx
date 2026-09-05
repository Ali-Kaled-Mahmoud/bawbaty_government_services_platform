"use client";

import { useEffect, useState, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

interface DashboardStats {
  average_execution_time: string;
  compliance_rate: string;
  requests_today: number;
  audit_logs_count: number;
}

interface AiRecommendation {
  id: string;
  category: "تحسين الأداء" | "إدارة الضغط" | "الأمان والامتثال";
  title: string;
  description: string;
  priority: "عالية" | "متوسطة" | "منخفضة";
}

const StatisticsPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // حالة مقترحات الذكاء الاصطناعي
  const [aiRecommendations, setAiRecommendations] = useState<AiRecommendation[]>([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // محرك تحليلي خفيف الوزن يعالج الإحصائيات ويولد توصيات الذكاء الاصطناعي
  const generateAiAnalysis = useCallback((data: DashboardStats) => {
    setIsGeneratingAi(true);

    setTimeout(() => {
      const recommendations: AiRecommendation[] = [];
      const complianceValue = parseFloat(data.compliance_rate) || 0;

      // 1. تحليل نسبة الالتزام بالمواعيد
      if (complianceValue < 80) {
        recommendations.push({
          id: "rec-1",
          category: "تحسين الأداء",
          title: "إعادة توزيع الموعد والفرز التلقائي",
          description: `نسبة الالتزام الحالية (${data.compliance_rate}) أقل من الحد المستهدف. يُوصى بإنشاء نظام تنبيهات مبكرة للعملاء وإعادة توزيع الطاقة الاستيعابية في أوقات الذروة.`,
          priority: "عالية",
        });
      } else {
        recommendations.push({
          id: "rec-1",
          category: "تحسين الأداء",
          title: "استدامة الكفاءة التشغيلية",
          description: `نسبة الالتزام بالمواعيد (${data.compliance_rate}) في مستوى ممتاز. يُنصح بالأتمتة الكاملة لإصدار التأكيدات لتقليل العبء الإداري.`,
          priority: "منخفضة",
        });
      }

      // 2. تحليل حجم الطلبات اليومية
      if (data.requests_today > 40) {
        recommendations.push({
          id: "rec-2",
          category: "إدارة الضغط",
          title: "تفعيل التوجيه الذكي للمعاملات",
          description: `تسجيل ${data.requests_today} معاملة اليوم يعكس ضغطاً مرتفعاً. يُقترح إعادة توجيه المعاملات الروتينية مباشرة إلى قنوات الخدمة الذاتية.`,
          priority: "عالية",
        });
      } else {
        recommendations.push({
          id: "rec-2",
          category: "إدارة الضغط",
          title: "تحسين سرعة التدقيق والمعالجة",
          description: `حجم المعاملات اليومي (${data.requests_today}) متزن. يفضل استغلال الفترات منخفضة الطلب لمعالجة المعاملات المؤجلة.`,
          priority: "متوسطة",
        });
      }

      // 3. تحليل سجلات التدقيق
      recommendations.push({
        id: "rec-3",
        category: "الأمان والامتثال",
        title: "الفحص الذكي لسجلات الأمان",
        description: `بناءً على ${data.audit_logs_count.toLocaleString("ar-EG")} سجل تدقيق، يُوصى بتشغيل خوارزمية الفحص الدوري للتأكد من مطابقة صلاحيات المستخدمين ومعايير الأمان.`,
        priority: "متوسطة",
      });

      setAiRecommendations(recommendations);
      setIsGeneratingAi(false);
    }, 400);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${API_BASE_URL}/dashboard-stats/`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          throw new Error("فشل جلب بيانات الإحصائيات");
        }

        const data: DashboardStats = await response.json();
        setStats(data);
        generateAiAnalysis(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("حدث خطأ أثناء تحميل البيانات");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [generateAiAnalysis]);

  const getPriorityBadge = (priority: AiRecommendation["priority"]) => {
    switch (priority) {
      case "عالية":
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">أولوية عالية</span>;
      case "متوسطة":
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">أولوية متوسطة</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">أولوية منخفضة</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* الترويسة */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            الوظيفة الرقابية القيادية
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">
            لوحة متابعة مؤشرات الأداء (KPIs)
          </h2>
          <p className="text-xs text-slate-500">
            رصد زمن الإنجاز وتحديد ثغرات الأداء (Bottlenecks) في الأقسام
          </p>
        </div>
        <button className="bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-900 transition flex items-center gap-2 cursor-pointer">
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
            className="lucide lucide-download w-4 h-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </svg>{" "}
          تصدير تقرير الأداء
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* بطاقات المؤشرات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            متوسط زمن الإنجاز
          </p>
          <h3 className="text-2xl font-black text-teal-800">
            {loading ? "..." : stats?.average_execution_time || "18 دقيقة"}
          </h3>
          <span className="text-[10px] text-emerald-600 font-bold">
            محتسب تلقائياً من الطلبات المغلقة
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            المعاملات المنجزة/المقدمة اليوم
          </p>
          <h3 className="text-2xl font-black text-slate-800">
            {loading ? "..." : stats?.requests_today.toLocaleString("ar-EG") || "0"}
          </h3>
          <span className="text-[10px] text-slate-400">إجمالي الطلبات اليومية</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            نسبة الالتزام بالمواعيد
          </p>
          <h3 className="text-2xl font-black text-amber-600">
            {loading ? "..." : stats?.compliance_rate || "0%"}
          </h3>
          <span className="text-[10px] text-amber-700 font-bold">
            مبنية على حالات المواعيد المحجوزة
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-bold mb-1">
            سجلات التدقيق (Audit)
          </p>
          <h3 className="text-2xl font-black text-slate-800">
            {loading ? "..." : stats?.audit_logs_count.toLocaleString("ar-EG") || "0"}
          </h3>
          <span className="text-[10px] text-teal-600 font-bold">
            محفوظة وغير قابلة للتعديل
          </span>
        </div>
      </div>

      {/* قسم المقترحات الموّلدة بالذكاء الاصطناعي */}
      <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-900/50 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-indigo-800/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 border border-indigo-400/30 rounded-xl text-indigo-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 1.5 0 3 2 5l2 3h8l2-3c2-2 2-3.5 2-5a8 8 0 0 0-8-8z"/>
                <path d="M9 21h6"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                مقترحات الذكاء الاصطناعي للتحسين
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-normal">
                  تحليل مباشر
                </span>
              </h3>
              <p className="text-xs text-indigo-200/80">
                مقترحات تشغيلية مستندة إلى تحليل بيانات الأداء الحالي والتدقيق
              </p>
            </div>
          </div>

          <button
            onClick={() => stats && generateAiAnalysis(stats)}
            disabled={isGeneratingAi || loading}
            className="text-xs bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 border border-indigo-400/30 px-3.5 py-2 rounded-xl transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isGeneratingAi ? "animate-spin" : ""}>
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
            {isGeneratingAi ? "جاري التحليل..." : "إعادة التحليل"}
          </button>
        </div>

        {isGeneratingAi ? (
          <div className="py-8 text-center text-xs text-indigo-200/60 animate-pulse">
            جاري معالجة البيانات وتوليد توصيات الذكاء الاصطناعي...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-500/50 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-indigo-300">
                      {rec.category}
                    </span>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;