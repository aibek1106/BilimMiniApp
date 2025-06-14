<template>
  <div class="page">
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
  const cached = localStorage.getItem('userProfile')
  if (cached) {
    try {
      const data = JSON.parse(cached)
      name.value = `${data.firstName} ${data.lastName}`
      language.value = data.language
      return
    } catch (e) {
      console.error('profile cache parse error', e)
    }
  }
  try {
    const res = await apiFetch(`/api/mobile/users/${user.id}`)
    if (res.ok) {
      const data = await res.json()
      name.value = `${data.firstName} ${data.lastName}`
      language.value = data.language
      localStorage.setItem('userProfile', JSON.stringify(data))
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
