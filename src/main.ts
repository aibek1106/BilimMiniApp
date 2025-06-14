import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { setupTelegram, getTelegramUser } from './telegram'
import { authorize, userExists } from './api'
import { router } from './router'
import OpenTelegram from './components/OpenTelegram.vue'

const isTelegram =
  typeof window !== 'undefined' &&
  !!(window as any).Telegram?.WebApp &&
  (window as any).Telegram.WebApp.platform !== 'unknown'

if (isTelegram) {
  setupTelegram()
  authorize()
    .then(async () => {
      const user = getTelegramUser()
      if (user) {
        try {
          const exists = await userExists(user.id)
          if (exists) {
            localStorage.setItem('registered', '1')
          }
        } catch (e) {
          console.error(e)
        }
      }
    })
    .catch(console.error)
  router.push('/tests').then(r => r)
  createApp(App).use(router).mount('#app')
} else {
  createApp(OpenTelegram).mount('#app')
}
