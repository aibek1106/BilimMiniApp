<template>
  <div class="app">
    <router-view />
    <BottomNav />
    <button
      class="theme-toggle"
      @click="toggleTheme"
      :aria-label="themeLabel"
    >
      {{ themeIcon }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BottomNav from './components/BottomNav.vue'
import { close } from './telegram'

const theme = ref(localStorage.getItem('theme') || 'light')
const themeLabel = computed(() =>
  theme.value === 'dark' ? 'Светлая тема' : 'Тёмная тема'
)
const themeIcon = computed(() => (theme.value === 'dark' ? '🌞' : '🌙'))

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
}

function closeApp() {
  close()
}

watch(
  theme,
  newTheme => {
    document.documentElement.setAttribute('data-theme', newTheme)
  },
  { immediate: true }
)
</script>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  padding-bottom: calc(4.5rem + env(safe-area-inset-bottom));
}
.theme-toggle {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--card-bg);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-color);
}
.close-btn {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  background: var(--card-bg);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-color);
}
</style>
