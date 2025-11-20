/**
 * 初始化数据源数据
 * 为指定项目创建测试数据源和数据项
 */

const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// 注意：这个脚本需要后端服务运行

/**
 * 获取项目列表，找到第一个项目或指定名称的项目
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
 * 创建数据源
 */
async function createDataSource(projectCode, name, type, description) {
  try {
    const response = await fetch(`${BASE_URL}/projects/${projectCode}/data-sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        type,
        description,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`创建数据源失败: ${response.statusText} - ${errorText}`)
    }

    const dataSource = await response.json()
    console.log(`✓ 数据源创建成功: ${name} (${type}) - Code: ${dataSource.code}`)
    return dataSource
  } catch (error) {
    console.error(`✗ 创建数据源失败 [${name}]:`, error.message)
    throw error
  }
}

/**
 * 创建数据源项
 */
async function createDataSourceItem(dataSourceCode, data, sortOrder = 0) {
  try {
    const response = await fetch(`${BASE_URL}/data-sources/${dataSourceCode}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: JSON.stringify(data),
        sortOrder,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`创建数据源项失败: ${response.statusText} - ${errorText}`)
    }

    const item = await response.json()
    return item
  } catch (error) {
    console.error(`✗ 创建数据源项失败:`, error.message)
    throw error
  }
}

/**
 * 初始化新闻数据源
 */
async function initNewsDataSource(projectCode) {
  console.log('\n📰 初始化新闻数据源...')
  
  const dataSource = await createDataSource(
    projectCode,
    '新闻库',
    'news',
    '东南大学新闻动态数据源'
  )

  const newsItems = [
    {
      title: '东南大学2025年春季学期开学典礼隆重举行',
      date: '2025-02-20',
      cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      summary: '2月20日，东南大学2025年春季学期开学典礼在四牌楼校区大礼堂隆重举行。校领导、各院系负责人、教师代表和全体新生参加了典礼。',
      content: '<p>2月20日，东南大学2025年春季学期开学典礼在四牌楼校区大礼堂隆重举行。校领导、各院系负责人、教师代表和全体新生参加了典礼。</p><p>校长在致辞中表示，希望同学们在新学期里努力学习，全面发展，为学校和国家的发展贡献自己的力量。</p>',
    },
    {
      title: '我校科研团队在人工智能领域取得重大突破',
      date: '2025-02-18',
      cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      summary: '我校计算机科学与工程学院科研团队在人工智能领域取得重大突破，相关研究成果已发表在顶级国际期刊上。',
      content: '<p>我校计算机科学与工程学院科研团队在人工智能领域取得重大突破，相关研究成果已发表在顶级国际期刊上。</p><p>该研究为人工智能技术的发展提供了新的思路和方法，具有重要的理论意义和应用价值。</p>',
    },
    {
      title: '东南大学与多家企业签署产学研合作协议',
      date: '2025-02-15',
      cover: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      summary: '东南大学与多家知名企业签署产学研合作协议，将在人才培养、科研合作、成果转化等方面开展深度合作。',
      content: '<p>东南大学与多家知名企业签署产学研合作协议，将在人才培养、科研合作、成果转化等方面开展深度合作。</p><p>此次合作将进一步促进学校与企业的深度融合，推动科技成果转化和人才培养质量的提升。</p>',
    },
    {
      title: '我校学生在国际数学建模竞赛中荣获特等奖',
      date: '2025-02-12',
      cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
      summary: '我校学生团队在国际数学建模竞赛中表现出色，荣获特等奖，展现了东南大学学生的优秀素质和创新能力。',
      content: '<p>我校学生团队在国际数学建模竞赛中表现出色，荣获特等奖，展现了东南大学学生的优秀素质和创新能力。</p><p>这是我校在该项赛事中取得的历史最好成绩，充分体现了学校在数学建模教学和人才培养方面的成果。</p>',
    },
    {
      title: '东南大学举办2025年春季校园招聘会',
      date: '2025-02-10',
      cover: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
      summary: '东南大学2025年春季校园招聘会在九龙湖校区体育馆举行，吸引了200多家知名企业前来招聘，提供就业岗位5000余个。',
      content: '<p>东南大学2025年春季校园招聘会在九龙湖校区体育馆举行，吸引了200多家知名企业前来招聘，提供就业岗位5000余个。</p><p>招聘会现场气氛热烈，学生们积极投递简历，与企业代表进行深入交流。</p>',
    },
    {
      title: '我校新增两个国家级一流本科专业建设点',
      date: '2025-02-08',
      cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      summary: '教育部公布了2024年度国家级一流本科专业建设点名单，我校新增两个专业入选，专业建设水平进一步提升。',
      content: '<p>教育部公布了2024年度国家级一流本科专业建设点名单，我校新增两个专业入选，专业建设水平进一步提升。</p><p>截至目前，我校已有多个专业入选国家级一流本科专业建设点，专业建设成果显著。</p>',
    },
  ]

  console.log(`  创建 ${newsItems.length} 条新闻...`)
  for (let i = 0; i < newsItems.length; i++) {
    await createDataSourceItem(dataSource.code, newsItems[i], i)
    console.log(`  ✓ 新闻 ${i + 1}: ${newsItems[i].title}`)
  }

  return dataSource
}

