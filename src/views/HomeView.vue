<template>
  <v-container>
    <v-row>
      <!-- 날씨 카드 -->
      <v-col cols="12" md="6">
        <v-card class="weather-card">
          <v-card-title class="text-h6">
            날씨 및 대기질
            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-refresh"
              variant="text"
              :loading="loading"
              @click="refreshData"
            ></v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <!-- 날씨 정보 -->
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title class="text-subtitle-1">현재 날씨</v-card-title>
                  <v-card-text v-if="weather">
                    <div class="text-h4 text-center mb-2">{{ weather.temperature }}°C</div>
                    <div class="text-body-1 text-center">{{ weather.description }}</div>
                    <div class="text-caption text-center">
                      습도: {{ weather.humidity }}% / 풍속: {{ weather.windSpeed }}m/s
                    </div>
                  </v-card-text>
                  <v-card-text v-else class="text-center">
                    날씨 정보를 불러오는 중...
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- 대기질 정보 -->
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title class="text-subtitle-1">대기질</v-card-title>
                  <v-card-text v-if="airQuality">
                    <div class="text-h4 text-center mb-2">{{ airQuality.pm10 }}</div>
                    <div class="text-body-1 text-center">{{ airQuality.status }}</div>
                    <div class="text-caption text-center">
                      초미세먼지: {{ airQuality.pm25 }} / 오존: {{ airQuality.o3 }}
                    </div>
                  </v-card-text>
                  <v-card-text v-else class="text-center">
                    대기질 정보를 불러오는 중...
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- 일기 예보 -->
            <v-row class="mt-4">
              <v-col cols="12">
                <v-card variant="outlined">
                  <v-card-title class="text-subtitle-1">일기 예보</v-card-title>
                  <v-card-text>
                    <v-row v-if="forecast">
                      <v-col
                        v-for="(day, index) in forecast"
                        :key="index"
                        cols="4"
                        class="text-center"
                      >
                        <div class="text-subtitle-2">{{ day.date }}</div>
                        <div class="text-h5">{{ day.temperature }}°C</div>
                        <div class="text-caption">{{ day.description }}</div>
                      </v-col>
                    </v-row>
                    <div v-else class="text-center">
                      일기 예보를 불러오는 중...
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 직매장 현황 -->
      <v-col cols="12" md="6">
        <store-status></store-status>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/utils/api';
import StoreStatus from '@/components/StoreStatus.vue';

const loading = ref(false);
const weather = ref(null);
const airQuality = ref(null);
const forecast = ref(null);

const fetchWeatherData = async () => {
  try {
    const response = await api.get('/weather');
    weather.value = response.data;
  } catch (error) {
    console.error('날씨 데이터 조회 중 오류:', error);
  }
};

const fetchAirQualityData = async () => {
  try {
    const response = await api.get('/air-quality');
    airQuality.value = response.data;
  } catch (error) {
    console.error('대기질 데이터 조회 중 오류:', error);
  }
};

const fetchForecastData = async () => {
  try {
    const response = await api.get('/forecast');
    forecast.value = response.data;
  } catch (error) {
    console.error('예보 데이터 조회 중 오류:', error);
  }
};

const refreshData = async () => {
  loading.value = true;
  try {
    await Promise.all([
      fetchWeatherData(),
      fetchAirQualityData(),
      fetchForecastData()
    ]);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  refreshData();
});
</script>

<style scoped>
.weather-card {
  height: 100%;
}
</style> 