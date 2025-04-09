<template>
  <v-card variant="outlined" class="news-card">
    <v-card-text>
      <div class="d-flex align-center mb-4">
        <div class="text-h6 font-weight-medium">{{ title }}</div>
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          color="primary"
          :href="link"
          target="_blank"
          class="text-none"
        >
          자세히 보기
          <v-icon class="ms-1">mdi-open-in-new</v-icon>
        </v-btn>
      </div>

      <v-list lines="two">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :href="item.link"
          target="_blank"
          class="mb-2"
        >
          <template v-slot:prepend>
            <v-icon color="primary" class="me-2">mdi-newspaper</v-icon>
          </template>
          
          <v-list-item-title class="text-subtitle-1 mb-1">
            {{ item.title }}
          </v-list-item-title>
          
          <v-list-item-subtitle class="d-flex align-center text-caption">
            <span class="text-medium-emphasis">{{ formatDate(item.pubDate) }}</span>
            <v-divider vertical class="mx-2"></v-divider>
            <span class="text-medium-emphasis">{{ item.author }}</span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
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
    }
  },
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
  height: 100%;
  border-radius: 0;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style> 