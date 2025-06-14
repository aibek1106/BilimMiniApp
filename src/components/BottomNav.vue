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
  bottom: calc(
    var(--tg-content-safe-area-inset-bottom, var(--tg-safe-area-inset-bottom, env(safe-area-inset-bottom))) +
      1.5rem
  );
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  width: calc(100% - 2rem);
  max-width: 500px;
  padding: 0.5rem 0.25rem
    calc(
      0.5rem + var(--tg-content-safe-area-inset-bottom, var(--tg-safe-area-inset-bottom, env(safe-area-inset-bottom)))
    ) 0.25rem;
  background: var(--nav-bg-translucent);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.item {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-color);
  cursor: pointer;
}
.item.active {
  color: var(--accent-color);
}
.item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  right: 25%;
  height: 3px;
  border-radius: 2px 2px 0 0;
  background: var(--accent-color);
}
.icon {
  font-size: 1.4rem;
}
</style>
