# Baikal Systems - MVP 프로젝트 v4

## 🚀 프로젝트 개요
혁신적인 IT 솔루션 전문기업 Baikal Systems의 프리미엄 웹사이트

## 📂 프로젝트 구조

```
mvp_project_04/
├── 📁 src/
│   ├── 📁 app/                    # Next.js 13+ App Router
│   │   ├── 📄 layout.tsx          # 전역 레이아웃
│   │   ├── 📄 page.tsx           # 메인 페이지
│   │   ├── 📄 globals.css        # 전역 스타일
│   │   └── 📁 api/               # API 라우트
│   │       ├── 📁 contact/       # 연락처 API
│   │       └── 📁 csrf/          # CSRF 토큰 API
│   ├── 📁 components/            # UI 컴포넌트
│   │   ├── 🏠 HeroSection.tsx    # 히어로 섹션
│   │   ├── 🛠️ ServicesSection.tsx # 서비스 섹션
│   │   ├── 📋 AboutSection.tsx   # 회사소개 섹션
│   │   ├── 💼 PortfolioSection.tsx # 포트폴리오 섹션
│   │   ├── 📞 ContactSection.tsx # 연락처 섹션
│   │   ├── 🎨 ParticleBackground.tsx # 파티클 배경
│   │   ├── 🤖 ChatBot.tsx        # AI 챗봇
│   │   ├── 🌙 ThemeToggle.tsx    # 테마 토글
│   │   ├── 📊 ScrollProgress.tsx # 스크롤 진행률
│   │   ├── 🔍 AdvancedSearch.tsx # 고급 검색
│   │   ├── 📈 AnalyticsDashboard.tsx # 분석 대시보드
│   │   └── 🔐 AuthButton.tsx     # 인증 버튼
│   ├── 📁 lib/                   # 비즈니스 로직
│   │   ├── 🗄️ cms.tsx            # CMS 관리 시스템
│   │   ├── 🌐 i18n.tsx           # 다국어 지원
│   │   ├── 🔐 auth.tsx           # 인증 시스템
│   │   ├── ⚡ monitoring.tsx     # 성능 모니터링
│   │   ├── 🛡️ security.ts        # 보안 기능
│   │   └── 🔥 firebase.ts        # Firebase 설정
│   ├── 📁 types/                 # TypeScript 타입 정의
│   │   └── 📄 globals.d.ts       # 전역 타입 선언
│   └── 📄 middleware.ts          # Next.js 미들웨어
├── 📁 public/                    # 정적 파일
│   ├── 📁 images/               # 이미지 파일
│   ├── 📁 locales/              # 다국어 번역 파일
│   ├── 📄 manifest.json         # PWA 매니페스트
│   └── 📄 sw.js                 # 서비스 워커
├── 📄 package.json              # 패키지 의존성
├── 📄 tsconfig.json             # TypeScript 설정
├── 📄 tailwind.config.js        # Tailwind CSS 설정
├── 📄 next.config.ts            # Next.js 설정
└── 📄 eslint.config.mjs         # ESLint 설정
```

## 🎯 구현된 기능들

### Phase 1: 프리미엄 디자인 & 애니메이션 ✅
- 🎨 고급 타이포그래피 (6개 전문 폰트)
- ✨ GSAP 기반 고급 애니메이션
- 🌌 인터랙티브 파티클 배경
- 🎭 Framer Motion 페이지 전환
- 💎 Glass Morphism 디자인
- 🌈 그라디언트 & 그림자 효과

### Phase 2.1: 고급 UX 기능 ✅
- 🤖 AI 챗봇 (스마트 응답 시스템)
- 🌙 다크/라이트 모드 토글
- 📊 스크롤 진행률 표시
- 🔔 토스트 알림 시스템

### Phase 2.2: CMS & 데이터 관리 ✅
- 🗄️ Dynamic CMS (콘텐츠 관리)
- 🔍 고급 검색 & 필터링
- 📈 실시간 분석 대시보드
- 📱 PWA (Progressive Web App)
- 🌐 다국어 지원 (한/영)

### Phase 3: 보안 & 최적화 ✅
- 🛡️ 보안 헤더 & CSP
- 🔐 JWT 기반 인증 시스템
- 🚦 API Rate Limiting
- ⚡ 성능 모니터링
- 🔒 Input Validation & Sanitization

## 🛠️ 기술 스택

### Frontend
- ⚛️ **React 19** - 최신 React
- 🔥 **Next.js 15.3.5** - Turbopack 지원
- 🎨 **Tailwind CSS** - 유틸리티 CSS
- ✨ **Framer Motion** - 애니메이션
- 🎬 **GSAP** - 고급 애니메이션
- 🌌 **Three.js** - 3D 그래픽스

### Backend & Security
- 🔐 **NextAuth.js** - 인증 시스템
- 🛡️ **Helmet** - 보안 헤더
- ✅ **Joi** - 입력 검증
- 🔒 **bcryptjs** - 비밀번호 암호화
- 🎫 **JWT** - 토큰 인증

### Monitoring & Analytics
- 📊 **Recharts** - 차트 라이브러리
- ⚡ **Performance Observer** - 성능 측정
- 🔍 **Core Web Vitals** - 웹 성능 지표
- 📈 **Real-time Analytics** - 실시간 분석

### PWA & Optimization
- 📱 **next-pwa** - PWA 지원
- 🗃️ **Service Worker** - 오프라인 캐싱
- 🚀 **Code Splitting** - 번들 최적화
- 🔄 **Background Sync** - 백그라운드 동기화

## 🎮 대시보드 사용법

### 📊 Analytics Dashboard
- **위치**: 오른쪽 하단 보라색 차트 버튼
- **기능**: 실시간 트래픽 분석, 사용자 통계
- **데이터**: 페이지뷰, 세션, 디바이스별 통계

### ⚡ Performance Dashboard
- **위치**: 오른쪽 하단 녹색 Activity 버튼
- **기능**: 성능 모니터링, 오류 추적
- **지표**: Core Web Vitals, 메모리 사용량, 로드 시간

### 🔍 Advanced Search
- **위치**: 오른쪽 상단 검색 버튼
- **기능**: 통합 검색, 고급 필터링
- **범위**: 콘텐츠, 포트폴리오, 서비스 전체

## 🚀 실행 방법

\`\`\`bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 검사
npm run lint
\`\`\`

## 🌐 접속 정보
- **개발 서버**: http://localhost:3001
- **네트워크**: http://192.168.45.120:3001

## 📞 문의사항
Baikal Systems 개발팀
- 이메일: contact@baikal-systems.com
- 전화: +82-2-1234-5678

---
**© 2024 Baikal Systems. All rights reserved.**