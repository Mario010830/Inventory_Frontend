/**
 ---- Layout de la app una vez logueado: sidebar, header con usuario y cierre de sesión. 
 */

import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FolderTree,
  Package,
  Warehouse,
  Move,
  Truck,
  Settings,
  FileText,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useAuthStore } from '@/store'
import { useLogout } from '@/hooks'
import { ROUTES } from '@/constants'

const navItems: { to: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.USERS, label: 'Usuarios', icon: Users },
  { to: ROUTES.CATEGORIES, label: 'Categorías', icon: FolderTree },
  { to: ROUTES.PRODUCTS, label: 'Productos', icon: Package },
  { to: ROUTES.INVENTORY, label: 'Inventario', icon: Warehouse },
  { to: ROUTES.MOVEMENTS, label: 'Movimientos', icon: Move },
  { to: ROUTES.SUPPLIERS, label: 'Proveedores', icon: Truck },
  { to: ROUTES.SETTINGS, label: 'Configuración', icon: Settings },
  { to: ROUTES.LOGS, label: 'Logs', icon: FileText },
  { to: ROUTES.PROFILE, label: 'Perfil', icon: User },
]

const navLinkClass =
  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors'
const navLinkActive =
  'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
const navLinkInactive =
  'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'

export function AppLayout() {
  const user = useAuthStore((s) => s.user)
  const handleLogout = useLogout()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900">
     
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-200 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden
        onClick={closeSidebar}
      />

    
      <aside
        className={`
          w-56 shrink-0 flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950
          fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          transform transition-transform duration-200 ease-out md:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <NavLink to={ROUTES.DASHBOARD} onClick={closeSidebar} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg">
            <Logo size="small" showText={true} />
          </NavLink>
          <button
            type="button"
            onClick={closeSidebar}
            className="md:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.DASHBOARD}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="shrink-0 h-14 flex items-center justify-between gap-2 px-4 sm:px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="min-w-0 flex-1 md:flex-initial" />
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            {user?.email && (
              <span className="hidden sm:block text-sm text-neutral-600 dark:text-neutral-400 truncate max-w-[120px] md:max-w-[200px]" title={user.email}>
                {user.email}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 shrink-0"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
