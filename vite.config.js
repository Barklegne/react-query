import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// Proxying API requests to avoid CORS issues
			'/api': {
				target: 'https://api.afromessage.com', // Your API base URL
				changeOrigin: true, // Required for virtual hosted sites
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
