'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/i18n';
import {
  UsersIcon,
  LightBulbIcon,
  TrophyIcon,
  RocketLaunchIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

// Animated counter
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const isYear = value.length === 4 && numericValue > 1900;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (isYear) {
            setDisplayed(value);
            return;
          }
          const start = performance.now();
          const duration = 2000;
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(Math.floor(eased * numericValue).toString());
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplayed(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, numericValue, isYear]);

  return (
    <div ref={ref} className="counter-value">
      {displayed}{suffix}
    </div>
  );
}

const values = [
  { icon: LightBulbIcon, gradient: 'from-amber-500 to-orange-500', bgGlow: 'rgba(245, 158, 11, 0.08)' },
  { icon: TrophyIcon, gradient: 'from-indigo-500 to-blue-500', bgGlow: 'rgba(79, 70, 229, 0.08)' },
  { icon: UsersIcon, gradient: 'from-emerald-500 to-teal-500', bgGlow: 'rgba(16, 185, 129, 0.08)' },
  { icon: RocketLaunchIcon, gradient: 'from-purple-500 to-pink-500', bgGlow: 'rgba(168, 85, 247, 0.08)' },
];

const stats = [
  { key: 'founded', icon: CalendarDaysIcon, gradient: 'from-blue-500 to-indigo-500' },
  { key: 'team', icon: UserGroupIcon, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'business', icon: BuildingOffice2Icon, gradient: 'from-purple-500 to-pink-500' },
  { key: 'region', icon: GlobeAltIcon, gradient: 'from-amber-500 to-orange-500' },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const valueData = [
    { name: t('about.values.innovation'), description: t('about.values.innovationDesc'), ...values[0] },
    { name: t('about.values.excellence'), description: t('about.values.excellenceDesc'), ...values[1] },
    { name: t('about.values.collaboration'), description: t('about.values.collaborationDesc'), ...values[2] },
    { name: t('about.values.integrity'), description: t('about.values.integrityDesc'), ...values[3] },
  ];

  return (
    <section
      id="about"
      data-has-hero
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-[#0d1525] dark:to-[#0b1120] transition-colors duration-500 overflow-hidden"
    >
      {/* Decorative dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Subtle background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/40 dark:from-indigo-950/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100/40 dark:from-purple-950/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-100/20 dark:from-pink-950/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4 inline-flex">{t('about.label')}</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="gradient-text-primary">{t('about.title')}</span>
          </h2>
          <p className="font-ui text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Vision & Competency - Enhanced split panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20"
        >
          {/* Vision - with accent border */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-[var(--radius-xl)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="card-premium p-8 sm:p-10 h-full relative">
              {/* Top gradient accent */}
              <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-full opacity-60" />

              <div className="relative z-10">
                <span className="section-label mb-4 inline-flex text-[10px]">{t('about.vision.label')}</span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  {t('about.vision.title')}
                </h3>
                <div className="space-y-4">
                  <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('about.vision.p1')}
                  </p>
                  <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('about.vision.p2').split(t('about.vision.highlight'))[0]}
                    <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{t('about.vision.highlight')}</span>
                    {t('about.vision.p2').split(t('about.vision.highlight'))[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Competency - with accent border */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-[var(--radius-xl)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="card-premium p-8 sm:p-10 h-full relative">
              {/* Top gradient accent */}
              <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-b-full opacity-60" />

              <div className="relative z-10">
                <span className="section-label mb-4 inline-flex text-[10px]" style={{ color: 'var(--premium-purple)', background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.15)' }}>
                  {t('about.competency.label')}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  {t('about.competency.title')}
                </h3>
                <ul className="space-y-4">
                  {[
                    { text: t('about.competency.item1'), color: 'from-indigo-500 to-purple-500' },
                    { text: t('about.competency.item2'), color: 'from-purple-500 to-pink-500' },
                    { text: t('about.competency.item3'), color: 'from-pink-500 to-rose-500' },
                    { text: t('about.competency.item4'), color: 'from-rose-500 to-orange-500' },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-4 group/item p-2 -m-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors duration-300"
                      initial={{ opacity: 0, x: -15 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold shadow-md group-hover/item:scale-110 transition-transform duration-300`}>
                        {i + 1}
                      </div>
                      <span className="font-ui text-sm sm:text-base text-gray-700 dark:text-gray-200 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Stats - Premium stat cards with icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="stat-card group"
            >
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <dt className="font-ui text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 tracking-wide">{t(`about.stats.${stat.key}`)}</dt>
                <dd className="font-heading text-xl sm:text-2xl font-bold gradient-text-primary">
                  <AnimatedCounter value={t(`about.stats.${stat.key}Val`)} suffix={t(`about.stats.${stat.key}Suffix`)} />
                </dd>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Values - Enhanced with glow effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="section-label mb-4 inline-flex">{t('about.valuesLabel')}</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-4">
              <span className="gradient-text-primary">{t('about.valuesTitle')}</span>
            </h3>
            <p className="font-ui text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueData.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.12 }}
                className="group relative"
              >
                {/* Glow behind card on hover */}
                <div
                  className="absolute inset-0 rounded-[var(--radius-xl)] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                  style={{ background: value.bgGlow }}
                />

                <div className="card-premium p-8 text-center h-full relative overflow-hidden">
                  {/* Gradient top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6 transition-all duration-500 mb-6`}>
                      <value.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {value.name}
                    </h4>
                    <p className="font-ui text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
