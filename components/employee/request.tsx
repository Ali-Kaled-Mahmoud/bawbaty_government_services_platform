import { DBRequest } from "@/app/(employee)/dashboard/page";

type RequestProps = {
  selectedRequest: DBRequest | null;
  cashCollected: boolean;
  isUpdating: boolean;
  handleStatusChange: (newStatus: DBRequest["status"]) => void;
  handleApproveAndCollect: () => void;
};

const STATUS_OPTIONS: { value: DBRequest["status"]; label: string }[] = [
  { value: "submitted", label: "تقديم الطلب" },
  { value: "auditing", label: "التدقيق الإداري" },
  { value: "matching", label: "المطابقة والاستلام" },
  { value: "closed", label: "إغلاق المعاملة" },
  { value: "rejected", label: "مرفوض" },
];

const Request = ({
  selectedRequest,
  cashCollected,
  isUpdating,
  handleStatusChange,
  handleApproveAndCollect,
}: RequestProps) => {
  return (
    <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between min-h-125">
      {selectedRequest ? (
        <div>
          {/* ترويسة تفاصيل المعاملة */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
            <div>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                {selectedRequest.status_display}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">
                {selectedRequest.service_name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                رقم التتبع:{" "}
                <span className="font-mono font-bold">
                  {selectedRequest.tracking_id}
                </span>
              </p>
            </div>

            <div className="text-left dir-ltr">
              <div className="text-xs font-bold text-slate-400">
                تاريخ التقديم
              </div>
              <div className="text-xs font-semibold text-slate-700">
                {new Date(selectedRequest.created_at).toLocaleDateString(
                  "ar-SA",
                )}
              </div>
            </div>
          </div>

          {/* بيانات المراجع */}
          <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">
                اسم المراجع:
              </span>
              <strong className="text-slate-800">
                {selectedRequest.citizen_name || "غير محدد"}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">
                الرقم الوطني / الهوية:
              </span>
              <strong className="text-slate-800 font-mono">
                {selectedRequest.citizen_national_id || "غير محدد"}
              </strong>
            </div>
          </div>

          {/* قسم الاستلام النقدي والرسوم */}
          <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/80 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-amber-900">
                  الرسوم المطلوبة للتحصيل النقدي
                </h4>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  حالة الدفع الآن:{" "}
                  <strong>
                    {selectedRequest.payment_status
                      ? "تم المدفوع"
                      : "غير مدفوع"}
                  </strong>
                </p>
              </div>
              <div className="text-xl font-extrabold text-amber-900 dir-ltr">
                {selectedRequest.service_fees || "مجانية"}
              </div>
            </div>
          </div>

          {cashCollected && (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl mb-4 font-bold text-center animate-pulse">
              ✓ تم تحصيل المبلغ النقدي وإغلاق المعاملة بنجاح!
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400 text-xs">
          اختر معاملة من القائمة للبدء بالتدقيق والاستلام
        </div>
      )}

      {/* منطقة التحكم بحالة الطلب للموظف */}
      {selectedRequest && (
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
              تحديث حالة الطلب:
            </label>
            <select
              value={selectedRequest.status}
              disabled={isUpdating}
              onChange={(e) =>
                handleStatusChange(e.target.value as DBRequest["status"])
              }
              className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 border-solid cursor-pointer disabled:opacity-50"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => handleStatusChange("rejected")}
              disabled={isUpdating || selectedRequest.status === "rejected"}
              className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              رفض المعاملة / نواقص
            </button>

            <button
              onClick={handleApproveAndCollect}
              disabled={isUpdating || selectedRequest.status === "closed"}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              اعتماد وتحصيل نقدي (إغلاق)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
