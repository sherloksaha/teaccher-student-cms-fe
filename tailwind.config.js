/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf3ec',
          100: '#f3dece',
          200: '#e8c0a1',
          300: '#da9a67',
          400: '#cc7c3f',
          500: '#c06721',
          600: '#a5571c',
          700: '#864717',
          800: '#653511',
          900: '#43230b',
        },
        canvas: '#f0e9e4',
        ink: '#010101',
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(192, 103, 33, 0.28)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
