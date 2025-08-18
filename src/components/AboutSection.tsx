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
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-blue-600">회사 소개</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            (주) 바이칼시스템즈
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            미래를 선도하는 AI 기반 솔루션으로 디지털 혁신을 이끌어갑니다.
          </p>
        </motion.div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">우리의 비전</h3>
                <p className="text-lg text-gray-600 mb-6">
                  (주) 바이칼시스템즈는 AI와 RPA 기술을 활용하여 공공기관과 민간기업의 
                  업무 효율성을 혁신하는 전문 기업입니다.
                </p>
                <p className="text-base text-gray-600">
                  공공데이터 API 활용부터 요양병원, 일반병원, 치매 어르신 복지정책 적용까지, 
                  실질적인 사회적 가치를 창출하는 바이브코딩 솔루션을 제공합니다.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">핵심 역량</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-3 text-gray-600">AI 기반 업무 자동화 솔루션</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-3 text-gray-600">RPA를 활용한 업무 편의성 향상</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-3 text-gray-600">공공데이터 API 활용 및 공급</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                    <span className="ml-3 text-gray-600">헬스케어 및 복지정책 시스템</span>
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
          className="mx-auto mt-16 max-w-2xl lg:max-w-none"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <dt className="text-sm font-medium text-gray-600">{stat.name}</dt>
                <dd className="mt-2 text-2xl font-bold text-blue-600">{stat.value}</dd>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-20 max-w-2xl lg:max-w-none"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">우리의 가치</h3>
            <p className="mt-4 text-lg text-gray-600">
              바이칼시스템즈가 추구하는 핵심 가치들입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group hover:bg-blue-50 rounded-xl p-6 transition-colors duration-300"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-gray-900">{value.name}</h4>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
