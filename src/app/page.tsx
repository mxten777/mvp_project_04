import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

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
    </div>
  );
}
