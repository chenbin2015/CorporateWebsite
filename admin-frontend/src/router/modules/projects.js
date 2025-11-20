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
    path: 'projects/:code/edit',
    name: 'projectEdit',
    component: () => import('../../pages/projects/ProjectCreate.vue'),
    meta: {
      title: '编辑项目',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/pages/create',
    name: 'pageCreate',
    component: () => import('../../pages/projects/PageCreate.vue'),
    meta: {
      title: '创建页面',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/pages/:code/edit',
    name: 'pageEdit',
    component: () => import('../../pages/projects/PageCreate.vue'),
    meta: {
      title: '编辑页面',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/design/pages/:pageCode',
    name: 'pageBuilder',
    component: () => import('../../pages/projects/PageBuilder.vue'),
    meta: {
      title: '页面搭建',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/preview/pages/:pageCode',
    name: 'pagePreview',
    component: () => import('../../pages/projects/PagePreview.vue'),
    meta: {
      title: '页面预览',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/runtime/pages/:pageCode',
    name: 'runtimePage',
    component: () => import('../../pages/projects/PagePreview.vue'), // 复用预览组件，但使用运行态数据
    meta: {
      title: '运行态页面',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/pages',
    name: 'pageList',
    component: () => import('../../pages/projects/PageList.vue'),
    meta: {
      title: '页面管理',
      hidden: true,
    },
  },
  {
    path: 'projects/:projectCode/settings',
    name: 'projectSettings',
    component: () => import('../../pages/projects/ProjectSettings.vue'),
    meta: {
      title: '项目设置',
      hidden: true,
    },
  },
]

