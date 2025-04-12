<template>
  <v-container>
    <div class="d-flex flex-column mb-6">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <h2 class="text-h5 font-weight-bold mb-0">전라남도 대기질</h2>
          <v-chip
            v-if="stations.length > 0"
            color="primary"
            variant="flat"
            size="small"
            class="font-weight-medium ms-2"
          >
            총 {{ stations.length }}개 지역
          </v-chip>
          <div v-if="stations.length > 0" class="ms-4 text-medium-emphasis">
            <v-icon icon="mdi-clock-outline" size="small" class="me-1" />
            {{ stations[0].dataTime }} 기준
          </div>
        </div>
        <v-btn
          prepend-icon="mdi-refresh"
          color="grey"
          variant="tonal"
          :loading="isLoading"
          @click="fetchAirQualityData"
        >
          새로고침
        </v-btn>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis mb-0">
        전라남도 실시간 대기질 정보를 조회할 수 있습니다.
      </p>
    </div>

    <v-row>
      <v-col cols="12">
        <AirQualityStations
          v-model:stations="stations"
          v-model:loading="isLoading"
          ref="stationsComponent"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import AirQualityStations from '@/components/AirQualityStations.vue';

const stations = ref([]);
const isLoading = ref(false);
const stationsComponent = ref(null);

const fetchAirQualityData = () => {
  if (stationsComponent.value) {
    stationsComponent.value.fetchData();
  }
};

// 초기 데이터 로드
fetchAirQualityData();
</script> 