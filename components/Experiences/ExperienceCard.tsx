'use client'

import { Experience } from '@/lib/types'
import { isInViewport } from '@/utils'
import { useParams } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'

interface ExperienceCardProps {
  experience: Experience
  handleActiveCard: () => void
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  experience,
  handleActiveCard,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const lang = useParams().lang?.toString() || 'fr'

  const { company, date, technologies, presentation } = experience[lang]

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    if (cardRef.current) {
      observer = isInViewport(cardRef.current, handleActiveCard)
    }

    return () => {
      observer?.disconnect()
    }
  }, [handleActiveCard])

  return (
    <>
      <div
        ref={cardRef}
        className="bg-secondary border-border flex max-w-full shrink-0 flex-col rounded-2xl border p-4 text-center sm:max-w-full"
      >
        <div className="flex min-h-[80px] flex-col items-center gap-2">
          <p className="text-neutral text-lg font-semibold">{company}</p>
          <p className="text-neutral/60 text-sm">{date}</p>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="bg-primary rounded-2xl p-4">
            <p className="text-primary-content text-center text-sm font-normal">
              {technologies}
            </p>
          </div>

          <ul className="text-neutral mt-2 list-inside list-disc space-y-1 text-left">
            {(Array.isArray(presentation)
              ? presentation
              : [presentation]
            ).slice(0, 3).map((item, idx) => (
              <li key={idx} className="leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-primary text-primary-content hover:bg-accent hover:text-white mt-5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
        >
          En savoir plus
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
            className="bg-secondary border-border relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fermer la fenêtre"
              className="text-neutral cursor-pointer hover:text-accent absolute top-4 right-4 text-4xl"
            >
              &times;
            </button>

            <div className="mb-6">
              <h2
                id="experience-modal-title"
                className="text-accent text-xl font-bold text-center"
              >
                {company}
              </h2>

              <p className="text-neutral/60 text-center mt-2 text-sm">{date}</p>
            </div>

            <div>
              <p className="text-neutral text-center mt-2 text-base sm:text-left">
                Lors de mon service civique à la Maison Nord Solidarités d'Hazebrouck, j'ai occupé le rôle d'accompagnateur numérique. Cette expérience m'a permis d'aider des personnes en difficulté avec les outils informatiques et de les accompagner dans leurs démarches administratives en ligne.<br/><br/>
                J'ai notamment animé des ateliers d'initiation et d'accompagnement numérique en petit groupe afin de favoriser l'autonomie des usagers dans l'utilisation des outils informatiques. J'ai également conçu des documents explicatifs pour faciliter la prise en main de nouveaux outils utilisés pour les personnes de la structure, tels que Microsoft Teams et Copilot.<br/><br/>
                Enfin, j'ai assuré un suivi régulier auprès de plusieurs personnes rencontrant des difficultés dans leurs démarches administratives, en leur apportant une aide adaptée à leurs besoins grâce à la table numérique présente à l'accueil.<br/><br/>
                Cette expérience m'a permis de développer mes compétences en communication, en pédagogie et en assistance informatique, tout en renforçant mon sens de l'écoute, ma patience et ma capacité à m'adapter à différents publics.</p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-primary cursor-pointer text-primary-content hover:bg-accent hover:text-white mt-8 w-full rounded-xl px-4 py-3 font-semibold transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ExperienceCard