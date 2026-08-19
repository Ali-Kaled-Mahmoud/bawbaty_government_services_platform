"use client";

import ConfirmationCard from "@/components/appointments/confirmationCard";
import Form from "@/components/appointments/form";
import Hero from "@/components/appointments/hero";
import { useState } from "react";

export default function AppointmentsPage() {
  const [visitDate, setVisitDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Hero />
        {/* بطاقة تأكيد الحجز (تظهر عند النجاح) */}
        {isSubmitted ? (
          <ConfirmationCard
            bookingReference={bookingReference}
            setIsSubmitted={setIsSubmitted}
            visitDate={visitDate}
            selectedTimeSlot={selectedTimeSlot}
            fullName={fullName}
          />
        ) : (
          /* نموذج الحجز التفاعلي */
          <Form
            setIsSubmitted={setIsSubmitted}
            setBookingReference={setBookingReference}
            visitDate={visitDate}
            setVisitDate={setVisitDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            fullName={fullName}
            setFullName={setFullName}
          />
        )}
      </div>
    </div>
  );
}
