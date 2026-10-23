import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check, X } from 'lucide-react';
import { getCookiePreferences, saveCookiePreferences, subscribeStore } from '../services/store';
import { CookiePreferences } from '../types';

interface CookieBannerProps {
  forceOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ forceOpenModal, onCloseModal }) => {
  const [prefs, setPrefs] = useState<CookiePreferences>(getCookiePreferences());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<boolean>(prefs.analytics);
  const [marketing, setMarketing] = useState<boolean>(prefs.marketing);

  useEffect(() => {
    const update = () => {
      const current = getCookiePreferences();
      setPrefs(current);
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    };
    return subscribeStore(update);
  }, []);

  useEffect(() => {
    if (forceOpenModal) {
      setShowModal(true);
    }
  }, [forceOpenModal]);

  const handleAcceptAll = () => {
    saveCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true
    });
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false
    });
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({
      essential: true,
      analytics,
      marketing
    });
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  // If already responded and modal not requested, do not render banner
  if (prefs.hasResponded && !showModal) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Consent Banner (if not yet responded) */}
      {!prefs.hasResponded && !showModal && (
        <aside
          role="dialog"
          aria-label="Cookie consent banner"
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-stone-900 text-stone-100 border-t border-stone-800 shadow-2xl animate-in slide-in-from-bottom duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3 max-w-3xl">
              <Shield className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                In compliance with EU GDPR and Maltese data protection standards, Skyline Cafe Malta uses essential cookies for cart functionality and order security. Non-essential cookies for analytics or marketing are disabled until you choose your preferences.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-transparent border border-stone-700 hover:border-stone-500 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 id="cookie-modal-title" className="text-lg font-bold">
                  Cookie & Privacy Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  if (onCloseModal) onCloseModal();
                }}
                className="text-stone-400 hover:text-white p-1 rounded-md"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-400 py-4 leading-relaxed">
              Manage how Skyline Cafe Malta stores data in your browser. Essential cookies cannot be turned off as they are technically necessary to operate online ordering and maintain session integrity.
            </p>

            <div className="space-y-4 py-2">
              {/* Essential */}
              <div className="p-3.5 rounded-lg bg-stone-800/60 border border-stone-700/60 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-100">Strictly Essential</span>
                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/50 px-1.5 py-0.5 rounded">Always Active</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    Enables cart persistence, order checkout security, and verification protection.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-lg bg-stone-800/60 border border-stone-700/60 flex items-start justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-stone-100">Performance & Analytics</span>
                  <p className="text-xs text-stone-400 mt-1">
                    Helps us understand website traffic and menu popularity without recording personal identities.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-label="Allow performance and analytics cookies"
                  className="mt-1 h-5 w-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-lg bg-stone-800/60 border border-stone-700/60 flex items-start justify-between gap-3">
                <div>
                  <span className="text-sm font-semibold text-stone-100">Marketing & External Embeds</span>
                  <p className="text-xs text-stone-400 mt-1">
                    Permits interactive external mapping services and promotional updates.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  aria-label="Allow marketing cookies"
                  className="mt-1 h-5 w-5 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-md transition-colors cursor-pointer"
              >
                Reject All Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
