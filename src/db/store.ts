import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Helper to ensure data directory and files exist
function ensureDirAndFile(filename: string, defaultData: any = []) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
  return filePath;
}

export function readData<T>(filename: string, defaultValue: T): T {
  const filePath = ensureDirAndFile(filename, defaultValue);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error reading database file: ${filename}`, error);
    return defaultValue;
  }
}

export function writeData<T>(filename: string, data: T): void {
  const filePath = ensureDirAndFile(filename, data);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing database file: ${filename}`, error);
  }
}

// Interfaces
export interface Project {
  id: string;
  title: string;
  description: string;
  challenge: string;
  approach: string;
  implementation: string;
  outcome: string;
  gallery: string[]; // paths or placeholder icons
  technologies: string[];
  businessImpact: string;
  featured: boolean;
  lessonsLearned?: string;
}

export interface Blog {
  slug: string;
  title: string;
  content: string;
  category: string;
  summary: string;
  publishedAt: string;
  readTime: string;
  seoKeywords: string[];
  imageUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  verifyUrl: string;
  imageUrl?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  category: 'client' | 'leadership' | 'team' | 'video';
  avatarUrl?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Data Store Accessors
export const db = {
  getProjects: () => readData<Project[]>('projects.json', []),
  saveProject: (project: Project) => {
    const list = db.getProjects();
    const idx = list.findIndex(p => p.id === project.id);
    if (idx > -1) list[idx] = project;
    else list.push(project);
    writeData('projects.json', list);
  },
  deleteProject: (id: string) => {
    const list = db.getProjects().filter(p => p.id !== id);
    writeData('projects.json', list);
  },

  getBlogs: () => readData<Blog[]>('blogs.json', []),
  saveBlog: (blog: Blog) => {
    const list = db.getBlogs();
    const idx = list.findIndex(b => b.slug === blog.slug);
    if (idx > -1) list[idx] = blog;
    else list.push(blog);
    writeData('blogs.json', list);
  },
  deleteBlog: (slug: string) => {
    const list = db.getBlogs().filter(b => b.slug !== slug);
    writeData('blogs.json', list);
  },

  getCerts: () => readData<Certification[]>('certs.json', []),
  saveCert: (cert: Certification) => {
    const list = db.getCerts();
    const idx = list.findIndex(c => c.id === cert.id);
    if (idx > -1) list[idx] = cert;
    else list.push(cert);
    writeData('certs.json', list);
  },
  deleteCert: (id: string) => {
    const list = db.getCerts().filter(c => c.id !== id);
    writeData('certs.json', list);
  },

  getTestimonials: () => readData<Testimonial[]>('testimonials.json', []),
  saveTestimonial: (t: Testimonial) => {
    const list = db.getTestimonials();
    const idx = list.findIndex(item => item.id === t.id);
    if (idx > -1) list[idx] = t;
    else list.push(t);
    writeData('testimonials.json', list);
  },
  deleteTestimonial: (id: string) => {
    const list = db.getTestimonials().filter(item => item.id !== id);
    writeData('testimonials.json', list);
  },

  getStats: () => readData<Stat[]>('stats.json', [
    { id: '1', label: 'Years of Experience', value: 4, suffix: '+' },
    { id: '2', label: 'Teams Led', value: 45, suffix: '+' },
    { id: '3', label: 'Projects Managed', value: 30, suffix: '+' },
    { id: '4', label: 'Business Leaders Connected', value: 200, suffix: '+' },
    { id: '5', label: 'Partnerships Developed', value: 15, suffix: '+' },
    { id: '6', label: 'Growth Campaigns Executed', value: 12, suffix: '+' }
  ]),
  saveStats: (stats: Stat[]) => {
    writeData('stats.json', stats);
  },

  getInquiries: () => readData<Inquiry[]>('inquiries.json', []),
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const list = db.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    list.unshift(newInquiry);
    writeData('inquiries.json', list);
    return newInquiry;
  },
  deleteInquiry: (id: string) => {
    const list = db.getInquiries().filter(i => i.id !== id);
    writeData('inquiries.json', list);
  }
};
