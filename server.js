const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 8083;
const httpsPort = process.env.HTTPS_PORT || 8443;

// 보안 미들웨어
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https:'],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
}));

// gzip 압축
app.use(compression());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')));

// SPA를 위한 라우팅 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// HTTP 서버
app.listen(port, '0.0.0.0', () => {
  console.log(`HTTP server running on port ${port}`);
});

// HTTPS 서버
try {
  const privateKey = fs.readFileSync('/etc/nginx/ssl/imjoe24.com.key', 'utf8');
  const certificate = fs.readFileSync('/etc/nginx/ssl/imjoe24.com.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(httpsPort, '0.0.0.0', () => {
    console.log(`HTTPS server running on port ${httpsPort}`);
  });
} catch (error) {
  console.error('SSL 인증서를 로드하는 중 오류가 발생했습니다:', error);
} 