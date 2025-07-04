/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dorado: '#d4af37',
        'dorado-claro': '#f4e4a6',
        'dorado-oscuro': '#b8941f',
        morado: '#6a0dad',
        lavanda: '#e6e6fa',
        'blanco-transparente': 'rgba(255, 255, 255, 0.85)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        marmoleado: "url('/src/assets/Fondomarmoleado.jpg')",
        'san-miguel': "url('/src/assets/FondoPantallaIniciovf.png')",
      },
      boxShadow: {
        angelical: '0 4px 20px rgba(106, 13, 173, 0.3)',
        dorado: '0 4px 20px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
}
