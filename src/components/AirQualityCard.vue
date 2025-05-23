<!-- 대기질 정보 컴포넌트 -->
<template>
  <v-card variant="outlined" class="air-quality-card" :class="{ 'refresh-animation': isLoading }">
    <v-card-title class="text-subtitle-1 font-weight-medium pa-4">
      대기질 정보
      <div class="text-caption text-medium-emphasis mt-1">
        {{ airQuality.stationName }} 측정소 {{ formatDateTime(airQuality.dataTime) }}
      </div>
    </v-card-title>
    <v-card-text class="position-relative">
      <v-row :style="{ opacity: isLoading ? '0.5' : '1' }">
        <v-col cols="12">
          <v-row>
            <!-- 통합대기환경지수 -->
            <v-col cols="12">
              <v-card variant="outlined" class="air-quality-detail mb-4" :class="`border-${getKhaiColor}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">통합대기환경지수</div>
                  <v-icon :color="getKhaiColor" size="32" class="my-2">mdi-weather-cloudy-alert</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h4 font-weight-bold">{{ airQuality.khaiValue }}</span>
                  </div>
                  <v-chip :color="getKhaiColor" variant="tonal" size="small" class="mt-2">
                    {{ getKhaiGrade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <!-- 미세먼지 PM10 -->
            <v-col cols="6" sm="4">
              <v-card variant="outlined" class="air-quality-detail" :class="`border-${getPM10Color}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">미세먼지</div>
                  <v-icon :color="getPM10Color" size="28" class="my-2">mdi-molecule</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold">{{ airQuality.pm10Value }}</span>
                    <span class="text-caption ms-1">㎍/㎥</span>
                  </div>
                  <v-chip :color="getPM10Color" variant="tonal" size="x-small" class="mt-2">
                    {{ getPM10Grade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <!-- 초미세먼지 PM2.5 -->
            <v-col cols="6" sm="4">
              <v-card variant="outlined" class="air-quality-detail" :class="`border-${getPM25Color}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">초미세먼지</div>
                  <v-icon :color="getPM25Color" size="28" class="my-2">mdi-molecule</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold">{{ airQuality.pm25Value }}</span>
                    <span class="text-caption ms-1">㎍/㎥</span>
                  </div>
                  <v-chip :color="getPM25Color" variant="tonal" size="x-small" class="mt-2">
                    {{ getPM25Grade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <!-- 오존 O3 -->
            <v-col cols="6" sm="4">
              <v-card variant="outlined" class="air-quality-detail" :class="`border-${getO3Color}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">오존</div>
                  <v-icon :color="getO3Color" size="28" class="my-2">mdi-weather-windy</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold">{{ airQuality.o3Value }}</span>
                    <span class="text-caption ms-1">ppm</span>
                  </div>
                  <v-chip :color="getO3Color" variant="tonal" size="x-small" class="mt-2">
                    {{ getO3Grade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <!-- 일산화탄소 CO -->
            <v-col cols="6" sm="4">
              <v-card variant="outlined" class="air-quality-detail" :class="`border-${getCoColor}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">일산화탄소</div>
                  <v-icon :color="getCoColor" size="28" class="my-2">mdi-factory</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold">{{ airQuality.coValue }}</span>
                    <span class="text-caption ms-1">ppm</span>
                  </div>
                  <v-chip :color="getCoColor" variant="tonal" size="x-small" class="mt-2">
                    {{ getCoGrade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <!-- 이산화질소 NO2 -->
            <v-col cols="6" sm="4">
              <v-card variant="outlined" class="air-quality-detail" :class="`border-${getNo2Color}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">이산화질소</div>
                  <v-icon :color="getNo2Color" size="28" class="my-2">mdi-car</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold">{{ airQuality.no2Value }}</span>
                    <span class="text-caption ms-1">ppm</span>
                  </div>
                  <v-chip :color="getNo2Color" variant="tonal" size="x-small" class="mt-2">
                    {{ getNo2Grade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <!-- 아황산가스 SO2 -->
            <v-col cols="6" sm="4">
              <v-card variant="outlined" class="air-quality-detail" :class="`border-${getSo2Color}`">
                <div class="d-flex flex-column align-center justify-center h-100 pa-4">
                  <div class="text-subtitle-2 font-weight-medium">아황산가스</div>
                  <v-icon :color="getSo2Color" size="28" class="my-2">mdi-smoke</v-icon>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold">{{ airQuality.so2Value }}</span>
                    <span class="text-caption ms-1">ppm</span>
                  </div>
                  <v-chip :color="getSo2Color" variant="tonal" size="x-small" class="mt-2">
                    {{ getSo2Grade }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AirQualityCard',
  props: {
    airQuality: {
      type: Object,
      default: () => ({
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
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const formatDateTime = (dateTime) => {
      if (!dateTime) return ''
      const date = new Date(dateTime)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes} 기준`
    }

    const getGradeText = (grade) => {
      const gradeNum = parseInt(grade)
      switch (gradeNum) {
        case 1: return '좋음'
        case 2: return '보통'
        case 3: return '나쁨'
        case 4: return '매우나쁨'
        default: return '정보없음'
      }
    }

    const getGradeColor = (grade) => {
      const gradeNum = parseInt(grade)
      switch (gradeNum) {
        case 1: return 'green'
        case 2: return 'amber-darken-2'
        case 3: return 'orange-darken-2'
        case 4: return 'red-darken-2'
        default: return 'grey'
      }
    }

    // 통합대기환경지수
    const getKhaiGrade = computed(() => getGradeText(props.airQuality.khaiGrade))
    const getKhaiColor = computed(() => getGradeColor(props.airQuality.khaiGrade))

    // 미세먼지 (PM10)
    const getPM10Grade = computed(() => getGradeText(props.airQuality.pm10Grade))
    const getPM10Color = computed(() => getGradeColor(props.airQuality.pm10Grade))

    // 초미세먼지 (PM2.5)
    const getPM25Grade = computed(() => getGradeText(props.airQuality.pm25Grade))
    const getPM25Color = computed(() => getGradeColor(props.airQuality.pm25Grade))

    // 오존 (O3)
    const getO3Grade = computed(() => getGradeText(props.airQuality.o3Grade))
    const getO3Color = computed(() => getGradeColor(props.airQuality.o3Grade))

    // 일산화탄소 (CO)
    const getCoGrade = computed(() => getGradeText(props.airQuality.coGrade))
    const getCoColor = computed(() => getGradeColor(props.airQuality.coGrade))

    // 이산화질소 (NO2)
    const getNo2Grade = computed(() => getGradeText(props.airQuality.no2Grade))
    const getNo2Color = computed(() => getGradeColor(props.airQuality.no2Grade))

    // 아황산가스 (SO2)
    const getSo2Grade = computed(() => getGradeText(props.airQuality.so2Grade))
    const getSo2Color = computed(() => getGradeColor(props.airQuality.so2Grade))

    return {
      formatDateTime,
      getKhaiGrade,
      getKhaiColor,
      getPM10Grade,
      getPM10Color,
      getPM25Grade,
      getPM25Color,
      getO3Grade,
      getO3Color,
      getCoGrade,
      getCoColor,
      getNo2Grade,
      getNo2Color,
      getSo2Grade,
      getSo2Color
    }
  }
}
</script>

<style scoped>
.air-quality-card {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(10px);
  height: 100%;
  border-radius: 0;
}

.air-quality-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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

.air-quality-detail {
  transition: all 0.3s ease;
  border-width: 1px !important;
  height: 100%;
  min-height: 160px;
  border-radius: 0;
}

.air-quality-detail:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.air-quality-detail .v-card-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.border-green {
  border-color: rgb(var(--v-theme-success)) !important;
}

.border-amber-darken-2 {
  border-color: rgb(var(--v-theme-warning)) !important;
}

.border-orange-darken-2 {
  border-color: rgb(var(--v-theme-warning)) !important;
}

.border-red-darken-2 {
  border-color: rgb(var(--v-theme-error)) !important;
}

.border-grey {
  border-color: rgb(var(--v-theme-grey)) !important;
}

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

@media (max-width: 768px) {
  .air-quality-card {
    @apply p-2;
  }
  
  .air-quality-card .text-2xl {
    font-size: 1.25rem;
  }
  
  .air-quality-card .text-base {
    font-size: 0.875rem;
  }
}

@media (max-width: 600px) {
  .air-quality-detail {
    min-height: 140px;
  }
  
  .air-quality-detail .text-h5 {
    font-size: 1.25rem !important;
  }
  
  .air-quality-detail .text-subtitle-2 {
    font-size: 0.8125rem !important;
  }

  .refresh-btn {
    min-width: auto;
    padding: 0 12px;
  }
  
  .refresh-btn .v-btn__content {
    gap: 4px;
  }
}
</style> 