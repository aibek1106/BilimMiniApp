import { getInitData, getTelegramUser } from './telegram'

let token: string | null = localStorage.getItem('jwt')

export async function authorize(force = false): Promise<string | null> {
  if (token && !force) return token
  const initData = getInitData()
  console.log('authorize: initData', initData)
  const res = await fetch('/api/mobile/auth?initData=' + encodeURIComponent(initData), {
    method: 'POST'
  })
  console.log('authorize: response status', res.status)
  if (!res.ok) {
    console.error('authorize: failed', await res.text())
    throw new Error('Auth failed')
  }
  const data = await res.json()
  console.log('authorize: token data', data)
  token = data.token || data
  if (typeof token === 'string') {
    localStorage.setItem('jwt', token)
  }
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
  console.log('apiFetch:', input)
  const res = await fetch(input, { ...options, headers })
  console.log('apiFetch: response status', res.status)
  if (res.status === 401 && retry) {
    await authorize(true)
    return apiFetch(input, options, false)
  }
  return res
}

export async function fetchRegions() {
  console.log('fetchRegions: start')
  const res = await apiFetch('/api/mobile/location/regions')
  console.log('fetchRegions: response status', res.status)
  if (!res.ok) throw new Error('Failed to load regions')
  return res.json()
}

export async function fetchCities(regionId: number) {
  console.log('fetchCities: region', regionId)
  const res = await apiFetch(`/api/mobile/location/cities/${regionId}`)
  console.log('fetchCities: response status', res.status)
  if (!res.ok) throw new Error('Failed to load cities')
  return res.json()
}

export async function fetchSchools(cityId: number) {
  console.log('fetchSchools: city', cityId)
  const res = await apiFetch(`/api/mobile/location/schools/${cityId}`)
  console.log('fetchSchools: response status', res.status)
  if (!res.ok) throw new Error('Failed to load schools')
  return res.json()
}

export interface RegisterPayload {
  telegramId: number
  firstName?: string
  lastName?: string
  schoolId: number
  language: string
}

export async function registerUser(payload: Omit<RegisterPayload, 'telegramId' | 'firstName' | 'lastName'>) {
  const user = getTelegramUser()
  if (!user) throw new Error('No telegram user')
  const body: RegisterPayload = {
    telegramId: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    ...payload
  }
  console.log('registerUser: payload', body)
  const res = await apiFetch('/api/mobile/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  console.log('registerUser: response status', res.status)
  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}

export async function userExists(telegramId: number) {
  console.log('userExists: telegramId', telegramId)
  const res = await apiFetch(`/api/mobile/users/${telegramId}/exists`)
  console.log('userExists: response status', res.status)
  if (!res.ok) throw new Error('User exists check failed')
  const data = await res.json()
  return data.exists
}
