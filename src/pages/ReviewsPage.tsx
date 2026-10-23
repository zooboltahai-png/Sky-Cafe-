import React from 'react';
import { Star, ExternalLink, ShieldCheck, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReviewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Verified Customer Rating
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Guest Reviews & Feedback
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Authentic feedback supplied directly from real guests on Google Business.
          </p>
        </div>

        {/* Rating Scorecard Banner */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-xs text-center space-y-6">
          <div className="inline-block p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="text-5xl sm:text-6xl font-extrabold text-stone-900 tabular-nums">
              4.9
            </div>
            <div className="flex justify-center text-amber-500 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-editorial text-2xl font-bold text-stone-900">
              Exceptional Coastal Cafe Experience
            </h3>
            <p className="text-sm text-stone-500">
              Aggregated from <strong className="text-stone-900 font-semibold">104 verified reviews</strong> on Google.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 max-w-xl mx-auto text-left flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-stone-900 block">Authentic Review Policy:</span>
              <p>
                In accordance with European Union consumer transparency regulations and our strict ethical policy, we never generate artificial testimonials or paid reviews. The 4.9 rating represents actual guest evaluations published on Google Business.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Skyline+Cafe+Malta+Triq+Ix-Xatt+Tas-Sliema"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>View Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Skyline+Cafe+Malta+Triq+Ix-Xatt+Tas-Sliema"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Leave a Google Review</span>
            </a>
          </div>
        </div>

        {/* Highlights Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              ☕
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Artisan Coffee</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Consistently praised for velvety flat whites, proper Italian extraction, and alternative milks.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              🥑
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Brunch Quality</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Guests love the avocado sourdough toasts, rich salmon croissants, and mozzarella ciabatta.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
              🌊
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Waterfront Location</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Prime spot on Triq Ix-Xatt Sliema, ideal for a morning stroll or seaside breather.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            <span>Experience It Yourself · Order Takeaway</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
