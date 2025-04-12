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
              <h4 class="text-h6 font-weight-bold white mb-4">퀵메뉴</h4>
              <div class="d-flex flex-column gap-2">
                <router-link
                  v-for="(menu, index) in menuItems"
                  :key="index"
                  :to="menu.to || menu.items?.[0].to"
                  class="footer-link d-flex align-center"
                >
                  <v-icon :icon="menu.icon" size="small" color="grey-lighten-3" class="me-2" />
                  {{ menu.title }}
                </router-link>
              </div>
            </v-col>

            <v-col cols="12" sm="4" class="d-flex flex-column justify-start">
              <h4 class="text-h6 font-weight-bold white mb-4">연락처</h4>
              <div class="contact-info grey-lighten-3">
                <p class="mb-1">전라남도 화순군 청풍면</p>
                <p>010-5507-2725</p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { FOOTER_MENU } from '@/constants/menu'

const menuItems = FOOTER_MENU
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