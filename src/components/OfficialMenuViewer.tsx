import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, FileText, AlertCircle, ZoomIn } from 'lucide-react';

export interface OfficialMenuPage {
  id: string;
  pageNumber: number;
  title: string;
  subtitle: string;
  src: string;
  description: string;
}

export const OFFICIAL_MENU_PAGES: OfficialMenuPage[] = [
  {
    id: 'menu-page-01',
    pageNumber: 1,
    title: 'Page 1 — Breakfast, Brunch, Sandwiches & Wraps',
    subtitle: 'Morning classics, sourdough toasts, filled croissants, and artisan ciabattas',
    src: '/images/official-menu/menu-page-01.png',
    description: 'Official printed menu page featuring Avo & Egg Heaven, Miso Scramble, Mortadella Ciabatta, and artisan sandwiches.'
  },
  {
    id: 'menu-page-02',
    pageNumber: 2,
    title: 'Page 2 — Salads, Soup, Platters, Nibbles & Desserts',
    subtitle: 'Mediterranean salads, Bouyiourdi, antipasto board, and sweet crêpes',
    src: '/images/official-menu/menu-page-02.png',
    description: 'Official printed menu page featuring Chicken Pesto Salad, Greek Salad, Cheese Board, Brownies, and Antica Gelateria Gelato.'
  },
  {
    id: 'menu-page-03',
    pageNumber: 3,
    title: 'Page 3 — Spritzers, Cocktails, Shakes, Coffee & Wines',
    subtitle: 'Italian spritzers, signature cocktails, smoothies, espresso & Sicilian wines',
    src: '/images/official-menu/menu-page-03.png',
    description: 'Official printed beverage board with Aperol, Limoncello, Donnafugata wines, Cisk lager, and specialty coffees.'
  },
  {
    id: 'menu-page-04',
    pageNumber: 4,
    title: 'Page 4 — Morning Specials, Toasties & Ftira (Table Card)',
    subtitle: 'Daily toasties, creamy mushrooms, Maltese ftira, and filled croissants',
    src: '/images/official-menu/menu-page-04.png',
    description: 'Official table card for breakfast till 12pm, artisan toasties, and savory filled croissants.'
  },
  {
    id: 'menu-page-05',
    pageNumber: 5,
    title: 'Page 5 — Curated Wine List & Beverages (Table Card)',
    subtitle: 'White, red & rosé wines by the bottle & glass, cocktails, and soft drinks',
    src: '/images/official-menu/menu-page-05.png',
    description: 'Official table card for international & local wines, spritzers, and refreshing chilled beverages.'
  }
];

export const OfficialMenuViewer: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const currentPage = OFFICIAL_MENU_PAGES[currentPageIndex];

  const handleNext = useCallback(() => {
    setCurrentPageIndex(prev => (prev < OFFICIAL_MENU_PAGES.length - 1 ? prev + 1 : 0));
    setImageLoaded(false);
    setImageError(false);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : OFFICIAL_MENU_PAGES.length - 1));
    setImageLoaded(false);
    setImageError(false);
  }, []);

  const handleSelectPage = (index: number) => {
    if (index === currentPageIndex) return;
    setCurrentPageIndex(index);
    setImageLoaded(false);
    setImageError(false);
  };

  // Keyboard navigation for lightbox & viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  return (
    <section 
      aria-label="Official Printed Menu"
      className="bg-stone-900 text-white rounded-3xl p-4 sm:p-8 border border-stone-800 shadow-xl overflow-hidden my-10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Printed Menu</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
            Original Restaurant Menu Reference
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            View the high-resolution scanned photographs of our physical printed cafe boards at Triq Ix-Xatt, Sliema. Click any page to expand.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous menu page"
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors border border-stone-700 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-stone-300 px-3 py-1.5 bg-stone-800/80 rounded-lg border border-stone-700 tabular-nums">
            Page {currentPageIndex + 1} of {OFFICIAL_MENU_PAGES.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next menu page"
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors border border-stone-700 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Display & Thumbnails */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Main Stage Image (3 cols on large) */}
        <div className="lg:col-span-3 space-y-3">
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="group relative bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center cursor-zoom-in min-h-[360px] sm:min-h-[520px] transition-all hover:border-amber-400/50"
          >
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-stone-500">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Loading printed menu scan...</span>
              </div>
            )}

            {imageError ? (
              <div className="p-8 text-center text-stone-400 space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-sm font-medium">Unable to load printed menu page.</p>
                <button
                  type="button"
                  onClick={() => { setImageError(false); setImageLoaded(false); }}
                  className="text-xs text-amber-400 underline"
                >
                  Retry loading
                </button>
              </div>
            ) : (
              <img
                src={currentPage.src}
                alt={currentPage.title}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`max-h-[560px] w-auto max-w-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {/* Click to Expand Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-medium text-stone-200 opacity-90 group-hover:opacity-100 group-hover:border-amber-400/60 transition-all">
              <ZoomIn className="w-4 h-4 text-amber-400" />
              <span>Click to Enlarge</span>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-stone-900/85 backdrop-blur-md px-4 py-2 rounded-xl border border-stone-700 text-xs">
              <span className="font-bold text-amber-300 block">{currentPage.title}</span>
              <span className="text-stone-300 text-[11px]">{currentPage.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Column (1 col on large) */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
            Select Menu Page
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
            {OFFICIAL_MENU_PAGES.map((page, index) => {
              const isSelected = currentPageIndex === index;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => handleSelectPage(index)}
                  className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400/80 shadow-md ring-1 ring-amber-400/50'
                      : 'bg-stone-950/60 hover:bg-stone-800 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {/* Mini thumbnail */}
                  <div className="w-10 h-14 bg-stone-900 rounded overflow-hidden shrink-0 border border-stone-700 flex items-center justify-center">
                    <img
                      src={page.src}
                      alt={`Thumbnail ${page.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                      }`}>
                        Card {page.pageNumber}
                      </span>
                    </div>
                    <p className={`text-xs font-semibold truncate mt-1 ${isSelected ? 'text-amber-200' : 'text-stone-300'}`}>
                      {page.title.split('—')[1] || page.title}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {page.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
            <span className="font-semibold text-stone-300 block">Navigation Tip:</span>
            <span>Use Left/Right arrow keys on your keyboard to flip between official menu pages.</span>
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Topbar */}
          <div 
            className="flex items-center justify-between py-2 text-white border-b border-stone-800 max-w-6xl mx-auto w-full shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Official Printed Menu Scan
              </span>
              <h3 className="font-editorial text-lg sm:text-xl font-bold">
                {currentPage.title}
              </h3>
              <p className="text-xs text-stone-400 hidden sm:block">
                {currentPage.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400 tabular-nums">
                {currentPageIndex + 1} / {OFFICIAL_MENU_PAGES.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen menu viewer"
                className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div 
            className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous menu page"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-100 border border-stone-700 transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={currentPage.src}
              alt={currentPage.title}
              className="max-h-[82vh] w-auto max-w-full object-contain select-none rounded-lg shadow-2xl"
            />

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next menu page"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-100 border border-stone-700 transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer */}
          <div 
            className="py-3 text-center text-xs text-stone-400 border-t border-stone-800 shrink-0 max-w-6xl mx-auto w-full flex items-center justify-between"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-[11px] text-stone-500">Press Esc or click close to exit viewer</span>
            <div className="flex gap-2">
              {OFFICIAL_MENU_PAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPage(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPageIndex === idx ? 'bg-amber-400 scale-125' : 'bg-stone-700 hover:bg-stone-500'
                  }`}
                  aria-label={`Jump to page ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
