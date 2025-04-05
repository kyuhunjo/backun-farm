<template>
  <v-container fluid class="pa-6">
    <!-- 상단 날씨 정보 카드 -->
    <v-card class="mb-6" elevation="1">
      <v-card-text>
        <div class="d-flex align-center justify-space-between flex-wrap">
          <div class="text-h5 font-weight-bold">백운마을 특산물 모니터링 시스템</div>
          <div class="d-flex align-center" v-if="weatherData">
            <v-icon :icon="getWeatherIcon(weatherData.current.weather[0].id)" class="me-2"></v-icon>
            <span class="text-h6 me-4">{{ Math.round(weatherData.current.temp) }}°C</span>
            <span class="text-body-1 me-4">강수확률 {{ Math.round(weatherData.daily[0].pop * 100) }}%</span>
            <v-chip
              :color="weatherAlerts.length ? 'error' : 'success'"
              size="small"
              class="font-weight-bold"
            >
              경보: {{ weatherAlerts.length ? weatherAlerts[0].event : '없음' }}
            </v-chip>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- 작물 모니터링 그리드 -->
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card height="200">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-sprout</v-icon>
            더덕 재배지 A구역
          </v-card-title>
          <v-card-text>
            <div class="text-h5 mb-2">토양 수분: {{ sensorData.deodeok?.moisture || 0 }}%</div>
            <v-progress-linear
              :model-value="sensorData.deodeok?.moisture || 0"
              color="primary"
              height="8"
              class="mb-4"
            ></v-progress-linear>
            <v-alert
              :color="sensorData.deodeok?.aiRecommendation?.type || 'info'"
              icon="mdi-robot"
              density="compact"
            >
              AI 추천: {{ sensorData.deodeok?.aiRecommendation?.message || '데이터 로딩 중...' }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card height="200">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-flower</v-icon>
            도라지 재배지 A구역
          </v-card-title>
          <v-card-text>
            <div class="text-h5 mb-2">CO₂: {{ sensorData.doraji?.co2 || 0 }}ppm</div>
            <v-progress-linear
              :model-value="(sensorData.doraji?.co2 || 0) / 10"
              :color="getCo2Color(sensorData.doraji?.co2)"
              height="8"
              class="mb-4"
            ></v-progress-linear>
            <v-alert
              :color="sensorData.doraji?.healthStatus?.type || 'info'"
              :icon="sensorData.doraji?.healthStatus?.icon || 'mdi-information'"
              density="compact"
            >
              {{ sensorData.doraji?.healthStatus?.message || '상태 확인 중...' }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card height="200">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-chili-mild</v-icon>
            고추 재배지 A구역
          </v-card-title>
          <v-card-text>
            <div class="text-h5 mb-2">건조율: {{ sensorData.pepper?.dryness || 0 }}%</div>
            <v-progress-linear
              :model-value="sensorData.pepper?.dryness || 0"
              :color="getDrynessColor(sensorData.pepper?.dryness)"
              height="8"
              class="mb-4"
            ></v-progress-linear>
            <v-chip
              :color="sensorData.pepper?.priceChange > 0 ? 'success' : 'error'"
              class="font-weight-bold"
            >
              가격 {{ sensorData.pepper?.priceChange > 0 ? '+' : '' }}{{ sensorData.pepper?.priceChange || 0 }}% 변동
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 기상 예측 카드 -->
    <v-card class="mb-6" :color="weatherData?.daily[0].pop > 0.5 ? 'error' : 'info'">
      <v-card-title class="d-flex align-center">
        <v-icon color="white" class="me-2">mdi-weather-cloudy-alert</v-icon>
        기상 예측
      </v-card-title>
      <v-card-text class="text-white">
        <div class="text-h6">{{ getNextRainForecast }}</div>
        <div class="text-body-1">{{ getWeatherAction }}</div>
      </v-card-text>
    </v-card>

    <!-- 체험 프로그램 & 시장 동향 그리드 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card height="300">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-calendar-check</v-icon>
            체험 프로그램 예약 현황
          </v-card-title>
          <v-card-text>
            <div v-for="program in reservations" :key="program.name" class="mb-4">
              <div class="d-flex align-center justify-space-between mb-2">
                <span>{{ program.name }}</span>
                <span class="text-caption">잔여 {{ program.remaining }}석</span>
              </div>
              <v-progress-linear
                :model-value="(program.capacity - program.remaining) / program.capacity * 100"
                color="primary"
                height="20"
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card height="300">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="me-2">mdi-chart-line</v-icon>
            시장 동향: 전국 더덕 가격 비교
          </v-card-title>
          <v-card-text>
            <Line
              v-if="chartData"
              :data="chartData"
              :options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// 상태 관리
const weatherData = ref(null)
const weatherAlerts = ref([])
const sensorData = ref({
  deodeok: null,
  doraji: null,
  pepper: null
})
const reservations = ref([])
const marketData = ref(null)

// 화순군 백운마을의 위도와 경도 설정
const VILLAGE_LATITUDE = 35.0647
const VILLAGE_LONGITUDE = 127.0679

// 날씨 정보 가져오기
const fetchWeatherData = async () => {
  try {
    const response = await fetch(`/api/weather?lat=${VILLAGE_LATITUDE}&lon=${VILLAGE_LONGITUDE}`)
    const data = await response.json()
    weatherData.value = data
    weatherAlerts.value = data.alerts || []
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error)
  }
}

// 센서 데이터 가져오기
const fetchSensorData = async () => {
  try {
    const response = await fetch('/api/sensor-data')
    const data = await response.json()
    
    // 센서 데이터 처리
    sensorData.value = {
      deodeok: {
        moisture: data.find(d => d.location === 'deodeok-A' && d.type === 'moisture')?.value || 65,
        aiRecommendation: getAiRecommendation('deodeok', data)
      },
      doraji: {
        co2: data.find(d => d.location === 'doraji-A' && d.type === 'co2')?.value || 420,
        healthStatus: getCropHealthStatus('doraji', data)
      },
      pepper: {
        dryness: data.find(d => d.location === 'pepper-A' && d.type === 'dryness')?.value || 45,
        priceChange: 8
      }
    }
  } catch (error) {
    console.error('센서 데이터를 가져오는데 실패했습니다:', error)
  }
}

// 예약 현황 가져오기
const fetchReservations = async () => {
  try {
    const response = await fetch('/api/reservations')
    const data = await response.json()
    
    // 예약 데이터 처리
    reservations.value = [
      {
        name: '더덕 송편 만들기',
        capacity: 25,
        remaining: 5
      },
      {
        name: '고추장 담그기',
        capacity: 20,
        remaining: 8
      }
    ]
  } catch (error) {
    console.error('예약 현황을 가져오는데 실패했습니다:', error)
  }
}

// 시장 동향 데이터 가져오기
const fetchMarketData = async () => {
  try {
    // 임시 데이터
    marketData.value = {
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
    }
  } catch (error) {
    console.error('시장 동향 데이터를 가져오는데 실패했습니다:', error)
  }
}

// 차트 데이터
const chartData = computed(() => marketData.value)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}

