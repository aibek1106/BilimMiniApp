<template>
  <div class="page">
    <h1>Результаты</h1>
    <p>Ваш результат: {{ score }}</p>
    <button @click="share">Отправить результат</button>
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
</style>
