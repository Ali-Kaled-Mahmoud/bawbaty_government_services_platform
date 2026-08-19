import Link from "next/link";

const Contact = () => {
  return (
    <div>
      {/* 4. بنر تقديم المساعدة */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              لم تجد الخدمة التي تبحث عنها؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              تواصل مع الدعم الفني لمساعدتك أو الاستفسار عن متطلبات أي معاملة.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all"
          >
            التواصل مع الدعم
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
