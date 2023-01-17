const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    screens: {
      // => @media (min-width: 576px) { ... }
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
      'xl': '1920px',
      '2xl': '2560px',
    },
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        sbt: ['"sbt"']
      },
      colors: {
        'theme': {
          '400': 'var(--color-primary-light)',
          '500': 'var(--color-primary)',
          '600': 'var(--color-primary-dark)',
        },
        'content': 'var(--color-content)'
      },
      backgroundColor: {
        'content': 'var(--color-content-bg)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
