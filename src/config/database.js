const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB 연결 성공: ${conn.connection.host}`)

    // 연결 이벤트 리스너
    mongoose.connection.on('error', err => {
      console.error('MongoDB 연결 에러:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB 연결이 끊어졌습니다. 재연결을 시도합니다.')
      setTimeout(connectDB, 5000)
    })

  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB 