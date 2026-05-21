<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6 text-center">
          <v-icon size="64" color="primary" class="mb-4">mdi-store-outline</v-icon>
          <h1 class="text-h4 font-weight-bold mb-2">빛고을 로컬마켓</h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-6">
            광주광역시 로컬푸드 및 생활정보 통합 플랫폼
          </p>
          <v-row class="mt-4">
            <v-col v-for="card in featureCards" :key="card.title" cols="12" sm="6" md="3">
              <v-card :to="card.to" variant="outlined" class="pa-4 text-center h-100">
                <v-icon size="40" :color="card.color" class="mb-2">{{ card.icon }}</v-icon>
                <div class="text-h6 font-weight-bold">{{ card.title }}</div>
                <div class="text-caption text-medium-emphasis mt-1">{{ card.desc }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { MAIN_MENU } from "@/constants/menu"
export default {
  name: "HomeView",
  data: () => ({
    featureCards: [
      { title: "로컬푸드 매장", to: "/stores", icon: "mdi-store", color: "green", desc: "광주 로컬푸드 직매장 정보" },
      { title: "날씨/대기질", to: "/air-quality", icon: "mdi-weather-partly-cloudy", color: "blue", desc: "실시간 날씨 및 대기질" },
      { title: "상권/인구 분석", to: "/demographics", icon: "mdi-chart-bar", color: "orange", desc: "생활인구 및 상권 데이터" },
      { title: "복지시설", to: "/facilities", icon: "mdi-hospital-building", color: "red", desc: "광주 복지 인프라 정보" }
    ]
  })
}
</script>
