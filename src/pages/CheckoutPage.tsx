import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Clock, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getCart, getCartSubtotal, getSettings, createOrder, subscribeStore } from '../services/store';
import { CartItem, BusinessSettings } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [subtotal, setSubtotal] = useState<number>(getCartSubtotal());

  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('+356 ');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('As soon as ready (approx. 15–20 mins)');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setCart(getCart());
      setSettings(getSettings());
      setSubtotal(getCartSubtotal());
    };
    return subscribeStore(update);
  }, []);

  const total = Number((subtotal + (settings.takeawayPackagingFee || 0)).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please provide your full name for order identification.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setErrorMessage('Please provide a valid phone number (e.g. +356 9996 6313).');
      return;
    }

    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address for your order confirmation.');
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage('Please agree to the takeaway ordering terms to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = createOrder({
        customerName,
        customerPhone,
        customerEmail,
        pickupTime,
        specialInstructions,
        items: cart
      });

      if (result.success && result.order) {
        navigate(`/order-confirmation/${result.order.id}`);
      } else {
        setErrorMessage(result.error || 'Failed to submit order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please contact the cafe directly.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-stone-200 text-center max-w-md">
          <h2 className="font-editorial text-2xl font-bold text-stone-900">No Items to Checkout</h2>
          <p className="text-stone-500 text-sm mt-2">Your cart is currently empty.</p>
          <Link
            to="/menu"
            className="mt-4 inline-block px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
          >
            View Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between pb-6 border-b border-stone-200">
          <div>
            <h1 className="font-editorial text-3xl font-bold text-stone-900">Takeaway Checkout</h1>
            <p className="text-xs text-stone-500 mt-1">
              Finalise your order details for pickup at Skyline Cafe Malta.
            </p>
          </div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
            <div className="font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Checkout Progress Stepper */}
        <div className="grid grid-cols-3 gap-2 pt-6 text-xs font-semibold">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900 text-white shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[11px] font-bold">1</span>
            <span className="hidden sm:inline">Customer Details</span>
            <span className="sm:hidden">Details</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
            <span className="w-5 h-5 rounded-full bg-stone-300 text-stone-800 flex items-center justify-center text-[11px] font-bold">2</span>
            <span className="hidden sm:inline">Pickup Schedule</span>
            <span className="sm:hidden">Pickup</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
            <span className="w-5 h-5 rounded-full bg-stone-300 text-stone-800 flex items-center justify-center text-[11px] font-bold">3</span>
            <span className="hidden sm:inline">Counter Payment</span>
            <span className="sm:hidden">Payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          
          {/* Customer & Fulfillment Info (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-2xs">
              <h2 className="font-editorial text-lg font-bold text-stone-900">
                1. Customer Details
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="customerName" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    placeholder="e.g. Maria Borg"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="customerPhone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number (Malta) *
                    </label>
                    <input
                      id="customerPhone"
                      type="tel"
                      required
                      placeholder="+356 9996 6313"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 tabular-nums"
                    />
                    <span className="text-[11px] text-stone-400 mt-1 block">Used for order tracking verification.</span>
                  </div>

                  <div>
                    <label htmlFor="customerEmail" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="customerEmail"
                      type="email"
                      required
                      placeholder="maria@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Timing & Instructions */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-2xs">
              <h2 className="font-editorial text-lg font-bold text-stone-900">
                2. Pickup Schedule & Location
              </h2>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Collection Point:</span>
                  <span>Skyline Cafe Malta, Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta</span>
                </div>
              </div>

              <div>
                <label htmlFor="pickupTime" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Estimated Pickup Time *
                </label>
                <select
                  id="pickupTime"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  <option value="As soon as ready (approx. 15–20 mins)">As soon as ready (approx. 15–20 mins)</option>
                  <option value="In 30 minutes">In 30 minutes</option>
                  <option value="In 45 minutes">In 45 minutes</option>
                  <option value="In 1 hour">In 1 hour</option>
                  <option value="Later today (specify in notes)">Later today (specify in notes)</option>
                </select>
              </div>

              <div>
                <label htmlFor="specialInstructions" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Preparation Notes / Dietary Requests (Optional)
                </label>
                <textarea
                  id="specialInstructions"
                  rows={2}
                  placeholder="e.g. Please cut ciabatta in half, oat milk for coffee..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3 shadow-2xs">
              <h2 className="font-editorial text-lg font-bold text-stone-900">
                3. Payment Method
              </h2>
              
              <div className="p-4 rounded-lg border-2 border-stone-900 bg-amber-50/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 text-sm block">
                    Pay at Pickup Counter (Cash or Card)
                  </span>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Confirmed by Skyline Cafe. You pay in euros (€) when you arrive to collect your freshly packaged takeaway order. Visa, Mastercard, and Cash are accepted.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="acceptedTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-stone-900 cursor-pointer"
                />
                <label htmlFor="acceptedTerms" className="text-xs text-stone-600 cursor-pointer">
                  I agree to collect this takeaway order at the scheduled pickup time and understand that food is prepared fresh to order.
                </label>
              </div>
            </div>

          </div>

          {/* Sticky Order Review (1 col) */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sticky top-28 space-y-4 shadow-xs">
              <h3 className="font-editorial text-lg font-bold text-stone-900 pb-3 border-b border-stone-200">
                Order Review
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
                {cart.map((item, idx) => {
                  const unitPrice = item.unitPrice !== undefined ? item.unitPrice : item.product.price;
                  return (
                    <div key={`${item.product.id}-${idx}`} className="flex justify-between gap-2">
                      <div className="text-stone-700 min-w-0">
                        <span className="block truncate">{item.quantity}× {item.product.name}</span>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <span className="block text-[10px] text-amber-800">
                            +{item.selectedOptions.map(o => o.name).join(', ')}
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-stone-900 tabular-nums shrink-0">
                        €{(unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 tabular-nums">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Takeaway Packaging</span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    {settings.takeawayPackagingFee > 0 ? `€${settings.takeawayPackagingFee.toFixed(2)}` : '€0.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="tabular-nums">€{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer ${
                  isSubmitting
                    ? 'bg-stone-500 cursor-wait'
                    : 'bg-brand-burgundy hover:bg-brand-burgundy-dark active:scale-[0.99] shadow-sm'
                }`}
              >
                {isSubmitting ? 'Placing Order...' : `Place Takeaway Order · €${total.toFixed(2)}`}
              </button>

              <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified takeaway order submission</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
