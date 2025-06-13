import { init } from '@telegram-apps/sdk-vue'

export function setupTelegram(): void {
  init()
}

export function getInitData(): string {
  return window?.Telegram?.WebApp?.initData || ''
}
