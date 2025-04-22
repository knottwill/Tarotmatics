/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mystical: {
          dark: '#1a103d',
          medium: '#2e1a5a',
          light: '#6237a0',
          accent: '#9d71ea',
          gold: '#e6c057',
        },
      },
      fontFamily: {
        mystical: ['Cinzel Decorative', 'serif'],
        reading: ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shuffle': 'shuffle 2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { opacity: 0.4 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 0.4 },
        },
        shuffle: {
          '0%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(100px) rotate(-5deg)' },
          '50%': { transform: 'translateX(-50px) rotate(5deg)' },
          '75%': { transform: 'translateX(25px) rotate(-2deg)' },
          '100%': { transform: 'translateX(0) rotate(0)' },
        },
      },
    },
  },
  plugins: [],
}; 