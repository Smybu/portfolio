import { useEffect, useRef } from 'react'

function useParallaxTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const hasFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!hasFinePointer || reduceMotion) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let raf = 0

    const tick = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08

      el.style.setProperty('--px', current.x.toFixed(4))
      el.style.setProperty('--py', current.y.toFixed(4))

      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001

      raf = settled ? 0 : requestAnimationFrame(tick)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
      start()
    }

    const onLeave = () => {
      target.x = 0
      target.y = 0
      start()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}

export default useParallaxTilt
