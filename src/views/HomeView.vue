<template>
  <v-container class="pa-0" fluid>
    <!-- 히어로 섹션 -->
    <v-parallax
      :src="mainImage"
      height="600"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white text-center">
        <h1 class="text-h2 font-weight-bold mb-4">{{ homeStore.villageInfo.title }}</h1>
        <h2 class="text-h4 mb-6">{{ homeStore.villageInfo.subtitle }}</h2>
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
            {{ homeStore.villageInfo.description }}
          </p>
          <v-list>
            <v-list-item
              v-for="detail in homeStore.villageInfo.details"
              :key="detail.text"
              :prepend-icon="detail.icon"
            >
              <v-list-item-title>{{ detail.text }}</v-list-item-title>
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
        <v-col v-for="(program, index) in homeStore.programs" :key="program.title" cols="12" md="4">
          <v-card>
            <v-img
              :src="programImages[index]"
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
        <v-col v-for="(news, index) in homeStore.newsItems" :key="news.title" cols="12" md="6" lg="4">
          <v-card>
            <v-img
              :src="newsImages[index]"
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
import { useHomeStore } from '@/stores/home'

const homeStore = useHomeStore()

// 이미지 경로 설정
const mainImage = new URL('@/assets/images/20250402_123303.jpg', import.meta.url).href
const villageImage = new URL('@/assets/images/20250402_124827.jpg', import.meta.url).href

const programImages = [
  new URL('@/assets/images/20250402_124722.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_124640.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_124511.jpg', import.meta.url).href
]

const newsImages = [
  new URL('@/assets/images/20250402_124026.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_123818.jpg', import.meta.url).href,
  new URL('@/assets/images/20250402_123538.jpg', import.meta.url).href
]
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