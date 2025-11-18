/**
 * 设计态/运行态上下文工具
 * 用于区分组件是在设计态（admin-frontend）还是运行态（frontend）中使用
 */

/**
 * 检测当前是否在设计态（预览模式）
 * @returns {boolean}
 */
export function isDesignMode() {
  // 检查是否在 admin-frontend 环境中
  // 通过检查 window.location 路径或全局变量来判断
  if (typeof window === 'undefined') return false
  
  // 方法1: 检查是否有设计态相关的全局变量（优先级最高）
  // 只有 PageBuilder（__BUILDER_MODE__）才是真正的设计态
  // PagePreview（__PREVIEW_MODE__）不是设计态，应该允许交互
  if (window.__BUILDER_MODE__) {
    return true
  }
  
  // 方法2: 检查路径是否包含 /design/（设计态）
  const pathname = window.location.pathname
  if (pathname.includes('/design/')) {
    return true
  }
  
  // 预览页面（__PREVIEW_MODE__）不是设计态，应该允许交互
  if (window.__PREVIEW_MODE__) {
    return false
  }
  
  // 方法3: 检查路径是否包含 /preview/ 或 /runtime/（不是设计态）
  if (pathname.includes('/preview/') || pathname.includes('/runtime/')) {
    return false
  }
  
  // 默认返回 false（运行态）
  return false
}

/**
 * 获取当前上下文模式
 * @returns {'design' | 'preview' | 'runtime'}
 */
export function getContextMode() {
  if (typeof window === 'undefined') return 'runtime'
  
  const pathname = window.location.pathname
  
  // 检查全局变量（优先级最高）
  if (window.__BUILDER_MODE__) {
    return 'design'
  }
  if (window.__PREVIEW_MODE__) {
    return 'preview'
  }
  
  // 检查路径
  if (pathname.includes('/design/')) {
    return 'design'
  }
  if (pathname.includes('/preview/')) {
    return 'preview'
  }
  if (pathname.includes('/runtime/')) {
    return 'runtime'
  }
  
  // 默认返回运行态
  return 'runtime'
}

