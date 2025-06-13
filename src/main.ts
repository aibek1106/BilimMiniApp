import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { setupTelegram } from './telegram'
import { authorize } from './api'
import { router } from './router'
import OpenTelegram from './components/OpenTelegram.vue'

const isTelegram = typeof window !== 'undefined' && !!(window as any).Telegram?.WebApp

if (isTelegram) {
  setupTelegram()
  authorize().catch(console.error)
  router.push('/tests').then(r => r)
  createApp(App).use(router).mount('#app')
} else {
  createApp(OpenTelegram).mount('#app')
}
