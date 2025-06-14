<template>
  <div class="page">
    <p class="hint">Выберите предмет, чтобы начать тест</p>
    <div class="tests">
      <div v-for="subject in subjects" :key="subject.id" class="card" @click="open(subject.id)">
        <span class="icon">📚</span>
        <span>{{ subject.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../api'

const router = useRouter()
const subjects = ref<Array<{ id: number; name: string }>>([])

onMounted(async () => {
  const cached = localStorage.getItem('subjects')
  if (cached) {
    try {
      subjects.value = JSON.parse(cached)
      return
    } catch (e) {
      console.error('subjects cache parse error', e)
    }
  }
  try {
    const res = await apiFetch('/api/mobile/subjects')
    if (res.ok) {
      const data = await res.json()
      subjects.value = data
      localStorage.setItem('subjects', JSON.stringify(data))
    }
  } catch (e) {
    console.error(e)
  }
})

function open(id: number) {
  router.push(`/test/${id}`)
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.hint {
  margin-bottom: 0.5rem;
}
.tests {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: var(--card-bg);
  cursor: pointer;
}
.icon {
  font-size: 1.5rem;
}
</style>
