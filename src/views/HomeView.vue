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
          to="/village/specialties"
          rounded="0"
        >
          특산물 구경하기
          <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
        </v-btn>
      </div>
    </v-parallax>

    <!-- 특산물 섹션 -->
    <v-container class="py-16">
      <h2 class="text-h3 font-weight-bold text-center mb-12">백운마을 대표 특산물</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="h-100" elevation="2" rounded="0">
            <v-img
              src="https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?ixlib=rb-4.0.3"
              height="200px"
              cover
            ></v-img>
            <v-card-title class="text-h5 pt-4">백운마을 고사리</v-card-title>
            <v-card-text>
              <p class="text-body-1">전라남도 화순군 백운마을의 맑은 공기와 깨끗한 환경에서 자란 고품질 고사리입니다. 향이 좋고 부드러운 식감이 특징입니다.</p>
              <v-chip color="success" class="mt-2">수확기: 4월-5월</v-chip>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="specialtyDialog1 = true"
              >
                자세히 보기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="h-100" elevation="2" rounded="0">
            <v-img
              src="https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?ixlib=rb-4.0.3"
              height="200px"
              cover
            ></v-img>
            <v-card-title class="text-h5 pt-4">백운마을 더덕</v-card-title>
            <v-card-text>
              <p class="text-body-1">전라남도 화순군 백운마을의 자연환경에서 자란 산더덕으로, 향이 진하고 영양이 풍부한 고품질 더덕입니다.</p>
              <v-chip color="success" class="mt-2">수확기: 8월-10월</v-chip>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="specialtyDialog2 = true"
              >
                자세히 보기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="h-100" elevation="2" rounded="0">
            <v-img
              src="https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?ixlib=rb-4.0.3"
              height="200px"
              cover
            ></v-img>
            <v-card-title class="text-h5 pt-4">백운마을 곶감</v-card-title>
            <v-card-text>
              <p class="text-body-1">전라남도 화순군 백운마을의 깨끗한 환경에서 재배한 고품질 곶감으로, 당도가 높고 쫄깃한 식감이 특징입니다.</p>
              <v-chip color="success" class="mt-2">수확기: 11월-12월</v-chip>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="specialtyDialog3 = true"
              >
                자세히 보기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 마을 소식 섹션 -->
    <v-container class="py-16 bg-grey-lighten-4">
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

// 이미지 경로
const heroImage = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop'
const newsImages = [
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop'
]

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

onMounted(() => {
  fetchWeatherData()
})
</script>

<style scoped>
.hero-section {
  position: relative;
  margin-top: -64px; /* 헤더 높이만큼 위로 올림 */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: 84px; /* 헤더 높이 + 여유 패딩 */
}

.weather-card {
  background: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(10px);
}

/* 카드 스타일 */
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}

/* 텍스트 스타일 */
.text-white {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.weather-card :deep(.v-card-text),
.weather-card :deep(.text-h1),
.weather-card :deep(.text-h4),
.weather-card :deep(.text-h6),
.weather-card :deep(.text-subtitle-1) {
  color: white !important;
}
</style> 