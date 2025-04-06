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
    : (env.VITE_API_URL || 'http://backun-farm-backend:8084')

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
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => {
            const rewrittenPath = path.replace(/^\/api/, '');
            console.log('프록시 URL 변환:', path, '=>', rewrittenPath);
            return rewrittenPath;
          },
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              console.log('프록시 에러:', err);
              // 에러 발생 시 상세 정보 로깅
              console.error('프록시 에러 상세 정보:', {
                error: err.message,
                url: req.url,
                method: req.method,
                headers: req.headers
              });
              // 프록시 에러 시 500 응답
              if (!res.headersSent) {
                res.writeHead(500, {
                  'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: '프록시 에러가 발생했습니다.' }));
              }
            });
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log('프록시 요청 정보:');
              console.log('  URL:', req.url);
              console.log('  Method:', req.method);
              console.log('  Headers:', proxyReq.getHeaders());
              console.log('  Target:', backendUrl + req.url.replace(/^\/api/, ''));
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('프록시 응답 정보:');
              console.log('  Status:', proxyRes.statusCode);
              console.log('  URL:', req.url);
              console.log('  Headers:', proxyRes.headers);
              
              // 404 에러 발생 시 상세 정보 로깅
              if (proxyRes.statusCode === 404) {
                console.error('404 에러 상세 정보:', {
                  originalUrl: req.url,
                  targetUrl: backendUrl + req.url.replace(/^\/api/, ''),
                  method: req.method,
                  headers: req.headers
                });
              }
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