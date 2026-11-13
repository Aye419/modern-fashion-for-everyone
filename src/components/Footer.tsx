import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CareTopic, PageView } from '../types/store';
import { HarunaLogo } from './HarunaLogo';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenCare: (topic: CareTopic) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCare }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-white border-t border-[#EEF0F6] rounded-b-[28px]">
      <div className="px-6 sm:px-10 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
        {/* Column 1: Brand + Tagline */}
        <div className="lg:col-span-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0055FF] rounded-md"
            aria-label="HARUNA Home"
          >
            <HarunaLogo size="md" />
          </button>
          <p className="mt-2.5 text-[13px] font-medium text-[#4B5563]">
            Wear The Change
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="text-[13.5px] font-bold text-[#111827] mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[13px] text-[#4B5563]">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                Shop
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div className="lg:col-span-3 lg:border-r lg:border-[#EEF0F6] lg:pr-6">
          <h3 className="text-[13.5px] font-bold text-[#111827] mb-3">Customer Care</h3>
          <ul className="space-y-2 text-[13px] text-[#4B5563]">
            <li>
              <button
                type="button"
                onClick={() => onOpenCare('shipping')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                Shipping Info
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCare('returns')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                Returns &amp; Exchanges
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCare('faqs')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                FAQs
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenCare('support')}
                className="hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                Support
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Stay Connected */}
        <div className="lg:col-span-4 lg:pl-3">
          <h3 className="text-[13.5px] font-bold text-[#111827] mb-1">Stay Connected</h3>
          <p className="text-[12.5px] text-[#4B5563] mb-3">
            Get the latest updates and offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex items-center bg-[#F9FAFB] border border-[#E5E7EB] focus-within:border-[#0055FF] rounded-full pl-4 pr-1.5 py-1.5 max-w-[320px] transition-colors"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none min-w-0"
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="w-8 h-8 rounded-full bg-[#0055FF] hover:bg-[#0044DD] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {subscribed && (
            <p className="mt-2 text-[12px] font-medium text-[#0055FF]">
              Thanks for subscribing to HARUNA updates!
            </p>
          )}

          {/* Social Icons: Facebook, X, Instagram, YouTube, TikTok */}
          <div className="mt-4 flex items-center gap-3.5 text-[#111827]">
            <a
              href="#facebook"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              aria-label="HARUNA on Facebook"
              className="hover:text-[#0055FF] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="#x"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              aria-label="HARUNA on X"
              className="hover:text-[#0055FF] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#instagram"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              aria-label="HARUNA on Instagram"
              className="hover:text-[#0055FF] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#youtube"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              aria-label="HARUNA on YouTube"
              className="hover:text-[#0055FF] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-current" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="#tiktok"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              aria-label="HARUNA on TikTok"
              className="hover:text-[#0055FF] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] fill-current" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Row */}
      <div className="border-t border-[#EEF0F6] bg-[#FAFAFD] rounded-b-[28px] px-6 sm:px-10 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-[#4B5563]">
        <p>
          &copy; 2026 <strong className="font-bold text-[#111827]">HARUNA</strong>. All rights reserved.
        </p>
        <p>
          Designed with{' '}
          <span role="img" aria-label="blue heart">
            💙
          </span>{' '}
          for Fashion Lovers
        </p>
      </div>
    </footer>
  );
};
