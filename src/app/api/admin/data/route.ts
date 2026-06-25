import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db/store';

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === 'authorized';
}

export async function GET(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'projects':
        return NextResponse.json(db.getProjects());
      case 'blogs':
        return NextResponse.json(db.getBlogs());
      case 'certs':
        return NextResponse.json(db.getCerts());
      case 'testimonials':
        return NextResponse.json(db.getTestimonials());
      case 'stats':
        return NextResponse.json(db.getStats());
      case 'inquiries':
        return NextResponse.json(db.getInquiries());
      default:
        return NextResponse.json({ message: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin API GET Error:', error);
    return NextResponse.json({ message: 'Error retrieving data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, action, data } = body;

    if (!type || !action || !data) {
      return NextResponse.json({ message: 'Missing parameters (type, action, data)' }, { status: 400 });
    }

    if (action === 'save') {
      switch (type) {
        case 'projects':
          db.saveProject(data);
          break;
        case 'blogs':
          db.saveBlog(data);
          break;
        case 'certs':
          db.saveCert(data);
          break;
        case 'testimonials':
          db.saveTestimonial(data);
          break;
        case 'stats':
          db.saveStats(data);
          break;
        default:
          return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
      }
      return NextResponse.json({ message: `${type} saved successfully` });
    }

    if (action === 'delete') {
      const { id, slug } = data;
      switch (type) {
        case 'projects':
          if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
          db.deleteProject(id);
          break;
        case 'blogs':
          if (!slug) return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
          db.deleteBlog(slug);
          break;
        case 'certs':
          if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
          db.deleteCert(id);
          break;
        case 'testimonials':
          if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
          db.deleteTestimonial(id);
          break;
        case 'inquiries':
          if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
          db.deleteInquiry(id);
          break;
        default:
          return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
      }
      return NextResponse.json({ message: `${type} deleted successfully` });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin API POST Error:', error);
    return NextResponse.json({ message: 'Error mutating data' }, { status: 500 });
  }
}
