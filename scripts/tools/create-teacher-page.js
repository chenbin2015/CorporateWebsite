/**
 * 创建教师中心页面
 * 使用 InfoCardGrid 组件展示教师信息
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
 * 获取数据源
 */
async function getDataSource(projectCode, name) {
  try {
    const response = await fetch(`${BASE_URL}/projects/${projectCode}/data-sources`)
    if (!response.ok) {
      throw new Error(`获取数据源列表失败: ${response.statusText}`)
    }
    const dataSources = await response.json()
    const dataSource = dataSources.find(ds => ds.name === name)
    if (!dataSource) {
      throw new Error(`没有找到名为"${name}"的数据源`)
    }
    return dataSource
  } catch (error) {
    console.error('✗ 获取数据源失败:', error.message)
    throw error
  }
}

/**
 * 获取数据源项
 */
async function getDataSourceItems(dataSourceCode) {
  try {
    const response = await fetch(`${BASE_URL}/data-sources/${dataSourceCode}/items`)
    if (!response.ok) {
      throw new Error(`获取数据源项失败: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('✗ 获取数据源项失败:', error.message)
    throw error
  }
}

/**
 * 创建教师中心页面
 */
async function createTeacherPage(projectCode, teacherDataSourceCode) {
  // 获取教师数据源项
  const items = await getDataSourceItems(teacherDataSourceCode)
  
  // 将教师数据转换为 InfoCardGrid 需要的格式
  const cards = items.map((item, index) => {
    const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data
    return {
      title: data.name || '未命名教师',
      description: `${data.title || ''} | ${data.department || ''}\n${data.research || ''}\n${data.summary || ''}`,
      image: data.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      href: '#',
      meta: data.department || '',
    }
  })

  const pageSchema = [
    {
      id: 'PageHero-teacher',
      key: 'PageHero',
      label: 'PageHero',
      source: 'shared/components/PageHero.vue',
      props: {
        title: '教师中心',
        subtitle: '优秀的师资队伍是学校发展的核心力量',
        backgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
      },
    },
    {
      id: 'InfoCardGrid-teacher',
      key: 'InfoCardGrid',
      label: 'InfoCardGrid',
      source: 'shared/components/InfoCardGrid.vue',
      props: {
        title: '师资队伍',
        columns: 3,
        cards: cards,
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
        name: '教师中心',
        path: '/teachers',
        title: '教师中心 - 东南大学',
        description: '展示学校优秀的师资队伍',
        schemaData: JSON.stringify(pageSchema),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`创建页面失败: ${response.statusText} - ${errorText}`)
    }

    const page = await response.json()
    console.log(`✓ 教师中心页面创建成功: ${page.name} (Code: ${page.code})`)
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
    console.log('🚀 开始创建教师中心页面...\n')
    
    // 获取项目
    const project = await getProject('东南大学')
    console.log(`✓ 使用项目: ${project.name} (Code: ${project.code})\n`)
    
    // 获取教师数据源
    const teacherDataSource = await getDataSource(project.code, '教师库')
    console.log(`✓ 找到教师数据源: ${teacherDataSource.name} (Code: ${teacherDataSource.code})\n`)
    
    // 创建教师中心页面
    await createTeacherPage(project.code, teacherDataSource.code)
    
    console.log('\n✅ 教师中心页面创建完成！')
    console.log('\n📝 提示：')
    console.log('  - 页面已创建，你可以在页面列表中查看')
    console.log('  - 页面使用了 InfoCardGrid 组件展示教师信息')
    console.log('  - 教师数据来自"教师库"数据源')
    
  } catch (error) {
    console.error('\n❌ 创建失败:', error.message)
    process.exit(1)
  }
}

main()

