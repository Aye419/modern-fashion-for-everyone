import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { PageView } from '../types/store';
import { HarunaLogo } from './HarunaLogo';

interface HeaderProps {
  activeView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  cartCount,
  wishlistCount,
  transparent = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`relative z-30 w-full ${
        transparent ? 'bg-transparent' : 'bg-white border-b border-[#EEF0F6]'
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-12 py-5">
        {/* Left: Brand */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0055FF] rounded-md whitespace-nowrap shrink-0"
          aria-label="HARUNA Home"
        >
          <HarunaLogo />
        </button>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive =
              activeView === item.view ||
              (item.view === 'shop' && activeView === 'product');
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                className={`relative py-1 text-[13.5px] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0055FF] rounded-sm ${
                  isActive
                    ? 'font-semibold text-[#111827]'
                    : 'font-medium text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#0055FF] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-1.5 text-[#111827] hover:text-[#0055FF] transition-colors cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-[#0055FF]"
            aria-label="Search products"
          >
            <Search className="w-[19px] h-[19px]" strokeWidth={1.9} />
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            className="relative p-1.5 text-[#111827] hover:text-[#0055FF] transition-colors cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-[#0055FF]"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart className="w-[19px] h-[19px]" strokeWidth={1.9} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#111827] text-white text-[9.5px] font-bold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-1.5 text-[#111827] hover:text-[#0055FF] transition-colors cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-[#0055FF]"
            aria-label={`Shopping cart (${cartCount} items)`}
          >
            <ShoppingCart className="w-[20px] h-[20px]" strokeWidth={1.9} />
            <span className="absolute -top-0.5 -right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#0055FF] text-white text-[10px] font-bold flex items-center justify-center tabular-nums leading-none">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 text-[#111827] hover:text-[#0055FF] transition-colors cursor-pointer rounded-md"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#EEF0F6] px-6 py-4 flex flex-col gap-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                className={`text-left py-2.5 px-3 rounded-xl text-[14px] transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EEF4FF] text-[#0055FF] font-semibold'
                    : 'text-[#374151] hover:bg-[#F9FAFB] font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
