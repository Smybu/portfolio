'use client'

import { Study } from '@/lib/types'
import { useRef, useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import StudyCard from './StudyCard'
import { useI18n } from '@/lib/i18nProvider'
import { getDictionary } from '@/lib/i18n'

interface StudieSectionProps {
  studies: Study[]
}

const StudySection: React.FC<StudieSectionProps> = ({ studies }) => {
  const [activeCard, setActiveCard] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)


  const { lang } = useI18n();
  const t = getDictionary(lang);

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section id="studies" className="select-none">
      <SectionHeading
        title={t.studies_section_title}
        subtitle={t.studies_section_subtitle}
      />

      <div
        ref={scrollRef}
        className={`hide-scrollbar my-8 flex gap-8 overflow-x-auto cursor-grab active:cursor-grabbing`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {studies.map((study, idx) => (
          <StudyCard
            key={idx}
            study={study}
            handleActiveCard={() => setActiveCard(idx)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 sm:hidden">
        {studies.map((_, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeCard
                ? 'bg-accent size-[12px]'
                : 'size-[10px] bg-white/50'
            } rounded-full`}
          />
        ))}
      </div>
    </section>
  )
}

export default StudySection
