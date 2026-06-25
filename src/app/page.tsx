import { db } from '@/db/store';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SocialProofStrip from '@/components/SocialProofStrip';
import AboutSection from '@/components/AboutSection';
import ExecutivePerspective from '@/components/ExecutivePerspective';
import AchievementsSection from '@/components/AchievementsSection';
import TimelineSection from '@/components/TimelineSection';
import CertificationsTeaser from '@/components/CertificationsTeaser';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import AIShowcase from '@/components/AIShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  const testimonials = db.getTestimonials();
  const projects = db.getProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SocialProofStrip />
        <AboutSection />
        <ExecutivePerspective />
        <AchievementsSection />
        <TimelineSection />
        <CertificationsTeaser />
        <FeaturedProjectsSection initialProjects={projects} />
        <AIShowcase />
        <TestimonialsSection initialTestimonials={testimonials} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
