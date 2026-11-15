export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#121212', darker: '#000000', dark: '#181818',
          card: '#1e1e1e', green: '#1DB954', 'green-hover': '#1ED760', gray: '#B3B3B3'
        }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        shimmer: 'shimmer 3s infinite',
        'bounce-slow': 'bounceSlow 2.5s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '60%,100%': { transform: 'translateX(100%)' }
        },
        bounceSlow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      }
    }
  },
  plugins: []
}
