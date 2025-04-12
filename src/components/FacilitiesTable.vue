<template>
  <div>
    <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between mb-6">
      <div class="d-flex flex-column mb-4 mb-sm-0">
        <h2 class="text-h5 font-weight-bold mb-2">화순군 노인시설 현황</h2>
        <p class="text-subtitle-1 text-medium-emphasis mb-0">
          화순군 내 노인복지시설 정보를 조회하고 주변 시설을 검색할 수 있습니다.
          <v-chip
            v-if="facilities.length > 0"
            color="primary"
            variant="flat"
            size="small"
            class="font-weight-medium ms-2"
          >
            총 {{ facilities.length }}개소
          </v-chip>
        </p>
      </div>
      <div class="d-flex align-center gap-2">
        <v-btn
          prepend-icon="mdi-map-search"
          color="primary"
          variant="tonal"
          :loading="isSearching"
          @click="searchNearbyFacilities"
        >
          현재 위치 기준 검색
        </v-btn>
        <v-btn
          prepend-icon="mdi-refresh"
          color="grey"
          variant="tonal"
          :loading="isLoading"
          @click="fetchFacilities"
        >
          새로고침
        </v-btn>
      </div>
    </div>

    <v-card class="mb-4 pa-4 bg-grey-lighten-4">
      <div class="d-flex flex-wrap">
        <v-select
          v-model="filters.type"
          :items="facilityTypes"
          label="시설 유형"
          clearable
          hide-details
          density="comfortable"
          variant="outlined"
          class="facility-filter"
          bg-color="white"
          @update:model-value="applyFilters"
        />
        <v-select
          v-model="filters.serviceType"
          :items="serviceTypes"
          label="서비스 유형"
          clearable
          hide-details
          density="comfortable"
          variant="outlined"
          class="facility-filter"
          bg-color="white"
          @update:model-value="applyFilters"
        />
        <v-select
          v-model="filters.establishmentType"
          :items="establishmentTypes"
          label="설립 유형"
          clearable
          hide-details
          density="comfortable"
          variant="outlined"
          class="facility-filter"
          bg-color="white"
          @update:model-value="applyFilters"
        />
        <v-text-field
          v-model="filters.search"
          label="시설명 검색"
          clearable
          hide-details
          density="comfortable"
          variant="outlined"
          class="facility-filter"
          bg-color="white"
          @update:model-value="applyFilters"
        />
      </div>
    </v-card>

    <v-row>
      <v-col
        v-for="facility in filteredFacilities"
        :key="facility.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          variant="outlined"
          class="h-100 d-flex flex-column facility-card"
          :href="getNaverMapUrl(facility)"
          target="_blank"
        >
          <div class="flex-grow-1">
            <v-card-item>
              <div class="d-flex align-center mb-2">
                <v-icon
                  :color="getTypeColor(facility.type)"
                  icon="mdi-hospital-building"
                  class="me-2"
                ></v-icon>
                <div class="text-h6 font-weight-bold">{{ facility.name }}</div>
              </div>
            </v-card-item>

            <v-card-text>
              <div class="d-flex flex-column">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-map-marker</v-icon>
                  <span class="text-body-2">{{ facility.address }}</span>
                  <span v-if="facility.distance" class="text-caption ms-2">
                    ({{ Number(facility.distance).toFixed(1) }}km)
                  </span>
                </div>
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-phone</v-icon>
                  <span class="text-body-2">{{ facility.phoneNumber || '-' }}</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ formatDate(facility.designationDate) }}</span>
                </div>
              </div>
            </v-card-text>
          </div>

          <div class="mt-auto">
            <v-divider></v-divider>
            <v-card-text class="pt-3">
              <div class="d-flex gap-2">
                <v-chip
                  size="small"
                  :color="getTypeColor(facility.type)"
                  variant="flat"
                  class="me-2"
                >
                  {{ facility.type }}
                </v-chip>
                <v-chip
                  size="small"
                  color="grey"
                  variant="flat"
                >
                  {{ facility.serviceType }}
                </v-chip>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
    <div class="text-center pt-4">
      <v-pagination
        v-model="itemsPerPage"
        :length="Math.ceil(filteredFacilities.length / 10)"
        :disabled="isLoading"
      ></v-pagination>
    </div>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const facilities = ref([])
