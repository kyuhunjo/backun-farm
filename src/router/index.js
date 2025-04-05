import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VillageInfoView from '../views/village/VillageInfoView.vue'
import FarmingMethodsView from '../views/farming/FarmingMethodsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/village',
      name: 'village',
      component: VillageInfoView,
      children: [
        {
          path: 'history',
          name: 'village-history',
          component: () => import('@/views/village/HistoryView.vue')
        },
        {
          path: 'location',
          name: 'village-location',
          component: () => import('@/views/village/LocationView.vue')
        },
        {
          path: 'specialties',
          name: 'village-specialties',
          component: () => import('@/views/village/SpecialtiesView.vue')
        }
      ]
    },
    {
      path: '/farming',
      component: FarmingMethodsView,
      children: [
        {
          path: '',
          name: 'farming',
          redirect: '/farming/fern'
        },
        {
          path: 'fern',
          name: 'farming-fern',
          component: () => import('@/views/farming/FernMethodView.vue')
        },
        {
          path: 'deodeok',
          name: 'farming-deodeok',
          component: () => import('@/views/farming/DeodeokMethodView.vue')
        },
        {
          path: 'persimmon',
          name: 'farming-persimmon',
          component: () => import('@/views/farming/PersimmonMethodView.vue')
        }
      ]
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