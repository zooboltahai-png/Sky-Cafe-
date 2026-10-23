import React from 'react';
import { FileText, AlertTriangle, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-stone-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800">
            <Scale className="w-4 h-4" />
            <span>Commercial Conditions</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-stone-500">
            Governing Online Takeaway Ordering and Cafe Use · Sliema, Malta
          </p>
        </div>

        {/* Owner notice */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Business Owner Confirmation Notice:</span>
            <p>
              These terms establish clear conditions for online takeaway ordering and counter pickup. Specific operational policies regarding uncollected orders, advance cancellations, and catering contracts are subject to confirmation by Skyline Cafe Malta management.
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 space-y-8 text-sm text-stone-700 leading-relaxed shadow-2xs">
          
          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              1. General Information & Scope
            </h2>
            <p>
              These Terms and Conditions govern the use of the website and online ordering facilities provided by <strong>Skyline Cafe Malta</strong>, located at <strong>Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta</strong> (Phone: +356 9996 6313). By placing an order via this platform, you agree to be bound by these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              2. Menu Pricing & Currency
            </h2>
            <p>
              All prices displayed on the digital menu are in <strong>Euros (€)</strong> and are inclusive of Maltese Value Added Tax (VAT) at the statutory rate applicable to food and beverage services. Prices are subject to adjustment in the cafe's database, but orders once confirmed will be honoured at the rate quoted at the time of submission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              3. Takeaway Ordering & Collection
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
              <li><strong>Fulfillment Method:</strong> Orders placed online are prepared strictly for in-person collection at our counter on Triq Ix-Xatt, Sliema. Courier delivery is not guaranteed unless explicitly announced by the business.</li>
              <li><strong>Collection Timeliness:</strong> Prepared food items (including hot toasted ciabattas, poached eggs, and coffees) are perishable and best consumed fresh. Customers are encouraged to arrive promptly at their requested pickup time.</li>
              <li><strong>Order Reference:</strong> Customers must present their generated order reference (e.g. SKY-XXXX) when collecting.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              4. Payment Conditions
            </h2>
            <p>
              Unless an authorized digital payment gateway is active, all orders are settled upon collection at the cafe counter using cash (EUR) or accepted point-of-sale debit/credit cards (Visa, Mastercard, contactless).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              5. Cancellations, Modifications & Refunds
            </h2>
            <p>
              Because our food is freshly made to order, requests to cancel or modify an order must be made immediately by calling the cafe at <strong>+356 9996 6313</strong> before food preparation commences. If an item cannot be prepared due to stock availability, cafe staff will contact you to offer a suitable replacement or adjust the order total.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              6. Allergens & Health Notice
            </h2>
            <p>
              While we endeavour to label dishes containing common allergens (gluten, dairy, eggs, fish, nuts), our kitchen handles various Mediterranean ingredients. Guests with severe or life-threatening food allergies are required to speak with staff directly prior to ordering.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              7. Applicable Law & Jurisdiction
            </h2>
            <p>
              These terms are governed by and construed in accordance with the <strong>Laws of Malta</strong> and relevant European Union consumer legislation.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
