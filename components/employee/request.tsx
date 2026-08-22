type RequestDocument = {
  name: string;
  verified: boolean;
};

type SelectedRequest = {
  serviceTitle: string;
  trackingNumber: string;
  submittedAt: string;
  citizenName: string;
  nationalId: string;
  documents: RequestDocument[];
  feeAmount: string | number;
  status: string;
};

type RequestProps = {
  selectedRequest: SelectedRequest | null;
  toggleDocVerification: (index: number) => void;
  cashCollected: boolean;
  handleReject: () => void;
  handleApproveAndCollect: () => void;
};

const Request = ({
  selectedRequest,
  toggleDocVerification,
  cashCollected,
  handleReject,
  handleApproveAndCollect,
}: RequestProps) => {
  return (
    <>
      {/* العمود الأيسر: تفاصيل الطلب، التدقيق المستندي، والتحصيل (7 أعمدة) */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between min-h-162.5">
        {selectedRequest ? (
          <div>
            {/* ترويسة تفاصيل المعاملة */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  معد للتحقق الميداني
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedRequest.serviceTitle}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  رقم التتبع:{" "}
                  <span className="font-mono font-bold">
                    {selectedRequest.trackingNumber}
                  </span>
                </p>
              </div>

              <div className="text-left dir-ltr">
                <div className="text-xs font-bold text-slate-400">
                  تاريخ التقديم
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  {selectedRequest.submittedAt}
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
                  {selectedRequest.citizenName}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  الرقم الوطني / الهوية:
                </span>
                <strong className="text-slate-800 font-mono">
                  {selectedRequest.nationalId}
                </strong>
              </div>
            </div>

            {/* قائمة المستندات المطلوبة للتدقيق يدويًا */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-teal-600"
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
                مطابقة الأوراق والوثائق الأصلية:
              </h3>

              <div className="space-y-2">
                {selectedRequest.documents.map((doc, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      doc.verified
                        ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={doc.verified}
                        onChange={() => toggleDocVerification(idx)}
                        className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                    <span className="text-[10px] font-bold">
                      {doc.verified ? "مُطابق ورسمي" : "بانتظار الفحص الورقي"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* قسم الاستلام النقدي (Cash Collection) */}
            <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/80 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">
                    الرسوم المطلوبة للتحصيل النقدي
                  </h4>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    يتم استلام المبلغ نقداً في الصندوق وتفريغه بالنظام
                  </p>
                </div>
                <div className="text-xl font-extrabold text-amber-900 dir-ltr">
                  {selectedRequest.feeAmount}{" "}
                  <span className="text-xs">ل.س.ج</span>
                </div>
              </div>
            </div>

            {cashCollected && (
              <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl mb-4 font-bold text-center animate-pulse">
                ✓ تم تحصيل المبلغ النقدي وتحديث سجل المعاملة بنجاح!
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-xs">
            اختر معاملة من القائمة للبدء بالتدقيق والاستلام
          </div>
        )}

        {/* أزرار اتخاذ القرار وإغلاق المعاملة */}
        {selectedRequest && (
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3 justify-end">
            <button
              onClick={handleReject}
              disabled={selectedRequest.status === "REJECTED"}
              className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-all disabled:opacity-50"
            >
              رفض المعاملة / نواقص
            </button>

            <button
              onClick={handleApproveAndCollect}
              disabled={selectedRequest.status === "APPROVED"}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              اعتماد وتحصيل نقدي
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Request;
