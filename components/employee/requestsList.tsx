interface PhysicalRequest {
  id: string;
  trackingNumber: string;
  citizenName: string;
  nationalId: string;
  serviceTitle: string;
  submittedAt: string;
  appointmentTime: string;
  status:
    | "PENDING_VERIFICATION"
    | "APPROVED"
    | "REJECTED"
    | "PAYMENT_COMPLETED";
  documents: { name: string; verified: boolean }[];
  feeAmount: number;
}

type RequestsListProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setSelectedRequest: (request: PhysicalRequest | null) => void;
  filteredRequests: PhysicalRequest[];
  selectedRequest?: PhysicalRequest | null;
};

const RequestsList = ({
  searchTerm,
  setSearchTerm,
  setSelectedRequest,
  filteredRequests,
  selectedRequest,
}: RequestsListProps) => {
  return (
    <>
      {/* العمود الأيمن: قائمة الطلبات والبحث (4 أعمدة) */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-162.5">
        {/* شريط البحث في الطلبات */}
        <div className="p-4 border-b border-slate-100">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث برقم الطلب، رقم الهوية، أو الاسم..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
          />
        </div>

        {/* قائمة الطلبات */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {filteredRequests.map((req) => {
            const isSelected = selectedRequest?.id === req.id;
            return (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-teal-50/60 border-r-4 border-teal-600"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {req.trackingNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      req.status === "PENDING_VERIFICATION"
                        ? "bg-amber-100 text-amber-800"
                        : req.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {req.status === "PENDING_VERIFICATION"
                      ? "في الانتظار"
                      : req.status === "APPROVED"
                        ? "معتمدة"
                        : "مرفوضة"}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800">
                  {req.citizenName}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {req.serviceTitle}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>الهوية: {req.nationalId}</span>
                  <span>{req.appointmentTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RequestsList;
