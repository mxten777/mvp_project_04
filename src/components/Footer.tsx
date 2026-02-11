'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const navigation = {
  services: [
    { name: '바이브코딩 솔루션', href: '#services' },
    { name: 'RPA 업무 자동화', href: '#services' },
    { name: '공공데이터 API', href: '#services' },
    { name: '헬스케어 솔루션', href: '#services' },
  ],
  company: [
    { name: '회사 소개', href: '#about' },
    { name: '서비스', href: '#services' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '문의하기', href: '#contact' },
  ],
};

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'Python', 'AI/ML', 'RPA', 'Cloud',
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-950 border-t border-white/5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Tech Stack Marquee */}
      <div className="border-b border-white/5 py-5">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="text-sm font-mono text-gray-600 flex items-center gap-3">
                {tech}
                <span className="w-1 h-1 rounded-full bg-gray-700" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/baikal_logo_white.png"
                alt="바이칼시스템즈 로고"
                width={100}
                height={30}
                className="object-contain opacity-90"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI와 RPA 기술로 미래를 코딩하는 차세대 디지털 혁신 파트너
            </p>
            <div className="space-y-2.5 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <span className="text-gray-600">📞</span> 010-2380-4691
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-600">✉️</span> jngdy@baikalsys.kr
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-600">📍</span> 서울특별시 강남구 역삼로 138
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">서비스</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">회사</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">뉴스레터</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              최신 기술 트렌드와 솔루션 소식을 받아보세요.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
                구독
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2003-{new Date().getFullYear()} (주) 바이칼시스템즈. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-700">Powered by</span>
            <span className="text-xs font-semibold gradient-text-primary">VIBE CODING</span>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/20 hover:border-white/20 flex items-center justify-center shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
