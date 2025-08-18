'use client';


import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navigation = [
  { name: '홈', href: '#home' },
  { name: '서비스', href: '#services' },
  { name: '솔루션', href: '#about' },
  { name: '포트폴리오', href: '#portfolio' },
  { name: '문의하기', href: '#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header 
  className="fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 h-16 shadow-md border-b border-blue-800/40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center lg:flex-1 pl-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="#home" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center" style={{ width: '140px', height: '32px' }}>
                  <Image
                    src="/images/baikal_logo.png"
                    alt="바이칼시스템즈 로고"
                    width={140}
                    height={32}
                    className="object-contain"
                    style={{ maxHeight: '48px', width: 'auto', objectFit: 'contain', display: 'block' }}
                    priority
                  />
                </div>
                <span
                  className="ml-3 text-xl font-extrabold tracking-tight text-white whitespace-nowrap hidden sm:inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                  style={{ letterSpacing: '0.01em' }}
                >
                  (주)바이칼시스템즈
                </span>
              </div>
            </Link>
          </motion.div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 transition-all duration-300 hover:scale-105 text-white hover:text-blue-200"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료 상담
            </motion.a>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="#home" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-gray-900">바이칼시스템즈</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#contact"
                      className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-center text-sm font-semibold text-white block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      무료 상담 신청
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
