"use client";

import { getDictionary } from "@/lib/i18n";
import { useI18n } from "@/lib/i18nProvider";
import { Experience } from "@/lib/types";
import { isInViewport } from "@/utils";
import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AnimatedCard from "../Animation/AnimatedCard";

interface ExperienceCardProps {
  experience: Experience;
  handleActiveCard: () => void;
  index?: number;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  experience,
  handleActiveCard,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { lang } = useI18n();
  const t = getDictionary(lang);

  const { company, date, technologies, presentation, popin } = experience[lang];

  const techList = String(technologies)
    .split(/[,|/•·]/)
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = isInViewport(card, handleActiveCard);

    return () => {
      observer?.disconnect();
    };
  }, [handleActiveCard]);

  const openModal = () => {
    setIsModalVisible(false);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!isModalOpen || !dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    const raf = requestAnimationFrame(() => {
      setIsModalVisible(true);
      closeBtnRef.current?.focus();
    });

    return () => cancelAnimationFrame(raf);
  }, [isModalOpen]);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!isModalOpen || !dialog) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === dialog && !isModalVisible && dialog.open) {
        dialog.close();
        setIsModalOpen(false);
      }
    };

    dialog.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      dialog.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isModalOpen, isModalVisible]);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const handleDialogCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeModal();
  };

  const presentationItems = Array.isArray(presentation)
    ? presentation
    : [presentation];

  const popinItems = Array.isArray(popin) ? popin : [popin];

  return (
    <>
      <AnimatedCard
        ref={cardRef}
        index={index}
        className="max-w-full"
        cardClassName="text-center"
      >
        <div className="flex min-h-20 flex-col items-center gap-2">
          <p className="text-neutral text-xl font-bold tracking-tight">
            {company}
          </p>

          <span className="text-neutral/70 border-border inline-flex items-center gap-2 rounded-full border bg-black/10 px-3 py-1 text-xs font-medium">
            <span className="bg-accent size-1.5 rounded-full motion-safe:animate-pulse" />
            {date}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {techList.map((tech) => (
              <span
                key={tech}
                className="bg-primary text-primary-content hover:bg-accent rounded-lg px-3 py-1 text-xs font-semibold shadow-sm transition-colors duration-200 hover:text-white motion-safe:hover:-translate-y-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          <ul className="text-neutral mt-1 space-y-2 text-left text-sm">
            {presentationItems.map((item) => (
              <li key={item} className="flex gap-3 leading-6">
                <span
                  aria-hidden="true"
                  className="bg-accent mt-2 size-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="bg-primary text-primary-content hover:bg-accent focus-visible:ring-accent group/btn mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
        >
          {t.experiences_more_information}

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </AnimatedCard>

      {isModalOpen && (
        <dialog
          ref={modalRef}
          aria-labelledby="experience-modal-title"
          onCancel={handleDialogCancel}
          className={`fixed inset-0 m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-secondary p-6 text-inherit shadow-2xl shadow-black/40 backdrop:bg-black/60 backdrop:backdrop-blur-sm transition-all duration-300 ease-out sm:p-8 ${
            isModalVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "motion-safe:translate-y-4 motion-safe:scale-95 opacity-0"
          }`}
        >
          <div
            aria-hidden="true"
            className="bg-accent absolute inset-x-0 top-0 h-1"
          />

          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeModal}
            aria-label="Fermer la fenêtre"
            className="text-neutral hover:text-accent focus-visible:ring-accent absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center rounded-full text-3xl leading-none transition-all duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:outline-none motion-safe:hover:rotate-90"
          >
            &times;
          </button>

          <div className="mb-6 flex flex-col items-center gap-3">
            <h2
              id="experience-modal-title"
              className="text-accent text-center text-2xl font-bold tracking-tight"
            >
              {company}
            </h2>

            <span className="text-neutral/70 border-border rounded-full border bg-black/10 px-3 py-1 text-xs font-medium">
              {date}
            </span>

            <div className="mt-1 flex flex-wrap justify-center gap-2">
              {techList.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary text-primary-content rounded-lg px-3 py-1 text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="text-neutral space-y-3 text-center text-base leading-7 sm:text-left">
            {popinItems.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="bg-primary text-primary-content hover:bg-accent focus-visible:ring-accent mt-8 w-full cursor-pointer rounded-xl px-4 py-3 font-semibold transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
          >
            {t.experiences_more_information_close}
          </button>
        </dialog>
      )}
    </>
  );
};

export default ExperienceCard;
