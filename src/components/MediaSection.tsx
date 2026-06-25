'use client';

import { Award, BookOpen, ExternalLink, Play, Radio } from 'lucide-react';

interface Publication {
  title: string;
  source: string;
  type: 'Feature' | 'Interview' | 'Award' | 'Podcast';
  desc: string;
  date: string;
  link: string;
}

const ITEMS: Publication[] = [
  {
    title: "Operations Excellence: Redefining Agile Sprints for Hybrid IT Teams",
    source: "The Star Prime Magazine",
    type: "Feature",
    desc: "A detailed review detailing how operations leaders can use automated SLA trackers to decrease development delays and boost team morale.",
    date: "June 2025",
    link: "https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
  },
  {
    title: "Operations Leader of the Year: Transforming Traditional Media Workflows",
    source: "The Star Prime Awards",
    type: "Award",
    desc: "Awarded for the conceptualization, design, and organization-wide rollout of the Star Prime AI OS.",
    date: "December 2024",
    link: "https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
  },
  {
    title: "The Future of Outbound Enterprise Sales Automation",
    source: "CIO Outlook Magazine",
    type: "Feature",
    desc: "Rahul outlines the blueprint of modern Sales Navigator sequences and HubSpot-centric lead scoring logic.",
    date: "September 2024",
    link: "https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
  },
  {
    title: "Leading Teams with Data and Empathy",
    source: "Insights Success Leaders",
    type: "Interview",
    desc: "An executive interview covering career progression, remote accountability huddles, and scaling B2B teams.",
    date: "May 2024",
    link: "https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
  }
];

export default function MediaSection() {
  return (
    <section id="media" className="py-8 sm:py-10 relative scroll-mt-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            MEDIA & RECOGNITION
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            Features, Press & Publications
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ITEMS.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-card border border-border/80 rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group"
              >
                {/* Visual Indicator of Type */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide ${
                      item.type === 'Award' ? 'bg-amber-500/10 text-amber-500' :
                      item.type === 'Feature' ? 'bg-primary/10 text-primary dark:text-secondary' :
                      'bg-sky-500/10 text-sky-500'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-[10px] text-muted font-semibold">{item.date}</span>
                  </div>
                  
                  <div className="text-muted group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {item.type === 'Award' ? <Award className="h-5 w-5" /> :
                     item.type === 'Podcast' ? <Radio className="h-5 w-5" /> :
                     <BookOpen className="h-5 w-5" />}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1">
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <span className="block text-xs font-bold text-muted uppercase">
                    Published in: {item.source}
                  </span>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed pt-2">
                    {item.desc}
                  </p>
                </div>

                {/* Link */}
                <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted">Verify Feature</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary dark:text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                  >
                    View Article <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
