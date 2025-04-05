import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8083;

// 보안 헤더 설정
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// gzip 압축
app.use(compression());

// 정적 파일 서빙
app.use(express.static(join(__dirname, 'dist')));

// SPA를 위한 라우팅 설정
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`프론트엔드 서버가 포트 ${port}에서 실행 중입니다.`);
}); 