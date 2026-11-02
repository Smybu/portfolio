'use client'

import { useI18n } from '@/lib/i18nProvider'
import { ProjectType } from '@/lib/types'
import { GithubIcon } from '../../utils/icons'
import AnimatedCard from '../Animation/AnimatedCard'

interface ProjectCardProps {
  data: ProjectType
  index?: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, index = 0 }) => {
  const { lang } = useI18n()
  const { title, shortDescription, technologies, githubLink, type, year } =
    data[lang]

  const techList = String(technologies)
    .split(/[,|/•·]/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <AnimatedCard index={index} cardClassName="justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <h3 className="text-secondary-content text-lg font-semibold tracking-tight">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {year && (
            <span className="text-neutral/70 border-border rounded-full border bg-black/10 px-2.5 py-0.5 text-xs font-medium">
              {year}
            </span>
          )}
          {type && (
            <span className="animate-blink text-tag h-7 w-fit rounded-md bg-[#FFFFFF1A] p-1 text-sm backdrop-blur-[80px]">
              {type}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-between gap-5">
        <p className="text-neutral text-sm leading-6">{shortDescription}</p>

        <div className="flex flex-wrap gap-2">
          {techList.map((tech) => (
            <span
              key={tech}
              className="bg-primary text-primary-content hover:bg-accent rounded-lg px-3 py-1 text-xs font-semibold shadow-sm transition-colors duration-200 hover:text-white motion-safe:hover:-translate-y-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {githubLink && (
        <div className="mt-5 flex">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent border-accent/40 hover:bg-accent focus-visible:ring-accent group/link inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
          >
            <GithubIcon className="w-[18px] md:w-5" />
            <span>Github</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      )}
    </AnimatedCard>
  )
}

export default ProjectCard
