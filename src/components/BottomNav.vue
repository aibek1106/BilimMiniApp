<template>
  <nav class="bottom-nav">
    <div
      class="item"
      :class="{ active: isActive('/tests') }"
      @click="navigate('/tests')"
    >
      <span class="icon">🏁</span>
      <span class="label">Тесты</span>
    </div>
    <div
      class="item"
      :class="{ active: isActive('/achievements') }"
      @click="navigate('/achievements')"
    >
      <span class="icon">🏆</span>
      <span class="label">Достижения</span>
    </div>
    <div
      class="item"
      :class="{ active: isActive('/profile') }"
      @click="navigate('/profile')"
    >
      <span class="icon">👤</span>
      <span class="label">Профиль</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function isActive(path: string) {
  return route.path.startsWith(path)
}

function navigate(path: string) {
  router.push(path)
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--nav-bg);
  border-top: 1px solid var(--border-color);
}
.item {
  flex: 1;
  text-align: center;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-color);
  cursor: pointer;
}
.item.active {
  color: var(--accent-color);
}
.icon {
  font-size: 1.2rem;
}
</style>
