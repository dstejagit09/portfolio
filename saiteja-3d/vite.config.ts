import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure a single instance of these libs across the dep graph:
  // - three: avoids "Multiple instances of Three.js" + broken instanceof
  // - react/react-dom: avoids framer-motion resolving a second React copy,
  //   which throws "Invalid hook call" on every motion component.
  resolve: {
    dedupe: ['three', 'react', 'react-dom'],
  },
})
