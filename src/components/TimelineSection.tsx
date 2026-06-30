'use client';

import { useState } from 'react';
import { Briefcase, Calendar, Star, Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Role {
  company: string;
  role: string;
  duration: string;
  overview: string;
  responsibilities: string[];
  achievements: string[];
  impact: string;
}

const ROLES: Role[] = [
  {
    company: "Intellisys IT Solutions Pvt. Ltd.",
    role: "Head of Team Operations",
    duration: "Present",
    overview: "Leading cross-functional software development and team operations. Orchestrated technical project leadership from planning through rollout, hosting kickoff meetings, analyzing business modules, and managing developer roadmaps. Successfully delivered complex website implementations for leading consulting firms, including Beyond Transform, bridging technical staff and corporate stakeholders.",
    responsibilities: [
      "Conducting technical kickoff sessions, auditing legacy codebase architectures, and coordinating development milestones.",
      "Bridging communication between non-technical business stakeholders and engineering execution teams.",
      "Overseeing daily huddles, sprint planning, and operational alignment boards.",
      "Coordinating with project managers and client advocates to balance resource allocation.",
      "Designing custom KPI frameworks to measure individual performance and sprint velocity."
    ],
    achievements: [
      "Led website implementation and module migration projects for top-tier consulting firms like Beyond Transform.",
      "Optimized company-wide SLA compliance rating to a consistent 98.5% (up from 88%).",
      "Decreased development tracking overhead through centralized dashboards, saving team leads 8 hours/week.",
      "Reduced employee turnover by 30% through clear career progression tracks and structured reviews."
    ],
    impact: "Drove high operational efficiency, eliminating project delays and aligning internal developer goals with direct business targets."
  },
  {
    company: "The Star Prime Magazine",
    role: "Head of Operations",
    duration: "Present (Leadership Role)",
    overview: "Directing media launch execution, branding, and publication operations. Managed end-to-end content launch strategies from scratch, developing thematic business bulletins and high-impact executive publications focused on emerging business trends.",
    responsibilities: [
      "Coordinating end-to-end content development, branding strategy, and launch execution.",
      "Creating future-focused business bulletins and profiling features targeting CXO executives.",
      "Streamlining publication workflows from submission to layout and final digital distribution.",
      "Managing advertisement, sales, and sponsor client pipelines."
    ],
    achievements: [
      "Spearheaded the creation of the Star Prime AI OS, which automated manual status checking and workflow tracking.",
      "Cut editorial reporting overhead by 70%, shortening monthly magazine publishing cycles by 4 days.",
      "Expanded reader engagement and C-Suite participation rates by 120% through structured branding assets."
    ],
    impact: "Modernized a traditional media brand into an automated, high-visibility digital-first executive platform."
  },
  {
    company: "The Entrepreneurial Chronicles",
    role: "Head of Growth & Operations",
    duration: "Previous Role",
    overview: "Led operational framework design, partnership growth strategy, and B2B sponsor relations for digital entrepreneurship journals.",
    responsibilities: [
      "Streamlining editorial, design, and growth pipelines to enhance publication velocity.",
      "Developing growth partnerships with fast-scaling tech companies and business networks.",
      "Implementing structured tracking databases for reader metrics and outbound sponsor outreach."
    ],
    achievements: [
      "Built B2B sponsorship outreach pipelines that accelerated publishing revenue.",
      "Integrated automated content calendars to reduce project coordination overhead."
    ],
    impact: "Established a unified operations system bridging advertising goals with editorial output."
  },
  {
    company: "The Unicorn Times Magazine",
    role: "Head of Growth & Operations",
    duration: "Previous Role",
    overview: "Managed business publication systems, operational huddles, and outbound growth targeting tech founders.",
    responsibilities: [
      "Overseeing sponsor management pipelines and outreach response times.",
      "Coordinating with content editors to align corporate profiles with target reader segments.",
      "Designing automated outreach sequences to scrape and qualify potential CXO leads."
    ],
    achievements: [
      "Expanded publication engagement by deploying custom email workflows.",
      "Enhanced SLA delivery speeds for custom executive profiling features."
    ],
    impact: "Boosted digital footprint and outbound lead opportunities among startup and venture capital communities."
  },
  {
    company: "TradeFlock",
    role: "Head of Sales & Growth Strategy",
    duration: "Previous Role",
    overview: "Directed outbound sales, growth strategy, and B2B corporate relations. Engineered automation tools to scrape, qualify, and target C-level executives in mid-market tech segments.",
    responsibilities: [
      "Structuring outbound sales scripts, sequence frameworks, and pipeline benchmarks.",
      "Coaching and mentoring business development executives on enterprise account acquisition.",
      "Managing Salesforce/HubSpot CRM setups and analyzing pipeline analytics.",
      "Building strategic media partnerships with corporate associations."
    ],
    achievements: [
      "Directed outbound campaigns that successfully established partnerships with over 150+ high-profile business leaders.",
      "Built a B2B sales development model that grew the outbound lead-to-opportunity rate by 40%."
    ],
    impact: "Established a scalable outbound growth engine that generated record pipeline value in key technology segments."
  },
  {
    company: "CIO Outlook Magazine",
    role: "Team Leader",
    duration: "Previous Role",
    overview: "Supervised B2B media outreach and client accounts. Managed corporate campaigns and project execution from initial planning through publication delivery, aligning cross-functional design and editorial teams to ensure seamless client satisfaction.",
    responsibilities: [
      "Supervising a team of 10+ business development professionals.",
      "Targeting and qualifying CXOs and tech decision-makers for publication features.",
      "Conducting initial brand alignment audits with prospective executives.",
      "Coordinating multiple internal and external stakeholders to deliver monthly editorial layouts."
    ],
    achievements: [
      "Consistently achieved 115%+ of team sales quotas quarter-over-quarter.",
      "Designed an onboarding playbook that reduced team ramp-up times from 6 weeks to 3 weeks."
    ],
    impact: "Significantly broadened the magazine's executive database and network of technology contributors."
  },
  {
    company: "Insights Success",
    role: "Senior Business Development Executive",
    duration: "Previous Role",
    overview: "Led client relationship channels, B2B sales cycles, and post-sale project execution. Managed corporate campaigns from contract signing to final publication delivery, coordinating multiple stakeholders and ensuring cross-team execution.",
    responsibilities: [
      "Identifying, contacting, and pitching corporate marketing packages to founders.",
      "Securing contracts, drafting sponsorship proposals, and closing key corporate accounts.",
      "Managing post-sale onboarding workflows and coordination with design/editorial teams."
    ],
    achievements: [
      "Ranked as the #1 Business Development Professional for three consecutive quarters.",
      "Personally secured features with 45+ fast-growing technology companies."
    ],
    impact: "Drove immediate growth in advertising revenue while establishing early brand positioning structures."
  }
];

export default function TimelineSection() {
  const [activeRole, setActiveRole] = useState<number>(0);

  return (
    <section id="journey" className="py-2 relative scroll-mt-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            LEADERSHIP TIMELINE
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            An Interactive Journey of Scale & Strategy
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Desktop Interactive Layout (Side by Side) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Timeline List */}
          <div className="col-span-4 flex flex-col space-y-3 pr-4 border-r border-border">
            {ROLES.map((role, idx) => (
              <button
                key={idx}
                onClick={() => setActiveRole(idx)}
                className="w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer flex items-start gap-3.5 focus:outline-none border-border/60 bg-card hover:bg-accent/60 active:scale-[0.98]"
                style={{
                  borderColor: activeRole === idx ? 'var(--color-primary, #EDC531)' : 'rgba(255,255,255,0.08)',
                  backgroundColor: activeRole === idx ? 'rgba(237,201,49,0.05)' : ''
                }}
              >
                <div className="p-2 rounded shrink-0" style={{
                  backgroundColor: activeRole === idx ? 'var(--color-primary, #EDC531)' : 'rgba(255,255,255,0.08)',
                  color: activeRole === idx ? '#0B1020' : '#8892B0'
                }}>
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs text-muted font-semibold flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {role.duration}
                  </span>
                  <span className="block font-heading font-bold text-sm text-foreground truncate mt-1">
                    {role.role}
                  </span>
                  <span className="block text-xs text-muted truncate mt-0.5">
                    {role.company}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Role Details */}
          <div className="col-span-8 bg-card border border-border p-8 rounded-lg relative min-h-[450px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1"
              >
                {/* Role Header */}
                <div className="border-b border-border/60 pb-5">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                    {ROLES[activeRole].duration}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                    {ROLES[activeRole].role}
                  </h3>
                  <p className="text-sm font-semibold text-primary dark:text-secondary mt-1">
                    {ROLES[activeRole].company}
                  </p>
                </div>

                {/* Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-foreground tracking-wider">
                    Overview
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {ROLES[activeRole].overview}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-foreground tracking-wider">
                    Core Mandates
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted">
                    {ROLES[activeRole].responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-foreground tracking-wider flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-secondary" /> Key Milestones
                  </h4>
                  <ul className="space-y-2 text-xs text-muted">
                    {ROLES[activeRole].achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 bg-background border border-border/50 p-2.5 rounded">
                        <Star className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Impact block */}
                <div className="pt-4 border-t border-border/50 flex items-start gap-3 mt-6">
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-500 shrink-0">
                    <TrendingUp className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Net Business Impact</span>
                    <p className="text-xs text-muted font-medium mt-0.5">
                      {ROLES[activeRole].impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / Tablet Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {ROLES.map((role, idx) => (
            <div
              key={idx}
              className="border border-border bg-card rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setActiveRole(activeRole === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                    {role.duration}
                  </span>
                  <h3 className="font-heading font-bold text-base text-foreground mt-0.5 truncate">
                    {role.role}
                  </h3>
                  <p className="text-xs text-muted truncate mt-0.5">
                    {role.company}
                  </p>
                </div>
                <div className={`transform transition-transform duration-200 ${
                  activeRole === idx ? 'rotate-180 text-secondary' : 'text-muted'
                }`}>
                  <Briefcase className="h-5 w-5" />
                </div>
              </button>

              <AnimatePresence>
                {activeRole === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-border/60 bg-background/50 overflow-hidden"
                  >
                    <div className="p-5 space-y-5">
                      {/* Overview */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase text-foreground tracking-wider block">Overview</span>
                        <p className="text-xs text-muted leading-relaxed">{role.overview}</p>
                      </div>

                      {/* Mandates */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase text-foreground tracking-wider block">Core Mandates</span>
                        <ul className="space-y-1.5 text-xs text-muted">
                          {role.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1 w-1 rounded-full bg-secondary shrink-0 mt-2" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase text-foreground tracking-wider block">Key Milestones</span>
                        <ul className="space-y-2 text-xs text-muted">
                          {role.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2 bg-card border border-border/60 p-2.5 rounded">
                              <Star className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact */}
                      <div className="pt-3 border-t border-border/60 flex items-start gap-2.5">
                        <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 block">Business Impact</span>
                          <p className="text-xs text-muted mt-0.5">{role.impact}</p>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
