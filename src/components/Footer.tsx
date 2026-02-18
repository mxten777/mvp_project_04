'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/lib/i18n';

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'Python', 'AI/ML', 'RPA', 'Cloud',
];

export default function Footer() {
  const { t } = useLanguage();

  const navigation = {
    services: [
      { name: t('footer.serviceLinks.s1'), href: '#services' },
      { name: t('footer.serviceLinks.s2'), href: '#services' },
      { name: t('footer.serviceLinks.s3'), href: '#services' },
      { name: t('footer.serviceLinks.s4'), href: '#services' },
    ],
    company: [
      { name: t('footer.companyLinks.c1'), href: '#about' },
      { name: t('footer.companyLinks.c2'), href: '#services' },
      { name: t('footer.companyLinks.c3'), href: '#portfolio' },
      { name: t('footer.companyLinks.c4'), href: '#contact' },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a0f1e] border-t border-indigo-500/[0.08]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Tech Stack Marquee - enhanced */}
      <div className="border-b border-indigo-500/[0.08] py-5">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="text-sm font-mono text-gray-500/80 flex items-center gap-3 hover:text-indigo-400 transition-colors duration-300">
                {tech}
                <span className="w-1 h-1 rounded-full bg-gradient-to-r from-indigo-500/40 to-purple-500/40" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand - wider */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/baikal_logo_white.png"
                alt="바이칼시스템즈 로고"
                width={100}
                height={30}
                className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-3 hover:text-gray-300 transition-colors duration-200">
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs">📞</span>
                010-2380-4691
              </p>
              <p className="flex items-center gap-3 hover:text-gray-300 transition-colors duration-200">
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs">✉️</span>
                jngdy@baikalsys.kr
              </p>
              <p className="flex items-center gap-3 hover:text-gray-300 transition-colors duration-200">
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs">📍</span>
                서울특별시 강남구 역삼로 138
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-3.5">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-indigo-400 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">{t('footer.companyTitle')}</h3>
            <ul className="space-y-3.5">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-indigo-400 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA - enhanced */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-6 tracking-wide uppercase">{t('footer.newsletterTitle')}</h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 hover:border-white/[0.12] transition-all duration-300"
              />
              <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-1.5">
                {t('common.subscribe')}
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-indigo-500/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2003-{new Date().getFullYear()} (주) 바이칼시스템즈. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">{t('footer.poweredBy')}</span>
            <span className="text-xs font-semibold gradient-text-shine">VIBE CODING</span>
          </div>
        </div>
      </div>

      {/* Back to top button - enhanced with gradient */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.12] hover:border-indigo-500/30 flex items-center justify-center shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
