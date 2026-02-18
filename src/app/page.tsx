import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollProgress from '@/components/ScrollProgress';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true" />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b1120]">
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
      <PWAInstallPrompt />
    </div>
  );
}
