import type { Metadata } from 'next';
import { db } from '@/db/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogIndex from './BlogIndex';

export const metadata: Metadata = {
  title: 'Operations & Strategy Insights | Rahul V. Jadhav',
  description: 'Read the latest thought leadership articles by Rahul V. Jadhav on scaling hybrid operations, outbound sales pipeline strategy, and AI-driven business systems.',
};

export default function BlogPage() {
  const blogs = db.getBlogs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
              Executive Insights & Articles
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Tactical essays, system designs, and operation roadmaps for founders, COOs, and product leaders looking to optimize productivity.
            </p>
            <div className="h-1 w-12 bg-secondary" />
          </div>

          {/* Grid lists */}
          <BlogIndex blogs={blogs} />

        </div>
      </main>
      <Footer />
    </div>
  );
}
