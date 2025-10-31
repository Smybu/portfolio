'use client'

import { Project } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
// import ProjectCard from './ProjectCard'

interface ProjectSectionProps {
  projects: Project[]
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
   const { lang } = useI18n()
    const t = getDictionary(lang)
  
  return (
    <section id="projects">
      <SectionHeading title={t.projets_section_title} subtitle={t.projets_section_subtitle} />

      <div className="my-8 md:my-12 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-orange-300 rounded-2xl -z-10" />
        <p className="text-lg text-orange-900 text-center px-6 py-8">
          {t.projets_under_construction}
        </p>
      </div>

      {/* 
      <div className="my-8 grid grid-cols-1 gap-8 md:my-12 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.priority} data={project} />
        ))}
      </div> 
      */}
    </section>
  )
}

export default ProjectSection
