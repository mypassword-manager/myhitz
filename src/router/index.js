import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/public/Landing.vue') },
      { path: 'about', component: () => import('@/pages/public/About.vue') },
      { path: 'contact', component: () => import('@/pages/public/Contact.vue') },
      { path: 'privacy', component: () => import('@/pages/public/Privacy.vue') },
      { path: 'terms', component: () => import('@/pages/public/Terms.vue') }
    ]
  },
  { path: '/login', component: () => import('@/pages/public/Login.vue') },
  { path: '/register', component: () => import('@/pages/public/Register.vue') },
  {
    path: '/app',
    component: () => import('@/layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('@/pages/app/Home.vue') },
      { path: 'search', component: () => import('@/pages/app/Search.vue') },
      { path: 'liked', component: () => import('@/pages/app/Liked.vue') },
      { path: 'downloads', component: () => import('@/pages/app/Downloads.vue') },
      { path: 'dashboard', component: () => import('@/pages/app/Dashboard.vue') },
      { path: 'settings', component: () => import('@/pages/app/Settings.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHashHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
