'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedElement from './AnimatedElement';
import FloatingElement from './FloatingElement';
import { useLanguage } from '@/lib/i18n';
import {
  CpuChipIcon,
  DocumentTextIcon,
  CloudIcon,
  HeartIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    name: 'AI 기반 자동화',
    description: '최첨단 AI 기술로 반복 업무를 자동화하고 생산성을 극대화합니다.',
    icon: CpuChipIcon,
    features: ['코드 자동 생성', 'AI 디버깅', '성능 최적화', '보안 강화'],
    color: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'RPA 솔루션',
    description: '로봇 프로세스 자동화로 업무 효율성과 정확성을 혁신적으로 향상시킵니다.',
    icon: DocumentTextIcon,
    features: ['프로세스 자동화', '데이터 처리', '업무 최적화', '실시간 모니터링'],
    color: 'from-purple-500 to-pink-500',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    name: '공공데이터 API',
    description: '정부 공공데이터를 활용한 맞춤형 서비스 구축 및 실시간 연동 서비스입니다.',
    icon: CloudIcon,
    features: ['API 연동', '데이터 시각화', '실시간 업데이트', '맞춤형 대시보드'],
    color: 'from-green-500 to-emerald-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    name: '헬스케어 솔루션',
    description: '의료기관 및 요양시설을 위한 통합 관리 시스템과 복지정책 연동 서비스입니다.',
    icon: HeartIcon,
    features: ['환자 관리', '복지정책 연동', '데이터 분석', '보고서 자동생성'],
    color: 'from-red-500 to-pink-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    name: '데이터 분석',
    description: '빅데이터 분석을 통한 비즈니스 인사이트 도출 및 의사결정 지원 서비스입니다.',
    icon: ChartBarIcon,
    features: ['데이터 마이닝', '예측 분석', '시각화', '맞춤형 리포트'],
    color: 'from-yellow-500 to-orange-500',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    name: '보안 솔루션',
    description: '기업의 디지털 자산을 보호하는 종합 보안 서비스와 컴플라이언스 관리입니다.',
    icon: ShieldCheckIcon,
    features: ['취약점 분석', '보안 모니터링', '컴플라이언스', '사고 대응'],
    color: 'from-indigo-500 to-blue-500',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 서비스 데이터 (실제 사용됨)
  const services = [
    {
      name: t('services.ai.title'),
      description: t('services.ai.description'),
      icon: CpuChipIcon,
      features: ['코드 자동 생성', 'AI 디버깅', '성능 최적화', '보안 강화'],
      color: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      name: t('services.cloud.title'),
      description: t('services.cloud.description'),
      icon: CloudIcon,
      features: ['프로세스 자동화', '데이터 처리', '업무 최적화', '실시간 모니터링'],
      color: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      name: t('services.blockchain.title'),
      description: t('services.blockchain.description'),
      icon: ShieldCheckIcon,
      features: ['취약점 분석', '보안 모니터링', '컴플라이언스', '사고 대응'],
      color: 'from-indigo-500 to-blue-500',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      name: t('services.consulting.title'),
      description: t('services.consulting.description'),
      icon: ChartBarIcon,
      features: ['데이터 마이닝', '예측 분석', '시각화', '맞춤형 리포트'],
      color: 'from-yellow-500 to-orange-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
  <section id="services" className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-500">
  <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Premium Typography Heading */}
            <div className="mb-3 sm:mb-4">
              <span className="font-display font-medium text-sm sm:text-base tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
                EXPERTISE
              </span>
            </div>
            <h2 className="font-heading text-display-sm xs:text-display-md sm:text-display-lg md:text-display-xl lg:text-display-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                {t('services.title')}
              </span>
            </h2>
            <p className="font-ui text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed break-keep tracking-tight">
              {t('services.subtitle')}
              <br className="hidden md:block" />
              <span className="font-semibold text-gray-900 dark:text-white">바이칼시스템즈</span>의 핵심 서비스를 만나보세요
            </p>
            
            {/* Floating Background Elements */}
            <FloatingElement className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <FloatingElement className="absolute -top-10 -right-16 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-2xl" delay={1} />
          </div>
        </motion.div>

        <AnimatedElement animation="fadeInUp" duration={1} delay={0.3}>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 lg:gap-10"
          >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-6 xs:p-7 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 h-full group-hover:-translate-y-2 backdrop-blur-sm">
                {/* Premium Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.08] rounded-2xl transition-all duration-500`}></div>
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl -z-10 transition-all duration-500`}></div>
                {/* Premium Icon Container */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="relative">
                    <div className={`w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <service.icon className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 text-white drop-shadow-lg" />
                    </div>
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10`}></div>
                  </div>
                </div>
                {/* Premium Content */}
                <div className="relative">
                  <h3 className="font-heading text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-500 tracking-tight">
                    {service.name}
                  </h3>
                  <p className="font-ui text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed break-keep tracking-wide">
                    {service.description}
                  </p>
                  {/* Premium Features List */}
                  <ul className="space-y-3 sm:space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-center font-ui text-sm xs:text-base text-gray-600 dark:text-gray-300 group/item hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 xs:w-2.5 xs:h-2.5 bg-gradient-to-r ${service.color} rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300`}></div>
                        <span className="tracking-wide">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {/* Premium Hover Arrow */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  <motion.div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatedElement>

        {/* Premium CTA Section */}
        <AnimatedElement animation="fadeInUp" duration={1} delay={0.6}>
          <motion.div
            className="mt-12 sm:mt-16 md:mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-8 xs:p-10 sm:p-12 md:p-16 shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative">
                <div className="mb-4">
                  <span className="font-display font-medium text-sm sm:text-base tracking-[0.2em] text-white/80 uppercase">
                    READY TO START
                  </span>
                </div>
                <h3 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                  프로젝트를 시작할 준비가 되셨나요?
                </h3>
                <p className="font-ui text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto tracking-wide">
                  전문 컨설턴트와 함께 최적의 솔루션을 찾아보세요
                </p>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 sm:px-10 sm:py-5 bg-white text-gray-900 font-ui font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg sm:text-xl tracking-tight transform hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  무료 상담 신청하기
                  <motion.svg 
                    className="ml-3 w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
}
