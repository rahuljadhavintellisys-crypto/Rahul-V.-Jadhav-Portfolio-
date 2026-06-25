'use client';

import Link from 'next/link';
import { Phone, Mail, Linkedin, Globe, Download, MessageSquare, MapPin, UserCheck, Shield } from 'lucide-react';

export default function VCardPage() {
  const handleDownload = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Jadhav;Rahul;V.;;
FN:Rahul V. Jadhav
ORG:Intellisys IT Solutions Pvt. Ltd.
TITLE:Head of Team Operations
TEL;TYPE=CELL,VOICE:+919021872241
EMAIL;TYPE=PREF,INTERNET:rahuljadhav.vj@gmail.com
EMAIL;TYPE=WORK,INTERNET:rahul.jadhav@intellisysitsolutions.com
URL:https://www.linkedin.com/in/rahul-jadhav-38ba29216/
ADR;TYPE=WORK:;;Wakad;Pune;Maharashtra;411057;India
REV:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rahul_V_Jadhav.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-luxury-grid flex flex-col items-center justify-center p-4 sm:p-6 select-none">
      
      {/* Container Card */}
      <div className="w-full max-w-sm bg-card border border-border/80 rounded-2xl p-6 sm:p-8 space-y-6 text-center shadow-xl relative overflow-hidden blue-glow">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

        {/* Initials Avatar */}
        <div className="h-20 w-20 rounded-full bg-primary text-white dark:bg-secondary dark:text-background flex items-center justify-center font-heading font-extrabold text-2xl mx-auto shadow-md border-2 border-border/20 relative group">
          RVJ
          <span className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-card" />
        </div>

        {/* Personal Details */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
            Rahul V. Jadhav
          </h1>
          <p className="text-xs font-semibold text-primary dark:text-secondary uppercase tracking-wider">
            Head of Team Operations
          </p>
          <span className="text-[10px] text-muted font-bold block">
            Intellisys IT Solutions & The Star Prime Magazine
          </span>
          <span className="text-[9px] text-muted font-semibold flex items-center justify-center gap-1 mt-1.5">
            <MapPin className="h-3 w-3 text-secondary" /> Wakad, Pune, MH, India
          </span>
        </div>

        {/* Download VCard trigger */}
        <button
          onClick={handleDownload}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white dark:bg-secondary dark:text-background font-bold py-3.5 px-4 rounded text-sm hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
        >
          <Download className="h-4.5 w-4.5" /> Save Contact Details
        </button>

        <div className="h-[1px] bg-border/60" />

        {/* Social / Contact Links List */}
        <div className="space-y-3">
          
          <a
            href="tel:+919021872241"
            className="w-full border border-border bg-background text-foreground hover:bg-accent font-semibold p-3.5 rounded text-xs sm:text-sm flex items-center justify-between transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Phone className="h-4.5 w-4.5 text-secondary shrink-0" /> Mobile Direct
            </span>
            <span className="text-[10px] text-muted">+91 90218...</span>
          </a>

          <a
            href="mailto:rahuljadhav.vj@gmail.com"
            className="w-full border border-border bg-background text-foreground hover:bg-accent font-semibold p-3.5 rounded text-xs sm:text-sm flex items-center justify-between transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Mail className="h-4.5 w-4.5 text-secondary shrink-0" /> Personal Mail
            </span>
            <span className="text-[10px] text-muted">rahuljadhav...</span>
          </a>

          <a
            href="https://wa.me/919021872241?text=Hi%20Rahul,%20saved%20your%20digital%20business%20card..."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-border bg-background text-foreground hover:bg-accent font-semibold p-3.5 rounded text-xs sm:text-sm flex items-center justify-between transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-secondary shrink-0" /> WhatsApp Direct
            </span>
            <span className="text-[10px] text-muted">Active</span>
          </a>

          <a
            href="https://www.linkedin.com/in/rahul-jadhav-38ba29216/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-border bg-background text-foreground hover:bg-accent font-semibold p-3.5 rounded text-xs sm:text-sm flex items-center justify-between transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Linkedin className="h-4.5 w-4.5 text-secondary shrink-0" /> LinkedIn Profile
            </span>
            <span className="text-[10px] text-muted">Connect</span>
          </a>

          <Link
            href="/"
            className="w-full border border-border bg-background text-foreground hover:bg-accent font-semibold p-3.5 rounded text-xs sm:text-sm flex items-center justify-between transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Globe className="h-4.5 w-4.5 text-secondary shrink-0" /> Core Portfolio Hub
            </span>
            <span className="text-[10px] text-muted">Visit</span>
          </Link>

        </div>

        {/* Branding Footer */}
        <div className="text-[10px] text-muted pt-2 flex items-center justify-center gap-1 uppercase tracking-wider font-bold">
          <Shield className="h-3 w-3 text-secondary" /> Rahul V. Jadhav • Official
        </div>

      </div>

    </div>
  );
}
