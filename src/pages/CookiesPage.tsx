import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings, Check, X } from 'lucide-react';
import { getCookiePreferences, saveCookiePreferences, subscribeStore } from '../services/store';
import { CookiePreferences } from '../types';

interface CookiesPageProps {
  onOpenPreferencesModal?: () => void;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ onOpenPreferencesModal }) => {
  const [prefs, setPrefs] = useState<CookiePreferences>(getCookiePreferences());

  useEffect(() => {
    const update = () => setPrefs(getCookiePreferences());
    return subscribeStore(update);
  }, []);

  const handleToggle = (key: 'analytics' | 'marketing') => {
    saveCookiePreferences({
      [key]: !prefs[key]
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-stone-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800">
            <Cookie className="w-4 h-4" />
            <span>Compliance & Transparency</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Cookie Policy & Consent Management
          </h1>
          <p className="text-xs text-stone-500">
            Compliant with EU ePrivacy Directive & Maltese Legal Notice 326
          </p>
        </div>

        {/* Current Status Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <h2 className="font-editorial text-xl font-bold text-stone-900">
                Your Current Cookie Preferences
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {prefs.hasResponded
                  ? `Preferences recorded on ${prefs.updatedAt ? new Date(prefs.updatedAt).toLocaleDateString('en-GB') : 'this device'}.`
                  : 'Default privacy mode active: Only strictly necessary cookies enabled.'}
              </p>
            </div>

            {onOpenPreferencesModal && (
              <button
                type="button"
                onClick={onOpenPreferencesModal}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Open Preferences Modal</span>
              </button>
            )}
          </div>

          {/* Interactive Toggle Cards */}
          <div className="space-y-4">
            
            {/* Strictly Essential */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">Strictly Essential Cookies</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                    Always Required
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  These cookies are vital for the proper operation of the website, including takeaway cart persistence, CSRF security, and order checkout verification. They cannot be turned off.
                </p>
              </div>
              <div className="text-emerald-700 font-semibold text-xs py-1 px-2.5 bg-emerald-50 rounded border border-emerald-200 shrink-0">
                Active
              </div>
            </div>

            {/* Analytics */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">Performance & Analytics</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    Optional
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Allows us to measure anonymous visit counts, popular menu categories, and device compatibility without storing personal customer identities.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                  prefs.analytics
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                }`}
              >
                {prefs.analytics ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Marketing */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">Marketing & Third-Party Embeds</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    Optional
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Used if external interactive map directions, social feeds, or promotional banners are loaded.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('marketing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                  prefs.marketing
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                }`}
              >
                {prefs.marketing ? 'Enabled' : 'Disabled'}
              </button>
            </div>

          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed shadow-2xs">
          <h3 className="font-editorial text-xl font-bold text-stone-900">
            How to Control Cookies Through Your Browser
          </h3>
          <p>
            You can also configure your web browser (Safari, Chrome, Firefox, Edge) to notify you when a cookie is placed or to block cookies entirely. Note that disabling all cookies may prevent our digital shopping bag from retaining your selected takeaway items.
          </p>
          <p>
            For further queries regarding our data handling practices, visit our <a href="/privacy" className="text-amber-800 underline font-medium">Privacy Policy</a> or contact us directly.
          </p>
        </div>

      </div>
    </div>
  );
};
