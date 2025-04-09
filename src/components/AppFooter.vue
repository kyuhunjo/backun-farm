<template>
  <v-footer class="bg-grey-darken-4">
    <v-container class="footer-container">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="5" class="d-flex flex-column justify-start">
              <div class="d-flex align-center mb-3">
                <v-icon icon="mdi-home-variant" color="white" size="large" class="me-2" />
                <h3 class="text-h5 font-weight-bold white mb-0">백운마을</h3>
              </div>
              <p class="text-body-1 grey-lighten-3 mb-0">
                전라남도 화순군 백운마을에 오신 것을 환영합니다.
              </p>
            </v-col>

            <v-col cols="12" sm="3" class="d-flex flex-column justify-start">
              <h3 class="text-subtitle-1 font-weight-bold white mb-4">
                빠른 메뉴
              </h3>
              <div class="quick-links">
                <router-link to="/" class="footer-link d-flex align-center mb-3">
                  <v-icon icon="mdi-home" size="x-small" class="me-2" />
                  <span>홈</span>
                </router-link>
                <router-link to="/village/history" class="footer-link d-flex align-center mb-3">
                  <v-icon icon="mdi-history" size="x-small" class="me-2" />
                  <span>마을 역사</span>
                </router-link>
                <router-link to="/village/location" class="footer-link d-flex align-center mb-3">
                  <v-icon icon="mdi-map-marker" size="x-small" class="me-2" />
                  <span>찾아오시는 길</span>
                </router-link>
                <router-link to="/village/specialties" class="footer-link d-flex align-center mb-3">
                  <v-icon icon="mdi-store" size="x-small" class="me-2" />
                  <span>특산물</span>
                </router-link>
                <router-link to="/stores" class="footer-link d-flex align-center mb-3">
                  <v-icon icon="mdi-store" size="x-small" class="me-2" />
                  <span>로컬푸드 직판매 정보</span>
                </router-link>
                <router-link to="/air-quality" class="footer-link d-flex align-center">
                  <v-icon icon="mdi-weather-dust" size="x-small" class="me-2" />
                  <span>전라남도 대기질 현황</span>
                </router-link>
              </div>
            </v-col>

            <v-col cols="12" sm="4" class="d-flex flex-column justify-start">
              <h3 class="text-subtitle-1 font-weight-bold white mb-4">
                연락처
              </h3>
              <div class="contact-info">
                <div class="d-flex align-center mb-3">
                  <v-icon icon="mdi-map-marker" color="white" size="small" class="me-2" />
                  <span class="grey-lighten-3">전라남도 화순군 청풍면</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-phone" color="white" size="small" class="me-2" />
                  <span class="grey-lighten-3">010-5507-2725</span>
                </div>
              </div>
            </v-col>
          </v-row>
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
.footer-link {
  color: rgb(var(--v-theme-grey-lighten-3));
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  opacity: 0.9;
}

.footer-link:hover {
  color: white;
  transform: translateX(4px);
  opacity: 1;
}

.footer-link:hover .v-icon {
  color: white !important;
}

.contact-info {
  font-size: 0.9rem;
  opacity: 0.9;
}

.white {
  color: white !important;
}

.grey-lighten-3 {
  color: rgb(var(--v-theme-grey-lighten-3));
}

.footer-container {
  padding-top: 16px;
  padding-bottom: 16px;
}

@media (max-width: 600px) {
  .v-footer {
    padding: 0;
  }

  .footer-container {
    padding: 48px 24px;
  }

  .mb-4 {
    margin-bottom: 16px !important;
  }

  .contact-info, .footer-link {
    font-size: 0.85rem;
  }
}
</style> 