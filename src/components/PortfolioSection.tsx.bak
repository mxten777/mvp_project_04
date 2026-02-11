'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedElement from './AnimatedElement';
import FloatingElement from './FloatingElement';
import { useLanguage } from '@/lib/i18n';
import { 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CloudIcon,
  CpuChipIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
}

interface PortfolioItemWithIcon extends PortfolioItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// 아이콘 매핑 함수
const getIconForCategory = (category: string) => {
  if (category.includes('홈페이지') || category.includes('랜딩')) return ComputerDesktopIcon;
  if (category.includes('모바일') || category.includes('앱')) return DevicePhoneMobileIcon;
  if (category.includes('AI') || category.includes('RPA')) return CpuChipIcon;
  if (category.includes('관리자') || category.includes('보안')) return ShieldCheckIcon;
  if (category.includes('분석') || category.includes('대시보드')) return ChartBarIcon;
  if (category.includes('클라우드')) return CloudIcon;
  return ComputerDesktopIcon;
};

const ITEMS_PER_PAGE = 12;

export default function PortfolioSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [portfolioData, setPortfolioData] = useState<PortfolioItemWithIcon[]>([]);
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // JSON 데이터 로드
  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(res => res.json())
      .then(data => {
        const itemsWithIcons = data.portfolioItems.map((item: PortfolioItem) => ({
          ...item,
          icon: getIconForCategory(item.category)
        }));
        setPortfolioData(itemsWithIcons);
        setCategories(data.categories || ['전체']);
        setLoading(false);
      })
      .catch(error => {
        console.error('포트폴리오 데이터 로드 실패:', error);
        setLoading(false);
      });
  }, []);

  // 필터링 및 페이지네이션
  const filteredItems = selectedCategory === '전체' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 카테고리 변경 시 첫 페이지로
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 스크롤을 포트폴리오 섹션 상단으로
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <FloatingElement className="absolute top-32 left-20 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-full blur-3xl" />
        <FloatingElement className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-red-500/30 rounded-full blur-3xl" delay={2} />
        <FloatingElement className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl" delay={1.2} />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="fadeInUp" duration={1.2} delay={0.2}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Premium Header */}
            <div className="mb-4 sm:mb-6">
              <span className="font-display font-medium text-sm sm:text-base tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">
                PORTFOLIO
              </span>
            </div>
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {t('portfolio.title')}
              </span>
            </h2>
            <p className="font-ui text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal max-w-3xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>
        </AnimatedElement>

        {/* Premium Category Filter */}
        <AnimatedElement animation="slideIn" duration={1} delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-3 xs:gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative font-ui font-semibold rounded-full px-6 py-3 text-sm sm:text-base transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-600 backdrop-blur-sm'
                }`}
                whileHover={{ scale: selectedCategory === category ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-30 -z-10"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 tracking-wide">{category}</span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatedElement>

        {/* Premium Portfolio Grid */}
        <AnimatedElement animation="scaleIn" duration={1} delay={0.6}>
          <div className="mx-auto mt-16 sm:mt-20 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 xs:gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">프로젝트를 불러오는 중...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {paginatedItems.map((item, index) => (
                <motion.article
                  key={`${selectedCategory}-${item.id}`}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-zinc-700/50 hover:-translate-y-3 transition-all duration-500"
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                >
                {/* Premium Image Container */}
                <div className="relative h-56 sm:h-64 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-full blur-xl"></div>
                  </div>
                  
                  {/* Premium Icon */}
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                      <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
                    </div>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                <div className="flex flex-1 flex-col p-6 xs:p-7 sm:p-8">
                  {/* Premium Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 px-3 py-1 text-xs sm:text-sm font-ui font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Premium Title */}
                  <h3 className="font-heading text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 transition-all duration-500 tracking-tight mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="font-ui text-xs xs:text-sm text-gray-600 dark:text-gray-300 leading-relaxed tracking-normal mb-4">
                    {item.description}
                  </p>

                  {/* Premium Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 }}
                        className="inline-flex items-center rounded-full bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-sm px-3 py-1 text-xs sm:text-sm font-ui font-medium text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-zinc-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Premium Features */}
                  <div className="space-y-3 mb-6">
                    {item.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={feature} 
                        className="flex items-center font-ui text-xs sm:text-sm text-gray-600 dark:text-gray-300 group/feature hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="mr-3 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover/feature:scale-125 transition-transform duration-300" />
                        <span className="tracking-normal">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Premium Action Button */}
                  <div className="flex justify-between items-center">
                    {item.demoUrl ? (
                      <motion.a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center font-ui font-semibold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ x: 4, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
{t('portfolio.liveDemo')}
                        <motion.svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </motion.svg>
                      </motion.a>
                    ) : (
                      <motion.button 
                        className="group/btn inline-flex items-center font-ui font-semibold text-sm sm:text-base text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
{t('portfolio.viewProject')}
                        <motion.svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </motion.article>
            ))}
            </AnimatePresence>
            )}
          </div>

          {/* 페이지네이션 */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 sm:mt-16 flex items-center justify-center gap-2 sm:gap-4">
              {/* 이전 버튼 */}
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                이전
              </button>

              {/* 페이지 번호 */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // 현재 페이지 주변만 표시
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 py-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                다음
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </button>
            </div>
          )}

          {/* 프로젝트 카운트 */}
          {!loading && (
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              전체 {filteredItems.length}개 프로젝트 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)}개 표시
            </p>
          )}
        </AnimatedElement>

        {/* Premium CTA */}
        <AnimatedElement animation="fadeInUp" duration={1} delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 sm:mt-24 md:mt-32 text-center"
          >
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-12 sm:p-16 md:p-20 shadow-2xl overflow-hidden max-w-4xl mx-auto">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <FloatingElement className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <FloatingElement className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" delay={1} />
              </div>
              
              <div className="relative">
                <div className="mb-6">
                  <span className="font-display font-medium text-sm sm:text-base tracking-[0.2em] text-white/80 uppercase">
                    JOIN SUCCESS
                  </span>
                </div>
                <h3 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                  다음 성공 사례의 주인공이 되어보세요
                </h3>
                <p className="font-ui text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto tracking-wide">
                  전문 컨설턴트와 함께 맞춤형 솔루션을 설계해보세요.
                </p>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center px-10 py-5 sm:px-12 sm:py-6 bg-white text-gray-900 font-ui font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg sm:text-xl tracking-tight transform hover:scale-105 active:scale-95"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  프로젝트 상담 받기
                  <motion.svg 
                    className="ml-4 h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
