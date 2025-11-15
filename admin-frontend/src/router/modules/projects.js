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
    path: 'projects/:projectId/pages/:pageId',
    name: 'pageBuilder',
    component: () => import('../../pages/projects/PageBuilder.vue'),
    meta: {
      title: '页面搭建',
      hidden: true,
    },
  },
]

