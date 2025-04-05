import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    villageInfo: {
      title: '화순군 백운마을',
      subtitle: '귀농의 꿈을 실현하는 첫걸음',
      description: '전라남도 화순군에 위치한 백운마을은 청정한 자연환경과 풍부한 농업 자원을 보유한 전통 마을입니다. 사계절 아름다운 경관과 함께 다양한 작물 재배가 가능하며, 귀농을 꿈꾸는 도시민들에게 실제 농촌 생활을 체험할 수 있는 기회를 제공합니다.',
      details: [
        { icon: 'mdi-map-marker', text: '위치: 전라남도 화순군 백운면' },
        { icon: 'mdi-thermometer', text: '연평균 기온: 13.5°C' },
        { icon: 'mdi-sprout', text: '주요 작물: 벼, 고추, 감자, 배추' }
      ]
    },
    programs: [
      {
        title: '1일 농사 체험',
        description: '하루 동안 실제 농사일을 체험해보며 귀농 생활을 미리 경험해볼 수 있습니다.',
        tags: ['일일체험', '농사체험', '초보자환영']
      },
      {
        title: '주말 귀농 학교',
        description: '주말을 이용해 2박 3일 동안 농촌 생활을 배우고 체험하는 프로그램입니다.',
        tags: ['주말프로그램', '숙박포함', '교육형']
      },
      {
        title: '장기 체류 프로그램',
        description: '1개월 이상 장기 체류하며 실제 귀농을 준비하는 심화 프로그램입니다.',
        tags: ['장기체류', '심화과정', '귀농준비']
      }
    ],
    newsItems: [
      {
        title: '2024년 상반기 귀농 체험 프로그램 모집',
        date: '2024.01.15',
        description: '올해 상반기 귀농 체험 프로그램 참가자를 모집합니다. 다양한 프로그램이 준비되어 있으니 많은 관심 바랍니다.'
      },
      {
        title: '백운마을 특산물 품평회 개최',
        date: '2024.01.10',
        description: '지난 주말 개최된 백운마을 특산물 품평회에서 우수한 품질의 농산물이 선보였습니다.'
      },
      {
        title: '스마트팜 교육장 개설',
        date: '2024.01.05',
        description: '최신 농업 기술을 배울 수 있는 스마트팜 교육장이 백운마을에 새롭게 개설되었습니다.'
      }
    ]
  })
}) 