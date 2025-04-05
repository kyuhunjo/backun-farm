<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-heading mb-6">백운마을 고사리 농사</h1>
        <p class="text-body-1 mb-8">
          전라남도 화순군 백운마을의 깨끗한 자연환경에서 자라는 고품질 고사리의 재배 방법을 소개합니다.
          우리 마을의 오랜 경험과 노하우가 담긴 고사리 농사 방법을 통해 최고 품질의 고사리를 생산할 수 있습니다.
        </p>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-item>
            <v-card-title class="text-h5 font-heading mb-4">
              재배 환경
              <v-chip color="success" class="ml-2">수확기: 4월-5월</v-chip>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-mountain</v-icon>
                  </template>
                  <v-list-item-title>해발 400-600m의 고지대</v-list-item-title>
                  <v-list-item-subtitle>서늘한 기후와 깨끗한 공기</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-water</v-icon>
                  </template>
                  <v-list-item-title>부드럽고 물 빠짐이 좋은 사양토</v-list-item-title>
                  <v-list-item-subtitle>적절한 수분 유지가 중요</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="primary">mdi-weather-sunny</v-icon>
                  </template>
                  <v-list-item-title>서늘하고 습도가 적당한 환경</v-list-item-title>
                  <v-list-item-subtitle>반그늘 환경 선호</v-list-item-subtitle>
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
                  <template v-slot:opposite>3월 초</template>
                  <div class="text-h6 mb-2">밭 정리 시작</div>
                  <div>눈이 녹으면 밭을 정리하고 토양을 관리합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>3월 중순</template>
                  <div class="text-h6 mb-2">재배지 선정</div>
                  <div>햇빛이 잘 들고 바람이 잘 통하는 곳을 선택합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="primary"
                  size="small"
                >
                  <template v-slot:opposite>3월 말-4월 초</template>
                  <div class="text-h6 mb-2">고사리 관리</div>
                  <div>고사리 순이 올라오면 수시로 관리하며 잡초를 제거합니다.</div>
                </v-timeline-item>

                <v-timeline-item
                  dot-color="success"
                  size="small"
                >
                  <template v-slot:opposite>4월-5월</template>
                  <div class="text-h6 mb-2">수확</div>
                  <div>새순이 올라오면 아침 일찍 수확을 시작합니다.</div>
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
                  <p>부드럽고 물 빠짐이 좋은 사양토가 적합합니다. 퇴비를 충분히 넣어 토양을 비옥하게 유지하세요.</p>
                </v-col>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">2. 수분 관리</h3>
                  <p>토양이 너무 건조하거나 과습하지 않도록 주의하세요. 적절한 수분 유지가 중요합니다.</p>
                </v-col>
                <v-col cols="12" md="4">
                  <h3 class="text-h6 mb-2">3. 수확 시기</h3>
                  <p>새순이 15-20cm 정도 자랐을 때 수확하는 것이 좋습니다. 아침 일찍 수확하면 품질이 좋습니다.</p>
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
          text="고사리는 한번 심으면 여러 해 동안 수확할 수 있는 다년생 작물입니다. 초기 식재와 관리만 잘하면 매년 안정적인 수확이 가능합니다."
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