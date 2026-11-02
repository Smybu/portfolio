'use client'

import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import { Experience } from '@/lib/types'
import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ExperienceCard from './ExperienceCard'
import SectionGlow from '../Animation/SectionGlow'

interface ExperienceSectionProps {
  experiences: Experience[]
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  const [activeCard, setActiveCard] = useState(0)

  const { lang } = useI18n()
  const t = getDictionary(lang)

  return (
    <section id="experiences" className="relative select-none">
      <SectionGlow />

      <SectionHeading
        title={t.experiences_section_title}
        subtitle={t.experiences_section_subtitle}
      />

      <div className="mx-auto my-8 grid grid-cols-1 place-items-stretch gap-8 sm:grid-cols-2">
        {experiences.map((experience, idx) => (
          <ExperienceCard
            key={experience[lang].company}
            index={idx}
            experience={experience}
            handleActiveCard={() => setActiveCard(idx)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 sm:hidden">
        {experiences.map((experience, idx) => (
          <div
            key={experience[lang].company}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeCard ? 'bg-accent w-6' : 'w-2.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
