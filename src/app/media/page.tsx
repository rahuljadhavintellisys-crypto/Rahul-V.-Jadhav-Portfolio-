import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MediaSection from '@/components/MediaSection';

export const metadata: Metadata = {
  title: 'Media Coverage & Press Features | Rahul V. Jadhav',
  description: 'Review features, press coverage, executive profiles, and awards for Rahul V. Jadhav across major industry outlets like CIO Outlook and Insights Success.',
};

export default function MediaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <MediaSection />
      </main>
      <Footer />
    </div>
  );
}
