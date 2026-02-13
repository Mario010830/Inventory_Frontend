import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { Notification, NotificationType } from '@/store/notifications'
import { useNotificationsStore } from '@/store/notifications'

const TYPE_STYLES: Record<
  NotificationType,
  { bg: string; text: string; bar: string }
> = {
  info: {
    bg: 'bg-primary-100 dark:bg-primary-950',
    text: 'text-primary-700 dark:text-primary-300',
    bar: 'bg-primary-500',
  },
  success: {
    bg: 'bg-success-100 dark:bg-success-950',
    text: 'text-success-700 dark:text-success-300',
    bar: 'bg-success-500',
  },
  warning: {
    bg: 'bg-warning-100 dark:bg-warning-950',
    text: 'text-warning-700 dark:text-warning-300',
    bar: 'bg-warning-500',
  },
  error: {
    bg: 'bg-error-100 dark:bg-error-950',
    text: 'text-error-700 dark:text-error-300',
    bar: 'bg-error-500',
  },
}

interface ToastItemProps {
  notification: Notification
}

export function ToastItem({ notification }: ToastItemProps) {
  const remove = useNotificationsStore((s) => s.remove)
  const { id, type, message, duration } = notification
  const [shrinking, setShrinking] = useState(false)
  const styles = TYPE_STYLES[type]

  useEffect(() => {
    const start = requestAnimationFrame(() => setShrinking(true))
    const timeout = setTimeout(() => remove(id), duration)
    return () => {
      cancelAnimationFrame(start)
      clearTimeout(timeout)
    }
  }, [id, duration, remove])

  return (
    <div
      className={`min-w-0 max-w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg dark:shadow-neutral-950/50 overflow-hidden ${styles.bg}`}
      role="alert"
    >
      <div className="flex items-start gap-3 p-4">
        <p className={`flex-1 text-sm font-medium ${styles.text}`}>{message}</p>
        <button
          type="button"
          onClick={() => remove(id)}
          className="shrink-0 p-1 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Cerrar notificación"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div
        className="h-0.5 w-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden"
        aria-hidden
      >
        <div
          className={`h-full w-full min-h-px origin-right ${styles.bar} transition-[transform] ease-linear`}
          style={{
            transform: shrinking ? 'scaleX(0)' : 'scaleX(1)',
            transitionDuration: `${duration}ms`,
          }}
        />
      </div>
    </div>
  )
}
