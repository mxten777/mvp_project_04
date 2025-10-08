'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor, Wifi, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'installed'>('idle');

  useEffect(() => {
    // PWA 설치 가능 이벤트 리스너
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // 앱 설치 완료 이벤트
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallState('installed');
      setShowInstallPrompt(false);
      console.log('PWA was installed');
    };

    // 온라인/오프라인 상태 감지
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 초기 온라인 상태 체크
    setIsOnline(navigator.onLine);

    // 이미 설치된 앱인지 확인
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      setInstallState('installed');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setInstallState('installing');
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setInstallState('installed');
      } else {
        console.log('User dismissed the install prompt');
        setInstallState('idle');
      }
    } catch (error) {
      console.error('Error during installation:', error);
      setInstallState('idle');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
  };

  // 오프라인 상태 표시
  const OfflineIndicator = () => (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 left-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <WifiOff className="w-4 h-4" />
          <span className="text-sm">오프라인 모드</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <OfflineIndicator />
      
      {/* 온라인 상태 표시 */}
      <div className="fixed top-4 left-4 z-40">
        <motion.div
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
            isOnline 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
          animate={{ 
            scale: isOnline ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {isOnline ? '온라인' : '오프라인'}
        </motion.div>
      </div>

      {/* PWA 설치 프롬프트 */}
      <AnimatePresence>
        {showInstallPrompt && !isInstalled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        앱 설치
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        더 빠른 접근을 위해 설치하세요
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={dismissPrompt}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                    <span>홈 화면에서 바로 접근</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Monitor className="w-5 h-5 text-green-500" />
                    <span>더 빠른 로딩 속도</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <WifiOff className="w-5 h-5 text-purple-500" />
                    <span>오프라인에서도 이용 가능</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={dismissPrompt}
                    className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    나중에
                  </button>
                  <motion.button
                    onClick={handleInstallClick}
                    disabled={installState === 'installing'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {installState === 'installing' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        설치 중...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        설치하기
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 설치 완료 알림 */}
      <AnimatePresence>
        {installState === 'installed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium">설치 완료!</p>
              <p className="text-sm opacity-90">이제 홈 화면에서 앱에 접근할 수 있습니다.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}