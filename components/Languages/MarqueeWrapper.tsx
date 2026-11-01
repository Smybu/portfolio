'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'

type MarqueeWrapperProps = {
  children: ReactNode
  className?: string
  speed?: number
  pauseOnHover?: boolean
}

const EDGE_FADE =
  'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)'

const MarqueeWrapper: React.FC<MarqueeWrapperProps> = ({
  children,
  className = '',
  speed = 30,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstCopyRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)

  const [containerWidth, setContainerWidth] = useState(0)
  const [copyWidth, setCopyWidth] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const copy = firstCopyRef.current
    if (!container || !copy) return

    const measure = () => {
      setContainerWidth(container.clientWidth)
      const width = copy.getBoundingClientRect().width
      if (width > 0) setCopyWidth(width)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(copy)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || copyWidth === 0 || reduceMotion) return
    if (typeof track.animate !== 'function') return

    const animation = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      {
        duration: (copyWidth / speed) * 1000,
        easing: 'linear',
        iterations: Infinity,
      },
    )
    animationRef.current = animation

    return () => {
      animation.cancel()
      animationRef.current = null
    }
  }, [copyWidth, speed, reduceMotion])

  const copies = reduceMotion ? 1 : 2

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => pauseOnHover && animationRef.current?.pause()}
      onMouseLeave={() => pauseOnHover && animationRef.current?.play()}
      className={`relative ${
        reduceMotion ? 'overflow-x-auto' : 'overflow-hidden'
      } ${className}`}
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? firstCopyRef : undefined}
            aria-hidden={i > 0 ? true : undefined}
            style={reduceMotion ? undefined : { minWidth: containerWidth }}
            className="flex shrink-0 items-center justify-around gap-8 py-5 pr-8 whitespace-nowrap lg:gap-12 lg:py-7 lg:pr-12"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarqueeWrapper
