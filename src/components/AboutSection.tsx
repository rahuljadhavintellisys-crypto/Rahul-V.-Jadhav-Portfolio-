'use client';

import { CheckCircle, Award, Briefcase, Eye, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-2 bg-card/45 relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            EXECUTIVE PROFILE
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            Bridging Operations, Growth, and Technology
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch items-start mb-8">
          
          {/* Left Side: Short Bio / Key highlights */}
          <div className="lg:col-span-7 space-y-6 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              A Leadership Story Forged in Execution
            </h3>
            
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Rahul V. Jadhav is an operations executive and growth strategist who has spent a decade building and scaling business development teams, technology divisions, and media properties. Over his career, he has successfully transitioned from front-line client acquisition to structuring enterprise operations and leading digital transformation initiatives.
            </p>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Currently serving as the <strong>Head of Team Operations</strong> at Intellisys IT Solutions Pvt. Ltd. and holding an additional leadership post as the <strong>Head of Operations</strong> for The Star Prime Magazine, Rahul is dedicated to optimizing business systems. His work centers around establishing rigid service-level execution pathways, reducing administrative waste, and leveraging AI workflow integrations.
            </p>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Rahul’s unique vantage point combines core Sales Strategy, Project Management frameworks, and Modern Artificial Intelligence models. This enables him to consult for founders and C-Suite leaders, helping them build highly accountable teams and implement systems that drive real, measurable bottom-line growth.
            </p>

            {/* Core Leadership Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Accountability Frameworks</h4>
                  <p className="text-xs text-muted">Establishing clear KPIs and SLAs to align hybrid and cross-functional teams.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">AI Integration</h4>
                  <p className="text-xs text-muted">Replacing manual data entry with customized agentic workflow automations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Growth Auditing</h4>
                  <p className="text-xs text-muted">Analyzing outreach pathways, pipeline metrics, and outbound sales cycles.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Media & Branding</h4>
                  <p className="text-xs text-muted">Elevating corporate authority through executive profiling and media features.</p>
                </div>
              </div>
            </div>

            {/* Quick Operational Metrics Box */}
            <div className="p-5 bg-primary/5 dark:bg-secondary/5 border border-primary/10 dark:border-secondary/10 rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
              <div className="space-y-1 flex-1">
                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Leadership Tenure</span>
                <div className="text-lg font-heading font-extrabold text-foreground">4+ Years Active</div>
                <p className="text-[11px] text-muted">Directing hybrid tech teams & scaling publishing operations.</p>
              </div>
              <div className="w-[1px] h-10 bg-border/40 hidden sm:block" />
              <div className="space-y-1 flex-1">
                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">SLA Compliance</span>
                <div className="text-lg font-heading font-extrabold text-foreground">98.5% Delivery</div>
                <p className="text-[11px] text-muted">Maintained SLA tracking accountability standards.</p>
              </div>
            </div>

            <div className="lg:mt-auto mt-8 pt-6 border-t border-border/40 space-y-4">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-secondary">
                Operational Playbook & Execution Focus
              </h4>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Rahul implements custom operations strategies focused on reducing organizational friction and scaling team performance. By deploying Excel-based SLA trackers alongside automated status pipelines, he eliminates the need for manual reports. This establishes clean, self-documenting workflows that keep teams focused on core deliverables while providing stakeholders with real-time performance insights. This structured framework effectively bridges the gap between high-level executive vision and front-line technical execution, driving sustainable growth across all departments.
              </p>
            </div>

          </div>

          {/* Right Side: Quick Stats & Core Pillars */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Pitch Board */}
            <div className="border border-border bg-background p-6 sm:p-8 rounded-lg relative overflow-hidden blue-glow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Core Philosophy</h3>
              
              <blockquote className="text-sm italic text-muted leading-relaxed mb-6">
                "Growth is not the result of random marketing campaigns or heroic sales efforts. True, sustainable expansion is built on reliable, repeatable operational systems and empowered teams that execute with clarity."
              </blockquote>
              
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary dark:text-secondary" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-secondary">Rahul V. Jadhav</span>
                  <span className="block text-[10px] text-muted">Operations & Growth Strategist</span>
                </div>
              </div>
            </div>

            {/* Core Competencies Box */}
            <div className="border border-border bg-background p-6 rounded-lg">
              <h4 className="font-heading font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <Briefcase className="h-4.5 w-4.5 text-primary dark:text-secondary" /> Executive Positions
              </h4>
              <ul className="space-y-2 text-xs text-muted">
                <li className="flex justify-between border-b border-border/40 pb-2">
                  <span>Head of Team Operations</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">Intellisys IT Solutions</strong>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-2">
                  <span>Head of Operations</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">The Star Prime Magazine</strong>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-2">
                  <span>Head of Growth & Operations</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">The Entrepreneurial Chronicles</strong>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-2">
                  <span>Head of Growth & Operations</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">The Unicorn Times Magazine</strong>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-2">
                  <span>Head of Sales & Growth Strategy</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">TradeFlock</strong>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-2">
                  <span>Team Leader</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">CIO Outlook Magazine</strong>
                </li>
                <li className="flex justify-between">
                  <span>Senior Business Development Executive</span>
                  <strong className="text-foreground text-right shrink-0 ml-4">Insights Success</strong>
                </li>
              </ul>
            </div>

            {/* Operational Core Visual Chart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border border-border bg-background p-6 rounded-lg relative overflow-hidden blue-glow"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full blur-xl" />
              
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-sm text-foreground tracking-tight">OPERATIONAL CORE</span>
                  <span className="text-[9px] uppercase tracking-widest text-secondary font-bold">Scalable Architecture</span>
                </div>
                <div className="h-7 w-7 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-primary dark:text-secondary">RVJ</span>
                </div>
              </div>

              {/* Node Linkages visual representation */}
              <div className="space-y-3.5">
                {/* Node 1: High-Performance Teams */}
                <div className="flex items-center gap-3.5 relative">
                  <div className="absolute left-3 top-6 bottom-[-16px] w-[1px] bg-border/80 border-dashed" />
                  <div className="h-6 w-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0 border border-secondary/20 z-10">
                    <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  </div>
                  <div className="flex-1 bg-card border border-border/80 p-2.5 rounded text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span>High-Performance Teams</span>
                      <span className="text-[10px] text-secondary">Active</span>
                    </div>
                    <span className="block text-[10px] text-muted mt-0.5">Capacity huddles, OKR alignment & sprint management</span>
                  </div>
                </div>

                {/* Node 2: Automated Business Systems */}
                <div className="flex items-center gap-3.5 relative">
                  <div className="absolute left-3 top-6 bottom-[-16px] w-[1px] bg-border/80 border-dashed" />
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary dark:text-secondary flex items-center justify-center shrink-0 border border-primary/20 z-10">
                    <span className="h-2 w-2 rounded-full bg-primary dark:bg-secondary" />
                  </div>
                  <div className="flex-1 bg-card border border-border/80 p-2.5 rounded text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span>Automated Systems</span>
                      <span className="text-[10px] text-emerald-500">98.5% SLA</span>
                    </div>
                    <span className="block text-[10px] text-muted mt-0.5">SLA tracking matrices & structured accountability templates</span>
                  </div>
                </div>

                {/* Node 3: AI Transformation Layers */}
                <div className="flex items-center gap-3.5">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 z-10">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 bg-card border border-border/80 p-2.5 rounded text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span>AI OS Pipelines</span>
                      <span className="text-[10px] text-muted">Leveraged</span>
                    </div>
                    <span className="block text-[10px] text-muted mt-0.5">Automating status briefs, webhooks, and metric triggers</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-border/40 flex justify-between items-center text-[9px] text-muted">
                <span>SYSTEM STATUS: STABLE</span>
                <span className="text-secondary font-extrabold uppercase">Live Feed</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/40">
          
          {/* Mission Card */}
          <div className="bg-background border border-border p-8 rounded-lg flex gap-5 hover:border-primary/30 transition-all duration-300">
            <div className="h-12 w-12 rounded bg-secondary/15 flex items-center justify-center shrink-0">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-heading font-extrabold text-lg text-foreground">Mission Statement</h4>
              <p className="text-sm text-muted leading-relaxed">
                To engineer ultra-efficient operational frameworks, design adaptive automation layers, and lead collaborative high-performance teams that enable mid-market and enterprise technology organizations to scale sustainably.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-background border border-border p-8 rounded-lg flex gap-5 hover:border-primary/30 transition-all duration-300">
            <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Eye className="h-6 w-6 text-primary dark:text-secondary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-heading font-extrabold text-lg text-foreground">Future Vision</h4>
              <p className="text-sm text-muted leading-relaxed">
                To pioneer the integration of agentic AI workflows in day-to-day operations, establishing a future where business processes are intelligent, self-documenting, and fully transparent, allowing leaders to focus 100% on strategic decisions.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
