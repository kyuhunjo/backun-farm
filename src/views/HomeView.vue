<template>
  <v-container>
    <!-- 날씨 및 대기질 정보 -->
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
                <AirQualityCard 
                  :airQuality="airQuality" 
                  :isLoading="isLoading"
                  @refresh="fetchAirQualityData"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 일출/일몰 정보 -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6 font-weight-medium pa-4 d-flex align-center bg-orange-lighten-5 border-b">
            <v-icon icon="mdi-weather-sunset" class="me-2" color="orange-darken-1"></v-icon>
            <span class="text-orange-darken-1 font-weight-bold">일출/일몰 정보</span>
          </v-card-title>
          <v-card-text class="pa-4">
            <SunriseSunsetCard
              :sunriseData="sunriseData"
              :isLoading="isLoading"
            />
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
import SunriseSunsetCard from '@/components/SunriseSunsetCard.vue'
import api from '@/utils/api'

export default {
  name: 'HomeView',
  components: {
    AirQualityCard,
    WeatherCard,
    SunriseSunsetCard
  },
  setup() {
    const airQuality = ref({
      stationName: '',
      dataTime: '',
      khaiValue: '0',
      khaiGrade: '0',
      pm10Value: '0',
      pm10Grade: '0',
      pm25Value: '0',
      pm25Grade: '0',
      o3Value: '0',
      o3Grade: '0',
      coValue: '0',
      coGrade: '0',
      no2Value: '0',
      no2Grade: '0',
      so2Value: '0',
      so2Grade: '0'
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

    const sunriseData = ref({
      sunrise: '',
      sunset: '',
      location: '',
      date: '',
      longitude: '',
      latitude: '',
      coordinates: {
        longitude: '',
        latitude: ''
      },
      moonrise: '',
      moonset: '',
      moontransit: '',
      suntransit: '',
      civilTwilight: {
        morning: '',
        evening: ''
      },
      nauticalTwilight: {
        morning: '',
        evening: ''
      },
      astronomicalTwilight: {
        morning: '',
        evening: ''
      }
    })

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
          const timestamp = item.dt * 1000
          return {
            date: new Date(timestamp),
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
        const { data } = await api.weatherAPI.getCurrentWeather()
        weather.value = data
      } catch (error) {
        console.error('날씨 데이터 조회 중 오류:', error)
      }
    }

    const fetchAirQualityData = async () => {
      try {
        const { data } = await api.airQualityAPI.getCurrentAirQuality()
        console.log('대기질 데이터 응답:', data)
        
        if (data.resultCode === '00' && data.items && data.items.length > 0) {
          const item = data.items[0] // 첫 번째 측정소 데이터 사용
          
          // 응답 데이터를 컴포넌트 형식에 맞게 변환
          const transformedData = {
            stationName: item.stationName || '',
            dataTime: item.dataTime || '',
            khaiValue: item.khaiValue?.toString() || '0',
            khaiGrade: item.khaiGrade?.toString() || '0',
            pm10Value: item.pm10Value?.toString() || '0',
            pm10Grade: item.pm10Grade?.toString() || '0',
            pm25Value: item.pm25Value?.toString() || '0',
            pm25Grade: item.pm25Grade?.toString() || '0',
            o3Value: item.o3Value?.toString() || '0',
            o3Grade: item.o3Grade?.toString() || '0',
            coValue: item.coValue?.toString() || '0',
            coGrade: item.coGrade?.toString() || '0',
            no2Value: item.no2Value?.toString() || '0',
            no2Grade: item.no2Grade?.toString() || '0',
            so2Value: item.so2Value?.toString() || '0',
            so2Grade: item.so2Grade?.toString() || '0'
          }
          
          airQuality.value = transformedData
          console.log('변환된 대기질 상태값:', airQuality.value)
        } else {
          console.error('대기질 데이터가 올바르지 않습니다:', data)
        }
      } catch (error) {
        console.error('대기질 데이터 조회 중 오류:', error)
      }
    }

    const fetchForecastData = async () => {
      try {
        const { data } = await api.weatherAPI.getForecast()
        forecast.value = data
      } catch (error) {
        console.error('예보 데이터 조회 중 오류:', error)
        forecast.value = []
      }
    }

    const fetchSunriseData = async () => {
      try {
        const today = new Date();
        const dateStr = today.getFullYear() +
          String(today.getMonth() + 1).padStart(2, '0') +
          String(today.getDate()).padStart(2, '0');

        const response = await api.weatherAPI.getSunriseSunset(dateStr);
        console.log('일출/일몰 데이터:', response);
        sunriseData.value = response;
      } catch (error) {
        console.error('일출/일몰 데이터 조회 중 오류:', error);
      }
    }

    const refreshData = async () => {
      isLoading.value = true
      try {
        await Promise.all([
          fetchWeatherData(),
          fetchAirQualityData(),
          fetchForecastData(),
          fetchSunriseData()
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
      forecast,
      isLoading,
      sunriseData,
      groupedForecast,
      fetchAirQualityData,
      fetchWeatherData,
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