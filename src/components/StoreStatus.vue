<template>
  <v-card class="store-status">
    <v-card-title class="text-h6">
      직매장 현황
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
        <v-col cols="12" md="6">
          <v-card variant="outlined">
            <v-card-title class="text-subtitle-1">전체 직매장</v-card-title>
            <v-card-text class="text-h4 text-center">
              {{ totalStores }}
              <span class="text-subtitle-1">개소</span>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-card variant="outlined">
            <v-card-title class="text-subtitle-1">지역별 현황</v-card-title>
            <v-card-text>
              <v-list lines="one" density="compact">
                <v-list-item
                  v-for="(count, region) in regionStats"
                  :key="region"
                  :title="region"
                  :subtitle="count + '개소'"
                ></v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <v-text-field
            v-model="searchKeyword"
            label="직매장 검색"
            append-inner-icon="mdi-magnify"
            @click:append-inner="searchStores"
            @keyup.enter="searchStores"
            hide-details
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="searchResults.length > 0" class="mt-4">
        <v-col cols="12">
          <v-list lines="two">
            <v-list-item
              v-for="store in searchResults"
              :key="store.id"
              :title="store.name"
              :subtitle="store.address"
            >
              <template v-slot:append>
                <v-btn
                  variant="text"
                  color="primary"
                  :to="'/stores/' + store.id"
                >
                  상세보기
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeAPI, statsAPI } from '@/utils/api';

// 상태 변수들
const loading = ref(false);
const totalStores = ref(0);
const regionStats = ref({});
const searchKeyword = ref('');
const searchResults = ref([]);

// 데이터 새로고침
const refreshData = async () => {
  try {
    loading.value = true;
    
    // 전체 직매장 수 조회
    const storesResponse = await storeAPI.getAllStores();
    totalStores.value = storesResponse.data.length;
    
    // 지역별 통계 조회
    const statsResponse = await statsAPI.getRegionStats();
    regionStats.value = statsResponse.data;
  } catch (error) {
    console.error('직매장 데이터 조회 중 오류:', error);
  } finally {
    loading.value = false;
  }
};

// 직매장 검색
const searchStores = async () => {
  if (!searchKeyword.value.trim()) {
    searchResults.value = [];
    return;
  }

  try {
    loading.value = true;
    const response = await storeAPI.searchStores(searchKeyword.value);
    searchResults.value = response.data;
  } catch (error) {
    console.error('직매장 검색 중 오류:', error);
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  refreshData();
});
</script>

<style scoped>
.store-status {
  height: 100%;
}
</style> 