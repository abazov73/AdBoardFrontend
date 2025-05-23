import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '@/views/Login.vue'
import Ads from '@/views/Ads.vue'
import Register from '@/views/Register.vue'
import AdsForm from '@/views/AdsForm.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  { path: '/login', component: Login},
  { path: '/ads', component: Ads, meta: { requiresAuth: true } },
  { path: '/ads/create', component: AdsForm, meta: { requiresAuth: true }},
  { path: '/profile', component: Profile, meta: { requiresAuth: true }},
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/ads')
  } else {
    next()
  }
})

export default router