'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  InformationCircleIcon, 
  ExclamationTriangleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const getToastIcon = (type: ToastType) => {
    const iconProps = { className: "w-6 h-6" };
    
    switch (type) {
      case 'success':
        return <CheckCircleIcon {...iconProps} className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircleIcon {...iconProps} className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon {...iconProps} className="w-6 h-6 text-yellow-500" />;
      case 'info':
      default:
        return <InformationCircleIcon {...iconProps} className="w-6 h-6 text-blue-500" />;
    }
  };

  const getToastColors = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800';
      case 'error':
        return 'from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-red-200 dark:border-red-800';
      case 'warning':
        return 'from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-200 dark:border-yellow-800';
      case 'info':
      default:
        return 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-20 right-6 z-[60] space-y-4 max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`bg-gradient-to-r ${getToastColors(toast.type)} backdrop-blur-xl border rounded-2xl p-4 shadow-xl`}
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {getToastIcon(toast.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-ui font-semibold text-gray-900 dark:text-white text-sm">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="mt-1 font-ui text-sm text-gray-600 dark:text-gray-300">
                      {toast.message}
                    </p>
                  )}
                </div>
                
                {/* Close Button */}
                <motion.button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 w-6 h-6 bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 rounded-full flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XMarkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};