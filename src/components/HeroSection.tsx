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
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pt-20 px-2 sm:px-0 transition-colors duration-500">
  <div className="w-full h-px bg-primary/40 dark:bg-primary-dark/40 absolute left-0 z-10" style={{ top: '64px' }} />
      
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


          {/* 메인 헤딩 - 최고급 타이포그래피 */}
          <h1 className="font-brand text-2xl xs:text-3xl sm:text-display-xs md:text-display-md lg:text-display-lg font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:text-white mb-3 xs:mb-4 sm:mb-6 leading-none tracking-tighter break-keep animate-fade-in">
            <span className="block font-light text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider text-blue-100 mb-2 font-ui">
              NEXT GENERATION
            </span>
            {t('hero.title')}
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-glow font-black tracking-tightest">
              바이칼시스템즈
            </span>
          </h1>

          {/* 서브 헤딩 - 전문적 타이포그래피 */}
          <p className="font-heading text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-100 dark:text-slate-200 mb-4 xs:mb-6 sm:mb-8 max-w-xs xs:max-w-xl sm:max-w-4xl lg:max-w-5xl mx-auto leading-relaxed tracking-wide break-keep animate-slide-up font-medium">
            {t('hero.subtitle')}
            <br className="hidden md:block" />
            {t('hero.description')}
          </p>

          {/* 핵심 포인트 */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 xs:gap-3 sm:gap-6 mb-6 xs:mb-8 sm:mb-12 text-gray-200 dark:text-gray-300 items-center animate-fade-in">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">업무 자동화 90% 향상</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-medium">개발 비용 60% 절감</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"></div>
              <span>24/7 기술 지원</span>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center items-center w-full">
            <motion.a 
              href="#contact"
              className="group inline-flex items-center px-7 xs:px-8 py-4 xs:py-5 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-ui font-bold rounded-cta shadow-glow hover:shadow-xl hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 min-w-[160px] xs:min-w-[180px] text-base xs:text-lg lg:text-xl transform hover:scale-105 active:scale-95 tracking-tight"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.cta.primary')}
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="https://baikalsys.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-7 xs:px-8 py-4 xs:py-5 bg-white/10 dark:bg-white/5 backdrop-blur-lg text-white font-ui font-semibold rounded-cta border border-white/30 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[160px] xs:min-w-[180px] text-base xs:text-lg lg:text-xl transform hover:scale-105 active:scale-95 tracking-tight"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon className="mr-2 w-5 h-5" />
              {t('hero.cta.secondary')}
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
