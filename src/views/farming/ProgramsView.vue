<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">체험 프로그램</h2>

    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="program in programs" :key="program.id">
        <v-card elevation="1">
          <v-img
            :src="program.image"
            height="200"
            cover
          ></v-img>
          <v-card-title class="text-h5 font-heading">{{ program.name }}</v-card-title>
          <v-card-subtitle class="font-body">{{ program.duration }}</v-card-subtitle>
          <v-card-text class="font-body">
            <p class="text-body-1">{{ program.description }}</p>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex align-center justify-space-between">
              <div class="text-body-2">{{ program.schedule }}</div>
              <v-chip color="primary" class="font-body">{{ program.price }}</v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              class="font-body"
              @click="program.showDetails = !program.showDetails"
            >
              상세 정보
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="program.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="program.showDetails = !program.showDetails"
            ></v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="program.showDetails">
              <v-divider></v-divider>
              <v-card-text class="font-body">
                <h3 class="text-h6 font-heading mb-2">프로그램 내용</h3>
                <v-list density="compact">
                  <v-list-item v-for="(activity, index) in program.activities" :key="index">
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-check</v-icon>
                    </template>
                    <v-list-item-title class="font-body">{{ activity }}</v-list-item-title>
                  </v-list-item>
                </v-list>

                <h3 class="text-h6 font-heading mt-4 mb-2">준비물</h3>
                <v-list density="compact">
                  <v-list-item v-for="(item, index) in program.preparations" :key="index">
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-circle-small</v-icon>
                    </template>
                    <v-list-item-title class="font-body">{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-8" elevation="1">
      <v-card-title class="text-h5 font-heading">
        프로그램 신청 안내
      </v-card-title>
      <v-card-text class="font-body">
        <v-row>
          <v-col cols="12" md="6">
            <h3 class="text-h6 font-heading mb-2">신청 방법</h3>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-numeric-1-circle</v-icon>
                </template>
                <v-list-item-title class="font-body">희망 프로그램과 날짜 선택</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-numeric-2-circle</v-icon>
                </template>
                <v-list-item-title class="font-body">전화 또는 이메일로 문의 및 예약</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-numeric-3-circle</v-icon>
                </template>
                <v-list-item-title class="font-body">안내된 계좌로 참가비 입금</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-numeric-4-circle</v-icon>
                </template>
                <v-list-item-title class="font-body">예약 확정 문자 수신</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <h3 class="text-h6 font-heading mb-2">문의처</h3>
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-phone</v-icon>
                </template>
                <v-list-item-title class="font-body">061-1234-5678 (평일 09:00-18:00)</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-email</v-icon>
                </template>
                <v-list-item-title class="font-body">program@baekun.kr</v-list-item-title>
              </v-list-item>
            </v-list>

            <div class="mt-4 text-caption">
              * 단체 신청의 경우 별도 문의 바랍니다.<br>
              * 우천시 일정이 변경될 수 있습니다.
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProgramsView',
  data() {
    return {
      programs: [
        {
          id: 1,
          name: '일일 농사체험',
          image: '/images/farming-experience.jpg',
          duration: '1일 (09:00 - 16:00)',
          description: '하루 동안 직접 농사를 체험하며 농촌의 일상을 경험해보세요.',
          schedule: '매주 토요일',
          price: '1인 50,000원',
          showDetails: false,
          activities: [
            '텃밭 가꾸기 체험',
            '계절 작물 수확 체험',
            '농기구 사용법 배우기',
            '수확한 작물로 점심 만들기',
            '농산물 가공 체험'
          ],
          preparations: [
            '편한 옷차림과 운동화',
            '여벌 옷',
            '장갑',
            '모자',
            '물병'
          ]
        },
        {
          id: 2,
          name: '주말 농부 프로그램',
          image: '/images/weekend-farming.jpg',
          duration: '3개월 (주말)',
          description: '3개월 동안 나만의 텃밭을 가꾸며 진정한 농부의 길을 경험해보세요.',
          schedule: '매주 토,일요일',
          price: '1구좌 300,000원',
          showDetails: false,
          activities: [
            '개인 텃밭 분양 (10평)',
            '주말 농사 지도',
            '농업 기초 이론 교육',
            '농기구 대여',
            '수확물 보관 지원'
          ],
          preparations: [
            '농사 일지',
            '작업복',
            '장갑',
            '장화',
            '개인 농기구 (선택)'
          ]
        },
        {
          id: 3,
          name: '귀농 체험 캠프',
          image: '/images/farming-camp.jpg',
          duration: '2박 3일',
          description: '귀농을 준비하는 분들을 위한 집중 교육 및 체험 프로그램입니다.',
          schedule: '매월 첫째주 금-일',
          price: '1인 200,000원',
          showDetails: false,
          activities: [
            '귀농 정책 설명회',
            '선배 귀농인과의 대화',
            '실전 농사 체험',
            '농지 선정 요령',
            '작물 선택과 재배 계획'
          ],
          preparations: [
            '세면도구',
            '작업복',
            '필기도구',
            '장갑',
            '우의'
          ]
        }
      ]
    }
  }
}
</script> 