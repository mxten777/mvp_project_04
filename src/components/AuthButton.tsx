'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, LogOut, User } from 'lucide-react';
import { useAuth, LoginModal } from '@/lib/auth';

export default function AuthButton() {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm">
          <User className="w-4 h-4" />
          <span>{user.name}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            user.role === 'admin' ? 'bg-red-500' :
            user.role === 'editor' ? 'bg-yellow-500' : 'bg-green-500'
          }`}>
            {user.role.toUpperCase()}
          </span>
        </div>
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
        >
          <LogOut className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setShowLoginModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
      >
        <Shield className="w-4 h-4" />
        <span className="text-sm font-medium">로그인</span>
      </motion.button>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}