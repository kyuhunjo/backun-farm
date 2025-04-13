import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('../views/StoreListView.vue')
    },
    {
      path: '/air-quality',
      name: 'air-quality',
      component: () => import('../views/AirQualityView.vue')
    },
    {
      path: '/facilities',
      name: 'facilities',
      component: () => import('../views/FacilitiesView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
      meta: {
        title: '농림축산식품부 뉴스'
      }
    },
    {
      path: '/helpers',
      name: 'helpers',
      component: () => import('@/views/HelpersView.vue'),
      meta: {
        title: '일손 모집'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router 