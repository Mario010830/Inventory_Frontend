import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { validateToken } from '@/api'
import { ROUTES } from '@/constants'
import { AppLayout } from '@/routes/AppLayout'

export function AuthValidationGate() {
  const navigate = useNavigate()
  const accessToken = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const [status, setStatus] = useState<'idle' | 'invalid'>('idle')

   const isValidating = Boolean(accessToken && !user)

  useEffect(() => {
    if (!accessToken || user) return
    let cancelled = false
    validateToken({ token: accessToken })
      .then((data) => {
        if (cancelled) return
        if (data) setUser(data)
      })
      .catch(() => {
        if (cancelled) return
        logout()
        setStatus('invalid')
        navigate(ROUTES.LOGIN, { replace: true })
      })
    return () => {
      cancelled = true
    }
  }, [accessToken, user, setUser, logout, navigate])

  if (status === 'invalid') return null
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"
            aria-hidden
          />
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Validando sesión…</p>
        </div>
      </div>
    )
  }
  return <AppLayout />
}
