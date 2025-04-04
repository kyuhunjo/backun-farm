<template>
  <v-footer class="bg-primary">
    <v-container>
      <v-row>
        <!-- 연락처 정보 -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 text-white mb-4">연락처</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item prepend-icon="mdi-map-marker" class="text-white">
              <v-list-item-title>전라남도 화순군 백운면 백운길 123</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-phone" class="text-white">
              <v-list-item-title>061-123-4567</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-email" class="text-white">
              <v-list-item-title>baekun@farming.com</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- 빠른 링크 -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 text-white mb-4">빠른 메뉴</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item to="/prepare" class="text-white">
              <v-list-item-title>귀농 준비하기</v-list-item-title>
            </v-list-item>
            <v-list-item to="/regions" class="text-white">
              <v-list-item-title>지역별 정보</v-list-item-title>
            </v-list-item>
            <v-list-item to="/success-stories" class="text-white">
              <v-list-item-title>성공 스토리</v-list-item-title>
            </v-list-item>
            <v-list-item to="/contact" class="text-white">
              <v-list-item-title>문의하기</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- 관련 기관 링크 -->
        <v-col cols="12" md="4">
          <h3 class="text-h6 text-white mb-4">관련 기관</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item href="https://www.hwasun.go.kr" target="_blank" class="text-white">
              <v-list-item-title>화순군청</v-list-item-title>
            </v-list-item>
            <v-list-item href="https://www.returnfarm.com" target="_blank" class="text-white">
              <v-list-item-title>귀농귀촌종합센터</v-list-item-title>
            </v-list-item>
            <v-list-item href="https://www.nongsaro.go.kr" target="_blank" class="text-white">
              <v-list-item-title>농사로</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-4 border-opacity-25" color="white"></v-divider>

      <!-- 카피라이트 -->
      <v-row>
        <v-col cols="12" class="text-center text-white">
          <small>&copy; {{ new Date().getFullYear() }} 백운마을 귀농체험. All rights reserved.</small>
        </v-col>
      </v-row>

      <!-- SNS 링크 -->
      <v-row justify="center" class="mt-2">
        <v-btn icon="mdi-facebook" variant="text" color="white" href="#" target="_blank"></v-btn>
        <v-btn icon="mdi-instagram" variant="text" color="white" href="#" target="_blank"></v-btn>
        <v-btn icon="mdi-youtube" variant="text" color="white" href="#" target="_blank"></v-btn>
        <v-btn icon="mdi-kakao" variant="text" color="white" href="#" target="_blank"></v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// 현재 연도는 템플릿에서 직접 계산됩니다
</script>

<style scoped>
.footer {
  width: 100%;
}

.v-list-item {
  min-height: 35px !important;
}

.v-list-item__prepend {
  padding-inline-end: 8px !important;
}

.v-list-item__content {
  opacity: 0.9;
}

.v-list-item:hover .v-list-item__content {
  opacity: 1;
}

.v-btn--icon {
  margin: 0 4px;
}

/* 모바일 대응 */
@media (max-width: 600px) {
  .v-footer {
    padding: 16px 0;
  }
  
  .text-h6 {
    font-size: 1.1rem !important;
  }
}
</style> 