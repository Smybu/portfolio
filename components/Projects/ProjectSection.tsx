'use client'

import { ProjectType } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import ProjectCard from './ProjectCard'

interface ProjectSectionProps {
  projects: ProjectType[]
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
   const { lang } = useI18n()
    const t = getDictionary(lang)
  
  return (
    <section id="projects">
      <SectionHeading title={t.projets_section_title} subtitle={t.projets_section_subtitle} />
      <div className="my-8 grid grid-cols-1 gap-8 md:my-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} data={project} />
        ))}
      </div> 
    </section>
  )
}

export default ProjectSection
