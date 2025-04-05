<template>
  <div class="weather-widget d-flex align-center">
    <v-icon
      :icon="weatherIcon"
      :color="iconColor"
      class="me-2"
    ></v-icon>
    <span class="temperature font-body">{{ temperature }}°C</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const temperature = ref(null)
const weatherIcon = ref('mdi-weather-sunny')
const iconColor = ref('amber-darken-2')

// 화순군 백운마을의 위도와 경도 설정
const VILLAGE_LATITUDE = 35.0647
const VILLAGE_LONGITUDE = 127.0679

const fetchWeather = async () => {
  try {
    const response = await fetch(`/api/weather?lat=${VILLAGE_LATITUDE}&lon=${VILLAGE_LONGITUDE}`)
    const data = await response.json()
    
    // 온도 설정
    temperature.value = Math.round(data.current.temp)
    
    // 날씨 상태에 따른 아이콘 설정
    const weatherCode = data.current.weather[0].id
    if (weatherCode >= 200 && weatherCode < 300) {
      weatherIcon.value = 'mdi-weather-lightning'
      iconColor.value = 'deep-purple'
    } else if (weatherCode >= 300 && weatherCode < 400) {
      weatherIcon.value = 'mdi-weather-pouring'
      iconColor.value = 'blue'
    } else if (weatherCode >= 500 && weatherCode < 600) {
      weatherIcon.value = 'mdi-weather-rainy'
      iconColor.value = 'blue-darken-2'
    } else if (weatherCode >= 600 && weatherCode < 700) {
      weatherIcon.value = 'mdi-weather-snowy'
      iconColor.value = 'light-blue'
    } else if (weatherCode >= 700 && weatherCode < 800) {
      weatherIcon.value = 'mdi-weather-fog'
      iconColor.value = 'blue-grey'
    } else if (weatherCode === 800) {
      weatherIcon.value = 'mdi-weather-sunny'
      iconColor.value = 'amber-darken-2'
    } else if (weatherCode > 800) {
      weatherIcon.value = 'mdi-weather-cloudy'
      iconColor.value = 'blue-grey'
    }
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error)
    // 기본값 설정
    temperature.value = '--'
    weatherIcon.value = 'mdi-weather-sunny'
    iconColor.value = 'amber-darken-2'
  }
}

onMounted(() => {
  fetchWeather()
  // 1시간마다 날씨 정보 업데이트
  setInterval(fetchWeather, 3600000)
})
</script>

<style scoped>
.weather-widget {
  padding: 0 12px;
}

.temperature {
  font-size: 1rem;
  font-weight: 500;
}
</style> 