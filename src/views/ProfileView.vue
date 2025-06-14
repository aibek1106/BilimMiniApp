<template>
  <div class="page">
    <h1>Профиль</h1>
    <p>Имя: {{ name }}</p>
    <p>Язык: {{ language }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiFetch } from '../api'
import { getTelegramUser } from '../telegram'

const name = ref('')
const language = ref('')

onMounted(async () => {
  const user = getTelegramUser()
  if (!user) return
  try {
    const res = await apiFetch(`/api/mobile/users/${user.id}`)
    if (res.ok) {
      const data = await res.json()
      name.value = `${data.firstName} ${data.lastName}`
      language.value = data.language
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped>
.page {
  padding: 1rem;
}
</style>
