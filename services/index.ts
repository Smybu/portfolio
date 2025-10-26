import { Project, Study } from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

// Function to read project file
const readProjectFile = async (filePath: string): Promise<Project> => {
  const projectData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(projectData)
}

// Function to get all projects
const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projectsPath = path.join(process.cwd(), '/content/projects')
    const projectsName = await fs.readdir(projectsPath)

    const projects = await Promise.all(
      projectsName.map(async (projectName) => {
        const filePath = path.join(projectsPath, projectName)
        const projectDetails = await readProjectFile(filePath)
        return projectDetails
      }),
    )

    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority)

    return projects
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

const getAllStudies = async (): Promise<Study[]> => {
  try {
    const studiesPath = path.join(process.cwd(), '/content/studies')
    const studiesName = await fs.readdir(studiesPath)

    const studies = await Promise.all(
      studiesName.map(async (projectName) => {
        const filePath = path.join(studiesPath, projectName)
        const projectDetails = await fs.readFile(filePath, 'utf8')
        return JSON.parse(projectDetails)
      }),
    )

    // Sort studies by date
    studies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return studies
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    return []
  }
}

export { getAllProjects, getAllStudies }
