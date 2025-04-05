import mongoose from 'mongoose'

const marketPriceSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
    index: true
  },
  market: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    enum: ['특', '상', '보통'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  metadata: {
    packaging: String,
    origin: String,
    notes: String
  }
})

// 인덱스 설정
marketPriceSchema.index({ crop: 1, date: -1 })
marketPriceSchema.index({ market: 1, date: -1 })

// 정적 메소드: 작물별 가격 추이 분석
marketPriceSchema.statics.analyzePriceTrend = async function(crop, startDate = new Date(Date.now() - 30*24*60*60*1000)) {
  return this.aggregate([
    {
      $match: {
        crop,
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$date'
          }
        },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ])
}

// 정적 메소드: 시장별 가격 비교
marketPriceSchema.statics.compareMarketPrices = async function(crop, date = new Date()) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)
  
  return this.aggregate([
    {
      $match: {
        crop,
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    },
    {
      $group: {
        _id: '$market',
        avgPrice: { $avg: '$price' },
        priceRange: {
          $push: {
            grade: '$grade',
            price: '$price'
          }
        }
      }
    }
  ])
}

// 정적 메소드: 등급별 가격 차이 분석
marketPriceSchema.statics.analyzeGradePriceDiff = async function(crop, market) {
  return this.aggregate([
    {
      $match: {
        crop,
        market
      }
    },
    {
      $group: {
        _id: '$grade',
        avgPrice: { $avg: '$price' },
        priceStdDev: { $stdDevPop: '$price' }
      }
    },
    {
      $sort: { avgPrice: -1 }
    }
  ])
}

export const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema) 