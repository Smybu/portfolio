import { languageList } from '@/appData'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import ServiceSection from '@/components/Skills/SkillSection'
import Languages from '@/components/Languages/Languages'
import StudySection from '@/components/Studies/StudySection'
import { getAllProjects, getAllStudies } from '@/services'

export default async function Home() {
  const projects = await getAllProjects()
  const studies = await getAllStudies()

  return (
    <main>
      <Hero />
      <Languages languages={languageList} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <StudySection studies={studies} />
        <ProjectSection projects={projects} />
        <ServiceSection />
      </div>
    </main>
  )
}
