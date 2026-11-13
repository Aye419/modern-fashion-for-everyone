import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { CartItem, Product } from '../types/store';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');

  if (!open) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.color.toLowerCase().includes(trimmed)
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-start justify-center pt-16 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search HARUNA"
    >
      <div
        className="w-full max-w-[600px] bg-white rounded-[24px] shadow-2xl border border-[#EEF0F6] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EEF0F6]">
          <Search className="w-5 h-5 text-[#0055FF] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hoodies, t-shirts, caps, sneakers..."
            className="flex-1 text-[15px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-full hover:bg-[#F4F6FB] text-[#4B5563] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <p className="text-[11px] font-bold tracking-[0.12em] text-[#4B5563] uppercase px-2 mb-2.5">
            {trimmed ? `Results (${results.length})` : 'Popular Items'}
          </p>

          {results.length === 0 ? (
            <p className="text-center py-8 text-[14px] text-[#4B5563]">
              No items found matching &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <div className="space-y-2">
              {results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-2.5 rounded-2xl hover:bg-[#F4F6FB] transition-colors text-left cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-12 rounded-xl object-cover bg-[#ECEEF7] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14.5px] font-bold text-[#111827] truncate">
                      {product.name}
                    </p>
                    <p className="text-[12px] text-[#4B5563] capitalize">
                      {product.category} &middot; {product.color}
                    </p>
                  </div>
                  <span className="text-[14.5px] font-extrabold text-[#111827] tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onBrowseShop,
}) => {
  const [checkedOut, setCheckedOut] = useState(false);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckedOut(true);
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div
        className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#EEF0F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-[17px] font-extrabold text-[#111827]">Shopping Cart</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setCheckedOut(false);
              onClose();
            }}
            aria-label="Close shopping cart"
            className="p-1.5 rounded-full hover:bg-[#F4F6FB] text-[#4B5563] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkedOut ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#0055FF] mx-auto mb-3" />
              <h3 className="text-[20px] font-extrabold text-[#111827]">Order Confirmed</h3>
              <p className="mt-2 text-[14px] text-[#4B5563] leading-relaxed">
                Thank you for shopping with HARUNA. Your order is being prepared for free worldwide shipping.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckedOut(false);
                  onClose();
                }}
                className="mt-6 px-7 py-3 rounded-full bg-[#0055FF] text-white text-[14px] font-semibold cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-14 h-14 rounded-full bg-[#F4F6FB] flex items-center justify-center mx-auto mb-3 text-[#0055FF]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-[17px] font-bold text-[#111827]">Your cart is empty</h3>
              <p className="mt-1.5 text-[13.5px] text-[#4B5563]">
                Explore HARUNA hoodies, graphic tees, caps, and sneakers.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#0055FF] text-white text-[13.5px] font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#EEF0F6] bg-[#FAFAFD]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-16 rounded-xl object-cover bg-[#ECEEF7] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-bold text-[#111827] truncate">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.productId, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[12px] text-[#4B5563]">
                      Size: {item.size} &middot; {item.color}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#E5E7EB] rounded-full bg-white px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, item.size, -1)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#F4F6FB] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-[12.5px] font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, item.size, 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#F4F6FB] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[14px] font-extrabold text-[#111827] tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !checkedOut && (
          <div className="px-6 py-5 border-t border-[#EEF0F6] bg-[#FAFAFD]">
            <div className="flex items-center justify-between text-[13.5px] text-[#4B5563] mb-1.5">
              <span>Shipping</span>
              <span className="font-semibold text-[#0055FF]">Free Worldwide</span>
            </div>
            <div className="flex items-center justify-between text-[16px] font-extrabold text-[#111827] mb-4 tabular-nums">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#0055FF] hover:bg-[#0044DD] text-white text-[14px] font-semibold shadow-[0_10px_24px_rgba(0,85,255,0.25)] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Checkout Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  open,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!open) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
    >
      <div
        className="w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#EEF0F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-[17px] font-extrabold text-[#111827]">Saved Wishlist</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 rounded-full hover:bg-[#F4F6FB] text-[#4B5563] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {savedProducts.length === 0 ? (
            <div className="py-14 text-center">
              <div className="w-14 h-14 rounded-full bg-[#F4F6FB] flex items-center justify-center mx-auto mb-3 text-[#0055FF]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-[17px] font-bold text-[#111827]">No saved items yet</h3>
              <p className="mt-1.5 text-[13.5px] text-[#4B5563]">
                Tap the heart icon on any HARUNA piece to save it for later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#EEF0F6] bg-[#FAFAFD]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 h-16 rounded-xl overflow-hidden bg-[#ECEEF7] shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="text-left text-[14px] font-bold text-[#111827] truncate hover:text-[#0055FF] cursor-pointer"
                      >
                        {product.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[13.5px] font-extrabold text-[#111827] mt-0.5 tabular-nums">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => onMoveToCart(product)}
                      className="mt-2 px-3.5 py-1.5 rounded-full bg-[#0055FF] hover:bg-[#0044DD] text-white text-[12px] font-semibold cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  onShopCollection: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ open, onClose, onShopCollection }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-[3px] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="HARUNA Lookbook Preview"
    >
      <div
        className="w-full max-w-[720px] bg-[#0A0C10] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#3B82F6] uppercase">
              HARUNA &bull; WEAR THE CHANGE
            </p>
            <h2 className="text-[17px] font-bold text-white">2026 Collection Lookbook</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lookbook"
            className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-[#11141B] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/images/hero_scene.png"
            alt="HARUNA 2026 collection showcase"
            className="w-full sm:w-[55%] rounded-2xl object-cover shadow-lg"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 text-white">
            <h3 className="text-[22px] font-extrabold leading-tight">
              Modern Fashion For Everyone
            </h3>
            <p className="mt-3 text-[13.5px] text-[#D1D5DB] leading-relaxed">
              Crafted in crisp monochrome essentials with royal blue accents — explore heavyweight hoodies, signature H-emblem tees, structured caps, and high-contrast sneakers.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onShopCollection();
              }}
              className="mt-6 bg-[#0055FF] hover:bg-[#0044DD] text-white text-[13.5px] font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Shop Featured Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
