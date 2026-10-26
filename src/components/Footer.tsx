import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Star, ShieldCheck } from 'lucide-react';
import { getSettings } from '../services/store';
import { SkylineLogo } from './SkylineLogo';

interface FooterProps {
  onOpenCookies?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCookies }) => {
  const settings = getSettings();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand & Verified Facts */}
          <div className="space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <SkylineLogo size="md" textColor="text-white" subtextColor="text-stone-400" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Contemporary Mediterranean cafe along the Sliema waterfront. Specialty coffee, artisan ciabatta, breakfast, and brunch.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                <span className="font-semibold text-stone-200">4.9 / 5.0</span>
                <span>(104 verified Google reviews)</span>
              </div>
              <div className="text-stone-400">
                Typical reported spend: <span className="text-stone-300">€10–€20 per person</span>
              </div>
            </div>
          </div>

          {/* Column 2: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Location & Contact
            </h4>
            <div className="space-y-2 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  Triq Ix-Xatt,<br />
                  Tas-Sliema SLM 3113, Malta
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="tel:+35699966313"
                  className="hover:text-amber-400 transition-colors font-medium text-stone-200"
                >
                  +356 9996 6313
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Hours & Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Opening Hours
            </h4>
            <div className="text-sm text-stone-400 space-y-1.5">
              <div className="flex justify-between gap-4">
                <span>Mon – Thu</span>
                <span className="text-stone-300 tabular-nums">{settings.openingHours.monday}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Friday</span>
                <span className="text-stone-300 tabular-nums">{settings.openingHours.friday}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-stone-300 tabular-nums">{settings.openingHours.saturday}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-stone-300 tabular-nums">{settings.openingHours.sunday}</span>
              </div>
              <div className="pt-2 text-xs text-stone-500">
                Service: Dine-in & Takeaway Pickup
              </div>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors">
                  Digital Menu
                </Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-amber-400 transition-colors">
                  Order Takeaway
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-amber-400 transition-colors">
                  Track Existing Order
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Skyline Cafe
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">
                  Photography Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-amber-400 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Map
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  FAQ & Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with GDPR, Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Skyline Cafe Malta. All rights reserved. Sliema, Malta (EU).
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-stone-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/cookies" className="hover:text-stone-300 transition-colors">
              Cookie Policy
            </Link>
            {onOpenCookies && (
              <button
                type="button"
                onClick={onOpenCookies}
                className="hover:text-amber-400 transition-colors cursor-pointer underline underline-offset-2"
              >
                Cookie Preferences
              </button>
            )}
            <Link to="/admin" className="hover:text-stone-300 transition-colors text-stone-600">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
