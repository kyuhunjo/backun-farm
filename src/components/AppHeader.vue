<template>
  <div>
    <v-app-bar
      color="primary"
      app
      elevation="1"
      rounded="0"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" :color="$vuetify.theme.current.dark ? 'white' : 'on-primary'" rounded="0"></v-app-bar-nav-icon>
      
      <v-app-bar-title class="site-title">
        <router-link to="/" class="text-decoration-none" :class="$vuetify.theme.current.dark ? 'text-white' : 'text-on-primary'">
          백운마을
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-sm-flex align-center">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text class="font-body">
              마을소개
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/village/history" class="font-body">
              <v-list-item-title>마을 역사</v-list-item-title>
            </v-list-item>
            <v-list-item to="/village/location" class="font-body">
              <v-list-item-title>찾아오시는 길</v-list-item-title>
            </v-list-item>
            <v-list-item to="/village/specialties" class="font-body">
              <v-list-item-title>특산물</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text class="font-body">
              귀농체험
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/farming/programs" class="font-body">
              <v-list-item-title>체험 프로그램</v-list-item-title>
            </v-list-item>
            <v-list-item to="/farming/prepare" class="font-body">
              <v-list-item-title>귀농 준비하기</v-list-item-title>
            </v-list-item>
            <v-list-item to="/farming/success-stories" class="font-body">
              <v-list-item-title>성공 사례</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn to="/community" text class="font-body">커뮤니티</v-btn>
        <v-btn to="/contact" text class="font-body">문의하기</v-btn>
      </div>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          prepend-avatar="/village-logo.png"
          :title="'백운마을'"
          :subtitle="'화순군 백운면'"
        ></v-list-item>
        
        <v-divider class="my-2"></v-divider>

        <v-list-group
          v-model="villageMenuOpen"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="마을소개"
              class="font-body"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in villageMenuItems"
            :key="i"
            :to="item.to"
            :title="item.title"
            class="font-body pl-4"
          ></v-list-item>
        </v-list-group>

        <v-list-group
          v-model="farmingMenuOpen"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="귀농체험"
              class="font-body"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in farmingMenuItems"
            :key="i"
            :to="item.to"
            :title="item.title"
            class="font-body pl-4"
          ></v-list-item>
        </v-list-group>

        <v-list-item to="/community" title="커뮤니티" class="font-body"></v-list-item>
        <v-list-item to="/contact" title="문의하기" class="font-body"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const villageMenuOpen = ref(false)
const farmingMenuOpen = ref(false)

const villageMenuItems = [
  { title: '마을 역사', to: '/village/history' },
  { title: '찾아오시는 길', to: '/village/location' },
  { title: '특산물', to: '/village/specialties' }
]

const farmingMenuItems = [
  { title: '체험 프로그램', to: '/farming/programs' },
  { title: '귀농 준비하기', to: '/farming/prepare' },
  { title: '성공 사례', to: '/farming/success-stories' }
]
</script>

<style scoped>
/* 제목 폰트 스타일 */
.v-toolbar-title,
.text-h6 {
  font-family: var(--font-heading) !important;
}

/* 본문 폰트 스타일 */
.v-btn,
.v-list-item-title {
  font-family: var(--font-body) !important;
}

/* 기존 스타일 유지 */
.router-link-active {
  color: var(--v-primary-base);
}

.mobile-menu-icon {
  display: none;
}

@media (max-width: 960px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu-icon {
    display: block;
  }
}

.v-app-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.site-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.site-title a.text-on-primary {
  color: var(--v-on-primary-base) !important;
}

/* 모바일에서 타이틀 크기 조정 */
@media (max-width: 600px) {
  .site-title {
    font-size: 1.2rem;
  }
}

/* 사이드 메뉴 스타일 */
.v-list-item--active {
  color: var(--v-primary-base) !important;
}

.v-list-group__items .v-list-item {
  padding-left: 16px;
}
</style> 