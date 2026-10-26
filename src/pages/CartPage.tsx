import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { getCart, updateCartQuantity, removeFromCart, getCartSubtotal, getSettings, subscribeStore } from '../services/store';
import { CartItem, BusinessSettings } from '../types';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [subtotal, setSubtotal] = useState<number>(getCartSubtotal());

  useEffect(() => {
    const update = () => {
      setCart(getCart());
      setSettings(getSettings());
      setSubtotal(getCartSubtotal());
    };
    return subscribeStore(update);
  }, []);

  const total = Number((subtotal + (settings.takeawayPackagingFee || 0)).toFixed(2));

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
          <p className="text-stone-500 text-sm">
            You haven't added any dishes or beverages yet. Explore our freshly made Sliema cafe menu to get started.
          </p>
          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200">
          <div>
            <h1 className="font-editorial text-3xl font-bold text-stone-900">Your Takeaway Cart</h1>
            <p className="text-xs text-stone-500 mt-1">Review your selected items before moving to checkout.</p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          
          {/* Itemized Table (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-2xs">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.imageAlt || item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                      }}
                    />
                    <div>
                      <h3 className="font-editorial text-base font-bold text-stone-900">
                        {item.product.name}
                      </h3>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-[11px] text-amber-800 font-medium">
                          {item.selectedOptions.map(o => `${o.name} (${o.priceModifier > 0 ? `+€${o.priceModifier.toFixed(2)}` : 'included'})`).join(', ')}
                        </div>
                      )}
                      <span className="text-xs text-stone-500 tabular-nums">
                        €{(item.unitPrice !== undefined ? item.unitPrice : item.product.price).toFixed(2)} each
                      </span>
                      {item.notes && (
                        <p className="text-[11px] text-stone-400 mt-0.5">Note: {item.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center gap-1.5 bg-stone-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => {
                          const optKey = (item.selectedOptions || []).map(o => `${o.name}:${o.priceModifier}`).sort().join('|');
                          updateCartQuantity(item.product.id, item.quantity - 1, optKey);
                        }}
                        className="p-1 text-stone-600 hover:text-stone-900 rounded cursor-pointer"
                        aria-label={`Decrease ${item.product.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs px-2 tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const optKey = (item.selectedOptions || []).map(o => `${o.name}:${o.priceModifier}`).sort().join('|');
                          updateCartQuantity(item.product.id, item.quantity + 1, optKey);
                        }}
                        className="p-1 text-stone-600 hover:text-stone-900 rounded cursor-pointer"
                        aria-label={`Increase ${item.product.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="font-bold text-sm text-stone-900 tabular-nums min-w-[70px] text-right">
                      €{(((item.unitPrice !== undefined ? item.unitPrice : item.product.price)) * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => {
                        const optKey = (item.selectedOptions || []).map(o => `${o.name}:${o.priceModifier}`).sort().join('|');
                        removeFromCart(item.product.id, optKey);
                      }}
                      className="text-stone-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box (1 col) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-xs">
              <h3 className="font-editorial text-lg font-bold text-stone-900 pb-3 border-b border-stone-200">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Takeaway Packaging Fee</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {settings.takeawayPackagingFee > 0 ? `€${settings.takeawayPackagingFee.toFixed(2)}` : '€0.00 (Free)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Location</span>
                  <span className="text-right text-stone-900 font-medium">Triq Ix-Xatt, Sliema</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Total (VAT incl.)</span>
                <span className="text-xl font-bold text-stone-900 tabular-nums">€{total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-burgundy hover:bg-brand-burgundy-dark text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Proceed to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                Payment is made upon collection at the counter (Card or Cash).
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
