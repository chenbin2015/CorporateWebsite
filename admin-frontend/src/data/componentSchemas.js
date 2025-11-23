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
          cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1920&q=95',
        },
      ],
      interval: 5000,
      fullWidth: true, // 默认全宽
      margin: '2.4rem auto', // 默认外边距
    },
    fields: [
      { prop: 'items', label: '轮播项', type: 'carousel-items' },
      { prop: 'interval', label: '自动播放间隔（毫秒）', type: 'number', placeholder: '5000' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
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
      fullWidth: false, // 默认非全宽
      margin: '2.4rem auto', // 默认外边距
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
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
      { prop: 'navigation', label: '跳转配置', type: 'navigation' },
    ],
  },
  CTABanner: {
    defaults: {
      title: '预约校园参观',
      description: '体验智慧校园解决方案与可视化搭建平台。',
      buttonText: '立即预约',
      fullWidth: false, // 默认非全宽
      margin: '2.4rem auto', // 默认外边距
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
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
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
      fullWidth: false, // 默认非全宽
      margin: '2.4rem auto', // 默认外边距
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
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
      { prop: 'navigation', label: '跳转配置', type: 'navigation' },
    ],
  },
  InfoCardGrid: {
    defaults: {
      title: '信息卡片组',
      dataSourceCode: null, // 数据源 code，如果设置了则从数据源获取数据
      columns: 3,
      cards: [],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'dataSourceCode', label: '数据源', type: 'data-source', dataSourceType: 'teacher' },
      { prop: 'cards', label: '卡片列表', type: 'info-cards' },
      { prop: 'columns', label: '列数', type: 'slider', min: 1, max: 6, step: 1 },
    ],
  },
  ProductList: {
    defaults: {
      title: '产品列表',
      dataSourceCode: null, // 数据源 code，如果设置了则从数据源获取数据
      columns: 3,
      products: [
        {
          id: '1',
          name: '默认产品名称',
          description: '这是产品的默认描述信息。',
          price: '¥999',
          originalPrice: null,
          image: 'http://localhost:8002/p1.jpg',
        },
      ],
      detailPage: null,
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'dataSourceCode', label: '数据源', type: 'data-source', dataSourceType: 'product' },
      { prop: 'columns', label: '列数', type: 'slider', min: 1, max: 6, step: 1 },
      { prop: 'products', label: '产品列表', type: 'product-items' },
      { prop: 'detailPage', label: '详情页配置', type: 'detail-page' },
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
      dataSourceCode: null, // 数据源 code，如果设置了则从数据源获取数据
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
      { prop: 'dataSourceCode', label: '数据源', type: 'data-source', dataSourceType: 'notice' },
      { prop: 'items', label: '公告条目', type: 'notice-items' },
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
  CarouselNewsSplit: {
    defaults: {
      carouselItems: [
        {
          title: '默认轮播标题',
          description: '这是轮播图的默认内容',
          cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80',
          action: '了解更多',
          navigation: { type: 'none' },
        },
      ],
      carouselInterval: 5000,
      newsTitle: '最新动态',
      newsItems: [
        { title: '默认新闻条目一', date: '01-01', id: '1' },
        { title: '默认新闻条目二', date: '01-02', id: '2' },
        { title: '默认新闻条目三', date: '01-03', id: '3' },
      ],
      carouselDataSourceCode: null,
      newsDataSourceCode: null,
      reversed: false,
      newsDetailPage: {
        type: 'template',
        templateType: 'news',
        targetPageCode: null,
        paramKey: 'id',
        paramSource: 'id',
        openInNewTab: false,
      },
    },
    fields: [
      { prop: 'carouselDataSourceCode', label: '轮播数据源', type: 'data-source', dataSourceType: 'news' },
      { prop: 'carouselItems', label: '轮播项', type: 'carousel-items' },
      { prop: 'carouselInterval', label: '轮播间隔（毫秒）', type: 'number', placeholder: '5000' },
      { prop: 'newsTitle', label: '新闻标题', type: 'text' },
      { prop: 'newsDataSourceCode', label: '新闻数据源', type: 'data-source', dataSourceType: 'news' },
      { prop: 'newsItems', label: '新闻条目', type: 'news-items' },
      { prop: 'newsDetailPage', label: '新闻详情页配置', type: 'detail-page' },
      { prop: 'reversed', label: '反转布局', type: 'switch', activeText: '是', inactiveText: '否' },
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
      fullWidth: false, // 默认非全宽
      margin: '2.4rem auto', // 默认外边距
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'subtitle', label: '子标题', type: 'text' },
      { prop: 'details', label: '详情内容（富文本）', type: 'rich-text' },
      { prop: 'image', label: '图片 URL', type: 'text' },
      { prop: 'imageHeight', label: '图片高度（如 18rem / 320px）', type: 'text' },
      { prop: 'titleColor', label: '标题颜色', type: 'color' },
      { prop: 'titleSize', label: '标题字号', type: 'text', placeholder: '如 1.8rem / 24px' },
      { prop: 'subtitleColor', label: '子标题颜色', type: 'color' },
      { prop: 'subtitleSize', label: '子标题字号', type: 'text', placeholder: '如 1rem / 16px' },
      { prop: 'detailsColor', label: '详情文字颜色', type: 'color' },
      { prop: 'detailsSize', label: '详情字号', type: 'text', placeholder: '如 0.98rem / 15px' },
      { prop: 'reverse', label: '左右反转', type: 'switch' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
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
      navBackgroundColor: '#1e3a5f', // 深蓝灰色背景，现代专业
      titleColor: '#ffffff', // 纯白色标题，清晰醒目
      subtitleColor: '#cbd5e1', // 浅蓝灰色副标题，优雅柔和
      logoUrl: '', // Logo 图片 URL，如果为空则显示默认图标
      logoWidth: 60, // Logo 宽度（px）
      logoHeight: 60, // Logo 高度（px）
      showSearch: false,
      fullWidth: true, // 默认全宽
      defaultActiveIndex: 0, // 默认选中第一个菜单项
      fixed: false, // 是否浮动在顶部
      backgroundOpacity: 1, // 背景透明度 0-1
      margin: '0', // 默认外边距（全宽组件通常不需要上下边距）
      menuItems: [
        { label: '关于学校', href: '/about', navigation: { type: 'none' } },
        { label: '院系设置', href: '/colleges', navigation: { type: 'none' } },
        { label: '师资队伍', href: '/faculty', navigation: { type: 'none' } },
        { label: '教育教学', href: '/education', navigation: { type: 'none' } },
        { label: '科学研究', href: '/research', navigation: { type: 'none' } },
        { label: '招生就业', href: '/admissions', navigation: { type: 'none' } },
        { label: '图书馆', href: '/library', navigation: { type: 'none' } },
      ],
    },
    fields: [
      { prop: 'title', label: '站点标题', type: 'text' },
      { prop: 'subtitle', label: '副标题', type: 'text' },
      { prop: 'logoUrl', label: 'Logo 图片', type: 'text', placeholder: '请输入 Logo 图片 URL（留空则显示默认图标）' },
      { prop: 'logoWidth', label: 'Logo 宽度', type: 'text', placeholder: '例如: 60 或 60px' },
      { prop: 'logoHeight', label: 'Logo 高度', type: 'text', placeholder: '例如: 60 或 60px' },
      { prop: 'titleColor', label: '标题颜色', type: 'color' },
      { prop: 'subtitleColor', label: '副标题颜色', type: 'color' },
      { prop: 'navBackgroundColor', label: '导航背景色', type: 'color' },
      { prop: 'backgroundOpacity', label: '背景透明度', type: 'slider', min: 0, max: 1, step: 0.1 },
      { prop: 'fixed', label: '浮动在顶部', type: 'switch', activeText: '浮动', inactiveText: '普通' },
      { prop: 'showSearch', label: '显示搜索框', type: 'switch' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'defaultActiveIndex', label: '默认选中项', type: 'number', placeholder: '菜单项索引（从0开始）', min: 0, step: 1 },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 0 或 2.4rem auto 或 2.4rem 1.5rem' },
      { prop: 'menuItems', label: '导航菜单', type: 'nav-items' },
    ],
  },
  SideNav: {
    defaults: {
      parentMenu: {
        label: '主菜单',
        href: '/',
        navigation: { type: 'none' },
      },
      children: [],
      activePath: '',
      width: '240px',
      backgroundColor: '#f8fafc',
      textColor: '#334155',
      activeBackgroundColor: '#2563eb',
      activeTextColor: '#ffffff',
    },
    fields: [
      { prop: 'parentMenu', label: '主菜单项', type: 'object' },
      { prop: 'children', label: '子菜单列表', type: 'array' },
      { prop: 'width', label: '宽度', type: 'text', placeholder: '例如: 240px 或 20rem' },
      { prop: 'backgroundColor', label: '背景色', type: 'color' },
      { prop: 'textColor', label: '文字颜色', type: 'color' },
      { prop: 'activeBackgroundColor', label: '激活项背景色', type: 'color' },
      { prop: 'activeTextColor', label: '激活项文字颜色', type: 'color' },
    ],
  },
  NewsSection: {
    defaults: {
      title: 'Latest News',
      dataSourceCode: null, // 数据源 code，如果设置了则从数据源获取数据
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
      { prop: 'dataSourceCode', label: '数据源', type: 'data-source', dataSourceType: 'news' },
      { prop: 'items', label: '新闻条目', type: 'news-items' },
      { prop: 'detailPage', label: '详情页配置', type: 'detail-page' },
      { prop: 'highlight', label: '焦点新闻', type: 'news-highlight' },
    ],
  },
  NewsListPage: {
    defaults: {
      title: '新闻列表',
      dataSourceCode: null, // 数据源 code，如果设置了则从数据源获取数据
      items: [
        {
          id: '1',
          title: '默认新闻条目示例一',
          date: '2025-01-01',
          summary: '这是新闻摘要内容，用于简要描述新闻的主要内容...',
          cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: '2',
          title: '默认新闻条目示例二',
          date: '2025-01-02',
          summary: '这是新闻摘要内容，用于简要描述新闻的主要内容...',
          cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: '3',
          title: '默认新闻条目示例三',
          date: '2025-01-03',
          summary: '这是新闻摘要内容，用于简要描述新闻的主要内容...',
          cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
        },
      ],
      layout: 'list', // 'list' | 'grid'
      showImage: false,
      showSummary: true,
      detailPage: {
        type: 'template',
        templateType: 'news',
        targetPageCode: null,
        paramKey: 'id',
        paramSource: 'id',
        openInNewTab: false,
      },
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'dataSourceCode', label: '数据源', type: 'data-source', dataSourceType: 'news' },
      { prop: 'items', label: '新闻条目', type: 'news-items' },
      { prop: 'layout', label: '布局方式', type: 'select', options: [
        { label: '列表布局', value: 'list' },
        { label: '网格布局', value: 'grid' },
      ]},
      { prop: 'showImage', label: '显示图片', type: 'switch' },
      { prop: 'showSummary', label: '显示摘要', type: 'switch' },
      { prop: 'detailPage', label: '详情页配置', type: 'detail-page' },
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
        { 
          name: '文件名称', 
          size: '1.2MB', 
          href: '#',
          image: '',
          description: '',
        },
      ],
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'items', label: '文件列表', type: 'download-items' },
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
      title: '视频标题',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
      autoplay: false,
      controls: true,
      width: '100%',
      height: 'auto',
      fullWidth: false,
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text', placeholder: '视频标题（可选）' },
      { prop: 'src', label: '视频地址', type: 'text', placeholder: '请输入视频 URL 或路径' },
      { prop: 'poster', label: '封面图', type: 'text', placeholder: '视频封面图片 URL（可选）' },
      { prop: 'autoplay', label: '自动播放', type: 'switch', activeText: '开启', inactiveText: '关闭' },
      { prop: 'controls', label: '显示控制条', type: 'switch', activeText: '显示', inactiveText: '隐藏' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'width', label: '宽度', type: 'text', placeholder: '100%' },
      { prop: 'height', label: '高度', type: 'text', placeholder: 'auto' },
    ],
  },
  VideoBanner: {
    defaults: {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: '',
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
      width: '100%',
      height: '600px',
      objectFit: 'cover',
      margin: '0', // 默认外边距
    },
    fields: [
      { prop: 'src', label: '视频地址', type: 'text', placeholder: '请输入视频 URL 或路径' },
      { prop: 'poster', label: '封面图', type: 'text', placeholder: '视频封面图片 URL（可选）' },
      { prop: 'autoplay', label: '自动播放', type: 'switch', activeText: '开启', inactiveText: '关闭' },
      { prop: 'loop', label: '循环播放', type: 'switch', activeText: '开启', inactiveText: '关闭' },
      { prop: 'muted', label: '静音', type: 'switch', activeText: '开启', inactiveText: '关闭' },
      { prop: 'controls', label: '显示控制条', type: 'switch', activeText: '显示', inactiveText: '隐藏' },
      { prop: 'width', label: '宽度', type: 'text', placeholder: '例如: 100% 或 1200px' },
      { prop: 'height', label: '高度', type: 'text', placeholder: '例如: 600px 或 30rem（留空表示自动）' },
      { prop: 'objectFit', label: '填充方式', type: 'select', options: [
        { label: '覆盖', value: 'cover' },
        { label: '包含', value: 'contain' },
        { label: '填充', value: 'fill' },
      ]},
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 0 或 2.4rem auto 或 2.4rem 1.5rem' },
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
      backgroundColor: '#1e293b',
      textColor: '#f1f5f9',
      linkColor: '#cbd5e1',
      fullWidth: true, // 默认全宽
      margin: '0', // 默认外边距
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
      { prop: 'backgroundColor', label: '背景颜色', type: 'color' },
      { prop: 'textColor', label: '文字颜色', type: 'color' },
      { prop: 'linkColor', label: '链接颜色', type: 'color' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 0 或 2.4rem auto 或 2.4rem 1.5rem' },
      { prop: 'links', label: '链接列表', type: 'quick-links' },
      { prop: 'contact.address', label: '联系地址', type: 'text', placeholder: '例如: 地址：江苏省南京市' },
      { prop: 'contact.phone', label: '联系电话', type: 'text', placeholder: '例如: 电话：025-12345678' },
      { prop: 'contact.email', label: '联系邮箱', type: 'text', placeholder: '例如: 邮箱：contact@example.com' },
    ],
  },
  StatsHighlight: {
    defaults: {
      items: [
        { label: '学生规模', value: '30,000+' },
        { label: '教职工', value: '3,500+' },
        { label: '学科门类', value: '12' },
      ],
      columns: 3,
      fullWidth: false, // 默认非全宽
      margin: '2.4rem auto', // 默认外边距
    },
    fields: [
      { prop: 'items', label: '统计数据', type: 'array' },
      { prop: 'columns', label: '列数', type: 'number' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
    ],
  },
  DetailData: {
    defaults: {
      field: 'title',
      fallback: '',
    },
    fields: [
      { prop: 'field', label: '数据字段', type: 'text', placeholder: '如：title, content, date, author.name' },
      { prop: 'fallback', label: '默认值', type: 'text', placeholder: '数据不存在时显示的内容' },
    ],
  },
  ContentDetail: {
    defaults: {
      title: '内容标题',
      createdAt: '2025-01-01',
      author: '作者名称',
      content: '<p>这里是详情内容，支持富文本格式，可以插入图片、链接等。</p>',
      showTitle: true,
      showCreatedAt: true,
      showAuthor: true,
      showContent: true,
      fullWidth: false, // 默认非全宽
      margin: '2.4rem auto', // 默认外边距
      height: '', // 默认高度（空表示自动）
      containerMaxWidth: '1200px', // 包裹容器最大宽度
      containerPadding: '0 1.5rem', // 包裹容器内边距
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'createdAt', label: '创建时间', type: 'text' },
      { prop: 'author', label: '创建人', type: 'text' },
      { prop: 'content', label: '详情内容（富文本）', type: 'rich-text' },
      { prop: 'showTitle', label: '显示标题', type: 'switch', activeText: '显示', inactiveText: '隐藏' },
      { prop: 'showCreatedAt', label: '显示创建时间', type: 'switch', activeText: '显示', inactiveText: '隐藏' },
      { prop: 'showAuthor', label: '显示创建人', type: 'switch', activeText: '显示', inactiveText: '隐藏' },
      { prop: 'showContent', label: '显示详情内容', type: 'switch', activeText: '显示', inactiveText: '隐藏' },
      { prop: 'fullWidth', label: '显示模式', type: 'switch', activeText: '全屏', inactiveText: '普通尺寸' },
      { prop: 'margin', label: '外边距', type: 'text', placeholder: '例如: 2.4rem auto 或 2.4rem 1.5rem' },
      { prop: 'height', label: '高度', type: 'text', placeholder: '例如: 500px 或 30rem（留空表示自动）' },
      { prop: 'containerMaxWidth', label: '容器最大宽度', type: 'text', placeholder: '例如: 1200px 或 72rem（留空表示无限制）' },
      { prop: 'containerPadding', label: '容器内边距', type: 'text', placeholder: '例如: 0 1.5rem 或 2rem（留空表示无内边距）' },
    ],
  },
}

export const getComponentSchema = (key) => componentSchemas[key]

