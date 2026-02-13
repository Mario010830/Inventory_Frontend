import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { ROUTES } from '@/constants'
import { AuthLayout } from '@/routes/AuthLayout'
import { AuthValidationGate } from '@/routes/AuthValidationGate'

const PUBLIC_PATHS = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD]

export function RootGuard() {
  const location = useLocation()
  const pathname = location.pathname
  const isAuth = useAuthStore((s) => !!s.accessToken)
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (!isAuth && !isPublic) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }
  if (isAuth && isPublic) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }
  if (isPublic) {
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    )
  }
  return <AuthValidationGate />
}
