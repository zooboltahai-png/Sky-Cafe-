import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqPage: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      q: 'Where exactly is Skyline Cafe Malta located?',
      a: 'We are situated at Triq Ix-Xatt in Tas-Sliema (SLM 3113), Malta, along the main waterfront promenade within easy walking distance from the Sliema ferry landing and bus stops.'
    },
    {
      q: 'What are your daily opening hours?',
      a: 'We open every morning at 07:30 (Sundays from 08:00) until evening. For specific public holiday hours or special event notices, please check our live status or call +356 9996 6313.'
    },
    {
      q: 'How does online takeaway ordering work?',
      a: 'You can browse our digital menu, select your dishes, specify your preferred pickup time, and submit your order online. You will receive an instant order reference (e.g. SKY-1042) which you present at our counter when you collect your food.'
    },
    {
      q: 'Do you offer home or office delivery?',
      a: 'At present, courier door-to-door delivery is not an officially confirmed service. All orders placed through our website are prepared for fast, hot takeaway collection directly from our cafe in Sliema.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'Payment is made upon collection at our counter. We accept major debit and credit cards (Visa, Mastercard), contactless mobile payments, and Cash in euros (€).'
    },
    {
      q: 'What is the typical price range per person?',
      a: 'Based on customer dining reports and our menu prices, typical spend is between €10 and €20 per person for a complete brunch, sandwich, and specialty beverage.'
    },
    {
      q: 'Do you accommodate allergies and dietary restrictions?',
      a: 'Yes. We offer vegetarian options (such as Ciabatta Mozzarella and Avocado Toasts), vegan-friendly toast options, dairy-free milk alternatives for coffees, and pescatarian items (Smoked Salmon Croissant). However, please note that food is prepared in a kitchen handling gluten, dairy, nuts, eggs, and seafood. Always alert our staff to severe allergies before ordering.'
    },
    {
      q: 'Can I track my order once submitted?',
      a: 'Yes! Navigate to our Track Order page and enter your order reference and phone number to verify and view real-time preparation status.'
    }
  ];

  const [openIndices, setOpenIndices] = useState<number[]>([0, 2]);

  const toggleIndex = (idx: number) => {
    setOpenIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Information</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto">
            Everything you need to know about dining, takeaway ordering, location, and cafe policies in Sliema.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-editorial font-bold text-base text-stone-900 hover:text-amber-800 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="p-8 bg-stone-900 text-white rounded-2xl text-center space-y-4">
          <h3 className="font-editorial text-2xl font-bold">Have another question?</h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            Our team in Sliema is always happy to assist with reservations, custom dietary requests, or group takeaways.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+35699966313"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call +356 9996 6313</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-white font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-stone-700 transition-colors border border-stone-700"
            >
              <span>Contact Page</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
