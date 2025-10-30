import { Experience } from "@/lib/types";
import { isInViewport } from "@/utils";
import { useParams } from "next/navigation";
import { FC, useEffect, useRef } from "react";

interface ExperienceCardProps {
  experience: Experience;
  handleActiveCard: () => void;
}

const ExperienceCard: FC<ExperienceCardProps> = ({ experience, handleActiveCard }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lang = useParams().lang?.toString() || "fr";

  const { company, date, technologies, presentation } = experience[lang];

  useEffect(() => {
    let observer: IntersectionObserver;

    if (cardRef.current) {
      observer = isInViewport(cardRef.current, handleActiveCard);
    }

    return () => {
      observer?.disconnect();
    };
  }, [cardRef.current]);
  return (
    <div
  ref={cardRef}
  className="bg-secondary border-border border-primary-content flex max-w-full shrink-0 flex-col rounded-2xl border p-4 text-center sm:max-w-[100%]"
>
  <div className="flex flex-col items-center gap-2 min-h-[80px]">
    <p className="text-neutral text-lg font-semibold">{company}</p>
    <p className="text-neutral/60 text-sm">{date}</p>
  </div>

  <div className="flex flex-col gap-2">
    <div className="bg-primary rounded-2xl p-4">
        <p className="text-primary-content text-center text-sm font-normal">{technologies}</p>
      </div>
    <ul className="list-disc list-inside text-neutral text-left mt-2 space-y-1">
          {Array.isArray(presentation) ? (
            presentation.map((item, idx) => (
              <li key={idx} className="leading-6">
                {item}
              </li>
            ))
          ) : (
            <li>{presentation}</li>
          )}
        </ul>
  </div>
</div>

  );
};

export default ExperienceCard;
