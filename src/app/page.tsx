import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollProgress from '@/components/ScrollProgress';
import AdvancedSearch from '@/components/AdvancedSearch';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { PerformanceDashboard } from '@/lib/monitoring';

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true" />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <ScrollProgress />
      <Header />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <SectionDivider />
        <section id="services">
          <ServicesSection />
        </section>
        <SectionDivider />
        <section id="about">
          <AboutSection />
        </section>
        <SectionDivider />
        <section id="portfolio">
          <PortfolioSection />
        </section>
        <SectionDivider />
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />

      {/* Overlay UI */}
      <ThemeToggle />
      <ChatBot />
      <AdvancedSearch />
      <AnalyticsDashboard />
      <PWAInstallPrompt />
      <PerformanceDashboard />
    </div>
  );
}
