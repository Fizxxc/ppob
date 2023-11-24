/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#dc2626',
          'neutral': '#ffffff',
          'info': '#FCE700',
          'success': '#16a34a',
          'warning': '#fbbf24',
          'error': '#dc2626',
        },
      },
    ],
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('daisyui'),],
}

