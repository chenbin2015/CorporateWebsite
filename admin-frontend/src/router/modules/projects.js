export const projectRoutes = [
  {
    path: 'projects',
    name: 'projects',
    component: () => import('../../pages/projects/ProjectList.vue'),
    meta: {
      title: '项目管理',
      icon: 'folder',
    },
  },
  {
    path: 'projects/create',
    name: 'projectCreate',
    component: () => import('../../pages/projects/ProjectCreate.vue'),
    meta: {
      title: '添加项目',
      icon: 'edit',
    },
  },
  {
    path: 'projects/:id/edit',
    name: 'projectEdit',
    component: () => import('../../pages/projects/ProjectCreate.vue'),
    meta: {
      title: '编辑项目',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectId/pages/create',
    name: 'pageCreate',
    component: () => import('../../pages/projects/PageCreate.vue'),
    meta: {
      title: '创建页面',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectId/pages/:id/edit',
    name: 'pageEdit',
    component: () => import('../../pages/projects/PageCreate.vue'),
    meta: {
      title: '编辑页面',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectId/pages/:pageId',
    name: 'pageBuilder',
    component: () => import('../../pages/projects/PageBuilder.vue'),
    meta: {
      title: '页面搭建',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectId/pages',
    name: 'pageList',
    component: () => import('../../pages/projects/PageList.vue'),
    meta: {
      title: '页面管理',
      hidden: true,
    },
  },
]

