<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6 font-heading">백운마을 특산물</h1>
        <p class="text-body-1 mb-8">
          백운마을은 청정한 자연환경에서 정성껏 키운 농산물로 유명합니다. 
          우리 마을의 대표 특산물을 소개합니다.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <!-- 고구마 -->
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-img
            src="/images/specialties/sweet-potato.jpg"
            height="200"
            cover
            class="align-end"
          >
            <v-card-title class="text-white bg-black bg-opacity-50">
              백운 고구마
            </v-card-title>
          </v-img>

          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6">
                <div class="text-subtitle-1 mb-1">수확시기</div>
                <div class="text-body-2 mb-2">9월 ~ 10월</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1 mb-1">보관방법</div>
                <div class="text-body-2 mb-2">서늘한 곳 보관</div>
              </v-col>
            </v-row>
            <p class="text-body-2 mt-4">
              백운마을의 대표 특산물인 고구마는 모래와 점토가 적절히 섞인 토양에서 재배되어 
              단맛이 풍부하고 식감이 부드럽습니다.
            </p>
          </v-card-text>

          <v-expand-transition>
            <div v-show="showDetails">
              <v-divider></v-divider>
              <v-card-text>
                <div class="text-subtitle-1 mb-2">상품 정보</div>
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check"></v-icon>
                    </template>
                    <v-list-item-title>특상 5kg: 25,000원</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check"></v-icon>
                    </template>
                    <v-list-item-title>상품 10kg: 40,000원</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>

          <v-card-actions>
            <v-btn variant="text" @click="showDetails = !showDetails">
              상세정보
              <v-icon>{{ showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="tonal" @click="openInquiryDialog">
              구매문의
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- 표고버섯 -->
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-img
            src="/images/specialties/mushroom.jpg"
            height="200"
            cover
            class="align-end"
          >
            <v-card-title class="text-white bg-black bg-opacity-50">
              백운 표고버섯
            </v-card-title>
          </v-img>

          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6">
                <div class="text-subtitle-1 mb-1">수확시기</div>
                <div class="text-body-2 mb-2">연중</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1 mb-1">보관방법</div>
                <div class="text-body-2 mb-2">냉장보관</div>
              </v-col>
            </v-row>
            <p class="text-body-2 mt-4">
              참나무 원목에서 자연 재배한 표고버섯으로, 향이 진하고 
              영양이 풍부합니다.
            </p>
          </v-card-text>

          <v-expand-transition>
            <div v-show="showDetails2">
              <v-divider></v-divider>
              <v-card-text>
                <div class="text-subtitle-1 mb-2">상품 정보</div>
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check"></v-icon>
                    </template>
                    <v-list-item-title>생표고 1kg: 20,000원</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check"></v-icon>
                    </template>
                    <v-list-item-title>건표고 500g: 35,000원</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>

          <v-card-actions>
            <v-btn variant="text" @click="showDetails2 = !showDetails2">
              상세정보
              <v-icon>{{ showDetails2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="tonal" @click="openInquiryDialog">
              구매문의
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- 곶감 -->
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-img
            src="/images/specialties/dried-persimmon.jpg"
            height="200"
            cover
            class="align-end"
          >
            <v-card-title class="text-white bg-black bg-opacity-50">
              백운 곶감
            </v-card-title>
          </v-img>

          <v-card-text>
            <v-row no-gutters>
              <v-col cols="6">
                <div class="text-subtitle-1 mb-1">수확시기</div>
                <div class="text-body-2 mb-2">11월 ~ 12월</div>
              </v-col>
              <v-col cols="6">
                <div class="text-subtitle-1 mb-1">보관방법</div>
                <div class="text-body-2 mb-2">냉동보관</div>
              </v-col>
            </v-row>
            <p class="text-body-2 mt-4">
              청정지역에서 재배한 고품질 곶감으로, 당도가 높고 
              쫄깃한 식감이 특징입니다.
            </p>
          </v-card-text>

          <v-expand-transition>
            <div v-show="showDetails3">
              <v-divider></v-divider>
              <v-card-text>
                <div class="text-subtitle-1 mb-2">상품 정보</div>
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check"></v-icon>
                    </template>
                    <v-list-item-title>특품 1kg (20개): 45,000원</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check"></v-icon>
                    </template>
                    <v-list-item-title>선물세트 2kg: 85,000원</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>

          <v-card-actions>
            <v-btn variant="text" @click="showDetails3 = !showDetails3">
              상세정보
              <v-icon>{{ showDetails3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="tonal" @click="openInquiryDialog">
              구매문의
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 구매 문의 다이얼로그 -->
    <v-dialog v-model="inquiryDialog" max-width="500">
      <v-card>
        <v-card-title>구매 문의</v-card-title>
        <v-card-text>
          <p class="mb-4">아래 연락처로 문의해 주시기 바랍니다.</p>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-phone"></v-icon>
              </template>
              <v-list-item-title>전화: 061-123-4567</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-email"></v-icon>
              </template>
              <v-list-item-title>이메일: market@baegun.kr</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="inquiryDialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const showDetails = ref(false)
const showDetails2 = ref(false)
const showDetails3 = ref(false)
const inquiryDialog = ref(false)

const openInquiryDialog = () => {
  inquiryDialog.value = true
}
</script>

<style scoped>
.font-heading {
  font-family: var(--font-heading) !important;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.v-card-title {
  font-family: var(--font-heading) !important;
}

.text-subtitle-1 {
  font-family: var(--font-body) !important;
  font-weight: 600;
}

.text-body-2 {
  font-family: var(--font-body) !important;
}
</style> 