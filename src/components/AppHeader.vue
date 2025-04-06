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
          <v-menu
            open-on-hover
            :close-delay="100"
            :open-delay="0"
            transition="slide-y-transition"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="px-3"
                color="grey-darken-3"
                height="40"
                rounded="0"
              >
                마을소개
                <v-icon end size="small" class="ms-1">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card elevation="3" rounded="0" min-width="200" class="mt-1">
              <v-list nav density="comfortable">
                <v-list-item to="/village/history" rounded="0" class="mb-1">
                  <template #prepend>
                    <v-icon size="small" color="primary" class="me-2">mdi-history</v-icon>
                  </template>
                  <v-list-item-title>마을 역사</v-list-item-title>
                </v-list-item>
                <v-list-item to="/village/location" rounded="0" class="mb-1">
                  <template #prepend>
                    <v-icon size="small" color="primary" class="me-2">mdi-map-marker</v-icon>
                  </template>
                  <v-list-item-title>찾아오시는 길</v-list-item-title>
                </v-list-item>
                <v-list-item to="/village/specialties" rounded="0">
                  <template #prepend>
                    <v-icon size="small" color="primary" class="me-2">mdi-store</v-icon>
                  </template>
                  <v-list-item-title>특산물</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-menu
            open-on-hover
            :close-delay="100"
            :open-delay="0"
            transition="slide-y-transition"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="px-3"
                color="grey-darken-3"
                height="40"
                rounded="0"
              >
                농사 방법
                <v-icon end size="small" class="ms-1">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-card elevation="3" rounded="0" min-width="200" class="mt-1">
              <v-list nav density="comfortable">
                <v-list-item to="/farming/fern" rounded="0" class="mb-1">
                  <template #prepend>
                    <v-icon size="small" color="primary" class="me-2">mdi-sprout</v-icon>
                  </template>
                  <v-list-item-title>고사리 농사</v-list-item-title>
                </v-list-item>
                <v-list-item to="/farming/deodeok" rounded="0" class="mb-1">
                  <template #prepend>
                    <v-icon size="small" color="primary" class="me-2">mdi-flower</v-icon>
                  </template>
                  <v-list-item-title>더덕 농사</v-list-item-title>
                </v-list-item>
                <v-list-item to="/farming/persimmon" rounded="0">
                  <template #prepend>
                    <v-icon size="small" color="primary" class="me-2">mdi-fruit-cherries</v-icon>
                  </template>
                  <v-list-item-title>곶감 가공</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-btn
            to="/stores"
            variant="text"
            class="px-3"
            color="grey-darken-3"
            height="40"
            rounded="0"
          >
            로컬푸드 직판매 정보
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
    >
      <div class="d-flex align-center mb-6">
        <span class="text-h6 font-weight-bold">백운마을</span>
      </div>

      <v-list nav>
        <v-list-item to="/" class="mb-2" rounded="0">
          <template #prepend>
            <v-icon color="primary" class="me-2">mdi-home</v-icon>
          </template>
          <v-list-item-title class="font-body">홈</v-list-item-title>
        </v-list-item>

        <v-list-group
          v-model="villageMenuOpen"
          class="mb-2"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              rounded="0"
            >
              <template #prepend>
                <v-icon color="primary" class="me-2">mdi-home-city</v-icon>
              </template>
              <v-list-item-title class="font-body">마을 소개</v-list-item-title>
            </v-list-item>
          </template>
          
          <v-list-item
            v-for="(item, index) in villageMenuItems"
            :key="index"
            :to="item.to"
            :title="item.title"
            class="ms-4"
            rounded="0"
          >
            <template #prepend>
              <v-icon size="small" color="grey" class="me-2">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </v-list-group>

        <v-list-group
          v-model="farmingMenuOpen"
          class="mb-2"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              rounded="0"
            >
              <template #prepend>
                <v-icon color="primary" class="me-2">mdi-sprout</v-icon>
              </template>
              <v-list-item-title class="font-body">농사 방법</v-list-item-title>
            </v-list-item>
          </template>
          
          <v-list-item
            v-for="(item, index) in farmingMenuItems"
            :key="index"
            :to="item.to"
            :title="item.title"
            class="ms-4"
            rounded="0"
          >
            <template #prepend>
              <v-icon size="small" color="grey" class="me-2">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
        </v-list-group>

        <v-list-item to="/stores" class="mb-2" rounded="0">
          <template #prepend>
            <v-icon color="primary" class="me-2">mdi-store-marker</v-icon>
          </template>
          <v-list-item-title class="font-body">로컬푸드 직판매 정보</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const drawer = ref(false)
const villageMenuOpen = ref(false)
const farmingMenuOpen = ref(false)

const villageMenuItems = [
  { title: '마을 역사', to: '/village/history' },
  { title: '찾아오시는 길', to: '/village/location' },
  { title: '특산물', to: '/village/specialties' }
]

const farmingMenuItems = [
  { title: '고사리 농사', to: '/farming/fern' },
  { title: '더덕 농사', to: '/farming/deodeok' },
  { title: '곶감 가공', to: '/farming/persimmon' }
]

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
</style> 