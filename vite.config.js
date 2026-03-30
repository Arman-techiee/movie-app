import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
          theme: {
            extend: {
              fontFamily: {
                display: ['Playfair Display', 'serif'],
                body: ['DM Sans', 'sans-serif'],
                mono: ['DM Mono', 'monospace'],
              },
              colors: {
                cinema: {
                  black: '#0A0A0F',
                  deep: '#12121A',
                  card: '#1A1A26',
                  border: '#2A2A3E',
                  gold: '#F5C518',
                  'gold-dim': '#B8931A',
                  red: '#E63946',
                  teal: '#2EC4B6',
                  text: '#E8E8F0',
                  muted: '#8888AA',
                  dim: '#55556A',
                },
              },
              backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              },
              animation: {
                'fade-in': 'fadeIn 0.4s ease forwards',
                'slide-up': 'slideUp 0.4s ease forwards',
                'scale-in': 'scaleIn 0.3s ease forwards',
                shimmer: 'shimmer 1.8s infinite',
              },
              keyframes: {
                fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
                slideUp: {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
                scaleIn: {
                  from: { opacity: 0, transform: 'scale(0.95)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                },
                shimmer: {
                  '0%': { backgroundPosition: '-200% 0' },
                  '100%': { backgroundPosition: '200% 0' },
                },
              },
            },
          },
          plugins: [],
        }),
        autoprefixer(),
      ],
    },
  },
})
