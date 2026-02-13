import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootGuard } from '@/routes/RootGuard'
import { PlaceholderPage } from '@/routes/PlaceholderPage'
import { Login, Register, ForgotPassword } from '@/features/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootGuard />,
    children: [
      { index: true, element: <PlaceholderPage title="Dashboard" /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'users', element: <PlaceholderPage title="Usuarios" /> },
      { path: 'categories', element: <PlaceholderPage title="Categorías" /> },
      { path: 'products', element: <PlaceholderPage title="Productos" /> },
      { path: 'inventory', element: <PlaceholderPage title="Inventario" /> },
      { path: 'movements', element: <PlaceholderPage title="Movimientos" /> },
      { path: 'suppliers', element: <PlaceholderPage title="Proveedores" /> },
      { path: 'settings', element: <PlaceholderPage title="Configuración" /> },
      { path: 'logs', element: <PlaceholderPage title="Logs" /> },
      { path: 'profile', element: <PlaceholderPage title="Perfil" /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export { router }
