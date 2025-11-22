/**
 * 一键初始化脚本
 * 一次性完成：数据库表结构初始化 + 项目创建 + 页面创建 + 数据源初始化
 * 
 * 使用方法：
 *   node scripts/init-all.js [--env=prod|local]
 * 
 * 参数说明：
 *   --env=prod   : 使用生产环境配置（默认）
 *   --env=local  : 使用本地环境配置
 * 
 * 环境变量（可选，会覆盖配置中的默认值）：
 *   DB_HOST=127.0.0.1 (或 localhost，建议使用 127.0.0.1 避免 IPv6 问题)
 *   DB_PORT=8024
 *   DB_USER=root
 *   DB_PASSWORD=root123456
 *   DB_NAME=corporate_platform
 *   API_BASE_URL=http://localhost:8082/api
 */

const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2)
  const envArg = args.find(arg => arg.startsWith('--env='))
  if (envArg) {
    return envArg.split('=')[1] || 'prod'
  }
  return 'prod' // 默认使用生产环境
}

// 获取环境参数
const ENV = parseArgs()

/**
 * 生成菜单结构（直接写死在脚本中）
 */
function generateMenuItems() {
  const menuItems = [
    {
      label: '首页',
      href: '/',
      navigation: { type: 'none' },
      children: [],
    },
    {
      label: '中心概况',
      href: '/center-overview',
      navigation: { type: 'none' },
      children: [],
    },
    {
      label: '实验教学',
      href: '/experimental-teaching',
      navigation: { type: 'none' },
      children: [
        {
          label: '课程体系',
          href: '/experimental-teaching/course-system',
          navigation: { type: 'none' },
        },
        {
          label: '实验课程',
          href: '/experimental-teaching/experimental-courses',
          navigation: { type: 'none' },
        },
      ],
    },
    {
      label: '实验资源',
      href: '/experimental-resources',
      navigation: { type: 'none' },
      children: [
        {
          label: '实验仪器',
          href: '/experimental-resources/instruments',
          navigation: { type: 'none' },
        },
        {
          label: '实验空间',
          href: '/experimental-resources/spaces',
          navigation: { type: 'none' },
        },
        {
          label: '开放共享',
          href: '/experimental-resources/open-sharing',
          navigation: { type: 'none' },
        },
      ],
    },
    {
      label: '建设成效',
      href: '/construction-results',
      navigation: { type: 'none' },
      children: [
        {
          label: '实验教学改革',
          href: '/construction-results/teaching-reform',
          navigation: { type: 'none' },
          highlight: true, // 特殊标记
        },
        {
          label: '科研创新成果',
          href: '/construction-results/research-achievements',
          navigation: { type: 'none' },
        },
        {
          label: '实验环境与能力',
          href: '/construction-results/environment-capability',
          navigation: { type: 'none' },
        },
      ],
    },
    {
      label: '安全管理',
      href: '/safety-management',
      navigation: { type: 'none' },
      children: [
        {
          label: '安全教育',
          href: '/safety-management/education',
          navigation: { type: 'none' },
        },
        {
          label: '安全准入',
          href: '/safety-management/access',
          navigation: { type: 'none' },
        },
        {
          label: '管理制度',
          href: '/safety-management/regulations',
          navigation: { type: 'none' },
        },
      ],
    },
    {
      label: '科普教育',
      href: '/science-education',
      navigation: { type: 'none' },
      children: [],
    },
  ]
  
  console.log(`  生成菜单: 共 ${menuItems.length} 个一级菜单`)
  
  return menuItems
}

// 带超时的 fetch 封装
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  // 检查是否支持 AbortController
  if (typeof AbortController === 'undefined') {
    // 如果不支持 AbortController，使用普通的 fetch（较旧的 Node.js 版本）
    return await fetch(url, options)
  }
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    try {
      controller.abort()
    } catch (err) {
      // 忽略取消操作的错误
    }
  }, timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('请求超时')
    }
    throw error
  } finally {
    // 确保清理 timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}

// 数据库配置 - 生产环境
const dbConfigProd = {
  host: process.env.DB_HOST || '127.0.0.1', // 使用 127.0.0.1 而不是 localhost，避免 IPv6 问题
  port: parseInt(process.env.DB_PORT || '8024'),
  user: process.env.DB_USER || 'constweak',
  password: process.env.DB_PASSWORD || 'k9#Qz$mR!pX2@L8',
  database: process.env.DB_NAME || 'corporate_platform',
  multipleStatements: true,
  charset: 'utf8mb4',
}

// 数据库配置 - 本地环境
const dbConfigLocal = {
  host: process.env.DB_HOST || '127.0.0.1', // 使用 127.0.0.1 而不是 localhost，避免 IPv6 问题
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123456',
  database: process.env.DB_NAME || 'tet',
  multipleStatements: true,
  charset: 'utf8mb4',
}

// 根据环境参数选择数据库配置
const dbConfig = ENV === 'local' ? dbConfigLocal : dbConfigProd

// API 配置（根据环境选择）
const API_BASE_URL = process.env.API_BASE_URL || process.env.VITE_API_BASE_URL || 
  (ENV === 'local' ? 'http://localhost:8082/api' : 'http://localhost:8082/api')

// ============================================
// 第一部分：数据库初始化
// ============================================

async function initDatabase() {
  console.log('📦 第一步：初始化数据库表结构...\n')
  
  let connection
  try {
    connection = await mysql.createConnection(dbConfig)
    console.log('✓ 数据库连接成功')

    // 读取 SQL 文件
    const sqlPath = path.join(__dirname, 'database', 'init-all.sql')
    const sql = fs.readFileSync(sqlPath, 'utf-8')

    // 执行 SQL
    await connection.query(sql)
    console.log('✓ 数据库表结构初始化完成\n')
  } catch (error) {
    console.error('✗ 数据库初始化失败:', error.message)
    throw error
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

// ============================================
// 第二部分：API 操作（项目、页面、数据源）
// ============================================

/**
 * 创建 admin 用户（如果不存在）
 */
async function ensureAdminUser() {
  console.log('👤 检查 admin 用户...\n')
  
  try {
    // 尝试注册 admin 用户
    const response = await fetchWithTimeout(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123',
      }),
    }, 10000)

    if (response.ok) {
      console.log('✓ admin 用户创建成功（用户名: admin, 密码: admin123）\n')
      return true
    } else {
      const errorText = await response.text()
      // 如果用户已存在，忽略错误
      if (response.status === 400 && errorText.includes('already exists')) {
        console.log('ℹ admin 用户已存在，跳过创建\n')
        return true
      }
      // 其他错误则抛出
      throw new Error(`创建 admin 用户失败: ${response.statusText} - ${errorText}`)
    }
  } catch (error) {
    // 如果是因为用户已存在，忽略错误
    if (error.message.includes('already exists')) {
      console.log('ℹ admin 用户已存在，跳过创建\n')
      return true
    }
    console.error('✗ 创建 admin 用户失败:', error.message)
    // 不抛出错误，允许继续执行（用户可能已经存在）
    return false
  }
}

