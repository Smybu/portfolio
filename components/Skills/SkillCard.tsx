'use client'

import Image from 'next/image'
import AnimatedCard from '../Animation/AnimatedCard'

interface SkillCardProps {
  icon: string
  title: string
  titlefr?: string
  shortDescription: string
  stars: number
  index?: number
}

const MAX_LEVEL = 5

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP = 12
const SEGMENT = CIRCUMFERENCE / MAX_LEVEL - GAP
const GAP_DEG = (GAP / CIRCUMFERENCE) * 360

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  shortDescription,
  icon,
  stars,
  index = 0,
}) => {
  const level = Math.max(0, Math.min(MAX_LEVEL, Math.round(stars)))

  return (
    <AnimatedCard index={index} staggerEvery={3} revealThreshold={0.2} cardClassName="items-center">
      {({ revealed }) => (
        <>
          <div className="relative mt-1 flex size-28 items-center justify-center">
            <meter
              className="sr-only"
              min={0}
              max={MAX_LEVEL}
              value={level}
              aria-label={title}
              aria-valuetext={`${level}/${MAX_LEVEL}`}
            >
              {level}/{MAX_LEVEL}
            </meter>

            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="text-accent absolute inset-0 size-full"
            >
              {Array.from({ length: MAX_LEVEL }, (_, i) => {
                const start = -90 + i * (360 / MAX_LEVEL) + GAP_DEG / 2
                const common = {
                  cx: 50,
                  cy: 50,
                  r: RADIUS,
                  fill: 'none',
                  strokeWidth: 5,
                  strokeLinecap: 'round' as const,
                  strokeDasharray: `${SEGMENT} ${CIRCUMFERENCE}`,
                  transform: `rotate(${start} 50 50)`,
                }
                return (
                  <g key={i}>
                    <circle {...common} stroke="currentColor" opacity={0.12} />
                    {i < level && (
                      <circle
                        {...common}
                        stroke="currentColor"
                        style={{
                          opacity: revealed ? 1 : 0,
                          transition: 'opacity 400ms ease-out',
                          transitionDelay: `${300 + i * 140}ms`,
                          filter: 'drop-shadow(0 0 3px currentColor)',
                        }}
                      />
                    )}
                  </g>
                )
              })}
            </svg>

            <Image
              src={icon}
              alt=""
              className="size-14 transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <h5 className="text-accent mt-4 mb-5 text-center text-base font-bold tracking-tight">
            {title}
          </h5>

          <div className="bg-primary flex w-full flex-1 items-center justify-center rounded-2xl p-4">
            <p className="text-primary-content text-center text-sm leading-6 font-normal">
              {shortDescription}
            </p>
          </div>
        </>
      )}
    </AnimatedCard>
  )
}

export default SkillCard
