import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db/store';
import AdminDashboard from './AdminDashboard';

export const metadata = {
  title: 'Console Dashboard | Rahul V. Jadhav',
  description: 'Manage executive portfolio case studies, blogs, certifications, and review customer submissions.',
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (token !== 'authorized') {
    redirect('/admin/login');
  }

  // Fetch initial datasets server-side
  const projects = db.getProjects();
  const blogs = db.getBlogs();
  const certs = db.getCerts();
  const testimonials = db.getTestimonials();
  const stats = db.getStats();
  const inquiries = db.getInquiries();

  return (
    <AdminDashboard
      initialProjects={projects}
      initialBlogs={blogs}
      initialCerts={certs}
      initialTestimonials={testimonials}
      initialStats={stats}
      initialInquiries={inquiries}
    />
  );
}
