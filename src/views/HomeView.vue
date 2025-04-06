<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6 font-weight-medium pa-4 d-flex align-center bg-blue-lighten-5 border-b">
            <v-icon icon="mdi-weather-partly-cloudy" class="me-2" color="blue-darken-1"></v-icon>
            <span class="text-blue-darken-1 font-weight-bold">날씨 및 대기질 정보</span>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="tonal"
              :loading="isLoading"
              @click="refreshData"
              class="refresh-btn"
              rounded="0"
              elevation="0"
            >
              <v-icon start>mdi-refresh</v-icon>
              새로고침
            </v-btn>
          </v-card-title>
          <v-card-text class="pa-4">
            <v-row>
              <!-- 현재 날씨 -->
              <v-col cols="12" md="6">
                <WeatherCard
                  :weather="weather"
                  :forecast="forecast"
                  :isLoading="isLoading"
                />
              </v-col>

              <!-- 대기질 정보 -->
              <v-col cols="12" md="6">
                <AirQualityCard :airQuality="airQuality" :isLoading="isLoading" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AirQualityCard from '@/components/AirQualityCard.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import api from '@/utils/api'

export default {
  name: 'HomeView',
  components: {
    AirQualityCard,
    WeatherCard
  },
  setup() {
    const airQuality = ref({
      pm10Value: '',
      pm25Value: '',
      pm10Grade: '',
      pm25Grade: '',
      o3Value: '',
      coValue: '',
      no2Value: '',
      so2Value: '',
      stationName: '',
      dataTime: '',
      sidoName: ''
    })

    const weather = ref({
      temperature: 0,
      humidity: 0,
      windSpeed: 0,
      windDirection: 0,
      description: '',
      timestamp: '',
      icon: ''
    })

    const forecast = ref([])
    const isLoading = ref(false)

    const groupedForecast = computed(() => {
      if (!forecast.value || !Array.isArray(forecast.value)) {
        return []
      }

      // 오늘 날짜 구하기
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return forecast.value
        .filter(item => {
          const date = new Date(item.dt * 1000)
          return date.setHours(0, 0, 0, 0) > today.getTime()
        })
        .sort((a, b) => a.dt - b.dt)
        .slice(0, 5)
        .map(item => {
          const date = new Date(item.dt * 1000)
          return {
            date,
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            description: item.weather[0].description,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            rain: item.rain || 0,
            icons: [item.weather[0].icon]
          }
        })
    })

    const fetchWeatherData = async () => {
      try {
        const { data } = await api.get('/weather')
        weather.value = data
      } catch (error) {
        console.error('날씨 데이터 조회 중 오류:', error)
      }
    }

    const fetchAirQualityData = async () => {
      try {
        const { data } = await api.get('/air-quality')
        airQuality.value = data
      } catch (error) {
        console.error('대기질 데이터 조회 중 오류:', error)
      }
    }

    const fetchForecastData = async () => {
      try {
        const { data } = await api.get('/forecast')
        forecast.value = data
      } catch (error) {
        console.error('예보 데이터 조회 중 오류:', error)
        forecast.value = []
      }
    }

    const refreshData = async () => {
      isLoading.value = true
      try {
        await Promise.all([
          fetchWeatherData(),
          fetchAirQualityData(),
          fetchForecastData()
        ])
      } catch (error) {
        console.error('데이터 로딩 중 오류:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(async () => {
      await refreshData()
    })

    return {
      airQuality,
      weather,
      forecast: groupedForecast,
      isLoading,
      refreshData
    }
  }
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.refresh-btn {
  min-width: 110px;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  transform: scale(1.02);
  background-color: rgb(var(--v-theme-blue-darken-1));
  color: white;
}

@media (max-width: 600px) {
  .refresh-btn {
    min-width: auto;
    padding: 0 12px;
  }
  
  .refresh-btn .v-btn__content {
    gap: 4px;
  }
}
</style> 