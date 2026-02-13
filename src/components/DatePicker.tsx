import { useState, useRef, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import 'react-day-picker/style.css'

const triggerClass =
  'flex items-center gap-2 w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:focus:ring-primary-400 outline-none transition text-left'

function formatDisplayDate(value: string): string {
  if (!value) return ''
  const d = new Date(value + 'T12:00:00')
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

interface DatePickerProps {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export function DatePicker({
  id,
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  required,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const date = value ? new Date(value + 'T12:00:00') : undefined

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleSelect = (d: Date | undefined) => {
    if (!d) return
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    onChange(`${y}-${m}-${day}`)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="absolute left-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
        </span>
        <span className={value ? '' : 'text-neutral-400 dark:text-neutral-500'}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 p-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-lg dark:shadow-neutral-950/50 [--rdp-accent-color:theme(colors.primary.500)] [--rdp-accent-background-color:theme(colors.primary.100)] dark:[--rdp-accent-background-color:theme(colors.primary.900)]"
          role="dialog"
          aria-label="Elegir fecha"
        >
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleSelect}
            required={required}
            locale={es}
          />
        </div>
      )}
    </div>
  )
}
