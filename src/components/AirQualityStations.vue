<template>
  <v-card class="air-quality-stations">
    <v-card-text class="pa-0">
      <div class="table-container">
        <v-fade-transition>
          <template v-if="stations.length > 0">
            <div class="table-inner-container">
              <v-table density="comfortable" hover fixed-header>
                <thead>
                  <tr class="header-row">
                    <th class="text-no-wrap text-left header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-map-marker</v-icon>
                        측정소
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 140px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-gauge</v-icon>
                        통합대기환경지수
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-weather-dust</v-icon>
                        미세먼지
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-weather-dust</v-icon>
                        초미세먼지
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-molecule</v-icon>
                        오존
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-molecule</v-icon>
                        일산화탄소
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-molecule</v-icon>
                        이산화질소
                      </div>
                    </th>
                    <th class="text-no-wrap text-center header-cell" style="width: 120px">
                      <div class="header-content">
                        <v-icon size="small" class="me-2">mdi-molecule</v-icon>
                        아황산가스
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="station in stations" :key="station.stationName">
                    <td class="text-no-wrap station-name text-center">
                      <div class="d-flex align-center justify-center">
                        <span class="font-weight-medium">{{ station.stationName }}</span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.khaiGrade)"></div>
                        <span class="value-text">{{ station.khaiValue }}</span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.pm10Grade)"></div>
                        <span class="value-text">{{ station.pm10Value }}<span class="unit">㎍/㎥</span></span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.pm25Grade)"></div>
                        <span class="value-text">{{ station.pm25Value }}<span class="unit">㎍/㎥</span></span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.o3Grade)"></div>
                        <span class="value-text">{{ station.o3Value }}<span class="unit">ppm</span></span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.coGrade)"></div>
                        <span class="value-text">{{ station.coValue }}<span class="unit">ppm</span></span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.no2Grade)"></div>
                        <span class="value-text">{{ station.no2Value }}<span class="unit">ppm</span></span>
                      </div>
                    </td>
                    <td class="text-no-wrap text-center">
                      <div class="value-container justify-center">
                        <div class="grade-dot" :class="getGradeColor(station.so2Grade)"></div>
                        <span class="value-text">{{ station.so2Value }}<span class="unit">ppm</span></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </template>

          <div v-else-if="loading" class="d-flex justify-center align-center pa-4">
            <v-progress-circular indeterminate color="primary" />
          </div>

          <v-alert
            v-else
            type="info"
            text="측정소 데이터를 불러올 수 없습니다."
            variant="tonal"
          />
        </v-fade-transition>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { airQualityAPI } from '@/utils/api';

const stations = ref([]);
const loading = ref(false);
const emit = defineEmits(['update:stations', 'update:loading']);

const getGradeColor = (grade) => {
  const gradeNum = parseInt(grade);
  if (gradeNum === 1) return 'success';
  if (gradeNum === 2) return 'warning';
  if (gradeNum === 3) return 'error';
  if (gradeNum === 4) return 'error-darken-2';
  return 'grey';
};

const fetchData = async () => {
  loading.value = true;
  emit('update:loading', true);
  stations.value = []; // 데이터 초기화로 트랜지션 효과 강화
  try {
    const response = await airQualityAPI.getAllStations();
    if (response.resultCode === '00' && response.items) {
      stations.value = response.items
        .filter(station => station.pm10Value !== '-' || station.pm25Value !== '-')
        .sort((a, b) => a.stationName.localeCompare(b.stationName));
      emit('update:stations', stations.value);
    } else {
      console.error('측정소 데이터가 올바르지 않습니다:', response);
      emit('update:stations', []);
    }
  } catch (error) {
    console.error('측정소 데이터 조회 실패:', error);
    emit('update:stations', []);
  } finally {
    loading.value = false;
    emit('update:loading', false);
  }
};

onMounted(() => {
  fetchData();
});

defineExpose({
  fetchData
});
</script>

<style scoped>
.air-quality-stations {
  display: flex;
  flex-direction: column;
  height: 800px;
  background-color: rgb(var(--v-theme-background));
  border-radius: 4px;
}

.v-card-title {
  flex: none;
  background-color: rgb(var(--v-theme-blue-lighten-5));
  padding: 16px 24px;
  min-height: 64px;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

.v-card-text {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: rgb(var(--v-theme-background));
}

.time-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.875rem;
  white-space: nowrap;
  background-color: rgb(var(--v-theme-surface));
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

.table-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 0 0 24px;
  background-color: rgb(var(--v-theme-background));
  display: flex;
  flex-direction: column;
}

