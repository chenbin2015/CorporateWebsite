<script setup>
import { computed } from 'vue'
import { isDesignMode } from '@shared/utils/context'
import { handleDetailPageNavigation, handleNavigation } from '@/utils/navigation'

const props = defineProps({
  title: {
    type: String,
    default: '产品列表',
  },
  products: {
    type: Array,
    default: () => [
      {
        id: '1',
        name: '默认产品名称',
        description: '这是产品的默认描述信息，可在调用组件时通过 props 覆盖。',
        price: '¥999',
        originalPrice: '¥1299',
        image: 'http://localhost:8002/p1.jpg',
        href: '#',
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
      {
        id: '2',
        name: '默认产品名称二',
        description: '这是产品的默认描述信息。',
        price: '¥899',
        originalPrice: null,
        image: 'http://localhost:8002/p1.jpg',
        href: '#',
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
      {
        id: '3',
        name: '默认产品名称三',
        description: '这是产品的默认描述信息。',
        price: '¥1299',
        originalPrice: null,
        image: 'http://localhost:8002/p1.jpg',
        href: '#',
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
    ],
  },
  columns: {
    type: Number,
    default: 3,
  },
  detailPage: {
    type: Object,
    default: () => null,
  },
})

const handleProductClick = (product, event) => {
  // 设计态中禁用交互
  if (isDesignMode()) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  // 优先使用产品自己的 navigation 配置
  if (product.navigation && product.navigation.type !== 'none') {
    event.preventDefault()
    event.stopPropagation()
    handleNavigation(product.navigation, product)
    return
  }
  
  // 其次使用组件级别的 detailPage 配置
  if (props.detailPage) {
    event.preventDefault()
    event.stopPropagation()
    handleDetailPageNavigation(props.detailPage, product)
    return
  }
  
  // 最后使用 product.href（向后兼容）
}

const gridTemplate = computed(() => `repeat(${props.columns || 3}, minmax(0, 1fr))`)
</script>

<template>
  <section class="product-list">
    <header v-if="title" class="product-list__header">
      <h2>{{ title }}</h2>
    </header>
    <div class="product-list__body" :style="{ gridTemplateColumns: gridTemplate }">
      <article
        v-for="product in products"
        :key="product.id || product.name"
        class="product-card"
        :style="isDesignMode() ? 'cursor: default; pointer-events: none;' : 'cursor: pointer;'"
        @click="(e) => handleProductClick(product, e)"
      >
        <a
          :href="isDesignMode() ? 'javascript:void(0)' : (product.navigation && product.navigation.type !== 'none') || detailPage ? 'javascript:void(0)' : (product.href || '#')"
          class="product-card__link"
        >
          <div class="product-card__image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-card__image" loading="lazy" />
            <div v-if="product.originalPrice" class="product-card__badge">特价</div>
          </div>
          <div class="product-card__content">
            <h3 class="product-card__title">{{ product.name }}</h3>
            <p class="product-card__description">{{ product.description }}</p>
            <div class="product-card__price">
              <span class="product-card__price-current">{{ product.price }}</span>
              <span v-if="product.originalPrice" class="product-card__price-original">{{ product.originalPrice }}</span>
            </div>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.product-list {
  display: grid;
  gap: 2rem;
}

.product-list__header {
  margin: 0;
}

.product-list__header h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text-primary, #1e293b);
}

.product-list__body {
  display: grid;
  gap: 2rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface, #fff);
  border-radius: var(--radius-lg, 0.8rem);
  overflow: hidden;
  border: 1px solid var(--color-border, #e2e8f0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-0.4rem);
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.12);
}

.product-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.product-card__image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 宽高比 */
  overflow: hidden;
  background: var(--color-surface-contrast, #f8fafc);
}

.product-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.3s ease;
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__badge {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  padding: 0.4rem 0.8rem;
  background: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: var(--radius-sm, 0.25rem);
  z-index: 1;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
  flex: 1;
}

.product-card__title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-primary, #1e293b);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.product-card__price {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: auto;
}

.product-card__price-current {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary, #3b82f6);
}

.product-card__price-original {
  font-size: 1rem;
  color: var(--color-text-tertiary, #94a3b8);
  text-decoration: line-through;
}

/* 响应式布局 */
@media (max-width: 64rem) {
  .product-list__body {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 42rem) {
  .product-list__body {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
}
</style>

