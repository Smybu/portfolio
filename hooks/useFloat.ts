import { useEffect, useRef } from 'react'

interface FloatOptions {
  amplitude?: number
  duration?: number
  delay?: number
}

function useFloat<T extends HTMLElement>({
  amplitude = 12,
  duration = 3200,
  delay = 0,
}: FloatOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof el.animate !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animation = el.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${-amplitude}px)` },
      ],
      {
        duration,
        delay,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out',
        fill: 'both',
      },
    )

    return () => animation.cancel()
  }, [amplitude, duration, delay])

  return ref
}

export default useFloat
