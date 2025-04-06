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
const apiUrl = process.env.VITE_API_URL || 'http://backun-farm-backend:8084';

// 환경 변수 로깅
console.log('=== 서버 환경 설정 ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_API_URL:', process.env.VITE_API_URL);
console.log('PORT:', port);
console.log('====================');

// 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API 프록시 설정
const apiProxy = createProxyMiddleware('/api', {
  target: apiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // '/api' 프리픽스 제거
  },
  onProxyReq: (proxyReq, req) => {
    console.log(`프록시 요청: ${req.method} ${req.url} -> ${apiUrl}${req.url.replace('/api', '')}`);
  },
  onProxyRes: (proxyRes, req) => {
    console.log(`프록시 응답: ${proxyRes.statusCode} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('프록시 에러:', err);
    res.status(500).send('프록시 에러가 발생했습니다.');
  }
});

// 보안 헤더 설정
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// gzip 압축
app.use(compression());

// API 프록시 미들웨어 적용
app.use('/api', apiProxy);

// 정적 파일 서빙
app.use(express.static(join(__dirname, 'dist')));

// API 프록시 설정 로깅
console.log('=== 프록시 설정 ===');
console.log('Static Directory:', join(__dirname, 'dist'));
console.log('API Target:', apiUrl);
console.log('==================');

// SPA를 위한 라우팅 설정
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// 에러 핸들링 미들웨어
app.use((err, req, res, _next) => {
  console.error('서버 에러:', err);
  res.status(500).send('서버 에러가 발생했습니다.');
});

app.listen(port, () => {
  console.log(`프론트엔드 서버가 포트 ${port}에서 실행 중입니다.`);
  console.log('서버 시작 시간:', new Date().toISOString());
});
