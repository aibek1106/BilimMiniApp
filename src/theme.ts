import { ref, computed } from 'vue'

export const theme = ref(localStorage.getItem('theme') || 'light')

export const themeLabel = computed(() =>
  theme.value === 'dark' ? 'Светлая тема' : 'Тёмная тема'
)

export const themeIcon = computed(() => (theme.value === 'dark' ? '🌞' : '🌙'))

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
}
