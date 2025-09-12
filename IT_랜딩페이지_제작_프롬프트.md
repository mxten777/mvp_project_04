# IT업체 랜딩페이지 제작 프롬프트 (참고용)

## 1. 목적
- 최신 Next.js, React, TypeScript, Tailwind CSS, Framer Motion 등으로 완성도 높은 IT기업/에이전시 랜딩페이지를 제작한다.
- 본 프로젝트(`mvp_project_04`)의 구조, 디자인, 컴포넌트, 배포 방식 등을 참고하여 새로운 IT업체 랜딩페이지에 적용한다.

## 2. 기술 스택
- **Next.js 15.x (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS v3.3.3** (표준화 적용)
- **Framer Motion** (애니메이션)
- **Heroicons** (아이콘)
- **Firebase** (필요시 백엔드)
- **Vercel** (배포)

## 3. 주요 컴포넌트 및 섹션
- **Header**: 스크롤 반응형 네비게이션, 로고, 모바일 메뉴
- **HeroSection**: 임팩트 있는 첫 화면, CTA, 애니메이션, 그라디언트 배경
- **ServicesSection**: 6개 내외의 핵심 서비스 카드, 컬러 테마, 인터랙션
- **AboutSection**: 회사 소개, 미션/비전, 팀 등
- **PortfolioSection**: 주요 프로젝트/고객사/성과
- **ContactSection**: 문의 폼, 연락처, 지도 등
- **Footer**: 회사 정보, 소셜 링크, 저작권

## 4. 디자인 가이드
- **다크 테마** + **그라디언트** 활용
- **반응형(Responsive)** 디자인 필수
- **모던/프로페셔널**한 느낌 강조
- **Framer Motion**으로 부드러운 등장/전환 애니메이션
- **Tailwind CSS**로 빠른 스타일링 및 커스터마이징

## 5. 개발/배포 플로우
1. Next.js 프로젝트 생성 (TypeScript, App Router)
2. Tailwind CSS, Framer Motion 등 필수 패키지 설치
3. 위 주요 컴포넌트 구조로 폴더/파일 설계
4. 각 섹션별 디자인 및 기능 구현
5. 모바일/PC 반응형 테스트
6. ESLint/TypeScript 오류 해결
7. `npm run build`로 프로덕션 빌드 검증
8. Vercel로 배포 (`npx vercel --prod`)

## 6. 참고 코드/구조
- `src/app/layout.tsx`, `src/app/page.tsx` : 전체 구조 참고
- `src/app/components/` : 각 섹션별 컴포넌트 구현 방식 참고
- `globals.css` : Tailwind 및 커스텀 스타일 참고
- `package.json`, `postcss.config.mjs`, `tailwind.config.js` : 환경설정 참고

## 7. 활용 예시 프롬프트
```
최신 Next.js, React, TypeScript, Tailwind CSS, Framer Motion을 활용해 IT기업 랜딩페이지를 만들어줘. 
- 헤더, 히어로, 서비스, 포트폴리오, 문의, 푸터 섹션을 포함하고, 
- 다크테마와 그라디언트, 반응형, 부드러운 애니메이션을 적용해줘.
- 컴포넌트 구조와 폴더 설계도 함께 제안해줘.
```

## 8. 기타 팁
- Framer Motion의 `ease` 값은 string이 아닌 cubic-bezier 배열로 지정
- Tailwind CSS는 v3.3.3 표준화 적용 (v4는 Next.js 15과 충돌 가능)
- 배포 전 `npm run build`로 오류/경고 체크
- Vercel 배포시 환경변수(Firebase 등) 설정 필요시 `.env` 파일 활용

---

> 이 문서는 `mvp_project_04` 프로젝트를 기반으로 IT업체/에이전시 랜딩페이지 제작에 참고할 수 있도록 작성되었습니다.
