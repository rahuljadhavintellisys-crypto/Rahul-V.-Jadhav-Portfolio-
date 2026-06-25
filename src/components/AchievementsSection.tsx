import { db } from '@/db/store';
import StatsCounter from './ui/StatsCounter';

export default function AchievementsSection() {
  const stats = db.getStats();

  return (
    <section className="py-2 bg-card/45 relative border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-2">
            TRACK RECORD
          </h2>
          <p className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground tracking-tight">
            Key Performance Metrics in Operations & Leadership
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-3" />
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat) => (
            <StatsCounter
              key={stat.id}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
