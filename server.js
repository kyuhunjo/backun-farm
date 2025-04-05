import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 파일 로딩 (옵션)
const envPath = path.resolve(process.cwd(), '.env');
console.log('Looking for .env file at:', envPath);

let WEATHER_API_KEY = process.env.WEATHER_API_KEY;
if (!WEATHER_API_KEY) {
  console.error('Error: WEATHER_API_KEY environment variable is not set');
  process.exit(1);
}

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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${WEATHER_API_KEY}`;
    console.log('Requesting weather data from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Weather API error response:', errorText);
      throw new Error(`Weather API responded with status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Weather API response:', data);
    
    // 응답 데이터 구조 변환
    const weatherData = {
      current: {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        weather: [{
          description: data.weather[0].description
        }]
      },
      daily: [{
        temp: {
          max: data.main.temp_max,
          min: data.main.temp_min
        }
      }]
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('날씨 API 호출 중 오류:', error);
    res.status(500).json({ error: error.message || '날씨 정보를 가져오는데 실패했습니다.' });
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