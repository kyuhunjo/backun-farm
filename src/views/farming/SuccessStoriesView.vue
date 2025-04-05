<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">귀농 성공 사례</h2>

    <v-row>
      <v-col cols="12" md="8">
        <v-timeline side="end">
          <v-timeline-item
            v-for="story in stories"
            :key="story.id"
            size="small"
            dot-color="primary"
          >
            <template v-slot:opposite>
              <div class="text-h6 font-heading">{{ story.year }}</div>
              <div class="text-subtitle-2 font-body">{{ story.name }}</div>
            </template>
            <v-card elevation="1">
              <v-img
                :src="story.image"
                height="200"
                cover
              ></v-img>
              <v-card-title class="text-h5 font-heading">{{ story.title }}</v-card-title>
              <v-card-subtitle class="font-body">{{ story.subtitle }}</v-card-subtitle>
              <v-card-text class="font-body">
                <p class="text-body-1">{{ story.description }}</p>
                <v-divider class="my-3"></v-divider>
                <v-chip-group>
                  <v-chip
                    v-for="(tag, index) in story.tags"
                    :key="index"
                    color="primary"
                    class="font-body"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="text"
                  class="font-body"
                  @click="story.showDetails = !story.showDetails"
                >
                  자세히 보기
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :icon="story.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @click="story.showDetails = !story.showDetails"
                ></v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="story.showDetails">
                  <v-divider></v-divider>
                  <v-card-text class="font-body">
                    <h3 class="text-h6 font-heading mb-2">성공 요인</h3>
                    <v-list density="compact">
                      <v-list-item v-for="(factor, index) in story.successFactors" :key="index">
                        <template v-slot:prepend>
                          <v-icon color="primary" size="small">mdi-check</v-icon>
                        </template>
                        <v-list-item-title class="font-body">{{ factor }}</v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <h3 class="text-h6 font-heading mt-4 mb-2">조언</h3>
                    <v-list density="compact">
                      <v-list-item v-for="(advice, index) in story.advice" :key="index">
                        <template v-slot:prepend>
                          <v-icon color="primary" size="small">mdi-lightbulb</v-icon>
                        </template>
                        <v-list-item-title class="font-body">{{ advice }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="1">
          <v-card-title class="text-h5 font-heading">
            귀농 성공의 핵심
          </v-card-title>
          <v-card-text class="font-body">
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-book-open-variant</v-icon>
                </template>
                <v-list-item-title class="font-body">철저한 사전 준비</v-list-item-title>
                <v-list-item-subtitle class="font-body">교육과 정보 수집의 중요성</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-account-group</v-icon>
                </template>
                <v-list-item-title class="font-body">지역 사회와의 융화</v-list-item-title>
                <v-list-item-subtitle class="font-body">마을 주민들과의 관계 형성</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-chart-line</v-icon>
                </template>
                <v-list-item-title class="font-body">단계적 접근</v-list-item-title>
                <v-list-item-subtitle class="font-body">무리하지 않는 계획적인 시작</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-handshake</v-icon>
                </template>
                <v-list-item-title class="font-body">멘토링과 네트워크</v-list-item-title>
                <v-list-item-subtitle class="font-body">선배 귀농인들의 조언과 협력</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="mt-4" elevation="1">
          <v-card-title class="text-h5 font-heading">
            백운마을 귀농 상담
          </v-card-title>
          <v-card-text class="font-body">
            <p class="text-body-1">
              귀농을 고민하시나요? 백운마을의 선배 귀농인들이 여러분의 성공적인 귀농을 도와드립니다.
            </p>
            <v-list density="compact" class="mt-4">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-phone</v-icon>
                </template>
                <v-list-item-title class="font-body">061-1234-5678</v-list-item-title>
                <v-list-item-subtitle class="font-body">평일 09:00-18:00</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-email</v-icon>
                </template>
                <v-list-item-title class="font-body">consult@baekun.kr</v-list-item-title>
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
  name: 'SuccessStoriesView',
  data() {
    return {
      stories: [
        {
          id: 1,
          year: '2021',
          name: '김민수 씨',
          image: '/images/success-story-1.jpg',
          title: '도시 생활을 접고 유기농 채소 농부로',
          subtitle: '전직 IT 개발자에서 친환경 농부로 변신',
          description: '15년간의 IT 개발자 생활을 뒤로하고 백운마을에서 새로운 삶을 시작했습니다. 처음에는 걱정이 많았지만, 체계적인 준비와 마을 주민들의 도움으로 성공적으로 정착했습니다.',
          tags: ['유기농 채소', '스마트팜', '직거래'],
          showDetails: false,
          successFactors: [
            '1년간의 철저한 사전 준비',
            'IT 기술을 활용한 스마트팜 운영',
            '지역 농부들과의 협력 관계 구축',
            '온라인 직거래 플랫폼 활용'
          ],
          advice: [
            '작목 선택 전 시장 조사 필수',
            '최소 6개월의 현장 실습 권장',
            '지역 주민들과 적극적인 교류',
            '단계적인 규모 확장'
          ]
        },
        {
          id: 2,
          year: '2020',
          name: '이영희 씨',
          image: '/images/success-story-2.jpg',
          title: '도시 주부에서 농산물 가공 전문가로',
          subtitle: '백운마을 특산물로 가공식품 사업 성공',
          description: '평범한 주부였던 저는 백운마을의 특산물을 활용한 가공식품 개발에 도전했습니다. 지역 농산물의 가치를 높이고, 새로운 판로를 개척하는 데 성공했습니다.',
          tags: ['농산물 가공', '6차 산업', '로컬푸드'],
          showDetails: false,
          successFactors: [
            '지역 특산물에 대한 깊은 이해',
            '식품 가공 관련 자격증 취득',
            '차별화된 제품 개발',
            '지역 농가와의 상생 협력'
          ],
          advice: [
            '관련 자격증 취득 추천',
            '시장 차별화 전략 필요',
            '품질 관리가 최우선',
            '지역 농가와의 협력 관계 중요'
          ]
        },
        {
          id: 3,
          year: '2019',
          name: '박준호 씨',
          image: '/images/success-story-3.jpg',
          title: '퇴직 후 제2의 인생을 농촌에서',
          subtitle: '은퇴 후 귀농으로 찾은 새로운 행복',
          description: '32년간의 회사 생활을 마치고 백운마을에서 새로운 삶을 시작했습니다. 처음에는 어려움도 있었지만, 이제는 농사일이 즐겁고 보람찹니다.',
          tags: ['과수농사', '체험농장', '귀농교육'],
          showDetails: false,
          successFactors: [
            '은퇴 전부터의 체계적인 준비',
            '과수농사 전문화',
            '체험농장 운영으로 수익 다각화',
            '귀농 교육 강사 활동'
          ],
          advice: [
            '은퇴 전부터 준비 시작',
            '작목 선택은 신중하게',
            '수익 다각화 방안 모색',
            '지역 사회 활동 참여'
          ]
        }
      ]
    }
  }
}
</script> 