'use client'

import { useEffect, useRef } from 'react'

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  const wRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = wRef.current
    if (!path || typeof path.animate !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const length = path.getTotalLength()
    const animation = path.animate(
      [
        { strokeDasharray: `${length}`, strokeDashoffset: length },
        { strokeDasharray: `${length}`, strokeDashoffset: 0 },
      ],
      { duration: 900, delay: 200, easing: 'ease-out', fill: 'backwards' },
    )

    return () => animation.cancel()
  }, [])

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        opacity={0.25}
      />

      <circle
        cx="20"
        cy="20"
        r="18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="84.8 28.3"
        className="stroke-accent origin-center -rotate-90 transition-transform duration-700 ease-out transform-fill group-hover:rotate-90"
      />

      <path
        ref={wRef}
        d="M10.5 13 15 27 20 17 25 27 29.5 13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Logo
