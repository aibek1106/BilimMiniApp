import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { setupTelegram, getTelegramUser, getInitData } from './telegram'
import { authorize, userExists } from './api'
import { router } from './router'
import OpenTelegram from './components/OpenTelegram.vue'

function clearCache() {
  try {
    localStorage.clear()
  } catch (e) {
    console.error('clearCache failed', e)
  }
}

async function checkVersion() {
  try {
    const res = await fetch('https://ort-test.com/api/meta/version')
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
  clearCache()
  window.addEventListener('beforeunload', clearCache)
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
        const app = createApp(App)
        app.use(router)
        router.replace('/tests')
        app.mount('#app')
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
