import { Package } from 'lucide-react'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  inheritColor?: boolean
}

export function Logo({ size = 'medium', showText = true, inheritColor = false }: LogoProps) {
  const iconSize = size === 'small' ? 24 : size === 'medium' ? 32 : 40
  const textSize =
    size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-2xl'

  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary-600 dark:bg-primary-500 p-2 rounded-lg">
        <Package className="text-white" size={iconSize} />
      </div>
      {showText && (
        <span
          className={`${textSize} font-semibold ${inheritColor ? 'text-inherit' : 'text-neutral-900 dark:text-neutral-100'}`}
        >
          InvenPro
        </span>
      )}
    </div>
  )
}
