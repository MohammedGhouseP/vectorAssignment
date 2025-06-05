import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#1D4ED8",
        brandGreen: "#10B981",
        brandGray: "#F3F4F6",
      },
    },
  },
  plugins: [react(),tailwindcss(),],
})
