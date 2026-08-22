import Link from "next/link";

const HeaderEmployee = () => {
  return (
    <div>
      {/* 1. الترويسة الخاصة بالموظف */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
              م
            </div>
            <div>
              <h1 className="text-sm font-bold">
                منصة بوابتي | نافذة الموظف الميداني
              </h1>
              <p className="text-[11px] text-teal-400">
                مركز التدقيق المستندي واستلام الرسوم النقدي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              الفرع:{" "}
              <strong className="text-white">
                المركز الحكومي الموحد - صالة 1
              </strong>
            </span>
            <Link
              href="/logout"
              className="text-slate-400 hover:text-white transition-colors"
            >
              خروج
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderEmployee;
