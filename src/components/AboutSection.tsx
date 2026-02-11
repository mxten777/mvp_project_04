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
  {
    icon: LightBulbIcon,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: TrophyIcon,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: UsersIcon,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: RocketLaunchIcon,
    gradient: 'from-purple-500 to-pink-500',
  },
];

const stats = [
  { name: '설립년도', value: '2003', suffix: '' },
  { name: '전문 개발진', value: '7', suffix: '명' },
  { name: '주요 사업분야', value: 'AI & RPA', suffix: '' },
  { name: '서비스 지역', value: '전국', suffix: '' },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const valueData = [
    {
      name: t('about.values.innovation'),
      description: '최신 AI 기술과 창의적 사고로 새로운 가치를 창출합니다.',
      ...values[0],
    },
    {
      name: t('about.values.excellence'),
      description: '깊은 기술적 전문성과 업계 경험을 바탕으로 최적의 솔루션을 제공합니다.',
      ...values[1],
    },
    {
      name: t('about.values.collaboration'),
      description: '고객과의 긴밀한 협력을 통해 함께 성장하는 파트너십을 구축합니다.',
      ...values[2],
    },
    {
      name: t('about.values.integrity'),
      description: '지속적인 학습과 발전을 통해 더 나은 미래를 만들어갑니다.',
      ...values[3],
    },
  ];

  return (
    <section
      id="about"
      data-has-hero
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-100/50 dark:from-indigo-950/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-100/50 dark:from-purple-950/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-6 inline-flex">ABOUT US</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text-primary">{t('about.title')}</span>
          </h2>
          <p className="font-ui text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Vision & Competency - Split panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {/* Vision */}
          <div className="card-premium p-8 sm:p-10">
            <div className="relative z-10">
              <span className="section-label mb-6 inline-flex text-[10px]">VISION</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                우리의 비전
              </h3>
              <div className="space-y-4">
                <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">(주) 바이칼시스템즈</span>는 AI와 RPA 기술을 활용하여
                  공공기관과 민간기업의 업무 효율성을 혁신하는 전문 기업입니다.
                </p>
                <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  공공데이터 API 활용부터 요양병원, 일반병원, 치매 어르신 복지정책 적용까지,
                  실질적인 <span className="font-semibold text-indigo-600 dark:text-indigo-400">사회적 가치</span>를 창출하는
                  바이브코딩 솔루션을 제공합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Core Competency */}
          <div className="card-premium p-8 sm:p-10">
            <div className="relative z-10">
              <span className="section-label mb-6 inline-flex text-[10px]" style={{ color: 'var(--premium-purple)', background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.15)' }}>
                CORE COMPETENCY
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                핵심 역량
              </h3>
              <ul className="space-y-4">
                {[
                  { text: 'AI 기반 업무 자동화 솔루션', color: 'from-indigo-500 to-purple-500' },
                  { text: 'RPA를 활용한 업무 편의성 향상', color: 'from-purple-500 to-pink-500' },
                  { text: '공공데이터 API 활용 및 공급', color: 'from-pink-500 to-rose-500' },
                  { text: '헬스케어 및 복지정책 시스템', color: 'from-rose-500 to-orange-500' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r ${item.color} group-hover:scale-150 transition-transform duration-300`} />
                    <span className="font-ui text-sm sm:text-base text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="card-premium p-6 sm:p-8 text-center group"
            >
              <div className="relative z-10">
                <dt className="font-ui text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 tracking-wide">{stat.name}</dt>
                <dd className="font-heading text-2xl sm:text-3xl font-bold gradient-text-primary">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-16">
            <span className="section-label mb-6 inline-flex">OUR VALUES</span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-6">
              <span className="gradient-text-primary">우리의 가치</span>
            </h3>
            <p className="font-ui text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              바이칼시스템즈가 추구하는 핵심 가치들입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueData.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="card-premium p-8 text-center group cursor-default"
              >
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 mb-6`}>
                    <value.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                    {value.name}
                  </h4>
                  <p className="font-ui text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
