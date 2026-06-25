'use client';

import { useState, useMemo } from 'react';
import { Quote, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/db/store';

interface TestimonialsSectionProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'leadership' | 'client' | 'team'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtered testimonials
  const filtered = useMemo(() => {
    const list = activeTab === 'all'
      ? initialTestimonials
      : initialTestimonials.filter(t => t.category === activeTab);
    
    // Reset index when list changes
    setCurrentIndex(0);
    return list;
  }, [initialTestimonials, activeTab]);

  const handleNext = () => {
    if (filtered.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    if (filtered.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const activeTestimonial = filtered[currentIndex];

  return (
    <section id="testimonials" className="py-2 bg-card/45 relative scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            ENDORSEMENTS
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            C-Suite & Team Endorsements
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {['all', 'leadership', 'client', 'team'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none shrink-0 ${
                activeTab === tab
                  ? 'bg-primary text-white dark:bg-secondary dark:text-background'
                  : 'bg-background border border-border text-foreground hover:bg-accent'
              }`}
            >
              {tab === 'all' ? 'All Endorsements' : `${tab} Testimonials`}
            </button>
          ))}
        </div>

        {/* Testimonial Box */}
        {filtered.length > 0 ? (
          <div className="relative">
            <div className="bg-background border border-border/80 rounded-xl p-8 sm:p-12 relative overflow-hidden blue-glow">
              <Quote className="absolute right-8 top-8 h-20 w-20 text-border/20 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm sm:text-base md:text-lg text-foreground leading-relaxed italic">
                    "{activeTestimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border border-secondary/20 flex items-center justify-center font-heading font-extrabold text-primary dark:text-secondary shrink-0">
                      {activeTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-heading font-extrabold text-sm text-foreground">
                        {activeTestimonial.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {activeTestimonial.role} at <strong className="text-foreground/80">{activeTestimonial.company}</strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation arrows */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded border border-border bg-card text-foreground cursor-pointer hover:bg-accent focus:outline-none hover:scale-105 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-muted font-bold font-heading">
                  {currentIndex + 1} / {filtered.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded border border-border bg-card text-foreground cursor-pointer hover:bg-accent focus:outline-none hover:scale-105 transition-all"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-background border border-dashed border-border rounded-lg text-muted">
            No testimonials listed in this category yet.
          </div>
        )}

      </div>
    </section>
  );
}
