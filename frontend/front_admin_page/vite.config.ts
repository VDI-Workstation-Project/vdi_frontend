import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  logLevel: 'info' // 로그 레벨 설정 ('info', 'warn', 'error', 'silent')
})