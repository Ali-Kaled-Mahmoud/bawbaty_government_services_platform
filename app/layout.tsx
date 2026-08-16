import type { Metadata } from "next";
import "./globals.css";
import {Tajawal} from "next/font/google";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";

export const metadata: Metadata = {
  title: "بوابتي",
  description: "منصة بوابتي للخدمات الحكوميةالسورية الموحدة",
};

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap", // يضمن ظهور النص فوراً حتى أثناء تحميل الخط
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
    >
      <body className={tajawal.className}>
        <Header />
        <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
