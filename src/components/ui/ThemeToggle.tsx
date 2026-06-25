'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-border bg-card text-foreground cursor-pointer hover:bg-accent hover:scale-105 transition-all duration-200 focus:outline-none"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-secondary" />
        ) : (
          <Moon className="h-5 w-5 text-primary" />
        )}
      </motion.div>
    </button>
  );
}
