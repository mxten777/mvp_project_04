'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-16">
        <div className="w-full h-px bg-blue-800/40 absolute left-0 z-10" style={{ top: '64px' }} />
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >


          {/* 메인 헤딩 */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            미래를 코딩하는
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              바이칼시스템즈
            </span>
          </h1>

          {/* 서브 헤딩 */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI와 RPA 기술로 비즈니스 프로세스를 혁신하고,
            <br className="hidden md:block" />
            공공데이터 활용으로 새로운 가치를 창출합니다
          </p>

          {/* 핵심 포인트 */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>업무 자동화 90% 향상</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>개발 비용 60% 절감</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>24/7 기술 지원</span>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              무료 상담 신청하기
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a 
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <PlayIcon className="mr-2 w-5 h-5" />
              서비스 소개 보기
            </motion.a>
          </div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
