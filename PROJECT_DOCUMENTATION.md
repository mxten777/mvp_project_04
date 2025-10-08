# 바이칼시스템즈 IT 랜딩페이지 프로젝트 문서

## 📋 프로젝트 개요

### 프로젝트명
**바이칼시스템즈 VIBE CODING 웹사이트**

### 목표
AI와 RPA 기술로 미래를 코딩하는 차세대 혁신 파트너를 소개하는 모던한 IT 랜딩페이지

### 배포 정보
- **Production URL**: https://mvp-project-04-g6kv7lxv5-dongyeol-jungs-projects.vercel.app
- **Development**: http://localhost:3000
- **Repository**: https://github.com/mxten777/mvp_project_04

---

## 🛠 기술 스택

### Core Framework
- **Next.js 15.3.5** - React 프레임워크 (App Router)
- **React 19.0.0** - UI 라이브러리
- **TypeScript 5** - 타입 안전성

### 스타일링 & UI
- **Tailwind CSS 3.4.0** - 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion 12.23.3** - 애니메이션 라이브러리
- **Heroicons** - 아이콘 라이브러리

### 폰트 시스템
- **Pretendard** - 한글 최적화 폰트
- **Inter** - 영문 폰트
- **JetBrains Mono** - 코딩/모노스페이스 폰트

### 배포 & 인프라
- **Vercel** - 프로덕션 배포
- **GitHub** - 소스코드 관리
- **Firebase** - 백엔드 서비스 (문의 폼 등)

---

## 📁 프로젝트 구조

```
mvp_project_04/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # 글로벌 스타일
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 메인 페이지
│   ├── components/            # React 컴포넌트
│   │   ├── HeroSection.tsx    # 히어로 섹션
│   │   ├── ServicesSection.tsx # 서비스 소개
│   │   ├── AboutSection.tsx   # 회사 소개
│   │   ├── PortfolioSection.tsx # 포트폴리오
│   │   ├── ContactSection.tsx # 문의 폼
│   │   ├── Header.tsx         # 헤더/네비게이션
│   │   └── Footer.tsx         # 푸터
│   └── lib/
│       └── firebase.ts        # Firebase 설정
├── public/                    # 정적 파일
│   ├── images/               # 이미지 파일
│   └── *.svg                 # 아이콘 파일
├── package.json              # 의존성 관리
├── tailwind.config.js        # Tailwind 설정
├── tsconfig.json            # TypeScript 설정
└── next.config.ts           # Next.js 설정
```

---

## 🎨 디자인 시스템

### 컬러 팔레트
```css
/* Primary Colors */
--primary: #2563eb (blue-600)
--primary-light: #7dd3fc (sky-300)
--primary-dark: #1e40af (blue-800)

/* Secondary Colors */
--secondary: #7c3aed (violet-600)
--secondary-light: #c4b5fd (violet-300)
--secondary-dark: #4c1d95 (violet-900)

/* CTA Colors */
--cta: #db2777 (pink-600)
--cta-light: #f472b6 (pink-400)
--cta-dark: #831843 (pink-900)
```

### 폰트 계층
```css
/* 폰트 패밀리 */
font-display: Pretendard, Noto Sans KR, Inter
font-heading: Pretendard, Noto Sans KR, Inter
font-sans: Pretendard, Noto Sans KR, Inter, system-ui
font-mono: JetBrains Mono, Fira Code, Monaco, Consolas
```

### 그라디언트
- **메인 그라디언트**: `linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)`
- **카드 그라디언트**: `linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)`
- **히어로 그라디언트**: `linear-gradient(135deg, #1e40af 0%, #2563eb 25%, #7c3aed 75%, #db2777 100%)`

---

