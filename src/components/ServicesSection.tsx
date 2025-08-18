'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              핵심 서비스
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            최첨단 기술과 전문 노하우로 고객의 비즈니스 혁신을 이끌어내는 
            <br className="hidden md:block" />
            바이칼시스템즈의 핵심 서비스를 만나보세요
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full">
                {/* 배경 그라디언트 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* 아이콘 */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* 특징 리스트 */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3 flex-shrink-0`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 호버 효과 화살표 */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-8 h-8 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              프로젝트를 시작할 준비가 되셨나요?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              전문 컨설턴트와 함께 최적의 솔루션을 찾아보세요
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료 상담 신청하기
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
