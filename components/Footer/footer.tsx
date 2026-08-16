
const Footer = () => {
  // قائمة شبكات التواصل الاجتماعي
  const socialLinks = [
    {
      name: 'منصة إكس (تويتر)',
      href: 'https://x.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'فيسبوك',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'لينكد إن',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'يوتيوب',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-teal-950 text-teal-200 py-8 border-t border-teal-900 mt-auto text-xs dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
        
        {/* معلومات البوابة */}
        <div>
          <p className="font-bold text-white mb-1">
            البوابة الوطنية للخدمات الحكومية الرقمية
          </p>
          <p className="text-teal-400/80 text-[11px]">
            منصة موحدة لسهولة الوصول للخدمات المعاملات الحكومية بأعلى معايير الأمان.
          </p>
        </div>

        {/* أيقونات شبكات التواصل الاجتماعي */}
        <div className="flex items-center gap-2.5">
          <span className="text-teal-400 text-[11px] ml-1 hidden sm:inline-block">تابعنا على:</span>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-8 h-8 rounded-lg bg-teal-900/60 hover:bg-teal-800 text-teal-300 hover:text-white flex items-center justify-center border border-teal-800/60 transition-all shadow-sm"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* الحقوق */}
        <p className="text-teal-500">جميع الحقوق محفوظة © 2026</p>

      </div>
    </footer>
  );
};

export default Footer;