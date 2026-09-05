"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // التحقق من التوكين وصلاحيات المستخدم عند تحميل المكون أو تغيير المسار
  useEffect(() => {
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");
    const userInfoRaw = localStorage.getItem("user_info");

    let emp = false;
    let adm = false;

    if (token && userInfoRaw) {
      try {
        const userInfo = JSON.parse(userInfoRaw);
        emp = userInfo?.role === "employee";
        adm = userInfo?.role === "admin";
      } catch (err) {
        console.error("خطأ في قراءة بيانات المستخدم:", err);
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!token);
    setIsEmployee(emp);
    setIsAdmin(adm);
  }, [pathname]);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("user_role");
    setIsLoggedIn(false);
    setIsEmployee(false);
    setIsAdmin(false);
    setIsOpen(false);
    router.push("/");
  };

  // قائمة جميع الروابط
  const allNavLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الخدمات الإلكترونية", href: "/services" },
    { name: "حجز موعد", href: "/appointments", requiresAuth: true },
    { name: "متابعة الطلبات", href: "/track", requiresAuth: true },
    { name: "تقديم شكوى", href: "/complaints", requiresAuth: true },
    { name: "لوحة تحكم الموظف", href: "/dashboard", requiresEmployee: true },
    {
      name: "لوحة التحكم",
      href: `${API_BASE_URL}/admin/`,
      requiresAdmin: true,
      isExternal: false,
    },
    { name: "الإحصائيات", href: "/statistics", requiresAdmin: true },
    { name: "عن المنصة", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  // تصفية الروابط حسب حالة تسجيل الدخول والصلاحيات
  const navLinks = allNavLinks.filter((link) => {
    if (link.requiresAuth && !isLoggedIn) return false;
    if (link.requiresEmployee && (!isLoggedIn || !isEmployee)) return false;
    if (link.requiresAdmin && (!isLoggedIn || !isAdmin)) return false;
    return true;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* الشعار والهوية */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M12 3v6"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            منصة <span className="text-emerald-400">بوابتي</span>
          </span>
        </Link>

        {/* قائمة الروابط الرئيسية (سطح المكتب) */}
        <nav className="hidden md:flex items-center gap-1 bg-teal-950/60 p-1.5 rounded-xl border border-teal-800/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-amber-300 hover:text-white hover:bg-teal-800/50 transition-all flex items-center gap-1.5"
                >
                  <span>{link.name}</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-teal-200 hover:text-white hover:bg-teal-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* أزرار الحساب والدخول (سطح المكتب) */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all"
            >
              تسجيل الخروج
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20"
              >
                حساب جديد
              </Link>
            </>
          )}
        </div>

        {/* زر فتح/إغلاق القائمة للهواتف الذكية */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-all"
          aria-label="قائمة التصفح"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* القائمة الجانبية/المنسدلة للهواتف الذكية (Mobile Menu Drawer) */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-2xl transition-all animate-in slide-in-from-top-2 duration-200">
          {/* الروابط للهاتف */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-amber-300 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-between"
                  >
                    <span>{link.name}</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-600 text-white font-semibold shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          <hr className="border-slate-800" />

          {/* أزرار تسجيل الدخول أو الخروج للهاتف */}
          <div className="flex flex-col gap-2 pt-1">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all"
              >
                تسجيل الخروج
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20"
                >
                  إنشاء حساب جديد
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;