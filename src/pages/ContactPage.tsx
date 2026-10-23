import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { submitContactMessage, getSettings } from '../services/store';

export const ContactPage: React.FC = () => {
  const settings = getSettings();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('General Inquiry');
  const [message, setMessage] = useState<string>('');

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please enter a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = submitContactMessage({
        name,
        email,
        phone,
        subject,
        message
      });

      if (res.success) {
        setSubmittedId(res.id);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMessage('Unable to send message. Please contact us directly by phone.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Triq+Ix-Xatt+Tas-Sliema+Malta`;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Get in Touch
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Contact & Location
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            We are situated directly on Triq Ix-Xatt along the Sliema seafront. Call us for reservations, catering, or takeaway questions.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Column: Contact Cards & Details */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <h2 className="font-editorial text-2xl font-bold text-stone-900 pb-2 border-b border-stone-100">
                Cafe Coordinates
              </h2>

              <div className="space-y-5 text-sm">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-800 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Address</h3>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      Triq Ix-Xatt<br />
                      Tas-Sliema SLM 3113, Malta
                    </p>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 mt-2"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps / Get Directions</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-800 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Telephone</h3>
                    <p className="text-stone-600 mt-0.5 text-xs">
                      For immediate service, takeaway orders, or directions:
                    </p>
                    <a
                      href="tel:+35699966313"
                      className="text-base font-bold text-stone-900 hover:text-amber-800 mt-1 inline-block tabular-nums"
                    >
                      +356 9996 6313
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-800 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Verified Opening Hours</h3>
                    <div className="mt-2 space-y-1 text-xs text-stone-600">
                      <div className="flex justify-between gap-6">
                        <span>Monday – Thursday</span>
                        <span className="font-semibold text-stone-900 tabular-nums">{settings.openingHours.monday}</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Friday</span>
                        <span className="font-semibold text-stone-900 tabular-nums">{settings.openingHours.friday}</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Saturday</span>
                        <span className="font-semibold text-stone-900 tabular-nums">{settings.openingHours.saturday}</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Sunday</span>
                        <span className="font-semibold text-stone-900 tabular-nums">{settings.openingHours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Map Visual Link */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Map Location: Triq Ix-Xatt, Sliema</span>
                <span className="text-stone-500">Malta (SLM 3113)</span>
              </div>
              <div className="relative aspect-[16/9] bg-stone-200">
                <iframe
                  title="Skyline Cafe Malta location map"
                  src="https://maps.google.com/maps?q=Triq+Ix-Xatt+Tas-Sliema+Malta&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white flex justify-end">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving & Walking Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-bold text-stone-900">
                Send a Message
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Have a question or group request? Send us a message and our team will get back to you.
              </p>
            </div>

            {submittedId ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-emerald-950 text-base">Message Received!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your message has been submitted to the cafe team under reference <strong className="font-mono">{submittedId}</strong>. We will reply to your provided email address.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="mt-2 text-xs font-semibold text-emerald-900 underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="contactName" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    placeholder="e.g. David Galea"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactEmail" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      required
                      placeholder="david@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      placeholder="+356 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactSubject" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <select
                    id="contactSubject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Takeaway Order Question">Takeaway Order Question</option>
                    <option value="Dietary & Allergen Question">Dietary & Allergen Question</option>
                    <option value="Catering / Group Request">Catering / Group Request</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contactMessage" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="contactMessage"
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-400 text-center">
                  Your message is securely stored for the cafe management. We never share your contact details.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
