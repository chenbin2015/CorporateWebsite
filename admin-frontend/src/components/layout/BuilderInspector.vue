<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Delete, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ElDatePicker } from 'element-plus'
import PageSelector from '@/components/builder/PageSelector.vue'
import {
  createDefaultNavigation,
  createDefaultDetailPage,
  NAVIGATION_TYPES,
  DETAIL_PAGE_TYPES,
  DETAIL_TEMPLATE_OPTIONS,
} from '@/utils/navigation'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getDataSources } from '@/services/modules/datasource'
import { onMounted, ref as vueRef } from 'vue'
import { useRouter } from 'vue-router'
import DataSourceSelector from '@/components/builder/DataSourceSelector.vue'
import DataSourceItemSelector from '@/components/builder/DataSourceItemSelector.vue'

const router = useRouter()

const props = defineProps({
  selectedItem: {
    type: Object,
    default: null,
  },
  schema: {
    type: Object,
    default: null,
  },
  projectCode: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update-props', 'reset', 'delete'])

const goToProjectSettings = () => {
  if (props.projectCode) {
    router.push({
      name: 'projectSettings',
      params: { projectCode: props.projectCode },
    })
  } else {
    ElMessage.warning('无法获取项目代码')
  }
}

const title = computed(() => props.selectedItem?.label ?? '未选择组件')

const handleInput = (prop, value) => {
  emit('update-props', { [prop]: value })
}

const getArrayProp = (prop) => {
  const current = props.selectedItem?.props?.[prop]
  return Array.isArray(current) ? current : []
}

const updateNavItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const addNavItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, { label: '新导航', href: '#' }]
  emit('update-props', { [prop]: next })
}

const removeNavItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

const updateTabItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const addTabItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, { label: '新标签', value: '' }]
  emit('update-props', { [prop]: next })
}

const removeTabItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

const updateBreadcrumbItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const addBreadcrumbItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, { label: '新的层级', href: '' }]
  emit('update-props', { [prop]: next })
}

const removeBreadcrumbItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

const addQuickLink = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, { label: '新链接', navigation: createDefaultNavigation() }]
  emit('update-props', { [prop]: next })
}

const updateQuickLink = (prop, index, value) => {
  const current = getArrayProp(prop)
  // 兼容旧数据格式（字符串）
  const oldItem = current[index]
  const isOldFormat = typeof oldItem === 'string'
  const updatedItem = isOldFormat
    ? { label: value, navigation: createDefaultNavigation() }
    : { ...oldItem, label: value }
  const next = current.map((item, i) => (i === index ? updatedItem : item))
  emit('update-props', { [prop]: next })
}

const removeQuickLink = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

const addBullet = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, '新的要点']
  emit('update-props', { [prop]: next })
}

const updateBullet = (prop, index, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) => (i === index ? value : item))
  emit('update-props', { [prop]: next })
}

const removeBullet = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

const addCardItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [
    ...current,
    { title: '新卡片标题', summary: '请填写卡片描述', href: '#' },
  ]
  emit('update-props', { [prop]: next })
}

const updateCardItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const removeCardItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

const updateNewsHighlight = (prop, key, value) => {
  const current = props.selectedItem?.props?.[prop] || {}
  const next = { ...current, [key]: value }
  emit('update-props', { [prop]: next })
}

const addNewsItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, { title: '新新闻条目', date: '01-01', href: '#' }]
  emit('update-props', { [prop]: next })
}

const updateNewsItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) => {
    if (i === index) {
      // 如果 key 为 null，说明是更新整个对象
      if (key === null) {
        return value
      }
      // 否则更新指定字段
      return { ...(item || {}), [key]: value }
    }
    return item
  })
  emit('update-props', { [prop]: next })
}

const removeNewsItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

// 公告条目管理
const addNoticeItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [...current, { title: '新公告', date: '', id: `notice-${Date.now()}` }]
  emit('update-props', { [prop]: next })
}

const updateNoticeItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) => {
    if (i === index) {
      return { ...(item || {}), [key]: value }
    }
    return item
  })
  emit('update-props', { [prop]: next })
}

const removeNoticeItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

// 新闻详情编辑对话框
const detailDialogVisible = ref(false)
const detailDialogProp = ref('')
const detailDialogIndex = ref(-1)
const detailTitle = ref('')

// 数据源项选择对话框
const dataSourceItemDialogVisible = ref(false)
const currentDataSourceCode = ref(null)
const currentItemsField = ref(null) // 当前正在编辑的 items 字段名（如 'items', 'products'）
const detailDate = ref('')
const detailContent = ref('')

// 产品详情编辑对话框
const productDialogVisible = ref(false)
const productDialogProp = ref('')
const productDialogIndex = ref(-1)
const productName = ref('')
const productDescription = ref('')
const productImage = ref('')
const productPrice = ref('')
const productOriginalPrice = ref('')
const productContent = ref('')

const openDetailDialog = (prop, index) => {
  const items = getArrayProp(prop)
  const item = items[index]
  detailDialogProp.value = prop
  detailDialogIndex.value = index
  detailTitle.value = item?.title || ''
  detailDate.value = item?.date || ''
  detailContent.value = item?.content || ''
  detailDialogVisible.value = true
}

const closeDetailDialog = () => {
  detailDialogVisible.value = false
  detailDialogProp.value = ''
  detailDialogIndex.value = -1
  detailTitle.value = ''
  detailDate.value = ''
  detailContent.value = ''
}

const saveDetail = () => {
  if (detailDialogProp.value && detailDialogIndex.value >= 0) {
    // 同时更新标题、日期和详情内容
    const items = getArrayProp(detailDialogProp.value)
    const currentItem = items[detailDialogIndex.value] || {}
    const updatedItem = {
      ...currentItem,
      id: currentItem.id || `news-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, // 确保有 id
      title: detailTitle.value || '未命名新闻',
      date: detailDate.value || '',
      content: detailContent.value || '',
    }
    console.log('保存新闻详情:', { prop: detailDialogProp.value, index: detailDialogIndex.value, updatedItem })
    updateNewsItem(detailDialogProp.value, detailDialogIndex.value, null, updatedItem)
    ElMessage.success('详情已保存')
    closeDetailDialog()
  } else {
    console.error('保存失败: 缺少必要参数', { prop: detailDialogProp.value, index: detailDialogIndex.value })
    ElMessage.error('保存失败，请重试')
  }
}

const openProductDialog = (prop, index) => {
  const items = getArrayProp(prop)
  const item = items[index]
  productDialogProp.value = prop
  productDialogIndex.value = index
  productName.value = item?.name || ''
  productDescription.value = item?.description || ''
  productImage.value = item?.image || ''
  productPrice.value = item?.price || ''
  productOriginalPrice.value = item?.originalPrice || ''
  productContent.value = item?.content || ''
  productDialogVisible.value = true
}

const closeProductDialog = () => {
  productDialogVisible.value = false
  productDialogProp.value = ''
  productDialogIndex.value = -1
  productName.value = ''
  productDescription.value = ''
  productImage.value = ''
  productPrice.value = ''
  productOriginalPrice.value = ''
  productContent.value = ''
}

const saveProductDetail = () => {
  if (productDialogProp.value && productDialogIndex.value >= 0) {
    // 同时更新所有产品信息（不包含跳转配置，跳转配置由组件全局的detailPage管理）
    const items = getArrayProp(productDialogProp.value)
    const currentItem = items[productDialogIndex.value] || {}
    const updatedItem = {
      ...currentItem,
      id: currentItem.id || `product-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, // 确保有 id
      name: productName.value || '未命名产品',
      description: productDescription.value || '',
      image: productImage.value || 'http://localhost:8002/p1.jpg',
      price: productPrice.value || '',
      originalPrice: productOriginalPrice.value || null,
      content: productContent.value || '',
      // 移除 navigation，跳转配置由组件全局的 detailPage 管理
    }
    console.log('保存产品详情:', { prop: productDialogProp.value, index: productDialogIndex.value, updatedItem })
    updateProductItem(productDialogProp.value, productDialogIndex.value, null, updatedItem)
    ElMessage.success('详情已保存')
    closeProductDialog()
  } else {
    console.error('保存失败: 缺少必要参数', { prop: productDialogProp.value, index: productDialogIndex.value })
    ElMessage.error('保存失败，请重试')
  }
}

