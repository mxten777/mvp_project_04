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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <ServicesSection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="portfolio">
          <PortfolioSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
      
      {/* Phase 1 & 2.1 Components */}
      <ScrollProgress />
      <ThemeToggle />
      <ChatBot />
      
      {/* Phase 2.2 Components */}
      <AdvancedSearch />
      <AnalyticsDashboard />
      <PWAInstallPrompt />
      
      {/* Phase 3 Components - Security & Monitoring */}
      <PerformanceDashboard />
    </div>
  );
}
