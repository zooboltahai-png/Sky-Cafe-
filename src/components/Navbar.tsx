import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone } from 'lucide-react';
import { getCart, subscribeStore } from '../services/store';
import { SkylineLogo } from './SkylineLogo';

export const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const items = getCart();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    update();
    return subscribeStore(update);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top subtle notification bar with verified location & click-to-call */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-3 sm:px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 sm:gap-2 text-stone-400 text-[11px] sm:text-xs">
            <MapPin className="w-3.5 h-3.5 text-brand-peach shrink-0" />
            <span className="truncate">Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:+35699966313"
              className="flex items-center gap-1.5 hover:text-brand-peach transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-brand-peach shrink-0" />
              <span>+356 9996 6313</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <Link
              to="/track-order"
              className="hover:text-stone-100 transition-colors text-stone-400 hidden sm:inline"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Official Logo) — Zone 2 (Nav Links) — Zone 3 (Action & Cart) */}
      <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Zone 1: Official Skyline Cafe Circular Wordmark Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none group py-1"
            aria-label="Skyline Cafe Malta Homepage"
          >
            <SkylineLogo size="md" textColor="text-brand-burgundy group-hover:text-brand-burgundy-dark" />
          </Link>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            <Link
              to="/menu"
              className={`hover:text-brand-burgundy transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/menu' ? 'text-brand-burgundy font-semibold border-b-2 border-brand-burgundy pb-0.5' : ''
              }`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`hover:text-brand-burgundy transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/about' ? 'text-brand-burgundy font-semibold border-b-2 border-brand-burgundy pb-0.5' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/gallery"
              className={`hover:text-brand-burgundy transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/gallery' ? 'text-brand-burgundy font-semibold border-b-2 border-brand-burgundy pb-0.5' : ''
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/reviews"
              className={`hover:text-brand-burgundy transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/reviews' ? 'text-brand-burgundy font-semibold border-b-2 border-brand-burgundy pb-0.5' : ''
              }`}
            >
              Reviews (4.9★)
            </Link>
            <Link
              to="/contact"
              className={`hover:text-brand-burgundy transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/contact' ? 'text-brand-burgundy font-semibold border-b-2 border-brand-burgundy pb-0.5' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: 1 primary action button + Cart trigger + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/order"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-burgundy rounded-lg hover:bg-brand-burgundy-dark active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-xs ring-1 ring-brand-burgundy/20"
            >
              Order Takeaway
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative p-2.5 text-stone-800 hover:text-brand-burgundy bg-stone-100 hover:bg-brand-green/30 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-peach text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 lg:hidden text-stone-800 hover:bg-stone-200 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand-burgundy" /> : <MenuIcon className="w-6 h-6 text-stone-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-150 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="pb-3 border-b border-stone-200">
              <SkylineLogo size="sm" textColor="text-brand-burgundy" />
            </div>

            <div className="grid grid-cols-1 gap-1 py-1">
              <Link
                to="/order"
                className="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-bold text-white bg-brand-burgundy hover:bg-brand-burgundy-dark transition-colors shadow-xs"
              >
                <span>Order Online Takeaway</span>
                <span className="text-xs bg-brand-peach px-2 py-0.5 rounded-full uppercase tracking-wider text-white">Direct</span>
              </Link>
              <Link
                to="/menu"
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Full Cafe Menu
              </Link>
              <Link
                to="/about"
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                About Skyline Cafe Malta
              </Link>
              <Link
                to="/gallery"
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Atmosphere & Food Gallery
              </Link>
              <Link
                to="/reviews"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                <span>Guest Reviews</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">4.9 ★ (104)</span>
              </Link>
              <Link
                to="/contact"
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Contact & Waterfront Map
              </Link>
              <Link
                to="/track-order"
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Track My Takeaway
              </Link>
              <Link
                to="/faq"
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Frequently Asked Questions
              </Link>
              <Link
                to="/admin"
                className="px-3.5 py-2.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors pt-2 border-t border-stone-200"
              >
                Manager / Owner Portal (PIN: 1234)
              </Link>
            </div>

            <div className="pt-2">
              <a
                href="tel:+35699966313"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 text-white rounded-lg text-sm font-semibold tracking-wide hover:bg-stone-800"
              >
                <Phone className="w-4 h-4 text-brand-peach" />
                Call +356 9996 6313
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
