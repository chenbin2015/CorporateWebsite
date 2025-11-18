<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Delete, RefreshRight } from '@element-plus/icons-vue'
import PageSelector from '@/components/builder/PageSelector.vue'
import {
  createDefaultNavigation,
  createDefaultDetailPage,
  NAVIGATION_TYPES,
  DETAIL_PAGE_TYPES,
  DETAIL_TEMPLATE_OPTIONS,
} from '@/utils/navigation'

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

// 跳转配置处理
const route = useRoute()
const projectId = computed(() => route.params.projectId)

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
  if (value) {
    updateDetailPage(prop, 'targetPageId', value.targetPageId)
    updateDetailPage(prop, 'path', value.path)
  } else {
    updateDetailPage(prop, 'targetPageId', null)
    updateDetailPage(prop, 'path', null)
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
  if (value) {
    updateNavItemNavigation(prop, index, 'targetPageId', value.targetPageId)
    updateNavItemNavigation(prop, index, 'path', value.path)
  } else {
    updateNavItemNavigation(prop, index, 'targetPageId', null)
    updateNavItemNavigation(prop, index, 'path', null)
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
  if (value) {
    updateTabItemNavigation(prop, index, 'targetPageId', value.targetPageId)
    updateTabItemNavigation(prop, index, 'path', value.path)
  } else {
    updateTabItemNavigation(prop, index, 'targetPageId', null)
    updateTabItemNavigation(prop, index, 'path', null)
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
  if (value) {
    updateBreadcrumbItemNavigation(prop, index, 'targetPageId', value.targetPageId)
    updateBreadcrumbItemNavigation(prop, index, 'path', value.path)
  } else {
    updateBreadcrumbItemNavigation(prop, index, 'targetPageId', null)
    updateBreadcrumbItemNavigation(prop, index, 'path', null)
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
  if (value) {
    updateQuickLinkNavigation(prop, index, 'targetPageId', value.targetPageId)
    updateQuickLinkNavigation(prop, index, 'path', value.path)
  } else {
    updateQuickLinkNavigation(prop, index, 'targetPageId', null)
    updateQuickLinkNavigation(prop, index, 'path', null)
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
                            :project-id="projectId"
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
                            :project-id="projectId"
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
                            :project-id="projectId"
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
                            :project-id="projectId"
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
                    :project-id="projectId"
                    placeholder="选择目标页面"
                    @update:model-value="(val) => {
                      if (val) {
                        updateNavigation(field.prop, 'targetPageId', val.targetPageId)
                        updateNavigation(field.prop, 'path', val.path)
                      } else {
                        updateNavigation(field.prop, 'targetPageId', null)
                        updateNavigation(field.prop, 'path', null)
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
                    :project-id="projectId"
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
            </div>
          </template>
          <el-color-picker
            v-else-if="field.type === 'color'"
            :model-value="selectedItem.props?.[field.prop]"
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

.nav-items-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-items-editor__row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: stretch;
}

.nav-items-editor__input {
  flex: 1;
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

