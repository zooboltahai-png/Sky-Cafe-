import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ShieldAlert, CheckCircle2, Clock, MapPin, ChefHat, PackageCheck, AlertCircle } from 'lucide-react';
import { trackOrder, subscribeStore } from '../services/store';
import { Order, OrderStatus } from '../types';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderRef, setOrderRef] = useState<string>(searchParams.get('ref') || '');
  const [phone, setPhone] = useState<string>(searchParams.get('phone') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const performLookup = (refToUse: string, phoneToUse: string) => {
    if (!refToUse.trim()) {
      setError('Please enter your order reference (e.g. SKY-1042).');
      return;
    }
    if (!phoneToUse.trim()) {
      setError('Please enter the customer phone number used when placing the order.');
      return;
    }

    setError(null);
    setSearched(true);

    const res = trackOrder(refToUse, phoneToUse);
    if (res.success && res.order) {
      setOrder(res.order);
    } else {
      setOrder(null);
      setError(res.error || 'No matching order found with the provided reference and phone number.');
    }
  };

  useEffect(() => {
    const initialRef = searchParams.get('ref');
    const initialPhone = searchParams.get('phone');
    if (initialRef && initialPhone) {
      performLookup(initialRef, initialPhone);
    }
  }, [searchParams]);

  // Keep live updates if status changed by admin
  useEffect(() => {
    const update = () => {
      if (orderRef && phone && searched) {
        const res = trackOrder(orderRef, phone);
        if (res.success && res.order) {
          setOrder(res.order);
        }
      }
    };
    return subscribeStore(update);
  }, [orderRef, phone, searched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(orderRef, phone);
  };

  const steps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'pending', label: 'Received', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'preparing', label: 'Preparing', icon: ChefHat },
    { key: 'ready_for_pickup', label: 'Ready for Pickup', icon: PackageCheck },
    { key: 'completed', label: 'Collected', icon: CheckCircle2 }
  ];

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    return steps.findIndex(s => s.key === status);
  };

  const currentStepIdx = order ? getStepIndex(order.status) : -1;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Real-Time Takeaway Status
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900">
            Track Your Order
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            To protect guest privacy, enter your unique order reference and phone number to verify access.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="orderRef" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Order Reference *
              </label>
              <input
                id="orderRef"
                type="text"
                required
                placeholder="e.g. SKY-5912"
                value={orderRef}
                onChange={(e) => setOrderRef(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            <div>
              <label htmlFor="trackPhone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Customer Phone Number *
              </label>
              <input
                id="trackPhone"
                type="tel"
                required
                placeholder="+356 9996 6313"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-burgundy hover:bg-brand-burgundy-dark text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Check Status
            </button>
          </div>
        </form>

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">Lookup Verification:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Order Result Card */}
        {order && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-200">
              <div>
                <span className="text-xs text-stone-500 font-medium">Order Reference</span>
                <h3 className="font-mono text-2xl font-bold text-stone-900">{order.id}</h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-stone-500 font-medium">Estimated Pickup</span>
                <span className="font-semibold text-stone-900 block text-sm">{order.pickupTime}</span>
              </div>
            </div>

            {/* Stepper Progress */}
            {order.status === 'cancelled' ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center text-red-900">
                <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
                <span className="font-bold text-sm block">Order Cancelled</span>
                <span className="text-xs">This order has been marked cancelled. Please contact the cafe directly at +356 9996 6313.</span>
              </div>
            ) : (
              <div className="py-4">
                <div className="grid grid-cols-5 gap-2 text-center">
                  {steps.map((st, i) => {
                    const isPassed = i <= currentStepIdx;
                    const isCurrent = i === currentStepIdx;
                    const Icon = st.icon;
                    return (
                      <div key={st.key} className="space-y-2">
                        <div
                          className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-colors ${
                            isCurrent
                              ? 'bg-amber-500 text-white ring-4 ring-amber-100 shadow-xs'
                              : isPassed
                              ? 'bg-stone-900 text-white'
                              : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-semibold block leading-tight ${isCurrent ? 'text-amber-900 font-bold' : isPassed ? 'text-stone-900' : 'text-stone-400'}`}>
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Collection Details */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Pickup Counter Location</span>
              </div>
              <p>
                Skyline Cafe Malta, Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta<br />
                Present your code <strong className="font-mono">{order.id}</strong> to the barista upon arrival.
              </p>
            </div>

            {/* Items summary */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">Order Items</h4>
              <div className="divide-y divide-stone-100 text-xs">
                {order.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span>{it.quantity}× {it.name}</span>
                    <span className="font-semibold text-stone-900 tabular-nums">€{(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200">
                <span>Total Due at Counter</span>
                <span className="tabular-nums">€{order.total.toFixed(2)}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
