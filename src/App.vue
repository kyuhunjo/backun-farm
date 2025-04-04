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
.main-content {
  padding-bottom: 400px; /* 푸터 높이만큼 패딩 추가 */
}

@media (max-width: 600px) {
  .main-content {
    padding-bottom: 600px; /* 모바일에서는 더 큰 패딩 */
  }
}
</style> 