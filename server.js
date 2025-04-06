import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8083;

// 환경 변수 로깅
console.log('=== 서버 환경 설정 ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', port);
console.log('====================');

// 보안 헤더 설정
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// gzip 압축
app.use(compression());

// 정적 파일 서빙
app.use(express.static(join(__dirname, 'dist')));

// 프록시 설정
if (process.env.NODE_ENV === 'production') {
  app.use('/api', createProxyMiddleware({
    target: 'http://backun-farm-backend:8084',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'  // /api 경로 유지
    },
    onProxyReq: (proxyReq, req) => {
      console.log(`[Production Proxy] Request: ${req.method} ${req.url} -> http://backun-farm-backend:8084${req.url}`);
    },
    onProxyRes: (proxyRes, req) => {
      console.log(`[Production Proxy] Response: ${proxyRes.statusCode} ${req.url}`);
    },
    onError: (err) => {
      console.error('[Production Proxy] Error:', err);
    }
  }));
}

// SPA를 위한 라우팅 설정
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`프론트엔드 서버가 포트 ${port}에서 실행 중입니다.`);
});
