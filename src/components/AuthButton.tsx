'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, LogOut, User } from 'lucide-react';
import { useAuth, LoginModal } from '@/lib/auth';
import { useLanguage } from '@/lib/i18n';

interface AuthButtonProps {
  mobile?: boolean;
}

export default function AuthButton({ mobile = false }: AuthButtonProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { t } = useLanguage();

  if (isAuthenticated && user) {
    return (
      <div className={`flex items-center gap-2 ${mobile ? 'w-full' : ''}`}>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
          mobile
            ? 'bg-gray-50 dark:bg-[#1a2540] text-gray-700 dark:text-gray-200 flex-1'
            : 'text-white/70 border border-white/[0.08]'
        }`}>
          <User className="w-3.5 h-3.5" />
          <span className="truncate">{user.name}</span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
            user.role === 'admin' ? 'bg-red-500/80 text-white' :
            user.role === 'editor' ? 'bg-yellow-500/80 text-white' : 'bg-green-500/80 text-white'
          }`}>
            {user.role}
          </span>
        </div>
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg transition-colors duration-200 shrink-0 ${
            mobile
              ? 'text-gray-400 hover:text-red-500'
              : 'text-white/40 hover:text-white/70'
          }`}
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  /* ── Mobile login button ── */
  if (mobile) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#253555] hover:bg-gray-50 dark:hover:bg-[#1a2540] transition-colors"
        >
          <Shield className="w-4 h-4" />
          {t('common.login')}
        </button>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    );
  }

  /* ── Desktop: ghost / outline button — 4th visual priority ── */
  return (
    <>
      <button
        onClick={() => setShowLoginModal(true)}
        className="text-[13px] font-medium text-white/45 hover:text-white/75 transition-colors duration-200 px-3 py-1.5 rounded border border-white/[0.08] hover:border-white/[0.15]"
      >
        {t('common.login')}
      </button>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}