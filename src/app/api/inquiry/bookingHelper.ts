import { Inquiry } from '@/db/store';

// Helper to check if a booking date/time/duration overlaps with any existing booking
export interface TimeSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // in minutes
}

// Map meeting titles to their durations in minutes
export function getDurationFromSubject(subject: string): number {
  if (subject.includes('Operations Audit Sync')) return 30;
  if (subject.includes('AI Integration Consult')) return 45;
  if (subject.includes('Media & Star Prime Feature')) return 15;
  return 30; // fallback duration
}

// Parse proposed date, time, and duration from an inquiry's message and subject
export function parseInquirySlot(inquiry: Inquiry): TimeSlot | null {
  const dateMatch = inquiry.message.match(/Proposed Date:\s*([^\n]+)/);
  const timeMatch = inquiry.message.match(/Proposed Time:\s*([^\n]+)/);
  
  if (!dateMatch || !timeMatch) return null;
  
  return {
    date: dateMatch[1].trim(),
    time: timeMatch[1].trim(),
    duration: getDurationFromSubject(inquiry.subject),
  };
}

// Helper to convert HH:MM time string to minutes from midnight
export function timeToMinutes(timeStr: string): number {
  const parts = timeStr.split(':');
  if (parts.length < 2) return 0;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return (isNaN(hours) ? 0 : hours) * 60 + (isNaN(minutes) ? 0 : minutes);
}

// Determine if two time slots overlap on the same date
export function isOverlapping(slotA: TimeSlot, slotB: TimeSlot): boolean {
  if (slotA.date !== slotB.date) return false;
  
  const startA = timeToMinutes(slotA.time);
  const endA = startA + slotA.duration;
  
  const startB = timeToMinutes(slotB.time);
  const endB = startB + slotB.duration;
  
  return Math.max(startA, startB) < Math.min(endA, endB);
}

// Check if a proposed time slot conflicts with any existing inquiries
export function hasConflict(
  proposed: TimeSlot,
  existingInquiries: Inquiry[]
): boolean {
  for (const inquiry of existingInquiries) {
    const slot = parseInquirySlot(inquiry);
    if (slot && isOverlapping(proposed, slot)) {
      return true;
    }
  }
  return false;
}

// Generate 3 non-conflicting alternative slots (between 09:00 and 18:00)
export function getAlternativeSlots(
  proposed: TimeSlot,
  existingInquiries: Inquiry[]
): string[] {
  const alternatives: string[] = [];
  const startMinutes = timeToMinutes(proposed.time);
  
  // Try forward slots: +30m, +60m, +90m, etc.
  let searchMinutes = startMinutes;
  while (alternatives.length < 3 && searchMinutes < 18 * 60) {
    searchMinutes += 30; // look in 30 minute intervals
    const hr = Math.floor(searchMinutes / 60);
    const mn = searchMinutes % 60;
    const timeStr = `${String(hr).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;
    
    const candidate: TimeSlot = {
      date: proposed.date,
      time: timeStr,
      duration: proposed.duration
    };
    
    if (!hasConflict(candidate, existingInquiries)) {
      alternatives.push(timeStr);
    }
  }
  
  // If we couldn't find 3 future slots, check earlier in the day: -30m, -60m, etc.
  searchMinutes = startMinutes;
  while (alternatives.length < 3 && searchMinutes > 9 * 60) {
    searchMinutes -= 30;
    const hr = Math.floor(searchMinutes / 60);
    const mn = searchMinutes % 60;
    const timeStr = `${String(hr).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;
    
    const candidate: TimeSlot = {
      date: proposed.date,
      time: timeStr,
      duration: proposed.duration
    };
    
    if (!hasConflict(candidate, existingInquiries)) {
      alternatives.push(timeStr);
    }
  }
  
  // Sort them chronologically
  return alternatives.slice(0, 3).sort();
}

// Generate standard .ics (iCalendar) text string for calendar imports
export function generateICS(params: {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // in minutes
  name: string;
  email: string;
  notes: string;
  meetingLink: string;
}): string {
  const { id, title, date, time, duration, name, email, notes, meetingLink } = params;
  
  const dateClean = date.replace(/-/g, '');
  const timeClean = time.replace(/:/g, '') + '00';
  
  // Calculate DTEND
  const startMinutes = timeToMinutes(time);
  const endMinutes = startMinutes + duration;
  const endHour = Math.floor(endMinutes / 60);
  const endMin = endMinutes % 60;
  const endTimeStr = `${String(endHour).padStart(2, '0')}${String(endMin).padStart(2, '0')}00`;
  
  const dtStart = `${dateClean}T${timeClean}`;
  const dtEnd = `${dateClean}T${endTimeStr}`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const organizerEmail = process.env.PERSONAL_EMAIL || process.env.SMTP_USER || 'rahuljadhav.vj@gmail.com';
  
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rahul V. Jadhav Brand Portfolio//Scheduling//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${id}@rahulvjadhav.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title} - Rahul V. Jadhav`,
    `DESCRIPTION:Meeting request from ${name} (${email}).\\nNotes: ${notes.replace(/\n/g, '\\n')}`,
    `LOCATION:${meetingLink}`,
    `ORGANIZER;CN="Rahul V. Jadhav":mailto:${organizerEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${name}":mailto:${email}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  
  return lines.join('\r\n');
}
