import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/stores", name: "stores", component: () => import("../views/StoreListView.vue") },
    { path: "/air-quality", name: "air-quality", component: () => import("../views/AirQualityView.vue") },
    { path: "/facilities", name: "facilities", component: () => import("../views/FacilitiesView.vue") },
    { path: "/demographics", name: "demographics", component: () => import("../views/DemographicsView.vue") }
  ]
})

export default router
