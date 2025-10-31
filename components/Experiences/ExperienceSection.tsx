'use client'

import { Experience } from '@/lib/types'
import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ExperienceCard from './ExperienceCard'
import { useI18n } from '@/lib/i18nProvider'
import { getDictionary } from '@/lib/i18n'

interface ExperiencesectionProps {
  experiences: Experience[]
}

const ExperienceSection: React.FC<ExperiencesectionProps> = ({ experiences }) => {
  const [activeCard, setActiveCard] = useState(0)

  const { lang } = useI18n();
  const t = getDictionary(lang)

  return (
    <section id="experiences" className="select-none">
      <SectionHeading
        title={t.experiences_section_title}
        subtitle={t.experiences_section_subtitle}
      />

      <div
        className="
          my-8 
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          place-items-stretch
          max-w-auto
          mx-auto
        "
      >
        {experiences.map((experience, idx) => (
          <ExperienceCard
            key={idx}
            experience={experience}
            handleActiveCard={() => setActiveCard(idx)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 sm:hidden">
        {experiences.map((_, idx) => (
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

export default ExperienceSection
