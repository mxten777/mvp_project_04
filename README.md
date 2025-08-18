# (주) 바이칼시스템즈 - VIBE CODING 랜딩페이지

> AI와 RPA 기술로 미래를 코딩하는 디지털 혁신 파트너

## 🚀 프로젝트 개요

바이칼시스템즈의 바이브코딩 사업 런칭을 위한 전문적인 기업 랜딩페이지입니다. 

### 주요 특징
- ✨ 현대적이고 반응형 디자인
- 🎯 SEO 최적화
- 🔥 부드러운 애니메이션 효과
- 📱 모바일 완벽 지원
- 🔧 Firebase 실시간 문의 폼
- ⚡ Next.js 14 App Router 사용

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Heroicons
- **Backend**: Firebase Firestore
- **Deployment**: Vercel
- **Language**: TypeScript

## 🏗 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 Firebase 설정을 추가하세요:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### 4. 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/            # React 컴포넌트
│   ├── Header.tsx        # 네비게이션 헤더
│   ├── HeroSection.tsx   # 메인 히어로 섹션
│   ├── ServicesSection.tsx # 서비스 소개
│   ├── AboutSection.tsx  # 회사 소개
│   ├── ContactSection.tsx # 문의 폼
│   └── Footer.tsx        # 푸터
└── lib/
    └── firebase.ts       # Firebase 설정
```

## 🎨 주요 섹션

### 1. Hero Section
- 강력한 메인 메시지
- CTA 버튼
- 회사 통계 정보
- 그라데이션 배경

### 2. Services Section
- 6가지 핵심 서비스 소개
- 인터랙티브 카드 디자인
- 호버 애니메이션

### 3. About Section
- 회사 비전과 가치
- 핵심 역량 소개
- 회사 통계

### 4. Contact Section
- 실시간 문의 폼 (Firebase 연동)
- 상담 프로세스 안내
- 연락처 정보

## 🚀 배포

### Vercel 배포
1. Vercel 계정으로 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 완료

### Firebase 설정
1. Firebase 프로젝트 생성
2. Firestore 데이터베이스 활성화
3. 환경 변수에 설정 정보 추가

## 📧 문의사항

- **이메일**: contact@baikalsystems.co.kr
- **전화**: 070-1234-5678
- **주소**: 서울특별시 강남구 테헤란로 123

## 📄 라이선스

Copyright © 2024 (주) 바이칼시스템즈. All rights reserved.

---

**Powered by VIBE CODING** 🚀
