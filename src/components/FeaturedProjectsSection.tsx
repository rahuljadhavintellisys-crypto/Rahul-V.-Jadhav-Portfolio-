'use client';

import Link from 'next/link';
import { FolderOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '@/db/store';

interface FeaturedProjectsSectionProps {
  initialProjects: Project[];
}

export default function FeaturedProjectsSection({ initialProjects }: FeaturedProjectsSectionProps) {
  // Display only projects marked as featured (or top 3 if none)
  const featuredProjects = initialProjects.filter(p => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : initialProjects.slice(0, 3);

  return (
    <section id="featured-projects" className="py-2 bg-background relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            FEATURED CASE STUDIES
          </h2>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
            Key Initiatives in Operations, Growth & Automation
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-card border border-border/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group hover:-translate-y-1 gold-glow"
            >
              <div className="space-y-4">
                {/* Header Icon & Tag */}
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 rounded bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary border border-border/40 flex items-center justify-center">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-extrabold bg-secondary/15 text-secondary px-2.5 py-1 rounded tracking-wider uppercase">
                    Case Study
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-lg text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Technologies & Impact */}
              <div className="pt-6 mt-6 border-t border-border/40 space-y-4">
                {/* Verified business impact brief */}
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-[10px] font-semibold text-foreground tracking-tight leading-tight line-clamp-1">
                    {project.businessImpact}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[9px] bg-background border border-border/60 px-2 py-0.5 rounded text-muted font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[9px] text-muted font-bold pt-0.5">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <Link
                  href={`/projects/${project.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary/5 hover:bg-primary hover:text-white dark:bg-secondary/5 dark:hover:bg-secondary dark:hover:text-background text-primary dark:text-secondary font-bold text-xs py-2.5 rounded transition-all cursor-pointer focus:outline-none"
                >
                  View Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-border bg-card text-foreground hover:bg-accent font-bold px-7 py-3 rounded transition-colors duration-200 cursor-pointer shadow-sm text-xs uppercase tracking-wider"
          >
            View All Consulting Case Studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
