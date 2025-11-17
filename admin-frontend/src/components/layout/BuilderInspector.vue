<script setup>
import { computed } from 'vue'
import { Delete, RefreshRight } from '@element-plus/icons-vue'

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
  const next = [...current, '新链接']
  emit('update-props', { [prop]: next })
}

const updateQuickLink = (prop, index, value) => {
  const current = getArrayProp(prop)
  const next = current.map((item, i) => (i === index ? value : item))
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
                  placeholder="链接（如 /about）"
                  @update:model-value="(val) => updateNavItem(field.prop, index, 'href', val)"
                />
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
                  placeholder="链接（最后一项可留空表示当前页）"
                  @update:model-value="(val) => updateBreadcrumbItem(field.prop, index, 'href', val)"
                />
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
                  :model-value="item"
                  placeholder="链接文字（例如：学生、教职工等）"
                  @update:model-value="(val) => updateQuickLink(field.prop, index, val)"
                />
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
</style>

