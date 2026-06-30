'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowLeft, Send, CheckCircle2, AlertCircle, Video } from 'lucide-react';

const MEETING_TYPES = [
  {
    id: 'ops-audit',
    title: 'Operations Audit Sync',
    duration: '30 Mins',
    desc: 'Reviewing team SLA logs, checking bottlenecks, and mapping resource management improvements.'
  },
  {
    id: 'ai-transformation',
    title: 'AI Integration Consult',
    duration: '45 Mins',
    desc: 'Auditing workflow manual points, checking Star Prime AI OS feasibility, and proposing automation maps.'
  },
  {
    id: 'media-collaboration',
    title: 'Media & Star Prime Feature',
    duration: '15 Mins',
    desc: 'Aligning on upcoming magazine issues, CXO award categories, and executive profile schedules.'
  }
];

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    selectedMeeting: 'ops-audit',
    proposedDate: '',
    proposedTime: '',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [alternativeSlots, setAlternativeSlots] = useState<string[]>([]);
  const [icsData, setIcsData] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [lastBooking, setLastBooking] = useState<{
    name: string;
    email: string;
    date: string;
    time: string;
    meetingLink: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectMeeting = (id: string) => {
    setFormData((prev) => ({ ...prev, selectedMeeting: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');
    setAlternativeSlots([]);

    const meetingTitle = MEETING_TYPES.find(m => m.id === formData.selectedMeeting)?.title || 'Meeting';

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: '',
          company: formData.company,
          subject: `Meeting Request: ${meetingTitle}`,
          message: `Proposed Date: ${formData.proposedDate}\nProposed Time: ${formData.proposedTime}\nNotes: ${formData.notes}`,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setStatus('error');
        setErrorMsg(data.message || 'This time slot is already booked.');
        if (data.alternatives) {
          setAlternativeSlots(data.alternatives);
        }
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to schedule meeting request.');
      }

      setStatus('success');
      setIcsData(data.icsContent || '');
      setMeetingUrl(data.meetingLink || '');
      setIsEmailSent(data.emailSent || false);
      
      setLastBooking({
        name: formData.name,
        email: formData.email,
        date: formData.proposedDate,
        time: formData.proposedTime,
        meetingLink: data.meetingLink || '',
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        selectedMeeting: 'ops-audit',
        proposedDate: '',
        proposedTime: '',
        notes: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleDownloadICS = () => {
    if (!icsData || !lastBooking) return;
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consultation-${lastBooking.date}-${lastBooking.time}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 bg-luxury-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary dark:hover:text-secondary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Headquarters
          </Link>

          <div className="max-w-3xl mb-10 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
              Schedule Consultation
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Book a strategic session with Rahul to review operational frameworks, evaluate workflow automation pipelines, or outline a media feature.
            </p>
            <div className="h-1 w-12 bg-secondary" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Choose Meeting Type */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                01. Select Session Type
              </span>
              
              {MEETING_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelectMeeting(type.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    formData.selectedMeeting === type.id
                      ? 'border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/5'
                      : 'border-border/60 bg-card hover:bg-accent/60'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="font-heading font-bold text-sm text-foreground">
                      {type.title}
                    </span>
                    <span className="text-[10px] font-bold bg-primary/10 text-primary dark:bg-secondary/15 dark:text-secondary px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" /> {type.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mt-2">
                    {type.desc}
                  </p>
                </button>
              ))}

              <div className="border border-border/80 bg-card/60 p-4 rounded-lg flex items-center gap-3 text-xs text-muted">
                <Video className="h-5 w-5 text-secondary shrink-0" />
                <span>All consultations are conducted via Microsoft Teams or Google Meet link provided in invite.</span>
              </div>
            </div>

            {/* Right Column: Request Details Form */}
            <div className="lg:col-span-7 bg-background border border-border/80 p-6 sm:p-8 rounded-lg relative overflow-hidden blue-glow">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-4">
                02. Provide Request Parameters
              </span>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-muted uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-muted uppercase mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-muted uppercase mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="proposedDate" className="block text-xs font-bold text-muted uppercase mb-1.5">
                      Proposed Date *
                    </label>
                    <input
                      type="date"
                      id="proposedDate"
                      name="proposedDate"
                      required
                      value={formData.proposedDate}
                      onChange={handleChange}
                      className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label htmlFor="proposedTime" className="block text-xs font-bold text-muted uppercase mb-1.5">
                      Preferred Time Block *
                    </label>
                    <input
                      type="time"
                      id="proposedTime"
                      name="proposedTime"
                      required
                      value={formData.proposedTime}
                      onChange={handleChange}
                      className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-bold text-muted uppercase mb-1.5">
                    Context / Agenda Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="bg-card border border-border text-foreground text-sm rounded px-3.5 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary resize-none"
                    placeholder="Briefly describe what you would like to cover..."
                  />
                </div>

                {status === 'success' && lastBooking && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-5 rounded-lg space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-sm">Meeting Request Sent & Confirmed</span>
                        <p className="text-xs">Your consultation slot request has been logged successfully.</p>
                      </div>
                    </div>
                    
                    <div className="text-xs space-y-2 border-t border-emerald-500/20 pt-3">
                      <p><strong>Scheduled Time:</strong> {lastBooking.date} at {lastBooking.time}</p>
                      {meetingUrl && (
                        <p>
                          <strong>Video Conference Room:</strong>{' '}
                          <a 
                            href={meetingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline font-bold text-primary dark:text-secondary hover:opacity-80 transition-opacity"
                          >
                            Join Video Call
                          </a>
                        </p>
                      )}
                      {isEmailSent ? (
                        <p className="text-emerald-700 dark:text-emerald-300">
                          ✉️ A calendar invitation has been sent from Rahul's office to your email (<strong>{lastBooking.email}</strong>).
                        </p>
                      ) : (
                        <p className="text-emerald-700/80 dark:text-emerald-400/80">
                          Click below to download the calendar event and import it into your calendar directly (Google Calendar, Outlook, etc.):
                        </p>
                      )}
                    </div>

                    {icsData && (
                      <button
                        type="button"
                        onClick={handleDownloadICS}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded text-xs transition-colors cursor-pointer"
                      >
                        Download Calendar Invite (.ics)
                      </button>
                    )}
                  </div>
                )}

                {status === 'error' && (
                  <div className="space-y-3">
                    <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-bold text-sm">Request Failed</span>
                        <p className="text-xs">{errorMsg}</p>
                      </div>
                    </div>

                    {alternativeSlots.length > 0 && (
                      <div className="border border-border/80 bg-card p-4 rounded-lg space-y-2">
                        <span className="block text-xs font-bold text-muted uppercase">Suggested Alternative Times:</span>
                        <div className="flex flex-wrap gap-2">
                          {alternativeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, proposedTime: slot }));
                                setAlternativeSlots([]);
                                setErrorMsg('');
                                setStatus('idle');
                              }}
                              className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-secondary/10 dark:hover:bg-secondary/20 dark:text-secondary border border-primary/20 dark:border-secondary/20 text-xs font-bold py-1.5 px-3 rounded cursor-pointer"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 px-6 rounded text-sm hover:bg-primary-hover dark:hover:bg-secondary-hover transition-colors cursor-pointer disabled:opacity-75 focus:outline-none"
                >
                  {status === 'loading' ? (
                    'Transmitting Block Request...'
                  ) : (
                    <>
                      Book Session <Calendar className="h-4 w-4" />
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
