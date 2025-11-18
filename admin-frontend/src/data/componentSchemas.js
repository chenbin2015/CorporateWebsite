export const componentSchemas = {
  HeroCarousel: {
    defaults: {
      items: [
        {
          title: '默认标题：打造高水平大学',
          description: '这是组件的默认介绍文案，可在调用组件时通过 props 覆盖。',
          category: '默认分类',
          action: '了解更多',
          href: '#',
          cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80',
        },
      ],
      interval: 5000,
      navigation: {
        type: 'none',
        targetPageCode: null, // 使用 code 替代 id
        path: null, // 页面路径，用于运行时跳转
        url: '',
        params: {},
      },
    },
    fields: [
      { prop: 'items', label: '轮播项', type: 'carousel-items' },
      { prop: 'interval', label: '自动播放间隔（毫秒）', type: 'number' },
      { prop: 'navigation', label: '跳转配置', type: 'navigation' },
    ],
  },
  FocusGrid: {
    defaults: {
      title: 'Highlights',
      items: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // items 数组结构与前台组件保持一致，这里暂不在表单中展开配置
    ],
  },
  SectionHero: {
    defaults: {
      title: '学院使命',
      description: '以创新驱动教学，以科研服务社会。',
      tag: '关于我们',
      actions: [],
      navigation: {
        type: 'none',
        targetPageCode: null, // 使用 code 替代 id
        path: null,  // 页面路径，用于运行时跳转
        url: '',
        params: {},
      },
    },
    fields: [
      { prop: 'tag', label: '角标文字', type: 'text' },
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'navigation', label: '跳转配置', type: 'navigation' },
    ],
  },
  CTABanner: {
    defaults: {
      title: '预约校园参观',
      description: '体验智慧校园解决方案与可视化搭建平台。',
      buttonText: '立即预约',
      navigation: {
        type: 'none',
        targetPageCode: null, // 使用 code 替代 id
        path: null,  // 页面路径，用于运行时跳转
        url: '',
        params: {},
      },
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'buttonText', label: '按钮文案', type: 'text' },
      { prop: 'navigation', label: '跳转配置', type: 'navigation' },
    ],
  },
  PageHero: {
    defaults: {
      title: '页面标题',
      subtitle: '副标题',
      description: '页面描述信息',
      background: '',
      actions: [],
      navigation: {
        type: 'none',
        targetPageCode: null, // 使用 code 替代 id
        path: null,  // 页面路径，用于运行时跳转
        url: '',
        params: {},
      },
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'subtitle', label: '副标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'background', label: '背景色/图片', type: 'text' },
      { prop: 'navigation', label: '跳转配置', type: 'navigation' },
    ],
  },
  InfoCardGrid: {
    defaults: {
      title: '信息卡片组',
      columns: 3,
      cards: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'columns', label: '列数', type: 'slider', min: 1, max: 6, step: 1 },
    ],
  },
  StatisticsBar: {
    defaults: {
      items: [
        { value: '120+', label: 'Years of history' },
        { value: '35k+', label: 'Students enrolled' },
        { value: '98%', label: 'Graduate employment rate' },
      ],
      variant: 'light',
    },
    fields: [
      {
        prop: 'variant',
        label: '风格',
        type: 'select',
        options: ['light', 'dark'],
      },
      // items 数组在表单中暂不拆解，依然可以通过默认值驱动预览
    ],
  },
  ProgressSteps: {
    defaults: {
      title: '进度追踪',
      steps: [
        { label: '提交申请', status: 'done' },
        { label: '资料审核', status: 'current' },
        { label: '结果通知', status: 'pending' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // steps 数组结构保持与前台组件一致，这里暂不做表单拆解
    ],
  },
  TimelineHorizontal: {
    defaults: {
      title: '流程日程',
      items: [
        { time: 'Day 1', label: '提交申请' },
        { time: 'Day 3', label: '资格审核' },
        { time: 'Day 7', label: '结果通知' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // items 数组结构与前台组件保持一致，这里同样先用默认值承载
    ],
  },
  DataTable: {
    defaults: {
      title: '数据表格',
      columns: [],
      rows: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
    ],
  },
  ServiceLinks: {
    defaults: {
      title: '服务入口',
      items: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
    ],
  },
  ContactCard: {
    defaults: {
      info: {
        address: 'XX 大学 XX 校区 XX 路 123 号',
        email: 'contact@example.edu',
        phone: '010-1234 5678',
        qr: 'https://picsum.photos/seed/contactqr/200/200',
      },
    },
    fields: [
      // 这里先不拆 info 的子字段，使用默认数据驱动预览；后续如需更细粒度编辑，可以为 address/phone/email/qr 单独建字段
    ],
  },
  PartnerLogoGrid: {
    defaults: {
      title: '合作伙伴',
      logos: [
        { name: 'Partner A', logo: 'https://picsum.photos/seed/logo1/200/80' },
        { name: 'Partner B', logo: 'https://picsum.photos/seed/logo2/200/80' },
        { name: 'Partner C', logo: 'https://picsum.photos/seed/logo3/200/80' },
        { name: 'Partner D', logo: 'https://picsum.photos/seed/logo4/200/80' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // logos 数组在表单中暂不拆解，由默认值和接口数据驱动
    ],
  },
  EventSpotlight: {
    defaults: {
      title: 'Upcoming Events',
      events: [
        {
          title: 'Campus Open Day',
          day: '12',
          month: 'OCT',
          location: 'Main Auditorium',
          time: '09:00–17:00',
          href: '#',
        },
        {
          title: 'Research Symposium',
          day: '21',
          month: 'NOV',
          location: 'Science Center',
          time: '13:30–18:00',
          href: '#',
        },
      ],
      detailPage: {
        type: 'template',
        templateType: 'event',
        targetPageCode: null, // 使用 code 替代 id
        paramKey: 'id',
        paramSource: 'id',
        openInNewTab: false,
      },
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'detailPage', label: '详情页配置', type: 'detail-page' },
      // events 数组结构保持与前台组件一致，这里暂不做表单拆解
    ],
  },
  ImageGallery: {
    defaults: {
      title: '校园风貌',
      images: [
        'https://picsum.photos/seed/gallery1/600/400',
        'https://picsum.photos/seed/gallery2/600/400',
        'https://picsum.photos/seed/gallery3/600/400',
        'https://picsum.photos/seed/gallery4/600/400',
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // images 数组暂不在表单中编辑，通过默认值/接口数据驱动
    ],
  },
  TestimonialList: {
    defaults: {
      title: '校友心声',
      items: [
        { quote: '在这里收获了终身难忘的学习经历。', author: '张同学' },
        { quote: '优秀的师资和开放的学术氛围。', author: '李校友' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // items 数组同样暂不拆解
    ],
  },
  AvatarCardGrid: {
    defaults: {
      title: '师资名录',
      items: [
        {
          name: '王教授',
          title: '计算机科学与技术学院',
          tags: ['博士生导师', '人工智能'],
        },
        {
          name: '李老师',
          title: '软件工程学院',
          tags: ['云计算', '微服务架构'],
        },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      // items 数组结构保持与前台组件一致
    ],
  },
  NoticeList: {
    defaults: {
      title: '公告列表',
      items: [],
      detailPage: {
        type: 'template',
        templateType: 'notice',
        targetPageCode: null, // 使用 code 替代 id
        paramKey: 'id',
        paramSource: 'id',
        openInNewTab: false,
      },
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'detailPage', label: '详情页配置', type: 'detail-page' },
    ],
  },
  SimpleForm: {
    defaults: {
      title: '表单',
      submitText: '提交',
      fields: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'submitText', label: '提交按钮文字', type: 'text' },
    ],
  },
  ContentSplit: {
    defaults: {
      title: '内容分割',
      description: '左右两栏内容布局展示',
      image: 'https://picsum.photos/seed/split/600/400',
      reversed: false,
      bullets: [
        '要点一：示例内容',
        '要点二：示例内容',
        '要点三：示例内容',
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'image', label: '图片URL', type: 'text' },
      { prop: 'reversed', label: '反转布局', type: 'boolean' },
      { prop: 'bullets', label: '要点列表', type: 'bullets' },
    ],
  },
  TextImageSection: {
    defaults: {
      title: '图文模块',
      subtitle: '子标题示例',
      details: '用于图文并茂展示某个专题内容的详细说明文案。',
      image: 'https://picsum.photos/seed/textimage/800/600',
      imageHeight: '18rem',
      titleColor: '#0f172a',
      titleSize: '1.8rem',
      subtitleColor: '#64748b',
      subtitleSize: '1rem',
      detailsColor: '#0f172a',
      detailsSize: '0.98rem',
      reverse: false,
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'subtitle', label: '子标题', type: 'text' },
      { prop: 'details', label: '详情内容', type: 'textarea' },
      { prop: 'image', label: '图片 URL', type: 'text' },
      { prop: 'imageHeight', label: '图片高度（如 18rem / 320px）', type: 'text' },
      { prop: 'titleColor', label: '标题颜色', type: 'color' },
      { prop: 'titleSize', label: '标题字号', type: 'text', placeholder: '如 1.8rem / 24px' },
      { prop: 'subtitleColor', label: '子标题颜色', type: 'color' },
      { prop: 'subtitleSize', label: '子标题字号', type: 'text', placeholder: '如 1rem / 16px' },
      { prop: 'detailsColor', label: '详情文字颜色', type: 'color' },
      { prop: 'detailsSize', label: '详情字号', type: 'text', placeholder: '如 0.98rem / 15px' },
      { prop: 'reverse', label: '左右反转', type: 'boolean' },
    ],
  },
  CardGrid: {
    defaults: {
      title: '卡片网格',
      description: '',
      columns: 3,
      cards: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'columns', label: '列数', type: 'slider', min: 1, max: 6, step: 1 },
      { prop: 'cards', label: '卡片列表', type: 'card-items' },
    ],
  },
  BreadcrumbHeader: {
    defaults: {
      items: [
        { label: '首页', href: '/' },
        { label: '学院概况', href: '/about' },
        { label: '智能校园平台' },
      ],
      title: '智能校园平台',
      description: '整合教学、科研与管理的一体化门户。',
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'items', label: '面包屑层级', type: 'breadcrumb-items' },
    ],
  },
  TopLinksBar: {
    defaults: {
      links: [
        { label: '学生', navigation: { type: 'none' } },
        { label: '教职工', navigation: { type: 'none' } },
        { label: '访客', navigation: { type: 'none' } },
        { label: '服务大厅', navigation: { type: 'none' } },
        { label: '联系我们', navigation: { type: 'none' } },
        { label: '统一门户', navigation: { type: 'none' } },
      ],
      localeCn: '中文',
      localeEn: 'EN',
    },
    fields: [
      { prop: 'links', label: '快捷链接', type: 'quick-links' },
      { prop: 'localeCn', label: '中文标签', type: 'text' },
      { prop: 'localeEn', label: '英文标签', type: 'text' },
    ],
  },
  TabsNav: {
    defaults: {
      items: [
        { label: '概览', value: 'overview' },
        { label: '数据', value: 'data' },
        { label: '设置', value: 'settings' },
      ],
      modelValue: 'overview',
    },
    fields: [
      { prop: 'items', label: '标签项', type: 'tab-items' },
      { prop: 'modelValue', label: '当前选中值', type: 'text' },
    ],
  },
  MainHeader: {
    defaults: {
      title: '企业门户',
      subtitle: '智慧校园 · 数字化管理平台',
      menuItems: [
        { label: '关于学校', href: '/about' },
        { label: '院系设置', href: '/colleges' },
        { label: '师资队伍', href: '/faculty' },
        { label: '教育教学', href: '/education' },
        { label: '科学研究', href: '/research' },
        { label: '招生就业', href: '/admissions' },
        { label: '图书馆', href: '/library' },
      ],
    },
    fields: [
      { prop: 'title', label: '站点标题', type: 'text' },
      { prop: 'subtitle', label: '副标题', type: 'text' },
      { prop: 'menuItems', label: '导航菜单', type: 'nav-items' },
    ],
  },
  NewsSection: {
    defaults: {
      title: 'Latest News',
      highlight: {
        title: '默认新闻标题',
        summary: '请在 props 中传入 highlight、items 数据，或绑定远程接口结果。',
        date: '2025-01-01',
        cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        id: '1',
      },
      items: [
        { title: '默认新闻条目示例一', date: '01-01', href: '#', id: '1' },
        { title: '默认新闻条目示例二', date: '01-02', href: '#', id: '2' },
        { title: '默认新闻条目示例三', date: '01-03', href: '#', id: '3' },
      ],
      detailPage: {
        type: 'template',
        templateType: 'news',
        targetPageCode: null, // 使用 code 替代 id
        paramKey: 'id',
        paramSource: 'id',
        openInNewTab: false,
      },
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'detailPage', label: '详情页配置', type: 'detail-page' },
      { prop: 'highlight', label: '焦点新闻', type: 'news-highlight' },
      { prop: 'items', label: '新闻条目', type: 'news-items' },
    ],
  },
  EventCalendar: {
    defaults: {
      title: '活动日历',
      events: [
        { date: '2024-01-15', title: '学术讲座', type: 'academic' },
        { date: '2024-01-20', title: '校园活动', type: 'campus' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'events', label: '活动列表', type: 'array' },
    ],
  },
  MediaLinks: {
    defaults: {
      title: '媒体报道',
      items: [
        {
          title: '媒体报道标题',
          source: '来源',
          date: '2024-01-15',
          url: '#',
        },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'items', label: '媒体报道列表', type: 'array' },
    ],
  },
  DownloadList: {
    defaults: {
      title: '资料下载',
      items: [
        { name: '文件名称', size: '1.2MB', href: '#' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'items', label: '文件列表', type: 'array' },
    ],
  },
  SocialMediaLinks: {
    defaults: {
      title: '关注我们',
      items: [
        { name: '微信', icon: 'wechat', url: '#' },
        { name: '微博', icon: 'weibo', url: '#' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'items', label: '社交媒体列表', type: 'array' },
    ],
  },
  SearchBox: {
    defaults: {
      placeholder: '请输入关键词搜索...',
      action: '/search',
      method: 'get',
    },
    fields: [
      { prop: 'placeholder', label: '占位符', type: 'text' },
      { prop: 'action', label: '搜索地址', type: 'text' },
      { prop: 'method', label: '请求方法', type: 'text' },
    ],
  },
  NotificationBanner: {
    defaults: {
      message: '重要通知：请关注最新公告',
      type: 'info',
      closable: true,
      position: 'top',
    },
    fields: [
      { prop: 'message', label: '通知内容', type: 'textarea' },
      { prop: 'type', label: '类型', type: 'select', options: [
        { label: '信息', value: 'info' },
        { label: '警告', value: 'warning' },
        { label: '错误', value: 'error' },
        { label: '成功', value: 'success' },
      ]},
      { prop: 'closable', label: '可关闭', type: 'boolean' },
      { prop: 'position', label: '位置', type: 'select', options: [
        { label: '顶部', value: 'top' },
        { label: '底部', value: 'bottom' },
      ]},
    ],
  },
  TagCloud: {
    defaults: {
      title: '热门标签',
      tags: [
        { name: '新闻', count: 120, href: '#' },
        { name: '活动', count: 85, href: '#' },
      ],
      maxSize: 24,
      minSize: 12,
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'tags', label: '标签列表', type: 'array' },
      { prop: 'maxSize', label: '最大字号', type: 'number' },
      { prop: 'minSize', label: '最小字号', type: 'number' },
    ],
  },
  VideoPlayer: {
    defaults: {
      title: '',
      src: '',
      poster: '',
      autoplay: false,
      controls: true,
      width: '100%',
      height: 'auto',
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'src', label: '视频地址', type: 'text' },
      { prop: 'poster', label: '封面图', type: 'text' },
      { prop: 'autoplay', label: '自动播放', type: 'boolean' },
      { prop: 'controls', label: '显示控制条', type: 'boolean' },
      { prop: 'width', label: '宽度', type: 'text' },
      { prop: 'height', label: '高度', type: 'text' },
    ],
  },
  MultiLevelMenu: {
    defaults: {
      items: [
        { label: '首页', href: '/' },
        {
          label: '关于我们',
          href: '#',
          children: [
            { label: '学校简介', href: '#' },
            { label: '历史沿革', href: '#' },
          ],
        },
      ],
    },
    fields: [
      { prop: 'items', label: '菜单项', type: 'nav-items' },
    ],
  },
  Footer: {
    defaults: {
      copyright: '© 2024 版权所有',
      links: [
        { label: '关于我们', href: '#' },
        { label: '联系我们', href: '#' },
      ],
      contact: {
        address: '地址：江苏省南京市',
        phone: '电话：025-12345678',
        email: '邮箱：contact@example.com',
      },
    },
    fields: [
      { prop: 'copyright', label: '版权信息', type: 'text' },
      { prop: 'links', label: '链接列表', type: 'quick-links' },
      { prop: 'contact', label: '联系信息', type: 'object' },
    ],
  },
}

export const getComponentSchema = (key) => componentSchemas[key]

