'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRightIcon,
  PlayIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import ParticleBackground from './ParticleBackground';
import { useLanguage } from '@/lib/i18n';

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
}

const heroStats = [
  { labelKey: 'hero.stats.projects', value: 82, suffix: '+', icon: RocketLaunchIcon },
  { labelKey: 'hero.stats.satisfaction', value: 98, suffix: '%', icon: ChartBarIcon },
  { labelKey: 'hero.stats.automation', value: 90, suffix: '%', icon: BoltIcon },
  { labelKey: 'hero.stats.support', value: 24, suffix: '/7', icon: ShieldCheckIcon },
];

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Typewriter effect
  const [displayText, setDisplayText] = useState('');
  const fullTexts = [
    t('hero.typewriter.line1'),
    t('hero.typewriter.line2'),
    t('hero.typewriter.line3'),
  ];
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = fullTexts[textIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % fullTexts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24"
    >
      {/* Premium Mesh Gradient Background with parallax zoom */}
      <motion.div className="absolute inset-0 mesh-gradient" style={{ scale: bgScale }} />

      {/* Animated gradient orbs - larger, more dramatic */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%)',
          }}
          animate={{ x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)',
          }}
          animate={{ x: [0, -60, 0], y: [0, 70, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%)',
          }}
          animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Extra cyan orb for depth */}
        <motion.div
          className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
          }}
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Dot grid pattern overlay - premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Particles */}
      <ParticleBackground className="z-0" />

      {/* Decorative floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          className="absolute top-[15%] left-[8%] w-16 h-16 border border-indigo-400/20 rounded-2xl"
          animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-[25%] right-[12%] w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm"
          animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-3 h-3 bg-indigo-400/40 rounded-full"
          animate={{ y: [0, -20, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[10%] w-12 h-12 border border-pink-400/15 rounded-lg rotate-45"
          animate={{ rotate: [45, 135, 225, 315, 405], y: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        {/* Kicker badge - enhanced with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <span className="badge-glow text-xs sm:text-sm text-indigo-200 !bg-indigo-500/10 !border-indigo-400/20 !color-[#c7d2fe]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Main headline - more dramatic */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-brand text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.06]"
        >
          {t('hero.title')}
          <br />
          <span className="relative inline-block mt-2">
            <span className="gradient-text-shine">
              {t('hero.brandName')}
            </span>
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-3 left-0 right-0 h-[4px] rounded-full overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x" />
            </motion.div>
          </span>
        </motion.h1>

        {/* Typewriter subtitle - with glass effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 h-14 flex items-center justify-center"
        >
          <span className="inline-flex items-center px-6 py-2 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]">
            <span className="text-base sm:text-lg md:text-xl font-heading font-semibold bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
              {displayText}
            </span>
            <span className="inline-block w-[2px] h-[1.2em] bg-indigo-400 ml-1 animate-pulse rounded-full" />
          </span>
        </motion.div>

        {/* Description - better typography */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base sm:text-lg text-slate-300/90 mb-14 max-w-2xl mx-auto leading-relaxed font-ui"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons - enhanced with gradient glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-24"
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-10 py-4.5 bg-white text-gray-900 font-semibold rounded-2xl shadow-2xl shadow-white/15 transition-all duration-500 min-w-[240px] text-base overflow-hidden"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Animated border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
            <div className="absolute inset-0 bg-white rounded-2xl" />
            <span className="relative z-10 flex items-center">
              {t('hero.cta.primary')}
              <ArrowRightIcon className="ml-2.5 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </motion.a>

          <motion.a
            href="https://mxten-project-15.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-8 py-4 text-white/90 font-medium rounded-2xl border border-white/[0.12] hover:border-white/25 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08] transition-all duration-500 min-w-[220px] text-base"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <PlayIcon className="mr-2.5 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {t('hero.cta.secondary')}
          </motion.a>
        </motion.div>

        {/* Stats counter - premium glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto"
        >
          {heroStats.map((stat, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { count, ref } = useCounter(stat.value, 2000);
            return (
              <motion.div
                key={stat.labelKey}
                ref={ref}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.07] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.12 }}
                whileHover={{ y: -4 }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <stat.icon className="w-5 h-5 text-indigo-400/60 mb-3 mx-auto group-hover:text-indigo-300 transition-colors duration-300" />
                <div className="text-2xl sm:text-3xl font-bold text-white counter-value mb-1.5">
                  {count}
                  <span className="text-indigo-300/80">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-ui group-hover:text-slate-300 transition-colors duration-300">
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator - refined */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.a
          href="#services"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3 group cursor-pointer"
        >
          <span className="text-[10px] text-slate-500/70 font-ui tracking-[0.3em] uppercase group-hover:text-slate-400 transition-colors duration-300">
            Scroll
          </span>
          <div className="w-[22px] h-[34px] rounded-full border border-white/15 flex justify-center pt-2 group-hover:border-white/25 transition-colors duration-300">
            <motion.div
              className="w-[3px] h-[6px] bg-gradient-to-b from-indigo-400/80 to-transparent rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
