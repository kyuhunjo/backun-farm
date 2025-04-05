import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { dirname } from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';
import tf from '@tensorflow/tfjs-node';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 파일 로딩
dotenv.config();

// 환경변수 설정
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/backun_farm';
const PORT = process.env.PORT || 8083;

if (!WEATHER_API_KEY) {
  console.error('Error: WEATHER_API_KEY environment variable is not set');
  process.exit(1);
}

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// 스키마 정의
const SensorDataSchema = new mongoose.Schema({
  location: String,
  type: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

const ReservationSchema = new mongoose.Schema({
  programName: String,
  date: Date,
  participants: Number,
  contact: String,
  status: String
});

const CropHealthSchema = new mongoose.Schema({
  cropType: String,
  location: String,
  imageUrl: String,
  diagnosis: String,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

// 모델 생성
const SensorData = mongoose.model('SensorData', SensorDataSchema);
const Reservation = mongoose.model('Reservation', ReservationSchema);
const CropHealth = mongoose.model('CropHealth', CropHealthSchema);

// Multer 설정
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const app = express();

// 미들웨어 설정
app.use(express.json());
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
}));
app.use(compression());

// CORS 설정
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// 정적 파일 제공
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'dist')));

// AI 모델 로드
let model;
async function loadModel() {
  try {
    model = await tf.loadLayersModel('file://./models/crop_disease_model/model.json');
    console.log('AI 모델 로드 성공');
  } catch (error) {
    console.error('AI 모델 로드 실패:', error);
  }
}
loadModel();

// API 엔드포인트

// 날씨 API
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${WEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('날씨 API 호출 중 오류:', error);
    res.status(500).json({ error: error.message });
  }
});

// IoT 센서 데이터 API
app.post('/api/sensor-data', async (req, res) => {
  try {
    const sensorData = new SensorData(req.body);
    await sensorData.save();
    res.status(201).json(sensorData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sensor-data', async (req, res) => {
  try {
    const { location, type, from, to } = req.query;
    const query = {};
    if (location) query.location = location;
    if (type) query.type = type;
    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from);
      if (to) query.timestamp.$lte = new Date(to);
    }
    
    const data = await SensorData.find(query).sort('-timestamp');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 작물 건강 상태 진단 API
app.post('/api/crop-health', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('이미지가 제공되지 않았습니다.');
    }

    // 이미지 전처리 및 모델 예측
    const image = await tf.node.decodeImage(fs.readFileSync(req.file.path));
    const resized = tf.image.resizeBilinear(image, [224, 224]);
    const expanded = resized.expandDims(0);
    const normalized = expanded.div(255.0);
    
    const prediction = await model.predict(normalized).data();
    const confidence = Math.max(...prediction);
    const classIndex = prediction.indexOf(confidence);
    
    // 진단 결과 저장
    const cropHealth = new CropHealth({
      cropType: req.body.cropType,
      location: req.body.location,
      imageUrl: req.file.path,
      diagnosis: getDiagnosisLabel(classIndex),
      confidence: confidence
    });
    await cropHealth.save();

    res.json(cropHealth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 예약 시스템 API
app.post('/api/reservations', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reservations', async (req, res) => {
  try {
    const { from, to, status } = req.query;
    const query = {};
    if (status) query.status = status;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    
    const reservations = await Reservation.find(query).sort('date');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 헬스체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// SPA 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 