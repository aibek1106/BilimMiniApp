<template>
  <div class="page">
    <button class="theme-toggle" @click="toggleTheme" :aria-label="themeLabel">
      {{ themeIcon }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { themeLabel, themeIcon, toggleTheme } from '../theme'
</script>

<style scoped>
.theme-toggle {
  margin-top: 1rem;
  background: var(--card-bg);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-color);
}
</style>
