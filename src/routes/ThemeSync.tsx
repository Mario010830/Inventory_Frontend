import { useEffect } from 'react'
import { useThemeStore } from '@/store'

export function ThemeSync() {
  const setMode = useThemeStore((s) => s.setMode)
  const mode = useThemeStore((s) => s.mode)

  useEffect(() => {
    setMode(mode)
  }, [mode, setMode])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (useThemeStore.getState().mode === 'system') setMode('system')
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [setMode])

  return null
}
