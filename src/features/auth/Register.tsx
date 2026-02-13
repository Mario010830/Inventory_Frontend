import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react'
import { AuthPageHeader } from './AuthPageHeader'
import { authFormStyles } from './authFormStyles'
import { DatePicker } from '@/components/DatePicker'
import { Select } from '@/components/Select'
import { ROUTES } from '@/constants'
import { notify } from '@/store'
import { register as registerApi, getErrorMessage } from '@/api'

const { inputClass, inputPasswordClass, labelClass } = authFormStyles

const GENDER_TO_API: Record<string, number> = { Male: 0, Female: 1, Other: 2 }

export function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false)
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmationPassword) {
      notify('error', 'Las contraseñas no coinciden.')
      return
    }
    if (!gender) {
      notify('warning', 'Selecciona tu género.')
      return
    }
    setLoading(true)
    try {
      const genderId = GENDER_TO_API[gender] ?? 0
      const birthdayIso = birthday ? `${birthday}T12:00:00.000Z` : ''
      await registerApi({
        fullName,
        email,
        password,
        confirmationPassword,
        birthday: birthdayIso,
        phone: phone || undefined,
        gender: genderId,
      })
      notify('success', 'Cuenta creada. Ya puedes iniciar sesión.')
      navigate(ROUTES.LOGIN, { state: { fromRegister: true } })
    } catch (err) {
      notify('error', getErrorMessage(err, 'Error al registrar. Intenta de nuevo.'))
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
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Completa tus datos para registrarte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                className={inputClass}
                required
              />
            </div>
          </div>

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

          <div>
            <label htmlFor="confirmationPassword" className={labelClass}>
              Confirmar contraseña
            </label>
            <div className="relative password-field">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
              </div>
              <input
                id="confirmationPassword"
                type={showConfirmationPassword ? 'text' : 'password'}
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                placeholder="ej: ••••••••"
                className={confirmationPassword ? inputPasswordClass : inputClass}
                required
              />
              {confirmationPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmationPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-r-lg cursor-pointer"
                  aria-label={showConfirmationPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmationPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthday" className={labelClass}>
                Fecha de nacimiento
              </label>
              <DatePicker
                id="birthday"
                value={birthday}
                onChange={setBirthday}
                placeholder="Seleccionar"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Teléfono <span className="text-neutral-500">(opcional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div className="max-w-50 mb-6">
            <label id="gender-label" className={labelClass}>
              Género
            </label>
            <Select
              id="gender"
              value={gender}
              onChange={setGender}
              options={[
                { value: 'Male', label: 'Masculino' },
                { value: 'Female', label: 'Femenino' },
                { value: 'Other', label: 'Otro' },
              ]}
              placeholder="Seleccionar"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 dark:bg-primary-500 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-60 transition font-medium shadow-sm"
          >
            {loading ? 'Registrando…' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          ¿Ya tienes cuenta?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
