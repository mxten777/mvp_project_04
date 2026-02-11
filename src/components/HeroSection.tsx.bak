'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import ParticleBackground from './ParticleBackground';
import AnimatedElement from './AnimatedElement';
import FloatingElement from './FloatingElement';
import { useLanguage } from '@/lib/i18n';

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <>
  <section data-hero-bleed className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-2 sm:px-0 pt-32 sm:pt-36 lg:pt-40 transition-colors duration-500">
  <div className="w-full h-px bg-primary/40 dark:bg-primary-dark/40 absolute left-0 z-10" style={{ top: 'var(--app-header-h)' }} />
      
      {/* 인터랙티브 파티클 배경 */}
      <ParticleBackground className="z-0" />
      
      {/* 고급 배경 애니메이션 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        {/* 플로팅 그라디언트 구체들 */}
        <FloatingElement duration={6} amplitude={30} className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
        </FloatingElement>
        
        <FloatingElement duration={8} amplitude={25} className="absolute top-40 right-20">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
        </FloatingElement>
        
        <FloatingElement duration={7} amplitude={35} className="absolute bottom-32 left-20">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
        </FloatingElement>
        
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 opacity-40 blur-[120px] animate-pulse"></div>
      </div>

  <div className="relative z-20 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedElement animation="fadeInUp" duration={1.2} delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >


          {/* Kicker - 가볍고 우아한 상단 레이블 */}
          <span className="inline-block font-light text-xs xs:text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase text-blue-200/80 dark:text-blue-200/70 mb-4 sm:mb-6 font-ui animate-fade-in">
            Next Generation
          </span>

          {/* 메인 헤드라인 - 엔터프라이즈급 타이포그래피 */}
          <h1 className="font-brand text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] dark:text-white mb-10 sm:mb-12 lg:mb-16 leading-[1.25] sm:leading-[1.3] tracking-[-0.02em] break-keep animate-fade-in">
            {t('hero.title')}
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-cyan-100 to-blue-200 bg-clip-text text-transparent font-black tracking-[-0.03em]">
              바이칼시스템즈
            </span>
          </h1>

          {/* 슬로건 - 독립된 선언문 위계 */}
          <p className="font-heading text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 dark:text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-xs xs:max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-[1.6] tracking-[-0.01em] break-keep font-semibold animate-slide-up">
            {t('hero.subtitle')}
          </p>

          {/* 설명 - 신뢰감 중심의 여유로운 레이아웃 */}
          <p className="font-ui text-sm xs:text-base sm:text-lg md:text-xl text-slate-200/90 dark:text-slate-300/80 mb-12 sm:mb-14 lg:mb-16 max-w-[280px] xs:max-w-md sm:max-w-xl lg:max-w-2xl mx-auto leading-[1.7] sm:leading-[1.75] tracking-normal break-keep font-normal">
            {t('hero.description')}
          </p>

          {/* 핵심 포인트 - 시각적 분리 강화 */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 xs:gap-4 sm:gap-8 mb-14 sm:mb-16 lg:mb-20 text-xs xs:text-sm sm:text-base text-slate-100/90 dark:text-slate-200/80 items-center animate-fade-in">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium tracking-tight">업무 자동화 90% 향상</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium tracking-tight">개발 비용 60% 절감</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <div className="w-2 h-2 bg-sky-400 dark:bg-sky-500 rounded-full"></div>
              <span className="font-medium tracking-tight">24/7 기술 지원</span>
            </div>
          </div>

          {/* CTA 버튼 - 엔터프라이즈급 절제된 디자인 */}
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-5 justify-center items-center w-full">
            {/* Primary CTA - 신뢰 중심의 차분한 강조 */}
            <motion.a 
              href="#contact"
              className="group relative inline-flex items-center justify-center px-7 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-4.5 bg-blue-600 dark:bg-blue-500 text-white font-ui font-semibold rounded-xl shadow-lg shadow-blue-600/25 dark:shadow-blue-500/20 hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 min-w-[200px] xs:min-w-[220px] sm:min-w-[240px] text-sm xs:text-base lg:text-lg tracking-tight border border-blue-500/20 dark:border-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('hero.cta.primary')}</span>
              <ArrowRightIcon className="ml-2.5 w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
              {/* 미묘한 반짝임 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </motion.a>
            
            {/* Secondary CTA - 정제된 유리형태론 */}
            <motion.a 
              href="https://mxten-project-15.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-7 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-4.5 bg-white/5 dark:bg-white/5 backdrop-blur-md text-white font-ui font-medium rounded-xl border border-white/10 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/20 dark:hover:border-white/20 transition-all duration-300 min-w-[200px] xs:min-w-[220px] sm:min-w-[240px] text-sm xs:text-base lg:text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlayIcon className="mr-2.5 w-4 h-4 xs:w-5 xs:h-5" />
              <span>{t('hero.cta.secondary')}</span>
            </motion.a>
          </div>
          {/* 아래로 스크롤 유도 애니메이션 */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-4 sm:bottom-8"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 dark:border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 dark:bg-white/30 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
        </AnimatedElement>
      </div>
    </section>
    </>
  );
}
