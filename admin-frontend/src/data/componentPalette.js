export const componentPalette = [
  {
    label: '框架 & 英雄区块',
    value: 'hero',
    items: [
      {
        key: 'HeroCarousel',
        label: 'HeroCarousel',
        desc: '首页焦点大图轮播',
        source: 'frontend/src/components/HeroCarousel.vue',
        icon: 'Tickets',
        navigationType: 'carousel',  // 轮播图统一配置
      },
      {
        key: 'SectionHero',
        label: 'SectionHero',
        desc: '分区级英雄横幅',
        source: 'frontend/src/components/sections/SectionHero.vue',
        icon: 'Flag',
        navigationType: 'single-button',  // 单个按钮
      },
      {
        key: 'PageHero',
        label: 'PageHero',
        desc: '内页头图 + 描述',
        source: 'frontend/src/components/PageHero.vue',
        icon: 'Reading',
        navigationType: 'single-button',  // 单个按钮
      },
    ],
  },
  {
    label: '导航 & 结构',
    value: 'navigation',
    items: [
      {
        key: 'MainHeader',
        label: 'MainHeader',
        desc: '顶栏导航与语言切换',
        source: 'frontend/src/components/MainHeader.vue',
        icon: 'Menu',
        navigationType: 'nav-items',  // 导航项
      },
      {
        key: 'TabsNav',
        label: 'TabsNav',
        desc: '横向标签导航',
        source: 'frontend/src/components/sections/TabsNav.vue',
        icon: 'Collection',
        navigationType: 'nav-items',  // 导航项
      },
      {
        key: 'BreadcrumbHeader',
        label: 'BreadcrumbHeader',
        desc: '面包屑 + 标题说明',
        source: 'frontend/src/components/sections/BreadcrumbHeader.vue',
        icon: 'Suitcase',
        navigationType: 'nav-items',  // 导航项（可选跳转）
      },
      {
        key: 'TopLinksBar',
        label: 'TopLinksBar',
        desc: '顶部快速链接条',
        source: 'frontend/src/components/TopLinksBar.vue',
        icon: 'Link',
        navigationType: 'nav-items',  // 导航项
      },
      {
        key: 'MultiLevelMenu',
        label: 'MultiLevelMenu',
        desc: '多级下拉导航菜单',
        source: 'frontend/src/components/MultiLevelMenu.vue',
        icon: 'Menu',
        navigationType: 'nav-items',  // 导航项
      },
      {
        key: 'SearchBox',
        label: 'SearchBox',
        desc: '搜索框组件',
        source: 'frontend/src/components/sections/SearchBox.vue',
        icon: 'Search',
      },
    ],
  },
  {
    label: '内容展示',
    value: 'content',
    items: [
      {
        key: 'InfoCardGrid',
        label: 'InfoCardGrid',
        desc: '多列信息卡片组',
        source: 'frontend/src/components/InfoCardGrid.vue',
        icon: 'Grid',
        navigationType: 'card-grid',  // 卡片网格（支持统一+单独覆盖）
      },
      {
        key: 'FocusGrid',
        label: 'FocusGrid',
        desc: '特色专题集合',
        source: 'frontend/src/components/FocusGrid.vue',
        icon: 'Histogram',
        navigationType: 'card-grid',  // 卡片网格（支持统一+单独覆盖）
      },
      {
        key: 'ContentSplit',
        label: 'ContentSplit',
        desc: '左右图文条幅',
        source: 'frontend/src/components/sections/ContentSplit.vue',
        icon: 'SetUp',
        navigationType: 'single-button',  // 单个按钮
      },
      {
        key: 'TextImageSection',
        label: 'TextImageSection',
        desc: '图文穿插段落',
        source: 'frontend/src/components/TextImageSection.vue',
        icon: 'PictureFilled',
      },
      {
        key: 'CardGrid',
        label: 'CardGrid',
        desc: '基础卡片宫格',
        source: 'frontend/src/components/sections/CardGrid.vue',
        icon: 'Tickets',
        navigationType: 'card-grid',  // 卡片网格（支持统一+单独覆盖）
      },
    ],
  },
  {
    label: '数据 & 公告',
    value: 'data',
    items: [
      {
        key: 'DataTable',
        label: 'DataTable',
        desc: '可配置表格展示',
        source: 'frontend/src/components/sections/DataTable.vue',
        icon: 'List',
      },
      {
        key: 'NoticeList',
        label: 'NoticeList',
        desc: '公告/动态列表',
        source: 'frontend/src/components/sections/NoticeList.vue',
        icon: 'Document',
        navigationType: 'list-detail',  // 列表详情页
      },
      {
        key: 'StatisticsBar',
        label: 'StatisticsBar',
        desc: '关键指标统计条',
        source: 'frontend/src/components/sections/StatisticsBar.vue',
        icon: 'PieChart',
      },
      {
        key: 'ProgressSteps',
        label: 'ProgressSteps',
        desc: '阶段进度展示',
        source: 'frontend/src/components/sections/ProgressSteps.vue',
        icon: 'Guide',
      },
      {
        key: 'TimelineHorizontal',
        label: 'TimelineHorizontal',
        desc: '横向时间轴',
        source: 'frontend/src/components/sections/TimelineHorizontal.vue',
        icon: 'Aim',
      },
      {
        key: 'NewsSection',
        label: 'NewsSection',
        desc: '新闻列表（焦点+条目）',
        source: 'frontend/src/components/NewsSection.vue',
        icon: 'Document',
        navigationType: 'list-detail',  // 列表详情页
      },
      {
        key: 'EventCalendar',
        label: 'EventCalendar',
        desc: '活动日历',
        source: 'frontend/src/components/sections/EventCalendar.vue',
        icon: 'Calendar',
      },
      {
        key: 'MediaLinks',
        label: 'MediaLinks',
        desc: '媒体报道链接聚合',
        source: 'frontend/src/components/sections/MediaLinks.vue',
        icon: 'Link',
      },
      {
        key: 'DownloadList',
        label: 'DownloadList',
        desc: '文件下载列表',
        source: 'frontend/src/components/sections/DownloadList.vue',
        icon: 'Download',
      },
    ],
  },
  {
    label: '互动 & 转化',
    value: 'engagement',
    items: [
      {
        key: 'CTABanner',
        label: 'CTABanner',
        desc: '行动召唤条',
        source: 'frontend/src/components/sections/CTABanner.vue',
        icon: 'Promotion',
        navigationType: 'single-button',  // 单个按钮
      },
      {
        key: 'SimpleForm',
        label: 'SimpleForm',
        desc: '简易反馈/报名表单',
        source: 'frontend/src/components/sections/SimpleForm.vue',
        icon: 'EditPen',
      },
      {
        key: 'ContactCard',
        label: 'ContactCard',
        desc: '联系方式卡片',
        source: 'frontend/src/components/sections/ContactCard.vue',
        icon: 'Phone',
      },
      {
        key: 'ServiceLinks',
        label: 'ServiceLinks',
        desc: '服务入口集合',
        source: 'frontend/src/components/ServiceLinks.vue',
        icon: 'Share',
        navigationType: 'card-grid',  // 卡片网格（支持统一+单独覆盖）
      },
      {
        key: 'PartnerLogoGrid',
        label: 'PartnerLogoGrid',
        desc: '合作伙伴展示',
        source: 'frontend/src/components/sections/PartnerLogoGrid.vue',
        icon: 'Briefcase',
      },
      {
        key: 'SocialMediaLinks',
        label: 'SocialMediaLinks',
        desc: '社交媒体链接',
        source: 'frontend/src/components/sections/SocialMediaLinks.vue',
        icon: 'Share',
      },
      {
        key: 'NotificationBanner',
        label: 'NotificationBanner',
        desc: '通知公告弹窗',
        source: 'frontend/src/components/sections/NotificationBanner.vue',
        icon: 'Bell',
      },
      {
        key: 'TagCloud',
        label: 'TagCloud',
        desc: '标签云组件',
        source: 'frontend/src/components/sections/TagCloud.vue',
        icon: 'CollectionTag',
      },
    ],
  },
  {
    label: '媒体 & 故事',
    value: 'media',
    items: [
      {
        key: 'EventSpotlight',
        label: 'EventSpotlight',
        desc: '重点活动推介',
        source: 'frontend/src/components/EventSpotlight.vue',
        icon: 'Calendar',
        navigationType: 'list-detail',  // 列表详情页
      },
      {
        key: 'ImageGallery',
        label: 'ImageGallery',
        desc: '瀑布流图集',
        source: 'frontend/src/components/sections/ImageGallery.vue',
        icon: 'Picture',
      },
      {
        key: 'TestimonialList',
        label: 'TestimonialList',
        desc: '口碑/推荐语',
        source: 'frontend/src/components/sections/TestimonialList.vue',
        icon: 'ChatLineSquare',
      },
      {
        key: 'AvatarCardGrid',
        label: 'AvatarCardGrid',
        desc: '人物/专家卡片',
        source: 'frontend/src/components/sections/AvatarCardGrid.vue',
        icon: 'UserFilled',
      },
      {
        key: 'VideoPlayer',
        label: 'VideoPlayer',
        desc: '视频播放组件',
        source: 'frontend/src/components/sections/VideoPlayer.vue',
        icon: 'VideoPlay',
      },
    ],
  },
  {
    label: '布局 & 结构',
    value: 'layout',
    items: [
      {
        key: 'Footer',
        label: 'Footer',
        desc: '页脚组件',
        source: 'frontend/src/components/Footer.vue',
        icon: 'Bottom',
      },
    ],
  },
]

export default componentPalette

