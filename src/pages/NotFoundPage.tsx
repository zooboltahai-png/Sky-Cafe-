import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Utensils, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 text-center space-y-5 shadow-xs">
        <span className="font-mono text-5xl font-extrabold text-amber-800">404</span>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          The page you are looking for does not exist or may have been moved. Let's get you back to our Mediterranean menu.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Utensils className="w-4 h-4" />
            <span>Browse Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
