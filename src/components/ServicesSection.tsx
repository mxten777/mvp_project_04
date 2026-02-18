'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/i18n';
import {
  CpuChipIcon,
  CloudIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const serviceConfig = [
  {
    key: 'ai' as const,
    icon: CpuChipIcon,
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    bgAccent: 'from-blue-500/5 to-cyan-400/5',
  },
  {
    key: 'cloud' as const,
    icon: CloudIcon,
    gradient: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    bgAccent: 'from-emerald-500/5 to-teal-400/5',
  },
  {
    key: 'blockchain' as const,
    icon: ShieldCheckIcon,
    gradient: 'from-indigo-500 to-violet-400',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    bgAccent: 'from-indigo-500/5 to-violet-400/5',
  },
  {
    key: 'consulting' as const,
    icon: ChartBarIcon,
    gradient: 'from-amber-500 to-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    bgAccent: 'from-amber-500/5 to-orange-400/5',
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = serviceConfig.map((cfg) => ({
    ...cfg,
    name: t(`services.${cfg.key}.title`),
    description: t(`services.${cfg.key}.description`),
    features: [
      t(`services.${cfg.key}.f1`),
      t(`services.${cfg.key}.f2`),
      t(`services.${cfg.key}.f3`),
      t(`services.${cfg.key}.f4`),
    ],
  }));

  const featured = services[0];
  const rest = services.slice(1);

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 aurora-bg bg-white dark:bg-[#0e1526] transition-colors duration-500"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label mb-4 inline-flex">{t('services.label')}</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="gradient-text-primary">
              {t('services.title')}
            </span>
          </h2>
          <p className="font-ui text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('services.subtitle')}
            <br className="hidden md:block" />
            <span className="text-gray-500 dark:text-gray-400">{t('services.tagline')}</span>
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid - Featured card spans full width */}
        <div className="space-y-6 lg:space-y-8">
          {/* Featured Service Card (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="group relative"
          >
            <div
              className="card-featured p-8 sm:p-12"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Spotlight hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit] pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${featured.glowColor}, transparent 40%)`,
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left: Content */}
                <div>
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${featured.gradient} shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3 transition-all duration-500`}>
                      <featured.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {featured.name}
                  </h3>
                  <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-lg">
                    {featured.description}
                  </p>

                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-3 transition-all duration-300">
                    {t('common.learnMore')}
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Right: Features as pill tags */}
                <div className="grid grid-cols-2 gap-3">
                  {featured.features.map((feature, fi) => (
                    <motion.div
                      key={fi}
                      className="pill-tag !py-3 !px-5 !text-sm justify-center text-center group-hover:border-indigo-500/20 dark:group-hover:border-indigo-400/20 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + fi * 0.08 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${featured.gradient} flex-shrink-0`} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Remaining 3 Service Cards (3-column grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group relative"
              >
                <div
                  className="card-premium p-7 sm:p-8 h-full"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  {/* Spotlight hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none"
                    style={{
                      background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.glowColor}, transparent 40%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3 transition-all duration-500`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="font-ui text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features as compact list */}
                    <div className="space-y-2.5 mb-6">
                      {service.features.map((feature, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn more */}
                    <div className="pt-5 border-t border-gray-100 dark:border-[#1e2d4a]">
                      <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {t('common.learnMore')}
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium CTA Banner - enhanced with animated border */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl animate-gradient-x" />
            <div className="relative m-[1.5px] bg-[#0c1630] rounded-[calc(1.5rem-1.5px)] p-10 sm:p-14">
              {/* Background orbs */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                    <SparklesIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-semibold text-indigo-300 tracking-wide uppercase">{t('services.cta.badge')}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                    {t('services.cta.title')}
                  </h3>
                  <p className="text-gray-400 max-w-lg text-sm sm:text-base">
                    {t('services.cta.subtitle')}
                  </p>
                </div>
                <motion.a
                  href="#contact"
                  className="btn-premium btn-primary !text-base !px-10 !py-4.5 whitespace-nowrap shadow-xl shadow-indigo-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t('services.cta.button')}
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
