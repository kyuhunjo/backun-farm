<template>
  <v-footer class="bg-grey-darken-3 py-2">
    <v-container>
      <v-row>
        <v-col cols="12" sm="5">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-home-variant" size="small" color="green-lighten-1" class="me-2"></v-icon>
            <h3 class="text-h6 font-weight-bold text-green-lighten-1 mb-0">백운마을</h3>
          </div>
          <p class="text-body-2 text-grey-lighten-1 mb-0">
            전라남도 화순군 백운마을에 오신 것을 환영합니다.
          </p>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="text-subtitle-1 font-weight-bold text-green-lighten-1 mb-2 d-flex align-center">
            <v-icon icon="mdi-menu" size="small" class="me-2"></v-icon>
            빠른 메뉴
          </h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item to="/" class="footer-link px-1" color="white">
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-right" size="x-small" color="grey-lighten-1"></v-icon>
              </template>
              홈
            </v-list-item>
            <v-list-item to="/stores" class="footer-link px-1" color="white">
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-right" size="x-small" color="grey-lighten-1"></v-icon>
              </template>
              직매장
            </v-list-item>
            <v-list-item to="/products" class="footer-link px-1" color="white">
              <template v-slot:prepend>
                <v-icon icon="mdi-chevron-right" size="x-small" color="grey-lighten-1"></v-icon>
              </template>
              특산물
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" sm="3">
          <h3 class="text-subtitle-1 font-weight-bold text-green-lighten-1 mb-2 d-flex align-center">
            <v-icon icon="mdi-contacts" size="small" class="me-2"></v-icon>
            연락처
          </h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item class="footer-contact px-1 mb-2">
              <template v-slot:prepend>
                <v-icon icon="mdi-map-marker" color="green-lighten-1" size="x-small"></v-icon>
              </template>
              <div class="text-grey-lighten-1 text-body-2">
                전라남도 화순군 백운면
              </div>
            </v-list-item>
            <v-list-item class="footer-contact px-1">
              <template v-slot:prepend>
                <v-icon icon="mdi-phone" color="green-lighten-1" size="x-small"></v-icon>
              </template>
              <div class="text-grey-lighten-1 text-body-2">
                061-1234-5678
              </div>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-2 border-opacity-25 border-grey-lighten-2"></v-divider>

      <v-row>
        <v-col cols="12" class="text-center py-1">
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
  font-size: 0.75rem;
}

.footer-link {
  min-height: 28px !important;
  color: rgb(var(--v-theme-grey-lighten-1)) !important;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.footer-link:hover {
  color: rgb(var(--v-theme-green-lighten-1)) !important;
  transform: translateX(4px);
}

.footer-link:hover :deep(.v-icon) {
  color: rgb(var(--v-theme-green-lighten-1)) !important;
}

.footer-contact {
  min-height: 28px !important;
}

.footer-contact :deep(.v-list-item__content) {
  padding: 2px 0;
}

@media (max-width: 600px) {
  .v-footer {
    padding: 12px 0;
  }
  
  .copyright {
    font-size: 0.75rem;
  }
}
</style> 