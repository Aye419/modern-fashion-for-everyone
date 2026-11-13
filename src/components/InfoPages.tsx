import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Gem, Mail, MapPin, Phone, Shirt, Zap } from 'lucide-react';
import { CareTopic } from '../types/store';

interface AboutPageProps {
  onShopNow: () => void;
  onBackHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onShopNow, onBackHome }) => {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0055FF] hover:underline mb-5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="bg-[#0A0C10] rounded-[24px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-5 h-full min-h-[260px]">
          <img
            src="/images/about_bag.png"
            alt="HARUNA shopping bag and studio plant"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="lg:col-span-7 p-8 sm:p-10 text-white">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#3B82F6] uppercase">
            ABOUT HARUNA &bull; WEAR THE CHANGE
          </p>
          <h1 className="mt-2 text-[30px] sm:text-[38px] font-extrabold leading-[1.12]">
            Quality Fashion At Your Fingertips
          </h1>
          <p className="mt-4 text-[14.5px] text-[#D1D5DB] leading-[1.65] max-w-[560px]">
            Founded with a vision to make elevated streetwear accessible to everyone, HARUNA pairs heavy-weight organic textiles with clean architectural silhouettes. Every piece is designed to move effortlessly from everyday wear to statement moments.
          </p>
          <button
            type="button"
            onClick={onShopNow}
            className="mt-6 bg-[#0055FF] hover:bg-[#0044DD] text-white text-[14px] font-semibold px-7 py-3 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#F9FAFD] border border-[#EEF0F6] rounded-[20px] p-6">
          <Gem className="w-6 h-6 text-[#0055FF] mb-3" />
          <h2 className="text-[16px] font-bold text-[#111827]">Premium Quality</h2>
          <p className="mt-1.5 text-[13.5px] text-[#4B5563] leading-relaxed">
            Heavyweight 420gsm fleece, combed ringspun cotton, and durable stitching built for longevity.
          </p>
        </div>
        <div className="bg-[#F9FAFD] border border-[#EEF0F6] rounded-[20px] p-6">
          <Shirt className="w-6 h-6 text-[#0055FF] mb-3" />
          <h2 className="text-[16px] font-bold text-[#111827]">Trendy Designs</h2>
          <p className="mt-1.5 text-[13.5px] text-[#4B5563] leading-relaxed">
            Minimalist palettes, clean typography, and versatile silhouettes tailored for modern wardrobes.
          </p>
        </div>
        <div className="bg-[#F9FAFD] border border-[#EEF0F6] rounded-[20px] p-6">
          <Zap className="w-6 h-6 text-[#0055FF] mb-3" />
          <h2 className="text-[16px] font-bold text-[#111827]">Fast Delivery</h2>
          <p className="mt-1.5 text-[13.5px] text-[#4B5563] leading-relaxed">
            Worldwide tracked dispatch within 24 hours and hassle-free 30-day exchanges.
          </p>
        </div>
      </div>
    </section>
  );
};

