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
            <div class="text-caption text-medium-emphasis">
              {{ formatCoordinates(sunriseData.coordinates) }}
            </div>
          </div>

          <v-row>
            <!-- 일출/일몰 시간 -->
            <v-col cols="12" sm="6">
              <v-card variant="outlined" class="time-card">
                <div class="d-flex align-center pa-4">
                  <div class="time-info flex-grow-1">
                    <div class="d-flex align-center mb-2">
                      <v-icon color="amber-darken-2" size="28" class="me-2">mdi-weather-sunset-up</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">일출</span>
                    </div>
                    <div class="text-h4 font-weight-bold">{{ formatTime(sunriseData.sunrise) }}</div>
                    <div class="text-caption text-medium-emphasis mt-1">
                      시민 박명: {{ formatTime(sunriseData.civilTwilight?.morning) }}
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card variant="outlined" class="time-card">
                <div class="d-flex align-center pa-4">
                  <div class="time-info flex-grow-1">
                    <div class="d-flex align-center mb-2">
                      <v-icon color="deep-orange" size="28" class="me-2">mdi-weather-sunset-down</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">일몰</span>
                    </div>
                    <div class="text-h4 font-weight-bold">{{ formatTime(sunriseData.sunset) }}</div>
                    <div class="text-caption text-medium-emphasis mt-1">
                      시민 박명: {{ formatTime(sunriseData.civilTwilight?.evening) }}
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>

            <!-- 월출/월몰 시간 -->
            <v-col cols="12" sm="6">
              <v-card variant="outlined" class="time-card">
                <div class="d-flex align-center pa-4">
                  <div class="time-info flex-grow-1">
                    <div class="d-flex align-center mb-2">
                      <v-icon color="blue-grey" size="28" class="me-2">mdi-weather-night</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">월출</span>
                    </div>
                    <div class="text-h4 font-weight-bold">{{ formatTime(sunriseData.moonrise) }}</div>
                    <div class="text-caption text-medium-emphasis mt-1">
                      월남중: {{ formatTime(sunriseData.moontransit) }}
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card variant="outlined" class="time-card">
                <div class="d-flex align-center pa-4">
                  <div class="time-info flex-grow-1">
                    <div class="d-flex align-center mb-2">
                      <v-icon color="blue-grey-darken-1" size="28" class="me-2">mdi-weather-night</v-icon>
                      <span class="text-subtitle-1 font-weight-medium">월몰</span>
                    </div>
                    <div class="text-h4 font-weight-bold">{{ formatTime(sunriseData.moonset) }}</div>
                    <div class="text-caption text-medium-emphasis mt-1">
                      일남중: {{ formatTime(sunriseData.suntransit) }}
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- 박명 정보 -->
          <v-expansion-panels class="mt-4">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon color="blue-grey" class="me-2">mdi-information</v-icon>
                  상세 박명 정보
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="text-subtitle-2 font-weight-medium mb-2">시민 박명</div>
                    <div class="text-body-1">
                      아침: {{ formatTime(sunriseData.civilTwilight?.morning) }}<br>
                      저녁: {{ formatTime(sunriseData.civilTwilight?.evening) }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-subtitle-2 font-weight-medium mb-2">항해 박명</div>
                    <div class="text-body-1">
                      아침: {{ formatTime(sunriseData.nauticalTwilight?.morning) }}<br>
                      저녁: {{ formatTime(sunriseData.nauticalTwilight?.evening) }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="text-subtitle-2 font-weight-medium mb-2">천문 박명</div>
                    <div class="text-body-1">
                      아침: {{ formatTime(sunriseData.astronomicalTwilight?.morning) }}<br>
                      저녁: {{ formatTime(sunriseData.astronomicalTwilight?.evening) }}
                    </div>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
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

.time-card {
  transition: all 0.3s ease;
  height: 100%;
}

.time-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
</style> 