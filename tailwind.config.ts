import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FFD700',
          green: '#2D5016',
        },
        gabon: {
          blue: '#1E5BA8',
          yellow: '#FFCD00',
          green: '#007A5E',
        },
        brand: {
          // Vert, jaune, bleu = couleurs officielles du drapeau gabonais.
          green: '#009E60',
          'green-dark': '#00784A',
          yellow: '#FCD116',
          blue: '#3A75C4',
          // Rouge-orangé de l'héliconia (fleur du perroquet) et du badamier.
          heliconia: '#E8471E',
          cream: '#F2F2E4',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
