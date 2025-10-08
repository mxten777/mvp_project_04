'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  // Hook을 조건부가 아닌 최상단에서 호출
  let theme = 'light';
  let toggleTheme = () => {};
  let hasThemeProvider = true;
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch {
    hasThemeProvider = false;
  }
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트되지 않았거나 ThemeProvider가 없는 경우
  if (!mounted || !hasThemeProvider) {
    return (
      <motion.button
        className="fixed top-6 right-20 z-40 w-12 h-12 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <SunIcon className="h-5 w-5 text-gray-600" />
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-20 z-40 w-12 h-12 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-700/50 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SunIcon className="w-6 h-6 text-yellow-600" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MoonIcon className="w-6 h-6 text-indigo-400" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"></div>
    </motion.button>
  );
}