'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare, Linkedin } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '', // Spam bot protection field
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Check honeypot
    if (formData.honeypot) {
      console.log('Spam bot detected!');
      setStatus('success'); // Silently ignore bot
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-2 relative scroll-mt-12 bg-card/45">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            GET IN TOUCH
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            Initiate a Collaboration or Consultation
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct coordinates & Chat paths */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Digital Headquarters
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Whether you want to audit your team’s operations, review AI integrations, or discuss a media feature at The Star Prime Magazine, use the form or direct channels below.
              </p>
            </div>

            <div className="space-y-4">
              {/* Coordinates List */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary flex items-center justify-center shrink-0 border border-border/40">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase">Location</span>
                  <span className="text-sm font-semibold text-foreground">Wakad, Pune, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary flex items-center justify-center shrink-0 border border-border/40">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase">Telephone Direct</span>
                  <a href="tel:+919021872241" className="text-sm font-semibold text-foreground hover:text-primary dark:hover:text-secondary transition-colors">
                    +91 9021872241
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary flex items-center justify-center shrink-0 border border-border/40">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase">Corporate Mailbox</span>
                  <a href="mailto:rahul.jadhav@intellisysitsolutions.com" className="text-xs sm:text-sm font-semibold text-foreground hover:text-primary dark:hover:text-secondary transition-colors break-all">
                    rahul.jadhav@intellisysitsolutions.com
                  </a>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-border/60" />

            {/* Quick Actions / Instant chat paths */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919021872241?text=Hi%20Rahul,%20I%20would%20like%20to%20connect%20regarding%20business%20operations..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 px-4 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
              >
                <MessageSquare className="h-4.5 w-4.5" /> WhatsApp Connect
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white font-bold py-3.5 px-4 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
              >
                <Linkedin className="h-4.5 w-4.5" /> LinkedIn Direct
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7 bg-background border border-border/80 p-6 sm:p-8 rounded-lg blue-glow">
            <h3 className="font-heading font-extrabold text-lg text-foreground mb-6">
              Executive Inquiry Portal
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field (hidden from screen readers & users) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-muted uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-muted uppercase mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-muted uppercase mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-muted uppercase mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-muted uppercase mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-muted uppercase mb-1.5">
                  Detailed Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary resize-none"
                />
              </div>

              {/* Status responses */}
              {status === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-4 rounded flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-sm">Submission Successful</span>
                    <p className="text-xs">Your inquiry has been compiled and saved. Rahul's office will follow up shortly.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-sm">Submission Failed</span>
                    <p className="text-xs">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 px-6 rounded text-sm hover:bg-primary-hover dark:hover:bg-secondary-hover transition-colors cursor-pointer disabled:opacity-75 focus:outline-none"
              >
                {status === 'loading' ? (
                  'Transmitting Inquiry...'
                ) : (
                  <>
                    Send Inquiry <Send className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
