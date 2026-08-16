"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // الروابط الرئيسية للمنصة
  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الخدمات الإلكترونية", href: "/services" },
    { name: "حجز موعد", href: "/appointments" },
    { name: "متابعة الطلبات", href: "/track" },
    { name: "لوحة تحكم الموظف", href: "/dashboard" },
    { name: "الإحصائيات", href: "/statistics" },
    { name: "عن المنصة", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
  ];

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
        </div>

        {/* زر فتح/إغلاق القائمة للهواتف الذكية */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-all"
          aria-label="قائمة التصفح"
        >
          {isOpen ? (
            // أيقونة الإغلاق (X)
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
            // أيقونة الهامبرغر
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

          {/* أزرار تسجيل الدخول وإنشاء الحساب للهاتف */}
          <div className="flex flex-col gap-2 pt-1">
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
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
