<template>
  <div class="register">
    <h2>Выберите язык</h2>
    <select v-model="language">
      <option value="ru">Русский</option>
      <option value="ky">Кыргызский</option>
      <option value="en">English</option>
    </select>
    <h2>Введите имя</h2>
    <input v-model="name" type="text" placeholder="Имя" />
    <button @click="proceed">Продолжить</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const language = ref('ru')

function proceed() {
  if (!name.value) return
  localStorage.setItem('userName', name.value)
  localStorage.setItem('language', language.value)
  router.push('/tests')
}
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
select,
input,
button {
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
button {
  background: var(--accent-color);
  color: #fff;
}
</style>
