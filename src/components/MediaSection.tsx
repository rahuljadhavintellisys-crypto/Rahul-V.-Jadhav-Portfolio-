'use client';
 
import { Award, BookOpen, ExternalLink, Play, Radio } from 'lucide-react';
 
interface Publication {
  title: string;
  source: string;
  type: 'Feature' | 'Interview' | 'Award' | 'Podcast';
  desc: string;
  date: string;
  link: string;
  imageUrl?: string;
}

const ITEMS: Publication[] = [
  {
    title: "Team Captain Excellence Award: Operations & B2B Leadership",
    source: "Insights Success & CIO Outlook Magazine",
    type: "Award",
    desc: "Recognized as a Team Captain for outstanding execution, stakeholder coordination, and scaling high-performance sales and operations teams.",
    date: "June 2026",
    link: "https://www.linkedin.com/in/rahul-jadhav-38ba29216/",
    imageUrl: "/images/IMG_20240526_181808_814.png"
  },
  {
    title: "Operations Excellence: Redefining Agile Sprints for Hybrid IT Teams",
    source: "The Star Prime Magazine",
    type: "Feature",
    desc: "A detailed review detailing how operations leaders can use automated SLA trackers to decrease development delays and boost B2B delivery speeds.",
    date: "June 2025",
    link: "https://www.linkedin.com/in/rahul-jadhav-38ba29216/",
    imageUrl: "/images/IMG_20240526_181808_884.png"
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

const VIDEOS = [
  {
    title: "Operations Blueprint: Scalable SaaS Dashboard Architectures",
    desc: "A video walkthrough demonstrating how to map operational metrics, SLA logs, and task dependencies into automated project management platforms.",
    url: "/images/VID-20251115-WA0095.mp4"
  },
  {
    title: "Executive Panel: Operations Leaders and AI Automation Integration",
    desc: "Rahul speaking during a virtual panel discussion on replacing manual huddles with automated workflow triggers.",
    url: "/images/VID-20251115-WA0094.mp4"
  },
  {
    title: "Outbound Growth Strategy: CRM Pipelines & Lead Scoring Webinars",
    desc: "A webinar deck presentation mapping Apollo.io and LinkedIn Sales Navigator lead capture rules into HubSpot.",
    url: "/images/VID-20251115-WA0093.mp4"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ITEMS.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-card border border-border/80 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group"
              >
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Visual Indicator of Type */}
                    <div className="flex justify-between items-start gap-4">
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
                      
                      <div className="text-muted group-hover:text-primary dark:group-hover:text-secondary transition-colors md:hidden">
                        {item.type === 'Award' ? <Award className="h-5 w-5" /> :
                         <BookOpen className="h-5 w-5" />}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5">
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <span className="block text-xs font-bold text-muted uppercase">
                        Published in: {item.source}
                      </span>
                      <p className="text-xs text-muted leading-relaxed pt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Link */}
                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
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

                {item.imageUrl && (
                  <div className="w-full md:w-32 h-40 md:h-auto rounded-lg border border-border/80 overflow-hidden shrink-0 relative shadow-md">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Video Grid Section */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-2">
              VIDEO BRIEFINGS
            </h2>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
              Systems Walkthroughs & Panel Discussions
            </p>
            <div className="h-1 w-12 bg-secondary mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {VIDEOS.map((vid, idx) => (
              <div 
                key={idx} 
                className="bg-card border border-border/80 rounded-lg p-5 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  {/* Video Player wrapper */}
                  <div className="w-full aspect-video rounded border border-border/80 overflow-hidden bg-background relative shadow-inner">
                    <video 
                      src={vid.url} 
                      className="w-full h-full object-cover" 
                      controls 
                      preload="metadata"
                      muted
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-foreground leading-snug group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {vid.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
