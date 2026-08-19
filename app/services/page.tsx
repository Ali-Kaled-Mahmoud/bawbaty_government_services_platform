"use client";

import { useState, useMemo } from "react";
import HeroSearch from "@/components/services/heroSearch";
import CategoryTabs from "@/components/services/categoryTabs";
import ServicesGrid from "@/components/services/servicesGrid";
import Contact from "@/components/services/contact";

// قائمة التصنيفات
const CATEGORIES = [
  { id: "all", name: "جميع الخدمات" },
  { id: "identity", name: "الأحوال المدنية والهوية" },
  { id: "traffic", name: "المرور والنقل" },
  { id: "health", name: "الصحة والأسرة" },
  { id: "business", name: "الأعمال والاستثمار" },
  { id: "housing", name: "العقارات والإسكان" },
];

// قائمة الخدمات الإلكترونية
const SERVICES_DATA = [
  {
    id: "renew-id",
    title: "تجديد بطاقة الهوية الوطنية",
    description:
      "تجديد الهوية الوطنية للمواطنين إلكترونياً مع توصيل الوثيقة للموقع المسجل.",
    category: "identity",
    ministry: "وزارة الداخلية",
    duration: "3 - 5 أيام عمل",
    fee: "مجانية",
    badge: "الأكثر استخداماً",
  },
  {
    id: "issue-license",
    title: "إصدار/تجديد رخصة القيادة",
    description:
      "خدمة تجديد رخص القيادة الخاصة بالمركبات وسداد الفحوصات الطبية إلكترونياً.",
    category: "traffic",
    ministry: "الإدارة العامة للمرور",
    duration: "فوري",
    fee: "100 ر.س / سنة",
    badge: "خدمة فورية",
  },
  {
    id: "birth-certificate",
    title: "إصدار شهادة الميلاد الرقمية",
    description:
      "تسجيل المولود الجديد واستخراج وثيقة الميلاد وتوثيقها رسمياً عبر المنصة.",
    category: "health",
    ministry: "وزارة الصحة",
    duration: "فوري",
    fee: "مجانية",
    badge: "",
  },
  {
    id: "commercial-register",
    title: "إصدار السجل التجاري",
    description:
      "تأسيس وبدء النشاط التجاري واستخراج السجل التجاري الإلكتروني للشركات والمؤسسات.",
    category: "business",
    ministry: "وزارة التجارة",
    duration: "10 دقائق",
    fee: "200 ر.س",
    badge: "للأعمال",
  },
  {
    id: "lease-contract",
    title: "توثيق عقود الإيجار الموحدة",
    description:
      "توثيق وتصديق العقود السكنية والتجارية إلكترونياً لضمان حقوق المؤجر والمستأجر.",
    category: "housing",
    ministry: "وزارة الإسكان",
    duration: "فوري",
    fee: "125 ر.س",
    badge: "",
  },
  {
    id: "passport-renew",
    title: "تجديد جواز السفر الإلكتروني",
    description:
      "طلب تجديد جواز السفر للمواطنين والتابعين مع خيار التوصيل للمنزل.",
    category: "identity",
    ministry: "المديرية العامة للجوازات",
    duration: "2 - 4 أيام عمل",
    fee: "300 ر.س / 5 سنوات",
    badge: "",
  },
  {
    id: "vehicle-transfer",
    title: "نقل ملكية المركبات",
    description:
      "مبايعة ونقل ملكية المركبات بين الأفراد فورياً بعد استيفاء الشروط.",
    category: "traffic",
    ministry: "الإدارة العامة للمرور",
    duration: "فوري",
    fee: "230 ر.س",
    badge: "جديد",
  },
  {
    id: "health-insurance",
    title: "الاستعلام عن التأمين الصحي",
    description:
      "التحقق من حالة وصلاحية ربط التأمين الصحي بالهوية الوطنية أو الإقامة.",
    category: "health",
    ministry: "مجلس الضمان الصحي",
    duration: "فوري",
    fee: "مجانية",
    badge: "",
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // تصفية الخدمات بحسب التصنيف وكلمة البحث
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.ministry.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl pb-20">
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryTabs
        CATEGORIES={CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={(categoryId) =>
          setSelectedCategory(String(categoryId))
        }
      />

      <ServicesGrid
        filteredServices={filteredServices}
        onResetFilters={() => {
          setSearchQuery("");
          setSelectedCategory("all");
        }}
      />
      <Contact />
    </div>
  );
}
