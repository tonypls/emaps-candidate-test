const defaultTheme = require('tailwindcss/defaultTheme');
const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');
const radix = require('tailwindcss-radix');
const typography = require('@tailwindcss/typography');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['index.html', 'src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      animation: {
        'slide-down': 'slide-down 0.3s cubic-bezier(0.87, 0, 0.13, 1)',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        'slide-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        'slide-up': {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
      },
      boxShadow: {
        '2xl': '0.1px 0.1px 5px rgba(0, 0, 0, 0.1)',
        '3xl': '0.1px 0.1px 6px rgba(0, 0, 0, 0.15);',
      },
      colors: {
        'brand-green': '#135836',
        'brand-yellow': '#E9B73B',
        'brand-brown': '#702214',
        success: {
          DEFAULT: colors.emerald[800],
          dark: colors.emerald[500],
        },
        warning: {
          DEFAULT: colors.amber[700],
          dark: colors.amber[500],
        },
        danger: {
          DEFAULT: colors.red[700],
          dark: colors.red[400],
        },
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      poppins: ['Poppins', ...defaultConfig.theme.fontFamily.sans],
      inter: ['Inter', ...defaultConfig.theme.fontFamily.sans],
    },
  },
  plugins: [formsPlugin, typography, radix()],
};
module.exports = config;
