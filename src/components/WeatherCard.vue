<!-- 날씨 정보 컴포넌트 -->
<template>
  <v-card variant="outlined" class="weather-card" :class="{ 'refresh-animation': isLoading }">
    <v-card-title class="text-subtitle-1 font-weight-medium pa-4">
      날씨 정보
      <div class="text-caption text-medium-emphasis mt-1">
        {{ weather.kstDateTime }}
      </div>
    </v-card-title>
    <v-card-text class="position-relative">
      <v-row :style="{ opacity: isLoading ? '0.5' : '1' }">
        <v-col cols="12">
          <div class="d-flex flex-wrap align-center">
            <!-- 현재 날씨 정보 -->
            <div class="current-weather d-flex align-center">
              <v-icon size="48" :color="weather.temperature <= 10 ? 'info' : 'warning'" class="me-4">
                {{ getWeatherIcon(weather.icon) }}
              </v-icon>
              <div>
                <div class="text-h4 font-weight-bold">
                  {{ Math.round(weather.temperature) }}°C
                </div>
                <div class="text-subtitle-1 text-medium-emphasis">
                  {{ weather.description }}
                </div>
                <div class="text-subtitle-2 text-medium-emphasis">
                  최고 {{ Math.round(weather.temp_max) }}° / 최저 {{ Math.round(weather.temp_min) }}°
                </div>
              </div>
            </div>
            <!-- 상세 날씨 정보 -->
            <v-divider vertical class="mx-6 hidden-sm-and-down"></v-divider>
            <div class="weather-details d-flex flex-wrap gap-6">
              <div class="weather-detail-item">
                <v-icon color="primary" size="24" class="mb-1">mdi-water-percent</v-icon>
                <div class="text-subtitle-1">{{ weather.humidity }}%</div>
                <div class="text-caption text-medium-emphasis">습도</div>
              </div>
              <div class="weather-detail-item">
                <v-icon color="primary" size="24" class="mb-1">mdi-weather-windy</v-icon>
                <div class="text-subtitle-1">{{ weather.windSpeed }}m/s</div>
                <div class="text-caption text-medium-emphasis">풍속</div>
              </div>
              <div class="weather-detail-item">
                <v-icon color="primary" size="24" class="mb-1">mdi-compass</v-icon>
                <div class="text-subtitle-1">{{ getWindDirection(weather.windDirection) }}</div>
                <div class="text-caption text-medium-emphasis">풍향</div>
              </div>
              <div class="weather-detail-item">
                <v-icon color="primary" size="24" class="mb-1">mdi-weather-pouring</v-icon>
                <div class="text-subtitle-1">{{ weather.rainfall || 0 }}mm</div>
                <div class="text-caption text-medium-emphasis">강수량</div>
              </div>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
          <!-- 5일 예보 -->
          <div class="forecast-container">
            <div
              v-for="(day, index) in forecast"
              :key="index"
              class="forecast-item"
            >
              <v-card
                variant="outlined"
                class="forecast-day"
                :class="`border-${day.main.temp_max > 15 ? 'warning' : 'info'}`"
              >
                <div class="forecast-day-content">
                  <div class="text-subtitle-2 font-weight-medium mb-2">
                    {{ formatDate(new Date(day.dt * 1000)) }}
                  </div>
                  <v-icon
                    :color="day.main.temp_max > 15 ? 'warning' : 'info'"
                    size="32"
                    class="mb-2"
                  >
                    {{ getWeatherIcon(day.weather[0].icon) }}
                  </v-icon>
                  <div class="text-h6 font-weight-bold mb-1">
                    {{ Math.round(day.main.temp_max) }}°
                  </div>
                  <div class="text-body-2 text-medium-emphasis">
                    {{ Math.round(day.main.temp_min) }}°
                  </div>
                  <div class="forecast-details text-caption text-medium-emphasis mt-2">
                    <div class="d-flex align-center justify-center mb-1">
                      <v-icon size="14" color="primary" class="me-1">mdi-water-percent</v-icon>
                      {{ day.main.humidity }}%
                    </div>
                    <div class="d-flex align-center justify-center">
                      <v-icon size="14" color="primary" class="me-1">mdi-weather-windy</v-icon>
                      {{ day.wind.speed }}m/s
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
      <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object,
      required: true
    },
    forecast: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const formatDateTime = (timestamp) => {
      if (!timestamp) return '';
      return timestamp;
    }

    const getWeatherIcon = (iconCode) => {
      const iconMap = {
        '01d': 'mdi-weather-sunny',
        '01n': 'mdi-weather-night',
        '02d': 'mdi-weather-partly-cloudy',
        '02n': 'mdi-weather-night-partly-cloudy',
        '03d': 'mdi-weather-cloudy',
        '03n': 'mdi-weather-cloudy',
        '04d': 'mdi-weather-cloudy',
        '04n': 'mdi-weather-cloudy',
        '09d': 'mdi-weather-pouring',
        '09n': 'mdi-weather-pouring',
        '10d': 'mdi-weather-rainy',
        '10n': 'mdi-weather-rainy',
        '11d': 'mdi-weather-lightning-rainy',
        '11n': 'mdi-weather-lightning-rainy',
        '13d': 'mdi-weather-snowy',
        '13n': 'mdi-weather-snowy',
        '50d': 'mdi-weather-fog',
        '50n': 'mdi-weather-fog'
      };
      return iconMap[iconCode] || 'mdi-weather-cloudy';
    }

    const getWindDirection = (degrees) => {
      if (degrees === undefined || degrees === null) return '알 수 없음';
      
      const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
      const index = Math.round(degrees / 45) % 8;
      return directions[index];
    }

    const formatDate = (date) => {
      if (!date || !(date instanceof Date) || isNaN(date)) {
        return '날짜 없음';
      }
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    return {
      formatDateTime,
      getWeatherIcon,
      getWindDirection,
      formatDate
    }
  }
}
</script>

<style scoped>
.weather-card {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(10px);
  height: 100%;
  border-radius: 0;
}

.refresh-animation {
  transition: all 0.3s ease;
  transform: scale(0.98);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  border-radius: 0;
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.forecast-item {
  width: 100%;
}

.forecast-day {
  border-radius: 0;
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
}

.forecast-day:hover {
  transform: translateY(-2px);
}

.forecast-day-content {
  padding: 1rem;
  text-align: center;
}

.forecast-details {
  margin-top: auto;
}

.border-warning {
  border-color: rgb(var(--v-theme-warning)) !important;
}

.border-info {
  border-color: rgb(var(--v-theme-info)) !important;
}

.current-weather {
  flex: 0 0 auto;
}

.weather-details {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.weather-detail-item {
  text-align: center;
  min-width: 80px;
}

@media (max-width: 600px) {
  .current-weather {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .weather-details {
    width: 100%;
    margin-top: 1rem;
    justify-content: space-around;
  }
  
  .forecast-container {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.5rem;
  }
  
  .forecast-day-content {
    padding: 0.75rem;
  }
}
</style> 