interface ContactPageProps {
  onBackHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0055FF] hover:underline mb-5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-bold tracking-[0.13em] text-[#0055FF] uppercase">
            GET IN TOUCH
          </p>
          <h1 className="mt-1.5 text-[30px] sm:text-[34px] font-extrabold text-[#111827] leading-tight">
            Contact HARUNA
          </h1>
          <p className="mt-3 text-[14.5px] text-[#4B5563] leading-relaxed">
            Questions about sizing, orders, or collaborations? Our support team responds within 24 hours.
          </p>

          <div className="mt-6 space-y-4 text-[13.5px] text-[#374151]">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#EEF4FF] text-[#0055FF] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </span>
              <span>support@harunafashion.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#EEF4FF] text-[#0055FF] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              <span>+1 (800) 555-0194</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#EEF4FF] text-[#0055FF] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </span>
              <span>420 Mercer Studio, New York, NY</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#F9FAFD] border border-[#EEF0F6] rounded-[24px] p-6 sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#0055FF] mx-auto mb-3" />
              <h2 className="text-[20px] font-bold text-[#111827]">Message Received</h2>
              <p className="mt-1.5 text-[14px] text-[#4B5563]">
                Thank you for reaching out to HARUNA. We will reply shortly.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#0055FF] text-white text-[13.5px] font-semibold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-[13px] font-semibold text-[#111827] mb-1.5">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-white border border-[#E5E7EB] focus:border-[#0055FF] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[13px] font-semibold text-[#111827] mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full bg-white border border-[#E5E7EB] focus:border-[#0055FF] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-[13px] font-semibold text-[#111827] mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help with your order?"
                  className="w-full bg-white border border-[#E5E7EB] focus:border-[#0055FF] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0055FF] hover:bg-[#0044DD] text-white text-[14px] font-semibold px-7 py-3 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

interface CarePageProps {
  topic: CareTopic;
  onSelectTopic: (topic: CareTopic) => void;
  onBackHome: () => void;
}

export const CarePage: React.FC<CarePageProps> = ({ topic, onSelectTopic, onBackHome }) => {
  const content: Record<CareTopic, { title: string; items: { q: string; a: string }[] }> = {
    shipping: {
      title: 'Shipping Information',
      items: [
        {
          q: 'Free Worldwide Shipping',
          a: 'All HARUNA orders qualify for complimentary tracked standard shipping worldwide with dispatch within 24 business hours.',
        },
        {
          q: 'Estimated Delivery Times',
          a: 'North America & Europe: 3–5 business days. Asia-Pacific & Rest of World: 5–8 business days.',
        },
      ],
    },
    returns: {
      title: 'Returns & Exchanges',
      items: [
        {
          q: '30-Day Hassle-Free Guarantee',
          a: 'Unworn items with original tags may be returned or exchanged for a different size within 30 days of delivery.',
        },
        {
          q: 'Instant Size Exchanges',
          a: 'Select your preferred replacement size and your new garment ships as soon as your return label is scanned.',
        },
      ],
    },
    faqs: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How do HARUNA hoodies and tees fit?',
          a: 'Our Classic Hoodie and Graphic T-Shirt feature a modern relaxed fit. Take your usual size for a clean drape or size down for a closer fit.',
        },
        {
          q: 'How should I care for my garments?',
          a: 'Machine wash cold inside out with similar colors and hang dry to preserve fabric weight and graphic print crispness.',
        },
      ],
    },
    support: {
      title: '24/7 Customer Support',
      items: [
        {
          q: 'Always-On Order Assistance',
          a: 'Reach our support team anytime at support@harunafashion.com or +1 (800) 555-0194 for immediate order tracking and styling help.',
        },
      ],
    },
  };

  const active = content[topic];

  return (
    <section className="px-6 sm:px-10 lg:px-12 py-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0055FF] hover:underline mb-5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <p className="text-[11px] font-bold tracking-[0.13em] text-[#0055FF] uppercase">
        CUSTOMER CARE
      </p>
      <h1 className="mt-1 text-[28px] sm:text-[34px] font-extrabold text-[#111827]">
        {active.title}
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            ['shipping', 'Shipping Info'],
            ['returns', 'Returns & Exchanges'],
            ['faqs', 'FAQs'],
            ['support', 'Support'],
          ] as [CareTopic, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelectTopic(id)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${
              topic === id
                ? 'bg-[#0055FF] text-white'
                : 'bg-[#F4F6FB] text-[#374151] hover:bg-[#E7EBF7]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {active.items.map((item) => (
          <div
            key={item.q}
            className="bg-[#F9FAFD] border border-[#EEF0F6] rounded-[18px] p-6"
          >
            <h2 className="text-[16px] font-bold text-[#111827]">{item.q}</h2>
            <p className="mt-1.5 text-[14px] text-[#4B5563] leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
