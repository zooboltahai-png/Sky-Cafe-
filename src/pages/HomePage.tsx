import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, ArrowRight, ShoppingBag, Check, Coffee } from 'lucide-react';
import { getProducts, addToCart, getSettings, subscribeStore } from '../services/store';
import { Product, BusinessSettings } from '../types';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setProducts(getProducts());
      setSettings(getSettings());
    };
    update();
    return subscribeStore(update);
  }, []);

  const handleQuickAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const featured = products.filter(p => p.isHighlight).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        {/* Ambient background with photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/skyline_hero_sliema.jpg"
            alt="Skyline Cafe Malta waterfront terrace overlooking Marsamxett harbour"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-stone-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
          <div className="max-w-3xl space-y-6">
            
            {/* Location & Trust Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-stone-800/80 backdrop-blur-md border border-stone-700 text-xs font-medium text-stone-200">
              <span className="text-amber-400">★ 4.9 Rating</span>
              <span className="text-stone-500">·</span>
              <span>104 Google Reviews</span>
              <span className="text-stone-500">·</span>
              <span>Triq Ix-Xatt, Sliema</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.12] text-balance">
              Artisan Coffee & Mediterranean Brunch on the Sliema Promenade
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              Welcome to Skyline Cafe Malta. Freshly toasted sourdough, flaky croissants, warm savoury ciabattas, vibrant smoothies, and specialty espresso roasted to perfection.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/order"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Takeaway</span>
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-stone-800/90 hover:bg-stone-700/90 border border-stone-600 rounded-lg transition-all"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Facts Strip */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-stone-800/80 text-xs text-stone-300">
              <div className="space-y-1">
                <span className="text-stone-400 block font-medium">Typical Spend</span>
                <span className="font-semibold text-stone-100 text-sm">{settings.typicalSpend}</span>
              </div>
              <div className="space-y-1">
                <span className="text-stone-400 block font-medium">Opening Hours</span>
                <span className="font-semibold text-stone-100 text-sm">Mon–Sun from 07:30</span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-stone-400 block font-medium">Fulfillment</span>
                <span className="font-semibold text-stone-100 text-sm">Dine-in & Quick Pickup</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED MENU HIGHLIGHTS */}
      <section className="py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Culinary Highlights
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1">
                Signature Cafe Selections
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors"
            >
              <span>Explore all dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.name}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-semibold rounded tabular-nums">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                      <span>{item.category.replace('-', ' ').toUpperCase()}</span>
                      {item.dietary && item.dietary.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-amber-800">{item.dietary[0]}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-editorial text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    disabled={!item.available}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      addedId === item.id
                        ? 'bg-emerald-700 text-white'
                        : item.available
                        ? 'bg-brand-burgundy hover:bg-brand-burgundy-dark text-white active:scale-[0.98]'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : item.available ? (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Order · €{item.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span>Currently Sold Out</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SLIEMA WATERFRONT ATMOSPHERE */}
      <section className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                The Setting
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                Mediterranean Life Along Triq Ix-Xatt
              </h2>
              <p className="text-stone-700 text-base leading-relaxed">
                Positioned on Sliema's iconic seafront avenue, Skyline Cafe Malta serves as a relaxed hub for morning coffee, leisurely brunches, and takeaway snacks. Whether you are strolling the Sliema promenade, heading to the ferry across to Valletta, or taking a midday work break, our doors are open with fresh food and warm hospitality.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-white border border-stone-200">
                  <Coffee className="w-5 h-5 text-amber-700 mb-2" />
                  <h4 className="font-semibold text-stone-900 text-sm">Specialty Coffee</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Precision extracted espresso, velvety flat whites, and dairy-free milk alternatives.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-stone-200">
                  <Star className="w-5 h-5 text-amber-700 mb-2" />
                  <h4 className="font-semibold text-stone-900 text-sm">4.9 / 5.0 Rating</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Consistently acclaimed by local Sliema regulars and travellers across 104 Google reviews.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors"
                >
                  <span>Learn more about our cafe</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-200">
                <img
                  src="/images/menu/food_salmon_croissant_1792764460900.jpg"
                  alt="Freshly baked all-butter croissant with smoked salmon and cream cheese"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-stone-900 text-white p-5 rounded-xl shadow-xl hidden sm:block max-w-xs border border-stone-800">
                <div className="text-amber-400 font-bold text-xl tabular-nums">€10 – €20</div>
                <div className="text-xs text-stone-300 mt-0.5">Typical spend for a complete breakfast, brunch, or coffee break.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VERIFIED REVIEWS SUMMARY SECTION */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Guest Feedback
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">
              Rated 4.9 Stars on Google
            </h2>
            <div className="flex items-center justify-center gap-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xl font-bold text-stone-100 tabular-nums">4.9 / 5.0</span>
            </div>
            <p className="text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
              Based on 104 genuine customer reviews for Skyline Cafe Malta at Triq Ix-Xatt, Sliema. We take pride in friendly service, wholesome ingredients, and consistent coffee quality.
            </p>
            <div className="pt-4">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-semibold uppercase tracking-wider transition-colors border border-stone-700"
              >
                <span>Read Review Information</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS STRIP */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-800 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-base">Address</h4>
                <p className="text-sm text-stone-600 mt-1">
                  Triq Ix-Xatt, Tas-Sliema<br />
                  SLM 3113, Malta
                </p>
                <Link to="/contact" className="text-xs font-semibold text-amber-800 hover:underline mt-2 inline-block">
                  View interactive map →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-800 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-base">Phone & Orders</h4>
                <p className="text-sm text-stone-600 mt-1">
                  Call for questions or large takeaway batches:
                </p>
                <a href="tel:+35699966313" className="text-sm font-bold text-stone-900 hover:text-amber-800 mt-1 block">
                  +356 9996 6313
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-800 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-base">Daily Hours</h4>
                <p className="text-sm text-stone-600 mt-1">
                  Monday – Sunday from 07:30<br />
                  Takeaway & dine-in all day
                </p>
                <span className="text-xs text-stone-500 mt-1 block">
                  Last orders 15 min before closing
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Ready to order freshly prepared brunch?
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto text-base">
            Skip the waiting queue. Select your dishes online, specify your preferred pickup time, and we will have your food packaged hot and ready at our counter in Sliema.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/order"
              className="px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm"
            >
              Start Takeaway Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
