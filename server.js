import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8083;

console.log('Starting server with port:', port);

// 보안 미들웨어 설정 수정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
      imgSrc: ["'self'", 'data:', 'https:', 'http:'],
      connectSrc: ["'self'", 'https:', 'http:', 'ws:', 'wss:'],
      fontSrc: ["'self'", 'https:', 'data:', 'http:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  originAgentCluster: false,
  strictTransportSecurity: false,
  referrerPolicy: { policy: 'no-referrer' },
  xssFilter: true,
  hsts: false
}));

// CORS 설정 추가
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // HTTPS 관련 헤더 제거
  res.removeHeader('Strict-Transport-Security');
  next();
});

// gzip 압축
app.use(compression());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res) => {
    res.removeHeader('Strict-Transport-Security');
  }
}));

// SPA를 위한 라우팅 설정
app.get('/', (req, res) => {
  res.removeHeader('Strict-Transport-Security');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 다른 모든 경로도 index.html로 리다이렉트
app.use((req, res) => {
  res.removeHeader('Strict-Transport-Security');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// HTTP 서버
app.listen(port, '0.0.0.0', () => {
  console.log(`HTTP server running on port ${port}`);
  console.log(`Server is listening on http://0.0.0.0:${port}`);
}); 