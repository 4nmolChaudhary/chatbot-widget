import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'assistant',
      fileName: 'assistant',
      formats: ['iife'], // Immediately Invoked Function Expression (runs in browser)
    },
    rollupOptions: {
      output: {
        // Prevent splitting into multiple chunks
        inlineDynamicImports: true,
      },
    },
  },
})