/**
 * 创建项目
 */
async function createProject() {
  console.log('📁 第二步：创建项目...\n')
  
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '示例项目',
        description: '这是一个示例项目，包含多个页面和组件数据',
      }),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      // 如果项目已存在，尝试获取现有项目
      if (response.status === 400 || response.status === 500) {
        const projectsResponse = await fetchWithTimeout(`${API_BASE_URL}/projects`, {}, 10000)
        if (projectsResponse.ok) {
          const projects = await projectsResponse.json()
          const existingProject = projects.find(p => p.name === '示例项目')
          if (existingProject) {
            console.log(`✓ 项目已存在: ${existingProject.name} (Code: ${existingProject.code})\n`)
            return existingProject
          }
        }
      }
      throw new Error(`创建项目失败: ${response.statusText} - ${errorText}`)
    }

    const project = await response.json()
    console.log(`✓ 项目创建成功: ${project.name} (Code: ${project.code})\n`)
    return project
  } catch (error) {
    console.error('✗ 创建项目失败:', error.message)
    throw error
  }
}

/**
 * 更新项目导航配置
 */
async function updateProjectNavigation(projectCode, navigationConfig) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects/${projectCode}/navigation`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        navigationConfig: JSON.stringify(navigationConfig),
      }),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`更新导航配置失败: ${response.statusText} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('✗ 更新导航配置失败:', error.message)
    throw error
  }
}

/**
 * 更新项目详情页模板配置
 */
async function updateProjectDetailPageTemplates(projectCode, detailPageTemplates) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects/${projectCode}/detail-page-templates`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        detailPageTemplates: JSON.stringify(detailPageTemplates),
      }),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`更新详情页模板配置失败: ${response.statusText} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('✗ 更新详情页模板配置失败:', error.message)
    throw error
  }
}

/**
 * 获取统一的Footer配置
 */
function getDefaultFooterConfig() {
  return {
    id: 'Footer-1',
    key: 'Footer',
    label: 'Footer',
    props: {
      copyright: '© 2025 智慧校园 版权所有',
      links: [
        { label: '关于我们', href: '/about' },
        { label: '联系我们', href: '/contact' },
        { label: '隐私政策', href: '#' },
        { label: '使用条款', href: '#' },
      ],
      contact: {
        address: '地址：XX 大学 XX 校区 XX 路 123 号',
        phone: '电话：010-1234 5678',
        email: '邮箱：contact@example.edu',
      },
      backgroundColor: '#1e293b',
      textColor: '#f1f5f9',
      linkColor: '#cbd5e1',
      fullWidth: true,
      margin: '0',
    },
  }
}

/**
 * 初始化详情页模板
 */
function initDetailPageTemplates() {
  return {
    news: {
      schemaData: JSON.stringify([
        {
          id: 'MainHeader-1',
          key: 'MainHeader',
          label: 'MainHeader',
          props: {
            title: '企业门户',
            subtitle: '智慧校园 · 数字化管理平台',
            navBackgroundColor: '#1e3a5f', // 深蓝灰色背景，现代专业
            titleColor: '#ffffff', // 纯白色标题，清晰醒目
            subtitleColor: '#cbd5e1', // 浅蓝灰色副标题，优雅柔和
            showSearch: false,
            fullWidth: true,
            fixed: true,
            backgroundOpacity: 1,
            margin: '0',
          },
        },
        {
          id: 'ContentDetail-1',
          key: 'ContentDetail',
          label: 'ContentDetail',
          props: {
            title: '{{title}}',
            createdAt: '{{date}}',
            author: '{{author}}',
            content: '{{content}}',
            showTitle: true,
            showCreatedAt: true,
            showAuthor: true,
            showContent: true,
            fullWidth: false,
            margin: '2.4rem auto',
          },
        },
        getDefaultFooterConfig(),
      ]),
      updatedAt: new Date().toISOString(),
    },
    product: {
      schemaData: JSON.stringify([
        {
          id: 'MainHeader-1',
          key: 'MainHeader',
          label: 'MainHeader',
          props: {
            title: '企业门户',
            subtitle: '智慧校园 · 数字化管理平台',
            navBackgroundColor: '#1e3a5f', // 深蓝灰色背景，现代专业
            titleColor: '#ffffff', // 纯白色标题，清晰醒目
            subtitleColor: '#cbd5e1', // 浅蓝灰色副标题，优雅柔和
            showSearch: false,
            fullWidth: true,
            fixed: true,
            backgroundOpacity: 1,
            margin: '0',
          },
        },
        {
          id: 'ContentDetail-1',
          key: 'ContentDetail',
          label: 'ContentDetail',
          props: {
            title: '{{name}}',
            content: '{{content}}',
            showTitle: true,
            showCreatedAt: false,
            showAuthor: false,
            showContent: true,
            fullWidth: false,
            margin: '2.4rem auto',
          },
        },
        getDefaultFooterConfig(),
      ]),
      updatedAt: new Date().toISOString(),
    },
    notice: {
      schemaData: JSON.stringify([
        {
          id: 'MainHeader-1',
          key: 'MainHeader',
          label: 'MainHeader',
          props: {
            title: '企业门户',
            subtitle: '智慧校园 · 数字化管理平台',
            navBackgroundColor: '#1e3a5f', // 深蓝灰色背景，现代专业
            titleColor: '#ffffff', // 纯白色标题，清晰醒目
            subtitleColor: '#cbd5e1', // 浅蓝灰色副标题，优雅柔和
            showSearch: false,
            fullWidth: true,
            fixed: true,
            backgroundOpacity: 1,
            margin: '0',
          },
        },
        {
          id: 'PageHero-1',
          key: 'PageHero',
          label: 'PageHero',
          props: {
            title: '{{title}}',
            subtitle: '通知公告',
            description: '',
            background: '',
            fullWidth: false,
            margin: '2.4rem auto',
          },
        },
        {
          id: 'ContentDetail-1',
          key: 'ContentDetail',
          label: 'ContentDetail',
          props: {
            title: '{{title}}',
            createdAt: '{{date}}',
            content: '{{content}}',
            showTitle: true,
            showCreatedAt: true,
            showAuthor: false,
            showContent: true,
            fullWidth: false,
            margin: '2.4rem auto',
          },
        },
        getDefaultFooterConfig(),
      ]),
      updatedAt: new Date().toISOString(),
    },
  }
}

