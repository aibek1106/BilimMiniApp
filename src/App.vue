<template>
  <div class="app">
    <BottomNav />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import BottomNav from './components/BottomNav.vue'
import { setHeaderColor } from './telegram'
import { theme } from './theme'

watch(
  theme,
  newTheme => {
    document.documentElement.setAttribute('data-theme', newTheme)
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-bg')
      .trim()
    setHeaderColor(color)
  },
  { immediate: true }
)
</script>

<style scoped>
.app {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: calc(
    6.5rem +
      var(
        --tg-content-safe-area-inset-bottom,
        var(--tg-safe-area-inset-bottom, env(safe-area-inset-bottom))
      )
  );
  padding-top: var(
    --tg-content-safe-area-inset-top,
    var(--tg-safe-area-inset-top, env(safe-area-inset-top))
  );
  overflow-y: auto;
}
.close-btn {
  position: fixed;
  top: calc(
    var(--tg-content-safe-area-inset-top, var(--tg-safe-area-inset-top, env(safe-area-inset-top))) +
      0.5rem
  );
  left: 0.5rem;
  background: var(--card-bg);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-color);
}
</style>
