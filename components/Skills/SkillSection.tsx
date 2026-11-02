'use client'

import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import { skillData } from '../../appData'
import SectionHeading from '../SectionHeading/SectionHeading'
import SkillCard from './SkillCard'
import SectionGlow from '../Animation/SectionGlow'

const SkillSection = () => {
  const { lang } = useI18n()
  const t = getDictionary(lang)

  return (
    <section id="skills" className="relative my-14">
      <SectionGlow />

      <SectionHeading
        title={t.skills_section_title}
        subtitle={t.skills_section_subtitle}
      />

      <div className="mt-8 grid grid-cols-1 place-items-stretch gap-8 md:mt-11 md:grid-cols-3">
        {skillData.map((skill, index) => (
          <SkillCard
            key={skill.title}
            index={index}
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
