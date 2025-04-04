<template>
  <v-container>
    <h1 class="text-h3 mb-6">지역별 정보</h1>

    <v-row>
      <v-col cols="12" md="4" v-for="region in regions" :key="region.name">
        <v-card>
          <v-img
            :src="region.image"
            height="200"
            cover
            class="align-end"
          >
            <v-card-title class="text-white">
              {{ region.name }}
            </v-card-title>
          </v-img>

          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6">
                <div class="text-subtitle-2">주요 작물</div>
                <div>{{ region.crops.join(', ') }}</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-2">평균 기온</div>
                <div>{{ region.temperature }}°C</div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            <div class="text-subtitle-2 mb-1">지원 정책</div>
            <v-chip
              v-for="policy in region.policies"
              :key="policy"
              class="mr-2 mb-2"
              size="small"
            >
              {{ policy }}
            </v-chip>
          </v-card-text>

          <v-card-actions>
            <v-btn variant="text" color="primary">
              자세히 보기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-heart-outline"></v-btn>
            <v-btn icon="mdi-share-variant"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const regions = ref([
  {
    name: '화순군 백운면',
    image: new URL('@/assets/images/20250402_122531.jpg', import.meta.url).href,
    crops: ['벼', '고추', '감자', '배추'],
    temperature: 13.5,
    policies: ['귀농인 정착지원금', '농가주택 수리비', '농기계 구입 지원']
  },
  {
    name: '화순군 능주면',
    image: new URL('@/assets/images/20250402_122208.jpg', import.meta.url).href,
    crops: ['딸기', '토마토', '오이'],
    temperature: 13.8,
    policies: ['시설하우스 지원', '농업창업 지원', '농지 임대 지원']
  },
  {
    name: '화순군 도곡면',
    image: new URL('@/assets/images/20250402_121846.jpg', import.meta.url).href,
    crops: ['블루베리', '복숭아', '포도'],
    temperature: 13.2,
    policies: ['과수원 조성 지원', '저온저장고 지원', '농산물 가공시설 지원']
  }
])
</script> 