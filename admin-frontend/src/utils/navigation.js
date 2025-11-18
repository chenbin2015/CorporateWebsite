/**
 * 跳转配置工具函数
 */

// 详情页模板类型
export const DETAIL_TEMPLATE_TYPES = {
  NEWS: 'news',
  EVENT: 'event',
  NOTICE: 'notice',
  FOCUS: 'focus',
}

// 详情页模板类型选项（用于下拉选择）
export const DETAIL_TEMPLATE_OPTIONS = [
  { label: '新闻详情页', value: DETAIL_TEMPLATE_TYPES.NEWS },
  { label: '活动详情页', value: DETAIL_TEMPLATE_TYPES.EVENT },
  { label: '公告详情页', value: DETAIL_TEMPLATE_TYPES.NOTICE },
  { label: '专题详情页', value: DETAIL_TEMPLATE_TYPES.FOCUS },
]

// 跳转类型
export const NAVIGATION_TYPES = {
  PAGE: 'page',
  URL: 'url',
  NONE: 'none',
}

// 详情页配置类型
export const DETAIL_PAGE_TYPES = {
  TEMPLATE: 'template',
  CUSTOM: 'custom',
}

/**
 * 创建默认跳转配置
 */
export function createDefaultNavigation() {
  return {
    type: NAVIGATION_TYPES.NONE,
    targetPageId: null,
    path: null,  // 页面路径，用于运行时跳转
    url: '',
    params: {},
  }
}

/**
 * 创建默认详情页配置
 */
export function createDefaultDetailPage() {
  return {
    type: DETAIL_PAGE_TYPES.TEMPLATE,
    templateType: DETAIL_TEMPLATE_TYPES.NEWS,
    targetPageId: null,
    paramKey: 'id',
    paramSource: 'id',
  }
}

/**
 * 验证跳转配置
 */
export function validateNavigation(navigation) {
  if (!navigation || navigation.type === NAVIGATION_TYPES.NONE) {
    return { valid: true }
  }

  if (navigation.type === NAVIGATION_TYPES.PAGE) {
    if (!navigation.targetPageId) {
      return { valid: false, message: '请选择目标页面' }
    }
  }

  if (navigation.type === NAVIGATION_TYPES.URL) {
    if (!navigation.url || !navigation.url.trim()) {
      return { valid: false, message: '请输入外部链接地址' }
    }
    // 简单的URL验证
    try {
      new URL(navigation.url)
    } catch {
      return { valid: false, message: '请输入有效的URL地址' }
    }
  }

  return { valid: true }
}

/**
 * 验证详情页配置
 */
export function validateDetailPage(detailPage) {
  if (!detailPage) {
    return { valid: true }
  }

  if (detailPage.type === DETAIL_PAGE_TYPES.TEMPLATE) {
    if (!detailPage.templateType) {
      return { valid: false, message: '请选择详情页模板类型' }
    }
    if (!detailPage.paramKey || !detailPage.paramKey.trim()) {
      return { valid: false, message: '请输入参数名' }
    }
    if (!detailPage.paramSource || !detailPage.paramSource.trim()) {
      return { valid: false, message: '请输入参数来源字段' }
    }
  }

  if (detailPage.type === DETAIL_PAGE_TYPES.CUSTOM) {
    if (!detailPage.targetPageId) {
      return { valid: false, message: '请选择目标页面' }
    }
  }

  return { valid: true }
}

