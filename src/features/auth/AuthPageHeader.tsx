
import { Logo } from '@/components/Logo'
import { useThemeStore } from '@/store'

export function AuthPageHeader() {
  const { mode, setMode, isDark } = useThemeStore()

  const toggleTheme = () => {
    if (mode === 'light') setMode('dark')
    else if (mode === 'dark') setMode('light')
    else setMode(isDark() ? 'light' : 'dark')
  }

  return (
    <div className="-mb-3 rounded-t-2xl overflow-hidden">
      <button
        type="button"
        onClick={toggleTheme}
        className="group w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-800"
        title="Alternar modo claro / oscuro"
        aria-label="Alternar modo claro u oscuro"
      >
        <div className="p-3 transition-[background-color,color] duration-300 bg-white dark:bg-neutral-800 group-hover:bg-neutral-800 dark:group-hover:bg-white text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-100 dark:group-hover:text-neutral-900">
          <div className="flex flex-col items-center transition-transform duration-300 ease-out group-hover:translate-y-[-4px] group-hover:scale-[1.02]">
            <Logo size="medium" inheritColor />
          </div>
        </div>
      </button>
    </div>
  )
}