const isLoading = ref(false)
const isSearching = ref(false)
const itemsPerPage = ref(10)
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const filters = ref({
  type: null,
  serviceType: null,
  establishmentType: null,
  search: ''
})

const facilityTypes = computed(() => {
  return [...new Set(facilities.value.map(f => f.type).filter(Boolean))].sort()
})

const serviceTypes = computed(() => {
  return [...new Set(facilities.value.map(f => f.serviceType).filter(Boolean))].sort()
})

const establishmentTypes = computed(() => {
  return [...new Set(facilities.value.map(f => f.establishmentType).filter(Boolean))].sort()
})

const filteredFacilities = computed(() => {
  return facilities.value.filter(facility => {
    if (!facility) return false
    if (filters.value.type && facility.type !== filters.value.type) return false
    if (filters.value.serviceType && facility.serviceType !== filters.value.serviceType) return false
    if (filters.value.establishmentType && facility.establishmentType !== filters.value.establishmentType) return false
    return true
  })
})

const fetchFacilities = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('/api/facilities')
    console.log('API Response:', response.data) // 디버깅용 로그
    if (response.data.success) {
      facilities.value = response.data.data || []
      console.log('Facilities:', facilities.value) // 디버깅용 로그
    } else {
      showError('시설 정보를 불러오는데 실패했습니다.')
      facilities.value = []
    }
  } catch (error) {
    console.error('API Error:', error) // 디버깅용 로그
    showError('시설 정보를 불러오는데 실패했습니다.')
    facilities.value = []
  } finally {
    isLoading.value = false
  }
}

const searchNearbyFacilities = async () => {
  try {
    isSearching.value = true
    const position = await getCurrentPosition()
    const { latitude, longitude } = position.coords
    const response = await axios.get(`/api/facilities/search?latitude=${latitude}&longitude=${longitude}&radius=5`)
    console.log('Search Response:', response.data) // 디버깅용 로그
    if (response.data.success) {
      facilities.value = response.data.data || []
      showSuccess(`현재 위치 기준 5km 반경의 시설을 검색했습니다. (총 ${facilities.value.length}개)`)
    } else {
      showError('주변 시설 검색에 실패했습니다.')
      facilities.value = []
    }
  } catch (error) {
    console.error('Search Error:', error) // 디버깅용 로그
    if (error.message === 'User denied Geolocation') {
      showError('위치 정보 접근이 거부되었습니다.')
    } else {
      showError('주변 시설 검색에 실패했습니다.')
    }
    facilities.value = []
  } finally {
    isSearching.value = false
  }
}

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const getTypeColor = (type) => {
  const colors = {
    '노인의료복지시설': 'blue',
    '재가노인복지시설': 'indigo',
    '노인여가복지시설': 'deep-purple',
    '노인주거복지시설': 'purple'
  }
  return colors[type] || 'grey'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const getNaverMapUrl = (facility) => {
  const query = encodeURIComponent(facility.name)
  const lat = facility.latitude
  const lng = facility.longitude
  return `https://map.naver.com/v5/search/${query}?c=${lng},${lat},15,0,0,0,dh`
}

const applyFilters = () => {
  // 필터 적용 시 페이지를 1페이지로 리셋
  if (itemsPerPage.value > 0) {
    const table = document.querySelector('.v-data-table')
    if (table) {
      table.__vueParentComponent.ctx.page = 1
    }
  }
}

const showSuccess = (text) => {
  snackbar.value = {
    show: true,
    text,
    color: 'success'
  }
}

const showError = (text) => {
  snackbar.value = {
    show: true,
    text,
    color: 'error'
  }
}

// 컴포넌트 마운트 시 시설 정보 로드
fetchFacilities()
</script>

<style scoped>
.v-data-table :deep(th) {
  font-weight: 600 !important;
  white-space: nowrap;
  background-color: rgb(var(--v-theme-surface)) !important;
}

.v-data-table :deep(td) {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

.facility-filter {
  width: calc(25% - 12px);
  margin-right: 16px;
  margin-bottom: 0;
}

.facility-filter:last-child {
  margin-right: 0;
}

@media (max-width: 1200px) {
  .facility-filter {
    width: calc(50% - 8px);
    margin-bottom: 16px;
  }
  .facility-filter:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 600px) {
  .facility-filter {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
  .facility-filter:last-child {
    margin-bottom: 0;
  }
}

.facility-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.facility-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}
</style> 