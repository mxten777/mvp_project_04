'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import AuthButton from '@/components/AuthButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  const navigation = [
    { name: t('common.home'), href: '#home', id: 'home' },
    { name: t('common.services'), href: '#services', id: 'services' },
    { name: t('common.about'), href: '#about', id: 'about' },
    { name: t('common.portfolio'), href: '#portfolio', id: 'portfolio' },
    { name: t('common.contact'), href: '#contact', id: 'contact' },
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0b1120]/95 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 border-b border-indigo-400/[0.06]'
            : 'bg-[#0b1120]/80 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Premium gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <nav className="app-header-inner flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* ── Left: Logo ── */}
          <div className="flex items-center shrink-0">
            <Link href="#home" className="flex items-center gap-2.5 group">
              <Image
                src="/images/baikal_logo_white.png"
                alt="바이칼시스템즈 로고"
                width={68}
                height={22}
                className="object-contain brightness-100 transition-opacity group-hover:opacity-90"
                priority
              />
              <span className="text-[13px] font-semibold tracking-tight whitespace-nowrap hidden xl:inline-block text-white/80">
                (주)바이칼시스템즈
              </span>
            </Link>
          </div>

          {/* ── Center: Main Navigation (desktop) ── */}
          <div className="hidden lg:flex lg:items-center lg:gap-0.5">
            {navigation.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3.5 py-2 text-[13px] font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                      layoutId="activeNav"
                      style={{ width: '50%' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.div>
            ))}
          </div>

          {/* ── Right: Actions (desktop) ── */}
          <div className="hidden lg:flex lg:items-center lg:gap-2.5">
            {/* 5th priority: Language (lowest emphasis) */}
            <LanguageSwitcher />

            {/* 4th priority: Login (ghost button) */}
            <AuthButton />

            {/* 1st priority: CTA (highest emphasis) */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-premium btn-primary text-[13px] font-semibold !py-2 !px-5 whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('common.freeConsultation')}
            </motion.a>
          </div>

          {/* ── Mobile: Hamburger ── */}
          <div className="flex lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              className="p-2 rounded-lg text-white/60 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ══════════ Mobile Menu ══════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-[#0f1729] shadow-2xl lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#1e2d4a]">
                <Link href="#home" className="flex items-center gap-2">
                  <Image
                    src="/images/baikal_logo.png"
                    alt="바이칼시스템즈 로고"
                    width={64}
                    height={20}
                    className="object-contain"
                  />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">(주)바이칼시스템즈</span>
                </Link>
                <button
                  aria-label="Close menu"
                  className="p-2 -mr-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-1">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2540]'
                    }`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    {activeSection === item.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 shrink-0" />
                    )}
                    {item.name}
                  </motion.a>
                ))}
              </div>

              {/* Bottom actions — Language / Login / CTA */}
              <div className="border-t border-gray-100 dark:border-[#1e2d4a] px-6 py-5 space-y-3">
                {/* Language selector (mobile) */}
                <LanguageSwitcher mobile />

                {/* Login */}
                <AuthButton mobile />

                {/* CTA — full width, bottom-fixed emphasis */}
                <a
                  href="#contact"
                  className="btn-premium btn-primary w-full text-center text-[15px] font-semibold !py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.freeConsultation')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
