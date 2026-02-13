import { create } from 'zustand'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration: number
}

interface NotificationsState {
  notifications: Notification[]
  add: (notification: Omit<Notification, 'id'>) => string
  remove: (id: string) => void
}

function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],

  add: ({ type, message, duration = 3500 }) => {
    const id = generateId()
    set((state) => ({
      notifications: [...state.notifications, { id, type, message, duration }],
    }))
    return id
  },

  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))

export function notify(
  type: NotificationType,
  message: string,
  duration = 3500
): string {
  return useNotificationsStore.getState().add({ type, message, duration })
}
