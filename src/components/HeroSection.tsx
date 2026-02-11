'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
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
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
  { label: '완료 프로젝트', value: 82, suffix: '+' },
  { label: '고객 만족도', value: 98, suffix: '%' },
  { label: '업무 자동화', value: 90, suffix: '%' },
  { label: '기술 지원', value: 24, suffix: '/7' },
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

  // Typewriter effect
  const [displayText, setDisplayText] = useState('');
  const fullTexts = [
    'AI & RPA 전문 기업',
    '디지털 혁신 파트너',
    '업무 자동화 리더',
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
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%)',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Particles */}
      <ParticleBackground className="z-0" />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-indigo-200 bg-indigo-500/10 border border-indigo-400/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Next Generation IT Solutions
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-brand text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
        >
          {t('hero.title')}
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              바이칼시스템즈
            </span>
            {/* Underline decoration */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 h-12 flex items-center justify-center"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-white/90">
            {displayText}
            <span className="inline-block w-[2px] h-[1em] bg-indigo-400 ml-1 animate-pulse" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base sm:text-lg md:text-xl text-slate-200/90 mb-12 max-w-2xl mx-auto leading-relaxed font-ui"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 min-w-[220px] text-base overflow-hidden"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center">
              {t('hero.cta.primary')}
              <ArrowRightIcon className="ml-2.5 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: 'transform 0.8s' }} />
          </motion.a>

          <motion.a
            href="https://mxten-project-15.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-8 py-4 text-white/90 font-medium rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 min-w-[220px] text-base"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlayIcon className="mr-2.5 w-5 h-5" />
            {t('hero.cta.secondary')}
          </motion.a>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {heroStats.map((stat, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { count, ref } = useCounter(stat.value, 2000);
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white counter-value mb-1">
                  {count}
                  <span className="text-indigo-300">{stat.suffix}</span>
                </div>
                <div className="text-sm text-slate-300 font-ui">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 font-ui tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 bg-white/40 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
