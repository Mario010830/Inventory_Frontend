/**
 * Hook global para reaccionar a una media query CSS.
 */

import { useState, useEffect } from 'react'

/**
 * Devuelve true cuando la media query coincide (y se actualiza al cambiar).
 * @param query - Cadena de media query (ej: '(max-width: 640px)', '(min-width: 768px)').
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handle = () => setMatches(mq.matches)
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [query])

  return matches
}
const MOBILE_QUERY = '(max-width: 640px)'

/**
 * Devuelve true en viewport móvil (ancho ≤ 640px).
 * Atajo para useMediaQuery('(max-width: 640px)').
 */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY)
}
