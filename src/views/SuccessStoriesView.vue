<template>
  <v-container>
    <h1 class="text-h3 mb-6">성공 스토리</h1>

    <v-row>
      <v-col cols="12" v-for="story in stories" :key="story.id">
        <v-card>
          <v-row>
            <v-col cols="12" md="4">
              <v-img
                :src="story.image"
                height="300"
                cover
              ></v-img>
            </v-col>
            <v-col cols="12" md="8">
              <v-card-item>
                <v-card-title class="text-h5">{{ story.title }}</v-card-title>
                <v-card-subtitle>
                  {{ story.location }} | {{ story.year }}년 귀농
                </v-card-subtitle>
                <v-card-text>
                  <p class="text-body-1">{{ story.summary }}</p>
                  <v-chip-group class="mt-4">
                    <v-chip
                      v-for="tag in story.tags"
                      :key="tag"
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    variant="text"
                    @click="story.expanded = !story.expanded"
                  >
                    자세히 보기
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :icon="story.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="story.expanded = !story.expanded"
                  ></v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="story.expanded">
                    <v-divider></v-divider>
                    <v-card-text>
                      <h3 class="text-h6 mb-2">주요 성공 요인</h3>
                      <ul>
                        <li v-for="(factor, i) in story.successFactors" :key="i">
                          {{ factor }}
                        </li>
                      </ul>
                      <h3 class="text-h6 mb-2 mt-4">조언</h3>
                      <p>{{ story.advice }}</p>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const stories = ref([
  {
    id: 1,
    title: '도시 직장인에서 백운마을 대표 농부로',
    location: '화순군 백운면',
    year: 2020,
    image: new URL('@/assets/images/20250402_121507.jpg', import.meta.url).href,
    summary: '15년간의 회사 생활을 뒤로하고 백운마을에서 새로운 삶을 시작한 이영호 씨의 이야기입니다. 마을 체험 프로그램을 통해 귀농을 준비하고, 현재는 연 매출 1억원의 농가로 성장했습니다.',
    tags: ['벼농사', '귀농체험', '청년농부'],
    expanded: false,
    successFactors: [
      '백운마을 체험 프로그램 전 과정 이수',
      '선도 농가와의 지속적인 교류',
      '단계별 영농 규모 확대',
      '지역 농산물 직거래 장터 참여'
    ],
    advice: '백운마을 체험 프로그램은 실제 농촌 생활을 경험할 수 있는 좋은 기회입니다. 이론보다는 실전 경험을 쌓는 것이 중요합니다.'
  },
  {
    id: 2,
    title: '백운마을에서 찾은 새로운 인생',
    location: '화순군 백운면',
    year: 2021,
    image: new URL('@/assets/images/20250402_121353.jpg', import.meta.url).href,
    summary: '퇴직 후 아내와 함께 백운마을에서 제2의 인생을 시작한 박성민 씨. 주말 귀농 학교를 통해 준비하여 현재는 고추와 감자 농사로 안정적인 수입을 올리고 있습니다.',
    tags: ['고추농사', '감자농사', '부부귀농'],
    expanded: false,
    successFactors: [
      '주말 귀농 학교를 통한 체계적 준비',
      '부부가 함께하는 농사',
      '마을 공동체 활동 적극 참여',
      '로컬 푸드 직매장 입점'
    ],
    advice: '부부가 함께 귀농을 결심하고 준비하는 것이 성공의 큰 요인이었습니다. 마을 주민들과의 교류도 매우 중요합니다.'
  }
])
</script> 