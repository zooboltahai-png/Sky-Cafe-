import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Clock, MapPin, AlertCircle, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { getProducts, getCart, addToCart, updateCartQuantity, removeFromCart, getCartSubtotal, getSettings, subscribeStore } from '../services/store';
import { Product, CartItem, BusinessSettings } from '../types';

export const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [subtotal, setSubtotal] = useState<number>(getCartSubtotal());
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const update = () => {
      setProducts(getProducts());
      setCart(getCart());
      setSettings(getSettings());
      setSubtotal(getCartSubtotal());
    };
    return subscribeStore(update);
  }, []);

  const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'breakfast-brunch', label: 'Brunch' },
    { key: 'ciabatta-sandwiches', label: 'Ciabatta' },
    { key: 'croissants', label: 'Croissants' },
    { key: 'coffee-hot', label: 'Coffee' },
    { key: 'cold-smoothies', label: 'Smoothies' },
  ];

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="pb-8 border-b border-stone-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Online Takeaway Ordering
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
                Fresh Pickup at Triq Ix-Xatt
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Order directly from our kitchen. Prepared fresh and packaged for pickup at our Sliema cafe.
              </p>
            </div>

            {/* Fulfilment status badge */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">Takeaway Pickup Available</span>
                <span className="text-stone-500">Typical prep time: 15–20 mins</span>
              </div>
            </div>
          </div>

          {/* Delivery notice */}
          {!settings.deliveryEnabled && (
            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Takeaway Pickup Service: </span>
                Door-to-door courier delivery is currently pending business verification. All online orders are prepared for fast, contactless takeaway collection at our counter at Triq Ix-Xatt, Sliema.
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Layout: Products Left, Cart Sidebar Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          
          {/* Main Menu Ordering Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCategory(c.key)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === c.key
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Product list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item) => {
                const inCartItem = cart.find(i => i.product.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col justify-between hover:border-stone-300 transition-all shadow-2xs"
                  >
                    <div>
                      <div className="aspect-[16/10] bg-stone-100 rounded-lg overflow-hidden mb-3">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/src/assets/images/skyline_hero_sliema_1792764460169.jpg';
                          }}
                        />
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-editorial text-base font-bold text-stone-900">
                          {item.name}
                        </h3>
                        <span className="text-sm font-bold text-stone-900 tabular-nums shrink-0">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 capitalize">
                        {item.category.replace('-', ' ')}
                      </span>

                      {inCartItem ? (
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, inCartItem.quantity - 1)}
                            className="p-1 text-stone-700 hover:text-stone-900 hover:bg-white rounded cursor-pointer"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-stone-900 px-1 tabular-nums">
                            {inCartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, inCartItem.quantity + 1)}
                            className="p-1 text-stone-700 hover:text-stone-900 hover:bg-white rounded cursor-pointer"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(item, 1)}
                          disabled={!item.available}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          {item.available ? 'Add to Cart' : 'Sold Out'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Sticky Cart Summary Column (1 col) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sticky top-28 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-800" />
                  <h3 className="font-editorial text-lg font-bold text-stone-900">Your Order</h3>
                </div>
                <span className="text-xs font-semibold text-stone-500">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-stone-400 space-y-2">
                  <p className="text-sm">Your takeaway bag is currently empty.</p>
                  <p className="text-xs text-stone-400">Select items from the menu to start your order.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-start justify-between gap-3 text-xs pb-3 border-b border-stone-100">
                      <div className="flex-1">
                        <span className="font-bold text-stone-900 block">{item.product.name}</span>
                        <span className="text-stone-400 tabular-nums">€{item.product.price.toFixed(2)} each</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-stone-100 rounded p-0.5">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold px-1 tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-stone-900 tabular-nums min-w-[50px] text-right">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing Totals */}
              {cart.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900 tabular-nums">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Takeaway Packaging</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      {settings.takeawayPackagingFee > 0 ? `€${settings.takeawayPackagingFee.toFixed(2)}` : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Amount</span>
                    <span className="tabular-nums">€{(subtotal + settings.takeawayPackagingFee).toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/checkout')}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 text-center">
                    <Link to="/cart" className="text-xs text-stone-500 hover:text-stone-800 underline">
                      View full cart & edit instructions
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
