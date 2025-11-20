import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '../layouts/BasicLayout.vue'
import { dashboardRoutes } from './modules/dashboard'
import { projectRoutes } from './modules/projects'

// 从项目路由中分离出预览路由和运行态路由（都不使用 BasicLayout）
const previewRoute = projectRoutes.find(route => route.name === 'pagePreview')
const runtimeRoute = projectRoutes.find(route => route.name === 'runtimePage')
const otherProjectRoutes = projectRoutes.filter(route => route.name !== 'pagePreview' && route.name !== 'runtimePage')

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
  // 运行态页面独立配置，不使用 BasicLayout（完整路径）
  ...(runtimeRoute ? [{
    path: `/${runtimeRoute.path}`,
    name: runtimeRoute.name,
    component: runtimeRoute.component,
    meta: { 
      ...runtimeRoute.meta,
      public: false, // 仍然需要登录，但不使用布局
    },
  }] : []),
  // 详情页路由（用于预览页面跳转）
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: () => import('../pages/templates/NewsDetail.vue'),
    meta: { public: false },
  },
  {
    path: '/events/:id',
    name: 'eventDetail',
    component: () => import('../pages/templates/EventDetail.vue'),
    meta: { public: false },
  },
  {
    path: '/notices/:id',
    name: 'noticeDetail',
    component: () => import('../pages/templates/NoticeDetail.vue'),
    meta: { public: false },
  },
  {
    path: '/focus/:id',
    name: 'focusDetail',
    component: () => import('../pages/templates/FocusDetail.vue'),
    meta: { public: false },
  },
  {
    path: '/products/:id',
    name: 'productDetail',
    component: () => import('../pages/templates/ProductDetail.vue'),
    meta: { public: false },
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

