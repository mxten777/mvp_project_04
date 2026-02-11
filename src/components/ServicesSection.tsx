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
    icon: CpuChipIcon,
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    features: ['코드 자동 생성', 'AI 디버깅', '성능 최적화', '보안 강화'],
  },
  {
    icon: CloudIcon,
    gradient: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    features: ['프로세스 자동화', '데이터 처리', '업무 최적화', '실시간 모니터링'],
  },
  {
    icon: ShieldCheckIcon,
    gradient: 'from-indigo-500 to-violet-400',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    features: ['취약점 분석', '보안 모니터링', '컴플라이언스', '사고 대응'],
  },
  {
    icon: ChartBarIcon,
    gradient: 'from-amber-500 to-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    features: ['데이터 마이닝', '예측 분석', '시각화', '맞춤형 리포트'],
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      name: t('services.ai.title'),
      description: t('services.ai.description'),
      ...serviceConfig[0],
    },
    {
      name: t('services.cloud.title'),
      description: t('services.cloud.description'),
      ...serviceConfig[1],
    },
    {
      name: t('services.blockchain.title'),
      description: t('services.blockchain.description'),
      ...serviceConfig[2],
    },
    {
      name: t('services.consulting.title'),
      description: t('services.consulting.description'),
      ...serviceConfig[3],
    },
  ];

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 aurora-bg bg-white dark:bg-zinc-950 transition-colors duration-500"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label mb-6 inline-flex">EXPERTISE</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text-primary">
              {t('services.title')}
            </span>
          </h2>
          <p className="font-ui text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
            <br className="hidden md:block" />
            <span className="font-semibold text-gray-900 dark:text-white">바이칼시스템즈</span>의 핵심 서비스를 만나보세요
          </p>
        </motion.div>

        {/* Bento Grid Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div
                className="card-premium p-8 sm:p-10 h-full"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                {/* Spotlight hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.glowColor}, transparent 40%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn more link */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      자세히 보기
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA Banner */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl" />
            <div className="relative m-[1px] bg-gray-950 rounded-[calc(1.5rem-1px)] p-10 sm:p-14">
              {/* Background orbs */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
              </div>

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                    <SparklesIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-medium text-indigo-300 tracking-wide uppercase">Ready to Start</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                    프로젝트를 시작할 준비가 되셨나요?
                  </h3>
                  <p className="text-gray-400 max-w-lg">
                    전문 컨설턴트와 함께 최적의 솔루션을 찾아보세요
                  </p>
                </div>
                <motion.a
                  href="#contact"
                  className="btn-premium btn-primary !text-base !px-10 !py-4 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  무료 상담 신청하기
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
