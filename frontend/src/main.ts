import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { setupTelegram } from './telegram'
import { authorize } from './api'
import { router } from './router'

setupTelegram()
authorize().catch(console.error)

createApp(App).use(router).mount('#app')
