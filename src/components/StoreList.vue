<template>
  <v-card>
    <v-card-title class="text-h6 font-weight-medium pa-4 d-flex align-center bg-blue-lighten-5 border-b">
      <v-icon icon="mdi-store-marker" class="me-2" color="blue-darken-1"></v-icon>
      <span class="text-blue-darken-1 font-weight-bold">직매장 목록</span>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-select
          v-model="selectedRegion"
          :items="regions"
          label="지역 선택"
          single-line
          hide-details
          density="compact"
          class="region-select me-4"
          color="blue-darken-1"
          bg-color="white"
          rounded="0"
          variant="outlined"
          :menu-props="{ contentClass: 'region-select-menu' }"
          @update:model-value="handleSearch"
        ></v-select>
        <v-btn
          color="blue-darken-1"
          variant="tonal"
          :loading="isLoading"
          @click="refreshData"
          class="refresh-btn"
          rounded="0"
          elevation="0"
        >
          <v-icon start>mdi-refresh</v-icon>
          새로고침
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text class="pa-4">
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
            class="store-card h-100"
            :class="{ 'refresh-animation': isLoading }"
          >
            <v-card-item>
              <div class="d-flex align-center mb-2">
                <v-icon
                  color="primary"
                  class="me-2"
                  icon="mdi-store"
                ></v-icon>
                <div class="text-h6 font-weight-bold">{{ store.storeName }}</div>
              </div>
              <div class="text-subtitle-2 text-medium-emphasis mb-2">
                {{ store.nhName }}
              </div>
            </v-card-item>

            <v-card-text>
              <div class="d-flex align-center mb-2">
                <v-icon
                  size="small"
                  color="grey-darken-1"
                  class="me-2"
                >mdi-map-marker</v-icon>
                <span class="text-body-2">{{ store.address }}</span>
              </div>
              
              <div class="d-flex align-center mb-2">
                <v-icon
                  size="small"
                  color="grey-darken-1"
                  class="me-2"
                >mdi-phone</v-icon>
                <span class="text-body-2">{{ store.phoneNumber || '-' }}</span>
              </div>

              <div class="d-flex align-center mb-2">
                <v-icon
                  size="small"
                  color="grey-darken-1"
                  class="me-2"
                >mdi-calendar</v-icon>
                <span class="text-body-2">{{ formatDate(store.openDate) }}</span>
              </div>

              <v-chip
                size="small"
                color="primary"
                variant="tonal"
                class="me-2"
              >
                {{ store.region }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <div class="text-center pt-4">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :disabled="isLoading"
        ></v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { storeAPI } from '@/utils/api'

export default {
  name: 'StoreList',
  setup() {
    const stores = ref([])
    const isLoading = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const selectedRegion = ref('')
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

    const handleSearch = () => {
      currentPage.value = 1
      fetchStores()
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

    // 계산된 페이지별 직매장 목록
    const paginatedStores = computed(() => {
      const startIndex = (currentPage.value - 1) * 12
      const endIndex = startIndex + 12
      return stores.value.slice(startIndex, endIndex)
    })

    onMounted(async () => {
      selectedRegion.value = '전체'
      await fetchStores()
    })

    return {
      stores,
      isLoading,
      currentPage,
      totalPages,
      selectedRegion,
      regions,
      refreshData,
      formatDate,
      handleSearch,
      paginatedStores
    }
  }
}
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.store-card {
  transition: all 0.3s ease;
  border-radius: 0;
}

.store-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.region-select {
  max-width: 180px;
}

.region-select :deep(.v-field) {
  border-radius: 0;
  background-color: rgb(var(--v-theme-blue-lighten-5)) !important;
}

.region-select :deep(.v-field__input) {
  min-height: 36px !important;
  padding-top: 0;
  padding-bottom: 0;
}

.region-select :deep(.v-field__append-inner) {
  padding-top: 6px;
}

.region-select-menu {
  border-radius: 0 !important;
}

.refresh-btn {
  min-width: 110px;
  transition: all 0.3s ease;
  height: 36px;
}

.refresh-btn:hover {
  transform: scale(1.02);
  background-color: rgb(var(--v-theme-blue-darken-1));
  color: white;
}

.refresh-animation {
  opacity: 0.7;
  transform: scale(0.98);
}

@media (max-width: 600px) {
  .region-select {
    max-width: 140px;
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