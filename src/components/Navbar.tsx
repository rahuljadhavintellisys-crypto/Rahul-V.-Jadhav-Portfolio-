'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ui/ThemeToggle';

const NAV_ITEMS = [
  { label: 'Journey', href: '/#journey' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Media', href: '/media' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'AI Showcase', href: '/#ai-showcase' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-secondary ${
                    isActive ? 'text-primary dark:text-secondary' : 'text-foreground/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/schedule"
              className="btn-premium btn-gold-glow gap-1 px-5 py-2.5 rounded text-sm hover:scale-[1.03]"
            >
              Let's Connect <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu & Toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded text-foreground hover:bg-accent focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block px-3 py-2.5 rounded text-base font-medium text-foreground/80 hover:bg-accent hover:text-primary dark:hover:text-secondary"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link
                  href="/schedule"
                  onClick={handleNavClick}
                  className="w-full btn-premium btn-gold-glow gap-1 py-3 rounded text-sm hover:scale-[1.03]"
                >
                  Let's Connect <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
