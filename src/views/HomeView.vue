<template>
  <v-container class="pa-0" fluid>
    <!-- 히어로 섹션 -->
    <v-parallax
      :src="mainImage"
      height="600"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white text-center">
        <h1 class="text-h2 font-weight-bold mb-4">화순군 백운마을</h1>
        <h2 class="text-h4 mb-6">귀농의 꿈을 실현하는 첫걸음</h2>
        <v-btn
          color="primary"
          size="x-large"
          to="/prepare"
        >
          체험 프로그램 알아보기
        </v-btn>
      </div>
    </v-parallax>

    <!-- 마을 소개 섹션 -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-6">백운마을 소개</h2>
          <p class="text-body-1 mb-4">
            전라남도 화순군에 위치한 백운마을은 청정한 자연환경과 풍부한 농업 자원을 보유한 전통 마을입니다.
            사계절 아름다운 경관과 함께 다양한 작물 재배가 가능하며, 귀농을 꿈꾸는 도시민들에게 
            실제 농촌 생활을 체험할 수 있는 기회를 제공합니다.
          </p>
          <v-list>
            <v-list-item prepend-icon="mdi-map-marker">
              <v-list-item-title>위치: 전라남도 화순군 백운면</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-thermometer">
              <v-list-item-title>연평균 기온: 13.5°C</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-sprout">
              <v-list-item-title>주요 작물: 벼, 고추, 감자, 배추</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="villageImage"
            height="400"
            cover
            class="rounded-lg"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!-- 체험 프로그램 섹션 -->
    <v-container class="py-12 bg-grey-lighten-4">
      <h2 class="text-h4 text-center mb-6">체험 프로그램</h2>
      <v-row>
        <v-col v-for="program in programs" :key="program.title" cols="12" md="4">
          <v-card>
            <v-img
              :src="program.image"
              height="200"
              cover
            ></v-img>
            <v-card-title>{{ program.title }}</v-card-title>
            <v-card-text>
              <p>{{ program.description }}</p>
              <v-chip-group class="mt-3">
                <v-chip
                  v-for="tag in program.tags"
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
                variant="text"
                color="primary"
                to="/contact"
              >
                신청하기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 마을 소식 섹션 -->
    <v-container class="py-12">
      <h2 class="text-h4 text-center mb-6">마을 소식</h2>
      <v-row>
        <v-col v-for="news in newsItems" :key="news.title" cols="12" md="6" lg="4">
          <v-card>
            <v-img
              :src="news.image"
              height="200"
              cover
            ></v-img>
            <v-card-title>{{ news.title }}</v-card-title>
            <v-card-subtitle>{{ news.date }}</v-card-subtitle>
            <v-card-text>{{ news.description }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                color="primary"
              >
                자세히 보기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// 이미지 경로 설정
const mainImage = new URL('@/assets/images/20250402_123303.jpg', import.meta.url).href
const villageImage = new URL('@/assets/images/20250402_124827.jpg', import.meta.url).href
const program1Image = new URL('@/assets/images/20250402_124722.jpg', import.meta.url).href
const program2Image = new URL('@/assets/images/20250402_124640.jpg', import.meta.url).href
const program3Image = new URL('@/assets/images/20250402_124511.jpg', import.meta.url).href
const news1Image = new URL('@/assets/images/20250402_124026.jpg', import.meta.url).href
const news2Image = new URL('@/assets/images/20250402_123818.jpg', import.meta.url).href
const news3Image = new URL('@/assets/images/20250402_123538.jpg', import.meta.url).href

const programs = ref([
  {
    title: '1일 농사 체험',
    description: '하루 동안 실제 농사일을 체험해보며 귀농 생활을 미리 경험해볼 수 있습니다.',
    image: program1Image,
    tags: ['일일체험', '농사체험', '초보자환영']
  },
  {
    title: '주말 귀농 학교',
    description: '주말을 이용해 2박 3일 동안 농촌 생활을 배우고 체험하는 프로그램입니다.',
    image: program2Image,
    tags: ['주말프로그램', '숙박포함', '교육형']
  },
  {
    title: '장기 체류 프로그램',
    description: '1개월 이상 장기 체류하며 실제 귀농을 준비하는 심화 프로그램입니다.',
    image: program3Image,
    tags: ['장기체류', '심화과정', '귀농준비']
  }
])

const newsItems = ref([
  {
    title: '2024년 상반기 귀농 체험 프로그램 모집',
    date: '2024.01.15',
    description: '올해 상반기 귀농 체험 프로그램 참가자를 모집합니다. 다양한 프로그램이 준비되어 있으니 많은 관심 바랍니다.',
    image: news1Image
  },
  {
    title: '백운마을 특산물 품평회 개최',
    date: '2024.01.10',
    description: '지난 주말 개최된 백운마을 특산물 품평회에서 우수한 품질의 농산물이 선보였습니다.',
    image: news2Image
  },
  {
    title: '스마트팜 교육장 개설',
    date: '2024.01.05',
    description: '최신 농업 기술을 배울 수 있는 스마트팜 교육장이 백운마을에 새롭게 개설되었습니다.',
    image: news3Image
  }
])
</script>

<style scoped>
.v-parallax {
  position: relative;
}

.v-parallax::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style> 