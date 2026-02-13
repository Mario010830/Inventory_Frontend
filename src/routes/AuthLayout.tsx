/**
 ---- Layout para vistas públicas: login, registro, olvidé contraseña.
 */

import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-950 py-4 px-4 sm:py-6 sm:px-6 overflow-y-auto">
      <div className="w-full max-w-md min-w-0">{children}</div>
    </div>
  )
}
