'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedElement from './AnimatedElement';
import FloatingElement from './FloatingElement';
import { useLanguage } from '@/lib/i18n';
import {
  UsersIcon,
  LightBulbIcon,
  TrophyIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const values = [
  {
    name: '혁신',
    description: '최신 AI 기술과 창의적 사고로 새로운 가치를 창출합니다.',
    icon: LightBulbIcon,
  },
  {
    name: '전문성',
    description: '깊은 기술적 전문성과 업계 경험을 바탕으로 최적의 솔루션을 제공합니다.',
    icon: TrophyIcon,
  },
  {
    name: '협력',
    description: '고객과의 긴밀한 협력을 통해 함께 성장하는 파트너십을 구축합니다.',
    icon: UsersIcon,
  },
  {
    name: '성장',
    description: '지속적인 학습과 발전을 통해 더 나은 미래를 만들어갑니다.',
    icon: RocketLaunchIcon,
  },
];

const stats = [
  { name: '설립년도', value: '2003' },
  { name: '전문 개발진', value: '7명' },
  { name: '주요 사업분야', value: 'AI & RPA' },
  { name: '서비스 지역', value: '전국' },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 회사 가치 데이터 (values.map에서 사용됨)
  const values = [
    {
      name: t('about.values.innovation'),
      description: '최신 AI 기술과 창의적 사고로 새로운 가치를 창출합니다.',
      icon: LightBulbIcon,
    },
    {
      name: t('about.values.excellence'),
      description: '깊은 기술적 전문성과 업계 경험을 바탕으로 최적의 솔루션을 제공합니다.',
      icon: TrophyIcon,
    },
    {
      name: t('about.values.collaboration'),
      description: '고객과의 긴밀한 협력을 통해 함께 성장하는 파트너십을 구축합니다.',
      icon: UsersIcon,
    },
    {
      name: t('about.values.integrity'),
      description: '지속적인 학습과 발전을 통해 더 나은 미래를 만들어갑니다.',
      icon: RocketLaunchIcon,
    },
  ];

  // 회사 통계 데이터 (stats.map에서 사용됨)
  const stats = [
    { name: '설립년도', value: '2003' },
    { name: '전문 개발진', value: '7명' },
    { name: '주요 사업분야', value: 'AI & RPA' },
    { name: '서비스 지역', value: '전국' },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-500 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <FloatingElement className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl" />
        <FloatingElement className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl" delay={1.5} />
        <FloatingElement className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl" delay={0.8} />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fadeInUp" duration={1.2} delay={0.2}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center relative"
          >
            {/* Premium Header */}
            <div className="mb-4 sm:mb-6">
              <span className="font-display font-semibold text-sm sm:text-base tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">
                ABOUT US
              </span>
            </div>
            
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
                {t('about.title')}
              </span>
            </h2>
            
            <p className="font-ui text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </AnimatedElement>

        {/* Premium Company Description */}
        <AnimatedElement animation="slideIn" duration={1} delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-16 sm:mt-20 md:mt-24 max-w-6xl"
          >
            <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 xs:p-10 sm:p-12 lg:p-16 shadow-2xl border border-gray-200/50 dark:border-zinc-700/50 hover:shadow-3xl transition-all duration-500">
              {/* Premium Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-3xl"></div>
              
              <div className="relative grid grid-cols-1 gap-8 xs:gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="mb-4">
                      <span className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
                        VISION
                      </span>
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                      우리의 비전
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal">
                        <span className="font-semibold text-gray-900 dark:text-white">(주) 바이칼시스템즈</span>는 AI와 RPA 기술을 활용하여 
                        공공기관과 민간기업의 업무 효율성을 혁신하는 전문 기업입니다.
                      </p>
                      <p className="font-ui text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal">
                        공공데이터 API 활용부터 요양병원, 일반병원, 치매 어르신 복지정책 적용까지, 
                        실질적인 <span className="font-semibold text-indigo-600 dark:text-indigo-400">사회적 가치</span>를 창출하는 
                        바이브코딩 솔루션을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="mb-4">
                      <span className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] text-purple-600 dark:text-purple-400 uppercase">
                        CORE COMPETENCY
                      </span>
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                      핵심 역량
                    </h3>
                    <ul className="space-y-4 sm:space-y-5">
                      <motion.li 
                        className="flex items-start group"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-4 font-ui text-sm sm:text-base text-gray-700 dark:text-gray-300 tracking-normal group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          AI 기반 업무 자동화 솔루션
                        </span>
                      </motion.li>
                      <motion.li 
                        className="flex items-start group"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-4 font-ui text-sm sm:text-base text-gray-700 dark:text-gray-300 tracking-normal group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          RPA를 활용한 업무 편의성 향상
                        </span>
                      </motion.li>
                      <motion.li 
                        className="flex items-start group"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-4 font-ui text-sm sm:text-base text-gray-700 dark:text-gray-300 tracking-normal group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          공공데이터 API 활용 및 공급
                        </span>
                      </motion.li>
                      <motion.li 
                        className="flex items-start group"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-4 font-ui text-sm sm:text-base text-gray-700 dark:text-gray-300 tracking-normal group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                          헬스케어 및 복지정책 시스템
                        </span>
                      </motion.li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedElement>

        {/* Premium Company Stats */}
        <AnimatedElement animation="scaleIn" duration={1} delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-16 sm:mt-20 md:mt-24 max-w-6xl"
          >
            <div className="grid grid-cols-1 gap-6 xs:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 }}
                  className="group relative text-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 xs:p-8 shadow-xl border border-gray-200/50 dark:border-zinc-700/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Premium Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <dt className="font-ui text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 tracking-normal mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {stat.name}
                    </dt>
                    <dd className="font-heading text-xl xs:text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                      {stat.value}
                    </dd>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedElement>

        {/* Premium Company Values */}
        <AnimatedElement animation="rotateIn" duration={1} delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-20 sm:mt-24 md:mt-32 max-w-6xl"
          >
            <div className="text-center mb-12 sm:mb-16">
              <div className="mb-4">
                <span className="font-display font-medium text-sm sm:text-base tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">
                  OUR VALUES
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  우리의 가치
                </span>
              </h3>
              <p className="font-ui text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto tracking-normal">
                바이칼시스템즈가 추구하는 핵심 가치들입니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 xs:gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20, rotateY: -15 }}
                  animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 20, rotateY: -15 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2, type: "spring", stiffness: 100 }}
                  className="group relative text-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-8 xs:p-10 shadow-xl border border-gray-200/50 dark:border-zinc-700/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  {/* Premium Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    {/* Premium Icon Container */}
                    <div className="mx-auto flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500 shadow-lg group-hover:shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-3">
                      <value.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" aria-hidden="true" />
                      {/* Icon Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                    </div>
                    
                    <h4 className="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 transition-all duration-500 tracking-tight">
                      {value.name}
                    </h4>
                    
                    <p className="font-ui text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  );
}
