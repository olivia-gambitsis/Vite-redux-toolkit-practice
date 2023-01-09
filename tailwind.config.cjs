/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
    './src/components/**/*.{html,js,jsx,ts,tsx}',
    './App.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        mdlg: {
          min: '768px',
          max: '1023px',
        },
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      fontSize: {
        button: '14px',
        h1: '96px',
        h2: '60px',
        h3: '48px',
        h4: '43px',
        h5: '24px',
        h6: '20px'
      },
      colors: {
        'light-green': '#86efac',
        'wild-blue-yonder': '#8EA4D2',
        'glaucous': '#6279B8',
        'independence': '#49516F',
        'lavender-floral': '#A882DD',
        'apricot': '#FFCAB1',
        'cyber-grape': '#49416D'
      },
    }
  },
  plugins: [],
}
