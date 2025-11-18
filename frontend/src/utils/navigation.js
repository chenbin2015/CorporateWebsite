/**
 * 运行时跳转处理工具函数
 */
import router from '@/router'

/**
 * 处理详情页跳转
 * @param {Object} detailPage - 详情页配置
 * @param {Object} item - 列表项数据
 */
export function handleDetailPageNavigation(detailPage, item) {
  if (!detailPage || !item) return

  // 获取参数值
  const paramSource = detailPage.paramSource || 'id'
  const paramValue = item[paramSource] || item.id

  if (!paramValue) {
    console.warn('详情页跳转：无法获取参数值', { detailPage, item })
    return
  }

  // 根据详情页类型构建路径
  // 模板类型到路径的映射（不使用复数形式）
  const templatePathMap = {
    news: '/news',
    event: '/events',
    notice: '/notices',
    focus: '/focus',
  }
  
  let path = ''
  if (detailPage.type === 'template') {
    // 使用模板路径
    const templateType = detailPage.templateType || 'news'
    const basePath = templatePathMap[templateType] || `/news`
    path = `${basePath}/${paramValue}`
  } else if (detailPage.type === 'custom') {
    // 使用自定义页面路径
    path = detailPage.path || ''
    if (path && paramValue) {
      // 替换路径参数
      path = path.replace(`:${detailPage.paramKey || 'id'}`, paramValue)
    }
  }

  if (path) {
    // 根据配置决定是当前页跳转还是新标签页打开
    if (detailPage.openInNewTab) {
      // 新标签页打开
      const fullUrl = window.location.origin + path
      window.open(fullUrl, '_blank')
    } else {
      // 当前页跳转
      router.push(path)
    }
  }
}

/**
 * 处理普通跳转
 * @param {Object} navigation - 跳转配置
 * @param {Object} item - 可选的列表项数据（用于参数化跳转）
 */
export function handleNavigation(navigation, item = null) {
  if (!navigation || navigation.type === 'none') {
    return
  }

  if (navigation.type === 'url') {
    // 外部链接
    window.open(navigation.url, '_blank')
    return
  }

  if (navigation.type === 'page') {
    // 页面跳转
    let path = navigation.path || ''

    // 如果 path 不是 runtime 格式（不以 /projects/ 开头），尝试生成 runtime 路径
    if (!path.startsWith('/projects/') && navigation.targetPageCode) {
      // 从当前路由获取 projectCode
      const currentRoute = router.currentRoute.value
      const projectCode = currentRoute.params.projectCode
      
      if (projectCode) {
        // 生成 runtime 路由格式：/projects/{projectCode}/runtime/pages/{pageCode}
        path = `/projects/${projectCode}/runtime/pages/${navigation.targetPageCode}`
      } else {
        console.warn('页面跳转：无法获取 projectCode，使用原始路径', navigation)
      }
    }

    if (!path) {
      console.warn('页面跳转：路径为空', navigation)
      return
    }

    // 处理路径参数（如果有 item 数据）
    if (item && navigation.paramKey) {
      const paramSource = navigation.paramSource || 'id'
      const paramValue = item[paramSource] || item.id
      if (paramValue) {
        path = path.replace(`:${navigation.paramKey}`, paramValue)
      }
    }

    // 处理静态参数
    if (navigation.params && Object.keys(navigation.params).length > 0) {
      const query = new URLSearchParams(navigation.params).toString()
      path += `?${query}`
    }

    router.push(path)
  }
}

