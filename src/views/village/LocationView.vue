<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">찾아오시는 길</h2>

    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1">
          <v-card-title class="text-h5 font-heading">주소 및 연락처</v-card-title>
          <v-card-text class="font-body">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-map-marker"></v-icon>
                </template>
                <v-list-item-title class="font-body">광주광역시 서구 상무대로 1000</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-phone"></v-icon>
                </template>
                <v-list-item-title class="font-body">061-1234-5678</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-email"></v-icon>
                </template>
                <v-list-item-title class="font-body">info@baekun.kr</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">대중교통 이용</v-card-title>
          <v-card-text class="font-body">
            <h3 class="text-h6 font-heading mb-2">버스</h3>
            <p class="text-body-1">광주종합버스터미널에서 백운면행 버스 이용 (약 40분 소요)</p>
            <ul class="mb-4">
              <li>첫차: 06:30</li>
              <li>막차: 19:30</li>
              <li>배차간격: 1시간</li>
            </ul>

            <h3 class="text-h6 font-heading mb-2">택시</h3>
            <p class="text-body-1">광주종합버스터미널에서 택시 이용 (약 30분 소요)</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1">
          <v-card-title class="text-h5 font-heading">자가용 이용</v-card-title>
          <v-card-text class="font-body">
            <h3 class="text-h6 font-heading mb-2">광주 방면</h3>
            <p class="text-body-1 mb-4">
              광주 → 광주 → 무등산 방면 (약 1시간 소요)<br>
              - 호남고속도로 → 광주IC → 지방도 22번
            </p>

            <h3 class="text-h6 font-heading mb-2">순천 방면</h3>
            <p class="text-body-1 mb-4">
              순천 → 보성 → 광주 → 무등산 방면 (약 1시간 30분 소요)<br>
              - 남해고속도로 → 순천IC → 지방도 15번 → 지방도 22번
            </p>

            <div class="text-caption mt-4">
              * 내비게이션 검색: "백운면사무소" 또는 "빛고을 로컬마켓회관"
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">주변 관광지</v-card-title>
          <v-card-text class="font-body">
            <ul>
              <li>무등산 (차량 20분)</li>
              <li>운주사 (차량 30분)</li>
              <li>광주 국립아시아문화전당 (차량 25분)</li>
              <li>광주 5.18기념공원 (차량 15분)</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LocationView'
}
</script> 