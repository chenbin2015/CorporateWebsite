/**
 * 创建东南大学项目并搭建首页
 * 参考 https://www.seu.edu.cn/
 */

const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// 注意：这个脚本需要后端服务运行，并且可能需要认证
// 如果遇到认证问题，请先登录系统获取 token

async function createProject() {
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '东南大学',
        description: '东南大学官方网站项目',
      }),
    })

    if (!response.ok) {
      throw new Error(`创建项目失败: ${response.statusText}`)
    }

    const project = await response.json()
    console.log('✓ 项目创建成功:', project.name, 'Code:', project.code)
    return project
  } catch (error) {
    console.error('✗ 创建项目失败:', error.message)
    throw error
  }
}

async function createHomePage(projectCode) {
  // 根据东南大学网站，首页应该包含：
  // 1. 顶部导航（MainHeader）
  // 2. Hero轮播图（HeroCarousel）
  // 3. 新闻动态（NewsSection）
  // 4. 活动预告（EventSpotlight）
  // 5. 快速链接（ServiceLinks）
  // 6. 统计数据（StatsHighlight）
  // 7. 页脚（Footer）

  const homePageSchema = [
    {
      id: 'MainHeader-1',
      key: 'MainHeader',
      label: 'MainHeader',
      source: 'frontend/src/components/MainHeader.vue',
      props: {
        menuItems: [
          { label: '首页', href: '/', navigation: { type: 'none' } },
          {
            label: '学校概况',
            href: '#',
            navigation: { type: 'none' },
            children: [
              { label: '学校简介', href: '#', navigation: { type: 'none' } },
              { label: '历史沿革', href: '#', navigation: { type: 'none' } },
              { label: '现任领导', href: '#', navigation: { type: 'none' } },
            ],
          },
          {
            label: '新闻动态',
            href: '#',
            navigation: { type: 'none' },
            children: [
              { label: '学校新闻', href: '#', navigation: { type: 'none' } },
              { label: '通知公告', href: '#', navigation: { type: 'none' } },
              { label: '媒体报道', href: '#', navigation: { type: 'none' } },
            ],
          },
          {
            label: '人才培养',
            href: '#',
            navigation: { type: 'none' },
          },
          {
            label: '科学研究',
            href: '#',
            navigation: { type: 'none' },
          },
          {
            label: '国际交流',
            href: '#',
            navigation: { type: 'none' },
          },
        ],
      },
    },
    {
      id: 'HeroCarousel-1',
      key: 'HeroCarousel',
      label: 'HeroCarousel',
      source: 'frontend/src/components/HeroCarousel.vue',
      props: {
        items: [
          {
            title: '东南大学：止于至善',
            description: '以科学名世，以人才报国，建设世界一流大学',
            category: '学校简介',
            action: '了解更多',
            href: '#',
            cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: '创新驱动发展',
            description: '面向国家重大需求，服务经济社会发展',
            category: '科学研究',
            action: '了解更多',
            href: '#',
            cover: 'https://images.unsplash.com/photo-1532619675605-1ede6c27edc0?auto=format&fit=crop&w=1600&q=80',
          },
        ],
        interval: 5000,
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
    },
    {
      id: 'StatsHighlight-1',
      key: 'StatsHighlight',
      label: 'StatsHighlight',
      source: 'frontend/src/components/StatsHighlight.vue',
      props: {
        items: [
          { label: '在校学生', value: '37000+' },
          { label: '教职工', value: '3200+' },
          { label: '学科门类', value: '11' },
          { label: '国家重点学科', value: '12' },
        ],
        columns: 4,
      },
    },
    {
      id: 'NewsSection-1',
      key: 'NewsSection',
      label: 'NewsSection',
      source: 'frontend/src/components/NewsSection.vue',
      props: {
        title: '新闻动态',
        moreText: '更多',
        highlight: {
          id: '1',
          title: '东南大学召开2024年度工作会议',
          summary: '总结2023年工作，部署2024年重点任务，推动学校高质量发展',
          date: '2024-01-15',
          cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        },
        items: [
          { id: '1', title: '学校召开新学期工作部署会', date: '01-15' },
          { id: '2', title: '我校科研成果获国家科技进步奖', date: '01-12' },
          { id: '3', title: '国际学术会议在我校成功举办', date: '01-10' },
          { id: '4', title: '学生创新创业大赛圆满落幕', date: '01-08' },
        ],
        detailPage: {
          type: 'template',
          templateType: 'news',
          targetPageCode: null,
          paramKey: 'id',
          paramSource: 'id',
          openInNewTab: false,
        },
      },
    },
    {
      id: 'EventSpotlight-1',
      key: 'EventSpotlight',
      label: 'EventSpotlight',
      source: 'frontend/src/components/EventSpotlight.vue',
      props: {
        title: '活动预告',
        moreText: '更多',
        events: [
          {
            id: '1',
            title: '2024年春季学期开学典礼',
            date: '2024-02-20',
            location: '九龙湖校区',
            description: '欢迎新同学，开启新学期',
          },
          {
            id: '2',
            title: '学术前沿讲座：人工智能与未来教育',
            date: '2024-02-25',
            location: '四牌楼校区',
            description: '邀请知名专家分享AI在教育领域的应用',
          },
          {
            id: '3',
            title: '校园开放日',
            date: '2024-03-10',
            location: '各校区',
            description: '面向社会公众开放，展示学校风采',
          },
        ],
        detailPage: {
          type: 'template',
          templateType: 'event',
          targetPageCode: null,
          paramKey: 'id',
          paramSource: 'id',
          openInNewTab: false,
        },
      },
    },
    {
      id: 'ServiceLinks-1',
      key: 'ServiceLinks',
      label: 'ServiceLinks',
      source: 'frontend/src/components/ServiceLinks.vue',
      props: {
        title: '快速通道',
        items: [
          { label: '信息门户', icon: 'portal', href: '#' },
          { label: '图书馆', icon: 'library', href: '#' },
          { label: '教务系统', icon: 'education', href: '#' },
          { label: '学生服务', icon: 'student', href: '#' },
          { label: '就业指导', icon: 'career', href: '#' },
          { label: '校友网', icon: 'alumni', href: '#' },
        ],
      },
    },
    {
      id: 'Footer-1',
      key: 'Footer',
      label: 'Footer',
      source: 'frontend/src/components/Footer.vue',
      props: {
        copyright: '© 2024 东南大学 版权所有',
        links: [
          { label: '关于我们', href: '#' },
          { label: '联系我们', href: '#' },
          { label: '隐私政策', href: '#' },
          { label: '使用条款', href: '#' },
        ],
        contact: {
          address: '地址：江苏省南京市四牌楼2号',
          phone: '电话：025-83792401',
          email: '邮箱：webmaster@seu.edu.cn',
        },
      },
    },
  ]

  try {
    const response = await fetch(`${BASE_URL}/projects/${projectCode}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '首页',
        path: '/',
        title: '东南大学 - 首页',
        description: '东南大学官方网站首页',
        schemaData: JSON.stringify(homePageSchema),
      }),
    })

    if (!response.ok) {
      throw new Error(`创建首页失败: ${response.statusText}`)
    }

    const page = await response.json()
    console.log('✓ 首页创建成功:', page.name, 'Code:', page.code)
    return page
  } catch (error) {
    console.error('✗ 创建首页失败:', error.message)
    throw error
  }
}

async function main() {
  console.log('开始创建东南大学项目...\n')

  try {
    // 1. 创建项目
    const project = await createProject()

    // 2. 创建首页
    const homePage = await createHomePage(project.code)

    console.log('\n✓ 项目创建完成！')
    console.log(`项目名称: ${project.name}`)
    console.log(`项目 Code: ${project.code}`)
    console.log(`首页 Code: ${homePage.code}`)
    console.log(`\n访问地址: http://localhost:5173/projects/${project.code}/design/pages/${homePage.code}`)
  } catch (error) {
    console.error('\n✗ 创建失败:', error)
    process.exit(1)
  }
}

main()

