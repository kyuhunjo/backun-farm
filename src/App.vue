<template>
  <v-app>
    <div class="background-container" :style="backgroundStyle">
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
import { onErrorCaptured, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${new URL('./assets/images/20250402_124827.jpg', import.meta.url).href})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}))

// 전역 에러 핸들러
onErrorCaptured((err, instance, info) => {
  console.error('에러가 발생했습니다:', err)
  console.info('에러 발생 컴포넌트:', instance)
  console.info('에러 정보:', info)
  return false
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

/* 모든 요소의 라운드 처리 제거 */
.v-btn,
.v-card,
.v-list-item,
.v-menu .v-overlay__content,
.v-text-field,
.v-select,
.v-textarea,
.v-chip,
.v-alert,
.v-banner,
.v-sheet,
.v-dialog .v-card,
.v-expansion-panel,
.v-expansion-panel-title,
.v-pagination__item,
.v-data-table,
.v-data-table-header,
.v-data-table__wrapper,
.v-table,
.v-list,
.v-list-group,
.v-navigation-drawer,
.v-tabs,
.v-tab,
.v-toolbar,
.v-toolbar__content,
.v-footer {
  border-radius: 0 !important;
}

/* 입력 필드 라운드 처리 제거 */
.v-field__outline__start,
.v-field__outline__end {
  border-radius: 0 !important;
}

/* 배경 설정 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(2px);
  z-index: 1;
}

.v-main {
  background-color: transparent !important;
  position: relative;
  z-index: 2;
}

.v-card {
  background-color: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
  position: relative;
  z-index: 2;
}

.v-app-bar {
  z-index: 3;
}
</style> 