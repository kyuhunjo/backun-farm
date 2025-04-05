export const sensorData = {
  deodeok: {
    moisture: 65,
    temperature: 22,
    light: 850,
    aiRecommendation: {
      type: 'success',
      message: '생육 상태 양호'
    },
    history: [
      { timestamp: '2024-01-15 09:00:00', moisture: 62, temperature: 21, light: 800 },
      { timestamp: '2024-01-15 12:00:00', moisture: 65, temperature: 23, light: 920 },
      { timestamp: '2024-01-15 15:00:00', moisture: 68, temperature: 24, light: 890 }
    ]
  },
  doraji: {
    co2: 420,
    humidity: 75,
    temperature: 23,
    healthStatus: {
      type: 'success',
      icon: 'mdi-check-circle',
      message: '정상 상태입니다'
    },
    history: [
      { timestamp: '2024-01-15 09:00:00', co2: 410, humidity: 72, temperature: 22 },
      { timestamp: '2024-01-15 12:00:00', co2: 420, humidity: 75, temperature: 23 },
      { timestamp: '2024-01-15 15:00:00', co2: 425, humidity: 77, temperature: 23 }
    ]
  },
  pepper: {
    dryness: 45,
    temperature: 25,
    humidity: 60,
    priceChange: 8,
    history: [
      { timestamp: '2024-01-15 09:00:00', dryness: 42, temperature: 24, humidity: 58 },
      { timestamp: '2024-01-15 12:00:00', dryness: 45, temperature: 25, humidity: 60 },
      { timestamp: '2024-01-15 15:00:00', dryness: 47, temperature: 26, humidity: 62 }
    ]
  }
}

export const getSensorTrends = () => {
  const now = new Date()
  const trends = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    trends.push({
      date: date.toISOString().split('T')[0],
      deodeok: {
        moisture: 60 + Math.random() * 10,
        temperature: 20 + Math.random() * 5
      },
      doraji: {
        co2: 400 + Math.random() * 50,
        humidity: 70 + Math.random() * 10
      },
      pepper: {
        dryness: 40 + Math.random() * 10,
        temperature: 23 + Math.random() * 4
      }
    })
  }
  
  return trends
} 