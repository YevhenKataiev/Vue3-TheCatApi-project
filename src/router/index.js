import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Find',
      component: HomeView
    },
    {
      path: '/breeds',
      name: 'Breeds',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/upload',
      name: 'Share kitty',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/ErrorView.vue'),
    },
  ]
})

export default router
