export interface Project {
  title: string
  shortDescription: string
  technologies: string
  githubLink: string
  type: string
  year: string
}

export interface ProjectType{
  [lang: string]: Project
}

export interface Heading {
  id: string
  title: string
  items: Heading[]
}

export interface LocalizedStudyContent {
  degree: string
  date: string
  degreeDetails: string
  institution: string
}

export interface Study {
  [lang: string]: LocalizedStudyContent
}

export interface LocalizedExperienceContent {
  company: string
  date: string
  technologies: string
  presentation: string[]
}

export interface Experience {
  [lang: string]: LocalizedExperienceContent
}

