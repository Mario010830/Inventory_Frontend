import { create } from 'zustand'
import type { AccountUser } from '@/types/account'

const STORAGE_KEY = 'inventory-auth'

export type User = AccountUser

interface StoredTokens {
  accessToken: string
  refreshToken: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  setTokens: (access: string | null, refresh: string | null, rememberMe?: boolean) => void
  setUser: (user: User | null) => void
  logout: () => void
  hydrateFromStorage: () => void
}

function readStoredTokens(): StoredTokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredTokens
    if (parsed?.accessToken && parsed?.refreshToken) return parsed
  } catch {
    // ignore
  }
  return null
}

function clearStoredTokens(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,

  setTokens: (accessToken, refreshToken, rememberMe) => {
    set({ accessToken, refreshToken })
    if (accessToken && refreshToken) {
      if (rememberMe === true) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }))
        } catch {
          // ignore
        }
      } else if (rememberMe === false) {
        clearStoredTokens()
      } else if (readStoredTokens()) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }))
        } catch {
          // ignore
        }
      }
    } else {
      clearStoredTokens()
    }
  },

  setUser: (user) => set({ user }),

  logout: () => {
    clearStoredTokens()
    set({ accessToken: null, refreshToken: null, user: null })
  },

  hydrateFromStorage: () => {
    const stored = readStoredTokens()
    if (stored) {
      set({ accessToken: stored.accessToken, refreshToken: stored.refreshToken })
    }
  },
}))
