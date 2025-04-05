<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-heading mb-6">백운마을 더덕 농사</h1>
        <p class="text-body-1 mb-8">
          전라남도 화순군 백운마을의 깨끗한 자연환경에서 자라는 영양 만점 더덕의 재배 방법을 소개합니다.
          우리 마을의 오랜 경험과 노하우가 담긴 더덕 농사 방법을 통해 최고 품질의 더덕을 생산할 수 있습니다.
        </p>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-item>
            <v-card-title class="text-h5 font-heading mb-4">
              재배 환경
              <v-chip color="success" class="ml-2">수확기: 8월-10월</v-chip>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-mountain</v-icon>
                  </template>
                  <v-list-item-title>해발 300-500m의 산간지역</v-list-item-title>
                  <v-list-item-subtitle>서늘한 기후와 깨끗한 공기</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-water</v-icon>
                  </template>
                  <v-list-item-title>배수가 잘되는 사양토나 양토</v-list-item-title>
                  <v-list-item-subtitle>과습에 약하므로 배수가 중요</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-weather-sunny</v-icon>
                  </template>
                  <v-list-item-title>서늘한 기후, 반음지 환경</v-list-item-title>
                  <v-list-item-subtitle>직사광선을 피한 환경 선호</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-item>
            <v-card-title class="text-h5 font-heading mb-4">재배 방법</v-card-title>
            <v-card-text>
              <v-timeline>
                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>3-4월</template>
                  <div class="text-h6 mb-2">파종 및 식재</div>
                  <div>씨앗 파종 또는 묘종을 식재합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>5-7월</template>
                  <div class="text-h6 mb-2">생육 관리</div>
                  <div>적절한 수분 유지와 잡초 관리를 합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>2-3년</template>
                  <div class="text-h6 mb-2">생육 기간</div>
                  <div>충분한 생육기간을 확보하여 품질을 높입니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="success"
                  size="small"
                >
                  <template v-slot:opposite>8-10월</template>
                  <div class="text-h6 mb-2">수확</div>
                  <div>가을에 뿌리를 수확합니다.</div>
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
                  <h3 class="text-h6 mb-2">1. 토양 관리</h3>
                  <p>배수가 잘되는 사양토나 양토가 적합합니다. 유기물을 충분히 넣어 토양을 개량하세요.</p>
                </v-col>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">2. 수분 관리</h3>
                  <p>과습에 약하므로 배수 관리가 중요합니다. 적절한 수분을 유지하되 물이 고이지 않도록 하세요.</p>
                </v-col>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">3. 생육 기간</h3>
                  <p>2-3년의 충분한 생육기간이 필요합니다. 조급해하지 말고 기다리면 좋은 품질의 더덕을 얻을 수 있습니다.</p>
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
          title="농사 팁"
          text="더덕은 한번 심으면 여러 해 동안 수확할 수 있는 다년생 작물입니다. 초기 식재와 관리만 잘하면 매년 안정적인 수확이 가능합니다. 특히 토양 관리와 배수 관리가 중요하니 주의해주세요."
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