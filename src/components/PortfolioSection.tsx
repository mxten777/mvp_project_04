'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CloudIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const portfolioItems = [
  {
    id: 1,
    title: 'AI 기반 진단 솔루션',
    category: '헬스케어',
    description: '의료진을 위한 AI 진단 보조 시스템',
    image: '/api/placeholder/400/300',
    technologies: ['AI/ML', 'Python', 'TensorFlow', 'React'],
    icon: CpuChipIcon,
    features: ['실시간 진단', '정확도 95%', '클라우드 기반'],
  },
  {
    id: 2,
    title: 'RPA 업무 자동화 시스템',
    category: 'RPA',
    description: '반복 업무 자동화를 통한 효율성 향상',
    image: '/api/placeholder/400/300',
    technologies: ['RPA', 'Python', 'Selenium', 'OCR'],
    icon: ComputerDesktopIcon,
    features: ['업무 효율 300% 향상', '24/7 자동 실행', '오류율 0.1%'],
  },
  {
    id: 3,
    title: '공공데이터 통합 플랫폼',
    category: '공공데이터',
    description: '정부 공공데이터 API 통합 및 시각화',
    image: '/api/placeholder/400/300',
    technologies: ['API', 'React', 'D3.js', 'Node.js'],
    icon: CloudIcon,
    features: ['실시간 데이터', '대시보드', 'API 통합'],
  },
  {
    id: 4,
    title: '스마트 헬스케어 앱',
    category: '모바일',
    description: '환자 관리 및 복지정책 연동 모바일 앱',
    image: '/api/placeholder/400/300',
    technologies: ['React Native', 'Firebase', 'AI', 'IoT'],
    icon: DevicePhoneMobileIcon,
    features: ['환자 모니터링', '복지정책 연동', 'IoT 연결'],
  },
  {
    id: 5,
    title: '데이터 분석 대시보드',
    category: '데이터 분석',
    description: '빅데이터 분석 및 인사이트 도출 플랫폼',
    image: '/api/placeholder/400/300',
    technologies: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
    icon: ChartBarIcon,
    features: ['실시간 분석', '예측 모델', '시각화'],
  },
  {
    id: 6,
    title: '보안 모니터링 시스템',
    category: '보안',
    description: '실시간 보안 위협 탐지 및 대응 시스템',
    image: '/api/placeholder/400/300',
    technologies: ['Security', 'Machine Learning', 'Python', 'Docker'],
    icon: ShieldCheckIcon,
    features: ['실시간 모니터링', '자동 대응', '위협 분석'],
  },
];

const categories = ['전체', '헬스케어', 'RPA', '공공데이터', '모바일', '데이터 분석', '보안'];

export default function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredItems = selectedCategory === '전체' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-blue-600">포트폴리오</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            성공적인 프로젝트 사례
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            다양한 분야에서 축적한 전문성과 혁신적인 솔루션을 확인해보세요.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <item.icon className="h-16 w-16 text-blue-600" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-4 space-y-1">
                  {item.features.map((feature) => (
                    <div key={feature} className="flex items-center text-xs text-gray-600">
                      <div className="mr-2 h-1 w-1 rounded-full bg-blue-600" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                    자세히 보기 →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900">
            다음 성공 사례의 주인공이 되어보세요
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            전문 컨설턴트와 함께 맞춤형 솔루션을 설계해보세요.
          </p>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-500 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
            >
              프로젝트 상담 받기
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
