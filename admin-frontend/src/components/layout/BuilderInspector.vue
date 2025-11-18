<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Delete, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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

const props = defineProps({
  selectedItem: {
    type: Object,
    default: null,
  },
  schema: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update-props', 'reset', 'delete'])

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
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const removeNewsItem = (prop, index) => {
  const current = getArrayProp(prop)
  const next = current.filter((_, i) => i !== index)
  emit('update-props', { [prop]: next })
}

// 新闻详情编辑对话框
const detailDialogVisible = ref(false)
const detailDialogProp = ref('')
const detailDialogIndex = ref(-1)
const detailContent = ref('')

const openDetailDialog = (prop, index) => {
  const items = getArrayProp(prop)
  const item = items[index]
  detailDialogProp.value = prop
  detailDialogIndex.value = index
  detailContent.value = item?.content || ''
  detailDialogVisible.value = true
}

const closeDetailDialog = () => {
  detailDialogVisible.value = false
  detailDialogProp.value = ''
  detailDialogIndex.value = -1
  detailContent.value = ''
}

const saveDetail = () => {
  if (detailDialogProp.value && detailDialogIndex.value >= 0) {
    updateNewsItem(detailDialogProp.value, detailDialogIndex.value, 'content', detailContent.value)
    ElMessage.success('详情已保存')
    closeDetailDialog()
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
      href: '#',
      navigation: createDefaultNavigation(),
    },
  ]
  emit('update-props', { [prop]: next })
}

const updateProductItem = (prop, index, key, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) =>
    i === index ? { ...(item || {}), [key]: value } : item,
  )
  emit('update-props', { [prop]: next })
}

const removeProductItem = (prop, index) => {
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
  emit('update-props', { [prop]: next })
}

// 更新详情页配置（处理PageSelector返回的对象）
const updateDetailPageFromSelector = (prop, value) => {
  const current = getDetailPage(prop)
  if (value) {
    // 一次性更新整个 detailPage 对象
    emit('update-props', {
      [prop]: {
        ...current,
        targetPageCode: value.targetPageCode,
        path: value.path,
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
            :min="0"
            :step="100"
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
          <template v-else-if="field.type === 'nav-items'">
            <div class="nav-items-editor">
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
          <template v-else-if="field.type === 'news-items'">
            <div class="nav-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="nav-items-editor__row"
              >
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.title"
                  placeholder="新闻标题"
                  @update:model-value="(val) => updateNewsItem(field.prop, index, 'title', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.date"
                  placeholder="日期（如 01-01）"
                  @update:model-value="(val) => updateNewsItem(field.prop, index, 'date', val)"
                />
                <el-input
                  class="nav-items-editor__input"
                  :model-value="item?.href"
                  placeholder="链接（如 /news/1）"
                  @update:model-value="(val) => updateNewsItem(field.prop, index, 'href', val)"
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
            <div class="product-items-editor">
              <div
                v-for="(item, index) in getArrayProp(field.prop)"
                :key="index"
                class="product-item-editor"
              >
                <el-card shadow="hover" class="product-item-card">
                  <template #header>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span>产品 {{ index + 1 }}</span>
                      <el-button
                        text
                        type="danger"
                        size="small"
                        @click="removeProductItem(field.prop, index)"
                      >
                        删除
                      </el-button>
                    </div>
                  </template>
                  <el-form label-position="top" size="small">
                    <el-form-item label="产品图片URL">
                      <el-input
                        :model-value="item?.image"
                        placeholder="输入产品图片URL"
                        @update:model-value="(val) => updateProductItem(field.prop, index, 'image', val)"
                      />
                    </el-form-item>
                    <el-form-item label="产品名称">
                      <el-input
                        :model-value="item?.name"
                        placeholder="产品名称"
                        @update:model-value="(val) => updateProductItem(field.prop, index, 'name', val)"
                      />
                    </el-form-item>
                    <el-form-item label="产品描述">
                      <el-input
                        type="textarea"
                        :rows="2"
                        :model-value="item?.description"
                        placeholder="产品描述"
                        @update:model-value="(val) => updateProductItem(field.prop, index, 'description', val)"
                      />
                    </el-form-item>
                    <el-form-item label="价格">
                      <el-input
                        :model-value="item?.price"
                        placeholder="如：¥999"
                        @update:model-value="(val) => updateProductItem(field.prop, index, 'price', val)"
                      />
                    </el-form-item>
                    <el-form-item label="原价（可选）">
                      <el-input
                        :model-value="item?.originalPrice"
                        placeholder="如：¥1299（留空则不显示）"
                        @update:model-value="(val) => updateProductItem(field.prop, index, 'originalPrice', val || null)"
                      />
                    </el-form-item>
                    <el-form-item label="跳转配置">
                      <el-collapse style="width: 100%">
                        <el-collapse-item title="跳转配置" :name="`product-${index}`">
                          <div class="navigation-editor" style="padding: 0.5rem 0">
                            <el-select
                              :model-value="getProductItemNavigation(field.prop, index).type"
                              placeholder="选择跳转类型"
                              style="width: 100%"
                              @update:model-value="(val) => updateProductItemNavigation(field.prop, index, 'type', val)"
                            >
                              <el-option :label="'无跳转'" :value="NAVIGATION_TYPES.NONE" />
                              <el-option :label="'页面跳转'" :value="NAVIGATION_TYPES.PAGE" />
                              <el-option :label="'外部链接'" :value="NAVIGATION_TYPES.URL" />
                            </el-select>
                            
                            <template v-if="getProductItemNavigation(field.prop, index).type === NAVIGATION_TYPES.PAGE">
                              <div style="margin-top: 0.8rem">
                                <PageSelector
                                  :model-value="getProductItemNavigation(field.prop, index)"
                                  :project-code="projectCode"
                                  placeholder="选择目标页面"
                                  @update:model-value="(val) => updateProductItemNavigationFromSelector(field.prop, index, val)"
                                />
                              </div>
                            </template>
                            
                            <template v-if="getProductItemNavigation(field.prop, index).type === NAVIGATION_TYPES.URL">
                              <el-input
                                style="margin-top: 0.8rem"
                                :model-value="getProductItemNavigation(field.prop, index).url"
                                placeholder="请输入外部链接地址"
                                @update:model-value="(val) => updateProductItemNavigation(field.prop, index, 'url', val)"
                              />
                            </template>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
              <el-button type="primary" text @click="addProductItem(field.prop)" style="width: 100%; margin-top: 0.5rem;">
                + 添加产品
              </el-button>
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
    width="800px"
    :before-close="closeDetailDialog"
  >
    <div class="detail-editor">
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
        style="height: 400px; margin-bottom: 1rem"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDetailDialog">取消</el-button>
        <el-button type="primary" @click="saveDetail">保存</el-button>
      </span>
    </template>
  </el-dialog>
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

