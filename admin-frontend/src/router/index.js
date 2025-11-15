import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '../layouts/BasicLayout.vue'
import { dashboardRoutes } from './modules/dashboard'
import { projectRoutes } from './modules/projects'

const appChildren = [...dashboardRoutes, ...projectRoutes]

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/auth/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '', redirect: { name: 'dashboard' } },
      ...appChildren,
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../pages/NotFound.vue'),
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to, _from, next) => {
  const isPublic = to.meta?.public
  const token = localStorage.getItem('admin_token')

  if (!isPublic && !token) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router

