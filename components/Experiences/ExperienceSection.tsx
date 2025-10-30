'use client'

import { Experience } from '@/lib/types'
import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ExperienceCard from './ExperienceCard'
import { useParams } from 'next/navigation'

interface ExperiencesectionProps {
  experiences: Experience[]
}

interface ExperienceSectionHeadingProps {
  [lang: string]: {
    title: string
    subtitle: string
  }
}

const ExperienceSection: React.FC<ExperiencesectionProps> = ({ experiences }) => {
  const [activeCard, setActiveCard] = useState(0)

  const experienceSectionHeading: ExperienceSectionHeadingProps = {
    fr: {
      title: '# Expériences',
      subtitle: "Vous pouvez retrouver mes différentes expériences professionnelles.",
    },
    en: {
      title: '# Experiences',
      subtitle: "You can find my different professional experiences.",
    },
  }

  const lang = useParams().lang?.toString() || 'fr'

  return (
    <section id="experiences" className="select-none">
      <SectionHeading
        title={experienceSectionHeading[lang].title}
        subtitle={experienceSectionHeading[lang].subtitle}
      />

      {/* GRID à 2 colonnes max */}
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
