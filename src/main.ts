import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { setupTelegram, getTelegramUser, getInitData } from './telegram'
import { authorize, userExists } from './api'
import { router } from './router'
import OpenTelegram from './components/OpenTelegram.vue'

async function checkVersion() {
  try {
    const res = await fetch('https://ort-test.com/api/mobile/meta/version')
    if (!res.ok) return
    const data = await res.json()
    const current = localStorage.getItem('version')
    if (data.version && data.version !== current) {
      localStorage.clear()
      localStorage.setItem('version', data.version)
    }
  } catch (e) {
    console.error('checkVersion failed', e)
  }
}

const isTelegram =
  typeof window !== 'undefined' &&
  !!(window as any).Telegram?.WebApp &&
  (window as any).Telegram.WebApp.platform !== 'unknown'

async function init() {
  await checkVersion()

  console.log('isTelegram', isTelegram)

  if (isTelegram) {
    setupTelegram()
    console.log('initData', getInitData())
    authorize()
      .then(async () => {
        const user = getTelegramUser()
        console.log('telegram user', user)
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
      .then(() => {
        router.push('/tests').then(r => r)
        createApp(App).use(router).mount('#app')
      })
      .catch(e => {
        console.error(e)
        const root = document.getElementById('app')
        if (root) {
          root.innerHTML = 'Authentication failed'
        }
      })
  } else {
    createApp(OpenTelegram).mount('#app')
  }
}

init()
