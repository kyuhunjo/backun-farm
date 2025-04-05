import mongoose from 'mongoose'
import dotenv from 'dotenv'

// .env 파일 로딩
dotenv.config()

// MongoDB 연결
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/farm'
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err))

// 스키마 정의
const SensorDataSchema = new mongoose.Schema({
  location: String,
  type: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
})

const MarketDataSchema = new mongoose.Schema({
  date: Date,
  location: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
})

// 모델 생성
const SensorData = mongoose.model('SensorData', SensorDataSchema)
const MarketData = mongoose.model('MarketData', MarketDataSchema)

// 기존 데이터 삭제
const clearData = async () => {
  await SensorData.deleteMany({})
  await MarketData.deleteMany({})
  console.log('기존 데이터 삭제 완료')
}

// 센서 데이터 초기화
const initSensorData = async () => {
  const sensorData = [
    { location: 'deodeok-A', type: 'moisture', value: 65 },
    { location: 'doraji-A', type: 'co2', value: 420 },
    { location: 'pepper-A', type: 'dryness', value: 45 },
    { location: 'pepper-A', type: 'price', change: 8 }
  ]

  await SensorData.insertMany(sensorData)
  console.log('센서 데이터 초기화 완료')
}

// 시장 데이터 초기화
const initMarketData = async () => {
  const now = new Date()
  const marketData = []

  // 지난 6개월 데이터 생성
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    
    // 백운마을 데이터
    marketData.push({
      date,
      location: '백운마을',
      price: 12000 + Math.floor(Math.random() * 3000),
      timestamp: date
    })

    // 전국 평균 데이터
    marketData.push({
      date,
      location: '전국',
      price: 11000 + Math.floor(Math.random() * 2500),
      timestamp: date
    })
  }

  await MarketData.insertMany(marketData)
  console.log('시장 데이터 초기화 완료')
}

// 데이터베이스 초기화 실행
const initDB = async () => {
  try {
    await clearData()
    await initSensorData()
    await initMarketData()
    console.log('데이터베이스 초기화 완료')
    process.exit(0)
  } catch (error) {
    console.error('데이터베이스 초기화 중 오류:', error)
    process.exit(1)
  }
}

initDB() 