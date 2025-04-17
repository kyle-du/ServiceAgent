import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(),],
    base: '/',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  }
})
