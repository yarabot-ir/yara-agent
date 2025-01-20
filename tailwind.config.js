import { fontFamily } from 'tailwindcss/defaultTheme';

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: withOpacity('--color-primary-900'),
          800: withOpacity('--color-primary-800'),
          700: withOpacity('--color-primary-700'),
          600: withOpacity('--color-primary-600'),
          500: withOpacity('--color-primary-500'),
          400: withOpacity('--color-primary-400'),
          300: withOpacity('--color-primary-300'),
          200: withOpacity('--color-primary-200'),
          150: withOpacity('--color-primary-150'),
          100: withOpacity('--color-primary-100'),
          50: withOpacity('--color-primary-50'),
        },
        secondary: {
          900: withOpacity('--color-secondary-900'),
          800: withOpacity('--color-secondary-800'),
          700: withOpacity('--color-secondary-700'),
          600: withOpacity('--color-secondary-600'),
          550: withOpacity('--color-secondary-550'),
          500: withOpacity('--color-secondary-500'),
          400: withOpacity('--color-secondary-400'),
          300: withOpacity('--color-secondary-300'),
          200: withOpacity('--color-secondary-200'),
          150: withOpacity('--color-secondary-150'),
          100: withOpacity('--color-secondary-100'),
          50: withOpacity('--color-secondary-50'),
          0: withOpacity('--color-secondary-0'),
        },
        Background: withOpacity('--Background'),
        successDark: withOpacity('--color-success-dark'),
        successLight: withOpacity('--color-success-light'),
        IBlueDark: withOpacity('--color-IBlue-dark'),
        IBlue: withOpacity('--color-IBlue'),
        IBlueLight: withOpacity('--color-IBlue-light'),
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        yekanBakh: ['YekanBakh', ...fontFamily.sans],
      },
      keyframes: {
        wave: {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0.3' },
        },
      },
      animation: {
        wave: 'wave 6s  infinite',
      },
    },
  },

  darkMode: ['class', '[class="dark-mode"]'],
  plugins: [],
};
