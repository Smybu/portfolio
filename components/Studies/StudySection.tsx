'use client'

import { Study } from '@/lib/types'
import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import StudyCard from './StudyCard'
import { useI18n } from '@/lib/i18nProvider'
import { getDictionary } from '@/lib/i18n'

interface StudieSectionProps {
  studies: Study[]
}

const StudySection: React.FC<StudieSectionProps> = ({ studies }) => {
  const [activeCard, setActiveCard] = useState(0)

  const { lang } = useI18n()
  const t = getDictionary(lang)

  return (
    <section id="studies" className="select-none">
      <SectionHeading
        title={t.studies_section_title}
        subtitle={t.studies_section_subtitle}
      />

      <div className="my-8 flex flex-col gap-8 md:flex-row md:overflow-x-auto">
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
