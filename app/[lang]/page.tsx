import { skillList } from '@/appData'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import ServiceSection from '@/components/Services/ServiceSection'
import Skills from '@/components/Skills/Skills'
import StudySection from '@/components/Studies/StudySection'
import { getAllProjects, getAllStudies } from '@/services'

export default async function Home() {
  const projects = await getAllProjects()
  const studies = await getAllStudies()

  return (
    <main>
      <Hero />
      <Skills skills={skillList} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <StudySection studies={studies} />
        <ProjectSection projects={projects} />
        <ServiceSection />
      </div>
    </main>
  )
}
