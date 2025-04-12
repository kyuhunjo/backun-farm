<template>
  <div>
    <div class="d-flex flex-column mb-6">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <h2 class="text-h5 font-weight-bold mb-0">로컬푸드 직매장</h2>
          <v-chip
            v-if="stores.length > 0"
            color="primary"
            variant="flat"
            size="small"
            class="font-weight-medium ms-2"
          >
            총 {{ stores.length }}개소
          </v-chip>
        </div>
        <v-btn
          prepend-icon="mdi-refresh"
          color="grey"
          variant="tonal"
          :loading="isLoading"
          @click="refreshData"
        >
          새로고침
        </v-btn>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis mb-0">
        전국 로컬푸드 직매장 정보를 조회할 수 있습니다.
      </p>
    </div>

    <div class="mb-6">
      <v-chip-group
        v-model="selectedRegion"
        selected-class="bg-primary"
        class="region-chips"
        mandatory
        :show-arrows="false"
      >
        <v-chip
          v-for="region in regions"
          :key="region"
          filter
          variant="tonal"
          :value="region"
          class="region-chip"
        >
          {{ region }}
        </v-chip>
      </v-chip-group>
    </div>

    <v-row>
      <v-col
        v-for="store in paginatedStores"
        :key="store.number"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          variant="outlined"
          class="store-card h-100 d-flex flex-column"
          :class="{ 'refresh-animation': isLoading }"
          :href="getNaverMapUrl(store)"
          target="_blank"
        >
          <div class="flex-grow-1">
            <v-card-item>
              <div class="d-flex align-center mb-2">
                <v-icon
                  color="primary"
                  icon="mdi-store"
                  class="me-2"
                ></v-icon>
                <div class="text-h6 font-weight-bold">{{ store.storeName }}</div>
              </div>
              <div class="text-subtitle-2 text-medium-emphasis mb-2">
                {{ store.nhName }}
              </div>
            </v-card-item>

            <v-card-text>
              <div class="d-flex flex-column">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-map-marker</v-icon>
                  <span class="text-body-2">{{ store.address }}</span>
                </div>
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-phone</v-icon>
                  <span class="text-body-2">{{ store.phoneNumber || '-' }}</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ formatDate(store.openDate) }}</span>
                </div>
              </div>
            </v-card-text>
          </div>

          <div class="mt-auto">
            <v-divider></v-divider>
            <v-card-text class="pt-3 d-flex justify-end">
              <v-chip
                size="small"
                color="primary"
                variant="tonal"
              >
                {{ store.region }}
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
        :total-visible="$vuetify.display.xs ? 3 : $vuetify.display.sm ? 5 : 7"
        density="compact"
        class="pagination-custom"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeAPI } from '@/utils/api'

const stores = ref([])
const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const selectedRegion = ref('전체')
const regions = ref([])

const fetchStores = async () => {
  isLoading.value = true
  try {
    const { data } = await storeAPI.getStoresByRegion(
      selectedRegion.value === '전체' ? '' : selectedRegion.value,
      null
    )
    if (data && Array.isArray(data)) {
      stores.value = data
      totalPages.value = Math.ceil(data.length / 12) // 한 페이지당 12개 항목
      
      // 모든 직매장에서 고유한 지역명 추출
      if (!selectedRegion.value || selectedRegion.value === '전체') {
        const uniqueRegions = [...new Set(data.map(store => store.region))]
        regions.value = ['전체', ...uniqueRegions.filter(region => region).sort()]
      }
    } else {
      stores.value = []
      totalPages.value = 1
    }
  } catch (error) {
    console.error('직매장 목록 조회 중 오류:', error)
    stores.value = []
    totalPages.value = 1
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const refreshData = () => {
  selectedRegion.value = '전체'
  currentPage.value = 1
  fetchStores()
}

// 페이지 변경 감지
watch(currentPage, () => {
  fetchStores()
})

// 지역 선택 변경 감지
watch(selectedRegion, () => {
  currentPage.value = 1
  fetchStores()
})

// 계산된 페이지별 직매장 목록
const paginatedStores = computed(() => {
  const startIndex = (currentPage.value - 1) * 12
  const endIndex = startIndex + 12
  return stores.value.slice(startIndex, endIndex)
})

const getNaverMapUrl = (store) => {
  const query = encodeURIComponent(`${store.storeName} ${store.address}`)
  return `https://map.naver.com/v5/search/${query}?c=15,0,0,0,dh`
}

onMounted(async () => {
  await fetchStores()
})
</script>

<style scoped>
.store-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.store-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.refresh-animation {
  opacity: 0.7;
  transform: scale(0.98);
}

.region-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
}

.region-chip {
  font-weight: 500;
  letter-spacing: 0.0125em;
  margin: 4px !important;
}

:deep(.v-chip-group) {
  width: 100% !important;
}

:deep(.v-chip-group__content) {
  width: 100% !important;
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
  min-width: 0 !important;
}

:deep(.v-chip-group .v-chip) {
  margin: 4px !important;
  flex: 0 1 auto !important;
}

:deep(.v-chip-group .v-slide-group__container) {
  overflow: visible !important;
}

:deep(.v-slide-group__content) {
  flex-wrap: wrap !important;
  width: 100% !important;
  display: flex !important;
  justify-content: flex-end !important;
}

.pagination-custom :deep(.v-pagination__item) {
  min-width: 34px;
  padding: 0 6px;
  font-size: 14px;
}

.pagination-custom :deep(.v-pagination__navigation) {
  min-width: 34px;
}
</style> 