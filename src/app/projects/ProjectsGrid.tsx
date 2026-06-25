'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, FolderOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '@/db/store';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  // Collect all unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.technologies.forEach(t => techs.add(t)));
    return ['All', ...Array.from(techs)];
  }, [projects]);

  // Filtered projects
  const filtered = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      const matchesTech = selectedTagMatches(project.technologies, selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [projects, search, selectedTech]);

  function selectedTagMatches(projectTechs: string[], selected: string) {
    if (selected === 'All') return true;
    return projectTechs.includes(selected);
  }

  return (
    <div className="space-y-10">
      {/* Filtering Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-border/40">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search projects by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border border-border text-foreground text-sm rounded pl-10 pr-4 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
          />
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 items-center">
          {allTechs.slice(0, 8).map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all duration-200 cursor-pointer focus:outline-none ${
                selectedTech === tech
                  ? 'bg-primary text-white dark:bg-secondary dark:text-background'
                  : 'bg-card border border-border/80 text-foreground hover:bg-accent'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header Icon */}
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 rounded bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary border border-border/40 flex items-center justify-center">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  {project.featured && (
                    <span className="text-[9px] font-extrabold bg-secondary/15 text-secondary px-2.5 py-1 rounded tracking-wider uppercase">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-lg text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Technologies & Action */}
              <div className="pt-6 mt-6 border-t border-border/40 space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-background border border-border/60 px-1.5 py-0.5 rounded text-muted font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[9px] text-muted font-medium pt-0.5">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <Link
                  href={`/projects/${project.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary/5 hover:bg-primary hover:text-white dark:bg-secondary/5 dark:hover:bg-secondary dark:hover:text-background text-primary dark:text-secondary font-bold text-xs py-2.5 rounded transition-all cursor-pointer focus:outline-none"
                >
                  View Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card/20">
          <CheckCircle2 className="h-10 w-10 text-muted mx-auto mb-3" />
          <p className="text-sm font-bold text-foreground">No case studies found matching search parameters.</p>
        </div>
      )}
    </div>
  );
}
