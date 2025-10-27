'use client'

import { useParams } from 'next/navigation'
import { skillData } from '../../appData'
import SectionHeading from '../SectionHeading/SectionHeading'
import SkillCard from './SkillCard'

interface SkillSectionHeadingProps {
  [lang: string]: {
    title: string
    subtitle: string
  }
}


const SkillSection = () => {

  const skillSectionHeading: SkillSectionHeadingProps = {
    fr: {
      title: '# Compétences',
      subtitle:
        "Vous pouvez voir dans cette section, mes différentes compétences en développement.",
    },
    en: {
      title: '# Skills',
      subtitle:
        "You can see in this section, my different development skills.",
    },
  }

  const lang = useParams().lang?.toString() || 'fr'

  return (
    <section id="skills" className="my-14">
      <SectionHeading
        title={skillSectionHeading[lang].title}
        subtitle={skillSectionHeading[lang].subtitle}
      />

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[3.75rem] md:grid-cols-3">
        {skillData.map((skill, index) => (
          <SkillCard
            key={index}
            icon={skill.icon}
            title={skill.title}
            shortDescription={skill.shortDescription}
            stars={skill.stars}
          />
        ))}
      </div>
    </section>
  )
}

export default SkillSection
