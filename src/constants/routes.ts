export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  DASHBOARD: '/',
  USERS: '/users',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/:id/edit',

  CATEGORIES: '/categories',
  CATEGORY_CREATE: '/categories/create',
  CATEGORY_EDIT: '/categories/:id/edit',

  PRODUCTS: '/products',
  PRODUCT_CREATE: '/products/create',
  PRODUCT_EDIT: '/products/:id/edit',

  INVENTORY: '/inventory',
  INVENTORY_CREATE: '/inventory/create',
  INVENTORY_EDIT: '/inventory/:id/edit',

  MOVEMENTS: '/movements',
  MOVEMENT_CREATE: '/movements/create',
  MOVEMENTS_BY_PRODUCT: '/movements/product/:productId',

  SUPPLIERS: '/suppliers',
  SUPPLIER_CREATE: '/suppliers/create',
  SUPPLIER_EDIT: '/suppliers/:id/edit',

  SETTINGS: '/settings',
  LOGS: '/logs',
  PROFILE: '/profile',
} as const