/**
 * 初始化产品数据源
 */
async function initProductDataSource(projectCode) {
  console.log('\n🛍️ 初始化产品数据源...')
  
  const dataSource = await createDataSource(
    projectCode,
    '产品库',
    'product',
    '产品展示数据源'
  )

  const products = [
    {
      name: '智能学习系统',
      description: '基于人工智能的个性化学习系统，帮助学生提高学习效率',
      image: 'http://localhost:8002/p1.jpg',
      price: '2999',
      originalPrice: '3999',
      content: '<p>智能学习系统是一款基于人工智能技术的个性化学习平台，通过分析学生的学习行为和能力水平，为每个学生提供定制化的学习方案。</p><p>系统支持多学科学习，包括数学、语文、英语等主要学科，帮助学生全面提升学习能力。</p>',
    },
    {
      name: '在线教育平台',
      description: '专业的在线教育平台，提供丰富的课程资源和互动学习体验',
      image: 'http://localhost:8002/p1.jpg',
      price: '1999',
      originalPrice: '2999',
      content: '<p>在线教育平台汇聚了众多优质课程资源，涵盖各个学科和领域。平台支持直播授课、录播回放、在线答疑等多种学习方式。</p><p>学生可以根据自己的需求选择课程，灵活安排学习时间，享受便捷的在线学习体验。</p>',
    },
    {
      name: '科研数据分析工具',
      description: '强大的科研数据分析工具，支持多种数据格式和统计分析方法',
      image: 'http://localhost:8002/p1.jpg',
      price: '4999',
      originalPrice: '5999',
      content: '<p>科研数据分析工具是一款专业的数据分析软件，支持Excel、CSV、JSON等多种数据格式导入。</p><p>工具内置了丰富的统计分析方法，包括描述性统计、假设检验、回归分析等，帮助科研人员快速完成数据分析工作。</p>',
    },
    {
      name: '虚拟实验室系统',
      description: '3D虚拟实验室系统，提供沉浸式的实验学习体验',
      image: 'http://localhost:8002/p1.jpg',
      price: '3999',
      originalPrice: '4999',
      content: '<p>虚拟实验室系统采用先进的3D技术，构建了逼真的实验环境。学生可以在虚拟环境中进行各种实验操作，无需担心实验器材和材料的安全问题。</p><p>系统支持物理、化学、生物等多个学科的虚拟实验，帮助学生更好地理解实验原理和操作流程。</p>',
    },
    {
      name: '智能考试系统',
      description: '全自动化的智能考试系统，支持在线考试和自动阅卷',
      image: 'http://localhost:8002/p1.jpg',
      price: '5999',
      originalPrice: '6999',
      content: '<p>智能考试系统是一款全自动化的在线考试平台，支持多种题型，包括选择题、填空题、简答题等。</p><p>系统具备自动阅卷功能，可以快速完成客观题的评分，大大提高了考试效率。同时，系统还提供了防作弊功能，确保考试的公平性。</p>',
    },
    {
      name: '校园管理系统',
      description: '综合性的校园管理系统，涵盖学生管理、课程管理、成绩管理等功能',
      image: 'http://localhost:8002/p1.jpg',
      price: '8999',
      originalPrice: '9999',
      content: '<p>校园管理系统是一款综合性的管理平台，为学校提供全方位的管理服务。系统包括学生信息管理、课程安排、成绩录入、考勤管理等多个模块。</p><p>系统采用模块化设计，可以根据学校的具体需求进行定制和扩展，满足不同规模学校的个性化需求。</p>',
    },
  ]

  console.log(`  创建 ${products.length} 个产品...`)
  for (let i = 0; i < products.length; i++) {
    await createDataSourceItem(dataSource.code, products[i], i)
    console.log(`  ✓ 产品 ${i + 1}: ${products[i].name}`)
  }

  return dataSource
}

