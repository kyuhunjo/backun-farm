<template>
  <div>
    <v-app-bar
      color="white"
      app
      elevation="1"
      rounded="0"
      height="64"
    >
      <v-container class="d-flex align-center px-4">
        <router-link to="/" class="text-decoration-none d-flex align-center">
          <span class="site-title text-primary">백운마을</span>
        </router-link>

        <v-spacer></v-spacer>

        <!-- Desktop Navigation -->
        <div class="d-none d-md-flex align-center gap-2">
          <v-btn
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.to"
            variant="text"
            class="px-3"
            color="grey-darken-3"
            height="40"
            rounded="0"
          >
            {{ item.title }}
          </v-btn>
          <v-btn
            variant="tonal"
            color="primary"
            class="px-3"
            height="40"
            rounded="0"
            prepend-icon="mdi-download"
            @click="handleDownload"
          >
            {{ downloadMenu.title }}
          </v-btn>
        </div>

        <v-btn
          icon
          @click.stop="drawer = !drawer"
          class="d-md-none"
          variant="text"
          rounded="0"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      :transition="'fade'"
      class="pa-4"
      width="280"
    >
      <v-list nav class="side-menu">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
          class="mb-1"
          rounded="0"
        >
          <template #prepend>
            <v-icon size="20" color="grey-darken-1">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-item
          class="mb-1"
          rounded="0"
          @click="handleDownload"
        >
          <v-list-item-title>
            <div class="d-flex align-center" style="width: 100%">
              <v-icon size="20" color="primary" class="me-2">{{ downloadMenu.icon }}</v-icon>
              <span class="text-primary">{{ downloadMenu.title }}</span>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MAIN_MENU, DOWNLOAD_MENU } from '@/constants/menu'

const drawer = ref(false)
const menuItems = MAIN_MENU
const downloadMenu = DOWNLOAD_MENU

const handleDownload = async () => {
  try {
    const response = await fetch('/app-debug.apk')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(
      new Blob([blob], { type: 'application/vnd.android.package-archive' })
    )
    
    if (/Android/i.test(navigator.userAgent)) {
      // 안드로이드에서는 직접 열기
      window.location.href = url
    } else {
      // 다른 환경에서는 다운로드
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'farm-helper.apk')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    
    // Blob URL 정리
    setTimeout(() => {
      window.URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error('앱 다운로드 중 오류가 발생했습니다:', error)
  }
}

// 화면 크기 변경 감지 함수
const handleResize = () => {
  if (window.innerWidth >= 768) { // md 브레이크포인트
    drawer.value = false
  }
}

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.site-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), #1976D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.v-list-item {
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.v-list-item--active {
  background-color: rgba(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
}

.v-list-item--active:hover {
  background-color: rgba(var(--v-theme-primary), 0.15) !important;
}

@media (max-width: 600px) {
  .site-title {
    font-size: 1.2rem;
  }
}

/* 드롭다운 메뉴 스타일 */
.v-menu > .v-overlay__content {
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.v-list-item-title {
  font-size: 0.95rem !important;
}

.gap-2 {
  gap: 0.5rem;
}

.v-list-group__items {
  margin-right: 0;
  padding: 0;
}

.v-list-group__items .v-list-item {
  padding-inline: 0;
}

.v-list-group .v-list-group__items .v-list-item__content {
  padding: 0;
}

.v-list-group .v-list-item__content {
  padding: 0;
}

.v-list-item {
  padding: 0;
}

.v-navigation-drawer .v-list {
  padding-right: 0;
}

:deep(.v-list-item__prepend) {
  margin-right: 4px !important;
  padding-right: 0 !important;
  min-width: 24px !important;
  max-width: 24px !important;
}

:deep(.v-list-item__append) {
  margin-left: 4px !important;
}

:deep(.v-list-item__content) {
  padding-left: 0 !important;
}

:deep(.v-list-item) {
  min-height: 32px !important;
  padding: 0 !important;
}

:deep(.v-list-item__spacer) {
  width: 0 !important;
}

:deep(.v-list-group__items) {
  padding-left: 24px !important;
}

.side-menu {
  --list-item-height: 36px;
}

.side-menu :deep(.v-list-item) {
  min-height: var(--list-item-height) !important;
  padding: 0 !important;
  opacity: 0.85;
}

.side-menu :deep(.v-list-item--active) {
  opacity: 1;
  background: transparent !important;
  color: rgb(var(--v-theme-primary)) !important;
}

.side-menu :deep(.v-list-item--active) .v-icon {
  color: rgb(var(--v-theme-primary)) !important;
}

.side-menu :deep(.v-list-item:hover) {
  opacity: 1;
  background: rgba(var(--v-theme-primary), 0.04) !important;
}

.side-menu :deep(.v-list-group__items) {
  padding-left: 28px !important;
  margin-top: 2px;
  margin-bottom: 2px;
}

.side-menu :deep(.v-list-item__prepend) {
  margin-right: 8px !important;
}

.side-menu :deep(.v-list-item__content) {
  font-size: 0.95rem;
  letter-spacing: -0.3px;
  padding: 0 !important;
}

.side-menu :deep(.text-subtitle-2) {
  font-size: 0.9rem !important;
  opacity: 0.9;
}

.side-menu :deep(.v-list-group__items .v-list-item) {
  min-height: 32px !important;
}
</style> 