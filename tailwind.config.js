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
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
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
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(36, 37, 47, 0.08)',
        cta: '0 2px 8px 0 rgba(219, 39, 119, 0.15)',
      },
      borderRadius: {
        card: '1.25rem',
        cta: '9999px',
      },
    },
  },
  plugins: [],
}

