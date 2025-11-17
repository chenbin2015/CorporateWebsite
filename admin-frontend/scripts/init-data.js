import axios from 'axios'

const API_BASE = process.env.API_BASE || process.env.VITE_API_BASE || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 如果提供了 token，添加到请求头
if (process.env.ADMIN_TOKEN) {
  api.defaults.headers.common['Authorization'] = `Bearer ${process.env.ADMIN_TOKEN}`
}

// 生成唯一 ID
const generateId = (key) => `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

// 创建首页的组件数据
const createHomePageSchema = () => {
  return JSON.stringify([
    {
      id: generateId('HeroCarousel'),
      key: 'HeroCarousel',
      label: 'HeroCarousel',
      source: 'frontend/src/components/HeroCarousel.vue',
      props: {
        headline: '智慧校园，连结未来',
        subline: '构建国际化、数字化、可持续的校园体验',
        accent: '#2563eb',
      },
    },
    {
      id: generateId('StatisticsBar'),
      key: 'StatisticsBar',
      label: 'StatisticsBar',
      source: 'frontend/src/components/sections/StatisticsBar.vue',
      props: {
        items: [
          { value: '120+', label: 'Years of history' },
          { value: '35k+', label: 'Students enrolled' },
          { value: '98%', label: 'Graduate employment rate' },
        ],
        variant: 'light',
      },
    },
    {
      id: generateId('InfoCardGrid'),
      key: 'InfoCardGrid',
      label: 'InfoCardGrid',
      source: 'frontend/src/components/InfoCardGrid.vue',
      props: {
        title: '核心服务',
        columns: 3,
        cards: [],
      },
    },
    {
      id: generateId('ContentSplit'),
      key: 'ContentSplit',
      label: 'ContentSplit',
      source: 'frontend/src/components/sections/ContentSplit.vue',
      props: {
        title: '关于我们',
        description: '我们致力于提供优质的教育服务，培养具有创新精神和实践能力的人才。',
        image: 'https://picsum.photos/seed/split/600/400',
        reversed: false,
        bullets: [
          '优质的教学资源',
          '国际化的教育理念',
          '完善的实践平台',
        ],
      },
    },
    {
      id: generateId('CTABanner'),
      key: 'CTABanner',
      label: 'CTABanner',
      source: 'frontend/src/components/sections/CTABanner.vue',
      props: {
        title: '预约校园参观',
        description: '体验智慧校园解决方案与可视化搭建平台。',
        buttonText: '立即预约',
      },
    },
  ])
}

// 创建关于我们页面的组件数据
const createAboutPageSchema = () => {
  return JSON.stringify([
    {
      id: generateId('PageHero'),
      key: 'PageHero',
      label: 'PageHero',
      source: 'frontend/src/components/PageHero.vue',
      props: {
        title: '关于我们',
        subtitle: 'About Us',
        description: '了解我们的历史、使命和愿景',
        background: '',
      },
    },
    {
      id: generateId('BreadcrumbHeader'),
      key: 'BreadcrumbHeader',
      label: 'BreadcrumbHeader',
      source: 'frontend/src/components/sections/BreadcrumbHeader.vue',
      props: {
        items: [
          { label: '首页', href: '/' },
          { label: '关于我们', href: '/about' },
        ],
        title: '关于我们',
        description: '了解我们的历史、使命和愿景',
      },
    },
    {
      id: generateId('TextImageSection'),
      key: 'TextImageSection',
      label: 'TextImageSection',
      source: 'frontend/src/components/TextImageSection.vue',
      props: {
        title: '我们的使命',
        subtitle: 'Mission',
        details: '我们致力于提供优质的教育服务，培养具有创新精神和实践能力的人才，为社会发展和进步做出贡献。',
        image: 'https://picsum.photos/seed/mission/800/600',
        imageHeight: '18rem',
        titleColor: '#0f172a',
        titleSize: '1.8rem',
        subtitleColor: '#64748b',
        subtitleSize: '1rem',
        detailsColor: '#0f172a',
        detailsSize: '0.98rem',
        reverse: false,
      },
    },
    {
      id: generateId('SectionHero'),
      key: 'SectionHero',
      label: 'SectionHero',
      source: 'frontend/src/components/sections/SectionHero.vue',
      props: {
        title: '我们的愿景',
        description: '成为国际一流的教育机构，引领教育创新与发展。',
        tag: '愿景',
      },
    },
    {
      id: generateId('TimelineHorizontal'),
      key: 'TimelineHorizontal',
      label: 'TimelineHorizontal',
      source: 'frontend/src/components/sections/TimelineHorizontal.vue',
      props: {
        title: '发展历程',
        items: [
          { time: '2020', label: '成立' },
          { time: '2021', label: '快速发展' },
          { time: '2022', label: '国际化' },
          { time: '2023', label: '数字化转型' },
        ],
      },
    },
  ])
}

// 创建联系我们页面的组件数据
const createContactPageSchema = () => {
  return JSON.stringify([
    {
      id: generateId('PageHero'),
      key: 'PageHero',
      label: 'PageHero',
      source: 'frontend/src/components/PageHero.vue',
      props: {
        title: '联系我们',
        subtitle: 'Contact Us',
        description: '我们期待与您取得联系',
        background: '',
      },
    },
    {
      id: generateId('ContactCard'),
      key: 'ContactCard',
      label: 'ContactCard',
      source: 'frontend/src/components/sections/ContactCard.vue',
      props: {
        info: {
          address: 'XX 大学 XX 校区 XX 路 123 号',
          email: 'contact@example.edu',
          phone: '010-1234 5678',
          qr: 'https://picsum.photos/seed/contactqr/200/200',
        },
      },
    },
    {
      id: generateId('SimpleForm'),
      key: 'SimpleForm',
      label: 'SimpleForm',
      source: 'frontend/src/components/sections/SimpleForm.vue',
      props: {
        title: '留言表单',
        submitText: '提交',
        fields: [],
      },
    },
    {
      id: generateId('PartnerLogoGrid'),
      key: 'PartnerLogoGrid',
      label: 'PartnerLogoGrid',
      source: 'frontend/src/components/sections/PartnerLogoGrid.vue',
      props: {
        title: '合作伙伴',
        logos: [
          { name: 'Partner A', logo: 'https://picsum.photos/seed/logo1/200/80' },
          { name: 'Partner B', logo: 'https://picsum.photos/seed/logo2/200/80' },
          { name: 'Partner C', logo: 'https://picsum.photos/seed/logo3/200/80' },
          { name: 'Partner D', logo: 'https://picsum.photos/seed/logo4/200/80' },
        ],
      },
    },
  ])
}

// 主函数
async function initData() {
  try {
    console.log('🚀 开始初始化数据...\n')

    // 1. 创建项目
    console.log('📦 创建项目...')
    const projectResponse = await api.post('/projects', {
      name: '示例项目',
      description: '这是一个示例项目，包含多个页面和组件数据',
    })
    const project = projectResponse.data
    console.log(`✅ 项目创建成功: ${project.name} (ID: ${project.id})\n`)

    // 2. 创建首页
    console.log('📄 创建首页...')
    const homePageResponse = await api.post(`/projects/${project.id}/pages`, {
      name: '首页',
      path: '/home',
      title: '首页 - 智慧校园',
      description: '智慧校园首页，展示核心服务和信息',
      schemaData: createHomePageSchema(),
    })
    const homePage = homePageResponse.data
    console.log(`✅ 首页创建成功: ${homePage.name} (ID: ${homePage.id})\n`)

    // 3. 创建关于我们页面
    console.log('📄 创建关于我们页面...')
    const aboutPageResponse = await api.post(`/projects/${project.id}/pages`, {
      name: '关于我们',
      path: '/about',
      title: '关于我们 - 智慧校园',
      description: '了解我们的历史、使命和愿景',
      schemaData: createAboutPageSchema(),
    })
    const aboutPage = aboutPageResponse.data
    console.log(`✅ 关于我们页面创建成功: ${aboutPage.name} (ID: ${aboutPage.id})\n`)

    // 4. 创建联系我们页面
    console.log('📄 创建联系我们页面...')
    const contactPageResponse = await api.post(`/projects/${project.id}/pages`, {
      name: '联系我们',
      path: '/contact',
      title: '联系我们 - 智慧校园',
      description: '联系方式和服务信息',
      schemaData: createContactPageSchema(),
    })
    const contactPage = contactPageResponse.data
    console.log(`✅ 联系我们页面创建成功: ${contactPage.name} (ID: ${contactPage.id})\n`)

    console.log('🎉 数据初始化完成！')
    console.log(`\n项目信息:`)
    console.log(`  - 项目名称: ${project.name}`)
    console.log(`  - 项目ID: ${project.id}`)
    console.log(`  - 页面数量: 3`)
    console.log(`\n页面列表:`)
    console.log(`  1. ${homePage.name} - ${homePage.path} (${JSON.parse(homePage.schemaData || '[]').length} 个组件)`)
    console.log(`  2. ${aboutPage.name} - ${aboutPage.path} (${JSON.parse(aboutPage.schemaData || '[]').length} 个组件)`)
    console.log(`  3. ${contactPage.name} - ${contactPage.path} (${JSON.parse(contactPage.schemaData || '[]').length} 个组件)`)
  } catch (error) {
    console.error('❌ 初始化失败:', error.message)
    if (error.response) {
      console.error('响应数据:', JSON.stringify(error.response.data, null, 2))
      console.error('状态码:', error.response.status)
      console.error('请求URL:', error.config?.url)
    } else if (error.request) {
      console.error('请求失败: 无法连接到服务器')
      console.error('请确保后端服务正在运行:', API_BASE)
      console.error('错误详情:', error.message)
    } else {
      console.error('错误详情:', error.message)
      console.error('堆栈:', error.stack)
    }
    process.exit(1)
  }
}

// 运行初始化
initData()

