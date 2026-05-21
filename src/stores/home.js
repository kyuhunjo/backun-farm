import { defineStore } from "pinia"

export const useHomeStore = defineStore("home", {
  state: () => ({
    villageInfo: {
      title: "빛고을 로컬마켓",
      subtitle: "공공데이터로 여는 광주 로컬 정보 플랫폼",
      description: "광주광역시 로컬푸드 및 생활정보 통합 플랫폼",
      details: []
    },
    programs: [],
    newsItems: []
  })
})
