<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">귀농 준비하기</h2>

    <v-row>
      <v-col cols="12" md="8">
        <v-stepper>
          <v-stepper-header>
            <v-stepper-item value="1">
              <v-icon>mdi-book-open-page-variant</v-icon>
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item value="2">
              <v-icon>mdi-map-marker</v-icon>
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item value="3">
              <v-icon>mdi-school</v-icon>
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item value="4">
              <v-icon>mdi-home</v-icon>
            </v-stepper-item>

            <v-divider></v-divider>

            <v-stepper-item value="5">
              <v-icon>mdi-sprout</v-icon>
            </v-stepper-item>
          </v-stepper-header>

          <v-stepper-window>
            <v-stepper-window-item value="1">
              <v-card class="mb-4" elevation="1">
                <v-card-title class="text-h5 font-heading">1. 정보 수집</v-card-title>
                <v-card-text class="font-body">
                  <p class="text-body-1">귀농에 대한 기본적인 정보를 수집하는 단계입니다.</p>
                  <v-list density="compact">
                    <v-list-item v-for="(item, index) in step1Items" :key="index">
                      <template v-slot:prepend>
                        <v-icon color="primary" size="small">mdi-check</v-icon>
                      </template>
                      <v-list-item-title class="font-body">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>

            <v-stepper-window-item value="2">
              <v-card class="mb-4" elevation="1">
                <v-card-title class="text-h5 font-heading">2. 지역 선택</v-card-title>
                <v-card-text class="font-body">
                  <p class="text-body-1">귀농할 지역을 선택하고 조사하는 단계입니다.</p>
                  <v-list density="compact">
                    <v-list-item v-for="(item, index) in step2Items" :key="index">
                      <template v-slot:prepend>
                        <v-icon color="primary" size="small">mdi-check</v-icon>
                      </template>
                      <v-list-item-title class="font-body">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>

            <v-stepper-window-item value="3">
              <v-card class="mb-4" elevation="1">
                <v-card-title class="text-h5 font-heading">3. 교육 이수</v-card-title>
                <v-card-text class="font-body">
                  <p class="text-body-1">필요한 교육을 이수하는 단계입니다.</p>
                  <v-list density="compact">
                    <v-list-item v-for="(item, index) in step3Items" :key="index">
                      <template v-slot:prepend>
                        <v-icon color="primary" size="small">mdi-check</v-icon>
                      </template>
                      <v-list-item-title class="font-body">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>

            <v-stepper-window-item value="4">
              <v-card class="mb-4" elevation="1">
                <v-card-title class="text-h5 font-heading">4. 주거지 마련</v-card-title>
                <v-card-text class="font-body">
                  <p class="text-body-1">실제 거주할 집과 농지를 마련하는 단계입니다.</p>
                  <v-list density="compact">
                    <v-list-item v-for="(item, index) in step4Items" :key="index">
                      <template v-slot:prepend>
                        <v-icon color="primary" size="small">mdi-check</v-icon>
                      </template>
                      <v-list-item-title class="font-body">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>

            <v-stepper-window-item value="5">
              <v-card class="mb-4" elevation="1">
                <v-card-title class="text-h5 font-heading">5. 영농 시작</v-card-title>
                <v-card-text class="font-body">
                  <p class="text-body-1">실제 농사를 시작하는 단계입니다.</p>
                  <v-list density="compact">
                    <v-list-item v-for="(item, index) in step5Items" :key="index">
                      <template v-slot:prepend>
                        <v-icon color="primary" size="small">mdi-check</v-icon>
                      </template>
                      <v-list-item-title class="font-body">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-stepper-window-item>
          </v-stepper-window>
        </v-stepper>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="1">
          <v-card-title class="text-h5 font-heading">
            귀농 지원 정책
          </v-card-title>
          <v-card-text class="font-body">
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-cash</v-icon>
                </template>
                <v-list-item-title class="font-body">귀농 창업 지원금</v-list-item-title>
                <v-list-item-subtitle class="font-body">최대 3억원</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-home</v-icon>
                </template>
                <v-list-item-title class="font-body">주택 구입 지원</v-list-item-title>
                <v-list-item-subtitle class="font-body">최대 7,500만원</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-school</v-icon>
                </template>
                <v-list-item-title class="font-body">귀농 교육비 지원</v-list-item-title>
                <v-list-item-subtitle class="font-body">교육비 80% 지원</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">
            관련 기관
          </v-card-title>
          <v-card-text class="font-body">
            <v-list density="compact">
              <v-list-item href="https://www.returnfarm.com" target="_blank">
                <template v-slot:prepend>
                  <v-icon>mdi-web</v-icon>
                </template>
                <v-list-item-title class="font-body">귀농귀촌종합센터</v-list-item-title>
              </v-list-item>

              <v-list-item href="https://www.mafra.go.kr" target="_blank">
                <template v-slot:prepend>
                  <v-icon>mdi-web</v-icon>
                </template>
                <v-list-item-title class="font-body">농림축산식품부</v-list-item-title>
              </v-list-item>

              <v-list-item href="https://www.nongsaro.go.kr" target="_blank">
                <template v-slot:prepend>
                  <v-icon>mdi-web</v-icon>
                </template>
                <v-list-item-title class="font-body">농사로</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PrepareView',
  data() {
    return {
      step1Items: [
        '귀농 관련 서적과 자료 수집',
        '귀농 박람회 및 설명회 참석',
        '귀농 선배들의 경험담 청취',
        '귀농 정책 및 지원사업 조사',
        '작목 선정을 위한 시장 조사'
      ],
      step2Items: [
        '희망 지역의 기후와 토질 조사',
        '지역 특산물과 주요 작목 파악',
        '교통과 생활 인프라 확인',
        '지역 문화와 주민 성향 파악',
        '지자체의 귀농 지원 정책 확인'
      ],
      step3Items: [
        '귀농귀촌 기초 교육 이수',
        '품목별 전문 교육 이수',
        '현장 실습 및 체험',
        '농기계 사용 교육',
        '경영 및 마케팅 교육'
      ],
      step4Items: [
        '주택 및 농지 물색',
        '계약 및 등기 절차 진행',
        '농지원부 등록',
        '주민등록 이전',
        '이웃 주민들과 관계 형성'
      ],
      step5Items: [
        '영농 계획 수립',
        '필요한 농기계 및 시설 준비',
        '작목 선택 및 재배 시작',
        '지역 농업인 조직 가입',
        '판로 개척 및 마케팅'
      ]
    }
  }
}
</script> 