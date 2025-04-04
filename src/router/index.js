import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PrepareView from '@/views/PrepareView.vue'
import RegionsView from '@/views/RegionsView.vue'
import SuccessStoriesView from '@/views/SuccessStoriesView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/prepare',
      name: 'prepare',
      component: PrepareView
    },
    {
      path: '/regions',
      name: 'regions',
      component: RegionsView
    },
    {
      path: '/success-stories',
      name: 'success-stories',
      component: SuccessStoriesView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router 