import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수 로드 (VITE_ 접두사 변수 포함)
  const env = loadEnv(mode, process.cwd(), ['VITE_'])
  const isDev = mode === 'development'
  const backendUrl = isDev ? 'http://localhost:8084' : 'https://hs-api.imjoe24.com'

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
      proxy: isDev ? {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          ws: true,
          onProxyReq: (proxyReq, req) => {
            console.log(`[Dev Proxy] Request: ${req.method} ${req.url} -> ${backendUrl}${req.url}`);
          },
          onProxyRes: (proxyRes) => {
            console.log(`[Dev Proxy] Response: ${proxyRes.statusCode}`);
          },
          onError: (err) => {
            console.error('[Dev Proxy] Error:', err);
          }
        }
      } : {}
    },
    define: {
      // Vite 환경 변수 설정
      __VUE_PROD_DEVTOOLS__: false,
      'process.env': {
        ...env,
        NODE_ENV: mode
      }
    }
  }
}) 