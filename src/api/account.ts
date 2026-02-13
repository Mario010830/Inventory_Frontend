import { apiClient } from '@/api/client'
import { API } from '@/constants'
import type {
  AccountUser,
  LoginRequest,
  LoginGoogleRequest,
  RegisterRequest,
  ValidateTokenRequest,
  AccountErrorResponse,
} from '@/types/account'

const BASE = API.ACCOUNT

function getHeaderValue(headers: unknown, key: string): string | null {
  const h = headers as Record<string, unknown>
  const v = h[key.toLowerCase()] ?? h[key]
  return typeof v === 'string' ? v : null
}

function getAccessTokenFromResponse(headers: unknown): string | null {
  const raw = getHeaderValue(headers, 'authorization') ?? ''
  const match = raw.match(/Bearer\s+(.+)/i)
  return match ? match[1].trim() : (raw.trim() || null)
}

function getRefreshTokenFromResponse(headers: unknown): string | null {
  return getHeaderValue(headers, 'refreshtoken')?.trim() ?? null
}

export interface LoginResult {
  user: AccountUser
  accessToken: string
  refreshToken: string
}

/**
 * POST /api/account/login
 * 200: body = user; headers Authorization, RefreshToken
 * 400/401: body message
 */
export async function login(body: LoginRequest): Promise<LoginResult> {
  const res = await apiClient.post<AccountUser>(`${BASE}/login`, body)
  const accessToken = getAccessTokenFromResponse(res.headers)
  const refreshToken = getRefreshTokenFromResponse(res.headers)
  if (!accessToken) {
    throw new Error('El servidor no devolvió token de acceso.')
  }
  return {
    user: res.data,
    accessToken,
    refreshToken: refreshToken ?? '',
  }
}

/**
 * POST /api/account/login-google
 * 200: body = user; headers Authorization, RefreshToken
 * 400: body message
 */
export async function loginGoogle(body: LoginGoogleRequest): Promise<LoginResult> {
  const res = await apiClient.post<AccountUser>(`${BASE}/login-google`, body)
  const accessToken = getAccessTokenFromResponse(res.headers)
  const refreshToken = getRefreshTokenFromResponse(res.headers)
  if (!accessToken) {
    throw new Error('El servidor no devolvió token de acceso.')
  }
  return {
    user: res.data,
    accessToken,
    refreshToken: refreshToken ?? '',
  }
}

/**
 * POST /api/account/register
 * 201: Created (redirigir a login). 400: body message (lanza).
 */
export async function register(body: RegisterRequest): Promise<void> {
  await apiClient.post(`${BASE}/register`, body)
}

/**
 * POST /api/account/forgot-password?email=...
 * 200: OK. 404: lanza (mostrar "Usuario no encontrado" o message).
 */
export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post(`${BASE}/forgot-password`, null, { params: { email } })
}

/**
 * POST /api/account/logout
 * Requiere Authorization. 200: OK. Ignorar errores de red para no bloquear salida.
 */
export async function logout(): Promise<void> {
  await apiClient.post(`${BASE}/logout`)
}

/**
 * POST /api/account/validate-token
 * Body: { token }. 200: body puede traer user. 401: token inválido (lanza).
 */
export async function validateToken(body: ValidateTokenRequest): Promise<AccountUser | null> {
  const res = await apiClient.post<AccountUser | undefined>(`${BASE}/validate-token`, body)
  return res.data ?? null
}

/**
 * Devuelve el mensaje de error del body (400/401/404) o uno por defecto.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  const data = (err as { response?: { data?: AccountErrorResponse } })?.response?.data
  if (data?.message) return data.message
  return fallback
}
