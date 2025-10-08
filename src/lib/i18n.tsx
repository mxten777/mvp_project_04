'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

type Language = 'ko' | 'en' | 'ja';

interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextType {
  currentLanguage: Language;
  translations: Translation;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translation> = {
  ko: {
    common: {
      home: "홈",
      about: "회사소개", 
      services: "서비스",
      portfolio: "포트폴리오",
      contact: "연락처",
      language: "언어",
      theme: "테마",
      search: "검색",
      menu: "메뉴",
      close: "닫기",
      loading: "로딩중...",
      error: "오류",
      success: "성공"
    },
    hero: {
      title: "혁신적인 IT 솔루션으로",
      subtitle: "비즈니스의 미래를 설계합니다",
      description: "최첨단 기술과 전문성으로 클라우드, AI, 블록체인 분야의 최고 수준 솔루션을 제공합니다.",
      cta: {
        primary: "프로젝트 시작하기",
        secondary: "서비스 둘러보기"
      }
    },
    services: {
      title: "전문 서비스",
      subtitle: "맞춤형 IT 솔루션",
      ai: {
        title: "AI 기반 자동화",
        description: "최첨단 AI 기술로 반복 업무를 자동화하고 생산성을 극대화합니다."
      },
      cloud: {
        title: "클라우드 인프라",
        description: "확장 가능하고 안전한 클라우드 환경 구축 및 관리 서비스를 제공합니다."
      },
      blockchain: {
        title: "블록체인 솔루션",
        description: "분산 원장 기술을 통한 보안 강화 및 투명한 거래 시스템을 구축합니다."
      },
      consulting: {
        title: "IT 컨설팅",
        description: "전략적 기술 자문 및 디지털 전환 가이드를 제공합니다."
      }
    },
    about: {
      title: "회사 소개",
      subtitle: "미래를 선도하는 AI 기반 솔루션으로 디지털 혁신을 이끌어갑니다.",
      values: {
        innovation: "혁신",
        excellence: "전문성", 
        collaboration: "협력",
        integrity: "성장"
      }
    },
    portfolio: {
      title: "포트폴리오", 
      subtitle: "다양한 분야에서 축적한 전문성과 혁신적인 솔루션을 확인해보세요."
    },
    contact: {
      title: "프로젝트 상담 신청",
      subtitle: "프로젝트를 함께 시작해보세요"
    }
  },
  en: {
    common: {
      home: "Home",
      about: "About",
      services: "Services", 
      portfolio: "Portfolio",
      contact: "Contact",
      language: "Language",
      theme: "Theme",
      search: "Search",
      menu: "Menu",
      close: "Close",
      loading: "Loading...",
      error: "Error",
      success: "Success"
    },
    hero: {
      title: "Innovative IT Solutions",
      subtitle: "Designing the Future of Business",
      description: "We provide top-tier solutions in cloud, AI, and blockchain technologies with cutting-edge technology and expertise.",
      cta: {
        primary: "Start Your Project",
        secondary: "Explore Services"
      }
    },
    services: {
      title: "Professional Services",
      subtitle: "Customized IT Solutions",
      ai: {
        title: "AI-Based Automation",
        description: "Maximize productivity by automating repetitive tasks with cutting-edge AI technology."
      },
      cloud: {
        title: "Cloud Infrastructure", 
        description: "Provide scalable and secure cloud environment construction and management services."
      },
      blockchain: {
        title: "Blockchain Solutions",
        description: "Build secure and transparent transaction systems through distributed ledger technology."
      },
      consulting: {
        title: "IT Consulting",
        description: "Provide strategic technology consulting and digital transformation guidance."
      }
    },
    about: {
      title: "About Us", 
      subtitle: "Leading digital innovation with AI-based solutions for the future.",
      values: {
        innovation: "Innovation",
        excellence: "Excellence", 
        collaboration: "Collaboration",
        integrity: "Growth"
      }
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Explore our expertise and innovative solutions across various industries."
    },
    contact: {
      title: "Project Consultation",
      subtitle: "Let's start your project together"
    }
  },
  ja: {
    common: {
      home: "ホーム",
      about: "会社概要",
      services: "サービス",
      portfolio: "ポートフォリオ",
      contact: "お問い合わせ",
      language: "言語",
      theme: "テーマ",
      search: "検索",
      menu: "メニュー",
      close: "閉じる",
      loading: "読み込み中...",
      error: "エラー",
      success: "成功"
    },
    hero: {
      title: "革新的なITソリューションで",
      subtitle: "ビジネスの未来を設計します",
      description: "最先端技術と専門性により、クラウド、AI、ブロックチェーン分野の最高レベルソリューションを提供します。",
      cta: {
        primary: "プロジェクトを開始",
        secondary: "サービスを見る"
      }
    },
    services: {
      title: "専門サービス",
      subtitle: "カスタマイズされたITソリューション",
      ai: {
        title: "AIベース自動化",
        description: "最先端AI技術により反復業務を自動化し、生産性を最大化します。"
      },
      cloud: {
        title: "クラウドインフラ",
        description: "スケーラブルで安全なクラウド環境構築・管理サービスを提供します。"
      },
      blockchain: {
        title: "ブロックチェーンソリューション", 
        description: "分散台帳技術によるセキュリティ強化と透明な取引システムを構築します。"
      },
      consulting: {
        title: "ITコンサルティング",
        description: "戦略的技術アドバイスとデジタル変革ガイダンスを提供します。"
      }
    },
    about: {
      title: "会社概要",
      subtitle: "AIベースソリューションで未来をリードし、デジタル革新を牽引します。",
      values: {
        innovation: "革新",
        excellence: "卓越性", 
        collaboration: "協働",
        integrity: "成長"
      }
    },
    portfolio: {
      title: "ポートフォリオ",
      subtitle: "多様な分野で蓄積した専門性と革新的ソリューションをご確認ください。"
    },
    contact: {
      title: "プロジェクト相談申請",
      subtitle: "一緒にプロジェクトを始めましょう"
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ko');
  const [isLoading, setIsLoading] = useState(false);

  // 로컬 스토리지에서 언어 설정 불러오기
  useEffect(() => {
    const savedLanguage = localStorage.getItem('baikal-language') as Language;
    if (savedLanguage && ['ko', 'en', 'ja'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // 브라우저 언어 감지
      const browserLanguage = navigator.language.startsWith('ko') 
        ? 'ko' 
        : navigator.language.startsWith('ja') 
        ? 'ja' 
        : 'en';
      setCurrentLanguage(browserLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentLanguage(lang);
      localStorage.setItem('baikal-language', lang);
      setIsLoading(false);
    }, 300);
  };

  // 번역 함수
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: string | Translation = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }
    
    // 매개변수 치환
    if (params) {
      let result = value;
      Object.entries(params).forEach(([param, val]) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), String(val));
      });
      return result;
    }
    
    return value;
  };

  const value: LanguageContextType = {
    currentLanguage,
    translations: translations[currentLanguage],
    setLanguage,
    t,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// 언어 선택기 컴포넌트
export function LanguageSelector() {
  const { currentLanguage, setLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ko' as const, name: '한국어', flag: '🇰🇷' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ja' as const, name: '日本語', flag: '🇯🇵' }
  ];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white text-sm"
      >
        <Globe className="w-4 h-4 hidden sm:block" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
        <span className="text-xs font-medium hidden md:block">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
        {isLoading && (
          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden min-w-[120px] max-w-[200px]"
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => {
                  setLanguage(language.code);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {language.name}
                  </span>
                </div>
                {currentLanguage === language.code && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 배경 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}