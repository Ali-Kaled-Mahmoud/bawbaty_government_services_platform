import React from "react";

type Category = {
  id: string | number;
  name: string;
};

type CategoryTabsProps = {
  CATEGORIES: Category[];
  selectedCategory: Category["id"];
  setSelectedCategory: (categoryId: Category["id"]) => void;
};

const CategoryTabs = ({
  CATEGORIES,
  selectedCategory,
  setSelectedCategory,
}: CategoryTabsProps) => {
  return (
    <div>
      {/* 2. شريط تصنيفات الخدمات (Category Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CategoryTabs;
