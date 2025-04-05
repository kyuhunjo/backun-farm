<template>
  <v-app>
    <div class="background-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="background-overlay"></div>
    </div>
    <AppHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { onErrorCaptured } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import backgroundImage from '@/assets/images/20250402_124827.jpg'

// 전역 에러 핸들러
onErrorCaptured((err, instance, info) => {
  console.error('에러가 발생했습니다:', err)
  console.info('에러 발생 컴포넌트:', instance)
  console.info('에러 정보:', info)
  return false // 에러가 상위로 전파되는 것을 방지
})
</script>

<style>
/* 기본 폰트 설정 */
:root {
  font-family: var(--font-body);
}

/* 제목 요소 폰트 설정 */
h1, h2, h3, h4, h5, h6,
.text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6,
.v-toolbar-title,
.v-card-title,
.v-list-item-title {
  font-family: var(--font-heading) !important;
}

/* 본문 요소 폰트 설정 */
p, span, div, a, button, input, textarea, select,
.text-body-1, .text-body-2,
.text-subtitle-1, .text-subtitle-2,
.text-caption, .text-overline,
.v-card-text,
.v-list-item-subtitle,
.v-btn,
.v-chip {
  font-family: var(--font-body) !important;
}

/* 메인 컨텐츠 영역 */
.main-content {
  padding-bottom: 400px;
}

@media (max-width: 600px) {
  .main-content {
    padding-bottom: 600px;
  }
}

/* 배경 설정 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}

.v-main {
  background-color: transparent !important;
}
</style> 