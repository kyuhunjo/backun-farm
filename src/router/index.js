import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VillageInfoView from '../views/village/VillageInfoView.vue'
import FarmingExperienceView from '../views/farming/FarmingExperienceView.vue'
import CommunityView from '../views/CommunityView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(),
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
      name: 'farming',
      component: FarmingExperienceView,
      children: [
        {
          path: 'programs',
          name: 'farming-programs',
          component: () => import('@/views/farming/ProgramsView.vue')
        },
        {
          path: 'prepare',
          name: 'farming-prepare',
          component: () => import('@/views/farming/PrepareView.vue')
        },
        {
          path: 'success-stories',
          name: 'farming-success-stories',
          component: () => import('@/views/farming/SuccessStoriesView.vue')
        }
      ]
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router 