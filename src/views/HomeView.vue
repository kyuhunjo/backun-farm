<template>
  <v-container class="pa-0" fluid>
    <!-- 히어로 섹션 -->
    <v-parallax
      :src="mainImage"
      height="600"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white text-center">
        <h1 class="text-h2 font-weight-bold mb-4">{{ homeStore.villageInfo.title }}</h1>
        <h2 class="text-h4 mb-6">{{ homeStore.villageInfo.subtitle }}</h2>
        
        <!-- 날씨 정보 -->
        <v-card
          v-if="weatherData"
          class="weather-card mb-8 pa-4"
          width="400"
          rounded="lg"
        >
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="auto" class="mr-4">
              <div class="text-h2 font-weight-bold">{{ Math.round(weatherData.temperature) }}°</div>
            </v-col>
            <v-col>
              <div class="text-h5 mb-1">{{ weatherData.description }}</div>
              <div class="text-body-1">
                최고 {{ Math.round(weatherData.maxTemp) }}° / 최저 {{ Math.round(weatherData.minTemp) }}°
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-btn
          color="primary"
          size="x-large"
          to="/prepare"
        >
          체험 프로그램 알아보기
        </v-btn>
      </div>
    </v-parallax>

    <!-- 날씨 정보 섹션 -->
    <v-container class="py-6">
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-center">
          <v-icon icon="mdi-weather-partly-cloudy" class="mr-2"></v-icon>
          오늘의 날씨
        </v-card-title>
        <v-card-text v-if="weatherData">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="4" class="text-center">
              <div class="text-h4 mb-2">{{ Math.round(weatherData.temperature) }}°C</div>
              <div class="text-body-1">{{ weatherData.description }}</div>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <div class="text-body-1 mb-2">습도: {{ weatherData.humidity }}%</div>
              <div class="text-body-1">풍속: {{ weatherData.windSpeed }}m/s</div>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <div class="text-body-1 mb-2">최고: {{ Math.round(weatherData.maxTemp) }}°C</div>
              <div class="text-body-1">최저: {{ Math.round(weatherData.minTemp) }}°C</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          날씨 정보를 불러오는 중...
        </v-card-text>
      </v-card>
    </v-container>

    <!-- 마을 소개 섹션 -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-6">백운마을 소개</h2>
          <p class="text-body-1 mb-4">
            {{ homeStore.villageInfo.description }}
          </p>
          <v-list>
            <v-list-item
              v-for="detail in homeStore.villageInfo.details"
              :key="detail.text"
              :prepend-icon="detail.icon"
            >
              <v-list-item-title>{{ detail.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="villageImage"
            height="400"
            cover
            class="rounded-lg"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- 체험 프로그램 섹션 -->
    <v-container class="py-12 bg-grey-lighten-4">
      <h2 class="text-h4 text-center mb-6">체험 프로그램</h2>
      <v-row>
        <v-col v-for="(program, index) in homeStore.programs" :key="program.title" cols="12" md="4">
          <v-card>
            <v-img
              :src="programImages[index]"
              height="200"
              cover
            ></v-img>
            <v-card-title>{{ program.title }}</v-card-title>
            <v-card-text>
              <p>{{ program.description }}</p>
              <v-chip-group class="mt-3">
                <v-chip
                  v-for="tag in program.tags"
                  :key="tag"
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <v-btn
                variant="text"
                color="primary"
                to="/contact"
              >
                신청하기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 마을 소식 섹션 -->
    <v-container class="py-12">
      <h2 class="text-h4 text-center mb-6">마을 소식</h2>
      <v-row>
        <v-col v-for="(news, index) in homeStore.newsItems" :key="news.title" cols="12" md="6" lg="4">
          <v-card>
            <v-img
              :src="newsImages[index]"
              height="200"
              cover
            ></v-img>
            <v-card-title>{{ news.title }}</v-card-title>
            <v-card-subtitle>{{ news.date }}</v-card-subtitle>
            <v-card-text>{{ news.description }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                color="primary"
              >
                자세히 보기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'

const homeStore = useHomeStore()
const weatherData = ref(null)

// 화순군 백운마을의 위도와 경도 설정
const VILLAGE_LATITUDE = 35.0647  // 화순군 백운마을 위도
const VILLAGE_LONGITUDE = 126.9595  // 화순군 백운마을 경도

// 날씨 정보 가져오기
const fetchWeatherData = async () => {
  try {
    const response = await fetch(`/api/weather?lat=${VILLAGE_LATITUDE}&lon=${VILLAGE_LONGITUDE}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    
    weatherData.value = {
      temperature: data.current.temp,
      description: data.current.weather[0].description,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      maxTemp: data.daily[0].temp.max,
      minTemp: data.daily[0].temp.min
    }
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error)
  }
}

onMounted(() => {
  fetchWeatherData()
})

// 이미지 경로 설정
const mainImage = new URL('@/assets/images/20250402_123303.jpg', import.meta.url).href
const villageImage = new URL('@/assets/images/20250402_124827.jpg', import.meta.url).href

const programImages = [
  new URL('@/assets/images/20250402_124722.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_124640.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_124511.jpg', import.meta.url).href
]

const newsImages = [
  new URL('@/assets/images/20250402_124026.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_123818.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_123538.jpg', import.meta.url).href
]
</script>

<style scoped>
.v-parallax {
  position: relative;
}

.v-parallax::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.weather-card {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.weather-card :deep(.v-card-text),
.weather-card :deep(.text-h2),
.weather-card :deep(.text-h5),
.weather-card :deep(.text-body-1) {
  color: white !important;
}
</style> 