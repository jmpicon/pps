import { Info, AlertTriangle, AlertCircle, Lightbulb } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'danger' | 'tip'

interface CalloutProps {
  type: CalloutType
  title?: string
  children: React.ReactNode
}

const config: Record<CalloutType, { icon: typeof Info; bg: string; border: string; iconColor: string; defaultTitle: string }> = {
  info: {
    icon: Info,
    bg: 'bg-[var(--accent)]/10',
    border: 'border-[var(--accent)]/30',
    iconColor: 'text-[var(--accent)]',
    defaultTitle: 'Información',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-[var(--warning)]/10',
    border: 'border-[var(--warning)]/30',
    iconColor: 'text-[var(--warning)]',
    defaultTitle: 'Atención',
  },
  danger: {
    icon: AlertCircle,
    bg: 'bg-[var(--danger)]/10',
    border: 'border-[var(--danger)]/30',
    iconColor: 'text-[var(--danger)]',
    defaultTitle: 'Importante',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-[var(--success)]/10',
    border: 'border-[var(--success)]/30',
    iconColor: 'text-[var(--success)]',
    defaultTitle: 'Consejo',
  },
}

export function Callout({ type, title, children }: CalloutProps) {
  const { icon: Icon, bg, border, iconColor, defaultTitle } = config[type]
  return (
    <div className={`my-4 p-4 rounded-xl border ${bg} ${border}`} role="note">
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} aria-hidden />
        <div>
          <p className="font-semibold text-white mb-1">{title ?? defaultTitle}</p>
          <div className="text-[var(--text)] text-sm [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
