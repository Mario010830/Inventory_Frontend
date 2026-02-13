import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { AuthPageHeader } from './AuthPageHeader'
import { authFormStyles } from './authFormStyles'
import { ROUTES } from '@/constants'
import { notify } from '@/store'
import { forgotPassword, getErrorMessage } from '@/api'

const { inputClass, labelClass } = authFormStyles

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
      notify('success', 'Si existe una cuenta con ese correo, recibirás un email con la nueva contraseña.')
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status
      const message = status === 404
        ? 'Usuario no encontrado.'
        : getErrorMessage(err, 'Error al enviar. Intenta de nuevo.')
      notify('error', message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto min-w-0 px-1 sm:px-0">
      <AuthPageHeader />

      <div className="mt-1 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg dark:shadow-neutral-950/50 p-4 sm:p-5">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-neutral-900 dark:text-neutral-100 text-2xl font-semibold">
            Recuperar contraseña
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Indica tu correo y te enviaremos instrucciones para restablecer tu contraseña.
          </p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <Link
              to={ROUTES.LOGIN}
              className="block w-full text-center py-2.5 px-4 rounded-lg bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 transition font-medium"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 dark:bg-primary-500 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-60 transition font-medium shadow-sm"
            >
              {loading ? 'Enviando…' : 'Enviar'}
            </button>
          </form>
        )}

        {!sent && (
          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
            >
              Volver al inicio de sesión
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
