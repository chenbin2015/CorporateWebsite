/**
 * 从数据源获取数据并转换为组件期望的格式
 * @param {string} dataSourceCode - 数据源 code
 * @param {string} componentKey - 组件 key（如 'NewsSection', 'ProductList'）
 * @returns {Promise<Object>} 转换后的数据对象
 */
export async function loadDataSourceData(dataSourceCode, componentKey) {
  if (!dataSourceCode) {
    return null
  }

  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    // 获取数据源项
    const response = await fetch(`${apiBaseUrl}/data-sources/${dataSourceCode}/items`)
    if (!response.ok) {
      throw new Error('Failed to fetch data source items')
    }
    
    const items = await response.json()
    
    // 解析JSON数据
    const parsedItems = items.map(item => ({
      ...item,
      data: JSON.parse(item.data || '{}'),
    }))

    // 根据组件类型转换数据格式
    if (componentKey === 'NewsSection' || componentKey === 'NewsListPage') {
      // 新闻组件：将数据源项转换为 items 数组
      return {
        items: parsedItems.map((item, index) => ({
          id: item.code,
          title: item.data.title || '',
          date: item.data.date || '',
          content: item.data.content || '',
          // 保留其他可能的字段
          ...item.data,
        })),
      }
    } else if (componentKey === 'NoticeList') {
      // 公告组件：将数据源项转换为 items 数组
      return {
        items: parsedItems.map((item, index) => ({
          id: item.code,
          title: item.data.title || '',
          date: item.data.date || '',
          content: item.data.content || '',
          // 保留其他可能的字段
          ...item.data,
        })),
      }
    } else if (componentKey === 'ProductList') {
      // 产品组件：将数据源项转换为 products 数组
      return {
        products: parsedItems.map((item, index) => ({
          id: item.code,
          name: item.data.name || '',
          description: item.data.description || '',
          image: item.data.image || '',
          price: item.data.price || '',
          originalPrice: item.data.originalPrice || '',
          content: item.data.content || '',
          // 保留其他可能的字段
          ...item.data,
        })),
      }
    } else if (componentKey === 'InfoCardGrid') {
      // 信息卡片组：将数据源项转换为 cards 数组
      // 支持 teacher 类型的数据源
      return {
        cards: parsedItems.map((item, index) => {
          const data = item.data
          // 如果是教师类型，转换为卡片格式
          if (data.name) {
            return {
              title: data.name || '未命名',
              description: `${data.title || ''} | ${data.department || ''}\n${data.research || ''}`.trim(),
              summary: data.summary || '', // 富文本简介单独显示
              image: data.avatar || '',
              href: '#',
              meta: data.department || '',
            }
          }
          // 通用格式：尝试从数据中提取字段
          return {
            title: data.title || data.name || '未命名',
            description: data.description || data.summary || '',
            image: data.image || data.avatar || '',
            href: data.href || '#',
            meta: data.meta || data.department || '',
          }
        }),
      }
    } else if (componentKey === 'CarouselNewsSplit') {
      // 轮播新闻组合：需要分别处理轮播和新闻数据
      // 这里只返回新闻数据，轮播数据需要单独处理
      return {
        newsItems: parsedItems.map((item, index) => ({
          id: item.code,
          title: item.data.title || '',
          date: item.data.date || '',
          content: item.data.content || '',
          cover: item.data.cover || '',
          summary: item.data.summary || '',
          ...item.data,
        })),
      }
    }

    return null
  } catch (error) {
    console.error('Failed to load data source:', error)
    return null
  }
}

/**
 * 合并数据源数据到组件 props
 * @param {Object} props - 组件原始 props
 * @param {string} componentKey - 组件 key
 * @param {Object} dataSourceData - 从数据源获取的数据
 * @returns {Object} 合并后的 props
 */
export function mergeDataSourceData(props, componentKey, dataSourceData) {
  if (!dataSourceData) {
    return props
  }

  const merged = { ...props }

  if (componentKey === 'NewsSection' || componentKey === 'NewsListPage') {
    if (dataSourceData.items) {
      merged.items = dataSourceData.items
    }
  } else if (componentKey === 'NoticeList') {
    if (dataSourceData.items) {
      merged.items = dataSourceData.items
    }
  } else if (componentKey === 'ProductList') {
    if (dataSourceData.products) {
      merged.products = dataSourceData.products
    }
  } else if (componentKey === 'InfoCardGrid') {
    if (dataSourceData.cards) {
      merged.cards = dataSourceData.cards
    }
  } else if (componentKey === 'CarouselNewsSplit') {
    // 根据数据源类型判断是轮播还是新闻
    if (dataSourceData.newsItems) {
      merged.newsItems = dataSourceData.newsItems
    } else if (dataSourceData.items) {
      // 如果数据源返回的是 items，可能是轮播项
      merged.carouselItems = dataSourceData.items.map(item => ({
        title: item.title || '',
        description: item.summary || '',
        cover: item.cover || '',
        action: '了解更多',
        navigation: { type: 'none' },
        ...item,
      }))
    }
  }

  return merged
}

