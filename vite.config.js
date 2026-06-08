import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    global: 'window',
    'process.env': {}
  },
  base: '/TableGamesFront-vue-js/'
})
