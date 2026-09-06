/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17362d',
        sage: {
          50: '#f3f8f5',
          100: '#e4f0e9',
          200: '#c9e0d3',
          300: '#9fc8b1',
          400: '#70ab8b',
          500: '#4a8e6d',
          600: '#387157',
          700: '#2f5b48',
          800: '#29493d',
          900: '#233d34'
        },
        apricot: '#f5a65b'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,54,45,.04), 0 12px 32px rgba(23,54,45,.06)',
        lift: '0 12px 30px rgba(47,91,72,.20)'
      }
    }
  },
  plugins: []
}
