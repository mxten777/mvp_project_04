'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// CMS 데이터 타입 정의
export interface CMSContent {
  id: string;
  type: 'hero' | 'service' | 'portfolio' | 'about' | 'contact';
  title: string;
  content: string;
  metadata: {
    author?: string;
    updatedAt: Date;
    published: boolean;
    tags: string[];
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  };
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedAt: Date;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing?: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  icon: string;
  category: string;
}

interface CMSContextType {
  content: CMSContent[];
  portfolio: PortfolioItem[];
  services: ServiceItem[];
  loading: boolean;
  // Content Management
  updateContent: (id: string, updates: Partial<CMSContent>) => Promise<void>;
  createContent: (content: Omit<CMSContent, 'id'>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  // Portfolio Management
  updatePortfolio: (id: string, updates: Partial<PortfolioItem>) => Promise<void>;
  createPortfolio: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  // Service Management  
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<void>;
  createService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  // Content Filtering
  getContentByType: (type: CMSContent['type']) => CMSContent[];
  getPortfolioByCategory: (category: string) => PortfolioItem[];
  getServicesByCategory: (category: string) => ServiceItem[];
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Mock 데이터 - 실제로는 API에서 가져오게 됩니다
const mockContent: CMSContent[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Baikal Systems - 혁신적인 IT 솔루션',
    content: '최첨단 기술로 비즈니스의 미래를 설계합니다. 클라우드, AI, 블록체인 기술을 통해 디지털 트랜스포메이션을 선도합니다.',
    metadata: {
      author: 'Admin',
      updatedAt: new Date(),
      published: true,
      tags: ['hero', 'main', 'featured'],
      seo: {
        title: 'Baikal Systems - 혁신적인 IT 솔루션 전문기업',
        description: '클라우드, AI, 블록체인 전문 IT 솔루션 제공',
        keywords: ['IT솔루션', '클라우드', 'AI', '블록체인', '디지털트랜스포메이션']
      }
    },
    media: [{
      type: 'image',
      url: '/images/baikal_logo.png',
      alt: 'Baikal Systems Logo'
    }]
  }
];

const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Enterprise Cloud Migration',
    description: '대기업 클라우드 마이그레이션 프로젝트로 99.9% 업타임 달성',
    category: 'Cloud Solutions',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    images: ['/images/portfolio1.jpg'],
    liveUrl: 'https://example.com',
    featured: true,
    completedAt: new Date('2024-01-15')
  },
  {
    id: '2', 
    title: 'AI-Powered Analytics Dashboard',
    description: '머신러닝 기반 실시간 비즈니스 인텔리전스 대시보드 개발',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    images: ['/images/portfolio2.jpg'],
    githubUrl: 'https://github.com/example',
    featured: true,
    completedAt: new Date('2024-02-20')
  }
];

const mockServices: ServiceItem[] = [
  {
    id: '1',
    name: 'Cloud Infrastructure',
    description: '확장 가능하고 안전한 클라우드 인프라 구축 및 관리',
    features: ['Auto Scaling', '24/7 Monitoring', 'Security Compliance', 'Cost Optimization'],
    pricing: {
      basic: 500000,
      premium: 1500000,
      enterprise: 3000000
    },
    icon: 'Cloud',
    category: 'Infrastructure'
  },
  {
    id: '2',
    name: 'AI Development',
    description: '맞춤형 AI 솔루션 개발 및 기존 시스템 통합',
    features: ['Custom ML Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
    pricing: {
      basic: 800000,
      premium: 2000000, 
      enterprise: 5000000
    },
    icon: 'Brain',
    category: 'Artificial Intelligence'
  }
];

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CMSContent[]>(mockContent);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(mockPortfolio);
  const [services, setServices] = useState<ServiceItem[]>(mockServices);
  const [loading, setLoading] = useState(false);

  // Content Management Functions
  const updateContent = async (id: string, updates: Partial<CMSContent>) => {
    setLoading(true);
    try {
      setContent(prev => 
        prev.map(item => 
          item.id === id 
            ? { 
                ...item, 
                ...updates, 
                metadata: { 
                  ...item.metadata, 
                  ...updates.metadata,
                  updatedAt: new Date() 
                }
              }
            : item
        )
      );
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Content update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (newContent: Omit<CMSContent, 'id'>) => {
    setLoading(true);
    try {
      const id = Date.now().toString();
      setContent(prev => [...prev, { ...newContent, id }]);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Content creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    setLoading(true);
    try {
      setContent(prev => prev.filter(item => item.id !== id));
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Content deletion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Portfolio Management Functions
  const updatePortfolio = async (id: string, updates: Partial<PortfolioItem>) => {
    setLoading(true);
    try {
      setPortfolio(prev => 
        prev.map(item => item.id === id ? { ...item, ...updates } : item)
      );
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Portfolio update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPortfolio = async (newItem: Omit<PortfolioItem, 'id'>) => {
    setLoading(true);
    try {
      const id = Date.now().toString();
      setPortfolio(prev => [...prev, { ...newItem, id }]);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Portfolio creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolio = async (id: string) => {
    setLoading(true);
    try {
      setPortfolio(prev => prev.filter(item => item.id !== id));
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Portfolio deletion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Service Management Functions
  const updateService = async (id: string, updates: Partial<ServiceItem>) => {
    setLoading(true);
    try {
      setServices(prev => 
        prev.map(item => item.id === id ? { ...item, ...updates } : item)
      );
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Service update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (newService: Omit<ServiceItem, 'id'>) => {
    setLoading(true);
    try {
      const id = Date.now().toString();
      setServices(prev => [...prev, { ...newService, id }]);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Service creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    setLoading(true);
    try {
      setServices(prev => prev.filter(item => item.id !== id));
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Service deletion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Content Filtering Functions
  const getContentByType = (type: CMSContent['type']) => {
    return content.filter(item => item.type === type && item.metadata.published);
  };

  const getPortfolioByCategory = (category: string) => {
    return portfolio.filter(item => item.category === category);
  };

  const getServicesByCategory = (category: string) => {
    return services.filter(item => item.category === category);
  };

  const value: CMSContextType = {
    content,
    portfolio,
    services,
    loading,
    updateContent,
    createContent,
    deleteContent,
    updatePortfolio,
    createPortfolio,
    deletePortfolio,
    updateService,
    createService,
    deleteService,
    getContentByType,
    getPortfolioByCategory,
    getServicesByCategory,
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}