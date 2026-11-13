import React, { useState } from 'react';
import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { Product } from '../types/store';

interface ProductDetailViewProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onBackToShop,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] ?? 'One Size');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  // Reset size/qty when switching between products
  React.useEffect(() => {
    setSelectedSize(product.sizes[0] ?? 'One Size');
    setQuantity(1);
    setAddedFeedback(false);
  }, [product]);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-8">
      <button
        type="button"
        onClick={onBackToShop}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0055FF] hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </button>

      {/* Main Product Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[24px] overflow-hidden bg-[#ECEEF7] border border-[#EEF0F6] aspect-[4/3]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.discountBadge && (
              <span className="absolute top-4 left-4 bg-[#0055FF] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                {product.discountBadge}
              </span>
            )}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6">
          <p className="text-[11px] font-bold tracking-[0.13em] text-[#0055FF] uppercase">
            HARUNA &bull; {product.category}
          </p>

          <h1 className="mt-1.5 text-[28px] sm:text-[34px] font-extrabold text-[#111827] leading-tight">
            {product.name}
          </h1>

          <div className="mt-2.5 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <span className="text-[13px] font-medium text-[#4B5563] tabular-nums">
              {product.rating}.0 ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3 tabular-nums">
            <span className="text-[26px] font-extrabold text-[#111827]">
              ${product.price.toFixed(2)}
            </span>
            {product.previousPrice && (
              <span className="text-[16px] font-medium text-[#9CA3AF] line-through">
                ${product.previousPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mt-4 text-[14.5px] text-[#4B5563] leading-[1.6]">
            {product.description}
          </p>

          <div className="mt-4 text-[13px] text-[#4B5563] flex items-center gap-2">
            <span className="font-semibold text-[#111827]">Color:</span>
            <span>{product.color}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="font-semibold text-[#111827]">Material:</span>
            <span>{product.material}</span>
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] font-bold text-[#111827]">Select Size</span>
              <span className="text-[12px] text-[#4B5563]">Standard True-to-Size Fit</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#111827] text-white border-[#111827]'
                      : 'bg-white text-[#111827] border-[#E5E7EB] hover:border-[#0055FF]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart + Wishlist */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center border border-[#E5E7EB] rounded-full bg-[#F9FAFB] px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#111827] hover:bg-white transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center text-[14px] font-bold text-[#111827] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#111827] hover:bg-white transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 min-w-[180px] bg-[#0055FF] hover:bg-[#0044DD] text-white text-[14px] font-semibold px-7 py-3.5 rounded-full shadow-[0_10px_24px_rgba(0,85,255,0.25)] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="w-12 h-12 rounded-full border border-[#E5E7EB] hover:border-[#0055FF] bg-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#111827]'
                }`}
              />
            </button>
          </div>

          <div className="mt-7 pt-5 border-t border-[#EEF0F6] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] text-[#4B5563]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#0055FF] shrink-0" />
              <span>Free worldwide express shipping</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0055FF] shrink-0" />
              <span>30-day easy returns &amp; exchanges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12 pt-8 border-t border-[#EEF0F6]">
        <h2 className="text-[20px] font-extrabold text-[#111827] mb-5">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="group bg-white rounded-[18px] p-3 border border-[#EEF0F6] shadow-[0_6px_20px_rgba(15,23,42,0.035)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-all cursor-pointer"
            >
              <div className="rounded-[12px] overflow-hidden bg-[#ECEEF7] aspect-[206/130]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pt-3 px-1">
                <h3 className="text-[14.5px] font-bold text-[#111827]">{item.name}</h3>
                <p className="mt-0.5 text-[14px] font-extrabold text-[#111827] tabular-nums">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
