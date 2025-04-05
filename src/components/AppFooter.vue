<template>
  <v-footer class="bg-grey-darken-4">
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <h3 class="text-h6 font-heading mb-4 text-white">백운마을</h3>
          <p class="text-body-1 font-body text-grey-lighten-1">
            전라남도 화순군 백운마을에 오신 것을 환영합니다.
            자연과 함께하는 삶, 전통과 현대가 어우러진 우리 마을에서
            새로운 시작을 준비하세요.
          </p>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="text-h6 font-heading mb-4 text-white">메뉴</h3>
          <v-row>
            <v-col cols="6">
              <div class="text-subtitle-1 font-body text-white mb-2">마을 소개</div>
              <v-list density="compact" bg-color="transparent" class="pa-0">
                <v-list-item to="/village/history" class="font-body text-grey-lighten-1 px-0">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                  </template>
                  마을 역사
                </v-list-item>
                <v-list-item to="/village/location" class="font-body text-grey-lighten-1 px-0">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                  </template>
                  찾아오시는 길
                </v-list-item>
                <v-list-item to="/village/specialties" class="font-body text-grey-lighten-1 px-0">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                  </template>
                  특산물
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <div class="text-subtitle-1 font-body text-white mb-2">귀농 체험</div>
              <v-list density="compact" bg-color="transparent" class="pa-0">
                <v-list-item to="/farming/programs" class="font-body text-grey-lighten-1 px-0">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                  </template>
                  체험 프로그램
                </v-list-item>
                <v-list-item to="/farming/prepare" class="font-body text-grey-lighten-1 px-0">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                  </template>
                  귀농 준비하기
                </v-list-item>
                <v-list-item to="/farming/success-stories" class="font-body text-grey-lighten-1 px-0">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                  </template>
                  성공 사례
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="text-h6 font-heading mb-4 text-white">연락처</h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item class="font-body text-grey-lighten-1 px-0 mb-2">
              <template v-slot:prepend>
                <v-icon icon="mdi-map-marker" color="primary"></v-icon>
              </template>
              전라남도 화순군 백운면<br>
              <span class="text-grey-lighten-2 text-caption ps-9">우편번호: 58112</span>
            </v-list-item>
            <v-list-item class="font-body text-grey-lighten-1 px-0 mb-2">
              <template v-slot:prepend>
                <v-icon icon="mdi-phone" color="primary"></v-icon>
              </template>
              061-1234-5678<br>
              <span class="text-grey-lighten-2 text-caption ps-9">평일 09:00 - 18:00</span>
            </v-list-item>
            <v-list-item class="font-body text-grey-lighten-1 px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-email" color="primary"></v-icon>
              </template>
              info@baekun.kr
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-6 border-opacity-25"></v-divider>

      <v-row>
        <v-col cols="12" class="text-center">
          <div class="copyright text-grey-lighten-1">
            &copy; {{ new Date().getFullYear() }} 백운마을. All rights reserved.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.copyright {
  font-size: 0.9rem;
}

.v-list-item {
  min-height: 36px !important;
}

.v-list-item:hover {
  color: white !important;
}

.v-list-item:hover :deep(.v-icon) {
  color: white !important;
}
</style> 