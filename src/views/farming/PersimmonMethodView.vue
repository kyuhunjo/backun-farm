<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-heading mb-6">백운마을 곶감 가공</h1>
        <p class="text-body-1 mb-8">
          전라남도 화순군 백운마을의 깨끗한 자연환경에서 전통 방식으로 만드는 달콤한 곶감의 가공 방법을 소개합니다.
          우리 마을의 오랜 경험과 노하우가 담긴 곶감 가공 방법을 통해 최고 품질의 곶감을 생산할 수 있습니다.
        </p>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-item>
            <v-card-title class="text-h5 font-heading mb-4">
              재배 환경
              <v-chip color="success" class="ml-2">수확기: 11월-12월</v-chip>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-mountain</v-icon>
                  </template>
                  <v-list-item-title>해발 200-400m의 구릉지</v-list-item-title>
                  <v-list-item-subtitle>서늘한 기후와 깨끗한 공기</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-water</v-icon>
                  </template>
                  <v-list-item-title>물 빠짐이 좋은 사질양토</v-list-item-title>
                  <v-list-item-subtitle>배수가 중요한 환경</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-weather-sunny</v-icon>
                  </template>
                  <v-list-item-title>일조량이 풍부한 남향 경사지</v-list-item-title>
                  <v-list-item-subtitle>햇빛이 잘 드는 환경 필요</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-item>
            <v-card-title class="text-h5 font-heading mb-4">가공 방법</v-card-title>
            <v-card-text>
              <v-timeline>
                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>11월 초순</template>
                  <div class="text-h6 mb-2">감 수확</div>
                  <div>단단하고 건강한 감을 선별하여 수확합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>수확 직후</template>
                  <div class="text-h6 mb-2">껍질 벗기기</div>
                  <div>깨끗이 세척하고 껍질을 벗깁니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>건조 기간</template>
                  <div class="text-h6 mb-2">전통 방식 건조</div>
                  <div>전통 방식으로 매달아 자연 건조합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="success"
                  size="small"
                >
                  <template v-slot:opposite>4-5주 후</template>
                  <div class="text-h6 mb-2">출하</div>
                  <div>적절히 건조된 곶감을 선별하여 출하합니다.</div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-item>
            <v-card-title class="text-h5 font-heading mb-4">주요 관리 포인트</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">1. 원료 감 선별</h3>
                  <p>단단하고 건강한 감을 선별하는 것이 중요합니다. 상처가 있거나 병든 감은 제외하세요.</p>
                </v-col>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">2. 건조 환경</h3>
                  <p>통풍이 잘되고 습도가 적당한 곳에서 건조해야 합니다. 직사광선은 피하고 서늘한 그늘에서 건조하세요.</p>
                </v-col>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">3. 건조 기간</h3>
                  <p>4-5주 정도의 충분한 건조 기간이 필요합니다. 날씨와 습도에 따라 건조 기간을 조절하세요.</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" class="mt-6">
        <v-alert
          color="info"
          icon="mdi-lightbulb"
          title="가공 팁"
          text="곶감은 건조 과정에서 당도가 높아지고 영양가가 응축됩니다. 전통 방식의 자연 건조로 만든 곶감은 맛과 향이 뛰어나며, 저장성도 좋습니다. 특히 건조 환경과 기간 관리가 맛을 좌우하니 주의해주세요."
          class="text-body-1"
        ></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 필요한 경우 추가 로직 구현
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style> 