// 날씨 코드에 따른 아이콘 반환
const getWeatherIcon = (code) => {
  if (code >= 200 && code < 300) return 'mdi-weather-lightning'
  if (code >= 300 && code < 400) return 'mdi-weather-pouring'
  if (code >= 500 && code < 600) return 'mdi-weather-rainy'
  if (code >= 600 && code < 700) return 'mdi-weather-snowy'
  if (code >= 700 && code < 800) return 'mdi-weather-fog'
  if (code === 800) return 'mdi-weather-sunny'
  return 'mdi-weather-cloudy'
}

// CO2 수치에 따른 색상 반환
const getCo2Color = (value) => {
  if (!value) return 'grey'
  if (value < 400) return 'success'
  if (value < 450) return 'warning'
  return 'error'
}

// 건조율에 따른 색상 반환
const getDrynessColor = (value) => {
  if (!value) return 'grey'
  if (value < 30) return 'error'
  if (value < 60) return 'success'
  return 'warning'
}

// AI 추천사항 생성
const getAiRecommendation = (crop, data) => {
  const moisture = data.find(d => d.location === `${crop}-A` && d.type === 'moisture')?.value
  
  if (!moisture) return { type: 'info', message: '데이터 로딩 중...' }
  if (moisture < 40) return { type: 'error', message: '관수가 필요합니다' }
  if (moisture > 80) return { type: 'warning', message: '과습 주의가 필요합니다' }
  return { type: 'success', message: '모종 심기 적기입니다' }
}

// 작물 건강 상태 확인
const getCropHealthStatus = (crop, data) => {
  const co2 = data.find(d => d.location === `${crop}-A` && d.type === 'co2')?.value
  
  if (!co2) return { type: 'info', icon: 'mdi-information', message: '상태 확인 중...' }
  if (co2 > 450) return { type: 'error', icon: 'mdi-alert', message: '병해충 경고: 뿌리썩음병 위험' }
  if (co2 < 350) return { type: 'warning', icon: 'mdi-alert-circle', message: '환기가 필요합니다' }
  return { type: 'success', icon: 'mdi-check-circle', message: '정상 상태입니다' }
}

// 다음 강우 예보
const getNextRainForecast = computed(() => {
  if (!weatherData.value) return ''
  const pop = weatherData.value.daily[0].pop * 100
  return `${new Date().getHours() + 3}시 강우 확률 ${Math.round(pop)}%`
})

// 날씨에 따른 조치사항
const getWeatherAction = computed(() => {
  if (!weatherData.value) return ''
  const pop = weatherData.value.daily[0].pop
  if (pop > 0.5) return '→ 더덕 재배지 방수 시설 가동 예정'
  return '→ 정상 운영 예정'
})

// 데이터 자동 업데이트
onMounted(() => {
  // 초기 데이터 로드
  fetchWeatherData()
  fetchSensorData()
  fetchReservations()
  fetchMarketData()
  
  // 주기적 업데이트 설정
  setInterval(fetchWeatherData, 3600000) // 1시간마다
  setInterval(fetchSensorData, 300000)   // 5분마다
  setInterval(fetchReservations, 300000) // 5분마다
  setInterval(fetchMarketData, 3600000)  // 1시간마다
})
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}

.v-progress-linear {
  border-radius: 4px;
}
</style> 