import { useNotificationsStore } from '@/store/notifications'
import { useIsMobile } from '@/hooks'
import { ToastItem } from '@/components/Toast'

export function NotificationContainer() {
  const notifications = useNotificationsStore((s) => s.notifications)
  const isMobile = useIsMobile()

  if (notifications.length === 0) return null

  return (
    <div
      className={`fixed z-50 flex flex-col gap-3 pointer-events-none top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] left-[auto] ${
        isMobile
          ? 'w-[min(260px,calc(100vw-1.5rem))]'
          : 'w-full max-w-[min(320px,calc(100vw-2rem))]'
      }`}
      aria-live="polite"
      aria-label="Notificaciones"
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        {notifications.map((n) => (
          <ToastItem key={n.id} notification={n} />
        ))}
      </div>
    </div>
  )
}
