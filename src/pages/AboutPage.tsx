import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Star, Coffee, Utensils, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            About Skyline Cafe Malta
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight text-balance">
            Mediterranean Hospitality on the Sliema Seafront
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            Located at Triq Ix-Xatt in Tas-Sliema, Skyline Cafe Malta is a welcoming seaside spot serving specialty coffee, artisan brunch, savoury ciabatta, and fresh smoothies.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl overflow-hidden shadow-md bg-stone-200 aspect-[4/3] md:aspect-auto">
            <img
              src="/src/assets/images/skyline_hero_sliema_1792764460169.jpg"
              alt="Sliema waterfront cafe terrace overlooking Marsamxett harbour"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/src/assets/images/skyline_hero_sliema_1792764460169.jpg';
              }}
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md bg-stone-200 aspect-[4/3] md:aspect-auto">
            <img
              src="/src/assets/images/food_avocado_poached_egg_1792764460074.jpg"
              alt="Avocado toast with poached egg at Skyline Cafe Malta"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/src/assets/images/skyline_hero_sliema_1792764460169.jpg';
              }}
            />
          </div>
        </div>

        {/* Narrative & Focus */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
              Our Food & Coffee Philosophy
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              At Skyline Cafe Malta, we believe in honest preparation, wholesome Mediterranean produce, and consistent quality. Whether you visit for a morning flat white before commuting, settle in for a leisurely avocado toast with farm poached eggs, or grab a crisp ciabatta mozzarella to enjoy along the promenade, each order is prepared fresh.
            </p>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              With a typical reported spend of €10–€20 per guest, we provide accessible, premium cafe dining for both Sliema residents and visitors discovering the Maltese coast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
            <div className="space-y-2">
              <Coffee className="w-6 h-6 text-amber-800" />
              <h3 className="font-bold text-stone-900 text-sm">Specialty Coffee</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Expertly dialed espresso beans, silky microfoam, and refreshing cold coffee selections.
              </p>
            </div>

            <div className="space-y-2">
              <Utensils className="w-6 h-6 text-amber-800" />
              <h3 className="font-bold text-stone-900 text-sm">Fresh Brunch Daily</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Smoked salmon croissants, roasted tomatoes with feta, seasoned black bean avocado toasts, and sweet baked treats.
              </p>
            </div>

            <div className="space-y-2">
              <Star className="w-6 h-6 text-amber-800" />
              <h3 className="font-bold text-stone-900 text-sm">4.9 / 5.0 Google Rating</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Earned from 104 verified reviews reflecting warm hospitality and consistently fresh food.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Business Details Card */}
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Official Location & Contact
              </span>
              <h3 className="font-editorial text-2xl font-bold mt-1">Skyline Cafe Malta</h3>
              <p className="text-stone-400 text-sm mt-1">
                Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+35699966313"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
              >
                Call +356 9996 6313
              </a>
              <Link
                to="/contact"
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors border border-stone-700"
              >
                Directions & Map
              </Link>
            </div>
          </div>

          <div className="text-xs text-stone-400 leading-relaxed">
            Note: Skyline Cafe Malta operates in the European Union under Maltese commercial regulations. All customer inquiries, reservations, or catering queries can be directed via our contact page or by phone.
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            <span>Explore our full menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
