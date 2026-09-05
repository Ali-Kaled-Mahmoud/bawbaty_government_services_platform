"use client";

import { useState, useEffect, useMemo } from "react";
import HeroSearch from "@/components/services/heroSearch";
import CategoryTabs from "@/components/services/categoryTabs";
import ServicesGrid from "@/components/services/servicesGrid";
import Contact from "@/components/services/contact";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

// قائمة التصنيفات
const CATEGORIES = [
  { id: "all", name: "جميع الخدمات" },
  { id: "identity", name: "الأحوال المدنية والهوية" },
  { id: "traffic", name: "المرور والنقل" },
  { id: "health", name: "الصحة والأسرة" },
  { id: "business", name: "الأعمال والاستثمار" },
  { id: "housing", name: "العقارات والإسكان" },
];

export type Service = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  ministry: string;
  duration: string;
  fee: string;
  badge?: string;
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // جلب البيانات من Django Backend المرفوع على Render
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/services/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("فشل في جلب الخدمات من الخادم");
        }

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];

        // مطابقة حقول البيانات القادمة من Django مع الواجهة
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedServices: Service[] = items.map((item: any) => ({
          id: item.id,
          title: item.title || item.name || "خدمة حكومية",
          description: item.description || "",
          category: item.category?.slug || item.category || "general",
          ministry: item.ministry?.name || item.ministry || "جهة حكومية",
          duration: item.duration || item.execution_time || "غير محدد",
          fee: item.fee || item.price || "مجاني",
          badge: item.badge || "",
        }));

        setServices(mappedServices);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("خطأ الاتصال بالباك إند:", err);
        setError(
          "تعذر الاتصال بالخادم."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // تصفية الخدمات بحسب التصنيف وكلمة البحث
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.ministry.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [services, searchQuery, selectedCategory]);

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
        loading={loading}
        error={error}
        onResetFilters={() => {
          setSearchQuery("");
          setSelectedCategory("all");
        }}
      />

      <Contact />
    </div>
  );
}