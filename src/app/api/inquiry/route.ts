import { NextResponse } from 'next/server';
import { db } from '@/db/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required parameters (name, email, subject, message).' },
        { status: 400 }
      );
    }

    // Add to DB store
    const inquiry = db.addInquiry({
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message,
    });

    return NextResponse.json(
      { message: 'Inquiry received successfully.', inquiry },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error submitting inquiry:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred while processing the submission.' },
      { status: 500 }
    );
  }
}
