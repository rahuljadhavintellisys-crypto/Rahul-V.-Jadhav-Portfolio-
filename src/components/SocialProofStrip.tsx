'use client';

import { motion } from 'framer-motion';

export default function SocialProofStrip() {
  const brands = [
    { name: "Intellisys IT Solutions", role: "Team Operations" },
    { name: "The Star Prime Magazine", role: "Media & Publishing" },
    { name: "TradeFlock", role: "Sales & Growth Strategy" },
    { name: "CIO Outlook", role: "Team Leadership" },
    { name: "Insights Success", role: "Business Development" }
  ];

  return (
    <section className="py-2 bg-card/30 border-y border-border/50 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Caption */}
        <h3 className="text-center text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-secondary/85 mb-6">
          Trusted Across Operations, Technology & Media Leadership
        </h3>

        {/* Brand Strip Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-3 rounded-lg border border-transparent hover:border-secondary/20 hover:bg-card/50 transition-all duration-300 group cursor-default"
            >
              {/* Monogram/Initial Icon */}
              <div className="h-7 w-7 rounded bg-primary/5 dark:bg-secondary/5 border border-border/60 group-hover:border-secondary/40 text-primary dark:text-secondary flex items-center justify-center font-heading font-extrabold text-xs mb-2 transition-colors">
                {brand.name.split(' ').map(n => n[0]).join('').substring(0, 3)}
              </div>
              
              {/* Brand Name */}
              <span className="font-heading font-extrabold text-xs text-foreground/80 group-hover:text-foreground transition-colors tracking-tight">
                {brand.name}
              </span>
              
              {/* Sub-label */}
              <span className="text-[9px] uppercase tracking-wider text-muted/70 group-hover:text-secondary font-bold transition-colors mt-0.5">
                {brand.role}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
