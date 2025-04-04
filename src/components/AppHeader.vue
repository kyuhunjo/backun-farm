<template>
  <div>
    <v-app-bar
      color="primary"
      app
      elevation="1"
    >
      <v-app-bar-nav-icon @click="toggleDrawer" color="white"></v-app-bar-nav-icon>
      
      <v-app-bar-title class="site-title">
        <router-link to="/" class="text-decoration-none text-white">
          백운마을 귀농체험
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- 데스크톱 메뉴 -->
      <div class="hidden-sm-and-down">
        <v-btn to="/" variant="text" color="white">홈</v-btn>
        <v-btn to="/prepare" variant="text" color="white">귀농 준비하기</v-btn>
        <v-btn to="/regions" variant="text" color="white">지역별 정보</v-btn>
        <v-btn to="/success-stories" variant="text" color="white">성공 스토리</v-btn>
        <v-btn to="/contact" variant="text" color="white">문의</v-btn>
      </div>

      <!-- 모바일 메뉴 아이콘 -->
      <div class="hidden-md-and-up">
        <v-btn icon color="white">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- 모바일 사이드 메뉴 -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item
          prepend-avatar="@/assets/images/20250402_123303.jpg"
          :title="'백운마을 귀농체험'"
          :subtitle="'화순군 백운면'"
        ></v-list-item>
        
        <v-divider></v-divider>

        <v-list-item to="/" prepend-icon="mdi-home" title="홈"></v-list-item>
        <v-list-item to="/prepare" prepend-icon="mdi-book-open-page-variant" title="귀농 준비하기"></v-list-item>
        <v-list-item to="/regions" prepend-icon="mdi-map-marker" title="지역별 정보"></v-list-item>
        <v-list-item to="/success-stories" prepend-icon="mdi-trophy" title="성공 스토리"></v-list-item>
        <v-list-item to="/contact" prepend-icon="mdi-message" title="문의"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.site-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.site-title a {
  color: white !important;
}

/* 모바일에서 타이틀 크기 조정 */
@media (max-width: 600px) {
  .site-title {
    font-size: 1.2rem;
  }
}
</style> 