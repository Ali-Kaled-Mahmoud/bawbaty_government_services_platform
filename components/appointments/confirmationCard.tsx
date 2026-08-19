const ConfirmationCard = ({
  bookingReference,
  setIsSubmitted,
  visitDate,
  selectedTimeSlot,
  fullName,
}: {
  bookingReference: string;
  setIsSubmitted: (submitted: boolean) => void;
  visitDate: string;
  selectedTimeSlot: string;
  fullName: string;
}) => {
  return (
    <div>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-md text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          تم تأكيد الموعد بنجاح!
        </h3>
        <p className="text-xs text-slate-600">
          يرجى الاحتفاظ برقم التتبع وإبرازه لموظف استقبال الاستعلامات في المركز.
        </p>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-right text-xs space-y-2">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">رقم الموعد:</span>
            <span className="font-mono font-bold text-teal-800">
              {bookingReference}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">تاريخ ووقت الزيارة:</span>
            <span className="font-bold text-slate-800">
              {visitDate} - {selectedTimeSlot}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">اسم المراجع:</span>
            <span className="font-semibold text-slate-800">
              {fullName || "مواطن/مقيم"}
            </span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            حجز موعد آخر
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs transition-colors"
          >
            طباعة إشعار الحجز
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
