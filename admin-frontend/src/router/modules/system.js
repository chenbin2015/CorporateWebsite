export const systemRoutes = [
  {
    path: 'system/users',
    name: 'userManagement',
    component: () => import('../../pages/system/UserManagement.vue'),
    meta: {
      title: '用户管理',
      icon: 'user',
    },
  },
  {
    path: 'system/logs',
    name: 'logQuery',
    component: () => import('../../pages/system/LogQuery.vue'),
    meta: {
      title: '日志查询',
      icon: 'document',
    },
  },
]

