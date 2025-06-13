import { getInitData } from './telegram'

let token: string | null = localStorage.getItem('jwt')

export async function authorize(force = false): Promise<string> {
  if (token && !force) return token
  const initData = getInitData()
  const res = await fetch('/api/auth?initData=' + encodeURIComponent(initData), {
    method: 'POST'
  })
  if (!res.ok) {
    throw new Error('Auth failed')
  }
  const data = await res.json()
  token = data.token || data
  localStorage.setItem('jwt', token)
  return token
}

export async function apiFetch(
  input: RequestInfo | URL,
  options: RequestInit = {},
  retry = true
): Promise<Response> {
  if (!token) {
    await authorize()
  }
  const headers = new Headers(options.headers || {})
  headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(input, { ...options, headers })
  if (res.status === 401 && retry) {
    await authorize(true)
    return apiFetch(input, options, false)
  }
  return res
}
