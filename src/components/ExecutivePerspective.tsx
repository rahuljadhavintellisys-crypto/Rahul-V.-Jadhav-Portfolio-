'use client';

import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExecutivePerspective() {
  return (
    <section className="py-2 bg-luxury-grid border-b border-border/50 relative scroll-mt-12">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            EXECUTIVE PERSPECTIVE
          </h2>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
            Thought Leadership & Core Conviction
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0"
        >
          
          {/* Quote side */}
          <div className="md:col-span-8 p-8 sm:p-12 flex flex-col justify-between space-y-8 relative">
            <div className="absolute top-4 left-4 text-secondary/10 pointer-events-none">
              <Quote className="h-24 w-24 -rotate-180" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                Operational Creed
              </span>
              
              <blockquote className="text-xl sm:text-2xl font-heading font-extrabold text-foreground leading-relaxed italic border-l-4 border-secondary pl-6">
                "I believe sustainable business growth happens when operations, technology, and people work together as one intelligent system."
              </blockquote>
            </div>

            <div className="pt-6 border-t border-border/40 flex items-center justify-between">
              <div>
                <span className="block font-heading font-extrabold text-sm text-foreground">
                  Rahul V. Jadhav
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-muted font-semibold mt-0.5">
                  Operations & Growth Strategist
                </span>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary dark:text-secondary uppercase select-none">
                RVJ
              </div>
            </div>
          </div>

          {/* Portrait side */}
          <div className="md:col-span-4 bg-accent/40 relative min-h-[300px] md:min-h-full border-t md:border-t-0 md:border-l border-border/80">
            <img
              src="/images/rahul.png"
              alt="Rahul V. Jadhav Portrait"
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
