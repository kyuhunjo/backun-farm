<template>
  <v-container>
    <h1 class="text-h3 mb-6">귀농 준비하기</h1>
    
    <v-timeline density="comfortable" align="start">
      <v-timeline-item
        v-for="(step, i) in steps"
        :key="i"
        :dot-color="step.color"
        size="small"
      >
        <template v-slot:opposite>
          <div class="text-h6">STEP {{ i + 1 }}</div>
        </template>
        <v-card>
          <v-card-title class="text-h6">
            {{ step.title }}
          </v-card-title>
          <v-card-text>
            {{ step.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="text"
              :color="step.color"
              @click="step.expanded = !step.expanded"
            >
              자세히 보기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="step.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="step.expanded = !step.expanded"
            ></v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="step.expanded">
              <v-divider></v-divider>
              <v-card-text>
                <ul>
                  <li v-for="(detail, j) in step.details" :key="j">
                    {{ detail }}
                  </li>
                </ul>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref([
  {
    title: '체험 프로그램 신청',
    description: '백운마을의 다양한 귀농 체험 프로그램 중 적합한 프로그램을 선택하여 신청합니다.',
    color: 'primary',
    expanded: false,
    details: [
      '프로그램 종류: 1일 체험, 주말 귀농 학교, 장기 체류 프로그램',
      '신청 방법: 온라인 신청 또는 전화 문의',
      '준비물: 작업복, 운동화, 세면도구 등',
      '숙박 시설: 마을 체험관 또는 농가 홈스테이'
    ]
  },
  {
    title: '현장 실습 및 교육',
    description: '선택한 프로그램에 따라 실제 농사 체험과 교육을 진행합니다.',
    color: 'success',
    expanded: false,
    details: [
      '기초 농업 기술 교육: 토양 관리, 작물 재배법, 농기계 사용법',
      '계절별 작물 재배 실습: 벼, 고추, 감자, 배추 등',
      '선도 농가 방문 및 멘토링',
      '지역 주민과의 교류 활동'
    ]
  },
  {
    title: '정착 준비',
    description: '백운마을 정착을 위한 구체적인 계획을 수립합니다.',
    color: 'info',
    expanded: false,
    details: [
      '백운마을 빈집 정보 확인',
      '농지 매입/임대 상담',
      '정부/지자체 지원 사업 신청',
      '마을 이장님과 상담'
    ]
  },
  {
    title: '실제 정착',
    description: '백운마을에서 새로운 농촌 생활을 시작합니다.',
    color: 'warning',
    expanded: false,
    details: [
      '주거지 정비 및 이사',
      '농지 개간 및 작물 선택',
      '마을 공동체 활동 참여',
      '로컬 푸드 직매장 입점 준비'
    ]
  }
])
</script> 