## 🚀 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/mxten777/mvp_project_04.git
cd mvp_project_04
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```
→ http://localhost:3000에서 확인

### 4. 빌드 테스트
```bash
npm run build
npm start
```

---

## 📱 페이지 구성

### 1. Hero Section
- **목적**: 첫인상과 주요 메시지 전달
- **기능**: CTA 버튼, 외부 포트폴리오 링크
- **스타일**: 그라디언트 배경, 애니메이션 효과

### 2. Services Section  
- **목적**: 제공 서비스 소개
- **내용**: AI/RPA, 웹개발, 공공데이터 활용
- **스타일**: 카드 레이아웃, 호버 효과

### 3. About Section
- **목적**: 회사 및 팀 소개
- **내용**: 비전, 미션, 핵심 가치
- **스타일**: 다크모드 지원, 반응형

### 4. Portfolio Section
- **목적**: 주요 프로젝트 소개
- **내용**: 프로젝트 케이스 스터디
- **스타일**: 그리드 레이아웃, 이미지 갤러리

### 5. Contact Section
- **목적**: 문의 및 연락처
- **기능**: Firebase 연동 문의 폼
- **스타일**: 폼 유효성 검사, 로딩 상태

---

## 🔧 주요 기능

### 반응형 디자인
- **Mobile First** 접근법
- **Breakpoints**: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px)
- **Grid System**: Tailwind CSS 그리드 활용

### 다크모드 지원
- **수동 토글**: 헤더 다크모드 버튼
- **시스템 설정**: `prefers-color-scheme` 감지
- **상태 관리**: 로컬 스토리지 저장

### 애니메이션
- **Framer Motion**: 페이지 전환, 스크롤 애니메이션
- **CSS Animations**: 호버 효과, 로딩 스피너
- **Intersection Observer**: 스크롤 기반 애니메이션

### SEO 최적화
- **Meta Tags**: 제목, 설명, OG 태그
- **Structured Data**: JSON-LD 스키마
- **Sitemap**: 자동 생성 (Next.js)

---

## 🔄 배포 프로세스

### GitHub Workflow
```bash
# 1. 개발 작업
git checkout -b feature/new-feature
# 작업 진행...

# 2. 커밋 & 푸시
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/new-feature

# 3. 메인 브랜치 병합
git checkout main
git merge feature/new-feature
git push origin main
```

### Vercel 자동 배포
- **Trigger**: `main` 브랜치 푸시 시 자동 배포
- **빌드 명령**: `npm run build`
- **환경변수**: Vercel 대시보드에서 관리
- **도메인**: 자동 생성 URL 또는 커스텀 도메인

---

## 🐛 문제 해결

### 자주 발생하는 이슈

#### 1. Tailwind CSS 스타일이 적용되지 않음
```bash
# 해결: PostCSS 재시작
npm run dev
```

#### 2. 폰트 로딩 실패
```bash
# 해결: 폰트 캐시 클리어
npm run build
```

#### 3. 빌드 오류
```bash
# 해결: 타입 체크
npm run lint
npx tsc --noEmit
```

### 디버깅 도구
- **React DevTools**: 컴포넌트 상태 확인
- **Chrome DevTools**: 네트워크, 성능 분석
- **Vercel Analytics**: 배포 로그 확인

---

## 📊 성능 메트릭

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 최적화 기법
- **이미지 최적화**: Next.js Image 컴포넌트
- **코드 분할**: 동적 import, 지연 로딩
- **CSS 최적화**: Tailwind CSS PurgeCSS
- **폰트 최적화**: font-display: swap

---

## 🔐 보안 고려사항

### Content Security Policy
```javascript
// next.config.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
`;
```

### 환경변수 관리
- **민감 정보**: `.env.local` 파일
- **공개 변수**: `NEXT_PUBLIC_` 접두사
- **Vercel 환경**: 대시보드에서 관리

---

## 📞 팀 연락처 & 지원

### 개발팀
- **프로젝트 매니저**: [담당자명]
- **Frontend 개발**: [담당자명]
- **UI/UX 디자인**: [담당자명]

### 지원 채널
- **GitHub Issues**: 버그 리포트, 기능 요청
- **Slack**: #mvp-project-04 채널
- **이메일**: support@baikalsystems.com

### 업데이트 주기
- **정기 배포**: 매주 금요일
- **긴급 수정**: 필요시 즉시
- **메이저 업데이트**: 월 1회

---

## 📚 추가 문서

### 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 가이드](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion)
- [Vercel 배포 가이드](https://vercel.com/docs)

### 내부 문서
- `README.md` - 기본 설정 가이드
- `CHANGELOG.md` - 버전별 변경사항
- `CONTRIBUTING.md` - 기여 가이드라인

---

*마지막 업데이트: 2025년 10월 3일*
*문서 버전: 1.0.0*