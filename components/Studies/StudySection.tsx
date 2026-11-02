'use client'

import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import { Study } from '@/lib/types'
import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import StudyCard from './StudyCard'
import SectionGlow from '../Animation/SectionGlow'

interface StudySectionProps {
  studies: Study[]
}

const StudySection: React.FC<StudySectionProps> = ({ studies }) => {
  const [activeCard, setActiveCard] = useState(0)

  const { lang } = useI18n()
  const t = getDictionary(lang)

  return (
    <section id="studies" className="relative select-none">
      <SectionGlow />

      <SectionHeading
        title={t.studies_section_title}
        subtitle={t.studies_section_subtitle}
      />

      <div className="my-8 flex flex-col gap-8 md:flex-row md:items-stretch">
        {studies.map((study, idx) => (
          <StudyCard
            key={study[lang].degree}
            index={idx}
            study={study}
            handleActiveCard={() => setActiveCard(idx)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 sm:hidden">
        {studies.map((study, idx) => (
          <div
            key={study[lang].degree}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeCard ? 'bg-accent w-6' : 'w-2.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default StudySection
