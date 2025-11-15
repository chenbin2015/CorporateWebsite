import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'routes.home',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutPage.vue'),
    meta: {
      title: 'routes.about',
    },
  },
  {
    path: '/colleges',
    name: 'colleges',
    component: () => import('../views/CollegesPage.vue'),
    meta: {
      title: 'routes.colleges',
    },
  },
  {
    path: '/faculty',
    name: 'faculty',
    component: () => import('../views/FacultyPage.vue'),
    meta: {
      title: 'routes.faculty',
    },
  },
  {
    path: '/education',
    name: 'education',
    component: () => import('../views/EducationPage.vue'),
    meta: {
      title: 'routes.education',
    },
  },
  {
    path: '/research',
    name: 'research',
    component: () => import('../views/ResearchPage.vue'),
    meta: {
      title: 'routes.research',
    },
  },
  {
    path: '/admissions',
    name: 'admissions',
    component: () => import('../views/AdmissionsPage.vue'),
    meta: {
      title: 'routes.admissions',
    },
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/LibraryPage.vue'),
    meta: {
      title: 'routes.library',
    },
  },
  {
    path: '/style-guide',
    name: 'styleGuide',
    component: () => import('../views/ComponentsShowcase.vue'),
    meta: {
      title: 'routes.styleGuide',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const langTitle = to.meta?.title
  if (!langTitle) {
    return
  }

  document.title = window.i18n?.global?.t?.(langTitle) ?? document.title
})

export default router

