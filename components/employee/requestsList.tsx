import { DBRequest } from "@/app/(employee)/dashboard/page";

type RequestsListProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setSelectedRequest: (request: DBRequest | null) => void;
  filteredRequests: DBRequest[];
  selectedRequest?: DBRequest | null;
};

const RequestsList = ({
  searchTerm,
  setSearchTerm,
  setSelectedRequest,
  filteredRequests,
  selectedRequest,
}: RequestsListProps) => {
  return (
    <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-125">
      <div className="p-4 border-b border-slate-100">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث برقم الطلب، رقم الهوية، أو الاسم..."
          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
        />
      </div>

      <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
        {filteredRequests.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400">
            لا توجد طلبات تطابق البحث
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isSelected = selectedRequest?.tracking_id === req.tracking_id;
            return (
              <div
                key={req.tracking_id}
                onClick={() => setSelectedRequest(req)}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-teal-50/60 border-r-4 border-teal-600"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {req.tracking_id.substring(0, 8)}...
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      req.status === "closed"
                        ? "bg-emerald-100 text-emerald-800"
                        : req.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {req.status_display}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800">
                  {req.citizen_name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {req.service_name}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>الهوية: {req.citizen_national_id}</span>
                  <span>
                    {new Date(req.created_at).toLocaleDateString("ar-SA")}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RequestsList;