'use client'

import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import { ProjectType } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import ProjectCard from './ProjectCard'
import SectionGlow from '../Animation/SectionGlow'

interface ProjectSectionProps {
  projects: ProjectType[]
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const { lang } = useI18n()
  const t = getDictionary(lang)

  return (
    <section id="projects" className="relative">
      <SectionGlow />

      <SectionHeading
        title={t.projets_section_title}
        subtitle={t.projets_section_subtitle}
      />

      <div className="my-8 grid grid-cols-1 place-items-stretch gap-8 md:my-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project[lang].title} index={index} data={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectSection
