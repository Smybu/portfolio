'use client'

import {
  forwardRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

type AnimatedCardState = {
  revealed: boolean
}

interface AnimatedCardProps {
  children: ReactNode | ((state: AnimatedCardState) => ReactNode)
  index?: number
  staggerEvery?: number
  revealThreshold?: number
  maxTilt?: number
  className?: string
  cardClassName?: string
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  function AnimatedCard(
    {
      children,
      index = 0,
      staggerEvery = 2,
      revealThreshold = 0.15,
      maxTilt = 5,
      className = '',
      cardClassName = '',
    },
    ref,
  ) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const tiltRef = useRef<HTMLDivElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)
    const borderGlowRef = useRef<HTMLDivElement>(null)
    const [revealed, setRevealed] = useState(false)

    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement)

    useEffect(() => {
      const el = wrapperRef.current
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.disconnect()
          }
        },
        { threshold: revealThreshold },
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [revealThreshold])

    const canAnimate = () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!canAnimate()) return
      const tilt = tiltRef.current
      if (!tilt) return

      const rect = tilt.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const rotateY = (x / rect.width - 0.5) * 2 * maxTilt
      const rotateX = (0.5 - y / rect.height) * 2 * maxTilt

      tilt.style.transition = 'transform 80ms ease-out'
      tilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`

      const glow = `radial-gradient(320px circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 60%)`
      const border = `radial-gradient(220px circle at ${x}px ${y}px, rgba(255,255,255,0.75), transparent 65%)`
      if (spotlightRef.current) spotlightRef.current.style.background = glow
      if (borderGlowRef.current)
        borderGlowRef.current.style.background = border
    }

    const handleMouseEnter = () => {
      if (!canAnimate()) return
      if (spotlightRef.current) spotlightRef.current.style.opacity = '1'
      if (borderGlowRef.current) borderGlowRef.current.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      const tilt = tiltRef.current
      if (tilt) {
        tilt.style.transition =
          'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
        tilt.style.transform = 'rotateX(0deg) rotateY(0deg)'
      }
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0'
      if (borderGlowRef.current) borderGlowRef.current.style.opacity = '0'
    }

    return (
      <div
        ref={wrapperRef}
        style={{
          transitionDelay: revealed
            ? `${(index % staggerEvery) * 120}ms`
            : '0ms',
        }}
        className={`flex perspective-[1000px] motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
          revealed
            ? 'translate-y-0 opacity-100'
            : 'motion-safe:translate-y-8 motion-safe:opacity-0'
        } ${className}`}
      >
        <div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group bg-secondary border-border relative isolate flex w-full flex-col overflow-hidden rounded-2xl border p-5 shadow-lg shadow-black/20 will-change-transform transform-3d hover:shadow-2xl hover:shadow-accent/10 motion-safe:transition-shadow motion-safe:duration-300 ${cardClassName}`}
        >
          <div
            ref={spotlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300"
          />

          <div
            ref={borderGlowRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl p-px opacity-0 transition-opacity duration-300"
            style={{
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
            }}
          />

          <div
            aria-hidden="true"
            className="bg-accent absolute inset-x-0 top-0 -z-10 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
          />

          {typeof children === 'function' ? children({ revealed }) : children}
        </div>
      </div>
    )
  },
)

export default AnimatedCard
