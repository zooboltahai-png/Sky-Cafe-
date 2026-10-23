import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone } from 'lucide-react';
import { getCart, subscribeStore } from '../services/store';

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
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+35699966313"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>+356 9996 6313</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <Link
              to="/track-order"
              className="hover:text-stone-100 transition-colors text-stone-400 hidden sm:inline"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (Action & Cart) */}
      <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="flex flex-col whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              Skyline Cafe Malta
            </span>
            <span className="text-[11px] font-medium tracking-widest text-stone-500 uppercase -mt-1">
              Sliema Waterfront
            </span>
          </Link>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <Link
              to="/menu"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/menu' ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/about' ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/gallery"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/gallery' ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/reviews"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/reviews' ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/contact' ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: 1 primary action button + Cart trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/order"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm"
            >
              Order Online
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative p-2.5 text-stone-800 hover:text-amber-800 bg-stone-100 hover:bg-stone-200/70 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-700 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 md:hidden text-stone-800 hover:bg-stone-200 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
            <div className="grid grid-cols-1 gap-1 py-2">
              <Link
                to="/menu"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Menu
              </Link>
              <Link
                to="/order"
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                Order Takeaway
              </Link>
              <Link
                to="/about"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                About Skyline
              </Link>
              <Link
                to="/gallery"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Photography Gallery
              </Link>
              <Link
                to="/reviews"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Google Reviews (4.9★)
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Contact & Directions
              </Link>
              <Link
                to="/track-order"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Track My Order
              </Link>
              <Link
                to="/faq"
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-stone-100 transition-colors"
              >
                Frequently Asked Questions
              </Link>
              <Link
                to="/admin"
                className="px-3 py-2.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors pt-2 border-t border-stone-200"
              >
                Owner Admin Portal
              </Link>
            </div>
            <div className="pt-2">
              <a
                href="tel:+35699966313"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 text-white rounded-lg text-sm font-semibold tracking-wide"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call +356 9996 6313
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
