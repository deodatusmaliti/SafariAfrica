/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Savanna / earth palette
        sand: {
          50: '#fbf7f0',
          100: '#f4ebd9',
          200: '#e8d5b0',
          300: '#dbbd86',
          400: '#cca15c',
          500: '#bd8a40',
          600: '#a4733280',
          700: '#7a5530',
          800: '#523c25',
          900: '#2e2216',
        },
        acacia: {
          50: '#f3f8f1',
          100: '#e3f0dd',
          200: '#c7e1bd',
          300: '#9fc990',
          400: '#73ad62',
          500: '#52913f',
          600: '#3f7330',
          700: '#345c28',
          800: '#2c4a23',
          900: '#1f341a',
        },
        sunset: {
          50: '#fff6ed',
          100: '#ffe9d4',
          200: '#ffd0a8',
          300: '#ffaf70',
          400: '#ff8538',
          500: '#fb6411',
          600: '#ec4b06',
          700: '#c43806',
          800: '#9c2e0c',
          900: '#7e2810',
        },
        sky: {
          50: '#eef7fb',
          100: '#d4ecf5',
          200: '#a9d8eb',
          300: '#74bcdb',
          400: '#459cc6',
          500: '#2a80ab',
          600: '#216589',
          700: '#1d5170',
          800: '#1c445c',
          900: '#1b3a4d',
        },
        ink: {
          50: '#f6f6f5',
          100: '#e7e6e3',
          200: '#cfccc6',
          300: '#a9a49a',
          400: '#7d776b',
          500: '#5e5a51',
          600: '#494640',
          700: '#3a3833',
          800: '#282724',
          900: '#191816',
        },
        success: {
          500: '#16a34a',
          600: '#15803d',
        },
        warning: {
          500: '#d97706',
        },
        error: {
          500: '#dc2626',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'ken-burns': 'kenBurns 18s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.12) translateY(-2%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-468px 0' },
          '100%': { backgroundPosition: '468px 0' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
