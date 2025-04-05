<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style>
/* 기본 폰트 클래스 */
.font-heading {
  font-family: var(--font-heading) !important;
}

.font-body {
  font-family: var(--font-body) !important;
}

/* 기존 스타일 유지 */
.main-content {
  padding-bottom: 400px; /* 푸터 높이만큼 패딩 추가 */
}

@media (max-width: 600px) {
  .main-content {
    padding-bottom: 600px; /* 모바일에서는 더 큰 패딩 */
  }
}

/* 전역 제목 폰트 스타일 */
.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: var(--font-heading) !important;
}

/* 전역 본문 폰트 스타일 */
.text-body-1,
.text-body-2,
.text-subtitle-1,
.text-subtitle-2,
.v-btn,
.v-card-title,
.v-card-subtitle,
.v-card-text {
  font-family: var(--font-body) !important;
}

/* 기본 폰트 설정 */
:root {
  font-family: var(--font-body);
}

/* 제목 요소 폰트 설정 */
h1, h2, h3, h4, h5, h6,
.v-toolbar-title,
.v-card-title,
.v-list-item-title {
  font-family: var(--font-heading) !important;
}

/* 본문 요소 폰트 설정 */
p, span, div, a, button, input, textarea, select,
.v-card-text,
.v-list-item-subtitle,
.v-btn,
.v-chip {
  font-family: var(--font-body) !important;
}

/* Vuetify 클래스 폰트 설정 */
.text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6 {
  font-family: var(--font-heading) !important;
}

.text-body-1, .text-body-2,
.text-subtitle-1, .text-subtitle-2,
.text-caption, .text-overline {
  font-family: var(--font-body) !important;
}
</style> 