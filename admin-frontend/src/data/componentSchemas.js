export const componentSchemas = {
  HeroCarousel: {
    defaults: {
      headline: '智慧校园，连结未来',
      subline: '构建国际化、数字化、可持续的校园体验',
      accent: '#2563eb',
    },
    fields: [
      { prop: 'headline', label: '主标题', type: 'text', placeholder: '输入标题' },
      { prop: 'subline', label: '副标题', type: 'textarea', placeholder: '输入简介' },
      { prop: 'accent', label: '主题色', type: 'color' },
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
    },
    fields: [
      { prop: 'tag', label: '角标文字', type: 'text' },
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
    ],
  },
  CTABanner: {
    defaults: {
      title: '预约校园参观',
      description: '体验智慧校园解决方案与可视化搭建平台。',
      buttonText: '立即预约',
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'buttonText', label: '按钮文案', type: 'text' },
    ],
  },
  PageHero: {
    defaults: {
      title: '页面标题',
      subtitle: '副标题',
      description: '页面描述信息',
      background: '',
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'subtitle', label: '副标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'background', label: '背景色/图片', type: 'text' },
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
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
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
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
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
      links: ['学生', '教职工', '访客', '服务大厅', '联系我们', '统一门户'],
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
      },
      items: [
        { title: '默认新闻条目示例一', date: '01-01', href: '#' },
        { title: '默认新闻条目示例二', date: '01-02', href: '#' },
        { title: '默认新闻条目示例三', date: '01-03', href: '#' },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'highlight', label: '焦点新闻', type: 'news-highlight' },
      { prop: 'items', label: '新闻条目', type: 'news-items' },
    ],
  },
}

export const getComponentSchema = (key) => componentSchemas[key]

