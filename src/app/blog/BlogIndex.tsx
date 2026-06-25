'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { Blog } from '@/db/store';

interface BlogIndexProps {
  blogs: Blog[];
}

export default function BlogIndex({ blogs }: BlogIndexProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract all unique categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    blogs.forEach(b => list.add(b.category));
    return ['All', ...Array.from(list)];
  }, [blogs]);

  // Determine the featured blog (the latest one)
  const featuredBlog = useMemo(() => {
    if (blogs.length === 0) return null;
    return blogs[0];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Exclude featured article from the list below if no filter is active
      const isFeatured = featuredBlog && blog.slug === featuredBlog.slug;
      const shouldExcludeFeatured = isFeatured && search === '' && selectedCategory === 'All';
      
      if (shouldExcludeFeatured) return false;

      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.summary.toLowerCase().includes(search.toLowerCase());

      const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [blogs, search, selectedCategory, featuredBlog]);

  return (
    <div className="space-y-12">
      
      {/* Featured Article Section (Visible only when no filters are active) */}
      {featuredBlog && search === '' && selectedCategory === 'All' && (
        <div className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-secondary/30 transition-all duration-300 group">
          
          {/* Left Visual Banner (Representing Featured Image / Gradient Graphic) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary/35 via-primary/10 to-secondary/35 relative flex flex-col justify-between p-8 sm:p-10 min-h-[260px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-border/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.06),transparent_60%)]" />
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="inline-flex items-center gap-1 bg-secondary/20 text-secondary border border-secondary/30 px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="h-3 w-3 animate-pulse" /> Featured Insight
              </span>
            </div>

            <div className="relative z-10 space-y-2 mt-auto">
              <span className="block text-[9px] uppercase tracking-widest text-muted font-bold">Thought Leader Editorial</span>
              <p className="font-heading font-extrabold text-foreground text-lg leading-tight tracking-tight">
                Rahul V. Jadhav on scaling technology systems and hybrid operations teams.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Meta details */}
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary border border-border/40 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  {featuredBlog.category}
                </span>
                
                <div className="flex items-center gap-3 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {featuredBlog.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featuredBlog.readTime}
                  </span>
                </div>
              </div>

              {/* Title & Summary */}
              <div className="space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-tight">
                  {featuredBlog.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {featuredBlog.summary}
                </p>
              </div>

            </div>

            {/* Read Link */}
            <div className="pt-6 border-t border-border/40 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-secondary" /> C-Suite Read
              </span>
              
              <Link
                href={`/blog/${featuredBlog.slug}`}
                className="text-sm font-bold text-primary dark:text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                Read Insight <ChevronRight className="h-4.5 w-4.5" />
              </Link>
            </div>

          </div>

        </div>
      )}

      {/* Filtering Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-border/40">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search articles by title or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border border-border text-foreground text-sm rounded pl-10 pr-4 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all duration-200 cursor-pointer focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-primary text-white dark:bg-secondary dark:text-background'
                  : 'bg-card border border-border/80 text-foreground hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.slug}
              className="bg-card border border-border/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary border border-border/40 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {blog.category}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {blog.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-secondary" /> C-Suite Read
                </span>
                
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-bold text-primary dark:text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  Read Article <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card/20">
          <BookOpen className="h-10 w-10 text-muted mx-auto mb-3" />
          <p className="text-sm font-bold text-foreground">No insights found matching query parameters.</p>
        </div>
      )}

    </div>
  );
}
