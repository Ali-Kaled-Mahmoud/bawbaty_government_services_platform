const StatisticsBar = ({
  requests,
}: {
  requests: Array<{ status: string }>;
}) => {
  return (
    <div>
      {/* 2. شريط الإحصائيات السريعة */}
      <div className="bg-white border-b border-slate-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              {
                requests.filter((r) => r.status === "PENDING_VERIFICATION")
                  .length
              }
            </div>
            <div>
              <p className="text-slate-500">طلبات بقائمة الانتظار</p>
              <p className="font-bold text-slate-800">تتطلب تدقيق</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              {requests.filter((r) => r.status === "APPROVED").length}
            </div>
            <div>
              <p className="text-slate-500">معاملات مكتملة اليوم</p>
              <p className="font-bold text-slate-800">تم التوثيق والاستلام</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              400 ل.س.ج
            </div>
            <div>
              <p className="text-slate-500">المحصل النقدي الصندوق</p>
              <p className="font-bold text-slate-800">مطابق للتقارير</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
              2G/3G
            </div>
            <div>
              <p className="text-slate-500">حالة الاتصال بالخادم</p>
              <p className="font-bold text-emerald-600">متصل (وضع خفيف)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;
