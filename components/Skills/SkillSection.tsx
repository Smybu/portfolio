'use client'

import { skillData } from '../../appData'
import SectionHeading from '../SectionHeading/SectionHeading'
import SkillCard from './SkillCard'
import { useI18n } from '@/lib/i18nProvider'
import { getDictionary } from '@/lib/i18n'

const SkillSection = () => {

  const {lang} = useI18n();
  const t = getDictionary(lang);

  return (
    <section id="skills" className="my-14">
      <SectionHeading
        title={t.skills_section_title}
        subtitle={t.skills_section_subtitle}
      />

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[2.75rem] md:grid-cols-3">
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
