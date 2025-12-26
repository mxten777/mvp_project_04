/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // 기본 본문 텍스트 - 가독성 최우선
        sans: ['Pretendard Variable', 'Pretendard', 'Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        
        // 헤드라인 & 브랜딩 - 임팩트 & 전문성
        display: ['Cal Sans', 'Space Grotesk', 'Inter', 'Pretendard Variable', 'sans-serif'],
        
        // 제목 & 강조 텍스트 - 모던 & 세련됨
        heading: ['Geist', 'Space Grotesk', 'Inter', 'Pretendard Variable', 'sans-serif'],
        
        // 코딩 & 기술 텍스트 - 개발자 친화적
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
        
        // UI 라벨 & 버튼 - 깔끔한 인터페이스
        ui: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
        
        // 브랜드 로고 & 특별 텍스트 - 독특함
        brand: ['Cal Sans', 'Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          light: '#7dd3fc', // sky-300
          DEFAULT: '#2563eb', // blue-600
          dark: '#1e40af', // blue-800
        },
        secondary: {
          light: '#c4b5fd', // violet-300
          DEFAULT: '#7c3aed', // violet-600
          dark: '#4c1d95', // violet-900
        },
        card: {
          light: '#fff',
          dark: '#18181b', // zinc-900
        },
        cta: {
          light: '#f472b6', // pink-400
          DEFAULT: '#db2777', // pink-600
          dark: '#831843', // pink-900
        },
        gradientFrom: '#2563eb', // blue-600
        gradientVia: '#7c3aed', // violet-600
        gradientTo: '#db2777', // pink-600
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
        'card-gradient': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'cta-gradient': 'linear-gradient(90deg, #db2777 0%, #7c3aed 100%)',
        'hero-gradient': 'linear-gradient(135deg, #1e40af 0%, #2563eb 25%, #7c3aed 75%, #db2777 100%)',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(36, 37, 47, 0.08)',
        cta: '0 2px 8px 0 rgba(219, 39, 119, 0.15)',
        'dark-card': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.5)',
      },
      borderRadius: {
        card: '1.25rem',
        cta: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounceSlow 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSlow: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.8)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.7',
            letterSpacing: '-0.01em',
          },
        },
      },
      fontSize: {
        // 확장된 타이포그래피 스케일 (Tailwind 3.4.0)
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        
        // 전문적인 디스플레이 사이즈
        'display-xs': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.02em' }],
        'display-sm': ['3.6rem', { lineHeight: '3.6rem', letterSpacing: '-0.025em' }],
        'display-md': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '-0.03em' }],
        'display-lg': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.035em' }],
        'display-xl': ['7.2rem', { lineHeight: '7.2rem', letterSpacing: '-0.04em' }],
        'display-2xl': ['9rem', { lineHeight: '9rem', letterSpacing: '-0.045em' }],
      },
      fontWeight: {
        // 확장된 폰트 굵기
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        // 정밀한 자간 조정
        tightest: '-0.075em',
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      // Figma visual tokens (placeholders). These map to CSS variables
      // Values should be filled with exact Figma token values when available.
      figma: {
        colors: {
          primary: 'var(--figma-primary-500)',
          neutral: {
            100: 'var(--figma-neutral-100)',
            500: 'var(--figma-neutral-500)',
            900: 'var(--figma-neutral-900)',
          },
          bg: 'var(--figma-bg)',
          border: 'var(--figma-border)',
          text: 'var(--figma-text)'
        },
        spacing: {
          '1': 'var(--figma-space-4)',
          '2': 'var(--figma-space-8)',
          '3': 'var(--figma-space-12)',
          '4': 'var(--figma-space-16)',
          '6': 'var(--figma-space-24)',
          '8': 'var(--figma-space-32)'
        },
        radius: {
          card: 'var(--figma-radius-card)',
          button: 'var(--figma-radius-button)'
        }
      },
    },
  },
  plugins: [],
}

