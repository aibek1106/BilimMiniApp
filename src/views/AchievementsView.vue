<template>
  <div class="page">
    <h2>Достижения</h2>
    <div class="achievements">
      <div class="card" v-for="a in achievements" :key="a.id">
        <div class="title">{{ a.title }}</div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: a.progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Achievement {
  id: number
  title: string
  progress: number
}

const achievements = ref<Achievement[]>([])

onMounted(() => {
  const cached = localStorage.getItem('achievements')
  if (cached) {
    try {
      achievements.value = JSON.parse(cached)
      return
    } catch (e) {
      console.error('achievements cache parse error', e)
    }
  }
  achievements.value = [
    { id: 1, title: 'Первый тест пройден', progress: 100 },
    { id: 2, title: 'Пройти 5 тестов', progress: 40 },
    { id: 3, title: 'Набрать 100 баллов', progress: 75 }
  ]
  localStorage.setItem('achievements', JSON.stringify(achievements.value))
})
</script>

<style scoped>
.page {
  padding: 1rem;
}
.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.progress-bar {
  height: 6px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}
.progress {
  height: 100%;
  background: var(--accent-gradient);
  transition: width var(--transition-duration);
}
</style>
