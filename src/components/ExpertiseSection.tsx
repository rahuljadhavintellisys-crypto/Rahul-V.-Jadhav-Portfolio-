'use client';

import { Activity, Target, ShieldAlert, Cpu, Clipboard, RefreshCw, Users, Key, Monitor, Star, CheckSquare, HeartHandshake } from 'lucide-react';

interface Skill {
  title: string;
  desc: string;
  metric: string;
  icon: any;
}

interface Category {
  title: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    title: "Operations & Governance",
    skills: [
      {
        title: "Operations Leadership",
        desc: "Directing daily tech and service pipelines, structuring huddles, and managing cross-functional capacity planning.",
        metric: "98.5% SLA Met",
        icon: ShieldAlert
      },
      {
        title: "Project Management",
        desc: "Deploying Agile systems, configuring sprint metrics, and implementing transparent milestones across remote divisions.",
        metric: "Agile Certified",
        icon: Clipboard
      },
      {
        title: "Process Optimization",
        desc: "Auditing internal documentation, spotting delays, and designing automated tracking schemas.",
        metric: "30%+ Attrition Drop",
        icon: RefreshCw
      },
      {
        title: "Team Leadership",
        desc: "Coaching hybrid groups, planning talent paths, and creating high-accountability workspaces.",
        metric: "45+ Professionals Led",
        icon: Users
      }
    ]
  },
  {
    title: "Growth Strategy & Sales",
    skills: [
      {
        title: "Business Development",
        desc: "Securing contracts, analyzing value points, and maintaining strong executive relationship channels.",
        metric: "#1 Top Performer",
        icon: Target
      },
      {
        title: "Growth Strategy",
        desc: "Building outbound B2B sequences, scoping campaigns, and configuring data-driven client models.",
        metric: "40% Opportunity Lift",
        icon: Activity
      },
      {
        title: "Strategic Partnerships",
        desc: "Structuring alliances with industry associations and establishing media integration campaigns.",
        metric: "150+ C-Suite Alliances",
        icon: HeartHandshake
      },
      {
        title: "Client Success",
        desc: "Designing fast onboarding templates, analyzing satisfaction metrics, and reducing post-sales churn.",
        metric: "99.9% Client Uptime",
        icon: Key
      }
    ]
  },
  {
    title: "Technology & Branding",
    skills: [
      {
        title: "AI Transformation",
        desc: "Replacing repetitive manual huddles and reports with intelligent LLM agent pipelines.",
        metric: "Star Prime AI OS",
        icon: Cpu
      },
      {
        title: "Digital Transformation",
        desc: "Transitioning traditional workflows into cloud databases and automated reporting pathways.",
        metric: "70% Overhead Saved",
        icon: Monitor
      },
      {
        title: "Personal Branding",
        desc: "Consulting C-level executives on thought leadership, LinkedIn campaigns, and profile growth.",
        metric: "120% Traffic Expansion",
        icon: Star
      },
      {
        title: "Leadership Development",
        desc: "Integrating KPI trackers with personal brand objectives to scale employee performance.",
        metric: "100% OKR Alignment",
        icon: CheckSquare
      }
    ]
  }
];

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-8 sm:py-10 bg-card/45 relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            AREAS OF SPECIALIZATION
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            Strategic Competencies & Impact Metrics
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Categories Loop */}
        <div className="space-y-16">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              {/* Category Title */}
              <div className="flex items-center gap-4">
                <h3 className="font-heading font-extrabold text-lg uppercase tracking-wider text-primary dark:text-secondary shrink-0">
                  {cat.title}
                </h3>
                <div className="h-[1px] bg-border w-full" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.skills.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={sIdx}
                      className="bg-background border border-border/80 p-6 rounded hover:border-primary dark:hover:border-secondary transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                    >
                      <div className="space-y-3.5">
                        {/* Skill Icon */}
                        <div className="h-10 w-10 rounded bg-primary/5 dark:bg-secondary/5 flex items-center justify-center text-primary dark:text-secondary border border-border/40 shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        {/* Title & Desc */}
                        <div className="space-y-1.5">
                          <h4 className="font-heading font-bold text-sm text-foreground">
                            {skill.title}
                          </h4>
                          <p className="text-xs text-muted leading-relaxed">
                            {skill.desc}
                          </p>
                        </div>
                      </div>

                      {/* Performance Metric Badge */}
                      <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest text-muted font-bold">Standard Metric</span>
                        <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                          {skill.metric}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
