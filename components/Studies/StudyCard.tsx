'use client'

import { useI18n } from '@/lib/i18nProvider'
import { Study } from '@/lib/types'
import { isInViewport } from '@/utils'
import Image from 'next/image'
import { FC, useEffect, useRef } from 'react'
import AnimatedCard from '../Animation/AnimatedCard'

interface StudyCardProps {
  study: Study
  handleActiveCard: () => void
  index?: number
}

const StudyCard: FC<StudyCardProps> = ({
  study,
  handleActiveCard,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const { lang } = useI18n()
  const { degree, date, degreeDetails, institution } = study[lang]

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    if (cardRef.current) {
      observer = isInViewport(cardRef.current, handleActiveCard)
    }

    return () => {
      observer?.disconnect()
    }
  }, [handleActiveCard])

  return (
    <AnimatedCard
      ref={cardRef}
      index={index}
      staggerEvery={3}
      className="w-full md:min-w-0 md:flex-1"
      cardClassName="gap-4 text-center"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="border-border mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-xl border bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 motion-safe:group-hover:-rotate-3">
          <Image
            src={institution}
            alt={degreeDetails}
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <p className="text-neutral text-lg font-bold tracking-tight">
          {degree}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center gap-3">
        <span className="text-neutral/70 border-border inline-flex items-center gap-2 rounded-full border bg-black/10 px-3 py-1 text-xs font-medium">
          <span className="bg-accent size-1.5 rounded-full" />
          {date}
        </span>
        <p className="text-neutral text-sm leading-6">{degreeDetails}</p>
      </div>
    </AnimatedCard>
  )
}

export default StudyCard
