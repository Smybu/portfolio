"use client";
import useFloat from "@/hooks/useFloat";
import useParallaxTilt from "@/hooks/useParallaxTilt";
import useRoleSwitcher from "@/hooks/useRoleSwitcher";
import { getDictionary } from "@/lib/i18n";
import { useI18n } from "@/lib/i18nProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroImage } from "../../utils/images";
import FloatingChip, { FLOATING_CHIPS } from "./FloatingChips";

const Hero = () => {
  const { lang } = useI18n();
  const t = getDictionary(lang);

  const roles = [t.role_fullstack, t.role_unemployed];
  const { text: role, isTyping } = useRoleSwitcher({ roles });

  const stageRef = useParallaxTilt<HTMLDivElement>();
  const floatRef = useFloat<HTMLDivElement>({ amplitude: 14, duration: 3400 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(dvh-4rem)] bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pt-12 pb-10 md:grid-cols-2 lg:p-4">
        <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="text-neutral mb-2 block text-3xl font-bold">
              {t.welcome}
            </span>

            <span className="text-accent block min-h-9 text-[1.75rem] font-bold">
              <span className="sr-only">{roles.join(", ")}</span>

              <span aria-hidden="true">{role}</span>
              <span
                aria-hidden="true"
                className={`bg-accent ml-1 inline-block h-[1.1em] w-[3px] translate-y-[0.18em] rounded-sm ${
                  isTyping ? "" : "motion-safe:animate-blink"
                }`}
              />
            </span>
          </h1>

          <h2 className="text-neutral mt-3">{t.hero_text}</h2>

          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href={
                lang === "fr"
                  ? "/cv/CV-WAELES-Swann.pdf"
                  : "/cv/CV-WAELES-Swann-English.pdf"
              }
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Connect with me"
              className="bg-accent min-w-32 cursor-pointer rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#fff] hover:bg-accent/60 transition-colors duration-300"
            >
              {t.hero_cv}
            </a>
            <a
              href="https://www.linkedin.com/in/swann-waeles/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn Profile"
              className="text-neutral bg-secondary cursor-pointer rounded-lg px-[14px] py-[10px] text-sm font-medium hover:bg-secondary/60 transition-colors duration-300"
            >
              {t.hero_linkedin}
            </a>
          </div>
        </div>

        <div
          ref={stageRef}
          className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]"
        >
          <div className="relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <div
              aria-hidden="true"
              className={`absolute inset-4 motion-safe:transition-opacity motion-safe:duration-1000 ${
                mounted ? "opacity-100" : "motion-safe:opacity-0"
              }`}
              style={{
                transform:
                  "translate3d(calc(var(--px, 0) * -20px), calc(var(--py, 0) * -20px), 0)",
              }}
            >
              <div className="bg-accent/30 size-full rounded-full blur-3xl motion-safe:animate-pulse" />
            </div>

            <div ref={floatRef} className="absolute inset-0">
              <div
                className="border-accent/60 shadow-accent/20 relative size-full rounded-full border-2 shadow-[0_0_40px] will-change-transform"
                style={{
                  transform:
                    "perspective(900px) rotateX(calc(var(--py, 0) * -8deg)) rotateY(calc(var(--px, 0) * 8deg))",
                }}
              >
                <Image
                  src={HeroImage}
                  fill
                  priority
                  sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
                  alt="Swann Waeles"
                  className="object-contain p-7"
                />
              </div>
            </div>

            {FLOATING_CHIPS.map((chip) => (
              <FloatingChip key={chip.label} {...chip} visible={mounted} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
