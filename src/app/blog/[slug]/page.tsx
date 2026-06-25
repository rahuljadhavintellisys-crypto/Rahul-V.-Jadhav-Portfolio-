import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = db.getBlogs().find((b) => b.slug === slug);
  if (!blog) return { title: 'Article Not Found' };

  return {
    title: `${blog.title} | Rahul V. Jadhav`,
    description: blog.summary,
    keywords: blog.seoKeywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = db.getBlogs().find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Schema Markup (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'description': blog.summary,
    'datePublished': blog.publishedAt,
    'author': {
      '@type': 'Person',
      'name': 'Rahul V. Jadhav',
      'jobTitle': 'Head of Team Operations',
      'url': 'https://www.linkedin.com/in/rahul-jadhav-38ba29216/'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Rahul V. Jadhav Brand Platform',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://rahulvjadhav.com/favicon.ico'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://rahulvjadhav.com/blog/${blog.slug}`
    }
  };

  const paragraphs = blog.content.split('\n\n');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary dark:hover:text-secondary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>

          <article className="space-y-8">
            <div className="space-y-4">
              <span className="bg-primary/5 dark:bg-secondary/5 text-primary dark:text-secondary border border-border/40 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider inline-block">
                {blog.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-muted border-b border-border/40 pb-6">
                <div className="flex items-center gap-1.5 font-semibold text-foreground/80">
                  <User className="h-4 w-4 text-secondary" />
                  <span>Rahul V. Jadhav</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>{blog.publishedAt}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>

            <div className="text-foreground text-sm sm:text-base leading-relaxed space-y-6">
              {paragraphs.map((para, idx) => {
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-heading font-extrabold text-foreground pt-4 mb-2">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }
                
                if (para.startsWith('- ') || para.startsWith('* ')) {
                  const items = para.split('\n');
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-2 text-muted">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^[-*]\s+/, '')}</li>
                      ))}
                    </ul>
                  );
                }

                if (para.match(/^\d+\.\s/)) {
                  const items = para.split('\n');
                  return (
                    <ol key={idx} className="list-decimal pl-5 space-y-2 text-muted">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s+/, '')}</li>
                      ))}
                    </ol>
                  );
                }

                const cleanPara = para.split('**').map((chunk, i) => {
                  if (i % 2 === 1) {
                    return <strong key={i} className="text-foreground font-extrabold">{chunk}</strong>;
                  }
                  return chunk;
                });

                return (
                  <p key={idx} className="text-muted leading-relaxed">
                    {cleanPara}
                  </p>
                );
              })}
            </div>

            <div className="pt-10 border-t border-border/40 flex flex-wrap gap-2 items-center">
              <Tag className="h-4.5 w-4.5 text-muted shrink-0" />
              {blog.seoKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-card border border-border px-2.5 py-1 rounded text-muted font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>

          </article>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
