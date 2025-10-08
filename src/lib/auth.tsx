'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

// 사용자 타입 정의
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  permissions: string[];
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock 사용자 데이터 - 실제로는 API에서 가져옴
const mockUsers: { [email: string]: { password: string; user: User } } = {
  'admin@baikal-systems.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@baikal-systems.com',
      name: 'System Administrator',
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      lastLogin: new Date()
    }
  },
  'editor@baikal-systems.com': {
    password: 'editor123',
    user: {
      id: '2',
      email: 'editor@baikal-systems.com',
      name: 'Content Editor',
      role: 'editor',
      permissions: ['read', 'write'],
      lastLogin: new Date()
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 인증 상태 확인
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('baikal-auth-token');
      const userData = localStorage.getItem('baikal-user-data');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem('baikal-auth-token');
          localStorage.removeItem('baikal-user-data');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = mockUsers[email];
      if (mockUser && mockUser.password === password) {
        const token = generateMockToken();
        const userData = { ...mockUser.user, lastLogin: new Date() };
        
        localStorage.setItem('baikal-auth-token', token);
        localStorage.setItem('baikal-user-data', JSON.stringify(userData));
        setUser(userData);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('baikal-auth-token');
    localStorage.removeItem('baikal-user-data');
    setUser(null);
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 이메일 중복 체크
      if (mockUsers[email]) {
        return false;
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'viewer',
        permissions: ['read'],
        lastLogin: new Date()
      };
      
      const token = generateMockToken();
      localStorage.setItem('baikal-auth-token', token);
      localStorage.setItem('baikal-user-data', JSON.stringify(newUser));
      setUser(newUser);
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('baikal-user-data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    hasPermission,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock JWT 토큰 생성
function generateMockToken(): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24시간
    iat: Math.floor(Date.now() / 1000),
    sub: 'user'
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
}

// 로그인 모달 컴포넌트
export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      
      const result = await register(formData.name, formData.email, formData.password);
      if (result) {
        setSuccess('회원가입이 완료되었습니다!');
        setTimeout(() => onClose(), 1500);
      } else {
        setError('이미 존재하는 이메일입니다.');
      }
    } else {
      const result = await login(formData.email, formData.password);
      if (result) {
        setSuccess('로그인 성공!');
        setTimeout(() => onClose(), 1500);
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mode === 'login' ? '로그인' : '회원가입'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {mode === 'login' ? '계정에 로그인하세요' : '새 계정을 생성하세요'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 text-sm">{success}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      이름
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="이름을 입력하세요"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="이메일을 입력하세요"
                      required
                    />
                  </div>
                  {mode === 'login' && (
                    <p className="text-xs text-gray-500 mt-1">
                      테스트용: admin@baikal-systems.com / admin123
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      비밀번호 확인
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="비밀번호를 다시 입력하세요"
                        required
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      {mode === 'login' ? '로그인' : '회원가입'}
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  {mode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}