'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Zap, Clock, TrendingUp, X } from 'lucide-react';

// Performance 메트릭 타입 정의
interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  
  // Custom Metrics
  pageLoadTime: number;
  domContentLoaded: number;
  memoryUsage: number;
  connectionType: string;
}

interface ErrorReport {
  id: string;
  message: string;
  stack: string;
  timestamp: Date;
  url: string;
  userAgent: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

interface MonitoringContextType {
  metrics: PerformanceMetrics | null;
  errors: ErrorReport[];
  isMonitoringEnabled: boolean;
  toggleMonitoring: () => void;
  reportError: (error: Error, severity?: ErrorReport['severity']) => void;
  clearErrors: () => void;
  getPerformanceScore: () => number;
}

const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export function MonitoringProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [errors, setErrors] = useState<ErrorReport[]>([]);
  const [isMonitoringEnabled, setIsMonitoringEnabled] = useState(true);

  // Performance Observer 설정
  useEffect(() => {
    if (!isMonitoringEnabled) return;

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const newMetrics: PerformanceMetrics = {
          lcp: 0, // Will be updated by LCP observer
          fid: 0, // Will be updated by FID observer
          cls: 0, // Will be updated by CLS observer
          fcp: navigation.responseStart - navigation.fetchStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          memoryUsage: (performance as typeof performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0,
          connectionType: (navigator as typeof navigator & { connection?: { effectiveType: string } }).connection?.effectiveType || 'unknown'
        };
        
        setMetrics(newMetrics);
      }
    };

    // Core Web Vitals 관찰자들
    if ('PerformanceObserver' in window) {
      // LCP Observer
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => prev ? { ...prev, lcp: lastEntry.startTime } : null);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID Observer
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            const firstInputEntry = entry as PerformanceEntry & { processingStart?: number };
            if (firstInputEntry.processingStart) {
              setMetrics(prev => prev ? { ...prev, fid: firstInputEntry.processingStart! - entry.startTime } : null);
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS Observer
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          entryList.getEntries().forEach(entry => {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value || 0;
            }
          });
          setMetrics(prev => prev ? { ...prev, cls: clsValue } : null);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance Observer not fully supported:', error);
      }
    }

    // 초기 메트릭 수집
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => {
      window.removeEventListener('load', collectMetrics);
    };
  }, [isMonitoringEnabled]);

  // 글로벌 에러 핸들링
  useEffect(() => {
    if (!isMonitoringEnabled) return;

    const handleError = (event: ErrorEvent) => {
      reportError(new Error(event.message), 'high');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportError(new Error(`Unhandled Promise Rejection: ${event.reason}`), 'medium');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [isMonitoringEnabled]);

  const reportError = (error: Error, severity: ErrorReport['severity'] = 'medium') => {
    const errorReport: ErrorReport = {
      id: Date.now().toString(),
      message: error.message,
      stack: error.stack || '',
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      severity,
      resolved: false
    };

    setErrors(prev => [errorReport, ...prev.slice(0, 49)]); // 최대 50개 에러 보관

    // 실제로는 에러 리포팅 서비스로 전송
    console.error('Error reported:', errorReport);
  };

  const toggleMonitoring = () => {
    setIsMonitoringEnabled(prev => !prev);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const getPerformanceScore = (): number => {
    if (!metrics) return 0;

    let score = 100;
    
    // LCP 점수 (2.5초 이하가 좋음)
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;
    
    // FID 점수 (100ms 이하가 좋음)
    if (metrics.fid > 300) score -= 25;
    else if (metrics.fid > 100) score -= 10;
    
    // CLS 점수 (0.1 이하가 좋음)
    if (metrics.cls > 0.25) score -= 25;
    else if (metrics.cls > 0.1) score -= 10;
    
    // 페이지 로드 시간 (3초 이하가 좋음)
    if (metrics.pageLoadTime > 5000) score -= 20;
    else if (metrics.pageLoadTime > 3000) score -= 10;

    return Math.max(0, score);
  };

  const value: MonitoringContextType = {
    metrics,
    errors,
    isMonitoringEnabled,
    toggleMonitoring,
    reportError,
    clearErrors,
    getPerformanceScore
  };

  return (
    <MonitoringContext.Provider value={value}>
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (context === undefined) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
}

// Performance Dashboard 컴포넌트
export function PerformanceDashboard() {
  const { metrics, errors, isMonitoringEnabled, toggleMonitoring, clearErrors, getPerformanceScore } = useMonitoring();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'errors'>('metrics');

  const performanceScore = getPerformanceScore();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };



  return (
    <>
      {/* Performance Monitor Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Activity className="w-6 h-6 text-white" />
        {errors.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {errors.length}
          </div>
        )}
      </motion.button>

      {/* Performance Dashboard Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="min-h-screen p-4 flex items-center justify-center"
            >
              <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-8 h-8 text-blue-500" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">성능 모니터링</h2>
                        <p className="text-gray-600 dark:text-gray-400">실시간 성능 메트릭 및 오류 추적</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Performance Score */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${performanceScore}, 100`}
                            className={getScoreColor(performanceScore)}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-lg font-bold ${getScoreColor(performanceScore)}`}>
                            {performanceScore}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">성능 점수</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {performanceScore >= 90 ? '우수' : performanceScore >= 70 ? '보통' : '개선 필요'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleMonitoring}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isMonitoringEnabled
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {isMonitoringEnabled ? '모니터링 ON' : '모니터링 OFF'}
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mt-6 flex border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setActiveTab('metrics')}
                      className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                        activeTab === 'metrics'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                      }`}
                    >
                      성능 메트릭
                    </button>
                    <button
                      onClick={() => setActiveTab('errors')}
                      className={`px-4 py-2 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                        activeTab === 'errors'
                          ? 'border-red-500 text-red-600 dark:text-red-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                      }`}
                    >
                      오류 로그
                      {errors.length > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {errors.length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {activeTab === 'metrics' ? (
                    <div className="space-y-6">
                      {metrics ? (
                        <>
                          {/* Core Web Vitals */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              Core Web Vitals
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Zap className="w-5 h-5 text-yellow-500" />
                                  <span className="font-medium">LCP</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {(metrics.lcp / 1000).toFixed(2)}s
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Largest Contentful Paint
                                </p>
                              </div>

                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-5 h-5 text-blue-500" />
                                  <span className="font-medium">FID</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {metrics.fid.toFixed(0)}ms
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  First Input Delay
                                </p>
                              </div>

                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="w-5 h-5 text-green-500" />
                                  <span className="font-medium">CLS</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {metrics.cls.toFixed(3)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Cumulative Layout Shift
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Additional Metrics */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                              추가 메트릭
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="font-medium text-gray-900 dark:text-white mb-1">페이지 로드 시간</p>
                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                  {(metrics.pageLoadTime / 1000).toFixed(2)}s
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="font-medium text-gray-900 dark:text-white mb-1">TTFB</p>
                                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                  {metrics.ttfb.toFixed(0)}ms
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="font-medium text-gray-900 dark:text-white mb-1">메모리 사용량</p>
                                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                                  {(metrics.memoryUsage / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="font-medium text-gray-900 dark:text-white mb-1">연결 타입</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                  {metrics.connectionType}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          성능 데이터를 수집 중입니다...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          오류 로그 ({errors.length})
                        </h3>
                        {errors.length > 0 && (
                          <button
                            onClick={clearErrors}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                          >
                            모든 오류 지우기
                          </button>
                        )}
                      </div>

                      {errors.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          기록된 오류가 없습니다.
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {errors.map(error => (
                            <div
                              key={error.id}
                              className={`p-4 rounded-lg border ${
                                error.severity === 'critical'
                                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                  : error.severity === 'high'
                                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                  : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                                  error.severity === 'critical'
                                    ? 'text-red-500'
                                    : error.severity === 'high'
                                    ? 'text-orange-500'
                                    : 'text-yellow-500'
                                }`} />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {error.message}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {error.timestamp.toLocaleString()}
                                  </p>
                                  <div className="mt-2">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                      error.severity === 'critical'
                                        ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                                        : error.severity === 'high'
                                        ? 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200'
                                        : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                                    }`}>
                                      {error.severity.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}