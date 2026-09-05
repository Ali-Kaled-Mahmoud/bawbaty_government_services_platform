"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Form from "@/components/appointments/form";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

interface AppointmentItem {
  id: number;
  department_name: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // جلب مواعيد المستخدم عبر خادم Render
  const fetchAppointments = useCallback(async () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/appointments/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error("خطأ أثناء جلب المواعيد:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAppointments();
  }, [fetchAppointments]);

  // إلغاء موعد عبر خادم Render
  const handleCancelAppointment = async (id: number) => {
    if (!confirm("هل أنت تأكد من رغبتك في إلغاء هذا الموعد؟")) return;

    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "canceled" }),
      });

      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error("خطأ في إلغاء الموعد:", err);
    }
  };

  const renderStatusBadge = (status: AppointmentItem["status"]) => {
    switch (status) {
      case "pending":
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-md font-bold">قيد الانتظار</span>;
      case "confirmed":
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-md font-bold">مؤكد</span>;
      case "completed":
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-md font-bold">مكتمل</span>;
      case "canceled":
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-2.5 py-1 rounded-md font-bold">ملغي</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4">
        <h3 className="text-base font-bold text-slate-800">يتطلب تسجيل الدخول</h3>
        <p className="text-xs text-slate-500">يرجى تسجيل الدخول لعرض لوحة تحكم المواعيد الخاصة بك.</p>
        <Link href="/login" className="inline-block px-6 py-2.5 bg-teal-800 text-white rounded-xl text-xs font-bold">
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 dir-rtl">
      {/* الترويسة الرئيسية والإحصائيات */}
      <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold">لوحة تحكم المواعيد</h1>
          <p className="text-xs text-teal-100 mt-1">إدارة وحجز مواعيد الزيارات الميدانية للدوائر الحكومية</p>
        </div>
        <div className="flex gap-4 text-center">
          <div className="bg-teal-800/80 px-4 py-2 rounded-xl border border-teal-700">
            <span className="block text-lg font-bold">{appointments.length}</span>
            <span className="text-[10px] text-teal-200">إجمالي المواعيد</span>
          </div>
          <div className="bg-teal-800/80 px-4 py-2 rounded-xl border border-teal-700">
            <span className="block text-lg font-bold text-amber-300">
              {appointments.filter((a) => a.status === "pending" || a.status === "confirmed").length}
            </span>
            <span className="text-[10px] text-teal-200">المواعيد القادمة</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* نموذج حجز موعد جديد */}
        <div className="lg:col-span-5">
          <Form onAppointmentCreated={fetchAppointments} />
        </div>

        {/* قائمة المواعيد المحجوزة */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-125 flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
            سجل المواعيد الخاص بي
          </h2>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">جاري التحميل...</div>
          ) : appointments.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400">لا توجد لديك مواعيد محجوزة حالياً.</div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-125 pr-1">
              {appointments.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-800">{item.department_name}</h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      التاريخ: {item.appointment_date} | الوقت: {item.appointment_time}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {renderStatusBadge(item.status)}
                    {(item.status === "pending" || item.status === "confirmed") && (
                      <button
                        onClick={() => handleCancelAppointment(item.id)}
                        className="text-[11px] text-rose-600 hover:text-rose-800 font-bold border border-rose-200 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition"
                      >
                        إلغاء
                      </button>
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