<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHero from '@shared/components/PageHero.vue'

const route = useRoute()
const productId = route.params.id
const projectCode = route.query.projectCode // 从查询参数获取 projectCode

const product = ref(null)
const loading = ref(true)
const error = ref(null)

// 从接口获取产品详情
const fetchProductDetail = async () => {
  if (!projectCode) {
    error.value = '缺少项目代码参数'
    loading.value = false
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    // 调用接口获取产品详情
    // 接口会从项目下所有页面的 schema_data 中查找对应的产品项
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const response = await axios.get(`${apiBaseUrl}/products/${productId}`, {
      params: { projectCode },
    })
    
    if (response.data) {
      product.value = {
        id: response.data.id || productId,
        name: response.data.name || '产品名称',
        description: response.data.description || '产品描述',
        price: response.data.price || '¥0',
        originalPrice: response.data.originalPrice || null,
        image: response.data.image || 'http://localhost:8002/p1.jpg',
        content: response.data.content || '<p>暂无详细内容</p>',
      }
    } else {
      error.value = '未找到产品详情'
    }
  } catch (err) {
    console.error('获取产品详情失败:', err)
    error.value = '获取产品详情失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProductDetail()
})
</script>

<template>
  <div class="product-detail-page">
    <PageHero
      v-if="product"
      :title="product.name"
      :subtitle="product.description"
      :background="product.image"
    />

    <div v-if="loading" class="container" style="padding: 4rem; text-align: center">
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="container" style="padding: 4rem; text-align: center">
      <p style="color: var(--color-error)">{{ error }}</p>
    </div>

    <div v-else-if="product" class="container">
      <article class="product-detail">
        <div class="product-detail__image-wrapper">
          <img :src="product.image" :alt="product.name" class="product-detail__image" />
        </div>

        <div class="product-detail__info">
          <div class="product-detail__price">
            <span class="product-detail__price-current">{{ product.price }}</span>
            <span v-if="product.originalPrice" class="product-detail__price-original">{{ product.originalPrice }}</span>
          </div>

          <div class="product-detail__content" v-html="product.content || '<p>暂无详细内容</p>'"></div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: var(--color-surface);
}

.product-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.product-detail__image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface-contrast);
}

.product-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-detail__info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-detail__price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-detail__price-current {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.product-detail__price-original {
  font-size: 1.2rem;
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}

.product-detail__content {
  line-height: 1.8;
  color: var(--color-text-primary);
}

.product-detail__content :deep(h3) {
  margin: 2rem 0 1rem;
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.product-detail__content :deep(p) {
  margin: 1rem 0;
}

.product-detail__content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  margin: 1.5rem 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>

