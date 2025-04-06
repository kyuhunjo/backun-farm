import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = mode === 'development'
  const backendUrl = isDev 
    ? 'http://localhost:8084'
    : 'http://backun-farm-backend:8084'

  console.log('=== Vite 설정 정보 ===')
  console.log('Mode:', mode)
  console.log('Backend URL:', backendUrl)
  console.log('Environment:', env)
  console.log('===================')

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      proxy: {
        '^/api/.*': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => {
            const rewrittenPath = path.replace(/^\/api/, '');
            console.log(`[Vite Proxy] ${path} -> ${rewrittenPath}`);
            return rewrittenPath;
          },
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log(`[Vite Proxy] Request: ${req.method} ${req.url} -> ${options.target}${req.url.replace(/^\/api/, '')}`);
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log(`[Vite Proxy] Response: ${proxyRes.statusCode} ${req.url}`);
            });
            proxy.on('error', (err) => {
              console.error('[Vite Proxy] Error:', err);
            });
          }
        }
      }
    },
    define: {
      'process.env': env
    }
  }
}) 