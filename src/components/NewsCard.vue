<template>
  <div>
    <div class="d-flex flex-column mb-6">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <h2 class="text-h5 font-weight-bold mb-0">농림축산식품부 뉴스</h2>
        </div>
        <div class="d-flex align-center">
          <v-btn
            prepend-icon="mdi-refresh"
            color="grey"
            variant="tonal"
            class="me-2"
            :loading="isLoading"
            @click="$emit('refresh')"
          >
            새로고침
          </v-btn>
          <v-btn
            :href="link"
            target="_blank"
            prepend-icon="mdi-open-in-new"
            color="primary"
            variant="tonal"
          >
            더보기
          </v-btn>
        </div>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis mb-0">
        농림축산식품부의 최신 소식을 확인할 수 있습니다.
      </p>
    </div>

    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          variant="outlined"
          class="h-100 d-flex flex-column news-card"
          :href="item.link"
          target="_blank"
        >
          <div class="flex-grow-1">
            <v-card-item>
              <div class="d-flex mb-2">
                <v-icon
                  color="primary"
                  icon="mdi-newspaper"
                  class="me-2 mt-1"
                  size="20"
                ></v-icon>
                <div class="text-subtitle-1 font-weight-medium">{{ item.title }}</div>
              </div>
            </v-card-item>
          </div>

          <div class="mt-auto">
            <v-divider></v-divider>
            <v-card-text class="pt-3">
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ formatDate(item.pubDate) }}</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="small" color="grey-darken-1" class="me-2">mdi-account</v-icon>
                  <span class="text-body-2">{{ item.author || '농림축산식품부' }}</span>
                </div>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['refresh'],
  setup() {
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    return {
      formatDate
    };
  }
};
</script>

<style scoped>
.news-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid rgba(var(--v-border-color), 0.12);
  background-color: rgb(var(--v-theme-surface));
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border-color: rgb(var(--v-theme-primary));
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  height: 2.8em;
}
</style> 