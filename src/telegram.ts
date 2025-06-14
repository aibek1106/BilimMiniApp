export function setupTelegram(): void {
  const tg = (window as any)?.Telegram?.WebApp
  if (!tg) return
  tg.ready()
  tg.expand()
  // Use dark header and hide the default main button for a clean look
  try {
    tg.MainButton.hide()
  } catch (e) {
    console.error('Telegram WebApp API error', e)
  }
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

export function close(): void {
  (window as any)?.Telegram?.WebApp?.close()
}

export function sendData(data: unknown): void {
  const str = typeof data === 'string' ? data : JSON.stringify(data)
  ;(window as any)?.Telegram?.WebApp?.sendData(str)
}

export function openLink(url: string, tryInWebView = false): void {
  ;(window as any)?.Telegram?.WebApp?.openLink(url, tryInWebView)
}

export function openTelegramLink(url: string): void {
  ;(window as any)?.Telegram?.WebApp?.openTelegramLink(url)
}
