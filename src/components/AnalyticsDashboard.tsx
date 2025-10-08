'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  X,
  LucideIcon
} from 'lucide-react';

interface AnalyticsData {
  pageViews: {
    total: number;
    today: number;
    change: number;
  };
  users: {
    total: number;
    active: number;
    change: number;
  };
  engagement: {
    avgSessionDuration: number;
    bounceRate: number;
    clickThroughRate: number;
  };
  traffic: {
    source: string;
    visitors: number;
    percentage: number;
  }[];
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  realTimeUsers: number;
}

interface ChartData {
  name: string;
  views: number;
  users: number;
  engagement: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: { total: 15420, today: 1240, change: 12.5 },
    users: { total: 8930, active: 324, change: 8.2 },
    engagement: { avgSessionDuration: 4.2, bounceRate: 32.1, clickThroughRate: 2.8 },
    traffic: [
      { source: 'Organic Search', visitors: 4520, percentage: 45.2 },
      { source: 'Direct', visitors: 2890, percentage: 28.9 },
      { source: 'Social Media', visitors: 1650, percentage: 16.5 },
      { source: 'Email', visitors: 940, percentage: 9.4 }
    ],
    deviceStats: { desktop: 6234, mobile: 7892, tablet: 1294 },
    realTimeUsers: 47
  });

  const [chartData] = useState<ChartData[]>([
    { name: '월', views: 4000, users: 2400, engagement: 2400 },
    { name: '화', views: 3000, users: 1398, engagement: 2210 },
    { name: '수', views: 2000, users: 9800, engagement: 2290 },
    { name: '목', views: 2780, users: 3908, engagement: 2000 },
    { name: '금', views: 1890, users: 4800, engagement: 2181 },
    { name: '토', views: 2390, users: 3800, engagement: 2500 },
    { name: '일', views: 3490, users: 4300, engagement: 2100 }
  ]);

  // 실시간 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        realTimeUsers: Math.floor(Math.random() * 100) + 20,
        pageViews: {
          ...prev.pageViews,
          today: prev.pageViews.today + Math.floor(Math.random() * 5)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: string | number;
    change: number;
    icon: LucideIcon;
    color: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 mr-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-1">이번 주</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* 대시보드 버튼 */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BarChart className="w-6 h-6 text-white" />
      </motion.button>

      {/* 대시보드 모달 */}
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
            <div className="w-full max-w-7xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
              {/* 헤더 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">실시간 분석</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      웹사이트 성능 및 사용자 행동 분석
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* 실시간 사용자 */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    실시간 사용자: <span className="font-semibold text-green-600">{analyticsData.realTimeUsers}</span>
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* 주요 지표 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    title="총 페이지뷰"
                    value={analyticsData.pageViews.total.toLocaleString()}
                    change={analyticsData.pageViews.change}
                    icon={Eye}
                    color="bg-blue-500"
                  />
                  <StatCard
                    title="총 사용자"
                    value={analyticsData.users.total.toLocaleString()}
                    change={analyticsData.users.change}
                    icon={Users}
                    color="bg-green-500"
                  />
                  <StatCard
                    title="평균 세션 시간"
                    value={`${analyticsData.engagement.avgSessionDuration}분`}
                    change={5.2}
                    icon={Clock}
                    color="bg-purple-500"
                  />
                  <StatCard
                    title="이탈률"
                    value={`${analyticsData.engagement.bounceRate}%`}
                    change={-2.1}
                    icon={MousePointer}
                    color="bg-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* 트래픽 트렌드 차트 */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      주간 트래픽 트렌드
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          stackId="1" 
                          stroke="#8884d8" 
                          fill="#8884d8" 
                          fillOpacity={0.6}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stackId="1" 
                          stroke="#82ca9d" 
                          fill="#82ca9d" 
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 트래픽 소스 */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      트래픽 소스
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analyticsData.traffic}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="visitors"
                        >
                          {analyticsData.traffic.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 디바이스 통계 */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      디바이스별 접속
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Monitor className="w-5 h-5 text-blue-500" />
                          <span className="text-gray-700 dark:text-gray-300">데스크톱</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {analyticsData.deviceStats.desktop.toLocaleString()}
                          </span>
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ 
                                width: `${(analyticsData.deviceStats.desktop / (analyticsData.deviceStats.desktop + analyticsData.deviceStats.mobile + analyticsData.deviceStats.tablet)) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">모바일</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {analyticsData.deviceStats.mobile.toLocaleString()}
                          </span>
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ 
                                width: `${(analyticsData.deviceStats.mobile / (analyticsData.deviceStats.desktop + analyticsData.deviceStats.mobile + analyticsData.deviceStats.tablet)) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">태블릿</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {analyticsData.deviceStats.tablet.toLocaleString()}
                          </span>
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-purple-500 rounded-full"
                              style={{ 
                                width: `${(analyticsData.deviceStats.tablet / (analyticsData.deviceStats.desktop + analyticsData.deviceStats.mobile + analyticsData.deviceStats.tablet)) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 성능 지표 */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      성능 지표
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">페이지 로드 시간</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">1.2초</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">사용자 만족도</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">92%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">전환율</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">3.8%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 최근 활동 */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      최근 활동
                    </h3>
                    <div className="space-y-3">
                      {[
                        { action: '새 프로젝트 문의', time: '2분 전', type: 'message' },
                        { action: '포트폴리오 페이지 방문', time: '5분 전', type: 'view' },
                        { action: '서비스 문의 양식 제출', time: '12분 전', type: 'form' },
                        { action: '블로그 글 공유', time: '18분 전', type: 'share' },
                        { action: '새 사용자 가입', time: '25분 전', type: 'user' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'message' ? 'bg-blue-500' :
                            activity.type === 'view' ? 'bg-green-500' :
                            activity.type === 'form' ? 'bg-purple-500' :
                            activity.type === 'share' ? 'bg-orange-500' :
                            'bg-pink-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}