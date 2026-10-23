import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from './pages/OrderPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CookiesPage } from './pages/CookiesPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically when location changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [cookieModalOpen, setCookieModalOpen] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900 font-sans">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route
              path="/cookies"
              element={<CookiesPage onOpenPreferencesModal={() => setCookieModalOpen(true)} />}
            />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer onOpenCookies={() => setCookieModalOpen(true)} />

        {/* Global Cookie Banner & Preferences Modal */}
        <CookieBanner
          forceOpenModal={cookieModalOpen}
          onCloseModal={() => setCookieModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
