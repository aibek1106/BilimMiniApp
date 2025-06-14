import { init } from '@telegram-apps/sdk-vue'

export function setupTelegram(): void {
  init()
}

export function getInitData(): string {
  return window?.Telegram?.WebApp?.initData || ''
}

export interface TelegramUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
}

export function getTelegramUser(): TelegramUser | null {
  return (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user || null
}
