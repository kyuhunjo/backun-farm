<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">백운마을 특산물</h2>

    <v-row>
      <v-col cols="12" md="4" v-for="product in products" :key="product.id">
        <v-card elevation="1">
          <v-img
            :src="product.image"
            height="200"
            cover
          ></v-img>
          <v-card-title class="text-h5 font-heading">{{ product.name }}</v-card-title>
          <v-card-subtitle class="font-body">{{ product.season }}</v-card-subtitle>
          <v-card-text class="font-body">
            <p class="text-body-1">{{ product.description }}</p>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex align-center justify-space-between">
              <div class="text-body-2">판매 시기: {{ product.availability }}</div>
              <v-chip color="primary" class="font-body">{{ product.price }}</v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              class="font-body"
              @click="product.showDetails = !product.showDetails"
            >
              자세히 보기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="product.showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="product.showDetails = !product.showDetails"
            ></v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="product.showDetails">
              <v-divider></v-divider>
              <v-card-text class="font-body">
                <v-list density="compact">
                  <v-list-item v-for="(detail, index) in product.details" :key="index">
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-check</v-icon>
                    </template>
                    <v-list-item-title class="font-body">{{ detail }}</v-list-item-title>
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
        구매 및 문의
      </v-card-title>
      <v-card-text class="font-body">
        <p class="text-body-1">
          백운마을의 특산물은 직거래를 원칙으로 하며, 신선도 유지를 위해 당일 수확 후 배송됩니다.
          대량 구매나 직접 방문 구매를 원하시는 경우 아래 연락처로 문의해 주시기 바랍니다.
        </p>
        <v-list density="compact" class="mt-4">
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
            <v-list-item-title class="font-body">market@baekun.kr</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SpecialtiesView',
  data() {
    return {
      products: [
        {
          id: 1,
          name: '백운쌀',
          image: '/images/rice.jpg',
          season: '가을 수확',
          description: '맑은 공기와 깨끗한 물로 재배한 백운마을의 대표 특산물입니다.',
          availability: '10월 ~ 12월',
          price: '40kg 기준 180,000원',
          showDetails: false,
          details: [
            '친환경 인증 농법으로 재배',
            '백운산의 맑은 물로 재배',
            '밥맛이 좋고 찰기가 뛰어남',
            '진공 포장으로 신선도 유지'
          ]
        },
        {
          id: 2,
          name: '백운고구마',
          image: '/images/sweet-potato.jpg',
          season: '가을 수확',
          description: '단맛이 뛰어나고 영양이 풍부한 백운마을 고구마입니다.',
          availability: '9월 ~ 11월',
          price: '10kg 기준 30,000원',
          showDetails: false,
          details: [
            '무농약 재배',
            '단맛이 뛰어난 호박고구마',
            '찐고구마, 군고구마용으로 적합',
            '저온 저장으로 신선도 유지'
          ]
        },
        {
          id: 3,
          name: '백운도라지',
          image: '/images/bellflower.jpg',
          season: '봄 수확',
          description: '3년 이상 재배한 약용 도라지로 약효가 뛰어납니다.',
          availability: '3월 ~ 5월',
          price: '1kg 기준 50,000원',
          showDetails: false,
          details: [
            '3년 이상 재배',
            '산지 직송 판매',
            '약용 및 식용으로 사용 가능',
            '진공 포장으로 장기 보관 가능'
          ]
        }
      ]
    }
  }
}
</script> 