// 产品项处理
const addProductItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [
    ...current,
    {
      id: `product-${Date.now()}`,
      name: '新产品名称',
      description: '产品描述',
      price: '¥999',
      originalPrice: null,
      image: 'http://localhost:8002/p1.jpg',
    },
  ]
  emit('update-props', { [prop]: next })
}

const updateProductItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) => {
    if (i === index) {
      // 如果 key 为 null，说明是更新整个对象
      if (key === null) {
        return value
      }
      // 否则更新指定字段
      return { ...(item || {}), [key]: value }
    }
    return item
  })
  emit('update-props', { [prop]: next })
}

const removeProductItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

// 信息卡片处理
const addInfoCard = (prop) => {
  const current = getArrayProp(prop)
  const next = [
    ...current,
    {
      title: '新卡片标题',
      description: '新卡片描述',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
      href: '#',
      meta: '',
    },
  ]
  emit('update-props', { [prop]: next })
}

const updateInfoCard = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const removeInfoCard = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

// 产品项跳转配置处理
const getProductItemNavigation = (prop, index) => {
  const current = getArrayProp(prop)
  const item = current[index]
  return item?.navigation || createDefaultNavigation()
}

const updateProductItemNavigation = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  const updatedNavigation = { ...navigation, [key]: value }
  const updatedItem = { ...item, navigation: updatedNavigation }
  const next = current.map((it, i) => (i === index ? updatedItem : it))
  emit('update-props', { [prop]: next })
}

