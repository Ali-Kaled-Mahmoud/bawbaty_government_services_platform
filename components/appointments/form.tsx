"use client";

import React, { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

interface Department {
  id: number;
  name: string;
  branch_name: string;
}

interface FormProps {
  onAppointmentCreated: () => void;
}

const Form = ({ onAppointmentCreated }: FormProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [department, setDepartment] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [loadingDepts, setLoadingDepts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const timeSlots = [
    { label: "09:00 ص", value: "09:00:00" },
    { label: "10:00 ص", value: "10:00:00" },
    { label: "11:00 ص", value: "11:00:00" },
    { label: "12:00 م", value: "12:00:00" },
    { label: "01:00 م", value: "13:00:00" },
    { label: "02:00 م", value: "14:00:00" },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments/`);
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          setErrorMessage("تعذر جلب قائمة الدوائر الحكومية.");
        }
      } catch {
        setErrorMessage("حدث خطأ أثناء الاتصال بالخادم.");
      } finally {
        setLoadingDepts(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("access_token") || localStorage.getItem("token");
    if (!token) {
      setErrorMessage("يرجى تسجيل الدخول لحجز موعد.");
      return;
    }

    if (!department || !visitDate || !selectedTimeSlot) {
      setErrorMessage("يرجى تعبئة جميع الحقول المطلوبة (الدائرة، التاريخ، الوقت).");
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedSlotObj = timeSlots.find((s) => s.label === selectedTimeSlot);
      const appointmentTimeFormatted = selectedSlotObj ? selectedSlotObj.value : "09:00:00";

      const payload = {
        department: parseInt(department),
        appointment_date: visitDate,
        appointment_time: appointmentTimeFormatted,
      };

      const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMessage("تم حجز الموعد بنجاح واضافته إلى جدولك.");
        setDepartment("");
        setVisitDate("");
        setSelectedTimeSlot("");
        onAppointmentCreated();
      } else {
        const errData = await response.json();
        setErrorMessage(errData.detail || "حدث خطأ أثناء حجز الموعد.");
      }
    } catch {
      setErrorMessage("حدث خطأ في الاتصال بالشبكة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
      <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
        حجز موعد جديد
      </h3>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. الدائرة الحكومية */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            الدائرة الحكومية <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={department}
            disabled={loadingDepts}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all disabled:opacity-50"
          >
            <option value="">
              {loadingDepts ? "جاري التحميل..." : "اختر الدائرة الحكومية..."}
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} - {dept.branch_name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. تاريخ الزيارة */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            تاريخ الزيارة <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="date"
            value={visitDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
          />
        </div>

        {/* 3. وقت الزيارة */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            وقت الزيارة <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.label;
              return (
                <button
                  key={slot.label}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot.label)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                    isSelected
                      ? "bg-teal-800 border-teal-800 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={!department || !visitDate || !selectedTimeSlot || isSubmitting}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs shadow transition cursor-pointer mt-2"
        >
          {isSubmitting ? "جاري تأكيد الحجز..." : "تأكيد حجز الموعد"}
        </button>
      </form>
    </section>
  );
};

export default Form;