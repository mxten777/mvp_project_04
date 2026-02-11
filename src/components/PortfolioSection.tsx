'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/i18n';
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CloudIcon,
  CpuChipIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon,
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
  gradient: string;
}

const categoryGradients: Record<string, string> = {
  '홈페이지': 'from-blue-500 to-cyan-400',
  '랜딩': 'from-indigo-500 to-blue-400',
  '모바일': 'from-purple-500 to-pink-400',
  '앱': 'from-violet-500 to-purple-400',
  'AI': 'from-emerald-500 to-teal-400',
  'RPA': 'from-cyan-500 to-blue-400',
  '관리자': 'from-amber-500 to-orange-400',
  '보안': 'from-red-500 to-rose-400',
  '분석': 'from-orange-500 to-amber-400',
  '대시보드': 'from-teal-500 to-emerald-400',
};

const getIconForCategory = (category: string) => {
  if (category.includes('홈페이지') || category.includes('랜딩')) return ComputerDesktopIcon;
  if (category.includes('모바일') || category.includes('앱')) return DevicePhoneMobileIcon;
  if (category.includes('AI') || category.includes('RPA')) return CpuChipIcon;
  if (category.includes('관리자') || category.includes('보안')) return ShieldCheckIcon;
  if (category.includes('분석') || category.includes('대시보드')) return ChartBarIcon;
  if (category.includes('클라우드')) return CloudIcon;
  return ComputerDesktopIcon;
};

const getGradientForCategory = (category: string) => {
  for (const [key, value] of Object.entries(categoryGradients)) {
    if (category.includes(key)) return value;
  }
  return 'from-indigo-500 to-purple-400';
};

const ITEMS_PER_PAGE = 9;

export default function PortfolioSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [portfolioData, setPortfolioData] = useState<PortfolioItemWithIcon[]>([]);
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        const itemsWithIcons = data.portfolioItems.map((item: PortfolioItem) => ({
          ...item,
          icon: getIconForCategory(item.category),
          gradient: getGradientForCategory(item.category),
        }));
        setPortfolioData(itemsWithIcons);
        setCategories(data.categories || ['전체']);
        setLoading(false);
      })
      .catch((error) => {
        console.error('포트폴리오 데이터 로드 실패:', error);
        setLoading(false);
      });
  }, []);

  const filteredItems = selectedCategory === '전체'
    ? portfolioData
    : portfolioData.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-32 aurora-bg bg-white dark:bg-[#0d0d12] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">PORTFOLIO</span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text-primary">{t('portfolio.title')}</span>
          </h2>
          <p className="font-ui text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-transparent hover:border-gray-300 dark:hover:border-zinc-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center py-20">
              <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-500 dark:text-gray-500 text-sm">프로젝트를 불러오는 중...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {paginatedItems.map((item, index) => (
                <motion.article
                  key={`${selectedCategory}-${item.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group card-premium flex flex-col"
                >
                  {/* Card header with icon */}
                  <div className="relative z-10 h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <div className={`absolute top-4 right-4 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-full blur-2xl opacity-50`} />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-xl opacity-30" />
                    </div>
                    <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
                    {/* Category badge */}
                    <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-4">
                      {item.category}
                    </span>

                    <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-ui text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-400 dark:text-gray-500">
                          +{item.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6 flex-1">
                      {item.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                      {item.demoUrl ? (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                          {t('portfolio.liveDemo')}
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {t('portfolio.viewProject')}
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              이전
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 text-sm font-medium rounded-xl transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              다음
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {!loading && (
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-600">
            전체 {filteredItems.length}개 프로젝트 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)}개 표시
          </p>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl" />
            <div className="relative m-[1px] bg-gray-950 rounded-[calc(1.5rem-1px)] p-10 sm:p-16 text-center">
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                  다음 성공 사례의 주인공이 되어보세요
                </h3>
                <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
                  전문 컨설턴트와 함께 맞춤형 솔루션을 설계해보세요.
                </p>
                <motion.a
                  href="#contact"
                  className="btn-premium btn-primary !text-base !px-10 !py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  프로젝트 상담 받기
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
