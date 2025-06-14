<template>
  <div class="page" v-if="question">
    <h2>{{ question.text }}</h2>
    <img v-if="question.image" :src="question.image" class="q-image" />
    <div class="options">
      <button v-for="(opt, idx) in question.options" :key="idx" @click="select(idx)">
        {{ opt }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch } from '../api'

interface Question {
  text: string
  image?: string
  options: string[]
}

const route = useRoute()
const router = useRouter()
const question = ref<Question | null>(null)

onMounted(async () => {
  try {
    const res = await apiFetch(`/api/tests/${route.params.id}/question`)
    if (res.ok) {
      question.value = await res.json()
    }
  } catch (e) {
    console.error(e)
  }
})

function select(idx: number) {
  router.push(`/results/${route.params.id}`)
}
</script>

<style scoped>
.page {
  padding: 1rem;
}
.q-image {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.5rem 0;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
