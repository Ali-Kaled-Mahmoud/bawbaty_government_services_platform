import Hero from "@/components/contact/hero";
import ContactCards from "@/components/contact/contactCards";
import MessageForm from "@/components/contact/messageForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl pb-16">
      <Hero />
      {/* 2. المحتوى الرئيسي: معلومات الاتصال + النموذج */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <ContactCards />
          <MessageForm />
        </div>
      </div>
    </div>
  );
}
