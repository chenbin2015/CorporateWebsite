export const dashboardRoutes = [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('../../pages/dashboard/DashboardView.vue'),
    meta: {
      title: '仪表盘',
      icon: 'home',
    },
  },
]

