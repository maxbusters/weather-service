import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const routes = [
  {
    path: '/',
    alias: '/main',
    name: 'main',
    component: MainView,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
