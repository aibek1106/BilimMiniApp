export function setupTelegram(): void {
  const tg = (window as any)?.Telegram?.WebApp
  if (!tg) return
  tg.ready()
  tg.expand()
  applySafeArea(tg)
  tg.onEvent('safeAreaChanged', () => applySafeArea(tg))
  tg.onEvent('contentSafeAreaChanged', () => applySafeArea(tg))
  // Set header color based on stored theme and hide the default main button
  try {
    const theme = localStorage.getItem('theme') || 'light'
    const headerColor = theme === 'dark' ? '#121212' : '#ffffff'
    tg.setHeaderColor(headerColor)
    tg.MainButton.hide()
  } catch (e) {
    console.error('Telegram WebApp API error', e)
  }
}

export function setHeaderColor(color: string): void {
  try {
    ;(window as any)?.Telegram?.WebApp?.setHeaderColor(color)
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

function applySafeArea(tg: any) {
  const root = document.documentElement
  const inset = tg?.safeAreaInset || {}
  const content = tg?.contentSafeAreaInset || {}
  root.style.setProperty('--tg-safe-area-inset-top', `${inset.top || 0}px`)
  root.style.setProperty('--tg-safe-area-inset-bottom', `${inset.bottom || 0}px`)
  root.style.setProperty('--tg-safe-area-inset-left', `${inset.left || 0}px`)
  root.style.setProperty('--tg-safe-area-inset-right', `${inset.right || 0}px`)
  root.style.setProperty(
    '--tg-content-safe-area-inset-top',
    `${content.top || 0}px`
  )
  root.style.setProperty(
    '--tg-content-safe-area-inset-bottom',
    `${content.bottom || 0}px`
  )
  root.style.setProperty(
    '--tg-content-safe-area-inset-left',
    `${content.left || 0}px`
  )
  root.style.setProperty(
    '--tg-content-safe-area-inset-right',
    `${content.right || 0}px`
  )
}
