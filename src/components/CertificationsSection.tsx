'use client';

import { useState, useMemo } from 'react';
import { Search, Award, ExternalLink, Calendar, CheckCircle, X } from 'lucide-react';
import { Certification } from '@/db/store';

interface CertificationsSectionProps {
  initialCerts: Certification[];
}

export default function CertificationsSection({ initialCerts }: CertificationsSectionProps) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialCerts.forEach(c => c.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [initialCerts]);

  // Filtered Certifications
  const filteredCerts = useMemo(() => {
    return initialCerts.filter(cert => {
      const matchesSearch = 
        cert.title.toLowerCase().includes(search.toLowerCase()) ||
        cert.organization.toLowerCase().includes(search.toLowerCase());
      
      const matchesTag = selectedTag === 'All' || cert.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialCerts, search, selectedTag]);

  return (
    <section id="certifications" className="py-8 sm:py-10 relative scroll-mt-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-secondary mb-3">
            VERIFIED CREDENTIALS
          </h2>
          <p className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
            Professional Certifications & Badges
          </p>
          <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-border/40">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search credentials, providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card border border-border text-foreground text-sm rounded pl-10 pr-4 py-2.5 w-full focus:outline-none focus:border-primary dark:focus:border-secondary"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 items-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all duration-200 cursor-pointer focus:outline-none ${
                  selectedTag === tag
                    ? 'bg-primary text-white dark:bg-secondary dark:text-background'
                    : 'bg-card border border-border/80 text-foreground hover:bg-accent'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Certificates Grid */}
        {filteredCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-card border border-border/80 rounded-lg p-6 flex flex-col justify-between hover:border-primary dark:hover:border-secondary transition-all duration-300 relative group overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/10 transition-colors" />
                
                <div className="space-y-4">
                  {/* Badge & Org */}
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] text-muted font-bold flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-secondary" /> {cert.issueDate}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5">
                    <h3 className="font-heading font-extrabold text-sm text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted font-semibold">
                      {cert.organization}
                    </p>
                  </div>
                </div>

                {/* Card footer / Actions */}
                <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cert.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] bg-background border border-border px-1.5 py-0.5 rounded font-medium text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent modal trigger
                      window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-xs font-bold text-primary dark:text-secondary hover:underline inline-flex items-center gap-1 cursor-pointer focus:outline-none bg-transparent border-none"
                  >
                    Verify <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card/20">
            <CheckCircle className="h-10 w-10 text-muted mx-auto mb-3" />
            <p className="text-sm font-bold text-foreground">No certifications found matching search.</p>
            <p className="text-xs text-muted mt-1">Try refining search parameters or filters.</p>
          </div>
        )}

      </div>

      {/* Dynamic Certificate Vector Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 p-2 text-muted hover:text-foreground rounded cursor-pointer focus:outline-none"
              aria-label="Close viewer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center space-y-1">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground">Verified Certificate Credential</h3>
              <p className="text-xs text-muted">Credential ID: {selectedCert.id} • Issued by {selectedCert.organization}</p>
            </div>

            {/* Dynamic Certificate Mockup / Real Scanned Image / PDF Embed */}
            {selectedCert.verifyUrl && selectedCert.verifyUrl.toLowerCase().endsWith('.pdf') ? (
              <div className="w-full aspect-[1.414/1] max-h-[55vh] relative bg-stone-100 border border-border rounded overflow-hidden shadow-inner">
                <iframe 
                  src={`${selectedCert.verifyUrl}#toolbar=0&navpanes=0`} 
                  className="w-full h-full border-none"
                  title={selectedCert.title}
                />
              </div>
            ) : selectedCert.imageUrl ? (
              <div className="w-full aspect-[1.414/1] relative bg-stone-50 border border-border rounded overflow-hidden shadow-inner flex items-center justify-center">
                <img 
                  src={selectedCert.imageUrl} 
                  alt={selectedCert.title} 
                  className="w-full h-full object-contain max-h-[60vh] select-none"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full aspect-[1.414/1] bg-white text-stone-900 border-8 border-double border-amber-600/60 p-5 sm:p-8 flex flex-col justify-between relative shadow-lg overflow-hidden">
                {/* Elegant Gold Accents */}
                <div className="absolute top-2 left-2 w-10 h-10 border-t border-l border-amber-600" />
                <div className="absolute top-2 right-2 w-10 h-10 border-t border-r border-amber-600" />
                <div className="absolute bottom-2 left-2 w-10 h-10 border-b border-l border-amber-600" />
                <div className="absolute bottom-2 right-2 w-10 h-10 border-b border-r border-amber-600" />

                {/* Certificate Inner Frame */}
                <div className="text-center space-y-3.5 my-auto">
                  <span className="text-[9px] tracking-[0.25em] font-bold text-amber-700 uppercase block">CERTIFICATE OF ACHIEVEMENT</span>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] italic text-stone-500 block">This credential is proudly presented to</span>
                    <span className="font-heading font-extrabold text-xl sm:text-2xl text-stone-800 tracking-tight block border-b border-stone-200 pb-2 max-w-xs mx-auto">
                      Rahul V. Jadhav
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] italic text-stone-500 block">for successfully demonstrating expertise in</span>
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-[#0F4C81] uppercase block leading-snug">
                      {selectedCert.title}
                    </span>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div className="flex justify-between items-end border-t border-stone-200 pt-3 text-[8px] text-stone-500">
                  <div className="text-left space-y-1">
                    <span className="block font-semibold text-stone-700">PROJECT SPONSOR</span>
                    <div className="h-0.5 w-16 bg-stone-300" />
                    <span className="block text-[7px] uppercase font-bold">{selectedCert.organization.split('/')[0].trim()}</span>
                  </div>
                  
                  {/* Gold Seal Graphic */}
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-4 border-double border-amber-500 bg-amber-100 flex items-center justify-center relative shrink-0">
                    <Award className="h-4 w-4 text-amber-600" />
                  </div>

                  <div className="text-right space-y-1">
                    <span className="block font-semibold text-stone-700">DATE OF ISSUANCE</span>
                    <div className="h-0.5 w-16 bg-stone-300" />
                    <span className="block text-[7px]">{selectedCert.issueDate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap justify-end gap-3 pt-2 border-t border-border/40">
              <button
                onClick={() => setSelectedCert(null)}
                className="border border-border bg-background text-foreground font-bold text-xs px-5 py-2.5 rounded hover:bg-accent transition-colors cursor-pointer"
              >
                Close Preview
              </button>
              
              {selectedCert.verifyUrl.startsWith('/docs/') && (
                <a
                  href={selectedCert.verifyUrl}
                  download
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded transition-colors cursor-pointer"
                >
                  Download PDF
                </a>
              )}

              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary text-white dark:bg-secondary dark:text-background font-bold text-xs px-5 py-2.5 rounded hover:opacity-90 transition-opacity cursor-pointer"
              >
                {selectedCert.verifyUrl.startsWith('/docs/') ? 'View PDF Document' : 'Verify Credential'} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
