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
            <span class="text-body-1 me-4">강수확률 {{ weatherData.daily[0].pop }}%</span>
            <v-chip
              color="success"
              size="small"
              class="font-weight-bold"
            >
              경보: 없음
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
            <div class="text-h5 mb-2">토양 수분: 65%</div>
            <v-progress-linear
              model-value="65"
              color="primary"
              height="8"
              class="mb-4"
            ></v-progress-linear>
            <v-alert
              color="success"
              icon="mdi-robot"
              density="compact"
            >
              AI 추천: 모종 심기 적기입니다
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
            <div class="text-h5 mb-2">CO₂: 420ppm</div>
            <v-progress-linear
              model-value="42"
              color="warning"
              height="8"
              class="mb-4"
            ></v-progress-linear>
            <v-alert
              color="error"
              icon="mdi-alert"
              density="compact"
            >
              병해충 경고: 뿌리썩음병 위험
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
            <div class="text-h5 mb-2">건조율: 45%</div>
            <v-progress-linear
              model-value="45"
              color="success"
              height="8"
              class="mb-4"
            ></v-progress-linear>
            <v-chip
              color="success"
              class="font-weight-bold"
            >
              가격 +8% 상승
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 기상 예측 카드 -->
    <v-card class="mb-6" color="info">
      <v-card-title class="d-flex align-center">
        <v-icon color="white" class="me-2">mdi-weather-cloudy-alert</v-icon>
        기상 예측
      </v-card-title>
      <v-card-text class="text-white">
        <div class="text-h6">3PM 강우 확률 70%</div>
        <div class="text-body-1">→ 더덕 재배지 방수 시설 가동 예정</div>
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
            <div class="mb-4">
              <div class="d-flex align-center justify-space-between mb-2">
                <span>더덕 송편 만들기</span>
                <span class="text-caption">잔여 5석</span>
              </div>
              <v-progress-linear
                model-value="80"
                color="primary"
                height="20"
              ></v-progress-linear>
            </div>
            <div class="mb-4">
              <div class="d-flex align-center justify-space-between mb-2">
                <span>고추장 담그기</span>
                <span class="text-caption">잔여 8석</span>
              </div>
              <v-progress-linear
                model-value="60"
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
            <v-sheet class="pa-4">
              <div class="text-center text-body-1">차트 영역</div>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'

const homeStore = useHomeStore()
const weatherData = ref(null)

// 화순군 백운마을의 위도와 경도 설정
const VILLAGE_LATITUDE = 35.0647
const VILLAGE_LONGITUDE = 127.0679

// 날씨 정보 가져오기
const fetchWeatherData = async () => {
  try {
    const response = await fetch(`/api/weather?lat=${VILLAGE_LATITUDE}&lon=${VILLAGE_LONGITUDE}`)
    const data = await response.json()
    weatherData.value = data
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error)
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

onMounted(() => {
  fetchWeatherData()
  // 1시간마다 날씨 정보 업데이트
  setInterval(fetchWeatherData, 3600000)
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