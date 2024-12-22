import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores'
import adminRouter from './adminRouter'
import frontendTheme from '@/layouts/vuetify/frontend/IndexTheme.vue'
import { loadLocaleDefaultMessages } from '@/plugins/Vue-i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: frontendTheme,

      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { auth: null }, // Accessible to all users
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView,
          meta: { auth: false }, // Accessible only to unauthenticated users
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
          meta: { auth: null }, // Accessible to all users
        },
      ],
    },
    ...adminRouter,
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const token = authStore.getUser()
  const authRequired = to.meta.auth
  // Load default locale (e.g., English)
  loadLocaleDefaultMessages()
  // If the route requires authentication
  if (authRequired === true && !token) {
    // Redirect to login if the user is not authenticated
    next({ name: 'login' })
  }
  // If the route is for unauthenticated users
  else if (authRequired === false && token) {
    // Redirect to about or home page if the user is already authenticated
    next({ name: 'admin.dashboard' })
  } else {
    // Allow navigation if no authentication is required or conditions are met
    next()
  }
})

export default router
