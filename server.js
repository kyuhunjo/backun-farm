import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8083;

console.log('Starting server with port:', port);

// OpenWeatherMap API 키 설정
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// 보안 미들웨어 설정 수정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
      imgSrc: ["'self'", 'data:', 'https:', 'http:'],
      connectSrc: ["'self'", 'https:', 'http:', 'ws:', 'wss:', 'api.openweathermap.org'],
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
  xssFilter: true
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

// 헬스체크 엔드포인트
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 날씨 API 엔드포인트
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=kr&appid=${WEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('날씨 API 호출 중 오류:', error);
    res.status(500).json({ error: '날씨 정보를 가져오는데 실패했습니다.' });
  }
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