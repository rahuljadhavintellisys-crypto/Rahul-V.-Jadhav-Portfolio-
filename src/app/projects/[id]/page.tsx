import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, CheckCircle, Lightbulb, Workflow, Target, ShieldCheck, TrendingUp, BookOpen, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = db.getProjects().find((p) => p.id === id);
  if (!project) return { title: 'Case Study Not Found' };
  
  return {
    title: `${project.title} | Executive Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = db.getProjects().find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary dark:hover:text-secondary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Case Studies
          </Link>

          {/* Jumbotron Heading */}
          <div className="space-y-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Executive Consulting Case Study
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            {/* Core impact banner */}
            <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-lg flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block">Verified Business Impact</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  {project.businessImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 p-5 bg-card border border-border/80 rounded-xl">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted font-bold">Category</span>
              <span className="block text-xs font-bold text-foreground mt-0.5">Strategic Operations</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted font-bold">Role Authority</span>
              <span className="block text-xs font-bold text-foreground mt-0.5">Rahul V. Jadhav</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[9px] uppercase tracking-wider text-muted font-bold">Scope</span>
              <span className="block text-xs font-bold text-foreground mt-0.5">Enterprise Transformation</span>
            </div>
          </div>

          {/* Detailed Content Grid */}
          <div className="space-y-10">
            
            {/* Challenge */}
            <div className="space-y-3.5 border-b border-border/40 pb-8">
              <h3 className="text-lg font-heading font-extrabold text-foreground flex items-center gap-2">
                <span className="p-1.5 rounded bg-red-500/10 text-red-500"><Target className="h-4.5 w-4.5" /></span> The Challenge
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Approach */}
            <div className="space-y-3.5 border-b border-border/40 pb-8">
              <h3 className="text-lg font-heading font-extrabold text-foreground flex items-center gap-2">
                <span className="p-1.5 rounded bg-primary/10 text-primary dark:text-secondary"><Lightbulb className="h-4.5 w-4.5" /></span> Strategic Approach
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* Implementation / Execution Framework */}
            <div className="space-y-3.5 border-b border-border/40 pb-8">
              <h3 className="text-lg font-heading font-extrabold text-foreground flex items-center gap-2">
                <span className="p-1.5 rounded bg-amber-500/10 text-amber-500"><Workflow className="h-4.5 w-4.5" /></span> Execution Framework
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.implementation}
              </p>
            </div>

            {/* Outcome / Results & Impact */}
            <div className="space-y-3.5 border-b border-border/40 pb-8">
              <h3 className="text-lg font-heading font-extrabold text-foreground flex items-center gap-2">
                <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-500"><TrendingUp className="h-4.5 w-4.5" /></span> Results & Impact
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* Lessons Learned */}
            {project.lessonsLearned && (
              <div className="space-y-3.5 border-b border-border/40 pb-8">
                <h3 className="text-lg font-heading font-extrabold text-foreground flex items-center gap-2">
                  <span className="p-1.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-400"><BookOpen className="h-4.5 w-4.5" /></span> Lessons Learned
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {project.lessonsLearned}
                </p>
              </div>
            )}

            {/* Tools & Technologies */}
            <div className="space-y-3.5 pb-2">
              <h3 className="text-lg font-heading font-extrabold text-foreground flex items-center gap-2">
                <span className="p-1.5 rounded bg-sky-500/10 text-sky-500"><Layers className="h-4.5 w-4.5" /></span> Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-card border border-border/80 text-foreground text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Gallery placeholder if gallery is populated */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border/40">
              <h3 className="font-heading font-bold text-lg mb-6">Project Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video bg-card border border-border rounded overflow-hidden relative">
                    <img src={img} alt={`${project.title} Slide ${idx + 1}`} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
