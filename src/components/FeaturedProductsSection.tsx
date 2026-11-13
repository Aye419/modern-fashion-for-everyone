import React from 'react';
import { ArrowRight, Heart, Star } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { Product } from '../types/store';

interface FeaturedProductsSectionProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onViewAllProducts,
}) => {
  const bestSellers = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section aria-label="Featured Products" className="px-6 sm:px-10 lg:px-12 pt-8 pb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] font-bold tracking-[0.13em] text-[#0055FF] uppercase">
            FEATURED PRODUCTS
          </p>
          <h2 className="mt-1 text-[28px] sm:text-[32px] font-extrabold text-[#111827] leading-[1.12] tracking-[-0.02em]">
            Best Sellers
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAllProducts}
          className="self-start sm:self-end text-[13.5px] font-semibold text-[#0055FF] hover:text-[#0044DD] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0055FF] rounded-sm"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* 4 Product Cards in One Horizontal Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {bestSellers.map((product) => {
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
              className="group bg-white rounded-[20px] p-3 border border-[#EEF0F6] shadow-[0_8px_26px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0055FF]"
            >
              {/* Product Image Area */}
              <div className="relative rounded-[14px] overflow-hidden bg-[#ECEEF7] aspect-[206/130]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />

                {/* Top-Left Discount Badge */}
                {product.discountBadge && (
                  <span className="absolute top-2.5 left-2.5 bg-[#0055FF] text-white text-[11.5px] font-bold px-3 py-1 rounded-full leading-none shadow-sm">
                    {product.discountBadge}
                  </span>
                )}

                {/* Top-Right Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.1)] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0055FF]"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#111827]'
                    }`}
                    strokeWidth={1.9}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="pt-3.5 pb-1 px-1">
                <h3 className="text-[15.5px] font-bold text-[#111827] leading-snug">
                  {product.name}
                </h3>

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

                {/* Gold Star Ratings + Review Count */}
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
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
            </article>
          );
        })}
      </div>
    </section>
  );
};
