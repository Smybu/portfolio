import { Study } from "@/lib/types";
import { isInViewport } from "@/utils";
import { StarIcon } from "@/utils/icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FC, useEffect, useRef } from "react";

interface StudyCardProps {
  study: Study;
  handleActiveCard: () => void;
}

const StudyCard: FC<StudyCardProps> = ({ study, handleActiveCard }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lang = useParams().lang?.toString() || "fr";

  const { degree, date, degreeDetails, institution } = study[lang];

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
  className="bg-secondary border-border border-primary-content flex max-w-full shrink-0 flex-col rounded-2xl border p-4 text-center sm:max-w-[425px]"
>
  <div className="flex flex-col items-center gap-2 min-h-[120px]">
    <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-xl border border-border bg-white shadow-sm">
      <Image
        src={institution}
        alt={degreeDetails}
        width={60}
        height={60}
        className="object-contain"
      />
    </div>
    <p className="text-neutral text-lg font-semibold">{degree}</p>
  </div>

  <div className="flex flex-col gap-2">
    <p className="text-neutral/60 text-sm">{date}</p>
    <p className="text-neutral text-center leading-6">{degreeDetails}</p>
  </div>
</div>

  );
};

export default StudyCard;
