import { useEffect, useState } from 'react';
import { AboutBannerSection } from './components/AboutBannerSection';
import { CategorySection } from './components/CategorySection';
import {
  CartDrawer,
  SearchModal,
  VideoModal,
  WishlistDrawer,
} from './components/DrawersAndModals';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutPage, CarePage, ContactPage } from './components/InfoPages';
import { ProductDetailView } from './components/ProductDetailView';
import { ShopCatalogView } from './components/ShopCatalogView';
import { PRODUCTS } from './data/catalog';
import { CareTopic, CartItem, CategoryId, PageView, Product } from './types/store';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [careTopic, setCareTopic] = useState<CareTopic>('shipping');

  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('haruna_wishlist');
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('haruna_cart');
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('haruna_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('haruna_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setCartOpen(false);
        setWishlistOpen(false);
        setVideoOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (view: PageView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenShopCategory = (category: CategoryId) => {
    setSelectedCategory(category);
    navigateTo('shop');
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product');
  };

  const handleOpenCare = (topic: CareTopic) => {
    setCareTopic(topic);
    navigateTo('care');
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity,
          color: product.color,
        },
      ];
    });
  };

  const handleUpdateCartQty = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#EEF1F9] py-4 sm:py-6 px-3 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Subtle outer background royal-blue curve matching reference top-right edge */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[260px] h-[260px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[#0055FF] opacity-90 z-0 hidden xl:block"
        aria-hidden="true"
      />

      <main className="relative z-10 max-w-[1160px] mx-auto">
        {activeView === 'home' ? (
          <>
            {/* SECTION 1: HEADER AND HERO */}
            <HeroSection
              activeView={activeView}
              onNavigate={navigateTo}
              onShopNow={() => handleOpenShopCategory('all')}
              onWatchVideo={() => setVideoOpen(true)}
              onOpenSearch={() => setSearchOpen(true)}
              onOpenWishlist={() => setWishlistOpen(true)}
              onOpenCart={() => setCartOpen(true)}
              cartCount={cartCount}
              wishlistCount={wishlistIds.length}
            />

            {/* SECTIONS 2 - 5 CONTAINER */}
            <div className="mt-3 bg-white rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.045)] overflow-hidden">
              {/* SECTION 2: SHOP BY CATEGORY */}
              <CategorySection
                onSelectCategory={handleOpenShopCategory}
                onViewAllCategories={() => handleOpenShopCategory('all')}
              />

              {/* SECTION 3: FEATURED PRODUCTS */}
              <FeaturedProductsSection
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onSelectProduct={handleOpenProduct}
                onViewAllProducts={() => handleOpenShopCategory('all')}
              />

              {/* SECTION 4: ABOUT HARUNA */}
              <AboutBannerSection onLearnMore={() => navigateTo('about')} />

              {/* SECTION 5: FOOTER */}
              <Footer onNavigate={navigateTo} onOpenCare={handleOpenCare} />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.05)] overflow-hidden">
            <Header
              activeView={activeView}
              onNavigate={navigateTo}
              onOpenSearch={() => setSearchOpen(true)}
              onOpenWishlist={() => setWishlistOpen(true)}
              onOpenCart={() => setCartOpen(true)}
              cartCount={cartCount}
              wishlistCount={wishlistIds.length}
              transparent={false}
            />

            {activeView === 'shop' && (
              <ShopCatalogView
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onSelectProduct={handleOpenProduct}
                onQuickAdd={(product) => {
                  handleAddToCart(product, product.sizes[0] ?? 'One Size', 1);
                  setCartOpen(true);
                }}
                onBackHome={() => navigateTo('home')}
              />
            )}

            {activeView === 'product' && (
              <ProductDetailView
                product={selectedProduct}
                isWishlisted={wishlistIds.includes(selectedProduct.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(product, size, qty) => {
                  handleAddToCart(product, size, qty);
                }}
                onSelectProduct={handleOpenProduct}
                onBackToShop={() => handleOpenShopCategory('all')}
              />
            )}

            {activeView === 'about' && (
              <AboutPage
                onShopNow={() => handleOpenShopCategory('all')}
                onBackHome={() => navigateTo('home')}
              />
            )}

            {activeView === 'contact' && (
              <ContactPage onBackHome={() => navigateTo('home')} />
            )}

            {activeView === 'care' && (
              <CarePage
                topic={careTopic}
                onSelectTopic={setCareTopic}
                onBackHome={() => navigateTo('home')}
              />
            )}

            <Footer onNavigate={navigateTo} onOpenCare={handleOpenCare} />
          </div>
        )}
      </main>

      {/* Interactive Modals & Slide-Over Drawers */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleOpenProduct}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onBrowseShop={() => handleOpenShopCategory('all')}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onMoveToCart={(product) => {
          handleAddToCart(product, product.sizes[0] ?? 'One Size', 1);
          setWishlistOpen(false);
          setCartOpen(true);
        }}
        onSelectProduct={handleOpenProduct}
      />

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        onShopCollection={() => handleOpenShopCategory('all')}
      />
    </div>
  );
}