.table-inner-container {
  margin: 0 12px;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 8px;
  border: 1px solid rgba(var(--v-border-color), 0.08);
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.v-table {
  height: 100%;
  background: transparent !important;
  display: flex;
  flex-direction: column;
}

.v-table > .v-table__wrapper {
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.v-table > .v-table__wrapper > table {
  border-spacing: 0;
  background-color: transparent;
  width: 100%;
  min-width: 1000px;
  border-collapse: separate;
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 8px;
  overflow: hidden;
}

thead {
  position: sticky;
  top: 0;
  z-index: 2;
}

tbody {
  background-color: rgb(var(--v-theme-surface));
}

.header-row {
  background-color: transparent !important;
}

.header-cell {
  font-weight: 600 !important;
  white-space: nowrap;
  padding: 0 !important;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.87);
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
  background-color: rgb(var(--v-theme-grey-lighten-4));
  position: relative;
}

.header-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(var(--v-theme-grey-lighten-4));
  border-bottom: 2px solid rgb(var(--v-theme-primary));
  z-index: -1;
}

.header-cell:first-child {
  border-radius: 8px 0 0 0;
}

.header-cell:first-child::before {
  border-radius: 8px 0 0 0;
}

.header-cell:last-child {
  border-right: none;
  border-radius: 0 8px 0 0;
}

.header-cell:last-child::before {
  border-radius: 0 8px 0 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 56px;
  transition: background-color 0.2s ease;
  position: relative;
  z-index: 1;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.87);
}

.header-content .v-icon {
  color: rgb(var(--v-theme-primary));
  margin-right: 8px;
}

.v-table td {
  height: 56px !important;
  padding: 8px 16px !important;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08);
  background-color: rgb(var(--v-theme-surface));
  vertical-align: middle;
}

.v-table tr:last-child td {
  border-bottom: none;
}

.v-table tr:hover td {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

.station-name {
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.87);
  text-align: center;
}

.value-container {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  padding: 0 8px;
  min-height: 40px;
}

.value-container.justify-center {
  justify-content: center;
}

.grade-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.grade-dot.success {
  background-color: rgb(var(--v-theme-success));
}

.grade-dot.warning {
  background-color: rgb(var(--v-theme-warning));
}

.grade-dot.error {
  background-color: rgb(var(--v-theme-error));
}

.grade-dot.error-darken-2 {
  background-color: rgb(var(--v-theme-error-darken-2));
}

.grade-dot.grey {
  background-color: rgb(var(--v-theme-grey));
}

.value-text {
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.87);
  font-size: 0.875rem;
}

.unit {
  font-size: 0.75rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-left: 2px;
}

.refresh-btn {
  min-width: 110px;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  transform: scale(1.02);
  background-color: rgb(var(--v-theme-blue-darken-1));
  color: white;
}

.refresh-btn:active {
  transform: scale(0.98);
  background-color: rgb(var(--v-theme-blue-darken-2));
}

@media (max-width: 600px) {
  .v-card-title {
    padding: 8px 12px;
    min-height: 48px;
    font-size: 0.875rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .v-card-title .d-flex {
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;
  }

  .time-info {
    font-size: 0.75rem;
    padding: 2px 8px;
    margin-left: 0 !important;
    width: 100%;
  }

  .time-info .v-icon {
    font-size: 14px;
  }

  .refresh-btn {
    width: 100%;
  }

  .refresh-btn:hover {
    transform: none;
  }

  .refresh-btn:active {
    transform: scale(0.99);
  }

  .info-bar {
    padding: 6px 12px;
  }

  .grade-chips {
    width: 100%;
    gap: 4px;
  }

  .table-inner-container {
    margin: 0 8px;
  }

  .header-content {
    padding: 12px;
    min-height: 48px;
  }

  .header-content .v-icon {
    margin-right: 6px;
  }

  .table-container {
    padding: 0 0 16px;
  }

  .v-table td {
    height: 48px !important;
    padding: 4px 8px !important;
  }

  .value-container {
    gap: 6px;
    padding: 0 4px;
    min-height: 32px;
  }

  .value-text {
    font-size: 0.75rem;
  }

  .unit {
    font-size: 0.625rem;
  }

  .grade-dot {
    width: 6px;
    height: 6px;
  }

  .v-table > .v-table__wrapper > table {
    min-width: 800px;
  }

  .header-cell {
    font-size: 0.75rem;
  }

  th[style*="width:"] {
    width: auto !important;
  }

  th:first-child {
    min-width: 80px !important;
  }

  th:not(:first-child) {
    min-width: 100px !important;
  }
}

.v-fade-transition-enter-active,
.v-fade-transition-leave-active {
  transition: opacity 0.3s ease;
}

.v-fade-transition-enter-from,
.v-fade-transition-leave-to {
  opacity: 0;
}

.v-fade-transition-leave-from,
.v-fade-transition-enter-to {
  opacity: 1;
}
</style> 