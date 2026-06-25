import Link from 'next/link';
import { Award, ArrowRight, Calendar } from 'lucide-react';
import { db } from '@/db/store';

export default function CertificationsTeaser() {
  const allCerts = db.getCerts();
  // Display top 3 certificates as a teaser preview
  const teaserCerts = allCerts.slice(0, 3);

  if (teaserCerts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-background relative overflow-hidden border-t border-border/40">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
              VERIFIED QUALIFICATIONS
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight leading-tight">
              Certifications & Badges
            </p>
            <div className="h-1 w-12 bg-secondary mt-4" />
          </div>
          <div>
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-secondary group hover:underline cursor-pointer"
            >
              View All Credentials 
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {teaserCerts.map((cert) => (
            <Link
              key={cert.id}
              href="/certifications"
              className="bg-card border border-border/80 rounded-lg p-6 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/10 transition-colors" />
              
              <div className="space-y-4">
                {/* Badge & Date */}
                <div className="flex justify-between items-start">
                  <div className="h-9 w-9 rounded bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] text-muted font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-secondary" /> {cert.issueDate}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted font-semibold">
                    {cert.organization}
                  </p>
                </div>
              </div>

              {/* Tags footer */}
              <div className="pt-6 mt-6 border-t border-border/40 flex flex-wrap gap-1">
                {cert.tags.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[9px] bg-background border border-border px-1.5 py-0.5 rounded font-medium text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All button */}
        <div className="text-center md:hidden">
          <Link
            href="/certifications"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 px-6 rounded text-sm hover:opacity-95 transition-opacity"
          >
            View All Credentials <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
