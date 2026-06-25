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
          <Link href="/" className="flex flex-col focus:outline-none">
            <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-primary dark:text-foreground">
              RAHUL V. <span className="text-secondary">JADHAV</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-muted">
              Operations & Growth Executive
            </span>
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
              className="inline-flex items-center gap-1 bg-primary text-white dark:bg-secondary dark:text-background font-semibold text-sm px-5 py-2.5 rounded hover:bg-primary-hover dark:hover:bg-secondary-hover transition-colors duration-200"
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
                  className="w-full text-center inline-flex items-center justify-center gap-1 bg-primary text-white dark:bg-secondary dark:text-background font-semibold py-3 rounded hover:bg-primary-hover dark:hover:bg-secondary-hover transition-colors duration-200"
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