/**
 * 初始化教师数据源
 */
async function initTeacherDataSource(projectCode) {
  console.log('\n👨‍🏫 初始化教师数据源...')
  
  const dataSource = await createDataSource(
    projectCode,
    '教师库',
    'teacher',
    '教师介绍数据源'
  )

  const teachers = [
    {
      name: '张教授',
      title: '教授、博士生导师',
      department: '计算机科学与工程学院',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      summary: '主要从事人工智能、机器学习等领域的研究，发表SCI论文100余篇',
      research: '人工智能、机器学习、深度学习',
      email: 'zhang@seu.edu.cn',
    },
    {
      name: '李教授',
      title: '教授、博士生导师',
      department: '电子科学与工程学院',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      summary: '长期从事微电子技术、集成电路设计等领域的研究，承担多项国家级科研项目',
      research: '微电子技术、集成电路设计、半导体器件',
      email: 'li@seu.edu.cn',
    },
    {
      name: '王教授',
      title: '教授、博士生导师',
      department: '信息科学与工程学院',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      summary: '专注于通信工程、信号处理等领域的研究，获得多项省部级科技奖励',
      research: '通信工程、信号处理、无线通信',
      email: 'wang@seu.edu.cn',
    },
    {
      name: '刘教授',
      title: '教授、博士生导师',
      department: '自动化学院',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      summary: '主要从事控制理论与控制工程、智能控制等领域的研究，发表高水平论文80余篇',
      research: '控制理论与控制工程、智能控制、机器人技术',
      email: 'liu@seu.edu.cn',
    },
    {
      name: '陈教授',
      title: '教授、博士生导师',
      department: '机械工程学院',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      summary: '长期从事机械设计、智能制造等领域的研究，主持完成多项重大科研项目',
      research: '机械设计、智能制造、精密加工',
      email: 'chen@seu.edu.cn',
    },
    {
      name: '赵教授',
      title: '教授、博士生导师',
      department: '材料科学与工程学院',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      summary: '专注于新材料研发、材料性能优化等领域的研究，获得多项发明专利',
      research: '新材料研发、材料性能优化、纳米材料',
      email: 'zhao@seu.edu.cn',
    },
  ]

  console.log(`  创建 ${teachers.length} 位教师...`)
  for (let i = 0; i < teachers.length; i++) {
    await createDataSourceItem(dataSource.code, teachers[i], i)
    console.log(`  ✓ 教师 ${i + 1}: ${teachers[i].name} - ${teachers[i].title}`)
  }

  return dataSource
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('🚀 开始初始化数据源数据...\n')
    
    // 获取项目（优先查找"东南大学"项目，如果没有则使用第一个项目）
    const project = await getProject('东南大学')
    console.log(`✓ 使用项目: ${project.name} (Code: ${project.code})\n`)
    
    // 初始化新闻数据源
    await initNewsDataSource(project.code)
    
    // 初始化产品数据源
    await initProductDataSource(project.code)
    
    // 初始化教师数据源
    await initTeacherDataSource(project.code)
    
    console.log('\n✅ 数据源初始化完成！')
    console.log('\n📝 提示：')
    console.log('  - 新闻数据源：包含6条新闻数据')
    console.log('  - 产品数据源：包含6个产品数据')
    console.log('  - 教师数据源：包含6位教师数据')
    console.log('  - 你可以在页面搭建器中选择这些数据源，然后选择需要的数据项')
    
  } catch (error) {
    console.error('\n❌ 初始化失败:', error.message)
    process.exit(1)
  }
}

main()

