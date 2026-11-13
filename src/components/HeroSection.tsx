import React from 'react';
import { ArrowRight, Headphones, Play, ShieldCheck, Tag, Truck } from 'lucide-react';
import { PageView } from '../types/store';
import { Header } from './Header';

interface HeroSectionProps {
  activeView: PageView;
  onNavigate: (view: PageView) => void;
  onShopNow: () => void;
  onWatchVideo: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeView,
  onNavigate,
  onShopNow,
  onWatchVideo,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  cartCount,
  wishlistCount,
}) => {
  const benefits = [
    {
      icon: Truck,
      line1: 'Free Shipping',
      line2: 'Worldwide',
    },
    {
      icon: ShieldCheck,
      line1: 'Secure',
      line2: 'Payments',
    },
    {
      icon: Headphones,
      line1: '24/7',
      line2: 'Customer Support',
    },
    {
      icon: Tag,
      line1: 'Easy Returns',
      line2: '& Exchanges',
    },
  ];

  return (
    <section
      aria-label="Hero"
      className="relative bg-white rounded-[28px] shadow-[0_12px_40px_rgba(15,23,42,0.05)] overflow-hidden"
    >
      {/* Integrated Top Header */}
      <Header
        activeView={activeView}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        onOpenWishlist={onOpenWishlist}
        onOpenCart={onOpenCart}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        transparent
      />

      {/* Unified Hero Visual (always together with the hero writing, positioned on right/background) */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[62%] md:w-[55%] lg:w-[51%] pointer-events-none select-none z-0">
        <img
          src="/images/hero_scene.png"
          alt="HARUNA black oversized H logo t-shirt on hanger, black HARUNA cap, black-and-white sneakers on white pedestal, black sunglasses, and green indoor plant"
          className="w-full h-full object-cover object-right"
          referrerPolicy="no-referrer"
        />
        <div
          className="lg:hidden absolute inset-0 bg-gradient-to-r from-white via-white/88 sm:via-white/75 to-white/15"
          aria-hidden="true"
        />
      </div>

      {/* Left-side Content Column (always on top of the visual) */}
      <div className="relative z-10 sm:w-[68%] md:w-[60%] lg:w-[54%] px-6 sm:px-10 lg:pl-12 lg:pr-4 pt-3 pb-8 lg:pt-6 lg:pb-9">
        <p className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.14em] text-[#0055FF] uppercase">
          TRENDY &bull; STYLISH &bull; PREMIUM
        </p>

        <h1 className="mt-3 text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold text-[#111827] leading-[1.06] tracking-[-0.03em]">
          Modern Fashion
          <br />
          For <span className="text-[#0055FF]">Everyone</span>
        </h1>

        <p className="mt-4 text-[14.5px] sm:text-[15.5px] text-[#374151] leading-[1.55] max-w-[420px]">
          Discover the latest trends in clothing, accessories and more. Premium quality, affordable price.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3.5">
          <button
            type="button"
            onClick={onShopNow}
            className="bg-[#0055FF] hover:bg-[#0044DD] text-white text-[14px] font-semibold px-7 py-3 rounded-full shadow-[0_10px_24px_rgba(0,85,255,0.28)] inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0055FF]"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            onClick={onWatchVideo}
            className="bg-white hover:bg-[#F5F8FF] text-[#111827] border border-[#1E3A8A]/20 hover:border-[#0055FF] text-[14px] font-semibold px-5 py-3 rounded-full inline-flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0055FF]"
          >
            <span className="w-5 h-5 rounded-full bg-[#0055FF] text-white flex items-center justify-center shrink-0">
              <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
            </span>
            <span>Watch Video</span>
          </button>
        </div>

        {/* Service Benefits Row */}
        <div className="mt-9 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:gap-y-0 max-w-[540px]">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.line1}
                className={`flex flex-col items-center text-center px-2.5 ${
                  idx < benefits.length - 1 ? 'sm:border-r sm:border-[#E5E7EB]' : ''
                }`}
              >
                <Icon className="w-[21px] h-[21px] text-[#0055FF] mb-2" strokeWidth={1.7} />
                <span className="text-[11px] font-medium text-[#374151] leading-[1.3]">
                  {item.line1}
                  <br />
                  {item.line2}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
