<template>
  <div class="page">
    <div class="profile-card card">
      <img v-if="photoUrl" :src="photoUrl" alt="avatar" class="avatar" />
      <div class="profile-info">
        <p>Пользователь: {{ displayName }}</p>
        <p>Пройдено тестов: {{ testsDone }}</p>
        <p>Тариф: {{ plan }}</p>
        <p>Школа: {{ school }}</p>
      </div>
      <button @click="editProfile">Редактировать профиль</button>
    </div>
    <div class="settings">
      <div class="language-switch">
        <button
          @click="setLanguage('RU')"
          :class="{ active: language === 'RU' }"
          aria-label="Русский"
        >
          🇷🇺
        </button>
        <button
          @click="setLanguage('KY')"
          :class="{ active: language === 'KY' }"
          aria-label="Кыргызский"
        >
          🇰🇬
        </button>
      </div>
      <button class="theme-toggle" @click="toggleTheme" :aria-label="themeLabel">
        {{ themeIcon }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { apiFetch } from '../api'
import { getTelegramUser } from '../telegram'
import { themeLabel, themeIcon, toggleTheme } from '../theme'

const name = ref('')
const username = ref('')
const photoUrl = ref('')
const language = ref(localStorage.getItem('language') || 'RU')
const testsDone = ref(0)
const plan = ref('Бесплатный')
const school = ref(localStorage.getItem('school') || 'Школа №1')

const displayName = computed(() => username.value || name.value)

onMounted(async () => {
  const user = getTelegramUser()
  if (!user) return
  username.value = user.username || ''
  name.value = `${user.first_name || ''} ${user.last_name || ''}`.trim()
  photoUrl.value = (user as any).photo_url || ''
  const cached = localStorage.getItem('userProfile')
  if (cached) {
    try {
      const data = JSON.parse(cached)
      name.value = `${data.firstName} ${data.lastName}`
      username.value = data.username || username.value
      photoUrl.value = data.photoUrl || photoUrl.value
      language.value = data.language || language.value
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
      username.value = data.username || username.value
      photoUrl.value = data.photoUrl || photoUrl.value
      language.value = data.language || language.value
      localStorage.setItem('userProfile', JSON.stringify(data))
    }
  } catch (e) {
    console.error(e)
  }
})

function editProfile() {
  alert('Редактирование профиля пока недоступно')
}

function setLanguage(lang: string) {
  language.value = lang
  try {
    const cached = localStorage.getItem('userProfile')
    if (cached) {
      const data = JSON.parse(cached)
      data.language = lang
      localStorage.setItem('userProfile', JSON.stringify(data))
    }
  } catch (e) {
    console.error('language update error', e)
  }
  localStorage.setItem('language', lang)
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.profile-info {
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  align-self: center;
  object-fit: cover;
  margin-bottom: 0.5rem;
}
.settings {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.language-switch {
  display: flex;
  gap: 0.5rem;
}
.language-switch button {
  background: var(--card-bg);
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}
.language-switch button.active {
  background: var(--accent-gradient);
  color: #fff;
}
.theme-toggle {
  background: var(--card-bg);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-color);
}
button {
  margin-bottom: 0.5rem;
}
</style>
