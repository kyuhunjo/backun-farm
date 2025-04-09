export const VILLAGE_MENU = {
  title: '마을 소개',
  icon: 'mdi-home-city',
  items: [
    { title: '마을 역사', to: '/village/history', icon: 'mdi-history' },
    { title: '찾아오시는 길', to: '/village/location', icon: 'mdi-map-marker' },
    { title: '특산물', to: '/village/specialties', icon: 'mdi-store' }
  ]
}

export const FARMING_MENU = {
  title: '농사 방법',
  icon: 'mdi-sprout',
  items: [
    { title: '고사리 농사', to: '/farming/fern', icon: 'mdi-sprout' },
    { title: '더덕 농사', to: '/farming/deodeok', icon: 'mdi-flower' },
    { title: '곶감 가공', to: '/farming/persimmon', icon: 'mdi-fruit-cherries' }
  ]
}

export const MAIN_MENU = [
  {
    title: '로컬푸드 직판매 정보',
    to: '/stores',
    icon: 'mdi-store'
  },
  {
    title: '전라남도 대기질 현황',
    to: '/air-quality',
    icon: 'mdi-weather-dust'
  },
  {
    title: '농림축산식품부 뉴스',
    to: '/news',
    icon: 'mdi-newspaper'
  }
] 