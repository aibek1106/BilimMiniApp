<template>
  <nav class="bottom-nav">
    <router-link to="/tests" class="item" :class="{ active: isActive('/tests') }">
      <span class="icon">🏁</span>
      <span class="label">Тесты</span>
    </router-link>
    <router-link to="/achievements" class="item" :class="{ active: isActive('/achievements') }">
      <span class="icon">🏆</span>
      <span class="label">Достижения</span>
    </router-link>
    <router-link to="/profile" class="item" :class="{ active: isActive('/profile') }">
      <span class="icon">👤</span>
      <span class="label">Профиль</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
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
  text-decoration: none;
}
.item.active {
  color: var(--accent-color);
}
.icon {
  font-size: 1.2rem;
}
</style>
