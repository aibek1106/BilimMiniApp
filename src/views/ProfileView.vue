<template>
  <div class="page">
    <div class="profile-info">
      <p>Имя: {{ name }}</p>
      <p>Язык: {{ language }}</p>
      <p>Пройдено тестов: {{ testsDone }}</p>
      <p>Тариф: {{ plan }}</p>
      <p>Школа: {{ school }}</p>
    </div>
    <button @click="editProfile">Редактировать профиль</button>
    <button @click="openSettings">Настройки</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../api'
import { getTelegramUser } from '../telegram'

const router = useRouter()

const name = ref('')
const language = ref('')
const testsDone = ref(0)
const plan = ref('Бесплатный')
const school = ref(localStorage.getItem('school') || 'Школа №1')

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

function editProfile() {
  alert('Редактирование профиля пока недоступно')
}

function openSettings() {
  router.push('/profile/settings')
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.profile-info {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
button {
  margin-bottom: 0.5rem;
}
</style>
