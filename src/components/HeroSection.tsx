'use client';

import Link from 'next/link';
import { Linkedin, Mail, ArrowRight, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const trustIndicators = [
    "Head of Team Operations, Intellisys IT Solutions",
    "Head of Operations, The Star Prime Magazine",
    "Operations & Growth Executive",
    "AI Transformation Advocate"
  ];

  return (
    <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-24 pb-2 overflow-hidden bg-luxury-grid">
      {/* Background visual circles/gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep blue glow */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[130px] dark:bg-primary/5" />
        {/* Soft gold glow behind portrait */}
        <div className="absolute top-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[140px] dark:bg-secondary/5" />
        {/* Global executive radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.03),transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Columns: Text & Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left justify-center">
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 self-center lg:self-start bg-card border border-border px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary dark:text-secondary shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-secondary" />
            <span className="tracking-widest uppercase text-[10px] sm:text-xs">OPERATIONAL EXCELLENCE & AI INTEGRATION</span>
          </motion.div>

          {/* Name & Titles */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/95 to-secondary dark:from-white dark:via-slate-100 dark:to-secondary bg-clip-text text-transparent pb-1 leading-none"
            >
              Rahul V. Jadhav
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-foreground/90 max-w-2xl mx-auto lg:mx-0 font-heading border-b border-border/30 pb-3"
            >
              Operations Leader <span className="text-secondary">|</span> Growth Strategist <span className="text-secondary">|</span> AI Transformation Executive
            </motion.h2>
          </div>

          {/* Executive Trust Badges Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2"
          >
            {trustIndicators.map((text, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1.5 bg-primary/5 dark:bg-secondary/5 border border-primary/10 dark:border-secondary/15 rounded-md px-3 py-1.5 text-xs text-foreground font-semibold text-muted/90"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-secondary shrink-0" />
                <span>{text}</span>
              </span>
            ))}
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2"
          >
            Scaling mid-market and enterprise technology organizations through automated operations frameworks, strategic growth pipelines, and robust AI integrations.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white dark:bg-secondary dark:text-background dark:hover:bg-secondary-hover font-bold px-7 py-3.5 rounded transition-all duration-200 cursor-pointer shadow-md shadow-primary/10 dark:shadow-secondary/10 hover:scale-[1.02]"
            >
              Explore Case Studies <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            
            <Link
              href="/#journey"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground hover:bg-accent font-bold px-7 py-3.5 rounded transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              My Journey
            </Link>

            <a
              href="/docs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground hover:bg-accent font-semibold px-5 py-3.5 rounded transition-colors duration-200 cursor-pointer text-sm hover:scale-[1.02]"
            >
              <FileText className="h-4.5 w-4.5 text-secondary" /> Resume
            </a>
          </motion.div>

          {/* Quick connections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-border/40 text-xs text-muted font-medium"
          >
            <span>CONNECT HEADQUARTERS</span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary dark:hover:text-secondary transition-colors font-bold"
              >
                <Linkedin className="h-4 w-4 text-secondary" /> LinkedIn Profile
              </a>
              <a
                href="mailto:rahuljadhav.vj@gmail.com"
                className="flex items-center gap-1 hover:text-primary dark:hover:text-secondary transition-colors font-bold"
              >
                <Mail className="h-4 w-4 text-secondary" /> Direct Email
              </a>
            </div>
          </motion.div>

        </div>

        {/* Right Columns: Executive Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center relative z-10"
        >
          {/* Graphic Framework */}
          <div className="w-[280px] h-[350px] sm:w-[390px] sm:h-[490px] rounded-xl border border-border/80 bg-card p-4 flex flex-col justify-between relative gold-glow hover:border-secondary/40 transition-all duration-500 group">
            
            {/* Top gold badge corner decoration */}
            <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-secondary rounded-tr-xl pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-secondary rounded-bl-xl pointer-events-none group-hover:scale-110 transition-transform" />
            
            {/* Image Container */}
            <div className="w-full flex-1 rounded border border-border/60 overflow-hidden bg-accent relative select-none">
              <img
                src="/images/rahul.png"
                alt="Rahul V. Jadhav"
                className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
              />
              {/* Overlay styling for modern dark tone */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/20 to-transparent pointer-events-none mix-blend-multiply" />
            </div>

            {/* Photo description */}
            <div className="border-t border-border/60 pt-3 mt-3 flex items-center justify-between text-[10px] text-muted font-bold uppercase tracking-widest font-heading">
              <span>Rahul V. Jadhav</span>
              <span className="text-secondary font-extrabold">Executive Profile</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
