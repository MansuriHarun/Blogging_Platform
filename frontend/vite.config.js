import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/compose": "https://blogging-platform-api.onrender.com",
      "/allblogs": "https://blogging-platform-api.onrender.com",
      "/delete": "https://blogging-platform-api.onrender.com",
      "/signup": "https://blogging-platform-api.onrender.com",
      "/signin": "https://blogging-platform-api.onrender.com",
      "/logout": "https://blogging-platform-api.onrender.com",
    }
  }
})
