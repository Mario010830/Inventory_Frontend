import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  isDark: () => boolean
}

const getSystemDark = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

function applyDark(dark: boolean) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (dark) root.classList.add('dark')
  else root.classList.remove('dark')
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      setMode: (mode) => {
        set({ mode })
        const dark = mode === 'dark' || (mode === 'system' && getSystemDark())
        applyDark(dark)
      },
      isDark: () => {
        const { mode } = get()
        if (mode === 'light') return false
        if (mode === 'dark') return true
        return getSystemDark()
      },
    }),
    { name: 'inventory-theme' },
  ),
)

export function initTheme() {
  const stored = localStorage.getItem('inventory-theme')
  let dark = getSystemDark()
  if (stored) {
    try {
      const { state } = JSON.parse(stored) as { state: { mode: ThemeMode } }
      if (state.mode === 'light') dark = false
      else if (state.mode === 'dark') dark = true
    } catch {
      // ignore
    }
  }
  applyDark(dark)
}
