export const marketData = {
  deodeok: {
    current: {
      village: 15000,
      national: 13500,
      unit: '원/kg',
      date: '2024-01-15'
    },
    trend: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
      datasets: [
        {
          label: '백운마을',
          data: [12000, 13000, 12500, 14000, 15000, 14500],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: '전국 평균',
          data: [11000, 11500, 12000, 13000, 13500, 13000],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    },
    forecast: {
      nextMonth: {
        trend: 'increase',
        percentage: 5,
        reason: '설 명절 수요 증가 예상'
      }
    }
  },
  doraji: {
    current: {
      village: 25000,
      national: 22000,
      unit: '원/kg',
      date: '2024-01-15'
    },
    trend: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
      datasets: [
        {
          label: '백운마을',
          data: [22000, 23000, 24000, 24500, 25000, 25000],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: '전국 평균',
          data: [20000, 21000, 21500, 22000, 22000, 22000],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    },
    forecast: {
      nextMonth: {
        trend: 'stable',
        percentage: 0,
        reason: '공급량 안정화'
      }
    }
  },
  pepper: {
    current: {
      village: 18000,
      national: 16500,
      unit: '원/kg',
      date: '2024-01-15'
    },
    trend: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
      datasets: [
        {
          label: '백운마을',
          data: [16000, 16500, 17000, 17500, 18000, 18000],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: '전국 평균',
          data: [15000, 15500, 16000, 16000, 16500, 16500],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    },
    forecast: {
      nextMonth: {
        trend: 'decrease',
        percentage: -3,
        reason: '겨울철 수요 감소'
      }
    }
  }
}

export const getMarketAnalysis = () => {
  return {
    summary: {
      deodeok: {
        status: 'good',
        message: '전국 평균 대비 11% 높은 가격 형성 중'
      },
      doraji: {
        status: 'excellent',
        message: '전국 평균 대비 13.6% 높은 프리미엄'
      },
      pepper: {
        status: 'good',
        message: '안정적인 가격 형성, 품질 경쟁력 유지'
      }
    },
    recommendations: [
      {
        crop: 'deodeok',
        action: 'hold',
        message: '현재 가격이 적정 수준으로 판매 시기 조절 불필요'
      },
      {
        crop: 'doraji',
        action: 'sell',
        message: '현재 가격이 높게 형성되어 있어 판매 적기'
      },
      {
        crop: 'pepper',
        action: 'wait',
        message: '2월 설 명절 수요 증가 예상되어 저장 추천'
      }
    ]
  }
} 