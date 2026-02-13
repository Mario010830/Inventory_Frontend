import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { AuthPageHeader } from './AuthPageHeader'
import { authFormStyles } from './authFormStyles'
import { ROUTES } from '@/constants'
import { config } from '@/config'
import { useAuthStore, useThemeStore, notify } from '@/store'
import { useIsMobile } from '@/hooks'
import { login, loginGoogle, getErrorMessage } from '@/api'

const { inputClass, inputPasswordClass, labelClass } = authFormStyles

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const setTokens = useAuthStore((s) => s.setTokens)
  const from = (location.state as { from?: { pathname: string; search?: string; hash?: string } })?.from
  const setUser = useAuthStore((s) => s.setUser)
  const themeMode = useThemeStore((s) => s.mode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const isMobile = useIsMobile()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await login({ email, password })
      setUser(result.user)
      setTokens(result.accessToken, result.refreshToken, rememberMe)
      notify('success', 'Sesión iniciada.')
      navigate(from ?? ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      notify('error', getErrorMessage(err, 'Credenciales incorrectas. Intenta de nuevo.'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credential: string) => {
    setGoogleLoading(true)
    try {
      const result = await loginGoogle({ idToken: credential })
      setUser(result.user)
      setTokens(result.accessToken, result.refreshToken, rememberMe)
      notify('success', 'Sesión iniciada.')
      navigate(from ?? ROUTES.DASHBOARD, { replace: true })
    } catch (err) {
      notify('error', getErrorMessage(err, 'Error al iniciar sesión con Google.'))
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto min-w-0 px-1 sm:px-0">
      <AuthPageHeader />

      <div className="mt-1 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg dark:shadow-neutral-950/50 p-4 sm:p-5">
        
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-neutral-900 dark:text-neutral-100 text-2xl font-semibold">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Accede a tu panel de gestión de inventario
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className={labelClass}>
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ej: correo@ejemplo.com"
                className={inputClass}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              Contraseña
            </label>
            <div className="relative password-field">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ej: ••••••••"
                className={password ? inputPasswordClass : inputClass}
                required
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-r-lg cursor-pointer"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 dark:focus:ring-primary-400 cursor-pointer bg-white dark:bg-neutral-900"
                />
                <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                  Recordarme
                </span>
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 dark:bg-primary-500 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-60 transition font-medium shadow-sm"
          >
            {loading ? 'Entrando…' : 'Iniciar sesión'}
          </button>
        </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                o continúa con
              </span>
            </div>
          </div>

          {config.googleClientId ? (
            <div className="w-full min-h-12 flex items-center justify-center rounded-full  dark:border-neutral-600 bg-white dark:bg-neutral-900 overflow-hidden [&>div]:!w-full [&>div]:!min-w-0 [&>div]:!flex [&>div]:!justify-center [&_iframe]:!min-h-12">
              <GoogleLogin            
                onSuccess={({ credential }) => {
                  if (credential) handleGoogleSuccess(credential)
                }}
                onError={() => {
                  notify('error', 'No se pudo iniciar sesión con Google. Intenta de nuevo.')
                  setGoogleLoading(false)
                }}
                theme={themeMode === 'dark' ? 'filled_black' : 'filled_blue'}
                size="large"
                type='standard'
                text="continue_with"
                shape="pill"
                useOneTap={false}
                width={isMobile ? '100%' : '400'}
              />
            </div>
          ) : null}
          {googleLoading && (
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">Iniciando sesión con Google…</p>
          )}

          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            ¿No tienes cuenta?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
  )
}
