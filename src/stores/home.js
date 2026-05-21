import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    villageInfo: {
      title: '빛고을 로컬마켓',
      subtitle: '공공데이터로 여는 광주 로컬 정보 플랫폼',
      description: '광주광역시 로컬푸드 및 생활정보를 통합 제공하는 플랫폼입니다. 공공데이터 기반의 로컬푸드 매장 정보, 실시간 날씨/대기질, 복지시설 등 생활정보를 한 곳에서 확인할 수 있습니다.',
      details: [
        { icon: 'mdi-map-marker', text: '위치: 광주광역시' },
        { icon: 'mdi-thermometer', text: '연평균 기온: 14.1°C' },
        { icon: 'mdi-sprout', text: '주요 서비스: 로컬푸드 매장, 날씨, 대기질, 복지시설' }
      ]
    },
    programs: [
      {
        title: '로컬푸드 직매장 현황',
        description: '광주광역시 내 로컬푸드 직매장 위치, 운영시간, 취급품목 정보를 제공합니다.',
        tags: ['핵심기능', '로컬푸드', '공공데이터']
      },
      {
        title: '실시간 날씨 및 대기질',
        description: '광주 지역 실시간 날씨, 대기질 정보를 한눈에 확인할 수 있습니다.',
        tags: ['지역정보', '실시간날씨', '대기질정보']
      },
      {
        title: '생활 인프라 정보',
        description: '광주 관내 복지시설, 의료기관 등 생활 인프라 정보를 제공합니다.',
        tags: ['매장검색', '생활인프라', '통합플랫폼']
      }
    ],
    newsItems: [
      {
        title: '서비스 오픈 안내',
        date: '2025.01.15',
        description: '빛고을 로컬마켓 서비스가 오픈했습니다. 다양한 프로그램이 준비되어 있으니 많은 관심 바랍니다.'
      },
      {
        title: '빛고을 로컬마켓 오픈',
        date: '2025.01.10',
        description: '지난 주말 개최된 빛고을 로컬마켓 특산물 품평회에서 우수한 품질의 농산물이 선보였습니다.'
      },
      {
        title: '로컬푸드 매장 정보 업데이트',
        date: '2025.01.05',
        description: '신규 로컬푸드 직매장 정보가 빛고을 로컬마켓에 새롭게 개설되었습니다.'
      }
    ]
  })
}) 