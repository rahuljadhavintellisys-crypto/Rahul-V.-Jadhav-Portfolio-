'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-3 focus:outline-none h-11 w-64 select-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" className="w-full h-full text-foreground">
                {/* Monogram Circle Symbol */}
                <circle cx="25" cy="30" r="20" fill="none" stroke="#EDC531" strokeWidth="1.5" />
                <circle cx="25" cy="30" r="17" fill="none" stroke="#EDC531" strokeWidth="0.5" strokeDasharray="2 1" />
                <text x="25" y="35" fontFamily="Georgia, serif" fontWeight="bold" fontSize="13" fill="#EDC531" textAnchor="middle">RVJ</text>
                
                {/* Text Section */}
                <text x="60" y="26" fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" fontSize="18.5" fill="currentColor" letterSpacing="0.5">
                  RAHUL V. <tspan fill="#EDC531">JADHAV</tspan>
                </text>
                <text x="60" y="43" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="8" fill="#8892B0" letterSpacing="2">
                  OPERATIONS &amp; GROWTH EXECUTIVE
                </text>
              </svg>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Building High-Performance Teams, Scalable Business Systems, and AI-Powered Growth Engines. Transforming organizations through operational excellence and digital innovation.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-border text-foreground/80 hover:text-primary dark:hover:text-secondary hover:border-primary dark:hover:border-secondary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.instagram.com/rv_jadhav__/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-border text-foreground/80 hover:text-primary dark:hover:text-secondary hover:border-primary dark:hover:border-secondary transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:rahuljadhav.vj@gmail.com"
                className="p-2 rounded border border-border text-foreground/80 hover:text-primary dark:hover:text-secondary hover:border-primary dark:hover:border-secondary transition-colors"
                aria-label="Email Address"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-foreground mb-4">
                Platform
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/#about" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link href="/#journey" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Timeline
                  </Link>
                </li>
                <li>
                  <Link href="/#expertise" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Expertise
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-foreground mb-4">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/blog" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Insights Blog
                  </Link>
                </li>
                <li>
                  <Link href="/certifications" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Credentials
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Media Mentions
                  </Link>
                </li>
                <li>
                  <Link href="/#ai-showcase" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    AI Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="/vcard" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Digital Card
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-primary dark:hover:text-secondary transition-colors">
                    Console
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-foreground">
              Contact Headquarters
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
                <span>Wakad, Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-secondary shrink-0" />
                <a href="tel:+919021872241" className="hover:text-foreground transition-colors">
                  +91 9021872241
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-secondary shrink-0" />
                <a href="mailto:rahuljadhav.vj@gmail.com" className="hover:text-foreground transition-colors text-xs sm:text-sm break-all">
                  rahuljadhav.vj@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter form */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-foreground mb-2">
                Subscribe to Operations Insights
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter executive email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border border-border text-foreground px-3 py-2 text-xs rounded focus:outline-none focus:border-primary dark:focus:border-secondary w-full"
                />
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  className="bg-primary text-white dark:bg-secondary dark:text-background px-4 py-2 text-xs font-bold rounded hover:bg-primary-hover dark:hover:bg-secondary-hover transition-colors shrink-0 disabled:opacity-70 flex items-center gap-1 cursor-pointer"
                >
                  {subscribed ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : loading ? (
                    '...'
                  ) : (
                    <>
                      Join <ArrowRight className="h-3 w-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
        </div>

        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>© {new Date().getFullYear()} Rahul V. Jadhav. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/#about" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/#contact" className="hover:text-foreground transition-colors">Terms of Engagement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
