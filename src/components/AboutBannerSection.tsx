import React from 'react';
import { ArrowRight, Gem, Shirt, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface AboutBannerSectionProps {
  onLearnMore: () => void;
}

export const AboutBannerSection: React.FC<AboutBannerSectionProps> = ({ onLearnMore }) => {
  const shouldReduceMotion = useReducedMotion();

  const highlights = [
    {
      icon: Gem,
      line1: 'Premium',
      line2: 'Quality',
    },
    {
      icon: Shirt,
      line1: 'Trendy Designs',
      line2: '',
    },
    {
      icon: Zap,
      line1: 'Fast Delivery',
      line2: '',
    },
  ];

  return (
    <section aria-label="About HARUNA" className="px-6 sm:px-10 lg:px-12 pb-8">
      <div className="relative bg-[#0A0C10] rounded-[24px] overflow-hidden flex flex-col lg:flex-row items-stretch">
        {/* Left Photographic Visual: Black HARUNA Bag + Plant */}
        <div className="relative lg:w-[41%] min-h-[210px] lg:min-h-[245px] shrink-0 overflow-hidden bg-[#0A0C10]">
          <motion.img
            src="/images/about_bag.png"
            alt="Black HARUNA shopping bag with white H logo next to a green indoor plant"
            className="w-full h-full object-cover object-left will-change-transform"
            referrerPolicy="no-referrer"
            initial={shouldReduceMotion ? false : { opacity: 0.92, scale: 1 }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: [1.01, 1.065, 1.01],
                    y: [0, -5, 0],
                    x: [0, -4, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: { duration: 0.6, ease: 'easeOut' },
                    scale: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                    x: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.09, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
            }
          />
          <div
            className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#0A0C10] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Middle Content Block */}
        <div className="relative z-10 flex-1 px-6 sm:px-8 lg:px-6 py-7 lg:py-8 flex flex-col justify-center">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#3B82F6] uppercase">
            ABOUT HARUNA
          </p>

          <h2 className="mt-2 text-[26px] sm:text-[31px] font-extrabold text-white leading-[1.12] tracking-[-0.02em]">
            Quality Fashion
            <br />
            At Your Fingertips
          </h2>

          <p className="mt-3 text-[13.5px] text-[#D1D5DB] leading-[1.55] max-w-[355px]">
            We bring you the best fashion pieces with modern style, premium quality and comfort.
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={onLearnMore}
              className="bg-[#0055FF] hover:bg-[#0044DD] text-white text-[13.5px] font-semibold px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Thin Vertical Separator */}
        <div className="hidden lg:block w-px bg-white/15 my-8 self-stretch" aria-hidden="true" />
        <div className="lg:hidden h-px bg-white/15 mx-6" aria-hidden="true" />

        {/* Right Side Three Benefits */}
        <div className="lg:w-[27%] px-6 sm:px-8 lg:px-9 py-6 lg:py-8 flex flex-row lg:flex-col justify-between lg:justify-center gap-4 lg:gap-5 flex-wrap">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.line1} className="flex items-center gap-3.5">
                <Icon className="w-6 h-6 text-white shrink-0" strokeWidth={1.6} />
                <span className="text-[14px] font-semibold text-white leading-tight">
                  {item.line1}
                  {item.line2 ? (
                    <>
                      <br />
                      {item.line2}
                    </>
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
