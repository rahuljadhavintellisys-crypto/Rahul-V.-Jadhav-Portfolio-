import { NextResponse } from 'next/server';
import { db } from '@/db/store';
import nodemailer from 'nodemailer';
import { 
  hasConflict, 
  parseInquirySlot, 
  getAlternativeSlots, 
  getDurationFromSubject, 
  generateICS 
} from './bookingHelper';

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

    const isMeetingRequest = subject.startsWith('Meeting Request:') && message.includes('Proposed Date:');
    let meetingLink = '';
    let icsContent = '';

    if (isMeetingRequest) {
      const dateMatch = message.match(/Proposed Date:\s*([^\n]+)/);
      const timeMatch = message.match(/Proposed Time:\s*([^\n]+)/);
      
      if (dateMatch && timeMatch) {
        const proposedDate = dateMatch[1].trim();
        const proposedTime = timeMatch[1].trim();
        const duration = getDurationFromSubject(subject);
        
        const proposedSlot = {
          date: proposedDate,
          time: proposedTime,
          duration,
        };
        
        const existingInquiries = db.getInquiries();
        
        if (hasConflict(proposedSlot, existingInquiries)) {
          const alternatives = getAlternativeSlots(proposedSlot, existingInquiries);
          return NextResponse.json(
            { 
              message: 'This time block is already booked. Please choose an alternative time.',
              conflict: true,
              alternatives 
            },
            { status: 409 }
          );
        }

        // Generate meeting invite video link
        const randomId = Math.random().toString(36).substring(2, 9);
        const useZoom = message.toLowerCase().includes('zoom');
        
        if (useZoom && process.env.MEETING_LINK_ZOOM) {
          meetingLink = process.env.MEETING_LINK_ZOOM;
        } else if (process.env.MEETING_LINK_TEAMS) {
          meetingLink = process.env.MEETING_LINK_TEAMS;
        } else {
          // Dynamic zero-config video meeting room (default fallback)
          meetingLink = `https://meet.jit.si/rahulvjadhav-consultation-${randomId}`;
        }

        // Generate calendar event (.ics)
        const notesMatch = message.match(/Notes:\s*([\s\S]*)/);
        const pNotes = notesMatch ? notesMatch[1].trim() : '';
        const inviteId = Math.random().toString(36).substring(2, 9);

        icsContent = generateICS({
          id: inviteId,
          title: subject.replace('Meeting Request: ', ''),
          date: proposedDate,
          time: proposedTime,
          duration,
          name,
          email,
          notes: pNotes,
          meetingLink,
        });
      }
    }

    // Add to DB store
    const inquiry = db.addInquiry({
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message: isMeetingRequest && meetingLink 
        ? `${message}\nMeeting Video Link: ${meetingLink}` 
        : message,
    });

    // SMTP Email Delivery
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const personalEmail = process.env.PERSONAL_EMAIL || smtpUser || 'rahuljadhav.vj@gmail.com';

    let emailSent = false;

    if (isMeetingRequest && icsContent && smtpHost && smtpUser && smtpPass) {
      try {
        const dateMatch = message.match(/Proposed Date:\s*([^\n]+)/);
        const timeMatch = message.match(/Proposed Time:\s*([^\n]+)/);
        const notesMatch = message.match(/Notes:\s*([\s\S]*)/);
        const pDate = dateMatch ? dateMatch[1].trim() : '';
        const pTime = timeMatch ? timeMatch[1].trim() : '';
        const pNotes = notesMatch ? notesMatch[1].trim() : '';
        const meetingTitle = subject.replace('Meeting Request: ', '');

        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort) || 465,
          secure: smtpPort === '465' || Number(smtpPort) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 10000
        });

        // 1. Guest Confirmation Email
        const guestMailOptions = {
          from: `"Rahul V. Jadhav Office" <${personalEmail}>`,
          to: email,
          replyTo: personalEmail,
          subject: `Confirmed: ${meetingTitle} with Rahul V. Jadhav`,
          text: `Hi ${name},\n\nYour consultation session has been successfully booked.\n\nSession Parameters:\n- Topic: ${meetingTitle}\n- Date: ${pDate}\n- Time: ${pTime}\n- Join Video Meeting: ${meetingLink}\n- Agenda Context: ${pNotes}\n\nA calendar invite (.ics) file is attached. Opening this file will add the event directly to your personal calendar (Google Calendar, Outlook, Apple Calendar).\n\nThank you,\nRahul V. Jadhav Office`,
          icalEvent: {
            filename: 'invite.ics',
            method: 'REQUEST',
            content: icsContent,
          },
        };
        await transporter.sendMail(guestMailOptions);

        // 2. Host Alert Email (only if host email is different from guest email)
        if (personalEmail.toLowerCase() !== email.toLowerCase()) {
          const hostMailOptions = {
            from: `"Portfolio Notification" <${smtpUser}>`,
            to: personalEmail,
            subject: `[New Booking Alert] ${meetingTitle} - ${name}`,
            text: `Hi Rahul,\n\nA new consultation session has been scheduled on your portfolio website.\n\nGuest Information:\n- Name: ${name}\n- Email: ${email}\n- Company: ${company || 'N/A'}\n- Notes: ${pNotes || 'None'}\n\nSession Information:\n- Topic: ${meetingTitle}\n- Date: ${pDate}\n- Time: ${pTime}\n- Video Call: ${meetingLink}\n\nThe calendar invite (.ics) file is attached so it syncs directly to your own calendar.`,
            icalEvent: {
              filename: 'invite.ics',
              method: 'REQUEST',
              content: icsContent,
            },
          };
          await transporter.sendMail(hostMailOptions);
        }

        // Close Nodemailer transporter connection pool immediately to prevent serverless function hangs
        transporter.close();
        emailSent = true;
      } catch (mailError) {
        console.error('Nodemailer failed to transmit schedule email:', mailError);
      }
    }

    return NextResponse.json(
      { 
        message: 'Inquiry received successfully.', 
        inquiry,
        icsContent,
        emailSent,
        meetingLink,
      },
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

