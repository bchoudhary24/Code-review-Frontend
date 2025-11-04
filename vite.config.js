/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [react()],
})*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: '.', // ✅ ensure vite runs from repo root
    build: {
        outDir: 'dist', // ✅ output folder
    },
})