import mongoose from 'mongoose'

const sensorDataSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    enum: ['deodeok-A', 'doraji-A', 'pepper-A']
  },
  type: {
    type: String,
    required: true,
    enum: ['moisture', 'temperature', 'co2', 'light', 'humidity', 'dryness']
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['normal', 'warning', 'critical'],
    default: 'normal'
  },
  metadata: {
    unit: String,
    min: Number,
    max: Number,
    optimal: Number
  }
})

// 인덱스 설정
sensorDataSchema.index({ location: 1, type: 1, timestamp: -1 })

// 가상 필드: 측정 후 경과 시간 (분)
sensorDataSchema.virtual('elapsedMinutes').get(function() {
  return Math.floor((Date.now() - this.timestamp) / (1000 * 60))
})

// 정적 메소드: 특정 위치의 최근 데이터 조회
sensorDataSchema.statics.getLatestByLocation = async function(location) {
  return this.find({ location })
    .sort({ timestamp: -1 })
    .limit(1)
}

// 정적 메소드: 특정 기간의 통계 데이터 조회
sensorDataSchema.statics.getStats = async function(location, type, startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        location,
        type,
        timestamp: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        avg: { $avg: '$value' },
        min: { $min: '$value' },
        max: { $max: '$value' }
      }
    }
  ])
}

// 인스턴스 메소드: 상태 업데이트
sensorDataSchema.methods.updateStatus = function() {
  const { value, metadata } = this
  if (!metadata) return
  
  if (value < metadata.min || value > metadata.max) {
    this.status = 'critical'
  } else if (Math.abs(value - metadata.optimal) > (metadata.max - metadata.min) * 0.2) {
    this.status = 'warning'
  } else {
    this.status = 'normal'
  }
}

export const SensorData = mongoose.model('SensorData', sensorDataSchema) 