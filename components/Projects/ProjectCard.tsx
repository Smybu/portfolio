import { Project, ProjectType } from "@/lib/types";
import { GithubIcon } from "../../utils/icons";
import { useI18n } from "@/lib/i18nProvider";

interface ProjectCardProps {
  data: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const { lang } = useI18n();
  const { title, shortDescription, technologies, githubLink, type, year } =
    data[lang];

  return (
    <div className="bg-secondary border-border flex flex-col justify-between rounded-[14px] border p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
            <h3 className="text-secondary-content text-lg font-medium md:font-semibold">
              {title} - {year}
            </h3>
            {type && (
              <span
                className={`h-7 w-fit rounded-md bg-[#FFFFFF1A] p-1 text-sm animate-blink text-tag backdrop-blur-[80px]`}
              >
                {type}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-neutral text-sm">{shortDescription}</p>
        </div>
        <div className="bg-primary rounded-2xl p-4 mt-4 mb-4">
          <p className="text-primary-content text-center text-sm font-normal">
            {technologies}
          </p>
        </div>
        {githubLink && (
          <div className="flex justify-center mt-2">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base flex items-center gap-2"
            >
              <GithubIcon className="w-[18px] md:w-5" />
              <span>Github</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
