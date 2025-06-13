<template>
  <div class="page">
    <h1>Тесты</h1>
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
  try {
    const res = await apiFetch('/api/subjects')
    if (res.ok) {
      const data = await res.json()
      subjects.value = data
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
