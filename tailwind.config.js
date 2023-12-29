/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    colors: {
      'white': '#E9E9E9',
      'light-blue': '#41A4FF',
      'dark-blue': '#003D75',
      'gray': '#3C3C3C',
      'black': '#000',
      'royal-blue': '#007cff',
      'red': '#CD0000',
      'transparent-gray': 'rgba(60, 60, 60, 0.5)'
    },
    fontFamily: {
      serif: ['Podkova', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}