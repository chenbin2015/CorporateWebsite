<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete, ArrowUp, ArrowDown, Menu, ArrowLeft } from '@element-plus/icons-vue'
import { getProject, updateProjectNavigation } from '@/services/modules/project'
import { fetchProjectPages } from '@/services/modules/project'
import PageSelector from '@/components/builder/PageSelector.vue'

const route = useRoute()
const router = useRouter()

const projectCode = ref(route.params.projectCode)
const project = ref(null)
const pages = ref([])
const loading = ref(false)

// 导航配置
const navigationConfig = ref({
  menuItems: [],
})

// 当前编辑的菜单项
const editingItem = ref(null)
const editingIndex = ref(-1)
const showEditDialog = computed({
  get: () => editingItem.value !== null,
  set: (val) => {
    if (!val) {
      editingItem.value = null
      editingIndex.value = -1
    }
  },
})

// 加载项目信息
const loadProject = async () => {
  try {
    loading.value = true
    const data = await getProject(projectCode.value)
    project.value = data
    
    // 解析导航配置
    if (data.navigationConfig) {
      try {
        navigationConfig.value = JSON.parse(data.navigationConfig)
      } catch (e) {
        console.warn('导航配置解析失败，使用默认值', e)
        navigationConfig.value = { menuItems: [] }
      }
    }
  } catch (error) {
    ElMessage.error('加载项目信息失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 加载页面列表（用于选择目标页面）
const loadPages = async () => {
  try {
    const data = await fetchProjectPages(projectCode.value)
    pages.value = data
  } catch (error) {
    console.error('加载页面列表失败', error)
  }
}

// 添加顶级菜单项
const addMenuItem = () => {
  navigationConfig.value.menuItems.push({
    label: '新菜单',
    href: '#',
    navigation: { type: 'none' },
    children: [],
  })
}

// 添加子菜单项
const addChildMenuItem = (parentIndex) => {
  if (!navigationConfig.value.menuItems[parentIndex].children) {
    navigationConfig.value.menuItems[parentIndex].children = []
  }
  navigationConfig.value.menuItems[parentIndex].children.push({
    label: '新子菜单',
    href: '#',
    navigation: { type: 'none' },
  })
}

// 删除菜单项
const removeMenuItem = (index) => {
  navigationConfig.value.menuItems.splice(index, 1)
}

// 删除子菜单项
const removeChildMenuItem = (parentIndex, childIndex) => {
  navigationConfig.value.menuItems[parentIndex].children.splice(childIndex, 1)
}

// 上移菜单项
const moveMenuItemUp = (index) => {
  if (index > 0) {
    const items = navigationConfig.value.menuItems
    ;[items[index], items[index - 1]] = [items[index - 1], items[index]]
  }
}

// 下移菜单项
const moveMenuItemDown = (index) => {
  const items = navigationConfig.value.menuItems
  if (index < items.length - 1) {
    ;[items[index], items[index + 1]] = [items[index + 1], items[index]]
  }
}

// 编辑菜单项
const editMenuItem = (item, index) => {
  editingItem.value = JSON.parse(JSON.stringify(item))
  editingIndex.value = index
}

// 编辑子菜单项
const editChildMenuItem = (item, parentIndex, childIndex) => {
  editingItem.value = JSON.parse(JSON.stringify(item))
  editingIndex.value = { parent: parentIndex, child: childIndex }
}

// 保存编辑
const saveEdit = () => {
  if (editingIndex.value === -1) return
  
  if (typeof editingIndex.value === 'number') {
    // 编辑顶级菜单
    navigationConfig.value.menuItems[editingIndex.value] = editingItem.value
  } else {
    // 编辑子菜单
    navigationConfig.value.menuItems[editingIndex.value.parent].children[
      editingIndex.value.child
    ] = editingItem.value
  }
  
  editingItem.value = null
  editingIndex.value = -1
}

// 取消编辑
const cancelEdit = () => {
  editingItem.value = null
  editingIndex.value = -1
}

// 保存导航配置
const saveNavigation = async () => {
  try {
    loading.value = true
    const configJson = JSON.stringify(navigationConfig.value)
    await updateProjectNavigation(projectCode.value, configJson)
    ElMessage.success('导航配置保存成功')
  } catch (error) {
    ElMessage.error('保存导航配置失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 处理页面选择（用于菜单项导航）
const handlePageSelect = (menuItem, selectedPage) => {
  if (selectedPage) {
    menuItem.navigation = {
      type: 'page',
      targetPageCode: selectedPage.code,
      path: selectedPage.path,
    }
    menuItem.href = selectedPage.path
  }
}

// 返回上一页
const goBack = () => {
  router.back()
}

onMounted(() => {
  loadProject()
  loadPages()
})
</script>

<template>
  <div class="project-settings">
    <div class="settings-header">
      <div class="settings-header-left">
        <el-button 
          :icon="ArrowLeft" 
          text 
          @click="goBack"
          style="margin-right: 1rem;"
        >
          返回
        </el-button>
        <h2>项目设置 - {{ project?.name }}</h2>
      </div>
      <el-button type="primary" @click="saveNavigation" :loading="loading">
        保存配置
      </el-button>
    </div>

    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <span>全局导航配置</span>
          <el-button type="primary" size="small" :icon="Plus" @click="addMenuItem">
            添加菜单项
          </el-button>
        </div>
      </template>

      <div v-if="navigationConfig.menuItems.length === 0" class="empty-state">
        <p>暂无菜单项，点击"添加菜单项"开始配置</p>
      </div>

      <div v-else class="menu-items">
        <div
          v-for="(item, index) in navigationConfig.menuItems"
          :key="index"
          class="menu-item"
        >
          <div class="menu-item-header">
            <div class="menu-item-info">
              <el-icon class="drag-handle"><Menu /></el-icon>
              <span class="menu-label">{{ item.label }}</span>
              <el-tag v-if="item.children?.length > 0" size="small" type="info">
                {{ item.children.length }} 个子菜单
              </el-tag>
            </div>
            <div class="menu-item-actions">
              <el-button
                size="small"
                :icon="ArrowUp"
                :disabled="index === 0"
                @click="moveMenuItemUp(index)"
              />
              <el-button
                size="small"
                :icon="ArrowDown"
                :disabled="index === navigationConfig.menuItems.length - 1"
                @click="moveMenuItemDown(index)"
              />
              <el-button
                size="small"
                type="primary"
                @click="editMenuItem(item, index)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                type="success"
                :icon="Plus"
                @click="addChildMenuItem(index)"
              >
                添加子菜单
              </el-button>
              <el-button
                size="small"
                type="danger"
                :icon="Delete"
                @click="removeMenuItem(index)"
              >
                删除
              </el-button>
            </div>
          </div>

          <!-- 子菜单列表 -->
          <div v-if="item.children?.length > 0" class="child-menu-items">
            <div
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              class="child-menu-item"
            >
              <div class="child-menu-item-info">
                <span class="child-menu-label">{{ child.label }}</span>
              </div>
              <div class="child-menu-item-actions">
                <el-button
                  size="small"
                  type="primary"
                  @click="editChildMenuItem(child, index, childIndex)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="removeChildMenuItem(index, childIndex)"
                >
                  删除
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 编辑菜单项对话框 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑菜单项"
      width="600px"
      @close="cancelEdit"
    >
      <el-form :model="editingItem" label-width="100px" v-if="editingItem">
        <el-form-item label="菜单名称">
          <el-input v-model="editingItem.label" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="editingItem.href" placeholder="如: /about" />
        </el-form-item>
        <el-form-item label="目标页面">
          <PageSelector
            :project-code="projectCode"
            :model-value="
              editingItem.navigation?.targetPageCode
                ? {
                    code: editingItem.navigation.targetPageCode,
                    path: editingItem.navigation.path,
                  }
                : null
            "
            @update:model-value="handlePageSelect(editingItem, $event)"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.project-settings {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  height: calc(100vh - 120px);
  overflow-y: auto;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.settings-header-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.settings-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.settings-card {
  margin-bottom: 2rem;
  min-height: 500px;
}

.settings-card :deep(.el-card__body) {
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--el-text-color-secondary);
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  padding: 1rem;
  background: var(--el-bg-color-page);
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.menu-item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.drag-handle {
  cursor: move;
  color: var(--el-text-color-secondary);
}

.menu-label {
  font-weight: 500;
  font-size: 1rem;
}

.menu-item-actions {
  display: flex;
  gap: 0.5rem;
}

.child-menu-items {
  margin-top: 1rem;
  padding-left: 2rem;
  border-left: 2px solid var(--el-border-color-light);
}

.child-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: var(--el-fill-color-lighter);
  border-radius: var(--el-border-radius-base);
}

.child-menu-item-info {
  flex: 1;
}

.child-menu-label {
  color: var(--el-text-color-regular);
  font-size: 0.9rem;
}

.child-menu-item-actions {
  display: flex;
  gap: 0.5rem;
}
</style>

