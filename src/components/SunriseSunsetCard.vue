<template>
  <v-card variant="outlined" class="sunrise-sunset-card" :class="{ 'refresh-animation': isLoading }">
    <v-card-text class="position-relative">
      <v-row :style="{ opacity: isLoading ? '0.5' : '1' }">
        <v-col cols="12">
          <div class="d-flex align-center mb-4">
            <div class="text-subtitle-1 font-weight-medium">
              {{ sunriseData.location }}
              <span class="text-caption text-medium-emphasis ms-2">
                {{ formatDate(sunriseData.date) }}
              </span>
            </div>
            <v-spacer></v-spacer>
          </div>

          <!-- 일출/일몰/월출/월몰 시간 -->
          <div class="time-blocks-container mb-4">
            <div class="time-block-wrapper">
              <div class="time-block">
                <div class="d-flex align-center justify-center mb-2">
                  <v-icon color="amber-darken-2" size="20" class="me-2">mdi-weather-sunset-up</v-icon>
                  <span class="text-subtitle-2">일출</span>
                </div>
                <div class="time-content text-center">
                  <div class="text-h5 font-weight-bold mb-1">{{ formatTime(sunriseData.sunrise) }}</div>
                  <div class="text-caption text-medium-emphasis">시민 박명 {{ formatTime(sunriseData.civilTwilight?.morning) }}</div>
                </div>
              </div>

              <div class="time-block">
                <div class="d-flex align-center justify-center mb-2">
                  <v-icon color="deep-orange" size="20" class="me-2">mdi-weather-sunset-down</v-icon>
                  <span class="text-subtitle-2">일몰</span>
                </div>
                <div class="time-content text-center">
                  <div class="text-h5 font-weight-bold mb-1">{{ formatTime(sunriseData.sunset) }}</div>
                  <div class="text-caption text-medium-emphasis">시민 박명 {{ formatTime(sunriseData.civilTwilight?.evening) }}</div>
                </div>
              </div>
            </div>

            <div class="time-block-wrapper">
              <div class="time-block">
                <div class="d-flex align-center justify-center mb-2">
                  <v-icon color="blue-grey" size="20" class="me-2">mdi-weather-night</v-icon>
                  <span class="text-subtitle-2">월출</span>
                </div>
                <div class="time-content text-center">
                  <div class="text-h5 font-weight-bold mb-1">{{ formatTime(sunriseData.moonrise) }}</div>
                  <div class="text-caption text-medium-emphasis">월남중 {{ formatTime(sunriseData.moontransit) }}</div>
                </div>
              </div>

              <div class="time-block">
                <div class="d-flex align-center justify-center mb-2">
                  <v-icon color="blue-grey-darken-1" size="20" class="me-2">mdi-weather-night</v-icon>
                  <span class="text-subtitle-2">월몰</span>
                </div>
                <div class="time-content text-center">
                  <div class="text-h5 font-weight-bold mb-1">{{ formatTime(sunriseData.moonset) }}</div>
                  <div class="text-caption text-medium-emphasis">일남중 {{ formatTime(sunriseData.suntransit) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 박명 정보 -->
          <div class="twilight-info">
            <div class="d-flex align-center mb-3">
              <v-icon color="blue-grey" size="20" class="me-2">mdi-information</v-icon>
              <span class="text-subtitle-1 font-weight-medium">상세 박명 정보</span>
            </div>
            <div class="twilight-list">
              <div class="twilight-item">
                <div class="d-flex align-center justify-center">
                  <v-icon color="amber" size="16" class="me-2">mdi-weather-sunset</v-icon>
                  <span class="text-body-1 me-3">시민</span>
                  <div class="time-group">
                    <span class="text-caption text-medium-emphasis me-1">아침</span>
                    <span class="text-body-2">{{ formatTime(sunriseData.civilTwilight?.morning) }}</span>
                  </div>
                  <div class="divider mx-3"></div>
                  <div class="time-group">
                    <span class="text-caption text-medium-emphasis me-1">저녁</span>
                    <span class="text-body-2">{{ formatTime(sunriseData.civilTwilight?.evening) }}</span>
                  </div>
                </div>
              </div>

              <div class="twilight-item">
                <div class="d-flex align-center justify-center">
                  <v-icon color="blue" size="16" class="me-2">mdi-weather-sunset</v-icon>
                  <span class="text-body-1 me-3">항해</span>
                  <div class="time-group">
                    <span class="text-caption text-medium-emphasis me-1">아침</span>
                    <span class="text-body-2">{{ formatTime(sunriseData.nauticalTwilight?.morning) }}</span>
                  </div>
                  <div class="divider mx-3"></div>
                  <div class="time-group">
                    <span class="text-caption text-medium-emphasis me-1">저녁</span>
                    <span class="text-body-2">{{ formatTime(sunriseData.nauticalTwilight?.evening) }}</span>
                  </div>
                </div>
              </div>

              <div class="twilight-item">
                <div class="d-flex align-center justify-center">
                  <v-icon color="purple" size="16" class="me-2">mdi-weather-sunset</v-icon>
                  <span class="text-body-1 me-3">천문</span>
                  <div class="time-group">
                    <span class="text-caption text-medium-emphasis me-1">아침</span>
                    <span class="text-body-2">{{ formatTime(sunriseData.astronomicalTwilight?.morning) }}</span>
                  </div>
                  <div class="divider mx-3"></div>
                  <div class="time-group">
                    <span class="text-caption text-medium-emphasis me-1">저녁</span>
                    <span class="text-body-2">{{ formatTime(sunriseData.astronomicalTwilight?.evening) }}</span>
                  </div>
                </div>
              </div>
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
  name: 'SunriseSunsetCard',
  props: {
    sunriseData: {
      type: Object,
      default: () => ({
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
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const formatTime = (time) => {
      if (!time) return '--:--'
      return `${time.slice(0, 2)}:${time.slice(2)}`
    }

    const formatDate = (date) => {
      if (!date) return ''
      return `${date.slice(0, 4)}년 ${date.slice(4, 6)}월 ${date.slice(6, 8)}일`
    }

    const formatCoordinates = (coords) => {
      if (!coords) return ''
      return `${coords.longitude}, ${coords.latitude}`
    }

    return {
      formatTime,
      formatDate,
      formatCoordinates
    }
  }
}
</script>

<style scoped>
.sunrise-sunset-card {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(10px);
  height: 100%;
  border-radius: 0;
}

.time-blocks-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.time-block-wrapper {
  display: flex;
  gap: 12px;
}

.time-block {
  flex: 1;
  padding: 16px;
  background-color: rgba(var(--v-theme-surface), 0.8);
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.time-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.time-content {
  padding: 0;
}

.twilight-info {
  background-color: rgba(var(--v-theme-surface), 0.5);
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
}

.twilight-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
}

.twilight-item {
  flex: 1;
  background-color: rgba(var(--v-theme-surface), 0.3);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.time-group {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.divider {
  width: 1px;
  height: 16px;
  background-color: rgba(var(--v-theme-on-surface), 0.12);
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
}

.refresh-animation {
  transition: all 0.3s ease;
  transform: scale(0.98);
}

@media (min-width: 901px) {
  .time-blocks-container {
    flex-direction: row;
    gap: 12px;
  }

  .time-block-wrapper {
    flex: 1;
    gap: 12px;
  }
}

@media (max-width: 900px) {
  .twilight-list {
    flex-direction: column;
    gap: 8px;
  }

  .twilight-item {
    padding: 8px;
  }
}

@media (max-width: 600px) {
  .time-blocks-container {
    gap: 12px;
  }

  .time-block-wrapper {
    gap: 8px;
  }

  .time-block {
    padding: 12px;
  }

  .time-content {
    padding: 0;
  }

  .time-block .text-h5 {
    font-size: 1.15rem !important;
    line-height: 1.3;
  }

  .time-block .text-subtitle-2 {
    font-size: 0.875rem !important;
  }

  .time-block .text-caption {
    font-size: 0.75rem !important;
    line-height: 1.2;
  }

  .time-group {
    min-width: auto;
  }
}

@media (max-width: 360px) {
  .twilight-item .d-flex {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .divider {
    display: none;
  }

  .time-group {
    margin: 0;
  }

  .time-group + .time-group {
    margin-top: 4px;
  }
}
</style> 