<template>
  <div class="page">
    <div class="result-card">
      <h2>Ваш результат</h2>
      <p class="score">{{ score }}%</p>
      <button @click="share">Отправить результат</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiFetch } from '../api'
import { sendData } from '../telegram'

const score = ref(0)
const route = useRoute()

onMounted(async () => {
  try {
    const res = await apiFetch(`/api/tests/${route.params.id}/result`)
    if (res.ok) {
      const data = await res.json()
      score.value = data.score
    }
  } catch (e) {
    console.error(e)
  }
})

function share() {
  sendData(`score:${score.value}`)
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem;
  background: var(--card-bg);
  border-radius: 12px;
}
.score {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}
</style>