/**
 * 创建页面
 */
async function createPage(projectCode, pageData) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects/${projectCode}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      // 如果页面已存在，跳过
      if (response.status === 400 || response.status === 500) {
        console.log(`  ⚠️  页面可能已存在: ${pageData.name}`)
        return null
      }
      throw new Error(`创建页面失败: ${response.statusText} - ${errorText}`)
    }

    const page = await response.json()
    console.log(`  ✓ 页面创建成功: ${page.name} (Code: ${page.code})`)
    return page
  } catch (error) {
    console.error(`  ✗ 创建页面失败 [${pageData.name}]:`, error.message)
    return null
  }
}

/**
 * 发布页面
 */
async function publishPage(projectCode, pageCode, schemaData = null) {
  try {
    const publishData = schemaData ? { schemaData } : {}
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects/${projectCode}/pages/${pageCode}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publishData),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`发布页面失败: ${response.statusText} - ${errorText}`)
    }

    const page = await response.json()
    console.log(`  ✓ 页面发布成功: ${page.name} (Code: ${page.code})`)
    return page
  } catch (error) {
    console.error(`  ✗ 发布页面失败 [${pageCode}]:`, error.message)
    return null
  }
}

/**
 * 创建数据源
 */
async function createDataSource(projectCode, name, type, description) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects/${projectCode}/data-sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        type,
        description,
      }),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`创建数据源失败: ${response.statusText} - ${errorText}`)
    }

    const dataSource = await response.json()
    return dataSource
  } catch (error) {
    console.error(`  ✗ 创建数据源失败 [${name}]:`, error.message)
    throw error
  }
}

/**
 * 创建数据源项
 */
