<template>
  <div class="page">
    <h1>Профиль</h1>
    <p>Имя: {{ name }}</p>
    <p>Язык: {{ language }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const name = ref('')
const language = ref('')

onMounted(() => {
  name.value = localStorage.getItem('userName') || ''
  language.value = localStorage.getItem('language') || ''
})
</script>

<style scoped>
.page {
  padding: 1rem;
}
</style>
