<script setup>
const props = defineProps({
  title: { type: String, default: '表单' },
  fields: { type: Array, default: () => [] },
  submitText: { type: String, default: '提交' },
})
</script>

<template>
  <section class="simple-form-preview">
    <header v-if="title" class="simple-form-preview__header">
      <h3>{{ title }}</h3>
    </header>
    <form class="simple-form-preview__form">
      <div v-for="(field, index) in (fields.length > 0 ? fields : [{ label: '姓名', type: 'text' }, { label: '邮箱', type: 'email' }, { label: '留言', type: 'textarea' }])" :key="index" class="form-field-preview">
        <label>{{ field.label || '字段' }}</label>
        <input v-if="field.type !== 'textarea'" :type="field.type || 'text'" placeholder="请输入" />
        <textarea v-else placeholder="请输入" rows="3"></textarea>
      </div>
      <button type="submit" class="form-submit-preview">{{ submitText }}</button>
    </form>
  </section>
</template>

<style scoped>
.simple-form-preview {
  display: grid;
  gap: 1rem;
}

.simple-form-preview__header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.simple-form-preview__form {
  display: grid;
  gap: 1rem;
}

.form-field-preview {
  display: grid;
  gap: 0.4rem;
}

.form-field-preview label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
}

.form-field-preview input,
.form-field-preview textarea {
  padding: 0.6rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  font-family: inherit;
}

.form-field-preview input:focus,
.form-field-preview textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.form-submit-preview {
  padding: 0.7rem 1.2rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.form-submit-preview:hover {
  background: #1d4ed8;
}
</style>

