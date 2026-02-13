import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { config } from '@/config'
import { useAuthStore } from '@/store'
import { API } from '@/constants'

export const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl || '/',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status !== 401 || original?.__retried) return Promise.reject(err)
    original.__retried = true
    const { refreshToken, logout } = useAuthStore.getState()
    if (!refreshToken) {
      logout()
      window.location.href = '/login'
      return Promise.reject(err)
    }
    const expiredToken = original.headers?.Authorization?.replace('Bearer ', '') ?? ''
    try {
      const res = await axios.post(
        `${config.apiBaseUrl}${API.ACCOUNT}/refresh-token`,
        { token: expiredToken, refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const nextAccess = res.headers?.authorization?.replace(/Bearer\s+/i, '') ?? res.headers?.Authorization?.replace(/Bearer\s+/i, '')
      const nextRefresh = res.headers?.refreshtoken ?? res.headers?.RefreshToken
      if (nextAccess) useAuthStore.getState().setTokens(nextAccess, nextRefresh ?? refreshToken)
      if (original.headers) original.headers.Authorization = `Bearer ${nextAccess}`
      return apiClient(original)
    } catch {
      logout()
      window.location.href = '/login'
      return Promise.reject(err)
    }
  }
)