async function createDataSourceItem(dataSourceCode, data, sortOrder = 0) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/data-sources/${dataSourceCode}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: JSON.stringify(data),
        sortOrder,
      }),
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`创建数据源项失败: ${response.statusText} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`  ✗ 创建数据源项失败:`, error.message)
    throw error
  }
}

/**
 * 获取数据源的所有数据项
 */
async function getDataSourceItems(dataSourceCode) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/data-sources/${dataSourceCode}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`获取数据源项失败: ${response.statusText} - ${errorText}`)
    }

    const items = await response.json()
    // 解析每个项的data字段
    return items.map(item => ({
      ...item,
      data: JSON.parse(item.data || '{}'),
    }))
  } catch (error) {
    console.error(`  ✗ 获取数据源项失败 [${dataSourceCode}]:`, error.message)
    return []
  }
}

/**
 * 转换数据源项为组件可用的items格式
 */
function convertDataSourceItemsToComponentItems(items, componentKey) {
  if (!items || items.length === 0) {
    return []
  }

  if (componentKey === 'NoticeList') {
    // 公告组件：将数据源项转换为 items 数组
    return items.map(item => ({
      id: item.code,
      title: item.data.title || '',
      date: item.data.date || '',
      content: item.data.content || '',
      ...item.data,
    }))
  } else if (componentKey === 'NewsSection' || componentKey === 'NewsListPage') {
    // 新闻组件：将数据源项转换为 items 数组
    return items.map(item => ({
      id: item.code,
      title: item.data.title || '',
      date: item.data.date || '',
      content: item.data.content || '',
      cover: item.data.cover || '',
      summary: item.data.summary || '',
      ...item.data,
    }))
  } else if (componentKey === 'ProductList') {
    // 产品组件：将数据源项转换为 products 数组
    return items.map(item => ({
      id: item.code,
      name: item.data.name || '',
      description: item.data.description || '',
      image: item.data.image || '',
      price: item.data.price || '',
      originalPrice: item.data.originalPrice || '',
      content: item.data.content || '',
      ...item.data,
    }))
  }

  return []
}

/**
 * 根据页面路径匹配导航菜单项索引（支持嵌套菜单）
 * @param {string} pagePath - 页面路径
 * @param {Array} navigationMenuItems - 导航菜单项数组
 * @returns {number} - 匹配的菜单项索引，如果没有匹配则返回 -1
 */
function findMatchingMenuItemIndex(pagePath, navigationMenuItems) {
  if (!navigationMenuItems || navigationMenuItems.length === 0) {
    return -1
  }

  // 递归查找匹配的菜单项
  function findIndexRecursive(items, path, parentIndex = -1) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      // 检查当前菜单项的路径是否匹配
      if (item.href === path) {
        // 如果是一级菜单，返回索引
        if (parentIndex === -1) {
          return i
        }
        // 如果是二级菜单，返回父菜单的索引（因为 MainHeader 的 defaultActiveIndex 指向一级菜单）
        return parentIndex
      }
      
      // 如果有子菜单，递归查找
      if (item.children && item.children.length > 0) {
        const childIndex = findIndexRecursive(item.children, path, i)
        if (childIndex !== -1) {
          return childIndex
        }
      }
    }
    return -1
  }

  return findIndexRecursive(navigationMenuItems, pagePath)
}

/**
 * 更新页面schemaData中MainHeader的defaultActiveIndex
 * @param {string} schemaDataJson - schemaData的JSON字符串
 * @param {string} pagePath - 页面路径
 * @param {Array} navigationMenuItems - 导航菜单项数组
 * @returns {string} - 更新后的schemaData JSON字符串
 */
function updateMainHeaderActiveIndex(schemaDataJson, pagePath, navigationMenuItems) {
  try {
    const schemaData = JSON.parse(schemaDataJson)
    
    // 找到MainHeader组件
    const mainHeaderIndex = schemaData.findIndex(item => item.key === 'MainHeader')
    if (mainHeaderIndex !== -1) {
      // 找到匹配的菜单项索引
      const activeIndex = findMatchingMenuItemIndex(pagePath, navigationMenuItems)
      if (activeIndex !== -1) {
        // 更新defaultActiveIndex
        schemaData[mainHeaderIndex].props.defaultActiveIndex = activeIndex
      }
    }
    
    return JSON.stringify(schemaData)
  } catch (error) {
    console.warn(`  警告：更新MainHeader的defaultActiveIndex失败:`, error.message)
    return schemaDataJson
  }
}

/**
 * 生成默认页面模板（MainHeader + PageHero + [SideNav] + ContentDetail + Footer）
 * @param {string} pageName - 页面名称
 * @param {string} pagePath - 页面路径
 * @param {Object} menuInfo - 菜单信息 { parentMenu, children }
 */
function generateDefaultPageSchema(pageName, pagePath, menuInfo = null) {
  const components = [
    {
      id: 'MainHeader-1',
      key: 'MainHeader',
      label: 'MainHeader',
      props: {
        title: '企业门户',
        subtitle: '智慧校园 · 数字化管理平台',
        navBackgroundColor: '#1e3a5f',
        titleColor: '#ffffff',
        subtitleColor: '#cbd5e1',
        showSearch: false,
        fullWidth: true,
        fixed: true,
        backgroundOpacity: 1,
        margin: '0',
      },
    },
    {
      id: 'PageHero-1',
      key: 'PageHero',
      label: 'PageHero',
      props: {
        title: pageName,
        subtitle: '',
        description: `欢迎访问${pageName}页面`,
        background: '',
        fullWidth: false,
        margin: '2.4rem auto',
      },
    },
  ]

  // 如果有二级菜单，添加 SideNav 组件
  if (menuInfo && menuInfo.parentMenu && menuInfo.children && menuInfo.children.length > 0) {
    components.push({
      id: 'SideNav-1',
      key: 'SideNav',
      label: 'SideNav',
      props: {
        parentMenu: menuInfo.parentMenu,
        children: menuInfo.children,
        activePath: pagePath,
        width: '240px',
        backgroundColor: '#f8fafc',
        textColor: '#334155',
        activeBackgroundColor: '#2563eb',
        activeTextColor: '#ffffff',
      },
    })
  }

  components.push({
    id: 'ContentDetail-1',
    key: 'ContentDetail',
    label: 'ContentDetail',
    props: {
      title: pageName,
      createdAt: '',
      author: '',
      content: `<p>这是${pageName}页面的内容，您可以在此编辑和更新页面信息。</p><p>页面路径：${pagePath}</p>`,
      showTitle: true,
      showCreatedAt: false,
      showAuthor: false,
      showContent: true,
      fullWidth: false,
      margin: '2.4rem auto',
    },
  })

  components.push(getDefaultFooterConfig())

  return JSON.stringify(components)
}

/**
 * 根据菜单结构生成所有页面配置
 */
function generatePagesFromMenu(menuItems, dataSources) {
  const pages = []
  const newsDataSourceCode = dataSources.news?.code || null
  const productDataSourceCode = dataSources.product?.code || null
  const noticeDataSourceCode = dataSources.notice?.code || null

  // 首页使用特殊模板
  const homePage = {
    name: '首页',
    path: '/',
    title: '首页 - 智慧校园',
    description: '智慧校园首页，展示核心服务和信息',
    schemaData: JSON.stringify([
      {
        id: 'MainHeader-1',
        key: 'MainHeader',
        label: 'MainHeader',
        props: {
          title: '企业门户',
          subtitle: '智慧校园 · 数字化管理平台',
          navBackgroundColor: '#1e3a5f',
          titleColor: '#ffffff',
          subtitleColor: '#cbd5e1',
          showSearch: false,
          fullWidth: true,
          fixed: true,
          backgroundOpacity: 1,
          margin: '0',
        },
      },
      {
        id: 'HeroCarousel-1',
        key: 'HeroCarousel',
        label: 'HeroCarousel',
        props: {
          headline: '智慧校园，连结未来',
          subline: '构建国际化、数字化、可持续的校园体验',
          accent: '#2563eb',
          fullWidth: true,
          margin: '0',
        },
      },
      {
        id: 'StatsHighlight-1',
        key: 'StatsHighlight',
        label: 'StatsHighlight',
        props: {
          items: [
            { label: '在校学生', value: '37000+' },
            { label: '教职工', value: '3200+' },
            { label: '学科门类', value: '11' },
            { label: '国家重点学科', value: '12' },
          ],
          columns: 4,
          fullWidth: false,
          margin: '2.4rem auto',
        },
      },
      {
        id: 'NewsSection-1',
        key: 'NewsSection',
        label: 'NewsSection',
        props: {
          title: '新闻动态',
          moreText: '更多',
          dataSourceCode: newsDataSourceCode,
          items: [],
          detailPage: {
            type: 'projectTemplate',
            templateType: 'news',
            openInNewTab: false,
          },
          fullWidth: false,
          margin: '2.4rem auto',
        },
      },
      {
        id: 'ProductList-1',
        key: 'ProductList',
        label: 'ProductList',
        props: {
          title: '产品展示',
          columns: 3,
          dataSourceCode: productDataSourceCode,
          products: [],
          detailPage: {
            type: 'projectTemplate',
            templateType: 'product',
            openInNewTab: false,
          },
          fullWidth: false,
          margin: '2.4rem auto',
        },
      },
      getDefaultFooterConfig(),
    ]),
  }
  pages.push(homePage)

  // 遍历菜单项，为每个一级和二级菜单创建页面
  for (const menuItem of menuItems) {
    // 跳过首页（已创建）
    if (menuItem.label === '首页') {
      continue
    }

    // 创建一级菜单页面
    // 如果有一级菜单有子菜单，一级菜单页面也显示侧边栏（显示主菜单和所有子菜单）
    const level1PageMenuInfo = menuItem.children && menuItem.children.length > 0
      ? { parentMenu: menuItem, children: menuItem.children }
      : null
    
    const level1Page = {
      name: menuItem.label,
      path: menuItem.href,
      title: `${menuItem.label} - 智慧校园`,
      description: `${menuItem.label}页面`,
      schemaData: generateDefaultPageSchema(menuItem.label, menuItem.href, level1PageMenuInfo),
    }
    pages.push(level1Page)

    // 创建二级菜单页面
    // 二级菜单页面显示侧边栏（显示主菜单和所有子菜单）
    if (menuItem.children && menuItem.children.length > 0) {
      for (const childItem of menuItem.children) {
        const level2PageMenuInfo = {
          parentMenu: menuItem,
          children: menuItem.children,
        }
        
        const level2Page = {
          name: childItem.label,
          path: childItem.href,
          title: `${childItem.label} - ${menuItem.label} - 智慧校园`,
          description: `${childItem.label}页面`,
          schemaData: generateDefaultPageSchema(childItem.label, childItem.href, level2PageMenuInfo),
        }
        pages.push(level2Page)
      }
    }
  }

  return pages
}

/**
 * 初始化页面
 */
async function initPages(projectCode, dataSources) {
  console.log('📄 第四步：创建页面...\n')

  // 获取数据源 code
  const newsDataSourceCode = dataSources.news?.code || null
  const productDataSourceCode = dataSources.product?.code || null
  const noticeDataSourceCode = dataSources.notice?.code || null

  // 调试日志：输出数据源信息
  console.log(`  数据源代码:`, {
    news: newsDataSourceCode || '未找到',
    product: productDataSourceCode || '未找到',
    notice: noticeDataSourceCode || '未找到',
  })
  console.log('')

  // 生成菜单结构
  const menuItems = generateMenuItems()
  
  // 根据菜单生成所有页面
  const pages = generatePagesFromMenu(menuItems, dataSources)
  
  console.log(`  将创建 ${pages.length} 个页面：`)
  for (const page of pages) {
    console.log(`    - ${page.name} (${page.path})`)
  }
  console.log('')

  // 使用菜单结构作为导航配置模板（用于计算菜单项索引）
  const navigationMenuItemsTemplate = menuItems

  // 第一步：创建所有页面（先不发布）
  const createdPages = []
  const pageSchemaDataMap = new Map() // 保存每个页面的最终schemaData，用于发布
  
  for (const pageData of pages) {
    // 更新MainHeader的defaultActiveIndex
    let updatedSchemaData = updateMainHeaderActiveIndex(
      pageData.schemaData,
      pageData.path,
      navigationMenuItemsTemplate
    )
    
    // 加载数据源数据并填充到组件中
    try {
      const schemaData = JSON.parse(updatedSchemaData)
      
      for (const item of schemaData) {
        // 如果组件绑定了数据源，从数据源加载数据
        if (item.props?.dataSourceCode && (item.key === 'NoticeList' || item.key === 'NewsSection' || item.key === 'NewsListPage' || item.key === 'ProductList')) {
          const dataSourceItems = await getDataSourceItems(item.props.dataSourceCode)
          if (dataSourceItems.length > 0) {
            const componentItems = convertDataSourceItemsToComponentItems(dataSourceItems, item.key)
            
            // 根据组件类型填充数据
            if (item.key === 'NoticeList' || item.key === 'NewsSection' || item.key === 'NewsListPage') {
              item.props.items = componentItems
            } else if (item.key === 'ProductList') {
              item.props.products = componentItems
            }
            
            console.log(`  ✓ 已为 ${item.key} 组件加载 ${componentItems.length} 条数据源数据`)
          } else {
            console.warn(`  ⚠️  数据源 ${item.props.dataSourceCode} 没有数据`)
          }
        }
      }
      
      updatedSchemaData = JSON.stringify(schemaData)
      // 保存更新后的schemaData，用于发布
      pageSchemaDataMap.set(pageData.name, updatedSchemaData)
    } catch (error) {
      console.warn(`  ⚠️  加载数据源数据失败 [${pageData.name}]:`, error.message)
      // 即使加载失败，也保存原始的schemaData
      pageSchemaDataMap.set(pageData.name, updatedSchemaData)
    }
    
    const pageDataWithActiveIndex = {
      ...pageData,
      schemaData: updatedSchemaData,
    }
    
    const page = await createPage(projectCode, pageDataWithActiveIndex)
    if (page) {
      createdPages.push(page)
    }
  }

  // 第二步：发布所有页面
  for (const page of createdPages) {
    // 使用保存的已加载数据源的schemaData发布
    const schemaDataToPublish = pageSchemaDataMap.get(page.name)
    if (schemaDataToPublish) {
      await publishPage(projectCode, page.code, schemaDataToPublish)
    } else {
      // 如果找不到，使用默认的schemaData
      const pageData = pages.find(p => p.name === page.name)
      if (pageData) {
        const updatedSchemaData = updateMainHeaderActiveIndex(
          pageData.schemaData,
          pageData.path,
          navigationMenuItemsTemplate
        )
        await publishPage(projectCode, page.code, updatedSchemaData)
      }
    }
  }

  console.log(`\n✓ 页面创建并发布完成，共 ${createdPages.length} 个页面\n`)
  return createdPages
}

/**
 * 初始化新闻数据源
 */
async function initNewsDataSource(projectCode) {
  console.log('📰 初始化新闻数据源...\n')

  const dataSource = await createDataSource(
    projectCode,
    '新闻库',
    'news',
    '新闻动态数据源'
  )
  console.log(`  ✓ 数据源创建成功: ${dataSource.name} (Code: ${dataSource.code})`)

  const newsItems = [
    {
      title: '东南大学2025年春季学期开学典礼隆重举行',
      date: '2025-02-20',
      cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
      summary: '2月20日，东南大学2025年春季学期开学典礼在四牌楼校区大礼堂隆重举行。',
      content: '<p>2月20日，东南大学2025年春季学期开学典礼在四牌楼校区大礼堂隆重举行。校领导、各院系负责人、教师代表和全体新生参加了典礼。</p><p>校长在致辞中表示，希望同学们在新学期里努力学习，全面发展，为学校和国家的发展贡献自己的力量。</p>',
    },
    {
      title: '我校科研团队在人工智能领域取得重大突破',
      date: '2025-02-18',
      cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      summary: '我校计算机科学与工程学院科研团队在人工智能领域取得重大突破。',
      content: '<p>我校计算机科学与工程学院科研团队在人工智能领域取得重大突破，相关研究成果已发表在顶级国际期刊上。</p><p>该研究为人工智能技术的发展提供了新的思路和方法，具有重要的理论意义和应用价值。</p>',
    },
    {
      title: '东南大学与多家企业签署产学研合作协议',
      date: '2025-02-15',
      cover: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      summary: '东南大学与多家知名企业签署产学研合作协议。',
      content: '<p>东南大学与多家知名企业签署产学研合作协议，将在人才培养、科研合作、成果转化等方面开展深度合作。</p>',
    },
    {
      title: '我校学生在国际数学建模竞赛中荣获特等奖',
      date: '2025-02-12',
      cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
      summary: '我校学生团队在国际数学建模竞赛中表现出色，荣获特等奖。',
      content: '<p>我校学生团队在国际数学建模竞赛中表现出色，荣获特等奖，展现了东南大学学生的优秀素质和创新能力。</p>',
    },
    {
      title: '东南大学举办2025年春季校园招聘会',
      date: '2025-02-10',
      cover: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
      summary: '东南大学2025年春季校园招聘会在九龙湖校区体育馆举行。',
      content: '<p>东南大学2025年春季校园招聘会在九龙湖校区体育馆举行，吸引了200多家知名企业前来招聘，提供就业岗位5000余个。</p>',
    },
    {
      title: '我校新增两个国家级一流本科专业建设点',
      date: '2025-02-08',
      cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      summary: '教育部公布了2024年度国家级一流本科专业建设点名单。',
      content: '<p>教育部公布了2024年度国家级一流本科专业建设点名单，我校新增两个专业入选，专业建设水平进一步提升。</p>',
    },
  ]

  console.log(`  创建 ${newsItems.length} 条新闻...`)
  for (let i = 0; i < newsItems.length; i++) {
    await createDataSourceItem(dataSource.code, newsItems[i], i)
    console.log(`  ✓ 新闻 ${i + 1}: ${newsItems[i].title}`)
  }

  console.log('')
  return dataSource
}

/**
 * 初始化产品数据源
 */
async function initProductDataSource(projectCode) {
  console.log('🛍️ 初始化产品数据源...\n')

  const dataSource = await createDataSource(
    projectCode,
    '产品库',
    'product',
    '产品展示数据源'
  )
  console.log(`  ✓ 数据源创建成功: ${dataSource.name} (Code: ${dataSource.code})`)

  const products = [
    {
      name: '智能学习系统',
      description: '基于人工智能的个性化学习系统，帮助学生提高学习效率',
      image: 'http://localhost:8002/p1.jpg',
      price: '2999',
      originalPrice: '3999',
      content: '<p>智能学习系统是一款基于人工智能技术的个性化学习平台，通过分析学生的学习行为和能力水平，为每个学生提供定制化的学习方案。</p>',
    },
    {
      name: '在线教育平台',
      description: '专业的在线教育平台，提供丰富的课程资源和互动学习体验',
      image: 'http://localhost:8002/p1.jpg',
      price: '1999',
      originalPrice: '2999',
      content: '<p>在线教育平台汇聚了众多优质课程资源，涵盖各个学科和领域。平台支持直播授课、录播回放、在线答疑等多种学习方式。</p>',
    },
    {
      name: '科研数据分析工具',
      description: '强大的科研数据分析工具，支持多种数据格式和统计分析方法',
      image: 'http://localhost:8002/p1.jpg',
      price: '4999',
      originalPrice: '5999',
      content: '<p>科研数据分析工具是一款专业的数据分析软件，支持Excel、CSV、JSON等多种数据格式导入。</p>',
    },
    {
      name: '虚拟实验室系统',
      description: '3D虚拟实验室系统，提供沉浸式的实验学习体验',
      image: 'http://localhost:8002/p1.jpg',
      price: '3999',
      originalPrice: '4999',
      content: '<p>虚拟实验室系统采用先进的3D技术，构建了逼真的实验环境。学生可以在虚拟环境中进行各种实验操作。</p>',
    },
    {
      name: '智能考试系统',
      description: '全自动化的智能考试系统，支持在线考试和自动阅卷',
      image: 'http://localhost:8002/p1.jpg',
      price: '5999',
      originalPrice: '6999',
      content: '<p>智能考试系统是一款全自动化的在线考试平台，支持多种题型，包括选择题、填空题、简答题等。</p>',
    },
    {
      name: '校园管理系统',
      description: '综合性的校园管理系统，涵盖学生管理、课程管理、成绩管理等功能',
      image: 'http://localhost:8002/p1.jpg',
      price: '8999',
      originalPrice: '9999',
      content: '<p>校园管理系统是一款综合性的管理平台，为学校提供全方位的管理服务。</p>',
    },
  ]

  console.log(`  创建 ${products.length} 个产品...`)
  for (let i = 0; i < products.length; i++) {
    await createDataSourceItem(dataSource.code, products[i], i)
    console.log(`  ✓ 产品 ${i + 1}: ${products[i].name}`)
  }

  console.log('')
  return dataSource
}

/**
 * 初始化公告数据源
 */
async function initNoticeDataSource(projectCode) {
  console.log('📢 初始化公告数据源...\n')

  const dataSource = await createDataSource(
    projectCode,
    '公告库',
    'notice',
    '通知公告数据源'
  )
  console.log(`  ✓ 数据源创建成功: ${dataSource.name} (Code: ${dataSource.code})`)

  const notices = [
    {
      title: '关于2025年春季学期开学安排的通知',
      date: '2025-02-15',
      content: '<p>根据学校工作安排，2025年春季学期将于2月20日正式开学。请各位同学按时返校，做好开学准备。</p><p>具体安排请关注学校官网和教务处通知。</p>',
    },
    {
      title: '关于2025年春季学期选课的通知',
      date: '2025-02-12',
      content: '<p>2025年春季学期选课系统将于2月18日开放，请各位同学及时登录选课系统进行选课。</p><p>选课时间：2月18日-2月25日</p>',
    },
    {
      title: '关于2025年春季学期奖学金申请的通知',
      date: '2025-02-10',
      content: '<p>2025年春季学期奖学金申请工作现已开始，请符合条件的同学及时提交申请材料。</p><p>申请截止时间：2月28日</p>',
    },
    {
      title: '关于2025年春季学期图书馆开放时间的通知',
      date: '2025-02-08',
      content: '<p>2025年春季学期图书馆开放时间已确定，请各位同学注意开放时间，合理安排学习计划。</p><p>开放时间：周一至周日 8:00-22:00</p>',
    },
    {
      title: '关于2025年春季学期宿舍调整的通知',
      date: '2025-02-05',
      content: '<p>根据学校统一安排，部分宿舍将进行调整，请相关同学配合做好宿舍调整工作。</p><p>调整时间：2月15日-2月18日</p>',
    },
    {
      title: '关于2025年春季学期校园网络维护的通知',
      date: '2025-02-03',
      content: '<p>为提升校园网络服务质量，学校将于2月10日进行网络维护，维护期间可能影响网络使用。</p><p>维护时间：2月10日 0:00-6:00</p>',
    },
  ]

  console.log(`  创建 ${notices.length} 条公告...`)
  for (let i = 0; i < notices.length; i++) {
    await createDataSourceItem(dataSource.code, notices[i], i)
    console.log(`  ✓ 公告 ${i + 1}: ${notices[i].title}`)
  }

  console.log('')
  return dataSource
}

/**
 * 初始化教师数据源
 */
async function initTeacherDataSource(projectCode) {
  console.log('👨‍🏫 初始化教师数据源...\n')

  const dataSource = await createDataSource(
    projectCode,
    '教师库',
    'teacher',
    '教师介绍数据源'
  )
  console.log(`  ✓ 数据源创建成功: ${dataSource.name} (Code: ${dataSource.code})`)

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

  console.log('')
  return dataSource
}

// ============================================
// 主函数
// ============================================

async function main() {
  console.log('🚀 开始一键初始化项目...\n')
  console.log('=' .repeat(60))
  console.log('')
  console.log('📋 当前配置：')
  console.log(`   环境: ${ENV === 'local' ? '本地环境' : '生产环境'}`)
  console.log(`   数据库: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
  console.log(`   用户: ${dbConfig.user}`)
  console.log(`   API: ${API_BASE_URL}`)
  console.log('')

  try {
    // 第一步：初始化数据库
    await initDatabase()

    // 检查后端服务是否运行
    console.log('🔍 检查后端服务...')
    try {
      const testResponse = await fetchWithTimeout(`${API_BASE_URL}/projects`, {}, 5000)
      if (!testResponse.ok) {
        throw new Error('后端服务未运行或无法访问')
      }
      console.log('✓ 后端服务连接正常\n')
    } catch (error) {
      console.error('✗ 后端服务检查失败:', error.message)
      console.error('  请确保后端服务正在运行: http://localhost:8082')
      console.error('  然后重新执行此脚本\n')
      // 给一些时间让未完成的请求清理完成
      await new Promise(resolve => setTimeout(resolve, 100))
      process.exit(1)
    }

    // 第二步：确保 admin 用户存在（通过 API 注册，确保密码正确）
    await ensureAdminUser()

    // 第三步：创建项目
    const project = await createProject()

    // 第四步：初始化数据源（先初始化数据源，因为页面需要使用数据源）
    console.log('📦 第三步：初始化数据源...\n')
    const newsDataSource = await initNewsDataSource(project.code)
    const productDataSource = await initProductDataSource(project.code)
    const noticeDataSource = await initNoticeDataSource(project.code)
    await initTeacherDataSource(project.code)

    const dataSources = {
      news: newsDataSource,
      product: productDataSource,
      notice: noticeDataSource,
    }

    // 验证数据源是否正确创建
    if (!noticeDataSource || !noticeDataSource.code) {
      console.error('  ✗ 错误：公告数据源创建失败或缺少 code 属性')
      console.error('    公告数据源对象:', noticeDataSource)
      throw new Error('公告数据源创建失败，无法继续创建页面')
    } else {
      console.log(`  ✓ 公告数据源验证通过: Code = ${noticeDataSource.code}`)
    }
    console.log('')

    // 第五步：创建页面（传入数据源信息）
    const createdPages = await initPages(project.code, dataSources)

    // 第六步：初始化导航配置
    console.log('🔗 第六步：初始化导航配置...\n')
    
    // 生成菜单结构
    const menuItems = generateMenuItems()
    
    if (!menuItems || menuItems.length === 0) {
      console.error('✗ 菜单生成失败，导航配置为空')
      throw new Error('菜单生成失败')
    }
    
    // 为菜单项关联页面（如果页面存在）
    function findPageByName(name) {
      return createdPages.find(p => p.name === name)
    }
    
    function attachPageNavigation(menuItem, pageName) {
      const page = findPageByName(pageName)
      if (page) {
        menuItem.navigation = {
          type: 'page',
          targetPageCode: page.code,
          path: `/projects/${project.code}/runtime/pages/${page.code}`,
        }
      }
    }
    
    // 为所有菜单项关联页面
    console.log('  关联菜单项到页面：')
    for (const menuItem of menuItems) {
      // 一级菜单关联页面
      const page1 = findPageByName(menuItem.label)
      if (page1) {
        attachPageNavigation(menuItem, menuItem.label)
        console.log(`    ✓ ${menuItem.label} -> ${page1.name} (${page1.path})`)
      } else {
        console.log(`    ⚠️  ${menuItem.label} -> 未找到对应页面`)
      }
      
      // 二级菜单关联页面
      if (menuItem.children && menuItem.children.length > 0) {
        for (const childItem of menuItem.children) {
          const page2 = findPageByName(childItem.label)
          if (page2) {
            attachPageNavigation(childItem, childItem.label)
            console.log(`      ✓ ${childItem.label} -> ${page2.name} (${page2.path})`)
          } else {
            console.log(`      ⚠️  ${childItem.label} -> 未找到对应页面`)
          }
        }
      }
    }
    console.log('')
    
    console.log('  菜单结构：')
    for (const item of menuItems) {
      const navInfo = item.navigation?.type === 'page' 
        ? ` -> 页面: ${item.navigation.targetPageCode}` 
        : ' -> 未关联'
      console.log(`    - ${item.label} (${item.children ? item.children.length : 0} 个子菜单)${navInfo}`)
      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          const prefix = child.highlight ? '    ==' : '    --'
          const childNavInfo = child.navigation?.type === 'page' 
            ? ` -> 页面: ${child.navigation.targetPageCode}` 
            : ' -> 未关联'
          console.log(`${prefix} ${child.label}${childNavInfo}`)
        }
      }
    }
    console.log('')
    
    const navigationConfig = {
      menuItems: menuItems,
    }
    
    console.log('  导航配置 JSON:', JSON.stringify(navigationConfig, null, 2))
    console.log('')

    await updateProjectNavigation(project.code, navigationConfig)
    console.log('✓ 导航配置初始化完成\n')

    // 第七步：初始化详情页模板
    console.log('📋 第六步：初始化详情页模板...\n')
    const detailPageTemplates = initDetailPageTemplates()
    await updateProjectDetailPageTemplates(project.code, detailPageTemplates)
    console.log('✓ 详情页模板初始化完成（新闻、产品、公告）\n')

    // 完成
    console.log('=' .repeat(60))
    console.log('✅ 一键初始化完成！\n')
    console.log('📊 初始化结果：')
    console.log(`  - 项目：${project.name} (Code: ${project.code})`)
    console.log(`  - 页面：${createdPages.length} 个（根据导航菜单自动生成）`)
    console.log(`  - 数据源：4 个（新闻、产品、公告、教师）`)
    console.log(`  - 新闻数据：6 条`)
    console.log(`  - 产品数据：6 个`)
    console.log(`  - 公告数据：6 条`)
    console.log(`  - 教师数据：6 位`)
    console.log(`  - 导航配置：已配置全局导航菜单`)
    console.log(`  - 详情页模板：已配置（新闻、产品、公告）`)
    console.log('')
    console.log('🌐 访问地址：')
    console.log(`  - 项目管理: http://localhost:5173/projects`)
    console.log(`  - 页面编辑: http://localhost:5173/projects/${project.code}/design/pages`)
    const homePage = createdPages.find(p => p.name === '首页')
    if (homePage) {
      console.log(`  - 首页预览: http://localhost:5173/projects/${project.code}/preview/pages/${homePage.code}`)
    }
    console.log('')

  } catch (error) {
    console.error('\n❌ 初始化失败:', error.message)
    if (error.stack) {
      console.error('\n错误堆栈:')
      console.error(error.stack)
    }
    // 给一些时间让未完成的异步操作清理完成
    await new Promise(resolve => setTimeout(resolve, 100))
    process.exit(1)
  }
}

// 执行
main()

