import { MetadataRoute } from 'next';
import { db } from '@/db/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rahulvjadhav.com';

  // Core static routes
  const staticRoutes = [
    '',
    '/projects',
    '/blog',
    '/schedule',
    '/vcard'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  // Dynamic projects routes
  const projectRoutes = db.getProjects().map(proj => ({
    url: `${baseUrl}/projects/${proj.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  // Dynamic blog routes
  const blogRoutes = db.getBlogs().map(blog => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
