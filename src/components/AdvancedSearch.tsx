'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useCMS, CMSContent, PortfolioItem, ServiceItem } from '@/lib/cms';

interface SearchFilters {
  query: string;
  type: 'all' | 'content' | 'portfolio' | 'services';
  category: string;
  tags: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  priceRange: {
    min: number;
    max: number;
  };
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'content' | 'portfolio' | 'service';
  category?: string;
  tags?: string[];
  url?: string;
  relevanceScore: number;
}

export default function AdvancedSearch() {
  const { content, portfolio, services } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: 'all',
    category: '',
    tags: [],
    dateRange: { start: null, end: null },
    priceRange: { min: 0, max: 10000000 }
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // 검색 로직 구현
  const searchResults = useMemo(() => {
    if (!filters.query.trim() && filters.type === 'all' && !filters.category && filters.tags.length === 0) {
      return [];
    }

    const allItems: SearchResult[] = [];

    // Content 검색
    if (filters.type === 'all' || filters.type === 'content') {
      content.forEach(item => {
        const relevanceScore = calculateRelevance(item.title + ' ' + item.content, filters.query);
        if (relevanceScore > 0 || matchesFilters(item, filters)) {
          allItems.push({
            id: item.id,
            title: item.title,
            description: item.content.substring(0, 150) + '...',
            type: 'content',
            category: item.type,
            tags: item.metadata.tags,
            relevanceScore
          });
        }
      });
    }

    // Portfolio 검색
    if (filters.type === 'all' || filters.type === 'portfolio') {
      portfolio.forEach(item => {
        const searchText = item.title + ' ' + item.description + ' ' + item.technologies.join(' ');
        const relevanceScore = calculateRelevance(searchText, filters.query);
        if (relevanceScore > 0 || matchesPortfolioFilters(item, filters)) {
          allItems.push({
            id: item.id,
            title: item.title,
            description: item.description,
            type: 'portfolio',
            category: item.category,
            tags: item.technologies,
            url: item.liveUrl,
            relevanceScore
          });
        }
      });
    }

    // Services 검색
    if (filters.type === 'all' || filters.type === 'services') {
      services.forEach(item => {
        const searchText = item.name + ' ' + item.description + ' ' + item.features.join(' ');
        const relevanceScore = calculateRelevance(searchText, filters.query);
        if (relevanceScore > 0 || matchesServiceFilters(item, filters)) {
          allItems.push({
            id: item.id,
            title: item.name,
            description: item.description,
            type: 'service',
            category: item.category,
            tags: item.features,
            relevanceScore
          });
        }
      });
    }

    // 관련성 점수로 정렬
    return allItems.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [content, portfolio, services, filters]);

  // 관련성 점수 계산
  const calculateRelevance = (text: string, query: string): number => {
    if (!query.trim()) return 0;
    
    const lowercaseText = text.toLowerCase();
    const lowercaseQuery = query.toLowerCase();
    const queryWords = lowercaseQuery.split(' ').filter(word => word.length > 0);
    
    let score = 0;
    
    queryWords.forEach(word => {
      // 정확한 단어 매치
      if (lowercaseText.includes(word)) {
        score += word.length;
      }
      
      // 단어의 시작 부분 매치
      const words = lowercaseText.split(' ');
      words.forEach(textWord => {
        if (textWord.startsWith(word)) {
          score += word.length * 0.8;
        }
      });
    });
    
    return score;
  };

  // 필터 매칭 함수들
  const matchesFilters = (item: CMSContent, filters: SearchFilters): boolean => {
    if (filters.category && item.type !== filters.category) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => item.metadata.tags.includes(tag))) return false;
    return true;
  };

  const matchesPortfolioFilters = (item: PortfolioItem, filters: SearchFilters): boolean => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => item.technologies.includes(tag))) return false;
    return true;
  };

  const matchesServiceFilters = (item: ServiceItem, filters: SearchFilters): boolean => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => item.features.includes(tag))) return false;
    return true;
  };

  // 사용 가능한 카테고리와 태그 추출
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    content.forEach(item => categories.add(item.type));
    portfolio.forEach(item => categories.add(item.category));
    services.forEach(item => categories.add(item.category));
    return Array.from(categories);
  }, [content, portfolio, services]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    content.forEach(item => item.metadata.tags.forEach(tag => tags.add(tag)));
    portfolio.forEach(item => item.technologies.forEach(tech => tags.add(tech)));
    services.forEach(item => item.features.forEach(feature => tags.add(feature)));
    return Array.from(tags);
  }, [content, portfolio, services]);

  return (
    <>
      {/* 검색 버튼 */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-20 z-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="w-6 h-6 text-white" />
      </motion.button>

      {/* 검색 모달 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* 검색 헤더 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">고급 검색</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* 검색 입력 */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="프로젝트, 서비스, 콘텐츠 검색..."
                    value={filters.query}
                    onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 필터 토글 */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    필터 {showFilters ? '숨기기' : '보기'}
                    <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    {searchResults.length}개 결과
                  </div>
                </div>

                {/* 고급 필터 */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 타입 필터 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            타입
                          </label>
                          <select
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as 'all' | 'content' | 'portfolio' | 'services' }))}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                          >
                            <option value="all">전체</option>
                            <option value="content">콘텐츠</option>
                            <option value="portfolio">포트폴리오</option>
                            <option value="services">서비스</option>
                          </select>
                        </div>

                        {/* 카테고리 필터 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            카테고리
                          </label>
                          <select
                            value={filters.category}
                            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                          >
                            <option value="">전체 카테고리</option>
                            {availableCategories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>

                        {/* 태그 필터 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            태그
                          </label>
                          <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                            {availableTags.slice(0, 10).map(tag => (
                              <button
                                key={tag}
                                onClick={() => {
                                  setFilters(prev => ({
                                    ...prev,
                                    tags: prev.tags.includes(tag)
                                      ? prev.tags.filter(t => t !== tag)
                                      : [...prev.tags, tag]
                                  }));
                                }}
                                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                  filters.tags.includes(tag)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 검색 결과 */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {searchResults.length === 0 && filters.query.trim() ? (
                  <div className="text-center py-8 text-gray-500">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <motion.div
                        key={`${result.type}-${result.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{result.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                result.type === 'content' ? 'bg-green-100 text-green-800' :
                                result.type === 'portfolio' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {result.type === 'content' ? '콘텐츠' : 
                                 result.type === 'portfolio' ? '포트폴리오' : '서비스'}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                              {result.description}
                            </p>
                            {result.tags && (
                              <div className="flex flex-wrap gap-1">
                                {result.tags.slice(0, 5).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="ml-4 text-right">
                            <div className="text-xs text-gray-500 mb-1">
                              관련성: {Math.round(result.relevanceScore)}%
                            </div>
                            {result.url && (
                              <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 text-sm"
                              >
                                보기 →
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}