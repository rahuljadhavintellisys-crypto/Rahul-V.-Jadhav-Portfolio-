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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  Operations Leadership & B2B Growth Strategy
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  I partner with technology companies, consulting firms, and modern media groups to structure their daily operations, remove delivery bottlenecks, and connect sales pipelines with automated workflow execution. Rather than relying on generic advisory templates, my approach focuses on building rigid, self-documenting SLA frameworks and deploying custom automation scripts that empower team leaders to coordinate with full transparency.
                </p>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  Currently directing team operations at Intellisys IT Solutions Pvt. Ltd., I also oversee operational frameworks and executive profiling pipelines for The Star Prime Magazine. My career is defined by transforming manual tasks into streamlined, software-driven pipelines, helping organizations cut administrative overhead while scaling client success.
                </p>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <div className="w-full max-w-[240px] aspect-[4/5] rounded-lg border border-border/80 bg-card p-2 shadow-lg relative overflow-hidden group gold-glow hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="/images/IMG_20240523_012051_114.png" 
                    alt="Rahul V. Jadhav" 
                    className="w-full h-full object-cover rounded object-top"
                  />
                  <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-xs text-[9px] px-2 py-0.5 rounded font-extrabold text-secondary border border-border/40 uppercase">
                    Executive Profile
                  </div>
                </div>
              </div>
            </div>

            {/* Core Domain Expertise section */}
            <div className="bg-primary/5 dark:bg-secondary/5 border border-primary/10 dark:border-secondary/15 p-5 rounded-lg space-y-2">
              <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" /> Specialized Domain Exposure
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                Bridging complex, rapidly evolving sectors like <strong>FinTech, Orbital Logistics, and Sustainable Industry Leadership</strong> requires more than standard operational templates. I translate sophisticated technical requirements into highly structured business operations, clean positioning, and high-impact executive content, establishing market authority for companies in deep-tech and heavily regulated spaces.
              </p>
            </div>

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

            {/* Revenue Operations integration */}
            <div className="border border-border/80 bg-primary/5 dark:bg-secondary/5 p-5 rounded-lg space-y-2">
              <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                <Target className="h-4.5 w-4.5 text-secondary" /> Revenue Operations & Pipeline Automation
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                Drive revenue operations by integrating automation and lead generation platforms—including Make, Apollo.io, and LinkedIn Sales Navigator—directly into structured sales pipelines, CRM workflows, and lead management systems, improving operational efficiency and business growth.
              </p>
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
            <div className="border border-border bg-background p-6 sm:p-8 rounded-lg relative overflow-hidden blue-glow flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">Core Philosophy</h3>
                <blockquote className="text-xs italic text-muted leading-relaxed mb-4">
                  "Growth is not the result of random marketing campaigns or heroic sales efforts. True, sustainable expansion is built on reliable, repeatable operational systems and empowered teams that execute with clarity."
                </blockquote>
                <div className="flex items-center gap-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-secondary">Rahul V. Jadhav</span>
                </div>
              </div>
              <div className="w-[120px] h-[120px] rounded-lg border border-border overflow-hidden shrink-0 shadow-md">
                <img 
                  src="/images/IMG_20251119_095737_240.png" 
                  alt="Executive Discussion" 
                  className="w-full h-full object-cover"
                />
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

            {/* Key Benchmarks Table */}
            <div className="border border-border bg-background p-5 rounded-lg space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border/40 pb-2.5">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-foreground">Operational KPIs & Target Benchmarks</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-muted text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/60 text-secondary uppercase font-bold text-[9px] tracking-wider">
                      <th className="pb-2">Performance Vector</th>
                      <th className="pb-2 text-center">Baseline</th>
                      <th className="pb-2 text-right">Actual Peak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    <tr className="hover:bg-accent/40 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">SLA Sprint Compliance</td>
                      <td className="py-2.5 text-center">88.0%</td>
                      <td className="py-2.5 text-right text-secondary font-bold">98.5%</td>
                    </tr>
                    <tr className="hover:bg-accent/40 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">Outbound Pipeline Lift</td>
                      <td className="py-2.5 text-center">+15%</td>
                      <td className="py-2.5 text-right text-emerald-500 font-bold">+40%</td>
                    </tr>
                    <tr className="hover:bg-accent/40 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">Team Reporting Overhead</td>
                      <td className="py-2.5 text-center">12 hrs/wk</td>
                      <td className="py-2.5 text-right text-secondary font-bold">3.5 hrs/wk</td>
                    </tr>
                    <tr className="hover:bg-accent/40 transition-colors">
                      <td className="py-2.5 font-medium text-foreground">FTE Attrition Rate</td>
                      <td className="py-2.5 text-center">Standard</td>
                      <td className="py-2.5 text-right text-emerald-500 font-bold">-30% Drop</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

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
