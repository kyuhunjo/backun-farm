import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import axios from 'axios';
import cors from 'cors';
import { parseString } from 'xml2js';
import { promisify } from 'util';

// .env 파일 로딩
dotenv.config();

// 환경변수 설정
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://172.30.1.14:27017/farm';
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

const CropHealthSchema = new mongoose.Schema({
  cropType: String,
  location: String,
  imageUrl: String,
  diagnosis: String,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

const MarketDataSchema = new mongoose.Schema({
  date: Date,
  location: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

// 모델 생성
const SensorData = mongoose.model('SensorData', SensorDataSchema);
const CropHealth = mongoose.model('CropHealth', CropHealthSchema);
const MarketData = mongoose.model('MarketData', MarketDataSchema);

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
app.use(cors());

const parseXML = promisify(parseString);

// API 엔드포인트

// 날씨 API 엔드포인트
app.get('/api/weather', async (req, res) => {
  try {
    const lat = '35.0519'; // 화순군 백운마을 위도
    const lon = '126.9918'; // 화순군 백운마을 경도
    
    // 현재 날씨와 함께 당일 예보 데이터도 가져오기
    const [currentWeather, forecastData] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`)
    ]);
    
    if (currentWeather.data) {
      const date = new Date(currentWeather.data.dt * 1000);
      // 한국 시간으로 변환
      const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
      
      // 오늘 날짜의 최고/최저 기온 계산
      let todayMin = currentWeather.data.main.temp;
      let todayMax = currentWeather.data.main.temp;
      
      if (forecastData.data && forecastData.data.list) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        forecastData.data.list.forEach(item => {
          const itemDate = new Date(item.dt * 1000);
          if (itemDate >= today && itemDate < tomorrow) {
            todayMin = Math.min(todayMin, item.main.temp);
            todayMax = Math.max(todayMax, item.main.temp);
          }
        });
      }
      
      const weatherData = {
        temperature: Math.round(currentWeather.data.main.temp * 10) / 10,
        temp_min: Math.round(todayMin * 10) / 10,
        temp_max: Math.round(todayMax * 10) / 10,
        humidity: currentWeather.data.main.humidity,
        rainfall: currentWeather.data.rain ? currentWeather.data.rain['1h'] || 0 : 0,
        windSpeed: Math.round(currentWeather.data.wind.speed * 10) / 10,
        windDirection: currentWeather.data.wind.deg,
        description: currentWeather.data.weather[0].description,
        icon: currentWeather.data.weather[0].icon,
        timestamp: kstDate.toISOString()
      };
      
      console.log('날씨 데이터 응답:', {
        ...weatherData,
        temp_min_calc: '최저기온 계산됨',
        temp_max_calc: '최고기온 계산됨'
      });
      res.json(weatherData);
    } else {
      throw new Error('Invalid API response structure');
    }
  } catch (error) {
    console.error('날씨 API 호출 오류:', error);
    console.error('오류 상세:', error.response?.data || '상세 정보 없음');
    
    // 에러 발생 시 샘플 데이터 반환
    const sampleData = {
      temperature: 22.5,
      temp_min: 18.5,
      temp_max: 25.5,
      humidity: 65,
      rainfall: 0,
      windSpeed: 2.1,
      windDirection: 180,
      description: '맑음',
      icon: '01d',
      timestamp: new Date().toISOString()
    };
   
    console.log('샘플 데이터 반환:', sampleData);
    res.json(sampleData);
  }
});

// 5일 예보 API 엔드포인트
app.get('/api/forecast', async (req, res) => {
  try {
    const lat = '35.0519'; // 화순군 백운마을 위도
    const lon = '126.9918'; // 화순군 백운마을 경도
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
    
    console.log('예보 API 요청 URL:', url);
    const response = await axios.get(url);
    
    if (response.data && response.data.list) {
      // 날짜별로 데이터 그룹화
      const dailyData = {};
      const tempData = {}; // 최고/최저 기온 계산을 위한 임시 데이터
      
      // 오늘 자정 시간 구하기 (한국 시간 기준)
      const now = new Date();
      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0, 0, 0, 0
      );
      
      response.data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        // 한국 시간으로 변환
        const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        
        // 날짜만 추출하여 비교 (시간은 제외)
        const kstDateOnly = new Date(
          kstDate.getFullYear(),
          kstDate.getMonth(),
          kstDate.getDate()
        );
        
        // 오늘 날짜 제외 (한국 시간 기준)
        if (kstDateOnly.getTime() <= today.getTime()) {
          console.log('오늘 데이터 제외:', kstDate.toISOString());
          return;
        }
        
        const dateKey = kstDate.toISOString().split('T')[0];
        const hours = kstDate.getHours();
        
        // 각 날짜의 모든 기온 데이터 저장
        if (!tempData[dateKey]) {
          tempData[dateKey] = {
            temps: [],
            maxTemp: -Infinity,
            minTemp: Infinity,
            noonTemp: null,
            noonData: null
          };
        }
        
        // 현재 기온 데이터 저장 및 최고/최저 기온 업데이트
        const currentTemp = Math.round(item.main.temp * 10) / 10;
        tempData[dateKey].temps.push(currentTemp);
        tempData[dateKey].maxTemp = Math.max(tempData[dateKey].maxTemp, currentTemp);
        tempData[dateKey].minTemp = Math.min(tempData[dateKey].minTemp, currentTemp);
        
        // 정오(12시) 데이터 저장
        if (hours === 12) {
          tempData[dateKey].noonTemp = currentTemp;
          tempData[dateKey].noonData = {
            dt: item.dt,
            humidity: item.main.humidity,
            weather: item.weather,
            wind: item.wind,
            rain: item.rain
          };
        }
      });
      
      // 각 날짜별 데이터 정리
      Object.entries(tempData).forEach(([dateKey, data]) => {
        if (data.noonData) {
          dailyData[dateKey] = {
            dt: data.noonData.dt,
            main: {
              temp: data.noonTemp,
              temp_min: Math.round(data.minTemp * 10) / 10,
              temp_max: Math.round(data.maxTemp * 10) / 10,
              humidity: data.noonData.humidity
            },
            weather: data.noonData.weather.map(w => ({
              description: w.description,
              icon: w.icon
            })),
            wind: {
              speed: Math.round(data.noonData.wind.speed * 10) / 10,
              deg: data.noonData.wind.deg
            },
            rain: data.noonData.rain ? Math.round((data.noonData.rain['3h'] || 0) * 10) / 10 : 0
          };
          
          console.log('데이터 저장:', dateKey,
            '현재:', data.noonTemp,
            '최고:', data.maxTemp,
            '최저:', data.minTemp);
        }
      });
      
      // 날짜순으로 정렬하여 최대 5일 데이터만 반환
      const sortedData = Object.entries(dailyData)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .slice(0, 5)
        .map(([date, data]) => {
          const { hour, ...rest } = data;
          return rest;
        });
      
      console.log('정렬된 예보 데이터:', sortedData.map(item => {
        const date = new Date(item.dt * 1000);
        const kstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        return kstDate.toISOString().split('T')[0];
      }));
      res.json(sortedData);
    } else {
      throw new Error('Invalid API response structure');
    }
  } catch (error) {
    console.error('예보 API 호출 오류:', error);
    console.error('오류 상세:', error.response?.data || '상세 정보 없음');
    
    // 에러 발생 시 샘플 데이터 반환 (내일부터 5일치)
    const now = new Date();
    const sampleData = Array.from({ length: 5 }, (_, i) => ({
      dt: Math.floor(now.getTime() / 1000) + ((i + 1) * 86400),
      main: {
        temp: 22,
        temp_min: 18,
        temp_max: 25,
        humidity: 65
      },
      weather: [{
        description: '맑음',
        icon: '01d'
      }],
      wind: {
        speed: 2.1,
        deg: 180
      },
      rain: 0
    }));
    
    console.log('샘플 데이터 반환:', sampleData);
    res.json(sampleData);
  }
});

// IoT 센서 데이터 API
app.get('/api/sensor-data', async (req, res) => {
  try {
    const { location, type, period } = req.query;
    const query = {};
    
    if (location) query.location = location;
    if (type) query.type = type;
    
    let timeFilter = {};
    if (period) {
      const now = new Date();
      switch (period) {
        case 'day':
          timeFilter = { $gte: new Date(now.setDate(now.getDate() - 1)) };
          break;
        case 'week':
          timeFilter = { $gte: new Date(now.setDate(now.getDate() - 7)) };
          break;
        case 'month':
          timeFilter = { $gte: new Date(now.setMonth(now.getMonth() - 1)) };
          break;
        default:
          timeFilter = { $gte: new Date(now.setHours(now.getHours() - 6)) };
      }
      query.timestamp = timeFilter;
    }

    const data = await SensorData.find(query).sort({ timestamp: -1 }).limit(100);
    
    if (data.length === 0) {
      // 샘플 데이터 반환
      return res.json([
        {
          location: 'deodeok-A',
          type: 'moisture',
          value: 65,
          timestamp: new Date()
        },
        {
          location: 'doraji-A',
          type: 'co2',
          value: 420,
          timestamp: new Date()
        }
      ]);
    }
    
    res.json(data);
  } catch (error) {
    console.error('센서 데이터 조회 중 오류:', error);
    res.status(500).json({ error: '센서 데이터를 가져오는데 실패했습니다' });
  }
});

app.get('/api/sensor-data/:type', async (req, res) => {
  try {
    const { type } = req.params
    const data = await SensorData.find({ type })
      .sort({ timestamp: -1 })
      .limit(1)
    res.json(data[0] || null)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 작물 건강 상태 진단 API
app.post('/api/crop-health', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('이미지가 제공되지 않았습니다.');
    }

    // 임시 진단 로직 (실제로는 AI 모델이 수행)
    const diagnosis = {
      cropType: req.body.cropType,
      location: req.body.location,
      imageUrl: req.file.path,
      diagnosis: '정상',
      confidence: 0.95
    };

    // 진단 결과 저장
    const cropHealth = new CropHealth(diagnosis);
    await cropHealth.save();

    res.json(cropHealth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 헬스체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 시장 동향 데이터 API
app.get('/api/market-data', async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    
    const data = await MarketData.aggregate([
      {
        $match: {
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            location: '$location'
          },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $sort: {
          '_id.month': 1
        }
      }
    ]);

    if (data.length === 0) {
      // 샘플 데이터 반환
      const sampleData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
          {
            label: '백운마을',
            data: [12000, 13000, 11000, 14000, 16000, 15000],
            borderColor: 'rgb(75, 192, 192)'
          },
          {
            label: '전국 평균',
            data: [11000, 12000, 10500, 13000, 14500, 14000],
            borderColor: 'rgb(255, 99, 132)'
          }
        ]
      };
      return res.json(sampleData);
    }

    // 데이터 포맷팅
    const locations = [...new Set(data.map(item => item._id.location))];
    const months = [...new Set(data.map(item => item._id.month))];
    
    const formattedData = {
      labels: months.map(m => `${m}월`),
      datasets: locations.map(location => ({
        label: location,
        data: months.map(month => {
          const item = data.find(d => d._id.location === location && d._id.month === month);
          return item ? Math.round(item.avgPrice) : null;
        }),
        borderColor: location === '백운마을' ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'
      }))
    };

    res.json(formattedData);
  } catch (error) {
    console.error('시장 데이터 조회 중 오류:', error);
    res.status(500).json({ error: '시장 데이터를 가져오는데 실패했습니다' });
  }
});

// 대기질 API
app.get('/api/air-quality', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const encodedKey = encodeURIComponent(process.env.AIR_QUALITY_API_KEY);
    const url = `https://apis.data.go.kr/6460000/rest/jnRealTimeAirQual/getAirObserveResult?serviceKey=${encodedKey}&zone=화순군&name=화순읍&date=${today}`;
    
    console.log('대기질 API 요청 URL:', url);
    const response = await axios.get(url);
    
    if (!response.data) {
      throw new Error('API 응답이 없습니다');
    }

    // XML을 JSON으로 변환
    const jsonData = await parseXML(response.data);
    console.log('파싱된 API 응답 데이터:', JSON.stringify(jsonData, null, 2));

    // 응답 데이터에서 items 배열 추출
    const items = jsonData.response?.body?.[0]?.items?.[0]?.item || [];
    
    // 가장 최근 데이터 사용
    const targetData = Array.isArray(items) ? items[0] : items;

    if (!targetData) {
      throw new Error('화순읍 측정소 데이터가 없습니다');
    }

    // 대기질 데이터 가공
    const result = {
      pm10Value: targetData.pm10?.[0]?.toString() || '0',
      pm25Value: targetData.pm25?.[0]?.toString() || '0',
      pm10Grade: getPM10Grade(parseFloat(targetData.pm10?.[0]) || 0),
      pm25Grade: getPM25Grade(parseFloat(targetData.pm25?.[0]) || 0),
      o3Value: targetData.o3?.[0]?.toString() || '0',
      coValue: targetData.co?.[0]?.toString() || '0',
      no2Value: targetData.no2?.[0]?.toString() || '0',
      so2Value: targetData.so2?.[0]?.toString() || '0',
      stationName: '화순읍',
      dataTime: targetData.observeDate?.[0] || new Date().toISOString().slice(0, 19).replace('T', ' '),
      sidoName: '전남'
    };

    // 측정값이 '-'인 경우 '0'으로 변환
    Object.keys(result).forEach(key => {
      if (result[key] === '-') {
        result[key] = '0';
      }
    });

    console.log('가공된 대기질 데이터:', result);
    res.json(result);
    
  } catch (error) {
    console.error('대기질 API 호출 오류:', error);
    console.error('오류 상세:', error.response?.data || '상세 정보 없음');
    
    // 에러 발생 시 샘플 데이터 반환
    const sampleData = {
      pm10Value: '45',
      pm25Value: '25',
      pm10Grade: '2',
      pm25Grade: '2',
      o3Value: '0.035',
      coValue: '0.4',
      no2Value: '0.032',
      so2Value: '0.004',
      stationName: '화순읍',
      dataTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      sidoName: '전남'
    };
    
    console.log('샘플 데이터 반환:', sampleData);
    res.json(sampleData);
  }
});

// PM10 등급 계산 함수
function getPM10Grade(value) {
  if (value <= 30) return '1';
  if (value <= 80) return '2';
  if (value <= 150) return '3';
  return '4';
}

// PM2.5 등급 계산 함수
function getPM25Grade(value) {
  if (value <= 15) return '1';
  if (value <= 35) return '2';
  if (value <= 75) return '3';
  return '4';
}

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API 서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 