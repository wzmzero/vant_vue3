// vite.config.js
 
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
 
export default defineConfig({
	plugins: [uni()],
 server: {
    proxy: {
    '/api': {
      target: 'https://wzmzero.top',
      changeOrigin: true,
      ws: true,
    },
      '/mqtt': {
      target: 'wss://122.51.127.33:8084',
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(/^\/mqtt/, ''),
    },
  }}
})