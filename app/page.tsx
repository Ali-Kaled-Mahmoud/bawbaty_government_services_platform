import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="space-y-8 animate-fadeIn">
        <div className="bg-linear-to-r from-teal-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-teal-700/80 text-teal-100 rounded-full text-xs font-semibold mb-3 border border-teal-600">
              منظومة موحدة ومهيأة للشبكات الخفيفة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              مرحباً بك في بوابتك الحكومية الموحدة
            </h2>
            <p className="text-teal-100 text-sm sm:text-base mb-6 leading-relaxed">
              يمكنك حجز المواعيد وتتبع ملفاتك بكل سهولة وبسرعة عالية حتى في
              أوقات ضعف الاتصال.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-plus w-4 h-4"
                >
                  <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"></path>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                  <line x1="19" x2="19" y1="16" y2="22"></line>
                  <line x1="16" x2="22" y1="19" y2="19"></line>
                </svg>{" "}
               إنشاء حساب جديد
              </Link>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-check absolute -left-10 -bottom-10 w-64 h-64 text-teal-700/30 pointer-events-none"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
      </div>
    </>
  );
}
