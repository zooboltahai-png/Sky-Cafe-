import React from 'react';
import { ShieldCheck, Lock, FileText, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-stone-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800">
            <ShieldCheck className="w-4 h-4" />
            <span>EU GDPR & Malta Data Protection</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500">
            Last Updated: October 2026 · Governed by the Laws of Malta (EU)
          </p>
        </div>

        {/* Notice to owner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Business Owner Confirmation Notice:</span>
            <p>
              This privacy policy is structured in compliance with Regulation (EU) 2016/679 (GDPR) and the Data Protection Act (Chapter 586 of the Laws of Malta). Specific legal entity registration details marked below must be verified by the business owner before commercial deployment.
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 space-y-8 text-sm text-stone-700 leading-relaxed shadow-2xs">
          
          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              1. Data Controller Identity
            </h2>
            <p>
              The data controller responsible for the processing of personal data collected through this website is:
            </p>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 font-mono text-xs text-stone-800 space-y-1">
              <div>Trading Name: <strong>Skyline Cafe Malta</strong></div>
              <div>Operating Address: <strong>Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta</strong></div>
              <div>Telephone: <strong>+356 9996 6313</strong></div>
              <div>Registered Entity: <em>[Subject to formal owner registration confirmation]</em></div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              2. Personal Data We Collect
            </h2>
            <p>
              We collect only the minimum personal data strictly necessary to fulfill customer takeaway orders and answer direct communications:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600 text-xs sm:text-sm">
              <li><strong>Takeaway Order Fulfillment:</strong> Customer full name, Maltese or international telephone number, email address, requested pickup time, and optional preparation preferences.</li>
              <li><strong>Contact Inquiries:</strong> Name, email address, phone number, and message content submitted via our contact form.</li>
              <li><strong>Technical & Session Data:</strong> Browser session identifiers strictly for cart persistence and order verification.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              3. Legal Basis for Processing (GDPR Art. 6)
            </h2>
            <p>We process your personal data under the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
              <li><strong>Contractual Necessity (Art. 6(1)(b)):</strong> To prepare, identify, and hand over your takeaway orders at our Sliema cafe counter.</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> To maintain website security, prevent fraudulent order submissions, and respond to inquiries.</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> For non-essential cookies and marketing preferences (which you may withdraw at any time).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              4. Payment Security & Financial Data
            </h2>
            <p>
              Skyline Cafe Malta does not process or store credit/debit card numbers on this website. All online takeaway orders are settled upon physical collection at the cafe counter using point-of-sale terminals or cash.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              5. Data Retention
            </h2>
            <p>
              Order records are retained only for the duration necessary to satisfy operational verification, local Maltese commercial accounting requirements, and tax audits. Contact form inquiries are kept for up to 90 days following resolution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              6. Your Rights Under EU Law
            </h2>
            <p>
              As a resident of Malta or the European Union, you have the right to request access to, rectification of, or erasure of your personal data, as well as the right to data portability and restriction of processing. To exercise these rights, please contact the cafe at <a href="tel:+35699966313" className="text-amber-800 font-semibold underline">+356 9996 6313</a> or through our <Link to="/contact" className="text-amber-800 underline">contact page</Link>.
            </p>
            <p className="text-xs text-stone-500">
              You also have the right to lodge a complaint with the Information and Data Protection Commissioner (IDPC) of Malta (www.idpc.org.mt).
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
