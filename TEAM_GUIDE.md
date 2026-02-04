# 팀원 공유용 개발 가이드

## 🎯 프로젝트 개요
**바이칼시스템즈 VIBE CODING 웹사이트** - AI와 RPA 기술 기반 IT 랜딩페이지

## 🔧 개발 환경 설정

### 1. 프로젝트 클론 및 설치
```bash
git clone https://github.com/mxten777/mvp_project_04.git
cd mvp_project_04
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
→ http://localhost:3000

### 3. 빌드 테스트
```bash
npm run build
npm start
```

## 📋 기술 스택 & 버전
- **Next.js**: 15.3.5 (React 19.0.0)
- **Tailwind CSS**: 3.4.0 ⬆️ (최근 업그레이드)
- **TypeScript**: 5.x
- **Framer Motion**: 12.23.3
- **Firebase**: 11.10.0

## 🎨 최근 개선사항 (2025.10.03)

### ✅ Tailwind CSS 3.4.0 업그레이드
- 성능 최적화 및 최신 기능 지원
- 안정성 향상

### ✅ 폰트 시스템 대폭 개선
```css
/* 새로운 폰트 스택 */
font-display: Pretendard, Noto Sans KR, Inter
font-heading: Pretendard, Noto Sans KR, Inter  
font-sans: Pretendard, Noto Sans KR, Inter
font-mono: JetBrains Mono, Fira Code, Monaco
```

### ✅ UI/UX 개선
- 그라디언트 텍스트 효과
- 향상된 버튼 애니메이션
- 반응형 디자인 최적화

## 📁 주요 파일 구조

```
src/
├── app/
│   ├── globals.css        # 글로벌 스타일 + 폰트 imports
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/           # 주요 컴포넌트
│   ├── HeroSection.tsx    # 📍 최근 UI 개선
│   ├── ServicesSection.tsx
│   ├── AboutSection.tsx
│   ├── PortfolioSection.tsx
│   ├── ContactSection.tsx
│   ├── Header.tsx
│   └── Footer.tsx
└── lib/
    └── firebase.ts        # Firebase 설정
```

## 🎨 디자인 시스템

### 컬러 팔레트
```css
/* Primary - Blue 계열 */
--primary: #2563eb
--primary-light: #7dd3fc  
--primary-dark: #1e40af

/* Secondary - Violet 계열 */
--secondary: #7c3aed
--secondary-light: #c4b5fd
--secondary-dark: #4c1d95

/* CTA - Pink 계열 */
--cta: #db2777
--cta-light: #f472b6
--cta-dark: #831843
```

### 그라디언트
```css
/* 메인 그라디언트 */
bg-main-gradient: linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)

/* 카드 그라디언트 */
bg-card-gradient: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)

/* 히어로 그라디언트 */
bg-hero-gradient: linear-gradient(135deg, #1e40af 0%, #2563eb 25%, #7c3aed 75%, #db2777 100%)
```

## 🚀 배포 프로세스

### GitHub → Vercel 자동 배포
```bash
# 1. 작업 완료 후 커밋
git add .
git commit -m "feat: 기능 설명"
git push

# 2. Vercel 프로덕션 배포
vercel --prod
```

### 현재 배포 URL
- **Production**: https://mxten-project-15.vercel.app/

## 🔄 개발 워크플로우

### 1. 기능 개발
```bash
git checkout -b feature/new-feature
# 작업 진행
npm run dev  # 로컬 테스트
```

### 2. 코드 검증
```bash
npm run build     # 빌드 테스트
npm run lint      # 린팅 체크
```

### 3. 배포
```bash
git checkout main
git merge feature/new-feature
git push
vercel --prod
```

## 📱 반응형 브레이크포인트

```css
/* Tailwind CSS 브레이크포인트 */
xs: 475px   /* 모바일 S */
sm: 640px   /* 모바일 L */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 S */
xl: 1280px  /* 데스크톱 L */
```

## 🌙 다크모드 구현

### Tailwind 다크모드 활용
```tsx
// 다크모드 클래스 예시
className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
```

### 테마 전환
- 자동: `prefers-color-scheme` 감지
- 수동: 헤더 토글 버튼
- 상태: 로컬 스토리지 저장

## 🎭 애니메이션 가이드

### Framer Motion 기본 패턴
```tsx
// 페이드인 효과
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// 호버 효과
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### 커스텀 애니메이션 클래스
사용 가능한 Tailwind 커스텀 애니메이션:
- `animate-fade-in` - 페이드 인 효과
- `animate-slide-up` - 슬라이드 업 효과  
- `animate-bounce-slow` - 천천히 바운스
- `animate-glow` - 글로우 효과
- `animate-pulse-slow` - 천천히 펄스
- `animate-float` - 부유 효과

## 🔧 주요 개발 도구

### VS Code 확장 추천
- **Tailwind CSS IntelliSense**
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **Auto Rename Tag**

### 개발 명령어
```bash
npm run dev        # 개발 서버 (Turbopack)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버
npm run lint       # ESLint 검사
```

## 🐛 자주 발생하는 이슈

### 1. Tailwind 스타일 미적용
```bash
# 해결: 개발 서버 재시작
npm run dev
```

### 2. 폰트 로딩 실패
```bash
# 해결: 브라우저 캐시 클리어 후 빌드
npm run build
```

### 3. TypeScript 에러
```bash
# 해결: 타입 체크
npx tsc --noEmit
```

## 📊 성능 최적화

### Core Web Vitals 목표
- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1

### 최적화 기법
- Next.js Image 컴포넌트 활용
- 동적 import로 코드 분할
- Tailwind PurgeCSS로 CSS 최적화
- 폰트 display: swap 적용

## 📞 팀 소통

### 개발 이슈 공유
- **GitHub Issues**: 버그 리포트
- **Pull Request**: 코드 리뷰
- **Discussions**: 기능 제안

### 긴급 연락
- **Slack**: #mvp-project-04
- **이메일**: [팀 이메일]

## 📚 참고 문서

### 공식 문서
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

### 프로젝트 문서
- `PROJECT_DOCUMENTATION.md` - 상세 프로젝트 문서
- `README.md` - 사용자 가이드
- `CHANGELOG.md` - 버전별 변경사항

---

*최종 업데이트: 2025.10.03*  
*작성자: 개발팀*