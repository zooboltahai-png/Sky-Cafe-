import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Phone, ArrowRight, Printer, Share2 } from 'lucide-react';
import { getOrders } from '../services/store';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const orders = getOrders();
      const found = orders.find(o => o.id === orderId.toUpperCase());
      if (found) setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-stone-200 text-center max-w-md">
          <h2 className="font-editorial text-2xl font-bold text-stone-900">Order Not Found</h2>
          <p className="text-stone-500 text-sm mt-2">
            We could not find an order with reference {orderId}.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/track-order"
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              Track Order
            </Link>
            <Link
              to="/"
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusLabels: Record<string, { label: string; desc: string; bg: string }> = {
    pending: { label: 'Received & Queued', desc: 'The kitchen has received your order and will confirm shortly.', bg: 'bg-amber-100 text-amber-900' },
    confirmed: { label: 'Confirmed by Cafe', desc: 'Order is confirmed and queued for preparation.', bg: 'bg-blue-100 text-blue-900' },
    preparing: { label: 'Currently Preparing', desc: 'Fresh ingredients are being prepared right now in Sliema.', bg: 'bg-purple-100 text-purple-900' },
    ready_for_pickup: { label: 'Ready for Collection', desc: 'Your takeaway is hot and waiting at the counter!', bg: 'bg-emerald-100 text-emerald-900' },
    completed: { label: 'Completed & Collected', desc: 'Thank you for visiting Skyline Cafe Malta!', bg: 'bg-stone-100 text-stone-900' },
    cancelled: { label: 'Cancelled', desc: 'This order has been cancelled.', bg: 'bg-red-100 text-red-900' }
  };

  const statusInfo = statusLabels[order.status] || statusLabels.pending;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Header */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block">
            Order Submitted Successfully
          </span>

          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900">
            Thank you, {order.customerName}!
          </h1>

          <div className="inline-block px-4 py-2 bg-stone-100 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-500 block">Your Order Reference Number</span>
            <span className="font-mono text-2xl font-bold text-stone-900 tracking-wider">
              {order.id}
            </span>
          </div>

          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            Please save your reference number. You will present this code when collecting your order at our counter.
          </p>
        </div>

        {/* Live Status Card */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Live Status</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusInfo.bg}`}>
              {statusInfo.label}
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {statusInfo.desc}
          </p>

          <div className="pt-2">
            <Link
              to={`/track-order?ref=${order.id}&phone=${encodeURIComponent(order.customerPhone)}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-900 hover:text-amber-800 underline"
            >
              <span>Track order live updates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Collection & Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-800">
              <MapPin className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Collection Address</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Skyline Cafe Malta<br />
              Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta<br />
              <a href="tel:+35699966313" className="text-amber-800 font-semibold hover:underline block mt-1">
                +356 9996 6313
              </a>
            </p>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-800">
              <Clock className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Pickup Details</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Requested Time: <span className="font-semibold text-stone-900">{order.pickupTime}</span><br />
              Payment: <span className="font-semibold text-stone-900">Pay at Counter (€{order.total.toFixed(2)})</span><br />
              Placed: <span className="text-stone-500">{new Date(order.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
            </p>
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-2xs">
          <h3 className="font-editorial text-lg font-bold text-stone-900 pb-3 border-b border-stone-200">
            Receipt Summary
          </h3>

          <div className="space-y-3 divide-y divide-stone-100 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-2 first:pt-0 flex justify-between items-start gap-4">
                <div>
                  <span className="font-bold text-stone-900">{item.quantity}× {item.name}</span>
                  {item.notes && <p className="text-[11px] text-stone-400">Note: {item.notes}</p>}
                </div>
                <span className="font-semibold text-stone-900 tabular-nums">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900 tabular-nums">€{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Takeaway Packaging Fee</span>
              <span className="font-medium text-stone-900 tabular-nums">€{order.takeawayFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Due at Counter</span>
              <span className="tabular-nums">€{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <Link
            to="/menu"
            className="text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            ← Back to Digital Menu
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 hover:bg-stone-100 rounded-lg text-xs font-semibold text-stone-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <Link
              to="/track-order"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-stone-900 hover:bg-stone-800 rounded-lg text-xs font-semibold text-white uppercase tracking-wider"
            >
              <span>Track Order</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
