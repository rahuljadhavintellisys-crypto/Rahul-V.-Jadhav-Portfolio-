import type { Metadata } from 'next';
import { db } from '@/db/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsGrid from './ProjectsGrid';

export const metadata: Metadata = {
  title: 'Executive Portfolio | Rahul V. Jadhav',
  description: 'Explore the operational case studies, growth initiatives, and AI transformation projects managed by Rahul V. Jadhav.',
};

export default function ProjectsPage() {
  const projects = db.getProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
              Executive Case Studies
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              A comprehensive showcase of operational frameworks, AI workflow systems, media properties, and business growth campaigns engineered to scale organizations.
            </p>
            <div className="h-1 w-12 bg-secondary" />
          </div>

          {/* Interactive Grid */}
          <ProjectsGrid projects={projects} />

        </div>
      </main>
      <Footer />
    </div>
  );
}
