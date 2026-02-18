'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
      success: "성공",
      freeConsultation: "무료 상담",
      login: "로그인",
      learnMore: "자세히 보기",
      all: "전체",
      prev: "이전",
      next: "다음",
      subscribe: "구독"
    },
    hero: {
      title: "혁신적인 IT 솔루션으로",
      subtitle: "비즈니스의 미래를 설계합니다",
      description: "최첨단 기술과 전문성으로 클라우드, AI, 블록체인 분야의 최고 수준 솔루션을 제공합니다.",
      brandName: "바이칼시스템즈",
      badge: "Next Generation IT Solutions",
      cta: { primary: "프로젝트 시작하기", secondary: "서비스 둘러보기" },
      stats: { projects: "완료 프로젝트", satisfaction: "고객 만족도", automation: "업무 자동화", support: "기술 지원" },
      typewriter: { line1: "AI & RPA 전문 기업", line2: "디지털 혁신 파트너", line3: "업무 자동화 리더" }
    },
    services: {
      label: "EXPERTISE",
      title: "전문 서비스",
      subtitle: "맞춤형 IT 솔루션",
      tagline: "바이칼시스템즈의 핵심 서비스를 만나보세요",
      ai: {
        title: "AI 기반 자동화",
        description: "최첨단 AI 기술로 반복 업무를 자동화하고 생산성을 극대화합니다.",
        f1: "코드 자동 생성", f2: "AI 디버깅", f3: "성능 최적화", f4: "보안 강화"
      },
      cloud: {
        title: "클라우드 인프라",
        description: "확장 가능하고 안전한 클라우드 환경 구축 및 관리 서비스를 제공합니다.",
        f1: "프로세스 자동화", f2: "데이터 처리", f3: "업무 최적화", f4: "실시간 모니터링"
      },
      blockchain: {
        title: "블록체인 솔루션",
        description: "분산 원장 기술을 통한 보안 강화 및 투명한 거래 시스템을 구축합니다.",
        f1: "취약점 분석", f2: "보안 모니터링", f3: "컴플라이언스", f4: "사고 대응"
      },
      consulting: {
        title: "IT 컨설팅",
        description: "전략적 기술 자문 및 디지털 전환 가이드를 제공합니다.",
        f1: "데이터 마이닝", f2: "예측 분석", f3: "시각화", f4: "맞춤형 리포트"
      },
      cta: {
        badge: "Ready to Start",
        title: "프로젝트를 시작할 준비가 되셨나요?",
        subtitle: "전문 컨설턴트와 함께 최적의 솔루션을 찾아보세요",
        button: "무료 상담 신청하기"
      }
    },
    about: {
      label: "ABOUT US",
      title: "회사 소개",
      subtitle: "미래를 선도하는 AI 기반 솔루션으로 디지털 혁신을 이끌어갑니다.",
      vision: {
        label: "VISION",
        title: "우리의 비전",
        p1: "(주) 바이칼시스템즈는 AI와 RPA 기술을 활용하여 공공기관과 민간기업의 업무 효율성을 혁신하는 전문 기업입니다.",
        p2: "공공데이터 API 활용부터 요양병원, 일반병원, 치매 어르신 복지정책 적용까지, 실질적인 사회적 가치를 창출하는 바이브코딩 솔루션을 제공합니다.",
        highlight: "사회적 가치"
      },
      competency: {
        label: "CORE COMPETENCY",
        title: "핵심 역량",
        item1: "AI 기반 업무 자동화 솔루션",
        item2: "RPA를 활용한 업무 편의성 향상",
        item3: "공공데이터 API 활용 및 공급",
        item4: "헬스케어 및 복지정책 시스템"
      },
      stats: {
        founded: "설립년도", foundedVal: "2003", foundedSuffix: "",
        team: "전문 개발진", teamVal: "7", teamSuffix: "명",
        business: "주요 사업분야", businessVal: "AI & RPA", businessSuffix: "",
        region: "서비스 지역", regionVal: "전국", regionSuffix: ""
      },
      valuesLabel: "OUR VALUES",
      valuesTitle: "우리의 가치",
      valuesSubtitle: "바이칼시스템즈가 추구하는 핵심 가치들입니다.",
      values: {
        innovation: "혁신", innovationDesc: "최신 AI 기술과 창의적 사고로 새로운 가치를 창출합니다.",
        excellence: "전문성", excellenceDesc: "깊은 기술적 전문성과 업계 경험을 바탕으로 최적의 솔루션을 제공합니다.",
        collaboration: "협력", collaborationDesc: "고객과의 긴밀한 협력을 통해 함께 성장하는 파트너십을 구축합니다.",
        integrity: "성장", integrityDesc: "지속적인 학습과 발전을 통해 더 나은 미래를 만들어갑니다."
      }
    },
    portfolio: {
      label: "PORTFOLIO",
      title: "포트폴리오",
      subtitle: "다양한 분야에서 축적한 전문성과 혁신적인 솔루션을 확인해보세요.",
      liveDemo: "라이브 데모",
      viewProject: "프로젝트 보기",
      loading: "프로젝트를 불러오는 중...",
      showing: "전체 {{total}}개 프로젝트 중 {{start}}-{{end}}개 표시",
      cta: {
        title: "다음 성공 사례의 주인공이 되어보세요",
        subtitle: "전문 컨설턴트와 함께 맞춤형 솔루션을 설계해보세요.",
        button: "프로젝트 상담 받기"
      }
    },
    contact: {
      label: "CONTACT US",
      title: "프로젝트 상담 신청",
      subtitle: "전문 컨설턴트가 고객님의 요구사항에 맞는 최적의 솔루션을 제안해드립니다.",
      highlight: "최적의 솔루션",
      info: { phone: "전화번호", email: "이메일", address: "주소" },
      process: {
        label: "PROCESS",
        title: "상담 프로세스",
        s1: "문의 접수", s1d: "24시간 내 확인",
        s2: "요구사항 분석", s2d: "전문가 배정",
        s3: "상담 일정 조율", s3d: "맞춤 솔루션 제안",
        s4: "프로젝트 시작", s4d: "체계적 진행"
      },
      form: {
        label: "SEND MESSAGE",
        title: "상담 신청서",
        name: "이름", namePlaceholder: "홍길동",
        company: "회사명", companyPlaceholder: "(주)바이칼시스템즈",
        phone: "연락처", phonePlaceholder: "010-1234-5678",
        position: "직책", positionPlaceholder: "대표이사",
        email: "이메일", emailPlaceholder: "example@company.com",
        services: "관심 서비스",
        message: "문의 내용", messagePlaceholder: "프로젝트에 대한 구체적인 요구사항을 알려주세요.",
        source: "알게 된 경로",
        responseMethod: "답변 희망 수단",
        responseEmail: "이메일", responsePhone: "전화", responseSms: "문자",
        submit: "상담 신청하기",
        submitting: "처리 중...",
        successTitle: "상담 신청 완료!",
        successMsg: "24시간 내에 전문 컨설턴트가 연락드리겠습니다.",
        errorTitle: "전송 실패",
        errorMsg: "잠시 후 다시 시도해주세요.",
        successInline: "문의가 정상적으로 접수되었습니다.",
        errorInline: "문의 접수 중 오류가 발생했습니다. 다시 시도해주세요."
      },
      serviceTypes: {
        s1: "바이브코딩 솔루션", s2: "RPA 업무 자동화", s3: "공공데이터 API",
        s4: "헬스케어 솔루션", s5: "데이터 분석", s6: "보안 솔루션"
      },
      sources: { s1: "검색엔진", s2: "지인 추천", s3: "SNS", s4: "온라인 광고", s5: "기타" }
    },
    footer: {
      tagline: "AI와 RPA 기술로 미래를 코딩하는 차세대 디지털 혁신 파트너",
      servicesTitle: "서비스",
      companyTitle: "회사",
      newsletterTitle: "뉴스레터",
      newsletterDesc: "최신 기술 트렌드와 솔루션 소식을 받아보세요.",
      emailPlaceholder: "이메일 주소",
      copyright: "All rights reserved.",
      poweredBy: "Powered by",
      serviceLinks: { s1: "바이브코딩 솔루션", s2: "RPA 업무 자동화", s3: "공공데이터 API", s4: "헬스케어 솔루션" },
      companyLinks: { c1: "회사 소개", c2: "서비스", c3: "포트폴리오", c4: "문의하기" }
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
      success: "Success",
      freeConsultation: "Free Consultation",
      login: "Login",
      learnMore: "Learn more",
      all: "All",
      prev: "Prev",
      next: "Next",
      subscribe: "Subscribe"
    },
    hero: {
      title: "Innovative IT Solutions",
      subtitle: "Designing the Future of Business",
      description: "We provide top-tier solutions in cloud, AI, and blockchain technologies with cutting-edge technology and expertise.",
      brandName: "Baikal Systems",
      badge: "Next Generation IT Solutions",
      cta: { primary: "Start Your Project", secondary: "Explore Services" },
      stats: { projects: "Completed Projects", satisfaction: "Client Satisfaction", automation: "Task Automation", support: "Tech Support" },
      typewriter: { line1: "AI & RPA Specialists", line2: "Digital Innovation Partner", line3: "Automation Leaders" }
    },
    services: {
      label: "EXPERTISE",
      title: "Professional Services",
      subtitle: "Customized IT Solutions",
      tagline: "Discover the core services of Baikal Systems",
      ai: {
        title: "AI-Based Automation",
        description: "Maximize productivity by automating repetitive tasks with cutting-edge AI technology.",
        f1: "Code Generation", f2: "AI Debugging", f3: "Performance Optimization", f4: "Security Enhancement"
      },
      cloud: {
        title: "Cloud Infrastructure",
        description: "Provide scalable and secure cloud environment construction and management services.",
        f1: "Process Automation", f2: "Data Processing", f3: "Workflow Optimization", f4: "Real-time Monitoring"
      },
      blockchain: {
        title: "Blockchain Solutions",
        description: "Build secure and transparent transaction systems through distributed ledger technology.",
        f1: "Vulnerability Analysis", f2: "Security Monitoring", f3: "Compliance", f4: "Incident Response"
      },
      consulting: {
        title: "IT Consulting",
        description: "Provide strategic technology consulting and digital transformation guidance.",
        f1: "Data Mining", f2: "Predictive Analytics", f3: "Visualization", f4: "Custom Reports"
      },
      cta: {
        badge: "Ready to Start",
        title: "Ready to start your project?",
        subtitle: "Find the optimal solution with our expert consultants",
        button: "Get Free Consultation"
      }
    },
    about: {
      label: "ABOUT US",
      title: "About Us",
      subtitle: "Leading digital innovation with AI-based solutions for the future.",
      vision: {
        label: "VISION",
        title: "Our Vision",
        p1: "Baikal Systems is a specialized company that innovates business efficiency for public institutions and private enterprises using AI and RPA technology.",
        p2: "From public data API utilization to healthcare and welfare policy systems, we provide VIBE coding solutions that create real social value.",
        highlight: "social value"
      },
      competency: {
        label: "CORE COMPETENCY",
        title: "Core Competencies",
        item1: "AI-based Business Automation Solutions",
        item2: "Enhanced Workflow with RPA",
        item3: "Public Data API Utilization & Supply",
        item4: "Healthcare & Welfare Policy Systems"
      },
      stats: {
        founded: "Founded", foundedVal: "2003", foundedSuffix: "",
        team: "Expert Developers", teamVal: "7", teamSuffix: "",
        business: "Core Business", businessVal: "AI & RPA", businessSuffix: "",
        region: "Service Area", regionVal: "Nationwide", regionSuffix: ""
      },
      valuesLabel: "OUR VALUES",
      valuesTitle: "Our Values",
      valuesSubtitle: "The core values that drive Baikal Systems.",
      values: {
        innovation: "Innovation", innovationDesc: "Creating new value with cutting-edge AI technology and creative thinking.",
        excellence: "Excellence", excellenceDesc: "Delivering optimal solutions backed by deep technical expertise and industry experience.",
        collaboration: "Collaboration", collaborationDesc: "Building growth-oriented partnerships through close collaboration with clients.",
        integrity: "Growth", integrityDesc: "Building a better future through continuous learning and development."
      }
    },
    portfolio: {
      label: "PORTFOLIO",
      title: "Portfolio",
      subtitle: "Explore our expertise and innovative solutions across various industries.",
      liveDemo: "Live Demo",
      viewProject: "View Project",
      loading: "Loading projects...",
      showing: "Showing {{start}}-{{end}} of {{total}} projects",
      cta: {
        title: "Become the next success story",
        subtitle: "Design a customized solution with our expert consultants.",
        button: "Get Project Consultation"
      }
    },
    contact: {
      label: "CONTACT US",
      title: "Project Consultation",
      subtitle: "Our expert consultants will propose the optimal solution tailored to your needs.",
      highlight: "optimal solution",
      info: { phone: "Phone", email: "Email", address: "Address" },
      process: {
        label: "PROCESS",
        title: "Consultation Process",
        s1: "Inquiry Received", s1d: "Confirmed within 24 hours",
        s2: "Requirements Analysis", s2d: "Expert assignment",
        s3: "Schedule Coordination", s3d: "Custom solution proposal",
        s4: "Project Kickoff", s4d: "Systematic execution"
      },
      form: {
        label: "SEND MESSAGE",
        title: "Consultation Form",
        name: "Name", namePlaceholder: "John Doe",
        company: "Company", companyPlaceholder: "Baikal Systems Inc.",
        phone: "Phone", phonePlaceholder: "+82-10-1234-5678",
        position: "Position", positionPlaceholder: "CEO",
        email: "Email", emailPlaceholder: "example@company.com",
        services: "Services of Interest",
        message: "Message", messagePlaceholder: "Please describe your project requirements in detail.",
        source: "How did you find us?",
        responseMethod: "Preferred contact method",
        responseEmail: "Email", responsePhone: "Phone", responseSms: "SMS",
        submit: "Submit Inquiry",
        submitting: "Processing...",
        successTitle: "Inquiry Submitted!",
        successMsg: "An expert consultant will contact you within 24 hours.",
        errorTitle: "Submission Failed",
        errorMsg: "Please try again later.",
        successInline: "Your inquiry has been successfully submitted.",
        errorInline: "An error occurred while submitting. Please try again."
      },
      serviceTypes: {
        s1: "VIBE Coding Solutions", s2: "RPA Automation", s3: "Public Data API",
        s4: "Healthcare Solutions", s5: "Data Analytics", s6: "Security Solutions"
      },
      sources: { s1: "Search Engine", s2: "Referral", s3: "Social Media", s4: "Online Ads", s5: "Other" }
    },
    footer: {
      tagline: "Next-generation digital innovation partner coding the future with AI and RPA technology",
      servicesTitle: "Services",
      companyTitle: "Company",
      newsletterTitle: "Newsletter",
      newsletterDesc: "Stay updated with the latest technology trends and solutions.",
      emailPlaceholder: "Email address",
      copyright: "All rights reserved.",
      poweredBy: "Powered by",
      serviceLinks: { s1: "VIBE Coding Solutions", s2: "RPA Automation", s3: "Public Data API", s4: "Healthcare Solutions" },
      companyLinks: { c1: "About Us", c2: "Services", c3: "Portfolio", c4: "Contact" }
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
      success: "成功",
      freeConsultation: "無料相談",
      login: "ログイン",
      learnMore: "詳しく見る",
      all: "すべて",
      prev: "前へ",
      next: "次へ",
      subscribe: "購読"
    },
    hero: {
      title: "革新的なITソリューションで",
      subtitle: "ビジネスの未来を設計します",
      description: "最先端技術と専門性により、クラウド、AI、ブロックチェーン分野の最高レベルソリューションを提供します。",
      brandName: "バイカルシステムズ",
      badge: "Next Generation IT Solutions",
      cta: { primary: "プロジェクトを開始", secondary: "サービスを見る" },
      stats: { projects: "完了プロジェクト", satisfaction: "顧客満足度", automation: "業務自動化", support: "技術サポート" },
      typewriter: { line1: "AI & RPA 専門企業", line2: "デジタル革新パートナー", line3: "業務自動化リーダー" }
    },
    services: {
      label: "EXPERTISE",
      title: "専門サービス",
      subtitle: "カスタマイズされたITソリューション",
      tagline: "バイカルシステムズのコアサービスをご覧ください",
      ai: {
        title: "AIベース自動化",
        description: "最先端AI技術により反復業務を自動化し、生産性を最大化します。",
        f1: "コード自動生成", f2: "AIデバッグ", f3: "パフォーマンス最適化", f4: "セキュリティ強化"
      },
      cloud: {
        title: "クラウドインフラ",
        description: "スケーラブルで安全なクラウド環境構築・管理サービスを提供します。",
        f1: "プロセス自動化", f2: "データ処理", f3: "ワークフロー最適化", f4: "リアルタイム監視"
      },
      blockchain: {
        title: "ブロックチェーンソリューション",
        description: "分散台帳技術によるセキュリティ強化と透明な取引システムを構築します。",
        f1: "脆弱性分析", f2: "セキュリティ監視", f3: "コンプライアンス", f4: "インシデント対応"
      },
      consulting: {
        title: "ITコンサルティング",
        description: "戦略的技術アドバイスとデジタル変革ガイダンスを提供します。",
        f1: "データマイニング", f2: "予測分析", f3: "可視化", f4: "カスタムレポート"
      },
      cta: {
        badge: "Ready to Start",
        title: "プロジェクトを始める準備はできましたか？",
        subtitle: "専門コンサルタントと最適なソリューションを見つけましょう",
        button: "無料相談を申し込む"
      }
    },
    about: {
      label: "ABOUT US",
      title: "会社概要",
      subtitle: "AIベースソリューションで未来をリードし、デジタル革新を牽引します。",
      vision: {
        label: "VISION",
        title: "私たちのビジョン",
        p1: "バイカルシステムズは、AIとRPA技術を活用して公共機関と民間企業の業務効率を革新する専門企業です。",
        p2: "公共データAPI活用からヘルスケア・福祉政策システムまで、実質的な社会的価値を創出するVIBEコーディングソリューションを提供します。",
        highlight: "社会的価値"
      },
      competency: {
        label: "CORE COMPETENCY",
        title: "コアコンピテンシー",
        item1: "AIベース業務自動化ソリューション",
        item2: "RPAを活用した業務利便性向上",
        item3: "公共データAPI活用・供給",
        item4: "ヘルスケア・福祉政策システム"
      },
      stats: {
        founded: "設立年度", foundedVal: "2003", foundedSuffix: "",
        team: "専門開発チーム", teamVal: "7", teamSuffix: "名",
        business: "主要事業分野", businessVal: "AI & RPA", businessSuffix: "",
        region: "サービス地域", regionVal: "全国", regionSuffix: ""
      },
      valuesLabel: "OUR VALUES",
      valuesTitle: "私たちの価値",
      valuesSubtitle: "バイカルシステムズが追求する核心的な価値です。",
      values: {
        innovation: "革新", innovationDesc: "最新AI技術と創造的思考で新しい価値を創出します。",
        excellence: "卓越性", excellenceDesc: "深い技術的専門性と業界経験に基づく最適なソリューションを提供します。",
        collaboration: "協働", collaborationDesc: "クライアントとの緊密な協力を通じて共に成長するパートナーシップを構築します。",
        integrity: "成長", integrityDesc: "継続的な学習と発展を通じてより良い未来を創ります。"
      }
    },
    portfolio: {
      label: "PORTFOLIO",
      title: "ポートフォリオ",
      subtitle: "多様な分野で蓄積した専門性と革新的ソリューションをご確認ください。",
      liveDemo: "ライブデモ",
      viewProject: "プロジェクト詳細",
      loading: "プロジェクトを読み込み中...",
      showing: "全{{total}}件中 {{start}}-{{end}}件を表示",
      cta: {
        title: "次の成功事例の主人公になりましょう",
        subtitle: "専門コンサルタントとカスタマイズソリューションを設計しましょう。",
        button: "プロジェクト相談を受ける"
      }
    },
    contact: {
      label: "CONTACT US",
      title: "プロジェクト相談申請",
      subtitle: "専門コンサルタントがお客様のご要望に合った最適なソリューションをご提案します。",
      highlight: "最適なソリューション",
      info: { phone: "電話番号", email: "メール", address: "住所" },
      process: {
        label: "PROCESS",
        title: "相談プロセス",
        s1: "お問い合わせ受付", s1d: "24時間以内に確認",
        s2: "要件分析", s2d: "専門家アサイン",
        s3: "スケジュール調整", s3d: "カスタムソリューション提案",
        s4: "プロジェクト開始", s4d: "体系的に進行"
      },
      form: {
        label: "SEND MESSAGE",
        title: "相談申請書",
        name: "お名前", namePlaceholder: "山田太郎",
        company: "会社名", companyPlaceholder: "バイカルシステムズ株式会社",
        phone: "連絡先", phonePlaceholder: "090-1234-5678",
        position: "役職", positionPlaceholder: "代表取締役",
        email: "メール", emailPlaceholder: "example@company.com",
        services: "関心サービス",
        message: "お問い合わせ内容", messagePlaceholder: "プロジェクトの具体的なご要望をお聞かせください。",
        source: "当社を知ったきっかけ",
        responseMethod: "ご希望の回答手段",
        responseEmail: "メール", responsePhone: "電話", responseSms: "SMS",
        submit: "相談を申し込む",
        submitting: "処理中...",
        successTitle: "相談申請完了！",
        successMsg: "24時間以内に専門コンサルタントからご連絡いたします。",
        errorTitle: "送信失敗",
        errorMsg: "しばらくしてから再度お試しください。",
        successInline: "お問い合わせが正常に受け付けられました。",
        errorInline: "お問い合わせの受付中にエラーが発生しました。もう一度お試しください。"
      },
      serviceTypes: {
        s1: "VIBEコーディングソリューション", s2: "RPA業務自動化", s3: "公共データAPI",
        s4: "ヘルスケアソリューション", s5: "データ分析", s6: "セキュリティソリューション"
      },
      sources: { s1: "検索エンジン", s2: "紹介", s3: "SNS", s4: "オンライン広告", s5: "その他" }
    },
    footer: {
      tagline: "AIとRPA技術で未来をコーディングする次世代デジタル革新パートナー",
      servicesTitle: "サービス",
      companyTitle: "会社",
      newsletterTitle: "ニュースレター",
      newsletterDesc: "最新の技術トレンドとソリューション情報をお届けします。",
      emailPlaceholder: "メールアドレス",
      copyright: "All rights reserved.",
      poweredBy: "Powered by",
      serviceLinks: { s1: "VIBEコーディングソリューション", s2: "RPA業務自動化", s3: "公共データAPI", s4: "ヘルスケアソリューション" },
      companyLinks: { c1: "会社概要", c2: "サービス", c3: "ポートフォリオ", c4: "お問い合わせ" }
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

  // <html lang> 동기화
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

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

// Legacy LanguageSelector removed — use LanguageSwitcher component instead
