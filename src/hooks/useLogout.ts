
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { useAuthStore } from '@/store'
import { logout as logoutApi } from '@/api'
import { ROUTES } from '@/constants'

export function useLogout() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  return useCallback(async () => {
    try {
      await logoutApi()
    } catch {
      // No bloquear salida si el API falla (red, 401, etc.)
    } finally {
      googleLogout()
      logout()
      navigate(ROUTES.LOGIN, { replace: true })
    }
  }, [logout, navigate])
}
