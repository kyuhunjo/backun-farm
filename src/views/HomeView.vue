<template>
  <v-container class="pa-0" fluid>
    <!-- 히어로 섹션 -->
    <v-parallax
      :src="heroImage"
      height="700"
      class="hero-section"
    >
      <div class="hero-overlay"></div>
      <div class="d-flex flex-column align-center justify-center text-center hero-content">
        <h1 class="text-h2 font-weight-bold mb-4 text-white">
          {{ homeStore.villageInfo.title }}
        </h1>
        <p class="text-h5 mb-8 text-white" style="max-width: 800px; line-height: 1.6;">
          {{ homeStore.villageInfo.subtitle }}
        </p>

        <!-- 날씨 정보 -->
        <v-card
          v-if="weatherData"
          class="weather-card mb-12 pa-6"
          width="500"
          rounded="0"
        >
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" class="text-center">
              <div class="text-h1 font-weight-bold text-white mb-2">
                {{ Math.round(weatherData.current.temp) }}°C
              </div>
              <div class="text-h4 text-white mb-4">
                {{ weatherData.current.weather[0].description }}
              </div>
              <div class="d-flex justify-center align-center text-white">
                <span class="text-h6 mr-4">
                  <v-icon color="white" class="mr-1">mdi-thermometer-high</v-icon>
                  최고 {{ Math.round(weatherData.daily[0].temp.max) }}°C
                </span>
                <span class="text-h6">
                  <v-icon color="white" class="mr-1">mdi-thermometer-low</v-icon>
                  최저 {{ Math.round(weatherData.daily[0].temp.min) }}°C
                </span>
              </div>
              <div class="d-flex justify-center align-center mt-4">
                <span class="text-subtitle-1 text-white mr-4">
                  <v-icon color="white" class="mr-1">mdi-water-percent</v-icon>
                  습도 {{ weatherData.current.humidity }}%
                </span>
                <span class="text-subtitle-1 text-white">
                  <v-icon color="white" class="mr-1">mdi-weather-windy</v-icon>
                  풍속 {{ Math.round(weatherData.current.wind_speed) }}m/s
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-btn
          color="primary"
          size="x-large"
          class="px-8"
          to="/farming/programs"
          rounded="0"
        >
          체험 프로그램 알아보기
          <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
        </v-btn>
      </div>
    </v-parallax>

    <!-- 마을 소개 섹션 -->
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h3 font-weight-bold mb-6">백운마을 소개</h2>
          <p class="text-body-1 mb-6">
            {{ homeStore.villageInfo.description }}
          </p>
          <v-list>
            <v-list-item
              v-for="detail in homeStore.villageInfo.details"
              :key="detail.text"
              :prepend-icon="detail.icon"
              class="mb-2"
            >
              <v-list-item-title class="text-h6">{{ detail.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="villageImage"
            height="500"
            cover
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- 체험 프로그램 섹션 -->
    <v-container class="py-16 bg-grey-lighten-4">
      <h2 class="text-h3 font-weight-bold text-center mb-12">체험 프로그램</h2>
      <v-row>
        <v-col v-for="(program, index) in homeStore.programs" :key="program.title" cols="12" md="4">
          <v-card class="h-100" elevation="2" rounded="0">
            <v-img
              :src="programImages[index]"
              height="250"
              cover
              class="bg-grey-lighten-2"
            >
              <template v-slot:placeholder>
                <v-row align="center" justify="center" class="fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title class="text-h5 pt-4">{{ program.title }}</v-card-title>
            <v-card-text>
              <p class="text-body-1">{{ program.description }}</p>
              <v-chip-group class="mt-4">
                <v-chip
                  v-for="tag in program.tags"
                  :key="tag"
                  color="primary"
                  variant="outlined"
                  size="small"
                  rounded="0"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                variant="flat"
                color="primary"
                to="/contact"
                rounded="0"
              >
                신청하기
                <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 마을 소식 섹션 -->
    <v-container class="py-16">
      <h2 class="text-h3 font-weight-bold text-center mb-12">마을 소식</h2>
      <v-row>
        <v-col v-for="(news, index) in homeStore.newsItems" :key="news.title" cols="12" md="6" lg="4">
          <v-card class="h-100" elevation="2" rounded="0">
            <v-img
              :src="newsImages[index]"
              height="250"
              cover
              class="bg-grey-lighten-2"
            >
              <template v-slot:placeholder>
                <v-row align="center" justify="center" class="fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title class="text-h5 pt-4">{{ news.title }}</v-card-title>
            <v-card-subtitle class="pt-2">{{ news.date }}</v-card-subtitle>
            <v-card-text class="text-body-1">{{ news.description }}</v-card-text>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                color="primary"
                rounded="0"
              >
                자세히 보기
                <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
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
      current: data.current,
      daily: data.daily
    }
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error)
  }
}

onMounted(() => {
  fetchWeatherData()
})

// 이미지 경로 설정
const heroImage = new URL('@/assets/images/20250402_123303.jpg', import.meta.url).href
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

.hero-section {
  margin-top: -64px; /* 앱바 높이만큼 위로 올림 */
  padding-top: 84px; /* 앱바 높이 + 여유 패딩 */
}

.hero-content {
  position: relative;
  z-index: 1;
  min-height: 100%;
  width: 100%;
  padding: 24px;
}

/* 제목 폰트 스타일 */
.text-h2,
.text-h3,
.text-h4 {
  font-family: var(--font-heading) !important;
}

/* 본문 폰트 스타일 */
.text-body-1,
.text-subtitle-1,
.v-btn,
.v-card-title,
.v-card-text {
  font-family: var(--font-body) !important;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7));
  z-index: 1;
}

.weather-card {
  background: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.weather-card :deep(.v-card-text),
.weather-card :deep(.text-h1),
.weather-card :deep(.text-h4),
.weather-card :deep(.text-h6),
.weather-card :deep(.text-subtitle-1) {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.text-white {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}

/* Vuetify의 기본 라운드 효과 제거 */
:deep(.v-btn),
:deep(.v-card),
:deep(.v-chip),
:deep(.v-img) {
  border-radius: 0 !important;
}
</style> 