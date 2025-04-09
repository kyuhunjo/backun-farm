<template>
  <div class="news-view">
    <v-container>
      <v-row>
        <v-col cols="12">
          <NewsCard
            v-if="newsData"
            :title="newsData.title"
            :link="newsData.link"
            :items="newsData.items"
            :class="{ 'refresh-animation': isLoading }"
          />
          <v-skeleton-loader
            v-else
            type="card"
            class="mt-4"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '@/composables/useApi';
import NewsCard from '@/components/NewsCard.vue';

export default {
  name: 'NewsView',
  components: {
    NewsCard
  },
  setup() {
    const { api } = useApi();
    const newsData = ref(null);
    const isLoading = ref(false);

    const fetchNews = async () => {
      try {
        isLoading.value = true;
        const response = await api.newsAPI.getNews();
        if (response.success) {
          newsData.value = response.data;
        } else {
          console.error('뉴스 데이터 조회 실패:', response.error);
        }
      } catch (error) {
        console.error('뉴스 데이터 조회 중 오류:', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchNews();
    });

    return {
      newsData,
      isLoading
    };
  }
};
</script>

<style scoped>
.news-view {
  min-height: 100vh;
  padding: 1rem 0;
  background-color: var(--v-background-base);
}

.refresh-animation {
  transition: all 0.3s ease;
  transform: scale(0.98);
}
</style> 