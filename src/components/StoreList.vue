<template>
  <v-card class="store-list-card">
    <v-card-title class="text-h6">
      직매장 목록
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-refresh"
        variant="text"
        :loading="isLoading"
        @click="refreshData"
      ></v-btn>
    </v-card-title>

    <!-- 검색 필터 -->
    <v-card-text>
      <v-row>
        <!-- 지역 검색 -->
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="selectedRegion"
            :items="regions"
            label="지역"
            variant="outlined"
            density="compact"
            clearable
            @update:model-value="onRegionChange"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="selectedDistrict"
            :items="districts"
            label="시/군/구"
            variant="outlined"
            density="compact"
            clearable
            :disabled="!selectedRegion"
          ></v-select>
        </v-col>
        <!-- 키워드 검색 -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchKeyword"
            label="검색어"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="searchByKeyword"
            @keyup.enter="searchByKeyword"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- 통계 정보 -->
      <v-row v-if="stats" class="mt-2">
        <v-col cols="12">
          <v-card variant="outlined">
            <v-card-text>
              <div class="d-flex flex-wrap gap-4">
                <div v-for="(count, region) in stats" :key="region" class="stat-item">
                  <div class="text-subtitle-1">{{ region }}</div>
                  <div class="text-h5">{{ count }}개</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 직매장 목록 -->
      <v-row class="mt-4">
        <v-col cols="12">
          <div v-if="isLoading" class="d-flex justify-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <div v-else-if="stores.length === 0" class="text-center">
            검색 결과가 없습니다.
          </div>
          <v-table v-else>
            <thead>
              <tr>
                <th>이름</th>
                <th>주소</th>
                <th>연락처</th>
                <th>운영시간</th>
                <th>상세</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="store in stores" :key="store.id">
                <td>{{ store.name }}</td>
                <td>{{ store.address }}</td>
                <td>{{ store.phone }}</td>
                <td>{{ store.hours }}</td>
                <td>
                  <v-btn
                    size="small"
                    variant="text"
                    color="primary"
                    @click="showStoreDetail(store.id)"
                  >
                    상세보기
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- 상세 정보 다이얼로그 -->
    <v-dialog v-model="showDialog" max-width="600">
      <v-card v-if="selectedStore">
        <v-card-title>
          {{ selectedStore.name }}
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="showDialog = false"></v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-title>주소</v-list-item-title>
              <v-list-item-subtitle>{{ selectedStore.address }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>연락처</v-list-item-title>
              <v-list-item-subtitle>{{ selectedStore.phone }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>운영시간</v-list-item-title>
              <v-list-item-subtitle>{{ selectedStore.hours }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>취급품목</v-list-item-title>
              <v-list-item-subtitle>{{ selectedStore.products }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>주차 정보</v-list-item-title>
              <v-list-item-subtitle>{{ selectedStore.parking }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeAPI, statsAPI } from '@/utils/api';

// 상태 관리
const isLoading = ref(false);
const stores = ref([]);
const selectedStore = ref(null);
const showDialog = ref(false);
const stats = ref(null);

// 검색 필터
const searchKeyword = ref('');
const selectedRegion = ref(null);
const selectedDistrict = ref(null);
const regions = ref(['서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종', '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주']);
const districts = ref([]);

// 데이터 조회 함수
const fetchStores = async () => {
  isLoading.value = true;
  try {
    const response = await storeAPI.getAllStores();
    stores.value = response.data;
  } catch (error) {
    console.error('직매장 목록 조회 중 오류:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchStoresByRegion = async () => {
  if (!selectedRegion.value) return;
  isLoading.value = true;
  try {
    const response = await storeAPI.getStoresByRegion(
      selectedRegion.value,
      selectedDistrict.value
    );
    stores.value = response.data;
  } catch (error) {
    console.error('지역별 직매장 검색 중 오류:', error);
  } finally {
    isLoading.value = false;
  }
};

const searchByKeyword = async () => {
  if (!searchKeyword.value.trim()) return;
  isLoading.value = true;
  try {
    const response = await storeAPI.searchStores(searchKeyword.value);
    stores.value = response.data;
  } catch (error) {
    console.error('직매장 검색 중 오류:', error);
  } finally {
    isLoading.value = false;
  }
};

const showStoreDetail = async (storeId) => {
  isLoading.value = true;
  try {
    const response = await storeAPI.getStoreById(storeId);
    selectedStore.value = response.data;
    showDialog.value = true;
  } catch (error) {
    console.error('직매장 상세 정보 조회 중 오류:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchRegionStats = async () => {
  try {
    const response = await statsAPI.getRegionStats();
    stats.value = response.data;
  } catch (error) {
    console.error('지역별 통계 조회 중 오류:', error);
  }
};

// 이벤트 핸들러
const onRegionChange = () => {
  selectedDistrict.value = null;
  if (selectedRegion.value) {
    // 실제로는 API에서 해당 지역의 시군구 목록을 가져와야 함
    districts.value = ['시군구 데이터 필요'];
  } else {
    districts.value = [];
  }
  fetchStoresByRegion();
};

const refreshData = () => {
  fetchStores();
  fetchRegionStats();
};

// 초기 데이터 로드
onMounted(() => {
  refreshData();
});
</script>

<style scoped>
.store-list-card {
  height: 100%;
}

.stat-item {
  text-align: center;
  min-width: 100px;
}

.gap-4 {
  gap: 1rem;
}
</style> 