'use client';

import { useState } from 'react';
import { Cpu, Terminal, ArrowRight, Layers, Sliders, CheckCircle, Network } from 'lucide-react';
import { motion } from 'framer-motion';

const TOPICS = [
  {
    title: 'Workflow Automation',
    desc: 'Connecting API nodes (Jira, GitHub, Slack) to LLMs to auto-compile task backlogs, generate daily standup summaries, and eliminate status meeting times.',
    metric: '8h Saved / Week'
  },
  {
    title: 'Reporting Systems',
    desc: 'Building scheduled trigger pipelines that email styled executive-ready status digests directly to the board, preventing reporting errors.',
    metric: '70% Manual Cut'
  },
  {
    title: 'Process Optimization',
    desc: 'Using natural language data models to analyze Excel-based trackers, flag SLA delay warning zones, and optimize developer tasks.',
    metric: '98.5% SLA Met'
  }
];

const ROADMAP_STEPS = [
  {
    phase: 'Phase 01',
    title: 'Core Automation Connectors',
    status: 'COMPLETED',
    desc: 'Developed Slack/WhatsApp alerts, automated email triggers, and centralized metadata pipelines.'
  },
  {
    phase: 'Phase 02',
    title: 'Agentic Sprint Analytics',
    status: 'IN PROGRESS',
    desc: 'Integrating OpenAI assistants to read backlog changes, auto-write developer updates, and alert project coordinators of blockers.'
  },
  {
    phase: 'Phase 03',
    title: 'Predictive Operations Advisor',
    status: 'ROADMAP',
    desc: 'Deploying machine learning models to forecast employee fatigue, balance task distributions, and predict SLA breaches.'
  }
];

export default function AIShowcase() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'roadmap'>('architecture');

  return (
    <section id="ai-showcase" className="py-2 bg-background relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            AI SHOWCASE
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            How I Leverage AI in Operations Management
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Top Split Layout: Philosophy & Topic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex p-2.5 rounded bg-primary/10 text-primary dark:text-secondary border border-border/40">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Replacing Admin Waste with Agentic Workflows
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Many organizations implement AI simply as a chat window. Rahul focuses on integrating AI as a silent background pipeline. By wrapping AI logic around existing databases, Excel trackers, and developer consoles, we construct self-documenting operations structures that do not rely on constant management oversight.
            </p>
            <div className="h-[1px] bg-border my-6" />
            <div className="space-y-4">
              {TOPICS.map((topic, i) => (
                <div key={i} className="flex justify-between items-start gap-4">
                  <div className="flex gap-2">
                    <span className="h-5 w-5 rounded bg-secondary/15 text-secondary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      0{i+1}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-foreground">{topic.title}</h4>
                      <p className="text-xs text-muted mt-0.5">{topic.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-secondary shrink-0 bg-secondary/10 px-2 py-0.5 rounded">
                    {topic.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Visual Panel Switcher */}
            <div className="border border-border rounded-lg bg-card overflow-hidden blue-glow">
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`flex-1 text-center py-4 font-heading font-bold text-xs uppercase tracking-wider focus:outline-none transition-colors duration-200 cursor-pointer ${
                    activeTab === 'architecture' ? 'bg-background text-primary dark:text-secondary font-extrabold border-b-2 border-primary dark:border-secondary' : 'text-muted hover:text-foreground'
                  }`}
                >
                  Star Prime AI OS Architecture
                </button>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`flex-1 text-center py-4 font-heading font-bold text-xs uppercase tracking-wider focus:outline-none transition-colors duration-200 cursor-pointer ${
                    activeTab === 'roadmap' ? 'bg-background text-primary dark:text-secondary font-extrabold border-b-2 border-primary dark:border-secondary' : 'text-muted hover:text-foreground'
                  }`}
                >
                  Integration Roadmap
                </button>
              </div>

              <div className="p-6 sm:p-8 min-h-[360px] flex flex-col justify-between bg-card">
                {activeTab === 'architecture' ? (
                  /* Star Prime AI OS Visualizer */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5" /> Systems Console
                      </span>
                      <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded">
                        Active & Integrated
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Productivity Layer */}
                      <div className="border border-border/80 bg-background/50 p-3.5 rounded flex items-center gap-3">
                        <div className="p-2 rounded bg-primary/10 text-primary dark:text-secondary">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-heading font-bold text-foreground">01. Team Productivity Layer</h4>
                            <span className="text-[9px] text-muted">Jira / Slack API</span>
                          </div>
                          <p className="text-[11px] text-muted mt-0.5">Captures daily ticket changes and compiles velocity indices.</p>
                        </div>
                      </div>

                      {/* Reporting Layer */}
                      <div className="border border-border/80 bg-background/50 p-3.5 rounded flex items-center gap-3">
                        <div className="p-2 rounded bg-secondary/15 text-secondary">
                          <Sliders className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-heading font-bold text-foreground">02. Automated Reporting Engine</h4>
                            <span className="text-[9px] text-muted">OpenAI Assistant API</span>
                          </div>
                          <p className="text-[11px] text-muted mt-0.5">Auto-generates styled stakeholder summaries and metrics.</p>
                        </div>
                      </div>

                      {/* Operations Tracking Layer */}
                      <div className="border border-border/80 bg-background/50 p-3.5 rounded flex items-center gap-3">
                        <div className="p-2 rounded bg-emerald-500/10 text-emerald-500">
                          <Network className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-heading font-bold text-foreground">03. Alert & Notification Hub</h4>
                            <span className="text-[9px] text-muted">Webhooks / Triggers</span>
                          </div>
                          <p className="text-[11px] text-muted mt-0.5">Dispatches real-time KPI alerts via WhatsApp & Email alerts.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-4 text-[10px] text-muted leading-relaxed">
                      * Star Prime AI OS is architected to separate API data retrieval from the core logic layer, ensuring enterprise compliance and secure client credentials.
                    </div>
                  </div>
                ) : (
                  /* Roadmap list */
                  <div className="space-y-6">
                    {ROADMAP_STEPS.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start relative">
                        {/* Connecting Line */}
                        {idx < ROADMAP_STEPS.length - 1 && (
                          <div className="absolute top-10 left-5 bottom-[-20px] w-[1px] bg-border" />
                        )}

                        <div className={`h-10 w-10 rounded-full border flex items-center justify-center font-heading font-bold text-xs shrink-0 ${
                          step.status === 'COMPLETED' ? 'bg-primary text-white border-primary dark:bg-secondary dark:text-background dark:border-secondary' :
                          step.status === 'IN PROGRESS' ? 'bg-background border-primary dark:border-secondary text-primary dark:text-secondary' :
                          'bg-background border-border text-muted'
                        }`}>
                          {step.phase}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading font-bold text-sm text-foreground">{step.title}</h4>
                            <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-wide ${
                              step.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' :
                              step.status === 'IN PROGRESS' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-neutral-500/10 text-neutral-400'
                            }`}>
                              {step.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
