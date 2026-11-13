import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { CategoryId } from '../types/store';

interface CategorySectionProps {
  onSelectCategory: (category: CategoryId) => void;
  onViewAllCategories: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onViewAllCategories,
}) => {
  return (
    <section aria-label="Shop by Category" className="px-6 sm:px-10 lg:px-12 pt-10 pb-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-[0.13em] text-[#0055FF] uppercase inline-flex items-center gap-2">
            <span>SHOP BY CATEGORY</span>
            <span className="inline-block w-1.5 h-[2px] bg-[#0055FF] rounded-full" aria-hidden="true" />
          </p>
          <h2 className="mt-1.5 text-[28px] sm:text-[32px] font-extrabold text-[#111827] leading-[1.12] tracking-[-0.02em]">
            Find Your
            <br />
            Perfect Style
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAllCategories}
          className="self-start sm:self-end text-[13.5px] font-semibold text-[#0055FF] hover:text-[#0044DD] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0055FF] rounded-sm"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* 5 Equal-Sized Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCategory(category.id);
              }
            }}
            role="button"
            tabIndex={0}
            className="group bg-white rounded-[18px] p-2.5 border border-[#EEF0F6] shadow-[0_6px_22px_rgba(15,23,42,0.035)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0055FF]"
          >
            <div className="rounded-[12px] overflow-hidden bg-[#ECEEF7] aspect-[160/102]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="pt-3 pb-1.5 px-1.5">
              <h3 className="text-[15px] font-bold text-[#111827] leading-snug">
                {category.name}
              </h3>
              <span className="mt-0.5 inline-flex items-center gap-1 text-[12px] font-medium text-[#374151] group-hover:text-[#0055FF] transition-colors">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.9} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
