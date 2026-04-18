import { useEffect, useState } from 'react'

export function CountdownTimer({ expiresAt }) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  )

  useEffect(() => {
    if (secondsLeft <= 0) return

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresAt, secondsLeft])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const isExpired = secondsLeft <= 0
  const isWarning = secondsLeft <= 30 && secondsLeft > 10
  const isDanger = secondsLeft <= 10 && secondsLeft > 0

  let color = '#10b981'
  if (isWarning) color = '#f59e0b'
  if (isDanger) color = '#ef4444'
  if (isExpired) color = '#64748b'

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2 h-2 rounded-full"
        style={{
          background: color,
          boxShadow: isExpired ? 'none' : `0 0 6px ${color}`,
          animation: isDanger && !isExpired ? 'pulse-glow 1s ease-in-out infinite' : undefined,
        }}
      />
      <span className="text-sm font-medium tabular-nums" style={{ color }}>
        {isExpired
          ? 'Link expired'
          : secondsLeft >= 60
            ? `Expires in ${minutes}m ${seconds.toString().padStart(2, '0')}s`
            : `Expires in ${secondsLeft}s`}
      </span>
    </div>
  )
}
