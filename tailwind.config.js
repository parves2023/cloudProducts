/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode support using class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-footer-bg': 'rgb(var(--nav-footer-bg))',
        'text-primary': 'rgb(var(--text-color-primary))',
        'text-secondary': 'rgb(var(--text-color-secondary))',
        'text-light': 'rgb(var(--text-color-light))',
        'cardback': 'rgb(var(--cardback))',
        'border': 'rgb(var(--border))',
        'background': 'rgb(var(--background))',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
