'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FolderOpen,
  BookOpen,
  Award,
  MessageSquare,
  BarChart,
  LogOut,
  Trash2,
  Plus,
  Edit3,
  Calendar,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { Project, Blog, Certification, Testimonial, Stat, Inquiry } from '@/db/store';

interface AdminDashboardProps {
  initialProjects: Project[];
  initialBlogs: Blog[];
  initialCerts: Certification[];
  initialTestimonials: Testimonial[];
  initialStats: Stat[];
  initialInquiries: Inquiry[];
}

export default function AdminDashboard({
  initialProjects,
  initialBlogs,
  initialCerts,
  initialTestimonials,
  initialStats,
  initialInquiries,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects' | 'blogs' | 'certs' | 'testimonials' | 'stats'>('inquiries');
  
  // Data lists
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [certs, setCerts] = useState<Certification[]>(initialCerts);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [stats, setStats] = useState<Stat[]>(initialStats);

  // Form overlays modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'blog' | 'cert' | 'testimonial' | 'stat' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '', title: '', description: '', challenge: '', approach: '', implementation: '', outcome: '', gallery: [], technologies: [], businessImpact: '', featured: false
  });
  const [blogForm, setBlogForm] = useState<Partial<Blog>>({
    slug: '', title: '', summary: '', category: 'Operations', publishedAt: new Date().toISOString().split('T')[0], readTime: '5 min read', seoKeywords: [], content: ''
  });
  const [certForm, setCertForm] = useState<Partial<Certification>>({
    id: '', title: '', organization: '', issueDate: '', verifyUrl: '', tags: []
  });
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    id: '', name: '', role: '', company: '', content: '', category: 'client'
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleSave = async (type: string, data: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, action: 'save', data })
      });
      if (res.ok) {
        // Refresh local states
        const refreshRes = await fetch(`/api/admin/data?type=${type}`);
        const freshData = await refreshRes.json();
        if (type === 'projects') setProjects(freshData);
        if (type === 'blogs') setBlogs(freshData);
        if (type === 'certs') setCerts(freshData);
        if (type === 'testimonials') setTestimonials(freshData);
        if (type === 'stats') setStats(freshData);
        
        setIsModalOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: string, identifier: any) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, action: 'delete', data: identifier })
      });
      if (res.ok) {
        if (type === 'projects') setProjects(projects.filter(p => p.id !== identifier.id));
        if (type === 'blogs') setBlogs(blogs.filter(b => b.slug !== identifier.slug));
        if (type === 'certs') setCerts(certs.filter(c => c.id !== identifier.id));
        if (type === 'testimonials') setTestimonials(testimonials.filter(t => t.id !== identifier.id));
        if (type === 'inquiries') setInquiries(inquiries.filter(i => i.id !== identifier.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = (type: 'project' | 'blog' | 'cert' | 'testimonial') => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'project') setProjectForm({ id: Math.random().toString(36).substring(2, 9), title: '', description: '', challenge: '', approach: '', implementation: '', outcome: '', gallery: [], technologies: [], businessImpact: '', featured: false });
    if (type === 'blog') setBlogForm({ slug: '', title: '', summary: '', category: 'Operations', publishedAt: new Date().toISOString().split('T')[0], readTime: '5 min read', seoKeywords: [], content: '' });
    if (type === 'cert') setCertForm({ id: Math.random().toString(36).substring(2, 9), title: '', organization: '', issueDate: '', verifyUrl: '', tags: [] });
    if (type === 'testimonial') setTestimonialForm({ id: Math.random().toString(36).substring(2, 9), name: '', role: '', company: '', content: '', category: 'client' });
    setIsModalOpen(true);
  };

  const openEditModal = (type: 'project' | 'blog' | 'cert' | 'testimonial', item: any) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'project') setProjectForm(item);
    if (type === 'blog') setBlogForm(item);
    if (type === 'cert') setCertForm(item);
    if (type === 'testimonial') setTestimonialForm(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Console Bar */}
      <header className="bg-card border-b border-border py-4 px-6 flex justify-between items-center">
        <div>
          <span className="font-heading font-extrabold text-lg text-foreground">
            RAHUL V. JADHAV
          </span>
          <span className="text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded ml-2 font-bold uppercase tracking-wider">
            Brand Console
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-red-500 cursor-pointer focus:outline-none transition-colors border border-border bg-background px-3 py-1.5 rounded"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </header>

      {/* Main Panel grid */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-12 items-stretch">
        
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 border-r border-border bg-card/65 p-4 space-y-2">
          
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between p-3 text-xs font-bold uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer ${
              activeTab === 'inquiries' ? 'bg-primary text-white dark:bg-secondary dark:text-background' : 'text-muted hover:bg-accent/60 hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5" /> Inquiries Inbox
            </span>
            <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 px-2 py-0.5 rounded text-[10px]">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between p-3 text-xs font-bold uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer ${
              activeTab === 'projects' ? 'bg-primary text-white dark:bg-secondary dark:text-background' : 'text-muted hover:bg-accent/60 hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <FolderOpen className="h-4.5 w-4.5" /> Case Studies
            </span>
            <span className="text-muted/80">{projects.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center justify-between p-3 text-xs font-bold uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer ${
              activeTab === 'blogs' ? 'bg-primary text-white dark:bg-secondary dark:text-background' : 'text-muted hover:bg-accent/60 hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5" /> Blog CMS
            </span>
            <span className="text-muted/80">{blogs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('certs')}
            className={`w-full flex items-center justify-between p-3 text-xs font-bold uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer ${
              activeTab === 'certs' ? 'bg-primary text-white dark:bg-secondary dark:text-background' : 'text-muted hover:bg-accent/60 hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="h-4.5 w-4.5" /> Credentials
            </span>
            <span className="text-muted/80">{certs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center justify-between p-3 text-xs font-bold uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer ${
              activeTab === 'testimonials' ? 'bg-primary text-white dark:bg-secondary dark:text-background' : 'text-muted hover:bg-accent/60 hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5" /> Endorsements
            </span>
            <span className="text-muted/80">{testimonials.length}</span>
          </button>

        </aside>

        {/* Content Viewer Section */}
        <main className="md:col-span-9 p-6 sm:p-8 space-y-6 bg-background">
          
          {/* Tab Title & Actions */}
          <div className="flex justify-between items-center pb-4 border-b border-border/60">
            <div>
              <h2 className="text-xl font-heading font-extrabold text-foreground capitalize">
                {activeTab === 'certs' ? 'Certifications' : activeTab}
              </h2>
              <p className="text-xs text-muted">
                {activeTab === 'inquiries' && 'Review client contact submissions and booking inquiries'}
                {activeTab === 'projects' && 'Manage executive case studies and business outcome metrics'}
                {activeTab === 'blogs' && 'Create and publish tactical operations thought leadership'}
                {activeTab === 'certs' && 'Modify verified course credentials and verification linkages'}
                {activeTab === 'testimonials' && 'Manage peer endorsements and client recommendations'}
              </p>
            </div>

            {activeTab !== 'inquiries' && activeTab !== 'stats' && (
              <button
                onClick={() => openAddModal(activeTab.slice(0, -1) as any)}
                className="inline-flex items-center gap-1.5 bg-primary text-white dark:bg-secondary dark:text-background font-bold text-xs px-4 py-2 rounded hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
              >
                <Plus className="h-4 w-4" /> Add New
              </button>
            )}
          </div>

          {/* Tab Panels */}
          
          {/* INQUIRIES PANELS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div key={inq.id} className="bg-card border border-border rounded-lg p-5 relative group">
                    <button
                      onClick={() => handleDelete('inquiries', { id: inq.id })}
                      className="absolute right-4 top-4 p-2 text-muted hover:text-red-500 rounded border border-border bg-background cursor-pointer focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="space-y-3.5">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                        <strong className="text-foreground text-sm font-heading">{inq.name}</strong>
                        <span>•</span>
                        <span>{inq.email}</span>
                        {inq.phone && (
                          <>
                            <span>•</span>
                            <span>{inq.phone}</span>
                          </>
                        )}
                        {inq.company && (
                          <>
                            <span>•</span>
                            <span>{inq.company}</span>
                          </>
                        )}
                      </div>

                      <div className="h-[1px] bg-border/40" />

                      <div className="space-y-1.5">
                        <span className="block text-xs font-bold text-secondary">{inq.subject}</span>
                        <p className="text-xs text-muted leading-relaxed whitespace-pre-line">{inq.message}</p>
                      </div>

                      <span className="block text-[10px] text-muted text-right italic pt-2">
                        Received: {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 border border-dashed border-border text-muted">
                  Inquiries inbox is empty.
                </div>
              )}
            </div>
          )}

          {/* PROJECTS PANELS */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-card border border-border p-4 rounded flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-foreground">{proj.title}</h3>
                    <p className="text-xs text-muted truncate max-w-lg mt-0.5">{proj.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal('project', proj)}
                      className="p-1.5 border border-border rounded text-muted hover:text-primary dark:hover:text-secondary bg-background cursor-pointer focus:outline-none"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('projects', { id: proj.id })}
                      className="p-1.5 border border-border rounded text-muted hover:text-red-500 bg-background cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BLOGS PANELS */}
          {activeTab === 'blogs' && (
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((b) => (
                <div key={b.slug} className="bg-card border border-border p-4 rounded flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-foreground">{b.title}</h3>
                    <p className="text-xs text-muted truncate max-w-lg mt-0.5">Category: {b.category} • Slug: {b.slug}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal('blog', b)}
                      className="p-1.5 border border-border rounded text-muted hover:text-primary dark:hover:text-secondary bg-background cursor-pointer focus:outline-none"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('blogs', { slug: b.slug })}
                      className="p-1.5 border border-border rounded text-muted hover:text-red-500 bg-background cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS PANELS */}
          {activeTab === 'certs' && (
            <div className="grid grid-cols-1 gap-4">
              {certs.map((c) => (
                <div key={c.id} className="bg-card border border-border p-4 rounded flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-foreground">{c.title}</h3>
                    <p className="text-xs text-muted mt-0.5">{c.organization} • Issued {c.issueDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal('cert', c)}
                      className="p-1.5 border border-border rounded text-muted hover:text-primary dark:hover:text-secondary bg-background cursor-pointer focus:outline-none"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('certs', { id: c.id })}
                      className="p-1.5 border border-border rounded text-muted hover:text-red-500 bg-background cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TESTIMONIALS PANELS */}
          {activeTab === 'testimonials' && (
            <div className="grid grid-cols-1 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-card border border-border p-4 rounded flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-foreground">{t.name}</h3>
                    <p className="text-xs text-muted truncate max-w-lg mt-0.5">{t.role} at {t.company} ({t.category})</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal('testimonial', t)}
                      className="p-1.5 border border-border rounded text-muted hover:text-primary dark:hover:text-secondary bg-background cursor-pointer focus:outline-none"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('testimonials', { id: t.id })}
                      className="p-1.5 border border-border rounded text-muted hover:text-red-500 bg-background cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Form Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl">
            
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-2 text-muted hover:text-foreground rounded cursor-pointer focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <div>
              <h3 className="text-lg font-heading font-extrabold text-foreground capitalize">
                {editingItem ? 'Edit' : 'Add New'} {modalType}
              </h3>
              <p className="text-xs text-muted">Complete the fields below to update the datastore.</p>
            </div>

            {/* Form Fields Conditionally */}
            {modalType === 'project' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave('projects', projectForm);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">ID (Short Slug)</label>
                    <input
                      type="text"
                      required
                      value={projectForm.id || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                      disabled={!!editingItem}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Short Description</label>
                  <input
                    type="text"
                    required
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Business Impact Rating</label>
                    <input
                      type="text"
                      required
                      value={projectForm.businessImpact || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, businessImpact: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                      placeholder="e.g. 70% Overhead Cut"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      required
                      value={projectForm.technologies?.join(', ') || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value.split(',').map(s => s.trim()) })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                      placeholder="e.g. React, Python"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Challenge Details</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.challenge || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Strategic Approach</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.approach || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, approach: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Technical Implementation</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.implementation || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, implementation: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Project Outcome</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.outcome || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, outcome: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured || false}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="h-4 w-4 border-border rounded text-primary"
                  />
                  <label htmlFor="featured" className="text-xs font-bold uppercase text-muted">Feature on Homepage</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 rounded text-sm hover:opacity-90 cursor-pointer"
                >
                  {loading ? 'Saving...' : 'Save Case Study'}
                </button>
              </form>
            )}

            {modalType === 'blog' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave('blogs', blogForm);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Slug (URL friendly)</label>
                    <input
                      type="text"
                      required
                      value={blogForm.slug || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                      disabled={!!editingItem}
                      placeholder="e.g. operations-transformation"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={blogForm.category || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Read Duration</label>
                    <input
                      type="text"
                      required
                      value={blogForm.readTime || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                      placeholder="e.g. 5 min read"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Publish Date</label>
                    <input
                      type="date"
                      required
                      value={blogForm.publishedAt || ''}
                      onChange={(e) => setBlogForm({ ...blogForm, publishedAt: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">SEO Keywords (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={blogForm.seoKeywords?.join(', ') || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, seoKeywords: e.target.value.split(',').map(s => s.trim()) })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    placeholder="e.g. Leadership, Operations"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Brief Summary</label>
                  <input
                    type="text"
                    required
                    value={blogForm.summary || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Article Body (Supports raw text, headings, lists)</label>
                  <textarea
                    required
                    rows={8}
                    value={blogForm.content || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none resize-none font-mono"
                    placeholder="Use ### for subheadings and split paragraphs with blank lines."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 rounded text-sm hover:opacity-90 cursor-pointer"
                >
                  {loading ? 'Saving...' : 'Publish Article'}
                </button>
              </form>
            )}

            {modalType === 'cert' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave('certs', certForm);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Credential Name</label>
                  <input
                    type="text"
                    required
                    value={certForm.title || ''}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      required
                      value={certForm.organization || ''}
                      onChange={(e) => setCertForm({ ...certForm, organization: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Issue Date</label>
                    <input
                      type="text"
                      required
                      value={certForm.issueDate || ''}
                      onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                      placeholder="e.g. 2025-06"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Verification URL</label>
                  <input
                    type="url"
                    required
                    value={certForm.verifyUrl || ''}
                    onChange={(e) => setCertForm({ ...certForm, verifyUrl: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Tags / Categories (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={certForm.tags?.join(', ') || ''}
                    onChange={(e) => setCertForm({ ...certForm, tags: e.target.value.split(',').map(s => s.trim()) })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    placeholder="e.g. Operations, Agile"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 rounded text-sm hover:opacity-90 cursor-pointer"
                >
                  {loading ? 'Saving...' : 'Save Credential'}
                </button>
              </form>
            )}

            {modalType === 'testimonial' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave('testimonials', testimonialForm);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Author Name</label>
                    <input
                      type="text"
                      required
                      value={testimonialForm.name || ''}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Author Role</label>
                    <input
                      type="text"
                      required
                      value={testimonialForm.role || ''}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={testimonialForm.company || ''}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-muted mb-1">Category</label>
                    <select
                      value={testimonialForm.category || 'client'}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, category: e.target.value as any })}
                      className="bg-background border border-border text-foreground text-sm rounded px-3 py-2.5 w-full focus:outline-none"
                    >
                      <option value="leadership">Leadership</option>
                      <option value="client">Client</option>
                      <option value="team">Team member</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted mb-1">Endorsement Content</label>
                  <textarea
                    required
                    rows={4}
                    value={testimonialForm.content || ''}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                    className="bg-background border border-border text-foreground text-sm rounded px-3 py-2 w-full focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 rounded text-sm hover:opacity-90 cursor-pointer"
                >
                  {loading ? 'Saving...' : 'Save Endorsement'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
