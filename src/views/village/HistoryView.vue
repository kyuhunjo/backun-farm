<template>
  <v-container>
    <h2 class="text-h4 font-heading mb-6">백운마을의 역사</h2>
    
    <v-timeline>
      <v-timeline-item
        dot-color="primary"
        size="small"
      >
        <template v-slot:opposite>
          <div class="text-h6 font-heading">1950년대</div>
        </template>
        <div class="text-body-1 font-body mb-4">
          백운마을의 시작. 화순군 백운면에 첫 정착민들이 모여 마을을 형성하기 시작했습니다.
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="primary"
        size="small"
      >
        <template v-slot:opposite>
          <div class="text-h6 font-heading">1970년대</div>
        </template>
        <div class="text-body-1 font-body mb-4">
          농업 중심의 마을로 발전. 쌀농사와 특용작물 재배를 통해 마을 경제가 성장했습니다.
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="primary"
        size="small"
      >
        <template v-slot:opposite>
          <div class="text-h6 font-heading">1990년대</div>
        </template>
        <div class="text-body-1 font-body mb-4">
          친환경 농업으로의 전환. 마을 전체가 친환경 농법을 도입하여 건강한 농산물 생산에 주력했습니다.
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="primary"
        size="small"
      >
        <template v-slot:opposite>
          <div class="text-h6 font-heading">2010년대</div>
        </template>
        <div class="text-body-1 font-body mb-4">
          귀농귀촌 1번지로 성장. 도시를 떠나 새로운 삶을 찾는 이들의 정착지로 각광받기 시작했습니다.
        </div>
      </v-timeline-item>

      <v-timeline-item
        dot-color="primary"
        size="small"
      >
        <template v-slot:opposite>
          <div class="text-h6 font-heading">현재</div>
        </template>
        <div class="text-body-1 font-body">
          전통과 현대가 조화를 이루는 마을로 발전. 귀농체험 프로그램을 통해 도시민들에게 농촌의 가치를 전파하고 있습니다.
        </div>
      </v-timeline-item>
    </v-timeline>

    <v-card class="mt-8" elevation="1">
      <v-card-text class="font-body">
        <p class="text-body-1">
          백운마을은 화순군의 대표적인 농촌마을로, 70여 년의 역사를 자랑합니다.
          전통적인 농업 방식을 계승하면서도 현대적인 기술을 접목하여 지속 가능한 농업을 실천하고 있습니다.
        </p>
        <p class="text-body-1 mt-4">
          특히 2010년대 이후로는 귀농귀촌 1번지로 알려지면서, 많은 도시민들이 새로운 삶의 터전으로 선택하고 있습니다.
          마을 주민들의 따뜻한 환대와 체계적인 정착 지원 시스템을 통해 성공적인 귀농 사례를 만들어가고 있습니다.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'HistoryView'
}
</script> 