import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '../layouts/BasicLayout.vue'
import { dashboardRoutes } from './modules/dashboard'
import { projectRoutes } from './modules/projects'

// 从项目路由中分离出预览路由
const previewRoute = projectRoutes.find(route => route.name === 'pagePreview')
const otherProjectRoutes = projectRoutes.filter(route => route.name !== 'pagePreview')

const appChildren = [...dashboardRoutes, ...otherProjectRoutes]

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
  // 预览页面独立配置，不使用 BasicLayout（完整路径）
  {
    path: `/${previewRoute.path}`,
    name: previewRoute.name,
    component: previewRoute.component,
    meta: { 
      ...previewRoute.meta,
      public: false, // 仍然需要登录，但不使用布局
    },
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

