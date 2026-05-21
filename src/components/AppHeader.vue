<template>
  <v-app-bar color="white" app elevation="1">
    <v-container class="d-flex align-center">
      <router-link to="/" class="text-decoration-none d-flex align-center">
        <span class="site-title text-primary font-weight-bold text-h5">빛고을 로컬마켓</span>
      </router-link>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.to"
               variant="text" class="px-3" color="grey-darken-3">
          {{ item.title }}
        </v-btn>
      </div>
      <v-btn icon @click.stop="drawer = !drawer" class="d-md-none" variant="text">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="right" temporary width="280">
    <v-list>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { MAIN_MENU } from "@/constants/menu"
export default {
  name: "AppHeader",
  data: () => ({ drawer: false, menuItems: MAIN_MENU })
}
</script>
<style scoped>
.site-title { font-size: 1.25rem; }
</style>
