import { DBRequest } from "@/app/(employee)/dashboard/page";

const StatisticsBar = ({ requests }: { requests: DBRequest[] }) => {
  const pendingCount = requests.filter(
    (r) => r.status === "submitted" || r.status === "auditing" || r.status === "matching"
  ).length;

  const completedCount = requests.filter((r) => r.status === "closed").length;

  return (
    <div className="bg-white border-b border-slate-200 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            {pendingCount}
          </div>
          <div>
            <p className="text-slate-500">طلبات قيد المعالجة</p>
            <p className="font-bold text-slate-800">تتطلب التدقيق والإجراء</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            {completedCount}
          </div>
          <div>
            <p className="text-slate-500">معاملات مكتملة</p>
            <p className="font-bold text-slate-800">تم التوثيق والتحصيل</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            {requests.length}
          </div>
          <div>
            <p className="text-slate-500">إجمالي الطلبات</p>
            <p className="font-bold text-slate-800">المسجلة بالدائرة</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
            API
          </div>
          <div>
            <p className="text-slate-500">حالة الاتصال بالخادم</p>
            <p className="font-bold text-emerald-600">متصل (قاعدة البيانات)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;