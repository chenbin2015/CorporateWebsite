<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '师资名录',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="avatar-grid">
    <header>
      <h3>{{ title }}</h3>
    </header>
    <div class="avatar-grid__content">
      <article v-for="item in items" :key="item.name">
        <div class="avatar-grid__avatar" aria-hidden="true">
          {{ item.name.slice(0, 1) }}
        </div>
        <div>
          <p class="avatar-grid__name">{{ item.name }}</p>
          <p class="avatar-grid__title">{{ item.title }}</p>
          <div class="avatar-grid__tags">
            <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.avatar-grid {
  background: var(--color-surface-contrast);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 0.1rem solid rgba(226, 232, 240, 0.6);
  display: grid;
  gap: 1.2rem;
}

.avatar-grid__content {
  display: grid;
  gap: 1.2rem;
}

article {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.avatar-grid__avatar {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background: var(--color-primary-muted);
  color: var(--color-primary);
  font-weight: 600;
  display: grid;
  place-items: center;
}

.avatar-grid__name {
  margin: 0;
  font-weight: 600;
}

.avatar-grid__title {
  margin: 0.2rem 0 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.avatar-grid__tags {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.4rem;
}

.avatar-grid__tags span {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--color-primary);
}
</style>

