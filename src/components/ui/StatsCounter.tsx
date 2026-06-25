'use client';

import { useEffect, useState, useRef } from 'react';

interface StatsCounterProps {
  label: string;
  value: number;
  suffix: string;
}

export default function StatsCounter({ label, value, suffix }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
      setCount(0);
      return;
    }

    const duration = 1500; // 1.5s
    const stepTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center p-5 bg-card border border-border/80 rounded-lg hover:border-primary dark:hover:border-secondary transition-colors duration-300 h-full flex flex-col justify-between items-center gap-2">
      <div className="flex-grow flex items-center justify-center">
        <span className="block text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-primary dark:text-secondary">
          {count}
          <span>{suffix}</span>
        </span>
      </div>
      <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-muted font-bold leading-tight">
        {label}
      </span>
    </div>
  );
}
