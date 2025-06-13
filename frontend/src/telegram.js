import { init } from '@telegram-apps/sdk-vue'

export function setupTelegram() {
  init()
}

export function getInitData() {
  return window?.Telegram?.WebApp?.initData || ''
}
