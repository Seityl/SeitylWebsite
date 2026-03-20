/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        accent: {
          DEFAULT: '#4B3CFA',
          light: '#2F5BFF'
        },
        neutral: {
          100: '#E5E5E7',
          200: '#A5A5A8',
          300: '#6B6B6E',
          400: '#3A3A3E',
          500: '#252529'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        'extra-wide': '0.15em'
      }
    }
  },
  plugins: []
};
