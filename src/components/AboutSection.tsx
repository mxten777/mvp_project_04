'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-500">
  <div className="mx-auto max-w-7xl px-2 xs:px-3 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-xs xs:text-sm sm:text-base font-semibold leading-7 text-blue-600">회사 소개</h2>
          <p className="mt-2 text-xl xs:text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
            (주) 바이칼시스템즈
          </p>
          <p className="mt-4 sm:mt-6 text-sm xs:text-base leading-7 sm:leading-8 text-gray-600">
            미래를 선도하는 AI 기반 솔루션으로 디지털 혁신을 이끌어갑니다.
          </p>
        </motion.div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-10 sm:mt-14 md:mt-16 max-w-4xl"
        >
          <div className="bg-card dark:bg-card-dark rounded-card p-5 xs:p-7 sm:p-8 lg:p-12 shadow-card border border-gray-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 gap-4 xs:gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">우리의 비전</h3>
                <p className="text-sm xs:text-base text-gray-600 mb-3 sm:mb-6">
                  (주) 바이칼시스템즈는 AI와 RPA 기술을 활용하여 공공기관과 민간기업의 
                  업무 효율성을 혁신하는 전문 기업입니다.
                </p>
                <p className="text-xs sm:text-base text-gray-600">
                  공공데이터 API 활용부터 요양병원, 일반병원, 치매 어르신 복지정책 적용까지, 
                  실질적인 사회적 가치를 창출하는 바이브코딩 솔루션을 제공합니다.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">핵심 역량</h3>
                <ul className="space-y-2 xs:space-y-3 sm:space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-2 sm:ml-3 text-xs sm:text-base text-gray-600">AI 기반 업무 자동화 솔루션</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-2 sm:ml-3 text-xs sm:text-base text-gray-600">RPA를 활용한 업무 편의성 향상</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-2 sm:ml-3 text-xs sm:text-base text-gray-600">공공데이터 API 활용 및 공급</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-2 sm:ml-3 text-xs sm:text-base text-gray-600">헬스케어 및 복지정책 시스템</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-10 sm:mt-14 md:mt-16 max-w-2xl lg:max-w-none"
        >
          <div className="grid grid-cols-1 gap-4 xs:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center bg-card dark:bg-card-dark rounded-lg p-3 xs:p-5 shadow-card border border-gray-200 dark:border-zinc-800"
              >
                <dt className="text-sm font-medium text-gray-600">{stat.name}</dt>
                <dd className="mt-2 text-xl xs:text-2xl font-bold text-primary dark:text-primary-light">{stat.value}</dd>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-14 sm:mt-16 md:mt-20 max-w-2xl lg:max-w-none"
        >
          <div className="text-center mb-7 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">우리의 가치</h3>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              바이칼시스템즈가 추구하는 핵심 가치들입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 xs:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-xl p-4 xs:p-6 transition-colors duration-300"
              >
                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 dark:bg-primary-dark/20 dark:group-hover:bg-primary-dark/30 transition-colors duration-300">
                  <value.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary dark:text-primary-light" aria-hidden="true" />
                </div>
                <h4 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{value.name}</h4>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
