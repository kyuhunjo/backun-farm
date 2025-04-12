<template>
  <div>
    <div class="d-flex flex-column mb-6">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <h2 class="text-h5 font-weight-bold mb-0">화순군 요양시설</h2>
          <v-chip
            v-if="facilities.length > 0"
            color="primary"
            variant="flat"
            size="small"
            class="font-weight-medium ms-2"
          >
            총 {{ facilities.length }}개소
          </v-chip>
        </div>
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
      <p class="text-subtitle-1 text-medium-emphasis mb-0">
        화순군 요양시설 정보를 조회할 수 있습니다.
      </p>
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
        v-for="facility in paginatedFacilities"
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
            <v-card-text class="pt-3 d-flex justify-end">
              <v-chip
                size="small"
                :color="getServiceTypeColor(facility.serviceType)"
                variant="tonal"
                class="me-2"
              >
                {{ facility.serviceType }}
              </v-chip>
              <v-chip
                :color="getTypeColor(facility.type)"
                variant="tonal"
                size="small"
              >
                {{ facility.type }}
              </v-chip>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
    <div class="text-center pt-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :disabled="isLoading"
        show-first
        show-last
        :total-visible="$vuetify.display.xs ? 5 : 7"
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
import { facilitiesAPI } from '@/utils/api'

const facilities = ref([])
const isLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 12
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

const totalPages = computed(() => {
  return Math.ceil(filteredFacilities.value.length / itemsPerPage)
})

const paginatedFacilities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredFacilities.value.slice(start, end)
})

const fetchFacilities = async () => {
  try {
    isLoading.value = true
    const response = await facilitiesAPI.getAllFacilities()
    if (response.success) {
      facilities.value = response.data || []
    } else {
      showError('시설 정보를 불러오는데 실패했습니다.')
      facilities.value = []
    }
  } catch (error) {
    console.error('API Error:', error)
    showError('시설 정보를 불러오는데 실패했습니다.')
    facilities.value = []
  } finally {
    isLoading.value = false
  }
}

const getTypeColor = (type) => {
  const colors = {
    '노인의료복지시설': 'indigo-darken-1',
    '재가노인복지시설': 'deep-purple-darken-1',
    '노인여가복지시설': 'purple-darken-1',
    '노인주거복지시설': 'blue-darken-1'
  }
  return colors[type] || 'grey'
}

const getServiceTypeColor = (serviceType) => {
  const colors = {
    '방문요양': 'teal-darken-1',
    '주야간보호': 'cyan-darken-2',
    '단기보호': 'light-blue-darken-2',
    '방문목욕': 'blue-grey-darken-1',
    '방문간호': 'green-darken-1'
  }
  return colors[serviceType] || 'grey'
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
  currentPage.value = 1
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