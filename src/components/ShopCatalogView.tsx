import React, { useMemo, useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';
import { CategoryId, Product } from '../types/store';

interface ShopCatalogViewProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onBackHome: () => void;
}

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onBackHome,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    const base =
      selectedCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === selectedCategory);

    const copy = [...base];
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      copy.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return copy;
  }, [selectedCategory, sortBy]);

  const activeCategoryName =
    selectedCategory === 'all'
      ? 'All Collections'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? 'Collection';

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EEF0F6]">
        <div>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0055FF] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <p className="text-[11px] font-bold tracking-[0.13em] text-[#0055FF] uppercase">
            HARUNA STOREFRONT
          </p>
          <h1 className="mt-1 text-[28px] sm:text-[34px] font-extrabold text-[#111827] leading-tight">
            {activeCategoryName}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-[12.5px] font-medium text-[#4B5563]">
            Sort by
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-full px-4 py-2 text-[13px] font-medium text-[#111827] focus:outline-none focus:border-[#0055FF] cursor-pointer"
          >
            <option value="featured">Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#0055FF] text-white shadow-[0_6px_16px_rgba(0,85,255,0.22)]'
              : 'bg-[#F4F6FB] text-[#374151] hover:bg-[#E7EBF7]'
          }`}
        >
          All Products
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0055FF] text-white shadow-[0_6px_16px_rgba(0,85,255,0.22)]'
                : 'bg-[#F4F6FB] text-[#374151] hover:bg-[#E7EBF7]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2 pb-6">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          return (
            <article
              key={product.id}
              onClick={() => onSelectProduct(product)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProduct(product);
                }
              }}
              tabIndex={0}
              className="group bg-white rounded-[20px] p-3 border border-[#EEF0F6] shadow-[0_8px_26px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-[14px] overflow-hidden bg-[#ECEEF7] aspect-[206/130]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />

                  {product.discountBadge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#0055FF] text-white text-[11.5px] font-bold px-3 py-1 rounded-full leading-none shadow-sm">
                      {product.discountBadge}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.1)] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#111827]'
                      }`}
                      strokeWidth={1.9}
                    />
                  </button>
                </div>

                <div className="pt-3.5 px-1">
                  <h2 className="text-[15.5px] font-bold text-[#111827] leading-snug">
                    {product.name}
                  </h2>

                  <div className="mt-1 flex items-center gap-2 tabular-nums">
                    <span className="text-[15px] font-extrabold text-[#111827]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.previousPrice && (
                      <span className="text-[13px] font-medium text-[#9CA3AF] line-through">
                        ${product.previousPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                    <span className="text-[12px] font-medium text-[#4B5563] tabular-nums">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAdd(product);
                }}
                className="mt-3.5 w-full py-2.5 px-4 rounded-full bg-[#F4F6FB] hover:bg-[#0055FF] text-[#111827] hover:text-white text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
