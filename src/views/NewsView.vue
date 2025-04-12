<template>
  <div class="news-view">
    <v-container class="py-4">
      <v-row>
        <v-col cols="12">
          <div class="news-container">
            <NewsCard
              v-if="newsData"
              :title="newsData.title"
              :link="newsData.link"
              :items="newsData.items"
              :is-loading="isLoading"
              :class="{ 'refresh-animation': isLoading }"
              @refresh="fetchNews"
            />
            <v-skeleton-loader
              v-else
              type="card-avatar, article, actions"
              :loading="isLoading"
              class="mt-4"
            ></v-skeleton-loader>
          </div>
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
      isLoading,
      fetchNews
    };
  }
};
</script>

<style scoped>
.news-view {
  min-height: 100vh;
  background-color: rgb(var(--v-theme-grey-lighten-4));
}

.news-container {
  max-width: 1600px;
  margin: 0 auto;
}

.refresh-animation {
  transition: all 0.3s ease;
  opacity: 0.7;
}
</style> 