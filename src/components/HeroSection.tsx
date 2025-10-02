'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <>
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-main-gradient dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pt-20 px-2 sm:px-0 transition-colors duration-500">
  <div className="w-full h-px bg-primary/40 dark:bg-primary-dark/40 absolute left-0 z-10" style={{ top: '64px' }} />
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
  <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cta opacity-20 blur-[100px] dark:bg-cta-dark"></div>
      </div>

  <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >


          {/* 메인 헤딩 */}
          <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] dark:text-white mb-3 xs:mb-4 sm:mb-6 leading-snug tracking-tight break-keep animate-fade-in">
            미래를 코딩하는
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-glow">
              바이칼시스템즈
            </span>
          </h1>

          {/* 서브 헤딩 */}
          <p className="font-sans text-sm xs:text-base sm:text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-4 xs:mb-6 sm:mb-8 max-w-xs xs:max-w-xl sm:max-w-3xl mx-auto leading-relaxed tracking-wide break-keep animate-slide-up">
            AI와 RPA 기술로 비즈니스 프로세스를 혁신하고,
            <br className="hidden md:block" />
            공공데이터 활용으로 새로운 가치를 창출합니다
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
              className="group inline-flex items-center px-7 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold rounded-cta shadow-glow hover:shadow-xl hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 min-w-[140px] xs:min-w-[160px] text-base xs:text-lg transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              무료 상담 신청하기
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="https://mxten-project-15-ezkblpkbo-dongyeol-jungs-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-7 xs:px-8 py-3 xs:py-4 bg-white/10 dark:bg-white/5 backdrop-blur-lg text-white font-semibold rounded-cta border border-white/30 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[140px] xs:min-w-[160px] text-base xs:text-lg transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon className="mr-2 w-5 h-5" />
              서비스 소개 보기
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
      </div>
    </section>
    </>
  );
}
