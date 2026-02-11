'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import AuthButton from '@/components/AuthButton';
import { LanguageSelector, useLanguage } from '@/lib/i18n';

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
      const headerOffset = 80;
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
            ? 'bg-gray-950/95 backdrop-blur-xl shadow-lg border-b border-white/5'
            : 'bg-gray-950/70 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Premium gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <nav className="app-header-inner flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            className="flex items-center lg:flex-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Link href="#home" className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/baikal_logo_white.png"
                  alt="바이칼시스템즈 로고"
                  width={70}
                  height={22}
                  className={`object-contain transition-all duration-500 ${
                    scrolled ? 'brightness-0 dark:brightness-100 invert dark:invert-0' : 'brightness-100'
                  }`}
                  priority
                />
              </div>
              <span className={`text-sm font-bold tracking-tight whitespace-nowrap hidden lg:inline-block transition-colors duration-500 ${
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}>
                (주)바이칼시스템즈
              </span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`p-2.5 rounded-xl transition-colors ${
                scrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                    activeSection === item.id
                      ? scrolled
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-white'
                      : scrolled
                        ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full ${
                        scrolled
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'bg-white'
                      }`}
                      layoutId="activeNav"
                      style={{ width: '60%' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
            <LanguageSelector />
            <AuthButton />
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-premium btn-primary text-sm !py-2.5 !px-6"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              무료 상담
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-zinc-900 shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
                <Link href="#home" className="flex items-center gap-2">
                  <Image
                    src="/images/baikal_logo.png"
                    alt="바이칼시스템즈 로고"
                    width={70}
                    height={22}
                    className="object-contain"
                  />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">(주)바이칼시스템즈</span>
                </Link>
                <button
                  className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-2">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {activeSection === item.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3" />
                    )}
                    {item.name}
                  </motion.a>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 dark:border-zinc-800 space-y-3">
                <LanguageSelector />
                <AuthButton />
                <a
                  href="#contact"
                  className="btn-premium btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('hero.cta.primary')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