const updateProductItemNavigationFromSelector = (prop, index, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  if (value) {
    const updatedNavigation = {
      ...navigation,
      targetPageCode: value.targetPageCode,
      path: value.path,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  } else {
    const updatedNavigation = {
      ...navigation,
      targetPageCode: null,
      path: null,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  }
}

// 轮播项处理
const addCarouselItem = (prop) => {
  const current = getArrayProp(prop)
  const next = [
    ...current,
    {
      title: '新轮播标题',
      description: '新轮播描述',
      category: '分类',
      action: '了解更多',
      href: '#',
      cover: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1920&q=95',
      navigation: createDefaultNavigation(), // 为每个轮播项添加默认跳转配置
    },
  ]
  emit('update-props', { [prop]: next })
}

const updateCarouselItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const removeCarouselItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

// 轮播项跳转配置处理
const getCarouselItemNavigation = (prop, index) => {
  const current = getArrayProp(prop)
  const item = current[index]
  return item?.navigation || createDefaultNavigation()
}

const updateCarouselItemNavigation = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  const updatedNavigation = { ...navigation, [key]: value }
  const updatedItem = { ...item, navigation: updatedNavigation }
  const next = current.map((it, i) => (i === index ? updatedItem : it))
  emit('update-props', { [prop]: next })
}

const updateCarouselItemNavigationFromSelector = (prop, index, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  if (value) {
    // 一次性更新整个 navigation 对象
    const updatedNavigation = {
      ...navigation,
      targetPageCode: value.targetPageCode,
      path: value.path,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  } else {
    // 清空选择
    const updatedNavigation = {
      ...navigation,
      targetPageCode: null,
      path: null,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  }
}

// 跳转配置处理
const route = useRoute()
const projectCode = computed(() => route.params.projectCode)

// 处理数据源选择
const handleDataSourceSelect = (dataSourceCode, fieldProp) => {
  console.log('[BuilderInspector] data source selected:', dataSourceCode, 'component:', props.selectedItem?.key, 'fieldProp:', fieldProp)
  if (!dataSourceCode) return
  
  try {
    currentDataSourceCode.value = dataSourceCode
    // 根据组件类型和字段名确定 items 字段名
    if (props.selectedItem?.key === 'ProductList') {
      currentItemsField.value = 'products'
    } else if (props.selectedItem?.key === 'InfoCardGrid') {
      currentItemsField.value = 'cards'
    } else if (props.selectedItem?.key === 'CarouselNewsSplit') {
      // 对于 CarouselNewsSplit，根据数据源字段名确定 items 字段名
      if (fieldProp === 'newsDataSourceCode') {
        currentItemsField.value = 'newsItems'
      } else if (fieldProp === 'carouselDataSourceCode') {
        currentItemsField.value = 'carouselItems'
      } else {
        currentItemsField.value = 'newsItems' // 默认
      }
    } else {
      currentItemsField.value = 'items'
    }
    console.log('[BuilderInspector] opening dialog, currentItemsField:', currentItemsField.value)
    dataSourceItemDialogVisible.value = true
    console.log('[BuilderInspector] dialogVisible:', dataSourceItemDialogVisible.value)
  } catch (error) {
    console.error('[BuilderInspector] Error in handleDataSourceSelect:', error)
  }
}

// 处理从数据源添加按钮点击
const handleAddFromDataSource = (fieldProp, dataSourceProp = 'dataSourceCode') => {
  try {
    // 对于 CarouselNewsSplit，根据字段名判断使用哪个数据源
    let actualDataSourceProp = dataSourceProp
    if (props.selectedItem?.key === 'CarouselNewsSplit') {
      if (fieldProp === 'newsItems') {
        actualDataSourceProp = 'newsDataSourceCode'
      } else if (fieldProp === 'carouselItems') {
        actualDataSourceProp = 'carouselDataSourceCode'
      }
    }
    
    const dataSourceCode = props.selectedItem?.props?.[actualDataSourceProp]
    if (dataSourceCode) {
      currentDataSourceCode.value = dataSourceCode
      currentItemsField.value = fieldProp
      console.log('[BuilderInspector] handleAddFromDataSource:', { fieldProp, actualDataSourceProp, dataSourceCode, currentItemsField: currentItemsField.value })
      dataSourceItemDialogVisible.value = true
    } else {
      console.warn('[BuilderInspector] No data source code found:', { actualDataSourceProp, props: props.selectedItem?.props })
    }
  } catch (error) {
    console.error('[BuilderInspector] Error in handleAddFromDataSource:', error)
  }
}

const getNavigation = (prop) => {
  const current = props.selectedItem?.props?.[prop]
  return current || createDefaultNavigation()
}

const updateNavigation = (prop, key, value) => {
  const current = getNavigation(prop)
  const next = { ...current, [key]: value }
  emit('update-props', { [prop]: next })
}

const updateNavigationParams = (prop, key, value) => {
  const current = getNavigation(prop)
  const params = { ...(current.params || {}), [key]: value }
  const next = { ...current, params }
  emit('update-props', { [prop]: next })
}

const removeNavigationParam = (prop, key) => {
  const current = getNavigation(prop)
  const params = { ...(current.params || {}) }
  delete params[key]
  const next = { ...current, params }
  emit('update-props', { [prop]: next })
}

// 详情页配置处理
const getDetailPage = (prop) => {
  const current = props.selectedItem?.props?.[prop]
  return current || createDefaultDetailPage()
}

const updateDetailPage = (prop, key, value) => {
  const current = getDetailPage(prop)
  const next = { ...current, [key]: value }
  console.log('[BuilderInspector] updateDetailPage:', { prop, key, value, current, next })
  emit('update-props', { [prop]: next })
}

// 更新详情页配置（处理PageSelector返回的对象）
const updateDetailPageFromSelector = (prop, value) => {
  const current = getDetailPage(prop)
  if (value) {
    // 一次性更新整个 detailPage 对象
    // 保留 templateType，以便在跳转时知道数据类型（news, product, event 等）
    emit('update-props', {
      [prop]: {
        ...current,
        type: DETAIL_PAGE_TYPES.CUSTOM, // 确保类型是 custom
        targetPageCode: value.targetPageCode,
        path: value.path,
        // 保留 templateType（如果已设置），用于在跳转时传递 type 查询参数
        templateType: current.templateType || 'news',
      },
    })
  } else {
    // 清空选择
    emit('update-props', {
      [prop]: {
        ...current,
        targetPageCode: null,
        path: null,
      },
    })
  }
}

// 导航项跳转配置处理
const updateNavItemNavigation = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  const updatedNavigation = { ...navigation, [key]: value }
  const updatedItem = { ...item, navigation: updatedNavigation }
  const next = current.map((it, i) => (i === index ? updatedItem : it))
  emit('update-props', { [prop]: next })
}

// 更新导航项跳转（处理PageSelector返回的对象）
const updateNavItemNavigationFromSelector = (prop, index, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  if (value) {
    // 一次性更新整个 navigation 对象
    const updatedNavigation = {
      ...navigation,
      targetPageCode: value.targetPageCode,
      path: value.path,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  } else {
    // 清空选择
    const updatedNavigation = {
      ...navigation,
      targetPageCode: null,
      path: null,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  }
}

const getNavItemNavigation = (prop, index) => {
  const current = getArrayProp(prop)
  const item = current[index]
  return item?.navigation || createDefaultNavigation()
}

// Tab项跳转配置处理
const updateTabItemNavigation = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  const updatedNavigation = { ...navigation, [key]: value }
  const updatedItem = { ...item, navigation: updatedNavigation }
  const next = current.map((it, i) => (i === index ? updatedItem : it))
  emit('update-props', { [prop]: next })
}

// 更新Tab项跳转（处理PageSelector返回的对象）
const updateTabItemNavigationFromSelector = (prop, index, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  if (value) {
    // 一次性更新整个 navigation 对象
    const updatedNavigation = {
      ...navigation,
      targetPageCode: value.targetPageCode,
      path: value.path,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  } else {
    // 清空选择
    const updatedNavigation = {
      ...navigation,
      targetPageCode: null,
      path: null,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  }
}

const getTabItemNavigation = (prop, index) => {
  const current = getArrayProp(prop)
  const item = current[index]
  return item?.navigation || createDefaultNavigation()
}

// Breadcrumb项跳转配置处理
const updateBreadcrumbItemNavigation = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  const updatedNavigation = { ...navigation, [key]: value }
  const updatedItem = { ...item, navigation: updatedNavigation }
  const next = current.map((it, i) => (i === index ? updatedItem : it))
  emit('update-props', { [prop]: next })
}

// 更新Breadcrumb项跳转（处理PageSelector返回的对象）
const updateBreadcrumbItemNavigationFromSelector = (prop, index, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const navigation = item.navigation || createDefaultNavigation()
  if (value) {
    // 一次性更新整个 navigation 对象
    const updatedNavigation = {
      ...navigation,
      targetPageCode: value.targetPageCode,
      path: value.path,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  } else {
    // 清空选择
    const updatedNavigation = {
      ...navigation,
      targetPageCode: null,
      path: null,
    }
    const updatedItem = { ...item, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  }
}

const getBreadcrumbItemNavigation = (prop, index) => {
  const current = getArrayProp(prop)
  const item = current[index]
  return item?.navigation || createDefaultNavigation()
}

// QuickLink跳转配置处理
const updateQuickLinkNavigation = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  // 兼容旧数据格式（字符串）
  const isOldFormat = typeof item === 'string'
  const baseItem = isOldFormat ? { label: item, navigation: createDefaultNavigation() } : item
  const navigation = baseItem.navigation || createDefaultNavigation()
  const updatedNavigation = { ...navigation, [key]: value }
  const updatedItem = { ...baseItem, navigation: updatedNavigation }
  const next = current.map((it, i) => (i === index ? updatedItem : it))
  emit('update-props', { [prop]: next })
}

// 更新QuickLink跳转（处理PageSelector返回的对象）
const updateQuickLinkNavigationFromSelector = (prop, index, value) => {
  const current = getArrayProp(prop)
  const item = current[index] || {}
  const isOldFormat = typeof item === 'string'
  const baseItem = isOldFormat ? { label: item, navigation: createDefaultNavigation() } : item
  const navigation = baseItem.navigation || createDefaultNavigation()
  if (value) {
    // 一次性更新整个 navigation 对象
    const updatedNavigation = {
      ...navigation,
      targetPageCode: value.targetPageCode,
      path: value.path,
    }
    const updatedItem = { ...baseItem, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  } else {
    // 清空选择
    const updatedNavigation = {
      ...navigation,
      targetPageCode: null,
      path: null,
    }
    const updatedItem = { ...baseItem, navigation: updatedNavigation }
    const next = current.map((it, i) => (i === index ? updatedItem : it))
    emit('update-props', { [prop]: next })
  }
}

const getQuickLinkNavigation = (prop, index) => {
  const current = getArrayProp(prop)
  const item = current[index]
  // 兼容旧数据格式（字符串）
  if (typeof item === 'string') {
    return createDefaultNavigation()
  }
  return item?.navigation || createDefaultNavigation()
}
</script>

<template>
  <el-card class="builder-panel" shadow="hover">
    <template #header>
      <div class="panel-header">
        <div>
          <p class="eyebrow">属性配置</p>
          <h4>{{ title }}</h4>
        </div>
      </div>
    </template>
    <template v-if="schema && selectedItem">
      <el-form label-position="top" size="small" class="inspector-form">
        <el-form-item v-for="field in schema.fields" :key="field.prop" :label="field.label">
          <el-input
            v-if="field.type === 'text'"
            :model-value="selectedItem.props?.[field.prop]"
            :placeholder="field.placeholder"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <el-input-number
            v-else-if="field.type === 'number'"
            :model-value="selectedItem.props?.[field.prop]"
            :placeholder="field.placeholder"
            :min="field.min !== undefined ? field.min : 0"
            :max="field.max !== undefined ? field.max : undefined"
            :step="field.step !== undefined ? field.step : 1"
            style="width: 100%"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <el-input
            v-else-if="field.type === 'textarea'"
            type="textarea"
            :rows="3"
            :model-value="selectedItem.props?.[field.prop]"
            :placeholder="field.placeholder"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <div v-else-if="field.type === 'rich-text'" class="rich-text-editor-wrapper">
            <QuillEditor
              :model-value="selectedItem.props?.[field.prop] || ''"
              contentType="html"
              theme="snow"
              :options="{
                placeholder: field.placeholder || '请输入内容...',
                modules: {
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                },
              }"
              @update:content="(content) => handleInput(field.prop, content)"
            />
          </div>
          <template v-else-if="field.type === 'nav-items'">
            <!-- MainHeader 的 menuItems 字段显示为全局配置入口 -->
            <div v-if="selectedItem?.key === 'MainHeader' && field.prop === 'menuItems'" class="global-nav-notice">
              <el-alert
                type="info"
                :closable="false"
                show-icon
              >
                <template #title>
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span>导航菜单为全局配置，所有页面共享</span>
                    <el-button
                      type="primary"
                      size="small"
                      @click="goToProjectSettings"
                    >
                      去项目设置配置
                    </el-button>
                  </div>
                </template>
              </el-alert>
            </div>
            <!-- 其他组件的 nav-items 字段正常编辑 -->
            <div v-else class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.label"
                  placeholder="导航标题"
                  @update:model-value="(val) => updateNavItem(field.prop, index, 'label', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.href"
                  placeholder="链接（如 /about，已废弃，请使用跳转配置）"
                  disabled
                />
                <el-collapse style="width: 100%; margin-top: 0.5rem">
                  <el-collapse-item title="跳转配置" :name="`nav-${index}`">
                    <div class="navigation-editor" style="padding: 0.5rem 0">
                      <el-select
                        :model-value="getNavItemNavigation(field.prop, index).type"
                        placeholder="选择跳转类型"
                        style="width: 100%"
                        @update:model-value="(val) => updateNavItemNavigation(field.prop, index, 'type', val)"
                      >
                        <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                        <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                        <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
                      </el-select>
                      
                      <template v-if="getNavItemNavigation(field.prop, index).type === NAVIGATION_TYPES.PAGE">
                        <div style="margin-top: 0.8rem">
                          <PageSelector
                            :model-value="getNavItemNavigation(field.prop, index)"
                            :project-code="projectCode"
                            placeholder="选择目标页面"
                            @update:model-value="(val) => updateNavItemNavigationFromSelector(field.prop, index, val)"
                          />
                        </div>
                      </template>
                      
                      <template v-if="getNavItemNavigation(field.prop, index).type === NAVIGATION_TYPES.URL">
                        <el-input
                          style="margin-top: 0.8rem"
                          :model-value="getNavItemNavigation(field.prop, index).url"
                          placeholder="请输入外部链接地址"
                          @update:model-value="(val) => updateNavItemNavigation(field.prop, index, 'url', val)"
                        />
                      </template>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-button
                  text
                  type="danger"
                  @click="removeNavItem(field.prop, index)"
                >
                  删除
                </el-button>
              </div>
              <el-button type="primary" text @click="addNavItem(field.prop)">新增导航项</el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'tab-items'">
            <div class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.label"
                  placeholder="标签标题"
                  @update:model-value="(val) => updateTabItem(field.prop, index, 'label', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.value"
                  placeholder="值（如 overview）"
                  @update:model-value="(val) => updateTabItem(field.prop, index, 'value', val)"
                />
                <el-collapse style="width: 100%; margin-top: 0.5rem">
                  <el-collapse-item title="跳转配置" :name="`tab-${index}`">
                    <div class="navigation-editor" style="padding: 0.5rem 0">
                      <el-select
                        :model-value="getTabItemNavigation(field.prop, index).type"
                        placeholder="选择跳转类型"
                        style="width: 100%"
                        @update:model-value="(val) => updateTabItemNavigation(field.prop, index, 'type', val)"
                      >
                        <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                        <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                        <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
                      </el-select>
                      
                      <template v-if="getTabItemNavigation(field.prop, index).type === NAVIGATION_TYPES.PAGE">
                        <div style="margin-top: 0.8rem">
                          <PageSelector
                            :model-value="getTabItemNavigation(field.prop, index)"
                            :project-code="projectCode"
                            placeholder="选择目标页面"
                            @update:model-value="(val) => updateTabItemNavigationFromSelector(field.prop, index, val)"
                          />
                        </div>
                      </template>
                      
                      <template v-if="getTabItemNavigation(field.prop, index).type === NAVIGATION_TYPES.URL">
                        <el-input
                          style="margin-top: 0.8rem"
                          :model-value="getTabItemNavigation(field.prop, index).url"
                          placeholder="请输入外部链接地址"
                          @update:model-value="(val) => updateTabItemNavigation(field.prop, index, 'url', val)"
                        />
                      </template>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-button
                  text
                  type="danger"
                  @click="removeTabItem(field.prop, index)"
                >
                  删除
                </el-button>
              </div>
              <el-button type="primary" text @click="addTabItem(field.prop)">新增标签项</el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'breadcrumb-items'">
            <div class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.label"
                  placeholder="层级标题"
                  @update:model-value="(val) => updateBreadcrumbItem(field.prop, index, 'label', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.href"
                  placeholder="链接（已废弃，请使用跳转配置）"
                  disabled
                />
                <el-collapse style="width: 100%; margin-top: 0.5rem">
                  <el-collapse-item title="跳转配置（可选）" :name="`breadcrumb-${index}`">
                    <div class="navigation-editor" style="padding: 0.5rem 0">
                      <el-select
                        :model-value="getBreadcrumbItemNavigation(field.prop, index).type"
                        placeholder="选择跳转类型"
                        style="width: 100%"
                        @update:model-value="(val) => updateBreadcrumbItemNavigation(field.prop, index, 'type', val)"
                      >
                        <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                        <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                        <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
                      </el-select>
                      
                      <template v-if="getBreadcrumbItemNavigation(field.prop, index).type === NAVIGATION_TYPES.PAGE">
                        <div style="margin-top: 0.8rem">
                          <PageSelector
                            :model-value="getBreadcrumbItemNavigation(field.prop, index)"
                            :project-code="projectCode"
                            placeholder="选择目标页面"
                            @update:model-value="(val) => updateBreadcrumbItemNavigationFromSelector(field.prop, index, val)"
                          />
                        </div>
                      </template>
                      
                      <template v-if="getBreadcrumbItemNavigation(field.prop, index).type === NAVIGATION_TYPES.URL">
                        <el-input
                          style="margin-top: 0.8rem"
                          :model-value="getBreadcrumbItemNavigation(field.prop, index).url"
                          placeholder="请输入外部链接地址"
                          @update:model-value="(val) => updateBreadcrumbItemNavigation(field.prop, index, 'url', val)"
                        />
                      </template>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-button
                  text
                  type="danger"
                  @click="removeBreadcrumbItem(field.prop, index)"
                >
                  删除
                </el-button>
              </div>
              <el-button type="primary" text @click="addBreadcrumbItem(field.prop)">新增层级</el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'quick-links'">
            <div class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="typeof item === 'string' ? item : item?.label"
                  placeholder="链接文字（例如：学生、教职工等）"
                  @update:model-value="(val) => updateQuickLink(field.prop, index, val)"
                />
                <el-collapse style="width: 100%; margin-top: 0.5rem">
                  <el-collapse-item title="跳转配置" :name="`quick-${index}`">
                    <div class="navigation-editor" style="padding: 0.5rem 0">
                      <el-select
                        :model-value="getQuickLinkNavigation(field.prop, index).type"
                        placeholder="选择跳转类型"
                        style="width: 100%"
                        @update:model-value="(val) => updateQuickLinkNavigation(field.prop, index, 'type', val)"
                      >
                        <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                        <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                        <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
                      </el-select>
                      
                      <template v-if="getQuickLinkNavigation(field.prop, index).type === NAVIGATION_TYPES.PAGE">
                        <div style="margin-top: 0.8rem">
                          <PageSelector
                            :model-value="getQuickLinkNavigation(field.prop, index)"
                            :project-code="projectCode"
                            placeholder="选择目标页面"
                            @update:model-value="(val) => updateQuickLinkNavigationFromSelector(field.prop, index, val)"
                          />
                        </div>
                      </template>
                      
                      <template v-if="getQuickLinkNavigation(field.prop, index).type === NAVIGATION_TYPES.URL">
                        <el-input
                          style="margin-top: 0.8rem"
                          :model-value="getQuickLinkNavigation(field.prop, index).url"
                          placeholder="请输入外部链接地址"
                          @update:model-value="(val) => updateQuickLinkNavigation(field.prop, index, 'url', val)"
                        />
                      </template>
                    </div>
                  </el-collapse-item>
                </el-collapse>
                <el-button
                  text
                  type="danger"
                  @click="removeQuickLink(field.prop, index)"
                >
                  删除
                </el-button>
              </div>
              <el-button type="primary" text @click="addQuickLink(field.prop)">新增链接</el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'bullets'">
            <div class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item"
                  placeholder="要点内容"
                  @update:model-value="(val) => updateBullet(field.prop, index, val)"
                />
                <el-button
                  text
                  type="danger"
                  @click="removeBullet(field.prop, index)"
                >
                  删除
                </el-button>
              </div>
              <el-button type="primary" text @click="addBullet(field.prop)">新增要点</el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'card-items'">
            <div class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.title"
                  placeholder="卡片标题"
                  @update:model-value="(val) => updateCardItem(field.prop, index, 'title', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.summary"
                  placeholder="卡片摘要"
                  @update:model-value="(val) => updateCardItem(field.prop, index, 'summary', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.href"
                  placeholder="链接（如 /about）"
                  @update:model-value="(val) => updateCardItem(field.prop, index, 'href', val)"
                />
                <el-button
                  text
                  type="danger"
                  @click="removeCardItem(field.prop, index)"
                >
                  删除
                </el-button>
              </div>
              <el-button type="primary" text @click="addCardItem(field.prop)">新增卡片</el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'news-highlight'">
            <div class="nav-items-editor">
              <div class="nav-items-editor__row">
                <el-input
                  class="nav-items-editor__input"
                  :model-value="selectedItem.props?.[field.prop]?.title"
                  placeholder="焦点新闻标题"
                  @update:model-value="(val) => updateNewsHighlight(field.prop, 'title', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  type="textarea"
                  :rows="2"
                  :model-value="selectedItem.props?.[field.prop]?.summary"
                  placeholder="焦点新闻摘要"
                  @update:model-value="(val) => updateNewsHighlight(field.prop, 'summary', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="selectedItem.props?.[field.prop]?.date"
                  placeholder="日期（如 2025-01-01）"
                  @update:model-value="(val) => updateNewsHighlight(field.prop, 'date', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="selectedItem.props?.[field.prop]?.cover"
                  placeholder="封面图片 URL"
                  @update:model-value="(val) => updateNewsHighlight(field.prop, 'cover', val)"
                />
              </div>
            </div>
          </template>
          <template v-else-if="field.type === 'data-source'">
            <div class="data-source-editor">
              <DataSourceSelector
                :model-value="selectedItem.props?.[field.prop]"
                :project-code="projectCode"
                :data-source-type="field.dataSourceType || 'news'"
                @update:model-value="(val) => handleInput(field.prop, val)"
                @select="(dataSourceCode) => handleDataSourceSelect(dataSourceCode, field.prop)"
              />
            </div>
          </template>
          <template v-else-if="field.type === 'news-items'">
            <div class="nav-items-editor">
              <!-- 如果选择了数据源，显示已选择的数据项，允许删除和调整 -->
              <!-- 对于 CarouselNewsSplit，检查 newsDataSourceCode；对于其他组件，检查 dataSourceCode -->
              <template v-if="selectedItem.key === 'CarouselNewsSplit' ? selectedItem.props?.newsDataSourceCode : selectedItem.props?.dataSourceCode">
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.title || '未命名新闻'"
                    placeholder="新闻标题"
                    disabled
                    style="opacity: 0.7;"
                  />
                  <el-button
                    text
                    type="danger"
                    @click="removeNewsItem(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button
                  type="primary"
                  text
                  @click="handleAddFromDataSource(field.prop, selectedItem.key === 'CarouselNewsSplit' ? 'newsDataSourceCode' : 'dataSourceCode')"
                >
                  + 从数据源添加
                </el-button>
                <el-alert
                  type="info"
                  :closable="false"
                  style="margin-top: 0.5rem;"
                >
                  <template #title>
                    <span style="font-size: 0.85rem;">数据来自数据源，可在"数据源管理"中编辑数据内容</span>
                  </template>
                </el-alert>
              </template>
              <!-- 如果没有选择数据源，显示可编辑模式 -->
              <template v-else>
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.title || '未命名新闻'"
                    placeholder="新闻标题"
                    @update:model-value="(val) => updateNewsItem(field.prop, index, 'title', val)"
                  />
                  <el-button
                    text
                    type="primary"
                    @click="openDetailDialog(field.prop, index)"
                  >
                    {{ item?.content ? '编辑详情' : '添加详情' }}
                  </el-button>
                  <el-button
                    text
                    type="danger"
                    @click="removeNewsItem(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button type="primary" text @click="addNewsItem(field.prop)">新增新闻条目</el-button>
              </template>
            </div>
          </template>
          <template v-else-if="field.type === 'notice-items'">
            <div class="nav-items-editor">
              <!-- 如果选择了数据源，显示已选择的数据项，允许删除和调整 -->
              <template v-if="selectedItem.props?.dataSourceCode">
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.title || '未命名公告'"
                    placeholder="公告标题"
                    disabled
                    style="opacity: 0.7;"
                  />
                  <el-button
                    text
                    type="danger"
                    @click="removeNoticeItem(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button
                  type="primary"
                  text
                  @click="handleAddFromDataSource(field.prop)"
                >
                  + 从数据源添加
                </el-button>
                <el-alert
                  type="info"
                  :closable="false"
                  style="margin-top: 0.5rem;"
                >
                  <template #title>
                    <span style="font-size: 0.85rem;">数据来自数据源，可在"数据源管理"中编辑数据内容</span>
                  </template>
                </el-alert>
              </template>
              <!-- 如果没有选择数据源，显示可编辑模式 -->
              <template v-else>
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.title || '未命名公告'"
                    placeholder="公告标题"
                    @update:model-value="(val) => updateNoticeItem(field.prop, index, 'title', val)"
                  />
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.date || ''"
                    placeholder="日期（如 01-01）"
                    @update:model-value="(val) => updateNoticeItem(field.prop, index, 'date', val)"
                  />
                  <el-button
                    text
                    type="danger"
                    @click="removeNoticeItem(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button type="primary" text @click="addNoticeItem(field.prop)">新增公告条目</el-button>
              </template>
            </div>
          </template>
          <template v-else-if="field.type === 'navigation'">
            <div class="navigation-editor">
              <el-select
                :model-value="getNavigation(field.prop).type"
                placeholder="选择跳转类型"
                style="width: 100%"
                @update:model-value="(val) => updateNavigation(field.prop, 'type', val)"
              >
                <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
              </el-select>
              
                      <template v-if="getNavigation(field.prop).type === NAVIGATION_TYPES.PAGE">
                <div style="margin-top: 0.8rem">
                  <PageSelector
                    :model-value="getNavigation(field.prop)"
                    :project-code="projectCode"
                    placeholder="选择目标页面"
                    @update:model-value="(val) => {
                      const current = getNavigation(field.prop)
                      if (val) {
                        // 一次性更新整个 navigation 对象
                        emit('update-props', {
                          [field.prop]: {
                            ...current,
                            targetPageCode: val.targetPageCode,
                            path: val.path,
                          },
                        })
                      } else {
                        // 清空选择
                        emit('update-props', {
                          [field.prop]: {
                            ...current,
                            targetPageCode: null,
                            path: null,
                          },
                        })
                      }
                    }"
                  />
                </div>
              </template>
              
              <template v-if="getNavigation(field.prop).type === NAVIGATION_TYPES.URL">
                <el-input
                  style="margin-top: 0.8rem"
                  :model-value="getNavigation(field.prop).url"
                  placeholder="请输入外部链接地址（如 https://example.com）"
                  @update:model-value="(val) => updateNavigation(field.prop, 'url', val)"
                />
              </template>
              
              <template v-if="getNavigation(field.prop).type === NAVIGATION_TYPES.PAGE">
                <div style="margin-top: 0.8rem">
                  <el-divider content-position="left" style="margin: 0.8rem 0">静态参数（可选）</el-divider>
                  <div
                    v-for="(value, key) in getNavigation(field.prop).params"
                    :key="key"
                    style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center"
                  >
                    <el-input
                      :model-value="key"
                      placeholder="参数名"
                      disabled
                      style="flex: 0 0 100px"
                    />
                    <el-input
                      :model-value="value"
                      placeholder="参数值"
                      @update:model-value="(val) => updateNavigationParams(field.prop, key, val)"
                    />
                    <el-button
                      text
                      type="danger"
                      @click="removeNavigationParam(field.prop, key)"
                    >
                      删除
                    </el-button>
                  </div>
                  <el-button
                    type="primary"
                    text
                    size="small"
                    @click="
                      () => {
                        const key = prompt('请输入参数名')
                        if (key) {
                          updateNavigationParams(field.prop, key, '')
                        }
                      }
                    "
                  >
                    + 添加参数
                  </el-button>
                </div>
              </template>
            </div>
          </template>
          <template v-else-if="field.type === 'detail-page'">
            <div class="detail-page-editor">
              <el-select
                :model-value="getDetailPage(field.prop).type"
                placeholder="选择详情页类型"
                style="width: 100%"
                @update:model-value="(val) => updateDetailPage(field.prop, 'type', val)"
              >
                <el-option :label="'使用模板'" :value="DETAIL_PAGE_TYPES.TEMPLATE" />
                <el-option :label="'自定义页面'" :value="DETAIL_PAGE_TYPES.CUSTOM" />
              </el-select>
              
              <template v-if="getDetailPage(field.prop).type === DETAIL_PAGE_TYPES.TEMPLATE">
                <el-select
                  style="margin-top: 0.8rem; width: 100%"
                  :model-value="getDetailPage(field.prop).templateType"
                  placeholder="选择详情页模板"
                  @update:model-value="(val) => updateDetailPage(field.prop, 'templateType', val)"
                >
                  <el-option
                    v-for="option in DETAIL_TEMPLATE_OPTIONS"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              
              <template v-if="getDetailPage(field.prop).type === DETAIL_PAGE_TYPES.CUSTOM">
                <div style="margin-top: 0.8rem">
                  <PageSelector
                    :model-value="getDetailPage(field.prop)"
                    :project-code="projectCode"
                    placeholder="选择自定义详情页"
                    @update:model-value="(val) => updateDetailPageFromSelector(field.prop, val)"
                  />
                </div>
                <!-- 自定义页面也需要设置数据类型，用于在跳转时传递 type 查询参数和调用正确的 API -->
                <el-select
                  style="margin-top: 0.8rem; width: 100%"
                  :model-value="getDetailPage(field.prop).templateType || 'news'"
                  placeholder="选择数据类型"
                  @update:model-value="(val) => updateDetailPage(field.prop, 'templateType', val)"
                >
                  <el-option
                    v-for="option in DETAIL_TEMPLATE_OPTIONS"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
              
              <div style="margin-top: 0.8rem">
                <el-input
                  :model-value="getDetailPage(field.prop).paramKey"
                  placeholder="URL参数名（如 id）"
                  @update:model-value="(val) => updateDetailPage(field.prop, 'paramKey', val)"
                >
                  <template #prepend>参数名</template>
                </el-input>
              </div>
              
              <div style="margin-top: 0.8rem">
                <el-input
                  :model-value="getDetailPage(field.prop).paramSource"
                  placeholder="从item的哪个字段取值（如 id 或 newsId）"
                  @update:model-value="(val) => updateDetailPage(field.prop, 'paramSource', val)"
                >
                  <template #prepend>参数来源</template>
                </el-input>
              </div>
              
              <div style="margin-top: 0.8rem; display: flex; align-items: center; gap: 0.5rem">
                <el-switch
                  :model-value="getDetailPage(field.prop).openInNewTab || false"
                  active-text="新标签页打开"
                  inactive-text="当前页跳转"
                  @update:model-value="(val) => updateDetailPage(field.prop, 'openInNewTab', val)"
                />
              </div>
            </div>
          </template>
          <template v-else-if="field.type === 'carousel-items'">
            <div class="carousel-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="carousel-item-editor"
              >
                <el-card shadow="hover" class="carousel-item-card">
                  <template #header>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span>轮播项 {{ index + 1 }}</span>
                      <el-button
                        text
                        type="danger"
                        size="small"
                        @click="removeCarouselItem(field.prop, index)"
                      >
                        删除
                      </el-button>
                    </div>
                  </template>
                  <el-form label-position="top" size="small">
                    <el-form-item label="图片URL">
                      <el-input
                        :model-value="item?.cover"
                        placeholder="输入图片URL"
                        @update:model-value="(val) => updateCarouselItem(field.prop, index, 'cover', val)"
                      />
                    </el-form-item>
                    <el-form-item label="分类标签">
                      <el-input
                        :model-value="item?.category"
                        placeholder="分类标签"
                        @update:model-value="(val) => updateCarouselItem(field.prop, index, 'category', val)"
                      />
                    </el-form-item>
                    <el-form-item label="标题">
                      <el-input
                        :model-value="item?.title"
                        placeholder="轮播标题"
                        @update:model-value="(val) => updateCarouselItem(field.prop, index, 'title', val)"
                      />
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input
                        type="textarea"
                        :rows="2"
                        :model-value="item?.description"
                        placeholder="轮播描述"
                        @update:model-value="(val) => updateCarouselItem(field.prop, index, 'description', val)"
                      />
                    </el-form-item>
                    <el-form-item label="按钮文字">
                      <el-input
                        :model-value="item?.action"
                        placeholder="按钮文字"
                        @update:model-value="(val) => updateCarouselItem(field.prop, index, 'action', val)"
                      />
                    </el-form-item>
                    <el-form-item label="跳转配置">
                      <el-collapse style="width: 100%">
                        <el-collapse-item title="跳转配置" :name="`carousel-${index}`">
                          <div class="navigation-editor" style="padding: 0.5rem 0">
                            <el-select
                              :model-value="getCarouselItemNavigation(field.prop, index).type"
                              placeholder="选择跳转类型"
                              style="width: 100%"
                              @update:model-value="(val) => updateCarouselItemNavigation(field.prop, index, 'type', val)"
                            >
                              <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                              <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                              <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
                            </el-select>
                            
                            <template v-if="getCarouselItemNavigation(field.prop, index).type === NAVIGATION_TYPES.PAGE">
                              <div style="margin-top: 0.8rem">
                                <PageSelector
                                  :model-value="getCarouselItemNavigation(field.prop, index)"
                                  :project-code="projectCode"
                                  placeholder="选择目标页面"
                                  @update:model-value="(val) => updateCarouselItemNavigationFromSelector(field.prop, index, val)"
                                />
                              </div>
                            </template>
                            
                            <template v-if="getCarouselItemNavigation(field.prop, index).type === NAVIGATION_TYPES.URL">
                              <el-input
                                style="margin-top: 0.8rem"
                                :model-value="getCarouselItemNavigation(field.prop, index).url"
                                placeholder="请输入外部链接地址"
                                @update:model-value="(val) => updateCarouselItemNavigation(field.prop, index, 'url', val)"
                              />
                            </template>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
              <el-button type="primary" text @click="addCarouselItem(field.prop)" style="width: 100%; margin-top: 0.5rem;">
                + 添加轮播项
              </el-button>
            </div>
          </template>
          <template v-else-if="field.type === 'product-items'">
            <div class="nav-items-editor">
              <!-- 如果选择了数据源，显示已选择的数据项，允许删除和调整 -->
              <template v-if="selectedItem.props?.dataSourceCode">
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.name || '未命名产品'"
                    placeholder="产品名称"
                    disabled
                    style="opacity: 0.7;"
                  />
                  <el-button
                    text
                    type="danger"
                    @click="removeProductItem(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button
                  type="primary"
                  text
                  @click="handleAddFromDataSource(field.prop)"
                >
                  + 从数据源添加
                </el-button>
                <el-alert
                  type="info"
                  :closable="false"
                  style="margin-top: 0.5rem;"
                >
                  <template #title>
                    <span style="font-size: 0.85rem;">数据来自数据源，可在"数据源管理"中编辑数据内容</span>
                  </template>
                </el-alert>
              </template>
              <!-- 如果没有选择数据源，显示可编辑模式 -->
              <template v-else>
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.name || '未命名产品'"
                    placeholder="产品名称"
                    @update:model-value="(val) => updateProductItem(field.prop, index, 'name', val)"
                  />
                  <el-button
                    text
                    type="primary"
                    @click="openProductDialog(field.prop, index)"
                  >
                    {{ item?.content ? '编辑详情' : '添加详情' }}
                  </el-button>
                  <el-button
                    text
                    type="danger"
                    @click="removeProductItem(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button type="primary" text @click="addProductItem(field.prop)">新增产品条目</el-button>
              </template>
            </div>
          </template>
          <template v-else-if="field.type === 'info-cards'">
            <div class="nav-items-editor">
              <!-- 如果选择了数据源，显示已选择的数据项，允许删除和调整 -->
              <template v-if="selectedItem.props?.dataSourceCode">
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                >
                  <el-input
                    class="nav-items-editor__input"
                    :model-value="item?.title || '未命名卡片'"
                    placeholder="卡片标题"
                    disabled
                    style="opacity: 0.7;"
                  />
                  <el-button
                    text
                    type="danger"
                    @click="removeInfoCard(field.prop, index)"
                  >
                    删除
                  </el-button>
                </div>
                <el-button
                  type="primary"
                  text
                  @click="handleAddFromDataSource(field.prop)"
                >
                  + 从数据源添加
                </el-button>
                <el-alert
                  type="info"
                  :closable="false"
                  style="margin-top: 0.5rem;"
                >
                  <template #title>
                    <span style="font-size: 0.85rem;">数据来自数据源，可在"数据源管理"中编辑数据内容</span>
                  </template>
                </el-alert>
              </template>
              <!-- 如果没有选择数据源，显示可编辑模式 -->
              <template v-else>
                <div
                  v-for="(item, index) in getArrayProp(field.prop)"
                  :key="index"
                  class="nav-items-editor__row"
                  style="flex-direction: column; align-items: stretch; gap: 0.5rem;"
                >
                  <el-input
                    :model-value="item?.title || '未命名卡片'"
                    placeholder="卡片标题"
                    @update:model-value="(val) => updateInfoCard(field.prop, index, 'title', val)"
                  />
                  <el-input
                    :model-value="item?.description || ''"
                    type="textarea"
                    :rows="2"
                    placeholder="卡片描述"
                    @update:model-value="(val) => updateInfoCard(field.prop, index, 'description', val)"
                  />
                  <el-input
                    :model-value="item?.image || ''"
                    placeholder="图片URL"
                    @update:model-value="(val) => updateInfoCard(field.prop, index, 'image', val)"
                  />
                  <el-input
                    :model-value="item?.meta || ''"
                    placeholder="元信息（可选）"
                    @update:model-value="(val) => updateInfoCard(field.prop, index, 'meta', val)"
                  />
                  <el-button
                    text
                    type="danger"
                    @click="removeInfoCard(field.prop, index)"
                    style="align-self: flex-start;"
                  >
                    删除
                  </el-button>
                </div>
                <el-button type="primary" text @click="addInfoCard(field.prop)">新增卡片</el-button>
              </template>
            </div>
          </template>
          <el-color-picker
            v-else-if="field.type === 'color'"
            :model-value="selectedItem.props?.[field.prop]"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <el-slider
            v-else-if="field.type === 'slider'"
            :model-value="selectedItem.props?.[field.prop] || field.min || 1"
            :min="field.min || 1"
            :max="field.max || 6"
            :step="field.step || 1"
            :show-tooltip="true"
            :show-input="true"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
          <el-switch
            v-else-if="field.type === 'switch'"
            :model-value="selectedItem.props?.[field.prop]"
            :active-text="field.activeText || ''"
            :inactive-text="field.inactiveText || ''"
            @update:model-value="(val) => handleInput(field.prop, val)"
          />
        </el-form-item>
      </el-form>
      <div class="panel-actions">
        <el-button type="danger" size="small" :disabled="!selectedItem" @click="emit('delete')">
          <el-icon><Delete /></el-icon>
          删除组件
        </el-button>
        <el-button size="small" :disabled="!schema" @click="emit('reset')">
          <el-icon><RefreshRight /></el-icon>
          重置属性
        </el-button>
      </div>
    </template>
    <el-empty v-else description="请选择画布中的组件以配置属性" />
  </el-card>

  <!-- 新闻详情编辑对话框 -->
  <el-dialog
    v-model="detailDialogVisible"
    title="编辑新闻详情"
    width="1000px"
    :before-close="closeDetailDialog"
  >
    <div class="detail-editor">
      <el-form label-position="top" size="default">
        <el-form-item label="新闻标题">
          <el-input
            v-model="detailTitle"
            placeholder="请输入新闻标题"
          />
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="detailDate"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="详情内容">
          <div class="quill-editor-wrapper">
            <QuillEditor
              v-model:content="detailContent"
              content-type="html"
              theme="snow"
              :options="{
                placeholder: '请输入新闻详情内容...',
                modules: {
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                },
              }"
            />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDetailDialog">取消</el-button>
        <el-button type="primary" @click="saveDetail">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 产品详情编辑对话框 -->
  <el-dialog
    v-model="productDialogVisible"
    title="编辑产品详情"
    width="1000px"
    :before-close="closeProductDialog"
  >
    <div class="detail-editor">
      <el-form label-position="top" size="default">
        <el-form-item label="产品名称">
          <el-input
            v-model="productName"
            placeholder="请输入产品名称"
          />
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input
            v-model="productDescription"
            type="textarea"
            :rows="3"
            placeholder="请输入产品描述"
          />
        </el-form-item>
        <el-form-item label="产品图片URL">
          <el-input
            v-model="productImage"
            placeholder="请输入产品图片URL"
          />
        </el-form-item>
        <el-form-item label="价格">
          <el-input
            v-model="productPrice"
            placeholder="如：¥999"
          />
        </el-form-item>
        <el-form-item label="原价（可选）">
          <el-input
            v-model="productOriginalPrice"
            placeholder="如：¥1299（留空则不显示）"
          />
        </el-form-item>
        <el-form-item label="详情内容">
          <div class="quill-editor-wrapper">
            <QuillEditor
              v-model:content="productContent"
              content-type="html"
              theme="snow"
              :options="{
                placeholder: '请输入产品详情内容...',
                modules: {
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                },
              }"
            />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeProductDialog">取消</el-button>
        <el-button type="primary" @click="saveProductDetail">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 数据源项选择对话框 -->
  <DataSourceItemSelector
    v-model="dataSourceItemDialogVisible"
    :data-source-code="currentDataSourceCode"
    :selected-items="currentItemsField ? getArrayProp(currentItemsField) : []"
    :component-key="selectedItem?.key || ''"
    @confirm="(selectedItems) => {
      console.log('[BuilderInspector] DataSourceItemSelector confirm:', { 
        selectedItems, 
        currentItemsField, 
        componentKey: selectedItem?.key,
        selectedItemsCount: selectedItems.length 
      })
      if (currentItemsField && selectedItems && selectedItems.length > 0) {
        // 合并新选择的数据项到现有列表中（避免重复）
        const current = getArrayProp(currentItemsField)
        console.log('[BuilderInspector] Current items:', current)
        
        // 对于 InfoCardGrid，使用 id 或 title 作为唯一标识；对于其他组件，使用 id 或 code
        const getItemKey = (item) => {
          if (props.selectedItem?.key === 'InfoCardGrid') {
            return item.id || item.title || item.code
          }
          return item.id || item.code || item.title
        }
        const currentKeys = new Set(current.map(getItemKey).filter(Boolean))
        const newItems = selectedItems.filter(item => {
          const key = getItemKey(item)
          return key && !currentKeys.has(key)
        })
        
        console.log('[BuilderInspector] Filtered new items:', newItems)
        const merged = [...current, ...newItems]
        console.log('[BuilderInspector] Merged items:', merged)
        console.log('[BuilderInspector] Emitting update-props:', { [currentItemsField]: merged })
        
        // 强制触发更新
        emit('update-props', { [currentItemsField]: merged })
      } else {
        console.warn('[BuilderInspector] No items to update:', { currentItemsField, selectedItems })
      }
    }"
  />
</template>

<style scoped>
.builder-panel {
  max-height: calc(100vh - 280px);
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--el-border-color-lighter);
  justify-content: flex-end;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

.inspector-form {
  margin-top: 0.5rem;
}

.carousel-items-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.carousel-item-editor {
  width: 100%;
}

.carousel-item-card {
  margin-bottom: 0.5rem;
}

.product-items-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-item-editor {
  width: 100%;
}

.product-item-card {
  margin-bottom: 0.5rem;
}

.nav-items-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-items-editor__row {
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
}

.nav-items-editor__input {
  flex: 1;
  min-width: 120px;
}

.detail-editor {
  margin: 1rem 0;
}

.detail-editor :deep(.el-form-item) {
  margin-bottom: 1.5rem;
}

.quill-editor-wrapper {
  width: 100%;
}

.quill-editor-wrapper :deep(.quill) {
  width: 100%;
}

.quill-editor-wrapper :deep(.ql-container) {
  min-height: 400px;
  font-size: 14px;
}

.rich-text-editor-wrapper {
  width: 100%;
}

.rich-text-editor-wrapper :deep(.ql-container) {
  min-height: 300px;
  font-size: 14px;
}

.quill-editor-wrapper :deep(.ql-editor) {
  min-height: 400px;
}

.nav-items-editor__row :deep(.el-button) {
  align-self: flex-end;
}

.navigation-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-page-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

