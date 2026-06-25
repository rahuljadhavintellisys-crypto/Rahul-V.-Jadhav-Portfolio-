import type { Metadata } from 'next';
import { db } from '@/db/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CertificationsSection from '@/components/CertificationsSection';

export const metadata: Metadata = {
  title: 'Verified Credentials & Certifications | Rahul V. Jadhav',
  description: 'Explore verified professional certifications in operations management, agile systems, and business growth held by Rahul V. Jadhav.',
};

export default function CertificationsPage() {
  const certs = db.getCerts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <CertificationsSection initialCerts={certs} />
      </main>
      <Footer />
    </div>
  );
}
