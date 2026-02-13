export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
