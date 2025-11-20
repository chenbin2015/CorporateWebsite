/**
 * 创建关于我们页面
 * 参考 https://guanwang.makabaka.ltd/about.html
 */

const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

/**
 * 获取项目
 */
async function getProject(projectName = null) {
  try {
    const response = await fetch(`${BASE_URL}/projects`)
    if (!response.ok) {
      throw new Error(`获取项目列表失败: ${response.statusText}`)
    }
    const projects = await response.json()
    
    if (projects.length === 0) {
      throw new Error('没有找到任何项目，请先创建一个项目')
    }
    
    if (projectName) {
      const project = projects.find(p => p.name === projectName)
      if (!project) {
        throw new Error(`没有找到名为"${projectName}"的项目`)
      }
      return project
    }
    
    return projects[0]
  } catch (error) {
    console.error('✗ 获取项目失败:', error.message)
    throw error
  }
}

/**
 * 创建关于我们页面
 */
async function createAboutPage(projectCode) {
  const pageSchema = [
    {
      id: 'MainHeader-about',
      key: 'MainHeader',
      label: 'MainHeader',
      source: 'shared/components/MainHeader.vue',
      props: {
        title: '公司名称',
        subtitle: '公司副标题',
        menuItems: [
          { label: '首页', href: '/', navigation: { type: 'none' } },
          { label: '关于我们', href: '/about', navigation: { type: 'none' } },
          { label: '产品服务', href: '/products', navigation: { type: 'none' } },
          { label: '联系我们', href: '/contact', navigation: { type: 'none' } },
        ],
        fullWidth: true,
      },
    },
    {
      id: 'PageHero-about',
      key: 'PageHero',
      label: 'PageHero',
      source: 'shared/components/PageHero.vue',
      props: {
        title: '关于我们',
        subtitle: '了解我们的故事、使命和愿景',
        description: '我们致力于为客户提供优质的产品和服务，不断创新，追求卓越。',
        backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80',
        fullWidth: true,
      },
    },
    {
      id: 'TextImageSection-about-1',
      key: 'TextImageSection',
      label: 'TextImageSection',
      source: 'shared/components/TextImageSection.vue',
      props: {
        title: '我们的故事',
        subtitle: 'Company Story',
        details: '<p>自成立以来，我们始终坚持以客户为中心，以创新为驱动，致力于为客户创造价值。通过多年的发展，我们已经成长为行业内的领先企业。</p><p>我们的团队由经验丰富的专业人士组成，他们来自不同的背景，但都拥有共同的目标：为客户提供最优质的产品和服务。</p>',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
        reverse: false,
      },
    },
    {
      id: 'TextImageSection-about-2',
      key: 'TextImageSection',
      label: 'TextImageSection',
      source: 'shared/components/TextImageSection.vue',
      props: {
        title: '我们的使命',
        subtitle: 'Our Mission',
        details: '<p>我们的使命是通过创新技术和优质服务，帮助客户实现业务目标，创造更大的价值。</p><p>我们相信，只有真正理解客户的需求，才能提供最合适的解决方案。因此，我们始终与客户保持紧密合作，共同成长。</p>',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        reverse: true,
      },
    },
    {
      id: 'TextImageSection-about-3',
      key: 'TextImageSection',
      label: 'TextImageSection',
      source: 'shared/components/TextImageSection.vue',
      props: {
        title: '我们的愿景',
        subtitle: 'Our Vision',
        details: '<p>我们的愿景是成为行业内的标杆企业，通过持续创新和卓越服务，引领行业发展。</p><p>我们致力于构建一个开放、包容、创新的企业文化，吸引和培养最优秀的人才，为客户和社会创造更大的价值。</p>',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        reverse: false,
      },
    },
    {
      id: 'StatsHighlight-about',
      key: 'StatsHighlight',
      label: 'StatsHighlight',
      source: 'shared/components/StatsHighlight.vue',
      props: {
        title: '我们的成就',
        items: [
          { label: '成立年份', value: '2010' },
          { label: '服务客户', value: '1000+' },
          { label: '团队成员', value: '200+' },
          { label: '项目经验', value: '5000+' },
        ],
        columns: 4,
      },
    },
    {
      id: 'InfoCardGrid-about',
      key: 'InfoCardGrid',
      label: 'InfoCardGrid',
      source: 'shared/components/InfoCardGrid.vue',
      props: {
        title: '核心团队',
        columns: 3,
        cards: [
          {
            title: '张总',
            description: 'CEO | 创始人',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            meta: '首席执行官',
            href: '#',
          },
          {
            title: '李总',
            description: 'CTO | 技术总监',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
            meta: '技术负责人',
            href: '#',
          },
          {
            title: '王总',
            description: 'COO | 运营总监',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
            meta: '运营负责人',
            href: '#',
          },
        ],
      },
    },
    {
      id: 'CTABanner-about',
      key: 'CTABanner',
      label: 'CTABanner',
      source: 'shared/components/sections/CTABanner.vue',
      props: {
        title: '与我们合作',
        description: '如果您对我们的产品或服务感兴趣，欢迎联系我们，我们将为您提供专业的咨询和服务。',
        buttonText: '立即联系',
        navigation: {
          type: 'page',
          targetPageCode: null,
          path: '/contact',
        },
      },
    },
    {
      id: 'Footer-about',
      key: 'Footer',
      label: 'Footer',
      source: 'shared/components/Footer.vue',
      props: {
        fullWidth: true,
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
        name: '关于我们',
        path: '/about',
        title: '关于我们 - 公司名称',
        description: '了解我们的故事、使命和愿景',
        schemaData: JSON.stringify(pageSchema),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`创建页面失败: ${response.statusText} - ${errorText}`)
    }

    const page = await response.json()
    console.log(`✓ 关于我们页面创建成功: ${page.name} (Code: ${page.code})`)
    return page
  } catch (error) {
    console.error('✗ 创建页面失败:', error.message)
    throw error
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('🚀 开始创建关于我们页面...\n')
    
    // 获取项目（优先查找"东南大学"项目，如果没有则使用第一个项目）
    const project = await getProject('东南大学')
    console.log(`✓ 使用项目: ${project.name} (Code: ${project.code})\n`)
    
    // 创建关于我们页面
    await createAboutPage(project.code)
    
    console.log('\n✅ 关于我们页面创建完成！')
    console.log('\n📝 提示：')
    console.log('  - 页面已创建，你可以在页面列表中查看')
    console.log('  - 页面包含了：导航栏、主视觉、故事介绍、使命愿景、统计数据、团队介绍、行动召唤、页脚')
    console.log('  - 你可以在页面搭建器中进一步编辑和优化')
    
  } catch (error) {
    console.error('\n❌ 创建失败:', error.message)
    process.exit(1)
  }
}

main()

